# Elite Foundation — Build Plan

This is a large, multi-feature NGO site plus admin CMS and AI assistant. To ship quality without a messy half-built result, I'll build in phases. Phase 1 is the full public marketing site (what donors/volunteers/partners see). Phases 2–3 add backend, CMS, and AI. Confirm the phasing and I'll start Phase 1 immediately.

## Design system (applies to all phases)

- Palette: Primary Blue `#0057A4`, Orange `#F7941D`, Warm Brown `#8B4513`, Dark Brown `#5A2D0C`, Cream `#FFF9F2`, White, Dark Text `#1F2937`. Subtle blue↔orange gradients as accents.
- Typography: Poppins (headings/buttons) + Inter (body), loaded via `<link>` in root route.
- All colors as semantic tokens in `src/styles.css` (oklch); no hardcoded hex in components.
- Motion: Framer Motion — fade/slide/zoom on scroll, count-up stats, hover lift on cards, smooth page transitions.
- Fully responsive, accessible (semantic HTML, alt text, keyboard nav, high contrast).
- SEO: per-route `head()` with unique title/description/OG, Schema.org NGO JSON-LD on root, sitemap + robots.

## Phase 1 — Public website (build now)

Routes (each with own SEO head):

1. `/` Home
   - Sticky nav with logo + Donate CTA (orange)
   - Hero: rotating slideshow of your uploaded photos, headline "Where Hope Meets Action", dual CTAs, animated stat counters (4,000+ lives, 25+ communities, 500+ children, 100+ volunteers)
   - Mission/Vision snapshot
   - Core Focus Areas cards (5, icon + hover animation)
   - Featured Programs preview (4)
   - Impact counters strip
   - Stories of Hope teaser
   - Partners CTA + Newsletter
2. `/about` — Mission, Vision, History (founded 4 Apr 2023, Kampala), Core Values (8 icon cards), Team section (Director, Programs Manager, Finance, Comms & PR — using `Director.jpeg` for the director), image collage
3. `/programs` — All 4 programs in rich grid: image, description, progress bar, Read More, Donate button
4. `/projects` — Project cards with status badges (Upcoming / Ongoing / Completed), progress bar, raised/target, gallery, Volunteer + Donate buttons. Seeded with representative content until CMS is live.
5. `/impact` — Large animated counters + Uganda map highlighting Iganga, Kaliro, Kampala (interactive SVG map with hover tooltips showing projects/beneficiaries)
6. `/gallery` — Masonry gallery from your uploaded photos with lightbox, filter chips (Outreach, Education, Health, Children, Events)
7. `/volunteer` — Registration form (name, email, phone, profession, skills, availability, interest, resume upload). Client-side validation with zod. Submission stored (Phase 2 wires to DB); Phase 1 shows thank-you confirmation.
8. `/donate` — Donation options (one-time / monthly / sponsor-a-child / feed-a-family / education / medical / custom), payment info (Equity Bank 1039103735170, MoMo +256757696884 / +256786443879), proof-of-payment upload form
9. `/partners` — Partnership pitch + inquiry form (orgs, churches, schools, companies, NGOs, volunteer groups)
10. `/events` — Calendar/list layout with upcoming events
11. `/stories` — Success stories, testimonials (beneficiary + volunteer), before/after
12. `/contact` — Google Map embed (Kampala), email, phones, Instagram `Elitefoundation001`, floating WhatsApp button, contact form

Global: sticky nav, rich footer (logo, mission, quick links, newsletter, socials, copyright), floating WhatsApp button on all pages.

Image handling: your 10 uploaded photos become Lovable Assets (CDN pointers) and get distributed across hero slideshow, program cards, gallery, stories, and about collage.

## Phase 2 — Backend (Lovable Cloud)

- Enable Lovable Cloud (Postgres + Auth + Storage)
- Tables (all with RLS + grants): `programs`, `projects`, `events`, `stories`, `gallery_items`, `volunteers`, `donations`, `partnership_requests`, `newsletter_subscribers`, `impact_stats`, `homepage_content`, `announcements`, `user_roles` (admin app_role enum + `has_role` security-definer)
- Storage buckets: `gallery`, `payment-proofs`, `resumes`
- Wire forms (volunteer, donate proof, partner, contact, newsletter) to insert rows and upload files
- Public pages read live content from DB with TanStack Query loaders

## Phase 3 — Admin CMS + AI assistant

- `/auth` login; `/_authenticated/admin/*` dashboard gated by `has_role(uid,'admin')`
- Admin screens: programs, projects, events, gallery, stories, volunteers list, partnership requests, donations + proofs viewer, impact stats editor, homepage content editor, announcements, AI knowledge base editor
- AI assistant: floating chat widget on public site, powered by Lovable AI Gateway (`google/gemini-3-flash-preview`) with a system prompt built from an editable `ai_knowledge` table so admins update it without code
- Server function `askAssistant` streams responses; admin UI to CRUD knowledge entries

## Technical notes

- Stack: TanStack Start (already scaffolded), Tailwind v4, shadcn/ui, Framer Motion, Lucide icons, react-hook-form + zod, TanStack Query
- Uganda map: inline SVG (lightweight, no map library dependency)
- All server logic via `createServerFn`; public API endpoints only if webhooks are needed
- Roles table pattern (never on profiles) per security rules
- SEO: unique `head()` per route; NGO Schema.org JSON-LD; `public/sitemap.xml` + `public/robots.txt`; `public/llms.txt`

## Ask before I start

1. Proceed with Phase 1 (public site, no backend yet) first, then Phases 2–3? Or should I enable Lovable Cloud upfront so forms save from day one?
2. Team section: I only have the Director photo. OK to use styled initial-avatars for Programs Manager, Finance, and Comms & PR until you upload their photos?
3. Any real numbers to use for stats/progress bars, or should I use the placeholders from your brief (4,000+ / 25+ / 500+ / 100+)?
