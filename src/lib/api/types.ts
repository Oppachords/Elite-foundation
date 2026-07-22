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

export type ProjectStatus = "Upcoming" | "Ongoing" | "Completed";

export type Project = {
  slug: string;
  title: string;
  hero: string;
  gallery: string[];
  location: string;
  budget: number;
  raised: number;
  status: ProjectStatus;
  description: string;
};

export type AdminDashboard = {
  children: SponsoredChild[];
  donations: DonationSubmission[];
  volunteers: VolunteerSubmission[];
  projects: Project[];
  gallery: GalleryItem[];
};
