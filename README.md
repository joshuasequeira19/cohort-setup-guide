# Pre-Cohort Setup

Interactive setup guides for students to get their machine ready before a cohort starts. Each guide asks a few questions about the student's OS/hardware and only shows the steps that apply.

Stack: React + TypeScript + Vite, Tailwind CSS v4, [Motion](https://motion.dev) + [Motion Primitives](https://motion-primitives.com) for the animated UI, React Router for navigation.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

## Deploy (Cloudflare Pages)

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- `public/_redirects` handles client-side routing (all paths fall back to `index.html`) so refreshing a guide URL works correctly.

## Adding a new guide

1. Create a data file under `src/data/` exporting a `StepMap` (see `src/data/linuxSetup.tsx` for the pattern).
2. Add a page under `src/pages/guides/` that renders `<GuideView guideId="..." steps={...} />` inside `<PageShell>`.
3. Register the route in `src/App.tsx` and add a `<GuideCard>` entry to `src/pages/Home.tsx`.

The shared engine (`src/hooks/useGuideEngine.ts`) handles step history, localStorage persistence, and the "copy my steps as notes" feature automatically for any guide.
