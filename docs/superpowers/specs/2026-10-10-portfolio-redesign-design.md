# Portfolio Redesign — Design Spec

Date: 2026-10-10
Reference: `~/Downloads/design for portfolio .png` (dark, rust-orange accent, left rail + scrolling content)

## Goal
Replace the current home page with a close clone of the reference design, using Harpreet's own content. Content is placeholder, isolated in one file so it can be filled in later.

## Decisions (agreed)
- Fidelity: close clone of the reference layout and look.
- Content: placeholders in `src/app/lib/content.ts`; real facts kept where already in the repo (IIT Roorkee 4th-year B.Tech EE, stack, email preetsinghlks@gmail.com). All placeholders marked `// TODO`.
- Existing search bar + command palette: `/chat` stays as its own page; home gets an "Ask me" link in the left rail pointing to `/chat`. Search bar is removed from the home page.

## Out of scope
- Real project copy, real social URLs, resume file, blog content.
- Changes to `/api/ask` behaviour.
- Adding a test suite (none exists; components are static presentation).

## Layout and routing
- `/` renders the new single-page portfolio; `Dashboard/page.tsx` is retired. The floating pill `Navbar` is no longer used.
- `LeftRail`: fixed, ~33% width on `md+`. Contains serif "Portfolio" wordmark, name caption, 1px orange vertical divider, links to `/chat` ("Ask me") and `/blog`, and a dot nav on the content edge that highlights the active section via IntersectionObserver. On `<md` it collapses to a sticky top bar (wordmark + links), dot nav hidden.
- Right column scrolls, sections in order: Hero, About, Projects, Skills, Connect. Each has an `id` for dot-nav and hero buttons (smooth scroll).

## Visual system
- Tokens in `tailwind.config` + `globals.css`: background ~#0a0a0a, 1px subtle grid texture, card/accent rust ~#8f3d2e, text accent orange ~#e8663d, muted gray body text, thin borders.
- Fonts via `next/font/google`: Cormorant Garamond (display serif), DM Sans (body). Exposed as CSS variables / Tailwind `font-display`, `font-sans`.
- Old blue/purple gradient styling is not used by new components.

## Components
All read from `content.ts`; server components unless state/effects are needed.
- `LeftRail` (client: active-section tracking).
- `Hero`: "I'm Harpreet." heading, role line, bio, two outlined buttons (View Work, Get in Touch).
- `AboutCard`: solid accent card, 3 paragraphs, italic pull quote.
- `FeaturedProject` with `variant: 'dark' | 'accent'`: badge, serif title, subtitle, description, tag pills, links. Accent variant right-aligned.
- `ProjectGrid`: 3-col grid (1 col mobile, 2 tablet) of small cards.
- `SkillGroups`: labeled groups of pill tags.
- `Connect`: serif heading, email, icon links, copyright.
- Existing `ScrollFadeIn` (from `sections.tsx`) reused for entrances; moved to its own file if `sections.tsx` is later removed.

## Data (`content.ts`)
Typed exports: `profile`, `about`, `featuredProjects` (2), `projects` (grid), `skillGroups`, `socials`. Types added to `lib/types.ts` or colocated.

## Cleanup
After the new page works: remove dead components (`ProjectsSection`, `sections` stats/about, `about.tsx`, `skills.tsx`, `ExperienceTimeline`, `navbar`, `footer`, `searchbar`/`command-palette` only if unused by `/chat`) — verify usage with grep before deleting. Restyle `/chat` in the new palette as the final step.

## Verification
- `next build` and `next lint` pass.
- Playwright screenshots at desktop (~1440) and mobile (~390) compared against the reference; check dot nav, anchors, `/chat` and `/blog` links.
