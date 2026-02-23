import { Suspense } from "react";
import PortfolioLayout from "@/components/Sidebar";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();

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
        <Suspense>
          <PortfolioLayout projects={projects} />
        </Suspense>
      </div>
    </>
  );
}
