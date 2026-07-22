import { boolean, integer, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const projectStatusEnum = pgEnum("project_status", ["Upcoming", "Ongoing", "Completed"]);

export const sponsoredChildren = pgTable("sponsored_children", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  story: text("story").notNull(),
  photo: text("photo").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const donations = pgTable("donations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  amount: integer("amount").notNull(),
  type: text("type").notNull(),
  childId: uuid("child_id"),
  childName: text("child_name"),
  paymentMethod: text("payment_method"),
  reference: text("reference"),
  proof: text("proof"),
  proofName: text("proof_name"),
  message: text("message"),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const volunteers = pgTable("volunteers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  profession: text("profession"),
  skills: text("skills"),
  availability: text("availability"),
  interest: text("interest"),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  slug: text("slug").primaryKey(),
  title: text("title").notNull(),
  hero: text("hero").notNull(),
  gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
  location: text("location").notNull(),
  budget: integer("budget").notNull(),
  raised: integer("raised").notNull().default(0),
  status: projectStatusEnum("status").notNull().default("Ongoing"),
  description: text("description").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const galleryItems = pgTable("gallery_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url").notNull(),
  cat: text("cat").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
