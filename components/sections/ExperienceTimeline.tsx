import { experience } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/motion/FadeIn";
import { LineReveal } from "@/components/motion/LineReveal";

const first = experience[experience.length - 1]?.year;
const last = experience[0]?.year;

/** Large years, a line that draws segment by segment, minimal copy. */
export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      data-theme="dark"
      className="surface-dark"
      aria-labelledby="experience-title"
    >
      <Container className="py-28 lg:py-40">
        <SectionTitle
          index="06"
          label="Experience"
          id="experience-title"
          lines={["Track", "record."]}
          meta={<Label>{first} — {last}</Label>}
          as="h2"
        />

        <ol className="mt-20 border-t border-line lg:mt-28">
          {experience.map((item, i) => (
            <li key={item.year} className="grid grid-cols-12 gap-x-6 gap-y-6 border-b border-line py-12 lg:py-16">
              <FadeIn className="col-span-12 lg:col-span-3">
                <span className="mono-num block text-display-lg text-fg">{item.year}</span>
              </FadeIn>

              <div className="relative col-span-12 lg:col-span-5 lg:pl-10">
                {/* Timeline segment */}
                <div className="absolute -top-12 bottom-[-3rem] left-0 hidden w-px lg:block lg:-top-16 lg:bottom-[-4rem]" aria-hidden>
                  <LineReveal from="top" className="h-full bg-line-strong" delay={0.1} duration={1.2} />
                </div>
                <FadeIn
                  delay={0.15}
                  className="absolute left-0 top-2 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-fg lg:block"
                  aria-hidden
                />
                <FadeIn delay={0.05}>
                  <h3 className="text-display-sm uppercase">{item.role}</h3>
                  <p className="mt-3 label text-muted">
                    {item.org} · {item.period}
                  </p>
                  <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted">
                    {item.responsibility}
                  </p>
                </FadeIn>
              </div>

              <FadeIn delay={0.1} className="col-span-12 lg:col-span-3 lg:col-start-10">
                <Label size="sm">Impact</Label>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-fg">{item.impact}</p>
                <Label size="sm" className="mt-6 block text-muted-2">
                  {String(i + 1).padStart(2, "0")} / {String(experience.length).padStart(2, "0")}
                </Label>
              </FadeIn>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
