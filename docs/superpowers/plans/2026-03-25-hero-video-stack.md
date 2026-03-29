# Hero Video Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a scroll-linked scene where `HowItWorksVideo` stacks over a pinned `Hero`, with the hero gently scaling/fading during the overlap and a reduced-motion fallback to the current sequential layout.

**Architecture:** Introduce one new client orchestration component, `HeroVideoStackScene`, that owns sticky layout, scene height, scroll progress, and transforms. Keep `Hero` and `HowItWorksVideo` focused on their existing content/UI responsibilities, with only light integration hooks if required.

**Tech Stack:** Next.js App Router, React, Framer Motion, Tailwind (prefixed `tw-`)

---

## File Structure

**Create:**
- `components/HeroVideoStackScene.tsx` — scene wrapper that composes `Hero` and `HowItWorksVideo`, owns sticky geometry, scroll progress, transforms, and reduced-motion fallback

**Modify:**
- `app/page.tsx` — replace direct `Hero` + `HowItWorksVideo` rendering with the new scene component
- `components/Hero.tsx` — only if needed for a lightweight integration prop/class hook; do not move scene progress into this file
- `components/HowItWorksVideo.tsx` — only if needed for spacing/class integration; modal behavior must stay intact
- `app/layout.tsx` — audit only; modify only if ancestor overflow / sticky constraints require it

**Verify:**
- `npm run build`
- `npm run lint`
- manual browser QA at `http://localhost:3000`

## Task 1: Audit Sticky Constraints Before Writing The Scene

**Files:**
- Read: `app/layout.tsx`
- Read: `app/page.tsx`
- Read: `components/Hero.tsx`
- Read: `components/HowItWorksVideo.tsx`
- Read: `components/HeroDotGridLayer.tsx`

- [ ] **Step 1: Audit ancestor overflow and transforms**

Inspect:
- `app/layout.tsx`
- `app/page.tsx`
- `main`
- the new scene parent wrappers

Specifically look for:
- `overflow`, especially anything beyond simple `overflow-x-hidden`
- transforms on ancestors
- clipping that could break `position: sticky`

Expected:
- no ancestor introduces sticky-breaking vertical overflow
- any risky wrapper is identified before scene code is added

- [ ] **Step 2: Record whether mitigation is needed**

If the audit finds a sticky hazard, decide the smallest safe fix before building the scene.

Allowed outcomes:
- no change needed
- narrow wrapper/class adjustment in `app/page.tsx`
- narrow wrapper/class adjustment in `app/layout.tsx`

Do not begin scene implementation until this is understood.

## Task 2: Create The Stack Scene Component

**Files:**
- Create: `components/HeroVideoStackScene.tsx`
- Read: `components/Hero.tsx`
- Read: `components/HowItWorksVideo.tsx`

- [ ] **Step 1: Sketch the scene contract in the new file**

Create `components/HeroVideoStackScene.tsx` as a client component that imports:
- `Hero`
- `HowItWorksVideo`
- `motion`, `useReducedMotion`, `useScroll`, `useTransform`
- `useRef`

The component should expose no props for the first pass.

- [ ] **Step 2: Build the reduced-motion fallback first**

Start with the simplest correct structure:

```tsx
'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Hero } from './Hero';
import { HowItWorksVideo } from './HowItWorksVideo';

export function HeroVideoStackScene() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion !== false) {
    return (
      <>
        <Hero />
        <HowItWorksVideo />
      </>
    );
  }

  return <div>TODO stack scene</div>;
}
```

This contract is intentional:
- `reduceMotion === true` -> sequential fallback
- `reduceMotion === null` / unresolved -> sequential fallback
- only `reduceMotion === false` should render the stacked scene

That avoids a wrong-mode flash before the preference resolves on the client.

- [ ] **Step 3: Add scene geometry and sticky layout**

Implement the non-reduced-motion scene with:
- outer wrapper ref (`sceneRef`)
- desktop scene height around `200vh`
- smaller scene height around `160vh - 175vh`
- sticky hero layer pinned below the fixed header clearance

Suggested structure:

```tsx
const sceneRef = useRef<HTMLDivElement>(null);

return (
  <section
    ref={sceneRef}
    className="tw-relative tw-h-[170vh] md:tw-h-[200vh]"
  >
    <div className="tw-sticky tw-top-24 md:tw-top-28 tw-h-[calc(100vh-6rem)] md:tw-h-[calc(100vh-7rem)]">
      <div className="tw-relative tw-h-full">
        {/* lower z-index hero motion wrapper */}
        {/* higher z-index video motion wrapper, absolutely positioned within the sticky viewport */}
      </div>
    </div>
  </section>
);
```

Use final Tailwind values that best match the existing `pt-24 md:pt-28` page clearance.
The important rule is:
- below `md`: shorter scene (`160vh - 175vh`)
- `md` and above: full desktop scene (`200vh`)
The video layer should share the same sticky viewport via an absolutely positioned wrapper inside the sticky container; do not leave it as a disconnected flow block below the sticky area, or the overlap timing will be much harder to control.

- [ ] **Step 4: Wire scene scroll progress**

Use:

```tsx
const { scrollYProgress } = useScroll({
  target: sceneRef,
  offset: ['start start', 'end end'],
});
```

This is the required scene contract:
- `0.0 - 0.5`: hold phase
- `0.5 - 1.0`: transition phase

Map a second normalized progress for the transition half, for example:

```tsx
const stackProgress = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
```

Clamp/interpolate so the hero and video stay visually flat during the hold phase.
Initial client render must visually match progress `0`.

- [ ] **Step 5: Add hero wrapper transforms**

Apply transforms to a wrapper around `<Hero />`, not to nodes inside `Hero`.

Required targets:
- scale: `1 -> 0.95`
- opacity: `1 -> 0.75`
- y: `0 -> -16` (or `-20` if it feels better)

Example shape:

```tsx
const heroScale = useTransform(stackProgress, [0, 1], [1, 0.95]);
const heroOpacity = useTransform(stackProgress, [0, 1], [1, 0.75]);
const heroY = useTransform(stackProgress, [0, 1], [0, -16]);
```

Bind them on a `motion.div` wrapper around `<Hero />`, for example:

```tsx
<motion.div style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}>
  <Hero />
</motion.div>
```

- [ ] **Step 6: Add video wrapper overlap transform**

Apply transforms to a wrapper around `<HowItWorksVideo />`.

Requirements:
- no visible overlap during `scrollYProgress < 0.625`
- meaningful upward travel only during the transition phase
- rising video must sit above the hero wrapper but below the fixed header

One acceptable pattern:

```tsx
const videoY = useTransform(scrollYProgress, [0.625, 1], [140, -120]);
```

Tune the exact numbers visually, but preserve the contract:
- late overlap start
- clear foreground takeover
- smooth settle before scene release

Bind the video transform on a wrapper `motion.div` around `<HowItWorksVideo />`, with explicit `z-index` above the hero wrapper.

- [ ] **Step 7: Give explicit stacking order**

Ensure the wrapper z-index contract is:
- hero wrapper below video wrapper
- both below `Header`
- `HowItWorksVideo` modal still above everything

Do not put unnecessary transforms on ancestors that could trap the modal under a new stacking context.

- [ ] **Step 8: Manual browser check**

Run the dev server and verify:
- Hero pins below the navbar
- Hero does not start scaling/fading immediately
- Video begins overlapping late in the scene
- Transition feels smooth, not springy

Expected: visual stacking effect is present, even if spacing still needs refinement.

## Task 3: Integrate The Scene Into The Home Page

**Files:**
- Modify: `app/page.tsx`
- Create/Use: `components/HeroVideoStackScene.tsx`

- [ ] **Step 1: Replace direct section composition**

Change:

```tsx
<Hero />
<HowItWorksVideo />
```

to:

```tsx
<HeroVideoStackScene />
```

Keep all later sections in their current order.

- [ ] **Step 2: Keep background layering intact**

Verify `HeroDotGridLayer` still sits behind the new scene correctly and the page wrapper stays transparent where needed.

- [ ] **Step 3: Run page-level browser check**

Expected:
- no blank band behind the header
- no duplicate hero/video content
- normal flow resumes at `WhyCargoz`

## Task 4: Add Only The Smallest Integration Hooks Needed

**Files:**
- Modify (if needed): `components/Hero.tsx`
- Modify (if needed): `components/HowItWorksVideo.tsx`

- [ ] **Step 1: Inspect whether the new wrappers alone are enough**

Do not change `Hero.tsx` or `HowItWorksVideo.tsx` unless there is a concrete layout issue that cannot be solved from the scene component.

- [ ] **Step 2: If needed, add one lightweight integration hook to `Hero`**

Allowed examples:
- optional `className`
- optional `contentClassName`
- optional `stacked` boolean that only changes spacing, never progress logic

Not allowed:
- passing scene progress into `Hero`
- moving `useScroll` or sticky logic into `Hero`

- [ ] **Step 3: If needed, add one lightweight integration hook to `HowItWorksVideo`**

Allowed examples:
- optional wrapper class
- optional top padding mode for the stacked layout

Not allowed:
- embedding page scroll choreography into the component
- breaking modal behavior

- [ ] **Step 4: Verify modal still escapes correctly**

Open the video modal during or after the stack scene.

Expected:
- modal backdrop covers the viewport
- modal sits above the header
- clicks and Escape still work

If not, move the modal to a portal rooted at `document.body`.

## Task 5: Tune Mobile, Reduced Motion, And Resize Behavior

**Files:**
- Modify: `components/HeroVideoStackScene.tsx`

- [ ] **Step 1: Tune mobile scene height**

Below `md`, reduce scene height and overlap distance so the pinned segment does not feel too long.

Expected:
- effect is still visible
- hero content is not cramped
- video card does not crowd the hero too early

- [ ] **Step 2: Confirm reduced-motion fallback**

With reduced motion enabled, verify the page falls back to:

```tsx
<>
  <Hero />
  <HowItWorksVideo />
</>
```

Expected:
- no sticky pinning
- no scroll-linked transforms
- content order unchanged
- no visible layout flash when the preference resolves on the client
- initial non-scrolled paint remains visually valid before measurement

- [ ] **Step 3: Verify resize/orientation re-measure**

While the page is open:
- resize desktop browser
- rotate a mobile simulator

Expected:
- transforms re-measure cleanly
- no jump to a broken overlap state
- sticky release still works

## Task 6: Lint, Build, And Manual QA

**Files:**
- Verify: `app/page.tsx`
- Verify: `components/HeroVideoStackScene.tsx`
- Verify: `components/Hero.tsx`
- Verify: `components/HowItWorksVideo.tsx`

- [ ] **Step 1: Run lint**

Run:

```bash
cd /Users/shareefpadar/Documents/Hobby/cargoz-next && npm run lint
```

Expected:
- no new lint errors in the scene-related files
- existing unrelated warnings may remain, but do not introduce new ones if avoidable

- [ ] **Step 2: Run build**

Run:

```bash
cd /Users/shareefpadar/Documents/Hobby/cargoz-next && npm run build
```

Expected:
- build succeeds
- no type errors

- [ ] **Step 3: Desktop manual QA**

Verify at `1440x900`:
- initial load has no first-paint jump before scroll
- hero pins below header
- hero starts transforming only in the second half of the scene
- video starts overlapping late
- no clipping of the logo slider or hero content
- transition into `WhyCargoz` feels natural

- [ ] **Step 4: Mobile manual QA**

Verify at `390x844`:
- no jumpy sticky behavior
- no cramped overlap
- hero remains readable

Verify at `844x390` and around `1280x600`:
- sticky scene releases correctly
- the transition does not feel endless

- [ ] **Step 5: Safari / WebKit sanity check**

If Safari is available, verify:
- sticky behavior works
- transforms do not glitch
- modal still appears above transformed content

- [ ] **Step 6: Keyboard and trackpad scroll QA**

Verify both:
- normal trackpad / mousewheel scroll
- keyboard scroll (`PageDown`, space, arrow keys if applicable)

Expected:
- scene progress feels consistent
- no trapped scroll feeling during the pinned segment
- hero/video still start from spec default values before movement

- [ ] **Step 7: Optional final commit**

Stage only the files used for this feature, then commit:

```bash
git add app/page.tsx components/HeroVideoStackScene.tsx components/Hero.tsx components/HowItWorksVideo.tsx
git commit -m "feat: add stacked hero to video scroll transition"
```

If only `app/page.tsx` and `components/HeroVideoStackScene.tsx` change, keep the commit smaller and stage only those files.
