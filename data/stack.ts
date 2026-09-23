export type StackItem = { name: string; meta: string };

export type StackCategory = {
  id: string;
  name: string;
  blurb: string;
  items: StackItem[];
};

export const stack: StackCategory[] = [
  {
    id: "backend",
    name: "Backend",
    blurb: "The core: domain logic, APIs, the code that has to be right.",
    items: [
      { name: "Python", meta: "Primary language, every layer" },
      { name: "Django", meta: "ORM, auth, admin — batteries included" },
      { name: "Django REST Framework", meta: "Serializers, viewsets, permissions" },
      { name: "FastAPI", meta: "Async, typed, fast to ship" },
      { name: "AsyncIO", meta: "Concurrency for I/O-heavy services" },
    ],
  },
  {
    id: "data",
    name: "Data",
    blurb: "Schemas that survive change and queries that stay fast.",
    items: [
      { name: "PostgreSQL", meta: "Indexes, constraints, migrations" },
      { name: "Redis", meta: "Cache, queues, rate limits" },
      { name: "SQL", meta: "Query design and performance" },
      { name: "Database Design", meta: "Modelling the business, not the UI" },
    ],
  },
  {
    id: "systems",
    name: "Systems",
    blurb: "Everything that runs when nobody is looking.",
    items: [
      { name: "Celery", meta: "Background jobs, retries, schedules" },
      { name: "Django Channels", meta: "Real-time over ASGI" },
      { name: "WebSockets", meta: "Live updates and presence" },
      { name: "REST APIs", meta: "Versioned, documented, predictable" },
      { name: "Background Jobs", meta: "The work users never see" },
    ],
  },
  {
    id: "ai",
    name: "AI",
    blurb: "Language models inside real workflows, with real boundaries.",
    items: [
      { name: "LLM APIs", meta: "OpenAI-compatible providers" },
      { name: "AI Agents", meta: "Planning, memory, execution" },
      { name: "Tool Calling", meta: "Models that use your system safely" },
      { name: "AI Automation", meta: "LLM steps in business processes" },
    ],
  },
  {
    id: "infra",
    name: "Infrastructure",
    blurb: "Reproducible, observable, boring in the best way.",
    items: [
      { name: "Docker", meta: "Reproducible environments" },
      { name: "Nginx", meta: "Reverse proxy, TLS, static files" },
      { name: "Gunicorn", meta: "Process management" },
      { name: "Linux", meta: "Servers, cron, debugging" },
      { name: "Git", meta: "History, reviews, releases" },
    ],
  },
  {
    id: "telegram",
    name: "Telegram",
    blurb: "Products that live where the users already are.",
    items: [
      { name: "Telethon", meta: "MTProto client automation" },
      { name: "Aiogram", meta: "Async bot framework" },
      { name: "Telegram Bot API", meta: "Bots as product interfaces" },
    ],
  },
];
