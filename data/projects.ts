export type ProjectVisualKey = "tgai" | "caravan" | "emakon" | "superapp";

export type PipelineStage = {
  id: string;
  name: string;
  description: string;
  /** Compact spec shown beside the stage. */
  io: { input: string; process: string; output: string };
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  /** Title split into display lines for the case-study heading. */
  titleLines: string[];
  category: string;
  summary: string;
  /** Short one-liners for the editorial row. */
  problemShort: string;
  outcomeShort: string;
  /** Long-form case study content. */
  problem: string;
  system: string;
  engineering: string[];
  result: string;
  /** Compact stack shown on the row. */
  stack: string[];
  visual: ProjectVisualKey;
  year: string;
  role: string;
  type: string;
  featured?: boolean;
  pipeline?: PipelineStage[];
};

export const projects: Project[] = [
  {
    slug: "tgai-profile",
    index: "01",
    title: "TGAI Profile",
    titleLines: ["TGAI", "Profile."],
    category: "AI-Assisted Telegram Outreach CRM",
    summary:
      "An outreach CRM that discovers relevant Telegram channels, identifies their admins and turns cold outreach into a structured, AI-assisted pipeline.",
    problemShort: "Manual Telegram outreach was slow, untracked and impossible to scale.",
    outcomeShort: "A manual process became a structured, measurable workflow.",
    problem:
      "Manual Telegram outreach was slow and hard to manage. Finding relevant channels, working out who ran them, remembering who had already been contacted and writing every message by hand did not scale past a handful of prospects — and nothing about the process could be measured.",
    system:
      "An AI-assisted outreach CRM. The system searches and ranks channels, joins them through managed Telegram sessions, discovers admins, stores prospects in a pipeline with stages and notes, and prepares personalised outreach drafts using LLM tool calling. A person approves every message before it goes out; the system handles everything around it.",
    engineering: [
      "Python",
      "Django",
      "Django REST Framework",
      "Telethon / Telegram API",
      "PostgreSQL",
      "Redis",
      "Celery",
      "LLM tool calling",
    ],
    result:
      "The outreach process turned from ad-hoc chats into a repeatable workflow. Prospects, conversations and follow-ups live in one system, quality no longer depends on who is typing, and every stage of the funnel is visible.",
    stack: ["Python", "Django", "Telegram API", "Redis", "Celery", "LLM tool calling", "PostgreSQL"],
    visual: "tgai",
    year: "2025 — 2026",
    role: "Architecture · Backend · AI workflows",
    type: "Internal product",
    featured: true,
    pipeline: [
      {
        id: "search",
        name: "Search",
        description:
          "Keyword and semantic search across Telegram channels and groups, seeded from the target market description.",
        io: {
          input: "market description",
          process: "keyword + semantic search",
          output: "candidate channels",
        },
      },
      {
        id: "rank",
        name: "Rank",
        description:
          "Channels scored on relevance, audience size and activity, with an LLM pass that filters out noise a keyword match would keep.",
        io: {
          input: "candidate channels",
          process: "scoring + LLM relevance pass",
          output: "ranked shortlist",
        },
      },
      {
        id: "join",
        name: "Join",
        description:
          "Rate-limited joining through managed Telethon sessions, with account rotation and health checks to stay within limits.",
        io: {
          input: "ranked shortlist",
          process: "Telethon sessions · rate limits · rotation",
          output: "joined channels",
        },
      },
      {
        id: "discover",
        name: "Discover Admins",
        description:
          "Admins and owners identified from channel metadata, pinned posts and message history, then de-duplicated into people.",
        io: {
          input: "joined channels",
          process: "metadata · pinned posts · history",
          output: "de-duplicated people",
        },
      },
      {
        id: "crm",
        name: "CRM",
        description:
          "Prospects move through stages with notes, ownership and follow-up reminders — a pipeline instead of a chat list.",
        io: {
          input: "people",
          process: "stages · notes · ownership · reminders",
          output: "qualified prospects",
        },
      },
      {
        id: "outreach",
        name: "Outreach",
        description:
          "Personalised drafts generated with tool calling against the prospect's context. Sent only after human approval.",
        io: {
          input: "qualified prospects",
          process: "LLM draft · tool calls · human approval",
          output: "sent messages",
        },
      },
      {
        id: "analytics",
        name: "Analytics",
        description:
          "Reply rates, funnel conversion and account health tracked per campaign, feeding back into ranking.",
        io: {
          input: "sent messages · replies",
          process: "funnel + account health tracking",
          output: "campaign insight → ranking",
        },
      },
    ],
  },
  {
    slug: "caravan-dispatcher",
    index: "02",
    title: "Caravan Dispatcher",
    titleLines: ["Caravan", "Dispatcher."],
    category: "Telegram Logistics Automation Platform",
    summary:
      "A dispatch platform that runs inside Telegram. Orders come in, drivers are matched, routes and statuses are tracked — with nothing new to install.",
    problemShort: "Dispatching lived in chat messages and phone calls. Orders got lost.",
    outcomeShort: "Chat-based chaos became a trackable operation.",
    problem:
      "Dispatching cargo between clients and drivers was handled through chat messages and phone calls. Orders were lost in threads, statuses were unclear, and nobody had a single view of what was in transit at any given moment.",
    system:
      "A Telegram-native dispatcher. Clients submit orders through a bot, dispatchers assign drivers from a live board, drivers update statuses directly in chat, and the back office sees every shipment, driver and exception in one place. Telegram is the interface; the platform is the system of record.",
    engineering: ["Python", "Django", "Aiogram", "PostgreSQL", "Redis", "Celery", "Docker", "Nginx"],
    result:
      "Orders, assignments and statuses became structured data instead of chat history. The team can see the whole operation, catch delays early and answer 'where is it?' without a phone call.",
    stack: ["Python", "Django", "Aiogram", "PostgreSQL", "Redis", "Celery", "Docker"],
    visual: "caravan",
    year: "2025",
    role: "Backend · Bot platform · Infrastructure",
    type: "Operations platform",
  },
  {
    slug: "e-makon",
    index: "03",
    title: "E-Makon",
    titleLines: ["E-Makon."],
    category: "Garden & Landscaping Service Management Platform",
    summary:
      "A service management platform for a landscaping business: requests, quotes, crew scheduling and job tracking in one system.",
    problemShort: "Requests came by phone, schedules lived in someone's head.",
    outcomeShort: "Operations became visible and plannable.",
    problem:
      "Service requests arrived through calls and messages, the schedule lived in one person's head, and crews often did not know what the next job needed until they arrived on site. Growth meant more chaos, not more revenue.",
    system:
      "A management platform where requests become quotes, quotes become scheduled jobs, and crews receive clear work orders with materials and locations. Managers see capacity, upcoming work and payments from a single dashboard, with Telegram notifications keeping crews in sync.",
    engineering: [
      "Python",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Celery",
      "Redis",
      "Telegram Bot API",
      "Docker",
    ],
    result:
      "Scheduling and job tracking moved out of notebooks and chats into a system the whole team works from. Capacity is visible, jobs are planned in advance, and nothing depends on one person's memory.",
    stack: ["Python", "Django", "DRF", "PostgreSQL", "Celery", "Telegram Bot API"],
    visual: "emakon",
    year: "2024 — 2025",
    role: "Backend · Data model · Integrations",
    type: "Business system",
  },
  {
    slug: "ai-super-app",
    index: "04",
    title: "AI Super App",
    titleLines: ["AI Super", "App."],
    category: "AI-Powered Productivity & Communication Ecosystem",
    summary:
      "A productivity ecosystem where chat, tasks, notes and voice are connected through a shared AI layer that can act — not just answer.",
    problemShort: "Productivity tools are silos. AI assistants answer, but can't act.",
    outcomeShort: "An AI layer that does real work across the product.",
    problem:
      "Productivity tools live in silos, and AI assistants bolted onto them can answer questions but rarely have the context — or the permissions — to actually do the work. Users end up copying between tools with the assistant watching.",
    system:
      "A modular platform with an AI core connected to the user's tasks, notes, conversations and calendar through tool calling. Users ask in natural language; the system plans, calls the right tools with the right permissions, and reports back. Real-time updates flow over WebSockets so every module reflects what the AI did.",
    engineering: [
      "Python",
      "FastAPI",
      "AsyncIO",
      "WebSockets",
      "PostgreSQL",
      "Redis",
      "LLM APIs",
      "AI agents / tool calling",
      "Docker",
    ],
    result:
      "A foundation for AI features that do real work inside a product, with clear boundaries between the model, the tools it may call and the data it may touch.",
    stack: ["Python", "FastAPI", "AsyncIO", "WebSockets", "LLM APIs", "Tool calling", "Redis"],
    visual: "superapp",
    year: "2025 — 2026",
    role: "Architecture · AI systems · Real-time backend",
    type: "Product platform",
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
