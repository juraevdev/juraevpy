"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealText } from "@/components/motion/RevealText";
import { LineReveal } from "@/components/motion/LineReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

type KeywordId = "backend" | "ai" | "automation" | "systems";

const KEYWORDS: { id: KeywordId; word: string; detail: string; more: string }[] = [
  {
    id: "backend",
    word: "Backend",
    detail: "Django / FastAPI",
    more: "APIs, domain logic, auth, data access — the part that has to be right.",
  },
  {
    id: "ai",
    word: "AI",
    detail: "LLM / AI workflows",
    more: "Tool calling and agents placed inside real processes, with real limits.",
  },
  {
    id: "automation",
    word: "Automation",
    detail: "Celery / Redis / integrations",
    more: "Background jobs, schedules, webhooks and bots that remove manual work.",
  },
  {
    id: "systems",
    word: "Systems",
    detail: "PostgreSQL / APIs / distributed workflows",
    more: "Schemas, boundaries and reliability — designed to survive change.",
  },
];

export function AboutSection() {
  const [active, setActive] = useState<KeywordId | null>(null);

  const keyword = (id: KeywordId, children: React.ReactNode) => (
    <span
      tabIndex={0}
      data-active={active === id}
      onMouseEnter={() => setActive(id)}
      onMouseLeave={() => setActive(null)}
      onFocus={() => setActive(id)}
      onBlur={() => setActive(null)}
      className={cn(
        "link-underline cursor-default text-fg-strong transition-opacity duration-500",
        active && active !== id && "opacity-50",
      )}
    >
      {children}
    </span>
  );

  return (
    <section
      id="about"
      data-theme="light"
      className="theme-light surface-light"
      aria-labelledby="about-title"
    >
      <Container className="py-28 @container lg:py-44">
        <div className="flex items-center gap-5 sm:gap-8">
          <FadeIn y={8} className="flex shrink-0 items-center gap-3">
            <Label tone="fg">01</Label>
            <Label>— Philosophy</Label>
          </FadeIn>
          <LineReveal className="flex-1" />
        </div>

        <RevealText
          as="h2"
          id="about-title"
          lines={["I don't just", "write backends."]}
          className="mt-10 text-display-xl uppercase lg:mt-14"
        />

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-28">
          <FadeIn className="col-span-12 lg:col-span-4">
            <p className="text-display-sm">I build systems.</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              Code is the last step. Before it comes the problem, the people who live with it,
              and the shape of a system that makes it go away.
            </p>
          </FadeIn>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <FadeIn
              as="p"
              delay={0.1}
              className="text-[clamp(1.375rem,2vw,2.25rem)] leading-[1.3] tracking-[-0.02em] text-fg"
            >
              From {keyword("backend", "APIs and databases")} to {keyword("ai", "AI workflows")}{" "}
              and {keyword("automation", "automation")}, I focus on turning complex business
              requirements into reliable software {keyword("systems", "systems")}.
            </FadeIn>

            <StaggerChildren
              as="ul"
              stagger={0.08}
              className="mt-14 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
              onMouseLeave={() => setActive(null)}
            >
              {KEYWORDS.map((k, i) => (
                <StaggerItem
                  as="li"
                  key={k.id}
                  onMouseEnter={() => setActive(k.id)}
                  className={cn(
                    "border-b border-line py-6 transition-opacity duration-500 sm:pr-6 lg:border-b-0 lg:pr-6",
                    i < KEYWORDS.length - 1 && "lg:border-r lg:border-line",
                    i > 0 && "lg:pl-6",
                    active && active !== k.id && "opacity-40",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Label tone="fg">{k.word}</Label>
                    <Label size="sm">0{i + 1}</Label>
                  </div>
                  <p className="mt-4 font-mono text-[0.72rem] leading-relaxed tracking-wide text-fg">
                    → {k.detail}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{k.more}</p>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </Container>
    </section>
  );
}
