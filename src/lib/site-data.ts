import img1 from "@/assets/img1.jpeg";
import img2 from "@/assets/img2.jpeg";
import img3 from "@/assets/img3.jpeg";
import img4 from "@/assets/img4.jpeg";
import img5 from "@/assets/img5.jpeg";
import img6 from "@/assets/img6.jpeg";
import img7 from "@/assets/img7.jpeg";
import img8 from "@/assets/img8.jpeg";
import img9 from "@/assets/img9.jpeg";
import img10 from "@/assets/img10.jpeg";
import img11 from "@/assets/img11.jpeg";
import img12 from "@/assets/img12.jpeg";
import img13 from "@/assets/img13.jpeg";
import img14 from "@/assets/img14.jpeg";
import img15 from "@/assets/img15.jpeg";
import img16 from "@/assets/img16.jpeg";
import logo from "@/assets/logo.png";
import director from "@/assets/Director.jpeg";
import programsManager from "@/assets/Programs manager.jpeg";
import finance from "@/assets/Finance .jpeg";
import communications from "@/assets/Communication & Public relations.jpeg";

export const LOGO = logo;

export const IMAGES = {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  logo,
  director,
  programsManager,
  finance,
  communications,
};

export const HERO_IMAGES = [img1, img3, img5, img6, img8, img10, img11, img12, img13, img14];

/** Page-specific hero carousels — prioritises photos not on the home hero. */
export const PAGE_HERO_IMAGES = {
  about: [img2, img7, img13],
  impact: [img4, img9, img12],
  stories: [img14, img9, img3],
  programs: [img2, img11, img7],
} as const;

export const STATS = [
  { value: 800, suffix: "+", label: "Lives Impacted" },
  { value: 5, suffix: "+", label: "Communities Reached" },
  { value: 100, suffix: "+", label: "Children Supported" },
  { value: 20, suffix: "+", label: "Volunteers" },
];

export const MISSION =
  "To empower and uplift vulnerable communities through sustainable outreach programs, education, health services, and youth empowerment initiatives.";

export const VISION =
  "A society where every individual, especially the underserved, has access to opportunities, dignity, and a voice.";

export const COMMUNITIES_SERVED = [
  "Rural families in Iganga and Kaliro districts",
  "School-going children in Iganga",
  "Agape Parents Primary School",
  "Persons with disabilities and elderly without care",
  "Vulnerable youth in Kaliro district",
];

export const FOCUS_AREAS = [
  { title: "Community Outreach & Relief", desc: "Community outreach and relief for rural families in Iganga and Kaliro.", icon: "HeartHandshake" },
  { title: "Youth & Women Empowerment", desc: "Youth and women empowerment through skills, mentorship, and leadership.", icon: "Users" },
  { title: "Education Support", desc: "School supplies, fees assistance, and materials for underserved children.", icon: "GraduationCap" },
  { title: "Health & Sanitation Awareness", desc: "Basic health screening, hygiene sensitization, and community wellness.", icon: "Stethoscope" },
  { title: "Livelihood & Skills Development", desc: "Practical business, vocational, and life skills for sustainable livelihoods.", icon: "Sprout" },
];

export const CORE_VALUES = [
  { title: "Compassion", icon: "Heart" },
  { title: "Integrity", icon: "ShieldCheck" },
  { title: "Community", icon: "Users" },
  { title: "Hope", icon: "Sun" },
  { title: "Service", icon: "HandHeart" },
  { title: "Empowerment", icon: "Sparkles" },
  { title: "Innovation", icon: "Lightbulb" },
  { title: "Accountability", icon: "ClipboardCheck" },
];

export const PROGRAMS = [
  {
    slug: "feed-a-family",
    title: "Feed a Family Program",
    image: img8,
    short: "Monthly food distribution in rural communities.",
    long: "Every month, our volunteers deliver food packages to vulnerable families in Iganga and Kaliro. A single package feeds a family of five for two weeks.",
    progress: 45,
  },
  {
    slug: "girls-in-school",
    title: "Girls in School Campaign",
    image: img16,
    short: "Supplying school materials to girls in underserved areas.",
    long: "We provide school materials and educational support to girls in underserved areas, including Iganga District.",
    progress: 40,
  },
  {
    slug: "youth-skills",
    title: "Youth Skill Workshop",
    image: img15,
    short: "Equipping youth with practical business and life skills.",
    long: "Hands-on workshops for vulnerable youth — especially in Kaliro — with practical business, vocational, and life skills.",
    progress: 35,
  },
  {
    slug: "medical-outreach",
    title: "Medical Outreach",
    image: img6,
    short: "Basic health screening and hygiene sensitization.",
    long: "Community medical outreach with basic health screening, health awareness, and hygiene sensitization.",
    progress: 50,
  },
];

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

export const PROJECTS: Project[] = [
  {
    slug: "iganga-food-relief-2025",
    title: "Iganga Food Relief",
    hero: img1,
    gallery: [img1, img2, img7, img9],
    location: "Iganga District",
    budget: 1600,
    raised: 950,
    status: "Ongoing",
    description: "Monthly food distribution for rural families in Iganga District through our Feed a Family Program.",
  },
  {
    slug: "kaliro-youth-skills",
    title: "Kaliro Youth Skill Workshop",
    hero: img15,
    gallery: [img15, img3, img11],
    location: "Kaliro District",
    budget: 900,
    raised: 350,
    status: "Ongoing",
    description: "Equipping vulnerable youth in Kaliro with practical business and life skills.",
  },
  {
    slug: "kampala-medical-camp",
    title: "Medical Outreach — Kampala",
    hero: img6,
    gallery: [img6, img4, img12],
    location: "Kampala",
    budget: 640,
    raised: 640,
    status: "Completed",
    description: "Basic health screening and hygiene sensitization for community members.",
  },
  {
    slug: "girls-back-to-school",
    title: "Girls in School — Iganga",
    hero: img16,
    gallery: [img16, img4, img14],
    location: "Iganga",
    budget: 1000,
    raised: 420,
    status: "Ongoing",
    description: "Supplying school materials to school-going girls in underserved areas of Iganga.",
  },
];

export const COMMUNITIES = [
  { name: "Iganga", x: 62, y: 55, projects: 2, detail: "Rural families & school-going children" },
  { name: "Kaliro", x: 66, y: 48, projects: 2, detail: "Vulnerable youth & rural families" },
  { name: "Kampala", x: 38, y: 62, projects: 1, detail: "Head office & outreach base" },
];

export const TEAM = [
  { name: "Kirunda Eric", role: "Director", image: director, initials: "KE" },
  { name: "Mukisa John Jackson", role: "Programs Manager", image: programsManager, initials: "MJ" },
  { name: "Kakaire Joshua", role: "Finance", image: finance, initials: "KJ" },
  { name: "Kibole Fred", role: "Communications Lead", image: communications, initials: "KF" },
];

export const STORIES = [
  {
    name: "Nakato's Family",
    role: "Beneficiary — Iganga",
    image: img1,
    quote: "The monthly food packages have kept my children in school. We are no longer choosing between meals and school fees.",
  },
  {
    name: "Peter M.",
    role: "Beneficiary — Iganga",
    image: img3,
    quote: "When Elite Foundation reached our home, everything changed. They brought food when we were hungry and hope when we had none.",
  },
  {
    name: "Grandma Rose",
    role: "Beneficiary — Kaliro",
    image: img9,
    quote: "I had no one to help me. They came with food, and they came with love. I thank God for Elite Foundation.",
  },
];

export const EVENTS = [
  { title: "Iganga Food Distribution", date: "2026-08-14", location: "Iganga District", type: "Outreach" },
  { title: "Free Medical Camp", date: "2026-09-05", location: "Kampala", type: "Health" },
  { title: "Youth Skills Workshop", date: "2026-09-20", location: "Kaliro", type: "Empowerment" },
  { title: "Annual Fundraising Dinner", date: "2026-10-18", location: "Kampala", type: "Fundraiser" },
  { title: "Volunteer Onboarding Day", date: "2026-11-02", location: "Kampala", type: "Volunteer" },
];

export const GALLERY = [
  { url: img1, cat: "Outreach" },
  { url: img2, cat: "Outreach" },
  { url: img3, cat: "Volunteers" },
  { url: img4, cat: "Events" },
  { url: img5, cat: "Children" },
  { url: img6, cat: "Health" },
  { url: img7, cat: "Outreach" },
  { url: img8, cat: "Education" },
  { url: img9, cat: "Outreach" },
  { url: img10, cat: "Community outreach" },
  { url: img11, cat: "Education" },
  { url: img12, cat: "Health" },
  { url: img13, cat: "Volunteers" },
  { url: img14, cat: "Children" },
];

export const CONTACT = {
  email: "Elitefoundation183@gmail.com",
  phones: ["+256786443879", "+256757696884"],
  instagram: "Elitefoundation001",
  whatsapp: "256757696884",
  location: "Kampala, Uganda",
  bank: { name: "Equity Bank", account: "1039103735170", label: "Equity Account number" },
};
