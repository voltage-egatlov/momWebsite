import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";

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
      <Nav />

      {/* Mobile — work in progress */}
      <div className="flex md:hidden min-h-screen items-center justify-center bg-[var(--color-background)] px-8">
        <div className="text-center">
          <p className="heading-serif text-4xl font-medium mb-4">Studio</p>
          <p className="text-xs tracking-widest uppercase text-[var(--color-muted)]">
            Mobile site coming soon
          </p>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        {/* Hero image */}
        <div className="relative w-full h-[70vh] bg-stone-100">
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Project header */}
        <div className="mx-auto max-w-[var(--spacing-container)] px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <p className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-4">
                {project.category}
              </p>
              <h1 className="heading-serif text-5xl font-medium leading-tight mb-8">
                {project.title}
              </h1>
              <p className="text-base text-[var(--color-muted)] leading-relaxed max-w-prose">
                {project.longDescription}
              </p>
            </div>

            <aside className="space-y-8 pt-2 lg:pt-[4.5rem]">
              <div>
                <p className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-1">
                  Year
                </p>
                <p className="text-base">{project.year}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-1">
                  Location
                </p>
                <p className="text-base">{project.location}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-1">
                  Category
                </p>
                <p className="text-base">{project.category}</p>
              </div>
            </aside>
          </div>
        </div>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <div className="mx-auto max-w-[var(--spacing-container)] px-8 pb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((src, i) => (
                <div
                  key={src}
                  className={`relative overflow-hidden bg-stone-100 ${
                    i === 0
                      ? "md:col-span-2 aspect-[16/9]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${project.title} — image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mx-auto max-w-[var(--spacing-container)] px-8 pb-24">
          <a
            href="/#work"
            className="nav-link text-xs tracking-widest uppercase"
          >
            Back to work
          </a>
        </div>

        {/* Footer */}
        <footer className="py-10 px-8 border-t border-stone-200">
          <div className="mx-auto max-w-[var(--spacing-container)] flex justify-between items-center">
            <span className="text-xs text-[var(--color-muted)] tracking-wide">
              © {new Date().getFullYear()} Studio
            </span>
            <span className="text-xs text-[var(--color-muted)] tracking-wide">
              Architecture
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
