import { PROJECTS, GALLERY, type Project, type ProjectStatus } from "./site-data";

const STORAGE_KEY = "elite-foundation-admin";
const AUTH_KEY = "elite-foundation-auth";

export const ADMIN_USERNAME = "Admin";
export const ADMIN_PASSWORD = "ErickAlpha@1";

export type SponsoredChild = {
  id: string;
  name: string;
  age: number;
  story: string;
  photo: string;
  createdAt: string;
};

export type DonationSubmission = {
  id: string;
  name: string;
  email: string;
  amount: number;
  type: string;
  childId?: string;
  childName?: string;
  paymentMethod?: string;
  reference?: string;
  proof?: string;
  proofName?: string;
  message?: string;
  createdAt: string;
  read: boolean;
};

export type VolunteerSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  profession?: string;
  skills?: string;
  availability?: string;
  interest?: string;
  createdAt: string;
  read: boolean;
};

export type GalleryItem = {
  url: string;
  cat: string;
};

export type AdminStore = {
  children: SponsoredChild[];
  donations: DonationSubmission[];
  volunteers: VolunteerSubmission[];
  projects: Project[];
  gallery: GalleryItem[];
};

function defaultStore(): AdminStore {
  return {
    children: [],
    donations: [],
    volunteers: [],
    projects: PROJECTS.map((p) => ({ ...p })),
    gallery: GALLERY.map((g) => ({ ...g })),
  };
}

function readStore(): AdminStore {
  if (typeof window === "undefined") return defaultStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStore();
    const parsed = JSON.parse(raw) as Partial<AdminStore>;
    const base = defaultStore();
    return {
      children: parsed.children ?? base.children,
      donations: parsed.donations ?? base.donations,
      volunteers: parsed.volunteers ?? base.volunteers,
      projects: parsed.projects?.length ? parsed.projects : base.projects,
      gallery: parsed.gallery?.length ? parsed.gallery : base.gallery,
    };
  } catch {
    return defaultStore();
  }
}

function writeStore(store: AdminStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  window.dispatchEvent(new CustomEvent("elite-admin-update"));
}

export function getStore(): AdminStore {
  return readStore();
}

export function subscribeStore(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener("elite-admin-update", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("elite-admin-update", handler);
    window.removeEventListener("storage", handler);
  };
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function addChild(child: Omit<SponsoredChild, "id" | "createdAt">) {
  const store = readStore();
  store.children.push({
    ...child,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  });
  writeStore(store);
}

export function updateChild(id: string, updates: Partial<Omit<SponsoredChild, "id" | "createdAt">>) {
  const store = readStore();
  store.children = store.children.map((c) => (c.id === id ? { ...c, ...updates } : c));
  writeStore(store);
}

export function deleteChild(id: string) {
  const store = readStore();
  store.children = store.children.filter((c) => c.id !== id);
  writeStore(store);
}

export function addDonation(donation: Omit<DonationSubmission, "id" | "createdAt" | "read">) {
  const store = readStore();
  store.donations.unshift({
    ...donation,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
  });
  writeStore(store);
}

export function markDonationRead(id: string) {
  const store = readStore();
  store.donations = store.donations.map((d) => (d.id === id ? { ...d, read: true } : d));
  writeStore(store);
}

export function addVolunteer(volunteer: Omit<VolunteerSubmission, "id" | "createdAt" | "read">) {
  const store = readStore();
  store.volunteers.unshift({
    ...volunteer,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
  });
  writeStore(store);
}

export function markVolunteerRead(id: string) {
  const store = readStore();
  store.volunteers = store.volunteers.map((v) => (v.id === id ? { ...v, read: true } : v));
  writeStore(store);
}

export function saveProjects(projects: Project[]) {
  const store = readStore();
  store.projects = projects;
  writeStore(store);
}

export function addProject(project: Omit<Project, "slug"> & { slug?: string }) {
  const store = readStore();
  const slug =
    project.slug ??
    project.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  store.projects.push({ ...project, slug } as Project);
  writeStore(store);
}

export function updateProject(slug: string, updates: Partial<Project>) {
  const store = readStore();
  store.projects = store.projects.map((p) => (p.slug === slug ? { ...p, ...updates } : p));
  writeStore(store);
}

export function deleteProject(slug: string) {
  const store = readStore();
  store.projects = store.projects.filter((p) => p.slug !== slug);
  writeStore(store);
}

export function addGalleryPhoto(item: GalleryItem) {
  const store = readStore();
  store.gallery.unshift(item);
  writeStore(store);
}

export function deleteGalleryPhoto(url: string) {
  const store = readStore();
  store.gallery = store.gallery.filter((g) => g.url !== url);
  writeStore(store);
}

export function unreadCount(): number {
  const store = readStore();
  return store.donations.filter((d) => !d.read).length + store.volunteers.filter((v) => !v.read).length;
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export type { ProjectStatus };
