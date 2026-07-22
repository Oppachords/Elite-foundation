import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import {
  adminCredentials,
  clearSessionCookieHeader,
  createSessionCookieValue,
  readSessionFromRequest,
  requireAdminSession,
  sessionCookieHeader,
  verifySessionCookieValue,
} from "./auth.server";
import type {
  AdminDashboard,
  DonationSubmission,
  GalleryItem,
  Project,
  ProjectStatus,
  SponsoredChild,
  VolunteerSubmission,
} from "./types";
import { getDb } from "../db/index.server";
import { donations, galleryItems, projects, sponsoredChildren, volunteers } from "../db/schema";

const childInput = z.object({
  name: z.string().min(1),
  age: z.number().int().min(1).max(18),
  story: z.string().min(1),
  photo: z.string().min(1),
});

const donationInput = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  amount: z.number().min(0),
  type: z.string().min(1),
  childId: z.string().uuid().optional(),
  childName: z.string().optional(),
  paymentMethod: z.string().optional(),
  reference: z.string().optional(),
  proof: z.string().optional(),
  proofName: z.string().optional(),
  message: z.string().optional(),
});

const volunteerInput = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  profession: z.string().optional(),
  skills: z.string().optional(),
  availability: z.string().optional(),
  interest: z.string().optional(),
});

const projectInput = z.object({
  title: z.string().min(1),
  hero: z.string().min(1),
  gallery: z.array(z.string()).optional(),
  location: z.string().min(1),
  budget: z.number().min(0),
  raised: z.number().min(0).optional(),
  status: z.enum(["Upcoming", "Ongoing", "Completed"]),
  description: z.string().min(1),
  slug: z.string().optional(),
});

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function mapChild(row: typeof sponsoredChildren.$inferSelect): SponsoredChild {
  return {
    id: row.id,
    name: row.name,
    age: row.age,
    story: row.story,
    photo: row.photo,
    createdAt: row.createdAt.toISOString(),
  };
}

function mapDonation(row: typeof donations.$inferSelect): DonationSubmission {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    amount: row.amount,
    type: row.type,
    childId: row.childId ?? undefined,
    childName: row.childName ?? undefined,
    paymentMethod: row.paymentMethod ?? undefined,
    reference: row.reference ?? undefined,
    proof: row.proof ?? undefined,
    proofName: row.proofName ?? undefined,
    message: row.message ?? undefined,
    read: row.read,
    createdAt: row.createdAt.toISOString(),
  };
}

function mapVolunteer(row: typeof volunteers.$inferSelect): VolunteerSubmission {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    profession: row.profession ?? undefined,
    skills: row.skills ?? undefined,
    availability: row.availability ?? undefined,
    interest: row.interest ?? undefined,
    read: row.read,
    createdAt: row.createdAt.toISOString(),
  };
}

function mapProject(row: typeof projects.$inferSelect): Project {
  return {
    slug: row.slug,
    title: row.title,
    hero: row.hero,
    gallery: row.gallery ?? [],
    location: row.location,
    budget: row.budget,
    raised: row.raised,
    status: row.status as ProjectStatus,
    description: row.description,
  };
}

function mapGallery(row: typeof galleryItems.$inferSelect): GalleryItem {
  return { url: row.url, cat: row.cat };
}

export const checkAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const token = readSessionFromRequest();
  return { authenticated: verifySessionCookieValue(token) };
});

export const adminLogin = createServerFn({ method: "POST" })
  .validator(z.object({ username: z.string(), password: z.string() }))
  .handler(async ({ data }) => {
    const creds = adminCredentials();
    if (data.username !== creds.username || data.password !== creds.password) {
      throw new Error("Invalid username or password");
    }
    setResponseHeader("Set-Cookie", sessionCookieHeader(createSessionCookieValue()));
    return { ok: true };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  setResponseHeader("Set-Cookie", clearSessionCookieHeader());
  return { ok: true };
});

export const getSponsoredChildren = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = getDb();
    const rows = await db.select().from(sponsoredChildren).orderBy(desc(sponsoredChildren.createdAt));
    return rows.map(mapChild);
  } catch (error) {
    console.error("getSponsoredChildren failed:", error);
    return [];
  }
});

export const getProjects = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = getDb();
    const rows = await db.select().from(projects).orderBy(desc(projects.createdAt));
    return rows.map(mapProject);
  } catch (error) {
    console.error("getProjects failed:", error);
    return [];
  }
});

export const getGallery = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = getDb();
    const rows = await db.select().from(galleryItems).orderBy(desc(galleryItems.createdAt));
    return rows.map(mapGallery);
  } catch (error) {
    console.error("getGallery failed:", error);
    return [];
  }
});

export const submitDonation = createServerFn({ method: "POST" })
  .validator(donationInput)
  .handler(async ({ data }) => {
    const db = getDb();
    const [row] = await db
      .insert(donations)
      .values({
        name: data.name,
        email: data.email,
        amount: data.amount,
        type: data.type,
        childId: data.childId,
        childName: data.childName,
        paymentMethod: data.paymentMethod,
        reference: data.reference,
        proof: data.proof,
        proofName: data.proofName,
        message: data.message,
      })
      .returning();
    return mapDonation(row);
  });

export const submitVolunteer = createServerFn({ method: "POST" })
  .validator(volunteerInput)
  .handler(async ({ data }) => {
    const db = getDb();
    const [row] = await db
      .insert(volunteers)
      .values({
        name: data.name,
        email: data.email,
        phone: data.phone,
        profession: data.profession,
        skills: data.skills,
        availability: data.availability,
        interest: data.interest,
      })
      .returning();
    return mapVolunteer(row);
  });

export const getAdminDashboard = createServerFn({ method: "GET" }).handler(async (): Promise<AdminDashboard> => {
  requireAdminSession();
  const db = getDb();
  const [childrenRows, donationRows, volunteerRows, projectRows, galleryRows] = await Promise.all([
    db.select().from(sponsoredChildren).orderBy(desc(sponsoredChildren.createdAt)),
    db.select().from(donations).orderBy(desc(donations.createdAt)),
    db.select().from(volunteers).orderBy(desc(volunteers.createdAt)),
    db.select().from(projects).orderBy(desc(projects.createdAt)),
    db.select().from(galleryItems).orderBy(desc(galleryItems.createdAt)),
  ]);
  return {
    children: childrenRows.map(mapChild),
    donations: donationRows.map(mapDonation),
    volunteers: volunteerRows.map(mapVolunteer),
    projects: projectRows.map(mapProject),
    gallery: galleryRows.map(mapGallery),
  };
});

export const adminAddChild = createServerFn({ method: "POST" })
  .validator(childInput)
  .handler(async ({ data }) => {
    requireAdminSession();
    const db = getDb();
    const [row] = await db.insert(sponsoredChildren).values(data).returning();
    return mapChild(row);
  });

export const adminUpdateChild = createServerFn({ method: "POST" })
  .validator(childInput.extend({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    requireAdminSession();
    const db = getDb();
    const [row] = await db
      .update(sponsoredChildren)
      .set({ name: data.name, age: data.age, story: data.story, photo: data.photo })
      .where(eq(sponsoredChildren.id, data.id))
      .returning();
    if (!row) throw new Error("Child not found");
    return mapChild(row);
  });

export const adminDeleteChild = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    requireAdminSession();
    const db = getDb();
    await db.delete(sponsoredChildren).where(eq(sponsoredChildren.id, data.id));
    return { ok: true };
  });

export const adminMarkDonationRead = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    requireAdminSession();
    const db = getDb();
    await db.update(donations).set({ read: true }).where(eq(donations.id, data.id));
    return { ok: true };
  });

export const adminMarkVolunteerRead = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    requireAdminSession();
    const db = getDb();
    await db.update(volunteers).set({ read: true }).where(eq(volunteers.id, data.id));
    return { ok: true };
  });

export const adminAddProject = createServerFn({ method: "POST" })
  .validator(projectInput)
  .handler(async ({ data }) => {
    requireAdminSession();
    const db = getDb();
    const slug = data.slug ?? slugify(data.title);
    const [row] = await db
      .insert(projects)
      .values({
        slug,
        title: data.title,
        hero: data.hero,
        gallery: data.gallery ?? [data.hero],
        location: data.location,
        budget: data.budget,
        raised: data.raised ?? 0,
        status: data.status,
        description: data.description,
      })
      .returning();
    return mapProject(row);
  });

export const adminUpdateProject = createServerFn({ method: "POST" })
  .validator(
    z.object({
      slug: z.string(),
      raised: z.number().optional(),
      title: z.string().optional(),
      location: z.string().optional(),
      budget: z.number().optional(),
      status: z.enum(["Upcoming", "Ongoing", "Completed"]).optional(),
      description: z.string().optional(),
      hero: z.string().optional(),
      gallery: z.array(z.string()).optional(),
    }),
  )
  .handler(async ({ data }) => {
    requireAdminSession();
    const db = getDb();
    const { slug, ...updates } = data;
    const [row] = await db.update(projects).set(updates).where(eq(projects.slug, slug)).returning();
    if (!row) throw new Error("Project not found");
    return mapProject(row);
  });

export const adminDeleteProject = createServerFn({ method: "POST" })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    requireAdminSession();
    const db = getDb();
    await db.delete(projects).where(eq(projects.slug, data.slug));
    return { ok: true };
  });

export const adminAddGalleryPhoto = createServerFn({ method: "POST" })
  .validator(z.object({ url: z.string().min(1), cat: z.string().min(1) }))
  .handler(async ({ data }) => {
    requireAdminSession();
    const db = getDb();
    const [row] = await db.insert(galleryItems).values(data).returning();
    return mapGallery(row);
  });

export const adminDeleteGalleryPhoto = createServerFn({ method: "POST" })
  .validator(z.object({ url: z.string().min(1) }))
  .handler(async ({ data }) => {
    requireAdminSession();
    const db = getDb();
    await db.delete(galleryItems).where(eq(galleryItems.url, data.url));
    return { ok: true };
  });

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
