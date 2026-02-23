import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block overflow-hidden bg-stone-100 aspect-[4/3]"
    >
      <Image
        src={project.mainImage}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <div className="card-overlay">
        <span className="text-xs tracking-widest uppercase text-white/70 mb-2">
          {project.category}
        </span>
        <h3 className="heading-serif text-2xl font-medium text-white leading-tight">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-white/80 leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
