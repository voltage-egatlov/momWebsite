"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";

const navLinks = ["work", "style", "about", "contact"] as const;
type Section = (typeof navLinks)[number];

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-xs tracking-widest uppercase text-[var(--color-muted)]">
        {label} — coming soon
      </p>
    </div>
  );
}

// Reusable sidebar shell — used on both the home page and project pages
export function SidebarShell({
  activeSection,
  onNavigate,
  children,
}: {
  activeSection: Section;
  onNavigate: (section: Section) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-48 shrink-0 flex flex-col py-10 px-7 border-r border-stone-200">
        <a href="/" className="heading-serif text-sm font-medium leading-snug mb-12 hover:opacity-70 transition-opacity duration-200">
          Upasna
          <br />
          Chhabra
        </a>
        <nav>
          <ul className="space-y-5">
            {navLinks.map((label) => (
              <li key={label}>
                <button
                  onClick={() => onNavigate(label)}
                  className={`sidebar-link text-xs tracking-widest uppercase transition-opacity duration-200 hover:opacity-100 ${
                    activeSection === label ? "opacity-100" : "opacity-30"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

// Home page layout — owns section state
export default function PortfolioLayout({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const initialSection = (searchParams.get("section") as Section | null) ?? "work";
  const [active, setActive] = useState<Section>(
    navLinks.includes(initialSection as Section) ? initialSection : "work"
  );

  function handleNavigate(section: Section) {
    setActive(section);
  }

  return (
    <SidebarShell activeSection={active} onNavigate={handleNavigate}>
      {active === "work" && (
        <div className="p-4">
          {projects.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-64">
              <p className="text-xs tracking-widest uppercase text-[var(--color-muted)]">
                No projects yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      )}
      {active === "style" && <Placeholder label="Style" />}
      {active === "about" && <Placeholder label="About" />}
      {active === "contact" && <Placeholder label="Contact" />}
    </SidebarShell>
  );
}
