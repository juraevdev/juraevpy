"use client";

import { site } from "@/data/site";
import { useScrollToAnchor } from "@/hooks/useScrollToAnchor";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealText } from "@/components/motion/RevealText";
import { HeroSystemGraphic, HeroSystemFlowCompact } from "./HeroSystemGraphic";

const HEADLINE = ["Building", "software", "that solves", "real business", "problems."] as const;

export function Hero() {
  const scrollTo = useScrollToAnchor();

  return (
    <section
      id="top"
      data-theme="dark"
      className="surface-dark relative flex min-h-svh flex-col"
      aria-labelledby="hero-title"
    >
      <Container className="flex flex-1 flex-col pb-32 pt-[calc(var(--nav-h)+2rem)] lg:pb-36 lg:pt-[calc(var(--nav-h)+3rem)]">
        <div className="grid flex-1 grid-cols-12 items-center gap-x-6 gap-y-16">
          {/* Statement */}
          <div className="col-span-12 @container lg:col-span-7">
            <FadeIn trigger="mount" delay={0.45} className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Label tone="fg">{site.role}</Label>
              <span aria-hidden className="hidden h-px w-10 bg-line-strong sm:block" />
              <Label className="hidden sm:inline">{site.focus.slice(0, 4).join(" · ")}</Label>
            </FadeIn>

            <RevealText
              as="h1"
              id="hero-title"
              trigger="mount"
              delay={0.65}
              lines={HEADLINE}
              className="mt-8 text-display-hero uppercase lg:mt-10"
              lineClassName="whitespace-nowrap"
            />

            <FadeIn
              as="p"
              trigger="mount"
              delay={1.3}
              className="mt-10 max-w-[34rem] text-lede text-muted lg:mt-14"
            >
              I design and build backend systems, AI-powered workflows, automation platforms
              and business software with Python.
            </FadeIn>

            <FadeIn trigger="mount" delay={1.45} className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/#work" onClick={(e) => scrollTo(e, "/#work")}>
                View selected work
              </Button>
              <Button href="/#contact" variant="secondary" onClick={(e) => scrollTo(e, "/#contact")}>
                Let&apos;s talk
              </Button>
            </FadeIn>
          </div>

          {/* System visual */}
          <div className="col-span-12 lg:col-span-5 lg:pl-6 xl:pl-14">
            <div className="hidden lg:block">
              <HeroSystemGraphic />
            </div>
            <div className="lg:hidden">
              <FadeIn trigger="mount" delay={1.5} className="border-t border-line pt-6">
                <Label className="mb-4 block" size="sm">
                  System
                </Label>
                <HeroSystemFlowCompact />
              </FadeIn>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom metadata rule */}
      <FadeIn trigger="mount" delay={1.9} y={0} className="absolute inset-x-0 bottom-0">
        <Container className="flex items-center justify-between gap-6 border-t border-line py-5 lg:py-6">
          <div className="flex items-center gap-4">
            <span aria-hidden className="relative block h-8 w-px overflow-hidden bg-line">
              <span className="absolute inset-0 bg-fg animate-scroll-hint" />
            </span>
            <Label>Scroll</Label>
          </div>
          <Label className="hidden md:block">
            Backend · APIs · AI workflows · Automation · Business systems
          </Label>
          <StatusIndicator className="hidden sm:flex" />
        </Container>
      </FadeIn>
    </section>
  );
}
