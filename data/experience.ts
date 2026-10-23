export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  impact: string;
};

/**
 * NOTE: placeholder timeline — replace org names, periods and statements with real ones.
 */
export const experience: ExperienceItem[] = [
  {
    period: "2026 — Present",
    role: "Python Backend Developer",
    org: "IT / Software Projects",
    impact: "Shipped an AI-assisted outreach CRM and a Telegram-native logistics platform.",
  },
  {
    period: "2025",
    role: "Product / Backend Development",
    org: "Independent products & client work",
    impact: "Owned products end to end: requirements, data model, APIs, bots, deployment.",
  },
  {
    period: "2024",
    role: "Backend Developer",
    org: "Freelance & startup projects",
    impact: "Delivered production APIs for early-stage products under real deadlines.",
  },
  {
    period: "2023",
    role: "Foundations",
    org: "Python · Databases · Systems",
    impact: "Python, SQL, HTTP, Linux — and how systems fail.",
  },
];
