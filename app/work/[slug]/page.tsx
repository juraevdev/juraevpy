import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacentProject, getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { tgaiCopy } from "@/data/tgai";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { TgaiCaseStudy } from "@/components/projects/TgaiCaseStudy";
import { Footer } from "@/components/sections/Footer";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const isTgai = slug === "tgai-profile";
  const description = isTgai ? tgaiCopy.en.tagline : project.summary;
  const title = `${project.title} — ${project.category}`;
  return {
    title: project.title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/work/${slug}`,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);

  return (
    <>
      <main id="main" className="flex flex-1 flex-col">
        {slug === "tgai-profile" ? (
          <TgaiCaseStudy next={next} />
        ) : (
          <ProjectCaseStudy project={project} next={next} />
        )}
      </main>
      <Footer />
    </>
  );
}
