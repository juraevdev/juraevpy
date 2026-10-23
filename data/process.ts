export type ProcessStep = {
  title: string;
  description: string;
};

export const process: ProcessStep[] = [
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
];
