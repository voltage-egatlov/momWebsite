"use client";

import Image from "next/image";
import SidebarShell from "@/components/Sidebar";
import ProjectGallery from "@/components/ProjectGallery";
import type { Project } from "@/lib/projects";

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <SidebarShell>
      {/* Main image + info — stacked on mobile, side-by-side on desktop */}
      <div className="flex flex-col md:flex-row md:h-screen">
        {/* Main image */}
        <div className="relative w-full aspect-[4/3] md:aspect-auto md:w-2/5 md:shrink-0 bg-stone-100">
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Info panel */}
        <div className="flex-1 md:overflow-y-auto scrollbar-minimal px-6 py-8 md:px-10 md:py-12">
          <p className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-3">
            {project.category}
          </p>
          <h1 className="heading-serif text-4xl font-medium leading-tight mb-8">
            {project.title}
          </h1>
          <div className="space-y-4 mb-10">
            {project.longDescription.split(/\n+/).filter(Boolean).map((para, i) => (
              <p key={i} className="text-sm text-[var(--color-muted)] leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="space-y-5 border-t border-stone-200 pt-8">
            {project.year > 0 && (
              <div>
                <p className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-0.5">
                  Year
                </p>
                <p className="text-sm">{project.year}</p>
              </div>
            )}
            {project.location && (
              <div>
                <p className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-0.5">
                  Location
                </p>
                <p className="text-sm">{project.location}</p>
              </div>
            )}
            {project.category && (
              <div>
                <p className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-0.5">
                  Type
                </p>
                <p className="text-sm">{project.category}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gallery carousel */}
      <ProjectGallery
        before={project.gallery.before}
        after={project.gallery.after}
        projectTitle={project.title}
      />
    </SidebarShell>
  );
}
