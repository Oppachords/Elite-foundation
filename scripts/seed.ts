import "dotenv/config";
import { getDb } from "../src/lib/db/index.server";
import { galleryItems, projects } from "../src/lib/db/schema";
import { GALLERY, PROJECTS } from "../src/lib/site-data";

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to seed the database.");
  }

  const db = getDb();

  const existingProjects = await db.select().from(projects);
  if (existingProjects.length === 0) {
    await db.insert(projects).values(
      PROJECTS.map((p) => ({
        slug: p.slug,
        title: p.title,
        hero: p.hero,
        gallery: p.gallery,
        location: p.location,
        budget: p.budget,
        raised: p.raised,
        status: p.status,
        description: p.description,
      })),
    );
    console.log(`Seeded ${PROJECTS.length} projects`);
  } else {
    console.log("Projects already seeded, skipping");
  }

  const existingGallery = await db.select().from(galleryItems);
  if (existingGallery.length === 0) {
    await db.insert(galleryItems).values(GALLERY.map((g) => ({ url: g.url, cat: g.cat })));
    console.log(`Seeded ${GALLERY.length} gallery items`);
  } else {
    console.log("Gallery already seeded, skipping");
  }

  console.log("Seed complete");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
