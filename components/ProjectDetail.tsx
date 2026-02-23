"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SidebarShell } from "@/components/Sidebar";
import type { Project } from "@/lib/projects";

const navLinks = ["work", "style", "about", "contact"] as const;
type Section = (typeof navLinks)[number];

export default function ProjectDetail({ project }: { project: Project }) {
  const router = useRouter();

  function handleNavigate(section: Section) {
    // Navigate home and signal which section to open
    router.push(`/?section=${section}`);
  }

  return (
    <SidebarShell activeSection="work" onNavigate={handleNavigate}>
      {/* Top split: main image left, info right */}
      <div className="flex h-screen">
        {/* Main image — takes up most of the left */}
        <div className="relative w-3/5 shrink-0 bg-stone-100">
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Info panel — right side, scrollable */}
        <div className="flex-1 overflow-y-auto px-10 py-12">
          <p className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-3">
            {project.category}
          </p>
          <h1 className="heading-serif text-4xl font-medium leading-tight mb-8">
            {project.title}
          </h1>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-10">
            {project.longDescription}
          </p>

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

      {/* Gallery — CSS columns for natural packing */}
      {project.gallery.length > 0 && (
        <div className="p-4 pt-3" style={{ columns: "2", gap: "0.75rem" }}>
          {project.gallery.map((src, i) => (
            <div
              key={src}
              className="relative overflow-hidden bg-stone-100 mb-3 break-inside-avoid"
            >
              <Image
                src={src}
                alt={`${project.title} — ${i + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto block"
                sizes="50vw"
              />
            </div>
          ))}
        </div>
      )}
    </SidebarShell>
  );
}
