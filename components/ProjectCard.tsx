import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block overflow-hidden bg-stone-100 aspect-square"
    >
      <Image
        src={project.mainImage}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 1280px) 50vw, 33vw"
      />

      <div className="card-overlay">
        <h3 className="heading-serif text-xl font-medium text-white leading-tight">
          {project.title}
        </h3>
        <p className="mt-1 text-xs tracking-widest uppercase text-white/70">
          {project.location}
        </p>
      </div>
    </Link>
  );
}
