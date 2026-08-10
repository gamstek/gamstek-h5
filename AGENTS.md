# AGENTS.md

Project guidelines for AI coding agents working in this repository.

## Project

**GAMSTEK H5** — a mobile-first H5 website (all UI text is Simplified Chinese) for GAMSTEK mass spectrometers and scientific instruments. The site renders in a phone-frame column (`max-w-md mx-auto`), with a fixed `h-[76px]` header; pages under it compensate with `pt-[76px]`.

Stack: React 19 · Vite 6 · TypeScript 5.8 · Tailwind CSS v4 (`@tailwindcss/vite`) · react-router-dom v7 · Zustand 5 · `motion` v12 (`motion/react`) · lucide-react.

## Commands

- `npm run dev` — dev server on port 3000
- `npm run build` — production build
- `npm run lint` — `tsc --noEmit` only; there is **no ESLint/Prettier config** and **no test suite** — run `npm run lint` after changes

## Architecture

`src/App.tsx` mounts **two nested route trees, both at `/`** — pick the correct tree when adding pages:

- **Main site** under `<Layout />` (Header + Outlet + Footer): `/`, `products/ms8100`, `products/ms8000`, `products/ftms`, `cases`, `news`, `about`, `support`, `inquiry`, `recruitment`, `massclaw`.
- **Campus recruitment** under `<CampusLayout />` (its own fixed header + auth state): `campus-recruitment`, `campus-recruitment/job/:id`, `campus-recruitment/resume`, `campus-recruitment/submit-success`, `campus-recruitment/records`.

Directory responsibilities: `src/components/` (layout shells + shared UI), `src/pages/<section>/` (route pages), `src/api/` (fetch functions, one file per domain), `src/store/` (Zustand stores), `src/data/` (static config + fallback content).

## Conventions

### API (`src/api/*.ts`)
- All requests use native `fetch` against the hardcoded base URL `https://admin.gamstek.com`. No env vars, no axios, no central URL constant.
- Response envelope: `{ code, success, message, data }` — check `result.success`, degrade to `[]`/`null` on empty, `console.error` (Chinese message) and re-throw on failure.
- Authenticated endpoints read the token from `localStorage.getItem('campus_token')` and send header `authorization: Bearer <token>` (lowercase key).
- File upload posts the raw file body with `x-file-name: encodeURIComponent(file.name)`.
- Add API functions to the matching domain file (`src/api/campus.ts`, `cases.ts`, `news.ts`) rather than calling `fetch` inline in components.

### State (`src/store/*.ts`)
- Plain Zustand `create<T>((set, get) => ...)` — no persist middleware, no immer. Each store mirrors an API file and holds `isLoading` / `error` plus async actions.
- Campus auth is **not** in a store: it lives in `CampusLayout` local state + `localStorage` keys `campus_token` / `campus_phone`.

### Components
- Named function exports (`export function Header()`), exported props interfaces, optional props defaulted in destructure (`confirmText = '确定'`).
- Relative imports only — the `@/` alias exists but the codebase never uses it.
- Motion: `import { motion, AnimatePresence } from 'motion/react'`; overlays animate `opacity` backdrop + `y:'100%'` slide with spring transition, and lock body scroll via `useEffect` toggling `document.body.style.overflow`.
- Icons: `lucide-react`, small sizes with `stroke-[1.2]`/`stroke-[1.5]`.

### Styling
- Tailwind utility classes only (no CSS modules / styled-components). Arbitrary values are the norm: `text-[15px]`, `pt-[76px]`, `top-[76px]`, `z-[90]`…`z-[200]`.
- `src/index.css` is just `@import "tailwindcss"` — no `@theme` tokens. Brand colors are ad hoc: CTA red `#e60012`, sheet-action red `#d32f2f`, page bg `#f5f5f5`, body copy `text-[#333]`.
- `hide-scrollbar` is defined in an inline `<style>` tag rendered by `Layout.tsx`/`CampusLayout.tsx`, not in CSS — it only exists when a layout mounts.
- Repeat patterns where they already exist: `BottomSheet` (variants `'default'` / `'action'`) for pickers, `DatePickerDrawer` (custom snap-wheel) for dates.

## Pitfalls & Don'ts

- **Do not modify** `vite.config.ts` HMR/watch logic (`DISABLE_HMR` env var is intentional — file watching is disabled during agent edits).
- **Do not edit `src/data/campusJobs.ts`** — it's stale/dead data with an incompatible shape (string ids). Live jobs come from `/api/campus/jobs` (number ids) via the store.
- **Do not run the root `fix_*.cjs` / `patch_*.cjs` / `rewrite_*.cjs` scripts or `.diff`/`.patch` files** — they are historical one-off source-patching artifacts from the build-out phase. Edit `src/**` directly.
- Aliyun captcha and SMS authentication flow are integrated via `/api/campus/auth/sms/send` and `/api/campus/auth/sms/login`. Captcha configuration (`prefix`, `sceneId`) is managed centrally in `src/data/config.tsx`.
- `submitResume` in `src/api/campus.ts` returns the raw `Response` (not parsed JSON) — branch accordingly.
- All user-facing strings and console error messages are Simplified Chinese — keep them that way. `index.html` still carries AI Studio boilerplate (`lang="en"`, default title); the README/metadata are also untouched boilerplate.
- `tsc` has `strict` off; loose typing (`payload: any`) is the existing norm.
