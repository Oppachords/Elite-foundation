import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

/** Public pages included in the sitemap (admin excluded). */
const SITEMAP_PATHS = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.9", changefreq: "monthly" },
  { path: "/programs", priority: "0.9", changefreq: "monthly" },
  { path: "/projects", priority: "0.9", changefreq: "weekly" },
  { path: "/impact", priority: "0.8", changefreq: "monthly" },
  { path: "/donate", priority: "0.9", changefreq: "monthly" },
  { path: "/sponsor-a-child", priority: "0.9", changefreq: "weekly" },
  { path: "/volunteer", priority: "0.8", changefreq: "monthly" },
  { path: "/gallery", priority: "0.7", changefreq: "monthly" },
  { path: "/stories", priority: "0.8", changefreq: "monthly" },
  { path: "/events", priority: "0.7", changefreq: "weekly" },
  { path: "/partners", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
];

function getSiteUrl() {
  const fromEnv = process.env.SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production.replace(/^https?:\/\//, "")}`;

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;

  return "http://localhost:8080";
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const siteUrl = getSiteUrl();
const lastmod = new Date().toISOString().slice(0, 10);
const publicDir = resolve(process.cwd(), "public");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_PATHS.map(
  ({ path, priority, changefreq }) => `  <url>
    <loc>${escapeXml(`${siteUrl}${path}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
).join("\n")}
</urlset>
`;

const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Disallow: /admin

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(resolve(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(resolve(publicDir, "robots.txt"), robots, "utf8");

console.log(`Generated robots.txt and sitemap.xml for ${siteUrl}`);
