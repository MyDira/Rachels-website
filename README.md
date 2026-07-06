# Design Glyph — Rachel Panigel's Portfolio

Rachel's portfolio website, built from her Design Glyph portfolio booklet.
Next.js 16 (App Router) + Tailwind CSS 4 + Framer Motion + Supabase.

## Pages

- `/` — Hero with the animated John Maeda quote (line-by-line entrance, in the
  booklet's proportions), a featured row of selected projects, about teaser,
  contact CTA.
- `/portfolio` — every brand, each clickable into its own page.
- `/portfolio/[slug]` — full brand story: logo, attributes, typeface, palette
  and the complete gallery of spreads.
- `/about` — About Me (editable from the admin).
- `/contact` — contact form (messages land in the admin inbox) + phone/email.
- `/admin/login` — hidden admin entrance (no links point here on purpose).
- `/admin` — manage projects (add / edit / delete / feature / reorder),
  read contact messages, and edit the About & Contact content.

## Local development

```bash
npm install
npm run dev
```

`.env.local` already contains the Supabase URL and publishable key.

## Supabase setup (one-time)

The site renders fully even without the database (it falls back to the
built-in booklet content), but for the admin to work you need to:

1. **Create the schema** — open the
   [SQL editor](https://supabase.com/dashboard/project/bnxjwiltforduwopnrly/sql/new)
   and run the contents of `supabase/migrations/0001_init.sql`.
2. **Create Rachel's login** — in
   [Authentication → Users](https://supabase.com/dashboard/project/bnxjwiltforduwopnrly/auth/users),
   click "Add user" → "Create new user", enter her email + a password
   (check "Auto confirm user").
3. **Seed the content** — sign in at `/admin/login` and click
   **"Import the booklet's 10 brands"**. Done.

## Content model

- `projects` + `project_images` — the portfolio.
- `site_content` — `about` and `contact` JSON blobs.
- `contact_messages` — the form inbox.
- Storage bucket `portfolio` — images Rachel uploads from the admin.

Anonymous visitors can only read (and submit contact messages); every write
requires Rachel's authenticated session (enforced with RLS).
