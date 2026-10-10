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
    category: "AI Agent · Telegram Outreach CRM",
    summary:
      "A Telegram outreach CRM driven by an LLM tool-calling agent. It finds and ranks channels, discovers their admins, drafts outreach and runs campaigns — and every high-risk action waits for a human to approve it.",
    problemShort: "Manual Telegram outreach was slow, untracked and impossible to scale.",
    outcomeShort: "One agent-driven workflow, with a human signing off on every send.",
    problem:
      "Manual Telegram outreach was slow and hard to manage. Finding relevant channels, working out who ran them, remembering who had already been contacted and writing every message by hand did not scale past a handful of prospects. Handing that work to an AI raised the opposite problem: nothing should reach a real person without someone approving it.",
    system:
      "An operator writes requests to a Telegram control bot. An OpenAI function-calling agent chooses from 34 tools — search, rank, join, fetch admins, save contacts, draft, send, organise folders, launch campaigns — runs them through a Telethon worker and reads each result before deciding the next step. Campaigns run as a database-backed state machine on Celery. High-risk actions pause the agent for approval, and a first message can only be sent once a human has approved the draft.",
    engineering: [
      "Python · Django · DRF",
      "PostgreSQL",
      "Celery + Redis",
      "Telethon · aiogram",
      "OpenAI tool calling",
      "34-tool agent loop",
      "Human approval gates",
      "Execution tracing",
    ],
    result:
      "Deployed on a VPS and used in a pilot, the system discovered 52 channels and 82 admins and routed 366 outreach drafts through the approval gate: 17 were sent after a human approved them, 10 were rejected. The agent made 90 traced tool calls. Search, discovery, drafting and sending now run as one workflow instead of ad-hoc chats.",
    stack: ["Python", "Django", "Celery", "Redis", "PostgreSQL", "Telethon", "OpenAI tool calling"],
    visual: "tgai",
    year: "2025 — 2026",
    role: "Sole developer · Backend · AI agent",
    type: "Internal product",
    featured: true,
    pipeline: [
      {
        id: "search",
        name: "Search",
        description:
          "The agent turns an operator's request into a channel search. The Telethon worker queries Telegram's public search and scores the results for relevance.",
        io: {
          input: "operator request",
          process: "agent → natural_search → Telethon",
          output: "candidate channels",
        },
      },
      {
        id: "rank",
        name: "Rank",
        description:
          "New channels are sent to the LLM in batches as a Celery job. A structured-output schema returns a quality score and category, and flags duplicates.",
        io: {
          input: "candidate channels",
          process: "LLM structured ranking · Celery",
          output: "ranked shortlist",
        },
      },
      {
        id: "join",
        name: "Join",
        description:
          "Channels are joined through the operator's own Telegram session. Outbound actions are held to a daily cap, working hours and randomised pacing, and freeze during Telegram flood penalties.",
        io: {
          input: "ranked shortlist",
          process: "Telethon · daily cap · jitter · flood guard",
          output: "joined channels",
        },
      },
      {
        id: "discover",
        name: "Discover Admins",
        description:
          "Admin lists are fetched through the Telegram API, de-duplicated across channels and saved as contacts.",
        io: {
          input: "joined channels",
          process: "Telegram API admins · de-duplication",
          output: "contacts",
        },
      },
      {
        id: "crm",
        name: "CRM",
        description:
          "Leads move through a status pipeline — from admin found to message sent, replied, negotiation and follow-up — with a full status history.",
        io: {
          input: "contacts",
          process: "lead statuses · history · follow-ups",
          output: "outreach-ready leads",
        },
      },
      {
        id: "approve",
        name: "Approve",
        description:
          "The LLM drafts each message. Sending, launching a campaign or deleting data pauses the agent; the operator approves or rejects in Telegram, and the database only releases approved drafts.",
        io: {
          input: "drafts · high-risk actions",
          process: "risk policy · inline approve / reject",
          output: "approved sends",
        },
      },
      {
        id: "monitor",
        name: "Send & Monitor",
        description:
          "Approved messages go out through the worker. Replies are classified and summarised by the LLM, follow-ups are scheduled, and a watchdog flags campaigns that stall.",
        io: {
          input: "approved sends · replies",
          process: "reply classification · follow-ups · watchdog",
          output: "tracked conversations",
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
