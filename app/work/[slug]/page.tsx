import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacentProject, getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { Footer } from "@/components/sections/Footer";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.category}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/work/${slug}`,
      title,
      description: project.summary,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <main id="main" className="flex flex-1 flex-col">
        <ProjectCaseStudy project={project} next={getAdjacentProject(slug)} />
      </main>
      <Footer />
    </>
  );
}
