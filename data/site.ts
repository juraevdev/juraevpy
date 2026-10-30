/**
 * Single source of truth for personal/brand data.
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
  email: "juraevdevpy@gmail.com",
  focus: ["Django", "FastAPI", "AI", "Automation", "Business Systems"],
  /** Time zone shown in the availability line. */
  timezone: "Asia/Tashkent",
  timezoneLabel: "GMT+5",
  availability: "Open to remote roles · UK / EU",
  socials: [
    {
      id: "email",
      label: "Email",
      handle: "juraevdevpy@gmail.com",
      href: "mailto:juraevdevpy@gmail.com",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "/in/juraevdev",
      href: "https://www.linkedin.com/in/juraevdev",
    },
    {
      id: "github",
      label: "GitHub",
      handle: "@juraevdev",
      href: "https://github.com/juraevdev",
    },
    {
      id: "telegram",
      label: "Telegram",
      handle: "@juraevpy",
      href: "https://t.me/juraevpy",
    },
  ],
} as const;

export type Social = (typeof site.socials)[number];
