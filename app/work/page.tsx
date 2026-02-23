import SidebarShell from "@/components/Sidebar";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <SidebarShell>
      <div className="p-4">
        {projects.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-64">
            <p className="text-xs tracking-widest uppercase text-[var(--color-muted)]">
              No projects yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </SidebarShell>
  );
}
