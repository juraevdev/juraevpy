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
  title: string;
  category: string;
  summary: string;
  /** Long-form case study content. */
  problem: string;
  system: string;
  engineering: string[];
  result: string;
  stack: string[];
  visual: ProjectVisualKey;
  year: string;
  role: string;
  type: string;
  pipeline?: PipelineStage[];
};

export const projects: Project[] = [
  {
    slug: "tgai-profile",
    title: "TGAI Profile",
    category: "AI Agent · Telegram Outreach CRM",
    summary:
      "An AI agent that finds partners on Telegram and writes to them. Nothing is sent until you approve.",
    problem:
      "Telegram outreach is mostly manual and repetitive: finding channels, identifying admins, writing first messages, and tracking who was contacted — all by hand.",
    system:
      "AI is an assistant, not the owner. It recommends, ranks, drafts, and summarizes. Irreversible actions happen only after human approval. Daily limits, working hours, and flood guards protect the account.",
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
      "In a pilot on a VPS the system discovered 52 channels and 82 admins and routed 366 drafts through the approval gate: 17 sent after approval, 10 rejected, 90 traced tool calls. Search, discovery, drafting and sending now run as one workflow.",
    stack: ["Python", "Django", "Celery", "Redis", "PostgreSQL", "Telethon", "OpenAI tool calling"],
    visual: "tgai",
    year: "2025 — 2026",
    role: "Sole developer · Backend · AI agent",
    type: "Internal product",
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
    title: "Caravan Dispatcher",
    category: "Telegram Logistics Automation Platform",
    summary:
      "Dispatch that runs inside Telegram: clients send orders, you assign drivers, drivers update status — nothing new to install.",
    problem:
      "Dispatch ran on chat messages and phone calls. Orders were lost in threads, statuses were unclear, and nobody could see what was in transit.",
    system:
      "Clients order through a bot, dispatchers assign drivers from a live board, drivers update statuses in chat, and the back office sees every shipment in one place. Telegram is the interface; the platform is the system of record.",
    engineering: ["Python", "Django", "Aiogram", "PostgreSQL", "Redis", "Celery", "Docker", "Nginx"],
    result:
      "Orders, assignments and statuses became structured data. The team catches delays early and answers 'where is it?' without a phone call.",
    stack: ["Python", "Django", "Aiogram", "PostgreSQL", "Redis", "Celery", "Docker"],
    visual: "caravan",
    year: "2025",
    role: "Backend · Bot platform · Infrastructure",
    type: "Operations platform",
  },
  {
    slug: "e-makon",
    title: "E-Makon",
    category: "Garden & Landscaping Service Management Platform",
    summary:
      "One system for a landscaping business: requests become quotes, quotes become scheduled jobs, and crews get a clear work order.",
    problem:
      "Requests arrived by call and message, the schedule lived in one person's head, and crews learned what a job needed only on arrival.",
    system:
      "Requests become quotes, quotes become scheduled jobs, and crews get work orders with materials and locations. Managers see capacity, upcoming work and payments in one dashboard; Telegram keeps crews in sync.",
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
      "Scheduling moved out of notebooks and chats into one system. Capacity is visible, jobs are planned ahead, and nothing depends on one person's memory.",
    stack: ["Python", "Django", "DRF", "PostgreSQL", "Celery", "Telegram Bot API"],
    visual: "emakon",
    year: "2024 — 2025",
    role: "Backend · Data model · Integrations",
    type: "Business system",
  },
  {
    slug: "ai-super-app",
    title: "AI Super App",
    category: "AI-Powered Productivity & Communication Ecosystem",
    summary:
      "You ask in plain language. The AI plans, creates tasks, blocks your calendar and reports back — it acts, not only answers.",
    problem:
      "Productivity tools live in silos, and assistants bolted onto them can answer but rarely have the context — or the permission — to act.",
    system:
      "An AI core connected to tasks, notes, conversations and calendar through tool calling. Users ask in plain language; the system plans, calls the right tools with the right permissions, and reports back over WebSockets.",
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
      "A foundation for AI that does real work inside a product, with clear boundaries between the model, its tools and the data it may touch.",
    stack: ["Python", "FastAPI", "AsyncIO", "WebSockets", "LLM APIs", "Tool calling", "Redis"],
    visual: "superapp",
    year: "2025 — 2026",
    role: "Architecture · AI systems · Real-time backend",
    type: "Product platform",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
