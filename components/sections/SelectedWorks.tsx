"use client";

import { projects } from "@/data/projects";
import { useLocale } from "@/hooks/useLocale";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectEntry } from "@/components/projects/ProjectEntry";
import { TgaiEntry } from "@/components/projects/TgaiEntry";
import { CaravanEntry } from "@/components/projects/CaravanEntry";
import { EmakonEntry } from "@/components/projects/EmakonEntry";
import { SuperAppEntry } from "@/components/projects/SuperAppEntry";

export function SelectedWorks() {
  const { t } = useLocale();

  return (
    <section id="work" className="surface-alt" aria-labelledby="work-title">
      <Container className="max-w-page py-28 lg:py-40">
        <SectionTitle
          eyebrow={t.work.eyebrow}
          id="work-title"
          lines={[
            t.work.titleLine1,
            <>
              {t.work.titleLine2Before}
              <em>{t.work.titleLine2Em}</em>
            </>,
          ]}
        />

        <div className="mt-20 flex flex-col gap-28 lg:mt-28 lg:gap-40">
          {projects.map((project, i) => {
            const n = i + 1;
            switch (project.slug) {
              case "tgai-profile":
                return <TgaiEntry key={project.slug} number={n} />;
              case "caravan-dispatcher":
                return <CaravanEntry key={project.slug} number={n} />;
              case "e-makon":
                return <EmakonEntry key={project.slug} number={n} />;
              case "ai-super-app":
                return <SuperAppEntry key={project.slug} number={n} />;
              default:
                return <ProjectEntry key={project.slug} project={project} number={n} />;
            }
          })}
        </div>
      </Container>
    </section>
  );
}
