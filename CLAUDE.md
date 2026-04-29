# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server (http://localhost:3000)
- `npm run build` — production build
- `npm start` — run the built app
- `npm run lint` — `next lint` with `next/core-web-vitals`

There is no test runner configured.

## Required environment

`.env.local` must define `KHEMSHIELD_BASE_URL` — the origin of the external GraphQL backend that server actions POST to at `${KHEMSHIELD_BASE_URL}/api/v1/graphql`. The dev default is `http://localhost:5000`. The frontend has no database of its own; all persistence happens through this backend.

## Architecture

Next.js 14 App Router (React 18, TypeScript strict mode). The `@/*` path alias maps to the repo root, so imports look like `@/app/components/...`.

### Route groups

`app/` uses two route groups that share `app/layout.tsx` (which only sets up the Jost font and `<html>/<body>`):

- `app/(main)/` — public marketing site. Its `layout.tsx` is the real chrome: `Toaster` (sonner), `TopElement`, `ButtonTop`, `SideDrawerItems`, `TopNav`, `ContentSpacing`, page content, `Footer` wrapped in `SectionSpacing`, then `BottomNav`. New public pages should slot under here so they pick up the chrome.
- `app/(auth)/` — currently empty; reserved for auth flows.

Routes under `(main)`: `about`, `blog`, `consultation`, `contact`, `event`, `event/[slug]` (and `event/[slug]/register`), `faq`, `project`, `request` (with its own `layout.tsx` and a `request/new` subroute), `service`, `training`. The event `[slug]` route is dynamic but currently renders static content for a single canonical event whose slug is exported from `app/(main)/event/eventSlug.ts`.

### Server actions → external GraphQL

Form submissions live in `app/actions/` (`contact.ts`, `events.ts`) marked `"use server"`. The pattern is consistent and should be followed for new forms:

1. Validate `FormData` with a Joi schema (`Joi.object({...}).validate(...)`). On error, return `{ message: error.message }`.
2. Build a GraphQL mutation string and POST JSON to `${process.env.KHEMSHIELD_BASE_URL}/api/v1/graphql`.
3. If the response has `errors`, return `{ message: postData.errors[0].message }`; otherwise return `{ message: "ok" }`.

Client forms (e.g. `app/(main)/contact/ContactForm.tsx`) consume these via `useFormState`, then watch `state.message` in a `useEffect` to fire `sonner` `toast.error` / `toast.success` and `router.replace("/")` on `"ok"`. A second `useEffect` mutates `state.message = ""` after an error to allow re-submission — when adding new forms, mirror this reset pattern rather than inventing a new one.

Note: existing actions interpolate validated values directly into the GraphQL query string. New mutations should prefer GraphQL variables to avoid injection from any future free-text fields.

### State

Zustand (`app/store/`):
- `nav-store.ts` — holds a `topRef` used by `ButtonTop` to scroll to top.
- `side-drawer.ts` — `open` flag plus `handleOpen`/`handleClose` for the mobile side drawer.

Both are tiny global singletons; component-local state should stay in the component.

### Components

`app/components/` is grouped by purpose: `Banners`, `Buttons`, `CallToActions`, `Carousels`, `Footer`, `Generics`, `Inputs`, `Medias`, `Menus`, `Navigation`, `OurServices`, `Spacing`, `Team`, `Testimonials`, `WhyChooseUs`. Reusable layout primitives worth knowing:

- `Generics/Wrapper` — standard horizontal padding (`px-6 lg:px-24`); wrap page sections in it for consistent gutters.
- `Spacing/ContentSpacing` (`my-10`), `Spacing/SectionSpacing`, `Spacing/BaseSpacing` — used between sections instead of ad-hoc margins.
- `Inputs/FormInput`, `Inputs/Label`, `Inputs/SelectInput`, `Inputs/TextArea`, `Buttons/FormSubmitButton` — the building blocks every form uses; prefer these over raw `<input>`.

Static content (events, testimonials) lives in `app/data/` as plain TS/TSX modules that components import directly.

### Styling

Tailwind v3 with custom theme tokens in `tailwind.config.ts`:
- Brand palette: `primary.{normal,dark,light,container}` (red `#F43334`/…), `secondary.{normal,light}`, `support`. Use these tokens rather than hardcoding hex.
- `xs` (380px) and `xl` (1400px) custom breakpoints in addition to defaults.
- `shadow-khemshadow` for the soft card shadow used on forms (e.g. ContactForm).
- `animate-slide-infinte` keyframe for the marquee carousel.
