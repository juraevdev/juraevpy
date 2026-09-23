export type ExperienceItem = {
  year: string;
  role: string;
  org: string;
  period: string;
  responsibility: string;
  impact: string;
};

/**
 * NOTE: placeholder timeline — replace org names, periods and statements with real ones.
 */
export const experience: ExperienceItem[] = [
  {
    year: "2026",
    role: "Python Backend Developer",
    org: "IT / Software Projects",
    period: "2026 — Present",
    responsibility:
      "Designing and building backend systems, AI-assisted workflows and automation platforms for business clients.",
    impact: "Shipped an AI-assisted outreach CRM and a Telegram-native logistics platform.",
  },
  {
    year: "2025",
    role: "Product / Backend Development",
    org: "Independent products & client work",
    period: "2025",
    responsibility:
      "Owned products end to end: requirements, data model, APIs, bots, deployment.",
    impact: "Turned recurring business problems into working, maintained software.",
  },
  {
    year: "2024",
    role: "Backend Developer",
    org: "Freelance & startup projects",
    period: "2024",
    responsibility:
      "Django / DRF APIs, PostgreSQL schemas, third-party integrations and background processing.",
    impact: "Delivered production APIs for early-stage products under real deadlines.",
  },
  {
    year: "2023",
    role: "Foundations",
    org: "Python · Databases · Systems",
    period: "2023",
    responsibility:
      "Deep focus on fundamentals: Python, SQL, HTTP, Linux, and how systems fail.",
    impact: "Built the base every project since has stood on.",
  },
];
