export type Locale = "uz" | "en";

export const LOCALE_KEY = "site-locale";
/** Previous TGAI-only key — still read once for migration. */
export const LEGACY_LOCALE_KEY = "tgai-locale";

export type SiteCopy = {
  nav: { work: string; about: string; contact: string; menu: string; primary: string };
  langLabel: string;
  hero: {
    titleLine1: string;
    titleLine2Before: string;
    titleLine2Em: string;
    lede: string;
    viewWork: string;
    writeToMe: string;
    available: string;
  };
  work: {
    eyebrow: string;
    titleLine1: string;
    titleLine2Before: string;
    titleLine2Em: string;
    viewCase: string;
  };
  about: {
    eyebrow: string;
    titleLine1: string;
    titleLine2Before: string;
    titleLine2Em: string;
    lede: string;
    howIWork: string;
    experience: string;
    tools: string;
    process: { title: string; description: string }[];
    experienceItems: { period: string; role: string; org: string; impact: string }[];
  };
  contact: {
    eyebrow: string;
    titleLine1: string;
    titleLine2Before: string;
    titleLine2Em: string;
    lede: string;
  };
  footer: { backToTop: string };
  common: {
    availability: string;
    role: string;
    city: string;
    selectedWork: string;
    nextCase: string;
    readCase: string;
    roleLabel: string;
    periodLabel: string;
    typeLabel: string;
    problem: string;
    system: string;
    engineering: string;
    result: string;
    howItRuns: string;
    sevenStages: string;
    oneWorkflow: string;
  };
  notFound: {
    eyebrow: string;
    titleLine1: string;
    titleLine2Em: string;
    backHome: string;
  };
  caravan: {
    title: string;
    category: string;
    tagline: string;
    frameTitle: string;
    meta: string;
    clientLabel: string;
    clientMsg: string;
    orderLabel: string;
    status: string;
    route: string;
    steps: { label: string; detail: string }[];
    caption: string;
  };
  emakon: {
    title: string;
    category: string;
    tagline: string;
    frameTitle: string;
    meta: string;
    requestLabel: string;
    requestMsg: string;
    jobTitle: string;
    status: string;
    jobMeta: string;
    steps: { label: string; detail: string }[];
    caption: string;
  };
  superapp: {
    title: string;
    category: string;
    tagline: string;
    frameTitle: string;
    meta: string;
    youLabel: string;
    youMsg: string;
    working: string;
    status: string;
    modules: string;
    steps: { label: string; detail: string }[];
    caption: string;
  };
};

export const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    nav: {
      work: "Work",
      about: "About",
      contact: "Contact",
      menu: "Menu",
      primary: "Primary",
    },
    langLabel: "Language",
    hero: {
      titleLine1: "Backend systems,",
      titleLine2Before: "made to ",
      titleLine2Em: "measure.",
      lede: "I design and build backend systems, AI workflows and automation for businesses — in Python.",
      viewWork: "View the work",
      writeToMe: "Write to me",
      available: "Available for work",
    },
    work: {
      eyebrow: "Selected work",
      titleLine1: "Built for the people",
      titleLine2Before: "who ",
      titleLine2Em: "run the business.",
      viewCase: "View case study",
    },
    about: {
      eyebrow: "About",
      titleLine1: "I don't just write backends.",
      titleLine2Before: "I build ",
      titleLine2Em: "systems.",
      lede: "Code is the last step. Before it comes the problem, the people who live with it, and the shape of a system that makes it go away.",
      howIWork: "How I work",
      experience: "Experience",
      tools: "Tools",
      process: [
        {
          title: "Understand the problem",
          description: "Who uses it, what breaks today, and what 'better' looks like in numbers.",
        },
        {
          title: "Design the system",
          description: "Data model, boundaries, integrations — and where the risk lives.",
        },
        {
          title: "Build the core",
          description: "Business logic first: typed, tested, explicit. Then the API that exposes it.",
        },
        {
          title: "Automate the workflow",
          description: "Workers, integrations and AI steps that remove the manual work around it.",
        },
        {
          title: "Observe and improve",
          description: "Logs, metrics and feedback. Systems get better when you can see them.",
        },
      ],
      experienceItems: [
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
      ],
    },
    contact: {
      eyebrow: "Contact",
      titleLine1: "Have a problem",
      titleLine2Before: "worth ",
      titleLine2Em: "solving?",
      lede: "Tell me what is slow, manual or fragile in your business. I'll tell you what a system for it would look like.",
    },
    footer: { backToTop: "Back to top" },
    common: {
      availability: "Open to remote roles · UK / EU",
      role: "Python Backend Developer",
      city: "Tashkent",
      selectedWork: "Selected work",
      nextCase: "Next case study",
      readCase: "Read the case study",
      roleLabel: "Role",
      periodLabel: "Period",
      typeLabel: "Type",
      problem: "Problem",
      system: "System",
      engineering: "Engineering",
      result: "Result",
      howItRuns: "How the system runs",
      sevenStages: "Seven stages,",
      oneWorkflow: "one workflow.",
    },
    notFound: {
      eyebrow: "404 · Page not found",
      titleLine1: "Nothing is",
      titleLine2Em: "here.",
      backHome: "Back to the start",
    },
    caravan: {
      title: "Caravan Dispatcher",
      category: "Telegram Logistics Automation Platform",
      tagline:
        "Dispatch that runs inside Telegram: clients send orders, you assign drivers, drivers update status — nothing new to install.",
      frameTitle: "Caravan — Dispatch",
      meta: "Live in Telegram",
      clientLabel: "Client · Telegram",
      clientMsg: "2 pallets to Depot 3. Needed today.",
      orderLabel: "Order",
      status: "In transit",
      route: "Hub A → Depot 3",
      steps: [
        { label: "Ordered", detail: "Client in Telegram" },
        { label: "Assigned", detail: "Driver: Azamat" },
        { label: "In transit", detail: "On the road now" },
        { label: "Delivered", detail: "Waiting" },
      ],
      caption: "Clients order, dispatchers assign, drivers update — all inside Telegram.",
    },
    emakon: {
      title: "E-Makon",
      category: "Garden & Landscaping Service Management",
      tagline:
        "One system for a landscaping business: requests become quotes, quotes become scheduled jobs, and crews get a clear work order.",
      frameTitle: "E-Makon — Job",
      meta: "This week",
      requestLabel: "New request",
      requestMsg: "Hedge trim and planting for Villa 4. Prefer Thursday.",
      jobTitle: "Villa 4 · Terrace garden",
      status: "Scheduled",
      jobMeta: "Crew B · Thursday · materials listed",
      steps: [
        { label: "Request", detail: "Client asked for a garden quote" },
        { label: "Quote", detail: "Sent · $1,240" },
        { label: "Scheduled", detail: "Thu · Crew B" },
        { label: "On site", detail: "Work order ready" },
      ],
      caption:
        "Requests become quotes, quotes become jobs — the schedule is no longer in one person's head.",
    },
    superapp: {
      title: "AI Super App",
      category: "AI-Powered Productivity & Communication",
      tagline:
        "You ask in plain language. The AI plans, creates tasks, blocks your calendar and reports back — it acts, not only answers.",
      frameTitle: "AI Super App",
      meta: "Acting, not only answering",
      youLabel: "You",
      youMsg: "Plan my week around three goals. Block focus time.",
      working: "AI is working",
      status: "In progress",
      modules: "Tasks · Calendar · Notes — one request",
      steps: [
        { label: "Understood", detail: "Three goals for the week" },
        { label: "Created tasks", detail: "3 tasks in your list" },
        { label: "Blocked calendar", detail: "Focus time on Tue–Thu" },
        { label: "Reported back", detail: "Ready when you are" },
      ],
      caption: "Chat, tasks and calendar share one AI layer that can act — not only answer.",
    },
  },
  uz: {
    nav: {
      work: "Ishlar",
      about: "Men haqimda",
      contact: "Aloqa",
      menu: "Menyu",
      primary: "Asosiy",
    },
    langLabel: "Til",
    hero: {
      titleLine1: "Backend tizimlar,",
      titleLine2Before: "o‘lchab ",
      titleLine2Em: "tikiladi.",
      lede: "Bizneslar uchun backend tizimlar, AI workflow va avtomatlashtirishni loyihalayman va quraman — Python’da.",
      viewWork: "Ishlarni ko‘rish",
      writeToMe: "Yozing",
      available: "Ishga ochiqman",
    },
    work: {
      eyebrow: "Tanlangan ishlar",
      titleLine1: "Biznesni yurituvchi",
      titleLine2Before: "odamlar ",
      titleLine2Em: "uchun.",
      viewCase: "Case study ni ochish",
    },
    about: {
      eyebrow: "Men haqimda",
      titleLine1: "Men faqat backend yozmayman.",
      titleLine2Before: "Men ",
      titleLine2Em: "tizim quraman.",
      lede: "Kod — oxirgi qadam. Undan oldin muammo, u bilan yashaydigan odamlar va muammoni yo‘qotadigan tizim shakli keladi.",
      howIWork: "Qanday ishlayman",
      experience: "Tajriba",
      tools: "Vositalar",
      process: [
        {
          title: "Muammoni tushunish",
          description: "Kim foydalanadi, bugun nima buziladi va 'yaxshiroq' raqamlarda nima demak.",
        },
        {
          title: "Tizimni loyihalash",
          description: "Ma’lumot modeli, chegaralar, integratsiyalar — va xavf qayerda.",
        },
        {
          title: "Yadroni qurish",
          description: "Avval biznes mantiq: tipik, testlangan, aniq. Keyin uni ochadigan API.",
        },
        {
          title: "Jarayonni avtomatlashtirish",
          description: "Worker’lar, integratsiyalar va atrofidagi qo‘l mehnatini olib tashlaydigan AI qadamlar.",
        },
        {
          title: "Kuzatish va yaxshilash",
          description: "Log, metrika va fikr-mulohaza. Tizimni ko‘rsangiz, u yaxshilanadi.",
        },
      ],
      experienceItems: [
        {
          period: "2026 — hozir",
          role: "Python Backend Developer",
          org: "IT / dasturiy loyihalar",
          impact: "AI yordamida outreach CRM va Telegram logistika platformasini ishga tushirdim.",
        },
        {
          period: "2025",
          role: "Mahsulot / Backend",
          org: "Mustaqil mahsulotlar va mijoz ishlari",
          impact: "Talabdan deploygacha: talablar, ma’lumot modeli, API, bot, joylashtirish.",
        },
        {
          period: "2024",
          role: "Backend dasturchi",
          org: "Freelance va startup loyihalar",
          impact: "Haqiqiy muddatlar ostida production API’lar yetkazdim.",
        },
        {
          period: "2023",
          role: "Asoslar",
          org: "Python · Bazalar · Tizimlar",
          impact: "Python, SQL, HTTP, Linux — va tizimlar qanday buziladi.",
        },
      ],
    },
    contact: {
      eyebrow: "Aloqa",
      titleLine1: "Yechishga arziydigan",
      titleLine2Before: "muammo ",
      titleLine2Em: "bormi?",
      lede: "Biznesingizda nima sekin, qo‘lda yoki mo‘rt ekanini ayting. Men unga mos tizim qanday ko‘rinishini aytaman.",
    },
    footer: { backToTop: "Yuqoriga" },
    common: {
      availability: "Masofaviy rollarga ochiqman · UK / EU",
      role: "Python Backend Developer",
      city: "Toshkent",
      selectedWork: "Tanlangan ishlar",
      nextCase: "Keyingi case study",
      readCase: "Case study ni o‘qish",
      roleLabel: "Rol",
      periodLabel: "Davr",
      typeLabel: "Tur",
      problem: "Muammo",
      system: "Tizim",
      engineering: "Muhandislik",
      result: "Natija",
      howItRuns: "Tizim qanday ishlaydi",
      sevenStages: "Yetti bosqich,",
      oneWorkflow: "bitta oqim.",
    },
    notFound: {
      eyebrow: "404 · Sahifa topilmadi",
      titleLine1: "Bu yerda",
      titleLine2Em: "hech narsa yo‘q.",
      backHome: "Boshiga qaytish",
    },
    caravan: {
      title: "Caravan Dispatcher",
      category: "Telegram logistika avtomatlashtirish platformasi",
      tagline:
        "Telegram ichida ishlaydigan dispatch: mijoz buyurtma yuboradi, siz haydovchini biriktirasiz, haydovchi holatni yangilaydi — yangi ilova o‘rnatish shart emas.",
      frameTitle: "Caravan — Dispatch",
      meta: "Telegram’da jonli",
      clientLabel: "Mijoz · Telegram",
      clientMsg: "Depot 3 ga 2 pallet. Bugun kerak.",
      orderLabel: "Buyurtma",
      status: "Yo‘lda",
      route: "Hub A → Depot 3",
      steps: [
        { label: "Buyurtma", detail: "Mijoz Telegram’da" },
        { label: "Biriktirildi", detail: "Haydovchi: Azamat" },
        { label: "Yo‘lda", detail: "Hozir harakatda" },
        { label: "Yetkazildi", detail: "Kutilmoqda" },
      ],
      caption: "Mijoz buyurtma beradi, dispatcher biriktiradi, haydovchi yangilaydi — hammasi Telegram’da.",
    },
    emakon: {
      title: "E-Makon",
      category: "Bog‘ va landshaft xizmatini boshqarish",
      tagline:
        "Landshaft biznesi uchun bitta tizim: so‘rovlar taklifga, takliflar rejalashtirilgan ishga aylanadi, jamoa aniq ish buyrug‘ini oladi.",
      frameTitle: "E-Makon — Ish",
      meta: "Shu hafta",
      requestLabel: "Yangi so‘rov",
      requestMsg: "Villa 4 uchun buta kesish va ekish. Payshanba afzal.",
      jobTitle: "Villa 4 · Terasa bog‘i",
      status: "Rejalashtirilgan",
      jobMeta: "Jamoa B · Payshanba · materiallar ro‘yxatda",
      steps: [
        { label: "So‘rov", detail: "Mijoz bog‘ uchun taklif so‘radi" },
        { label: "Taklif", detail: "Yuborildi · $1,240" },
        { label: "Reja", detail: "Pay · Jamoa B" },
        { label: "Joyda", detail: "Ish buyrug‘i tayyor" },
      ],
      caption: "So‘rov taklifga, taklif ishga aylanadi — jadval endi bitta odamning xotirasida emas.",
    },
    superapp: {
      title: "AI Super App",
      category: "AI asosidagi unumdorlik va aloqa",
      tagline:
        "Oddiy gap bilan so‘raysiz. AI rejalashtiradi, vazifa yaratadi, kalendarni band qiladi va javob beradi — u faqat javob bermaydi, ish qiladi.",
      frameTitle: "AI Super App",
      meta: "Javob emas, harakat",
      youLabel: "Siz",
      youMsg: "Haftamni uchta maqsad atrofida rejalashtir. Fokus vaqtini band qil.",
      working: "AI ishlayapti",
      status: "Jarayonda",
      modules: "Vazifalar · Kalendar · Qaydlar — bitta so‘rov",
      steps: [
        { label: "Tushundi", detail: "Hafta uchun uchta maqsad" },
        { label: "Vazifalar yaratdi", detail: "Ro‘yxatda 3 ta vazifa" },
        { label: "Kalendar band", detail: "Seshanba–Payshanba fokus" },
        { label: "Hisobot", detail: "Tayyor" },
      ],
      caption: "Chat, vazifa va kalendar bitta AI qatlami orqali ishlaydi — u harakat qila oladi.",
    },
  },
};
