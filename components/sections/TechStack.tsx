"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { stack } from "@/data/stack";
import { cn, pad } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/motion/FadeIn";

type Active = { cat: string; item: string } | null;

const total = stack.reduce((n, c) => n + c.items.length, 0);

/** An index, not a badge wall: categories as rows, technologies as large type, metadata on hover. */
export function TechStack() {
  const [active, setActive] = useState<Active>(null);

  return (
    <section id="stack" data-theme="dark" className="surface-dark" aria-labelledby="stack-title">
      <Container className="py-28 lg:py-40">
        <SectionTitle
          index="04"
          label="Technical expertise"
          id="stack-title"
          lines={["The stack behind", "the systems."]}
          meta={<Label>{total} technologies · {stack.length} categories</Label>}
          as="h2"
        />
        <FadeIn as="p" className="mt-10 max-w-xl text-lede text-muted lg:mt-14">
          Chosen for what they do in production, not for a logo wall. Hover anything for the
          role it plays.
        </FadeIn>

        <div className="mt-16 border-t border-line lg:mt-24" onMouseLeave={() => setActive(null)}>
          {stack.map((cat, ci) => {
            const activeItem =
              active?.cat === cat.id ? cat.items.find((i) => i.name === active.item) : undefined;
            return (
              <FadeIn
                key={cat.id}
                delay={0.04}
                className="grid grid-cols-12 gap-x-6 gap-y-5 border-b border-line py-8 lg:py-10"
              >
                <div className="col-span-12 lg:col-span-3">
                  <div className="flex items-center gap-3">
                    <Label tone="fg">{pad(ci + 1)}</Label>
                    <Label>{cat.name}</Label>
                  </div>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{cat.blurb}</p>
                </div>

                <ul
                  className="col-span-12 flex flex-wrap gap-x-7 gap-y-2 lg:col-span-6"
                  aria-label={`${cat.name} technologies`}
                >
                  {cat.items.map((item) => {
                    const isActive = activeItem?.name === item.name;
                    const dim = active?.cat === cat.id && !isActive;
                    return (
                      <li key={item.name}>
                        <button
                          type="button"
                          data-cursor="default"
                          data-active={isActive}
                          onMouseEnter={() => setActive({ cat: cat.id, item: item.name })}
                          onFocus={() => setActive({ cat: cat.id, item: item.name })}
                          onClick={() => setActive({ cat: cat.id, item: item.name })}
                          onBlur={() => setActive(null)}
                          aria-describedby={isActive ? `${cat.id}-meta` : undefined}
                          className={cn(
                            "link-underline cursor-default text-left text-display-sm transition-colors duration-500",
                            isActive
                              ? "text-fg-strong"
                              : dim
                                ? "text-muted-2"
                                : "text-muted hover:text-fg",
                          )}
                        >
                          {item.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="col-span-12 lg:col-span-3 lg:pt-1 lg:text-right">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={activeItem?.name ?? "default"}
                      id={`${cat.id}-meta`}
                      className={cn(
                        "font-mono text-[0.75rem] tracking-wide",
                        activeItem ? "text-fg" : "text-muted-2",
                      )}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25 }}
                    >
                      {activeItem ? `→ ${activeItem.meta}` : `${cat.items.length} in daily use`}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
