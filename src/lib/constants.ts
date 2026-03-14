import {
  Code2,
  Server,
  Smartphone,
  Cloud,
  Github,
  Linkedin,
  Twitter,
  BookOpen,
} from "lucide-react";

// ============================================
// NAVIGATION
// ============================================

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Journey", href: "#journey" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

// ============================================
// PERSONAL INFO
// ============================================

export const PERSONAL = {
  name: "Timo Heman",
  brand: "timotech.",
  role: "Fullstack Developer & Product Thinker",
  tagline: "Software that starts with people.",
  subtitle: "Product-minded developer. Remote from anywhere. Building across continents.",
  email: "timoheman16@gmail.com",
  location: "Remote — Worldwide",
  resumeUrl: "/timo-resume.pdf",
  yearsExperience: 3,
  bio: [
    "I build software the way I think it should be built — by understanding the people who'll use it before writing a single line of code.",
    "Over the past three years, I've shipped products across three continents — a gym management platform, analytics tools, and now a rideshare service connecting drivers and riders in Central Africa. Every project taught me that the best code solves real problems for real people.",
    "Beyond code, I'm a student of history, philosophy, and psychology — subjects that quietly shape how I think about products. I write about these intersections on Substack, where I explore what happens when technology meets human nature.",
  ],
} as const;

// ============================================
// SOCIAL LINKS
// ============================================

export const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/timo-tech19",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/timo-heman",
    icon: Linkedin,
  },
  {
    label: "X",
    href: "https://x.com/timo__tech",
    icon: Twitter,
  },
  {
    label: "Substack",
    href: "https://thinkwithtim.substack.com",
    icon: BookOpen,
  },
] as const;

// ============================================
// SKILLS
// ============================================

export const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "REST APIs",
  "Docker",
  "AWS",
  "Git",
  "Tailwind CSS",
  "Prisma",
  "Firebase",
  "React Native",
  "Supabase",
] as const;

// ============================================
// SERVICES
// ============================================

export const SERVICES = [
  {
    title: "Frontend Development",
    description:
      "The interface is where your product meets the person using it. I build frontends that feel fast, look intentional, and work on every screen.",
    icon: Code2,
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend Development",
    description:
      "Reliable systems that stay out of the user's way. APIs, databases, and architectures designed to scale without drama.",
    icon: Server,
    techs: ["Node.js", "Python", "PostgreSQL", "GraphQL"],
  },
  {
    title: "Mobile Development",
    description:
      "Apps that feel at home on any device. Cross-platform when it makes sense, with the performance users expect from native.",
    icon: Smartphone,
    techs: ["React Native", "Expo", "TypeScript"],
  },
  {
    title: "DevOps & Cloud",
    description:
      "Getting code from my machine to yours, reliably and repeatedly. Pipelines, containers, and cloud infrastructure that just work.",
    icon: Cloud,
    techs: ["Docker", "AWS", "CI/CD", "Vercel"],
  },
] as const;

// ============================================
// PROJECTS
// ============================================

export const PROJECTS = [
  {
    title: "Fitmy",
    description:
      "A gym management platform I co-founded and built from zero. Gym owners were drowning in spreadsheets — Fitmy replaced that chaos with memberships, scheduling, payments, and member tracking in one place.",
    image: "/fitmy.png",
    tags: ["TypeScript", "Next.js", "Prisma", "PostgreSQL"],
    liveUrl: "https://fitmy.app",
    githubUrl: null,
    featured: true,
  },
  {
    title: "Jotion",
    description:
      "My take on what a note-taking app should feel like. Real-time collaboration, rich text editing, and a distraction-free interface — built to understand how Notion-scale products work under the hood.",
    image: "/jotion.png",
    tags: ["TypeScript", "React", "Next.js", "Convex"],
    liveUrl: null,
    githubUrl: "https://github.com/timo-tech19",
    featured: true,
  },
  {
    title: "School Management",
    description:
      "A platform that gives school administrators their time back. Student records, class scheduling, grading, and parent communication — the daily workflows that deserve better software.",
    image: "/school-management.png",
    tags: ["TypeScript", "React", "Next.js", "Prisma"],
    liveUrl: null,
    githubUrl: "https://github.com/timo-tech19",
    featured: false,
  },
  {
    title: "Share Me",
    description:
      "A visual content platform where discovery feels natural. Pinterest-inspired design with real-time feeds — an exercise in building social features that keep people engaged without dark patterns.",
    image: "/share-me.png",
    tags: ["JavaScript", "React", "Sanity"],
    liveUrl: null,
    githubUrl: "https://github.com/timo-tech19",
    featured: false,
  },
] as const;

// ============================================
// WORK HISTORY
// ============================================

export const WORK_HISTORY = [
  {
    company: "Pronto",
    role: "Software Engineer",
    period: "Jun 2025 — Present",
    description:
      "Building the rideshare platform that Kinshasa has been waiting for. Ride-hailing and car charter services for the DRC — connecting riders with trusted drivers and creating economic opportunity in a region where reliable transport changes lives.",
    current: true,
    url: "https://www.prontohub.co",
  },
  {
    company: "Fitmy",
    role: "Product Engineer & Co-founder",
    period: "Jan 2025 — Oct 2025",
    description:
      "Co-founded and led product development for a gym management SaaS. Owned the full stack from database to design, and shipped features weekly based on real feedback from gym owners.",
    current: false,
    url: "https://www.fitmyapp.com",
  },
  {
    company: "Stat-ly",
    role: "Software Engineer",
    period: "2022",
    description:
      "Built analytics dashboards that turned raw data into decisions. Worked with large datasets and real-time processing pipelines for a US-based analytics company.",
    current: false,
    url: "https://www.linkedin.com/company/stat-ly",
  },
  {
    company: "FieldR",
    role: "Frontend Developer",
    period: "2021 — 2022",
    description:
      "Where it all started. Built responsive web applications and contributed to the design system for a Sri Lanka-based tech company. Learned that good software is as much about communication as it is about code.",
    current: false,
    url: "https://www.fieldr.lk",
  },
] as const;
