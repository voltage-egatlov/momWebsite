import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import ProjectDetail from "@/components/ProjectDetail";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      {/* Mobile — work in progress */}
      <div className="flex md:hidden min-h-screen items-center justify-center bg-[var(--color-background)] px-8">
        <div className="text-center">
          <p className="heading-serif text-4xl font-medium mb-4">
            Upasna Chhabra
          </p>
          <p className="text-xs tracking-widest uppercase text-[var(--color-muted)]">
            Mobile site coming soon
          </p>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <ProjectDetail project={project} />
      </div>
    </>
  );
}
