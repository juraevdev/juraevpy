/**
 * Single source of truth for personal/brand data.
 * NOTE: url, email and social handles are placeholders — replace with real values.
 */
export const site = {
  name: "Davlat Juraev",
  firstName: "Davlat",
  lastName: "Juraev",
  role: "Python Backend Developer",
  tagline: "Backend systems, made to measure.",
  city: "Tashkent",
  description:
    "Python Backend Developer building AI-powered automation, scalable backend systems and software that solves real business problems.",
  url: "https://juraevpy.com",
  email: "hello@juraevpy.com",
  focus: ["Django", "FastAPI", "AI", "Automation", "Business Systems"],
  /** Time zone shown in the availability line. */
  timezone: "Asia/Tashkent",
  timezoneLabel: "GMT+5",
  availability: "Open to remote roles · UK / EU",
  socials: [
    {
      id: "email",
      label: "Email",
      handle: "hello@juraevpy.com",
      href: "mailto:hello@juraevpy.com",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "/in/davlatjuraev",
      href: "https://www.linkedin.com/in/davlatjuraev",
    },
    {
      id: "github",
      label: "GitHub",
      handle: "@davlatjuraev",
      href: "https://github.com/davlatjuraev",
    },
    {
      id: "telegram",
      label: "Telegram",
      handle: "@davlatjuraev",
      href: "https://t.me/davlatjuraev",
    },
  ],
} as const;

export type Social = (typeof site.socials)[number];
