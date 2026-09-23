export type ProcessStep = {
  index: string;
  title: string;
  description: string;
  outputs: string[];
};

export const process: ProcessStep[] = [
  {
    index: "01",
    title: "Understand the problem",
    description:
      "Before any code: who uses it, what breaks today, and what 'better' looks like in numbers. Most failed systems solved the wrong problem well.",
    outputs: ["Requirements", "Constraints", "Success metrics"],
  },
  {
    index: "02",
    title: "Design the system",
    description:
      "Data model, boundaries, integrations. Decide what is synchronous, what becomes a background job, and where the risk lives.",
    outputs: ["Architecture", "Data model", "API contracts"],
  },
  {
    index: "03",
    title: "Build the core",
    description:
      "Business logic first — typed, tested, explicit. Then the API that exposes it. The interface can change; the core has to hold.",
    outputs: ["Domain models", "APIs", "Tests"],
  },
  {
    index: "04",
    title: "Automate the workflow",
    description:
      "Background workers, integrations and AI steps that remove the manual work around the core. Software should do the repetitive part.",
    outputs: ["Workers", "Integrations", "AI steps"],
  },
  {
    index: "05",
    title: "Observe & improve",
    description:
      "Logs, metrics and feedback loops. Systems get better when you can see them — and worse when you can't.",
    outputs: ["Monitoring", "Iteration", "Documentation"],
  },
];

export const principles = [
  "Architecture",
  "Business logic",
  "Scalability",
  "Automation",
  "Reliability",
  "Maintainability",
];
