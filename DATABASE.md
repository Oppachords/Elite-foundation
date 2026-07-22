# Neon Database Setup (Vercel)

## 1. Create Neon database

1. Go to [console.neon.tech](https://console.neon.tech) and create a project (or use Vercel → Storage → Create Database → Neon).
2. Copy the **pooled connection string** (must include `?sslmode=require`).

## 2. Connect Neon to your Vercel project

If you created Neon via **Vercel Storage**, confirm it is **linked to this app** (not just created in the team). Vercel injects `POSTGRES_URL` automatically — you do **not** need to manually add `DATABASE_URL`.

Still add these in **Settings → Environment Variables**:

| Variable | Value |
|----------|-------|
| `ADMIN_USERNAME` | `Admin` |
| `ADMIN_PASSWORD` | `ErickAlpha@1` |
| `ADMIN_SESSION_SECRET` | A long random string (e.g. 32+ chars) |

Optional: if using manual Neon instead of Vercel Storage, set `DATABASE_URL` to your pooled connection string.

Apply to **Production**, **Preview**, and **Development**.

## 3. Redeploy

Push to GitHub or trigger a redeploy in Vercel. The `vercel-build` script will:

1. Push the Drizzle schema to Neon (`drizzle-kit push`)
2. Seed default projects and gallery (`scripts/seed.ts`)
3. Build the site

## 4. Test admin on live site

1. Open `https://your-vercel-url.vercel.app/admin`
2. Login: **Admin** / **ErickAlpha@1**
3. Add a child under **Sponsor Children** — it will appear on `/sponsor-a-child` for all visitors
4. Submit a test donation — it appears in **Donations** with optional payment proof

## Local development

```bash
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL

npm run db:push
npm run db:seed
npm run dev
```

## Tables created

- `sponsored_children` — child profiles for sponsorship
- `donations` — donation submissions + payment proofs
- `volunteers` — volunteer applications
- `projects` — CMS-managed projects
- `gallery_items` — CMS-managed gallery photos
