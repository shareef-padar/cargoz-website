# Hero Video Stack Design

**Goal:** Create a modern scroll-linked transition where `HowItWorksVideo` stacks over the hero, with the hero pinned and subtly scaling/fading as the video card becomes the foreground surface.

**Scope:** This design applies only to the transition between `Hero` and `HowItWorksVideo` on the home page. It does not change later sections or introduce a site-wide stacking pattern.

## Current State

- `app/page.tsx` renders `Hero` and `HowItWorksVideo` as separate, sequential sections inside `main`.
- `components/Hero.tsx` already owns hero-specific animation sequencing for the headline and follow-up content.
- `components/HowItWorksVideo.tsx` already owns the card UI, thumbnail behavior, cursor-following play button, and modal playback.
- The current page uses Framer Motion heavily, so the new interaction should stay within the existing stack instead of adding a second scroll framework unless needed later.

## Desired Experience

When the user scrolls down from the hero:

1. The hero remains visible and pinned for an extra scroll beat.
2. The hero subtly scales down and softens in opacity so it feels like a background layer.
3. The `HowItWorksVideo` card rises upward and overlaps the hero, becoming the new dominant surface.
4. Once the stack transition completes, normal page flow resumes with the video section leading into subsequent sections.

The motion should feel premium and calm, not abrupt or gimmicky. The video card should feel heavy and intentional, like a sheet or card sliding over a canvas.

## Recommended Architecture

Introduce a new orchestration component, tentatively `components/HeroVideoStackScene.tsx`, that owns the scroll scene and leaves the existing presentational components focused:

- `Hero` remains responsible for hero content and hero-local entrance animation.
- `HowItWorksVideo` remains responsible for the video card, poster image, pointer-follow play control, and modal behavior.
- `HeroVideoStackScene` becomes responsible for:
  - scene height
  - sticky positioning
  - scroll progress measurement
  - transform choreography
  - z-index layering
  - reduced-motion fallback

This keeps the new interaction isolated and avoids pushing page-level scroll orchestration into either `Hero` or `HowItWorksVideo`.

## Layout Design

The stack scene should be implemented as a taller wrapper with two conceptual layers:

### Scene geometry

- The orchestration component should be a client component (`'use client'`) because it owns scroll-linked Motion values.
- `app/page.tsx` may remain a server component and simply render the client scene component.
- The scene should use a total height of approximately `200vh` on desktop:
  - first `100vh`: hero is visible in its initial state
  - next `100vh`: transition track where hero softens and video rises into overlap
- On smaller screens, reduce the scene height to approximately `160vh - 175vh` so the pinned segment does not feel too long.
- Scroll progress should be defined against the scene wrapper, with `0` meaning "hero fully dominant, video not yet overlapping" and `1` meaning "video fully settled in the overlapped foreground position and sticky hero ready to release."
- The sticky hero container must account for the fixed header by pinning below it rather than at raw `top: 0`; use the same effective offset as the current page layout clearance (`pt-24` / `md:pt-28`) or an equivalent measured header offset.

### Layer 1: Sticky hero layer

- A sticky container pins the hero near the top of the viewport.
- It should hold for one additional scroll segment beyond the hero's normal first-view state.
- The hero should remain readable and stable during this hold.
- The scene component should apply all stack-scene transforms to a wrapper around `Hero`, not to internals of `Hero` itself. This avoids transform ownership conflicts with the existing motion inside `components/Hero.tsx`.

### Layer 2: Rising video layer

- The video section remains in document flow within the same scene.
- As scroll progress advances, the video card translates upward into overlap.
- The video card should end in a fully settled position before subsequent sections continue naturally.
- The video transform should also be applied by the scene component via a wrapper around `HowItWorksVideo`, not by embedding page-scroll state inside `HowItWorksVideo`.

### Spacing

- The wrapper needs enough height to make the sticky interaction readable; use the scene-height rules above rather than an undefined "extra segment."
- The overlap should be visible early enough that users understand the relationship between sections, but not so early that it crowds the hero headline.
- The video should not begin visibly overlapping until the headline area has largely cleared the user's focus, roughly after the first 25% of the transition track.

## Motion Design

Use Framer Motion scroll-linked transforms derived from a scene-level ref.

### Scroll wiring contract

- Progress should be driven by the window scroll position against the scene wrapper, not by nested container scrolling.
- `useScroll({ target: sceneRef, offset: ['start start', 'end end'] })` is the intended baseline contract unless implementation discovers a better equivalent with the same semantics.
- Progress `0` should align with the hero-first state at the top of the scene; progress `1` should align with the end of the transition track where the video is fully settled and the sticky hero is ready to release.
- Initial client render should assume progress `0` until measurement is available to avoid first-paint drift.
- The normalized progress should be treated as a two-phase scene:
  - `0.0 - 0.5`: hold phase, hero remains essentially in its initial state and video does not visibly overlap yet
  - `0.5 - 1.0`: transition phase, hero scales/fades and video rises into the foreground overlap
- The earlier note that overlap should not begin until "roughly after the first 25% of the transition track" maps to approximately overall scene progress `0.625` (`0.5 + 25% of the second half`).

### Hero motion

- `scale`: `1` -> approximately `0.95`
- `opacity`: `1` -> approximately `0.75`
- optional `y`: `0` -> `-16` or `-20`
- keep opacity floor at or above `0.75` so the hero remains readable as a background layer
- initial render before mount/measurement must match the non-scrolled state: `scale: 1`, `opacity: 1`, `y: 0`
- Hero transforms should remain flat during the hold phase (`0.0 - 0.5`) and interpolate only during the transition phase (`0.5 - 1.0`).

The hero should not blur or disappear completely. It must remain legible enough to read as a background layer until the video takes over.

### Video motion

- starts slightly lower than its final overlapped position
- translates upward into place based on scene progress
- may optionally increase shadow or reduce border radius slightly as it becomes dominant, but this is secondary and should only be added if it materially improves the feel
- initial render before mount/measurement must match the non-overlapped state to avoid first-paint snapping
- Video overlap should also stay visually flat during the hold phase and begin meaningful upward travel only in the transition phase, with the wrapper owning both transform and `z-index`.

### Timing feel

- Motion is tied to scroll progress, not a one-shot reveal
- Curves should feel smooth and premium
- Avoid springy or bouncy behavior for the overlap itself

## Reduced Motion

If `prefers-reduced-motion` is enabled:

- disable the sticky stack choreography
- fall back to the current sequential layout
- preserve all existing content and CTA order

Reduced-motion mode should not use pinned scenes or scroll-linked transforms.
Use the existing Framer `useReducedMotion()` pattern already used in this codebase so the client-rendered layout branches cleanly to the sequential fallback.
Because `useReducedMotion()` is client-only, the SSR-safe default structure should match the non-scrolled initial state and avoid server-rendering a conflicting stacked layout. The client may then branch to the sequential fallback without a visible jump.

## File Responsibilities

### `app/page.tsx`

- Replace the direct sequential rendering of `Hero` then `HowItWorksVideo` with a single `HeroVideoStackScene`
- Keep the rest of the page ordering unchanged

### `components/HeroVideoStackScene.tsx`

- New component
- Owns the scene wrapper, sticky area, scroll progress, transforms, and reduced-motion branching
- Composes `Hero` and `HowItWorksVideo`
- Must be the only owner of stack-scene transforms for both child sections
- Must keep stacking order explicit:
  - sticky hero layer below rising video layer
  - both below the fixed header
  - modal overlay from `HowItWorksVideo` must remain above the scene and above the header

### `components/Hero.tsx`

- Should remain mostly unchanged
- May need a small prop or class hook only if required for layout integration, but should not receive scene progress or scene transforms directly
- Avoid moving stack-scene logic into this file

### `components/HowItWorksVideo.tsx`

- Should remain mostly unchanged
- May need an optional prop for className or layout mode if the new scene needs light control over spacing
- Avoid embedding page-scroll orchestration into this file
- Its modal behavior must continue to escape scene stacking correctly; ancestor transforms must not break modal visibility or clickability
- If the current modal cannot reliably stay above transformed ancestors, portaling the modal to `document.body` becomes part of the implementation scope

## Risks And Constraints

- Sticky scenes are sensitive to parent overflow and background stacking, so wrapper boundaries and `z-index` must be kept simple.
- Before implementation, audit ancestor containers including `app/layout.tsx`, `app/page.tsx`, `main`, and page wrappers for `overflow`, transforms, or clipping that could break sticky behavior.
- The hero currently includes animated content and broad full-width elements like the logo slider; the stack scene must not clip those unexpectedly.
- Mobile viewports need a gentler or shorter transition; below `md`, shorten the scene height and reduce total overlap distance.
- The fixed header and dotted background should continue to read cleanly during the stack transition.

## Success Criteria

- Scrolling down from the hero clearly shows the video section stacking above it.
- The hero stays pinned during the transition and softly scales/fades instead of vanishing.
- The hero never drops below `0.75` opacity during the transition.
- The transition feels smooth and modern on desktop.
- Mobile remains stable and readable.
- `HowItWorksVideo` modal open/close behavior remains unchanged.
- Subsequent sections continue in normal document flow after the transition.

## Testing Notes

Validate at minimum:

- desktop viewport: initial load, stack transition, modal open/close at `1440x900`
- mobile viewport: no clipping, no jumpy sticky behavior at `390x844`
- short / landscape viewport: sticky scene still releases cleanly at approximately `844x390`
- small-height viewport: confirm the scene still feels reasonable around `1280x600`
- reduced-motion: fallback to normal sequential flow
- header/background: no blank bands or layering regressions during the pinned scene
- browser sanity: verify sticky behavior in Safari/WebKit as well as Chromium
- interaction sanity: keyboard scroll and trackpad scroll both feel smooth, with no visible first-paint jump
- resize/orientation change: progress and layout re-measure cleanly if the viewport changes during or after the transition
