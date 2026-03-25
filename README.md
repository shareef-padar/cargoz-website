## Cargoz KSA — Next.js + Tailwind (tw- prefix) + Framer Motion

This is a fresh implementation of the Cargoz KSA homepage using:
- Next.js (App Router)
- Tailwind CSS (with the `tw` class prefix to match your current utilities)
- Framer Motion for subtle entrance animations

### Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000`

### Structure
- `app/` — App Router pages and layout
- `components/` — UI components (Header, Hero with QuoteBuilder, LogoSlider, Footer)
- `app/globals.css` — Tailwind setup and small design tokens/utilities

### Notes
- Tailwind is configured with `prefix: 'tw-'` to avoid clashes and align with your current markup.
- The homepage includes:
  - Social proof chips
  - Big headline
  - Quote builder card (city, space range, storage type + quick chips)
  - Customers logo slider (marquee)
- Replace placeholder logo blocks in `LogoSlider.tsx` with actual SVGs or images in `/public`.

### Next steps
- Hook the quote form to your backend route or CRM by updating the `action` and adding handlers.
- Add additional pages (Why Cargoz, Partners, Careers) and map real content.
- Replace inline color tokens with your design tokens if you have a system in place.

