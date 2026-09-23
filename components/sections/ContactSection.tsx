import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/Icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealText } from "@/components/motion/RevealText";
import { LineReveal } from "@/components/motion/LineReveal";

/** The final scene. */
export function ContactSection() {
  return (
    <section
      id="contact"
      data-theme="dark"
      className="surface-dark"
      aria-labelledby="contact-title"
    >
      <Container className="flex min-h-svh flex-col justify-between pb-10 pt-32 lg:pt-44">
        <div className="@container">
          <div className="flex items-center gap-5 sm:gap-8">
            <FadeIn y={8} className="flex shrink-0 items-center gap-3">
              <Label tone="fg">07</Label>
              <Label>— Contact</Label>
            </FadeIn>
            <LineReveal className="flex-1" />
            <FadeIn y={8} delay={0.2} className="hidden shrink-0 sm:block">
              <Label>{site.availability}</Label>
            </FadeIn>
          </div>

          <RevealText
            as="h2"
            id="contact-title"
            lines={["Have a problem", "worth solving?"]}
            className="mt-12 text-display-xl uppercase lg:mt-16"
          />

          <div className="mt-12 grid grid-cols-12 items-end gap-x-6 gap-y-10 lg:mt-20">
            <FadeIn className="col-span-12 lg:col-span-6">
              <p className="text-display-sm">Let&apos;s build it.</p>
              <p className="mt-6 max-w-md text-lede text-muted">
                Tell me what is slow, manual or fragile in your business. I&apos;ll tell you what a
                system for it would look like — and what it would take to build.
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="col-span-12 lg:col-span-5 lg:col-start-8 lg:justify-self-end">
              <Button href={`mailto:${site.email}`} size="lg">
                Start a conversation
              </Button>
            </FadeIn>
          </div>
        </div>

        <FadeIn y={24} className="mt-24 lg:mt-32">
          <ul className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {site.socials.map((s, i) => (
              <li
                key={s.id}
                className={cn(
                  "border-b border-line lg:border-b-0",
                  i % 2 === 0 && "sm:border-r sm:border-line",
                  i < site.socials.length - 1 && "lg:border-r lg:border-line",
                )}
              >
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-cursor="label"
                  data-cursor-label="Open"
                  className="group flex h-full flex-col justify-between gap-10 p-6 transition-colors duration-500 hover:bg-ink-900 lg:p-8"
                >
                  <div className="flex items-center justify-between">
                    <Label>{s.label}</Label>
                    <ArrowUpRight className="arrow-shift-diag text-muted transition-colors group-hover:text-fg" />
                  </div>
                  <span className="truncate text-base tracking-tight text-fg lg:text-lg">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}
