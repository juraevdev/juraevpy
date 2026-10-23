import type { Locale } from "@/data/locale";

export type TgaiLocale = Locale;

type TgaiStrings = {
  title: string;
  tagline: string;
  category: string;
  demoLabel: string;
  frameTitle: string;
  waitingMeta: string;
  sentMeta: string;
  operator: string;
  steps: {
    found: string;
    drafted: string;
    needsOk: string;
    sent: string;
  };
  draftTo: string;
  recipientName: string;
  recipientHandle: string;
  draft: string;
  caption: string;
  rejectedCaption: string;
  approve: string;
  reject: string;
  sentConfirm: string;
  tryAgain: string;
  viewCase: string;
  backToWork: string;
  roleLabel: string;
  periodLabel: string;
  typeLabel: string;
  role: string;
  period: string;
  type: string;
  caseEyebrow: string;
  nextCase: string;
  readCase: string;
  chapters: {
    problem: { name: string; body: string };
    decision: { name: string; body: string };
    safety: { name: string; body: string };
    notSpam: { name: string; body: string };
    flow: { name: string; body: string };
    stack: { name: string; body: string };
  };
};

export const tgaiCopy: Record<Locale, TgaiStrings> = {
  en: {
    title: "TGAI Profile",
    tagline:
      "An AI agent that finds partners on Telegram and writes to them. Nothing is sent until you approve.",
    category: "AI Agent · Telegram Outreach CRM",
    demoLabel: "Interactive demo",
    frameTitle: "TGAI — Outreach",
    waitingMeta: "Waiting for you",
    sentMeta: "Sent",
    operator: "Find 30 freight channels",
    steps: {
      found: "Found",
      drafted: "Drafted",
      needsOk: "Needs your OK",
      sent: "Sent",
    },
    draftTo: "Draft to",
    recipientName: "Ibrohim",
    recipientHandle: "@yuk_kanal_admin",
    draft:
      "Hello Ibrohim! I'm from Caravan, a logistics platform. Could we discuss cooperation on the freight listings in your channel? Happy to share details.",
    caption: "Written by the agent. Nothing goes out until you approve.",
    rejectedCaption: "Rejected. Nothing was sent.",
    approve: "Approve & send",
    reject: "Reject",
    sentConfirm: "Message sent — only because you approved.",
    tryAgain: "Reset demo",
    viewCase: "View case study",
    backToWork: "Selected work",
    roleLabel: "Role",
    periodLabel: "Period",
    typeLabel: "Type",
    role: "Sole developer · Backend · AI agent",
    period: "2025 — 2026",
    type: "Internal product",
    caseEyebrow: "Case study",
    nextCase: "Next case study",
    readCase: "Read the case study",
    chapters: {
      problem: {
        name: "Problem",
        body: "Telegram outreach is mostly manual and repetitive: finding channels, identifying admins, writing first messages, and tracking who was contacted — all by hand.",
      },
      decision: {
        name: "Decision",
        body: "AI is an assistant, not the owner. It recommends, ranks, drafts, and summarizes. Irreversible actions — the first message, sending an AI draft, changing an important lead status, deleting data, launching a campaign — happen only after human approval.",
      },
      safety: {
        name: "Account safety",
        body: "Daily limits, working hours, pauses between messages, and Telegram flood limits are enforced. Losing the account is worse than not sending.",
      },
      notSpam: {
        name: "Why it is not spam",
        body: "Every message is approved by a person, rate-limited, and tied to a lead record. Nothing leaves the account without a claimable approval.",
      },
      flow: {
        name: "Flow",
        body: "Search → rank → join channels (safe pace) → find admins → CRM statuses (found → written → replied → negotiation → follow-up) → draft → approve → send & track.",
      },
      stack: {
        name: "Tech stack",
        body: "Python, Django, Django REST Framework, PostgreSQL, Celery, Redis, Telethon, aiogram, OpenAI tool calling.",
      },
    },
  },
  uz: {
    title: "TGAI Profile",
    tagline:
      "Telegram orqali hamkor topadigan va ularga yozadigan AI agent. Siz tasdiqlamaguncha hech narsa yuborilmaydi.",
    category: "AI Agent · Telegram Outreach CRM",
    demoLabel: "Demo",
    frameTitle: "TGAI — Outreach",
    waitingMeta: "Sizni kutmoqda",
    sentMeta: "Yuborildi",
    operator: "30 ta yuk kanal top",
    steps: {
      found: "Topildi",
      drafted: "Yozildi",
      needsOk: "Sizning OK",
      sent: "Yuborildi",
    },
    draftTo: "Kimga",
    recipientName: "Ibrohim",
    recipientHandle: "@yuk_kanal_admin",
    draft:
      "Assalomu alaykum, Ibrohim! Men Caravan logistika platformasidanman. Kanalingizdagi yuk e'lonlari bo'yicha hamkorlik qilsak bo'ladimi? Tafsilotlarini aytib beraman.",
    caption: "Agent yozdi. Siz tasdiqlamaguncha hech narsa ketmaydi.",
    rejectedCaption: "Rad etildi. Hech narsa yuborilmadi.",
    approve: "Tasdiqlash va yuborish",
    reject: "Rad etish",
    sentConfirm: "Xabar yuborildi — faqat siz tasdiqlaganingiz uchun.",
    tryAgain: "Demoni qayta boshlash",
    viewCase: "Case study ni ochish",
    backToWork: "Tanlangan ishlar",
    roleLabel: "Rol",
    periodLabel: "Davr",
    typeLabel: "Tur",
    role: "Yagona dasturchi · Backend · AI agent",
    period: "2025 — 2026",
    type: "Ichki mahsulot",
    caseEyebrow: "Case study",
    nextCase: "Keyingi case study",
    readCase: "Case study ni o‘qish",
    chapters: {
      problem: {
        name: "Muammo",
        body: "Telegram outreach asosan qo‘lda va takroriy: kanallarni topish, adminlarni aniqlash, birinchi xabarni yozish va kimga yozilganini kuzatish — hammasi qo‘lda.",
      },
      decision: {
        name: "Qaror",
        body: "AI — yordamchi, egasi emas. U tavsiya qiladi, tartiblaydi, draft yozadi, xulosa qiladi. Qaytarib bo‘lmaydigan ishlar — birinchi xabar, AI draftini yuborish, muhim lead holatini o‘zgartirish, ma’lumotni o‘chirish, kampaniyani ishga tushirish — faqat odam tasdiqlagandan keyin bo‘ladi.",
      },
      safety: {
        name: "Akkaunt xavfsizligi",
        body: "Kunlik limit, ish vaqti, xabarlar orasidagi pauza va Telegram flood cheklovlari majburiy. Akkauntni yo‘qotish — yubormaslikdan ham yomonroq.",
      },
      notSpam: {
        name: "Nega bu spam emas",
        body: "Har bir xabar odam tomonidan tasdiqlanadi, tezligi cheklangan va lead yozuviga bog‘langan. Tasdiqsiz hech narsa akkauntdan chiqmaydi.",
      },
      flow: {
        name: "Oqim",
        body: "Qidiruv → baholash → kanallarga qo‘shilish (xavfsiz tempo) → adminlarni topish → CRM holatlari (topildi → yozildi → javob → muzokara → follow-up) → draft → tasdiq → yuborish va kuzatish.",
      },
      stack: {
        name: "Texnik stek",
        body: "Python, Django, Django REST Framework, PostgreSQL, Celery, Redis, Telethon, aiogram, OpenAI tool calling.",
      },
    },
  },
};
