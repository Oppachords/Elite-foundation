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
  logo,
  director,
  programsManager,
  finance,
  communications,
};

export const HERO_IMAGES = [img1, img3, img5, img6, img8, img10, img11, img12, img13, img14];

export const STATS = [
  { value: 4000, suffix: "+", label: "Lives Impacted" },
  { value: 25, suffix: "+", label: "Communities Reached" },
  { value: 500, suffix: "+", label: "Children Supported" },
  { value: 100, suffix: "+", label: "Volunteers" },
];

export const FOCUS_AREAS = [
  { title: "Community Outreach & Relief", desc: "Direct support to rural families through food, essentials, and care visits.", icon: "HeartHandshake" },
  { title: "Youth & Women Empowerment", desc: "Skills, mentorship, and leadership training that unlocks opportunity.", icon: "Users" },
  { title: "Education Support", desc: "School supplies, fees assistance, and materials for underserved children.", icon: "GraduationCap" },
  { title: "Health & Sanitation", desc: "Medical camps, hygiene awareness, and community wellness programs.", icon: "Stethoscope" },
  { title: "Livelihood & Skills", desc: "Vocational, business, and entrepreneurship training for sustainable income.", icon: "Sprout" },
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
    image: img2,
    short: "Monthly food distribution in rural communities.",
    long: "Every month, our volunteers deliver food packages to vulnerable families in Iganga and Kaliro. A single package feeds a family of five for two weeks.",
    progress: 68,
  },
  {
    slug: "girls-in-school",
    title: "Girls in School Campaign",
    image: img8,
    short: "Providing school materials and educational support to girls in underserved areas.",
    long: "We supply uniforms, books, sanitary kits, and cover school fees for girls at risk of dropping out — keeping them learning and safe.",
    progress: 54,
  },
  {
    slug: "youth-skills",
    title: "Youth Skills Workshop",
    image: img5,
    short: "Business, ICT, vocational skills, entrepreneurship and leadership training.",
    long: "Hands-on workshops that equip young people with practical, income-generating skills and the mindset to build their own futures.",
    progress: 42,
  },
  {
    slug: "medical-outreach",
    title: "Medical Outreach",
    image: img6,
    short: "Basic health screening, awareness, hygiene campaigns and community wellness.",
    long: "Free medical camps in partnership with local clinicians — screenings, referrals, and health education for entire villages.",
    progress: 76,
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
    title: "Iganga Food Relief 2025",
    hero: img1,
    gallery: [img1, img2, img7, img9],
    location: "Iganga District",
    budget: 8000,
    raised: 5450,
    status: "Ongoing",
    description: "A six-month rolling food distribution supporting 300+ families across rural Iganga sub-counties.",
  },
  {
    slug: "kaliro-youth-skills",
    title: "Kaliro Youth Skills Camp",
    hero: img5,
    gallery: [img5, img3, img11],
    location: "Kaliro District",
    budget: 4500,
    raised: 1200,
    status: "Upcoming",
    description: "A two-week intensive equipping 120 young people with ICT, tailoring, and entrepreneurship skills.",
  },
  {
    slug: "kampala-medical-camp",
    title: "Kampala Community Medical Camp",
    hero: img6,
    gallery: [img6, img4, img12],
    location: "Kampala",
    budget: 3200,
    raised: 3200,
    status: "Completed",
    description: "A one-day free clinic delivering screenings, blood-pressure checks, and health education to 400+ residents.",
  },
  {
    slug: "girls-back-to-school",
    title: "Girls Back-to-School Drive",
    hero: img8,
    gallery: [img8, img4, img14],
    location: "Iganga",
    budget: 5000,
    raised: 2100,
    status: "Ongoing",
    description: "Uniforms, books, and fees for 200 girls to return to class for the new term.",
  },
];

export const COMMUNITIES = [
  { name: "Iganga", x: 62, y: 55, projects: 4, beneficiaries: "2,100+" },
  { name: "Kaliro", x: 66, y: 48, projects: 3, beneficiaries: "1,300+" },
  { name: "Kampala", x: 38, y: 62, projects: 2, beneficiaries: "600+" },
];

export const TEAM = [
  { name: "The Director", role: "Director & Founder", image: director, initials: "TD" },
  { name: "Programs Manager", role: "Programs Manager", image: programsManager, initials: "PM" },
  { name: "Finance Lead", role: "Finance", image: finance, initials: "FL" },
  { name: "Communications Lead", role: "Communications & Public Relations", image: communications, initials: "CL" },
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
    role: "Volunteer",
    image: img3,
    quote: "Serving with Elite Foundation reminded me what community really means. Every visit changes someone — including me.",
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
  whatsapp: "256786443879",
  location: "Kampala, Uganda",
  bank: { name: "Equity Bank", account: "1039103735170" },
};
