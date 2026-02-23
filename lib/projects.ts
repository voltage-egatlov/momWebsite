import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: number;
  location: string;
  description: string;
  longDescription: string;
  mainImage: string;
  gallery: string[];
}

export function getAllProjects(): Project[] {
  const projectsDir = path.join(process.cwd(), "public", "projects");

  if (!fs.existsSync(projectsDir)) return [];

  const slugs = fs
    .readdirSync(projectsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return slugs
    .map((slug) => {
      const infoPath = path.join(projectsDir, slug, "info.md");
      if (!fs.existsSync(infoPath)) return null;

      const raw = fs.readFileSync(infoPath, "utf-8");
      const { data } = matter(raw);

      const galleryDir = path.join(projectsDir, slug, "gallery");
      const gallery: string[] = fs.existsSync(galleryDir)
        ? fs
            .readdirSync(galleryDir)
            .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
            .sort()
            .map((f) => `/projects/${slug}/gallery/${f}`)
        : [];

      return {
        slug,
        title: data.title ?? "",
        category: data.category ?? "",
        year: data.year ?? 0,
        location: data.location ?? "",
        description: data.description ?? "",
        longDescription: data.longDescription ?? "",
        mainImage: `/projects/${slug}/main.jpg`,
        gallery,
      } satisfies Project;
    })
    .filter((p): p is Project => p !== null)
    .sort((a, b) => b.year - a.year);
}

export function getProjectBySlug(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null;
}

export function getAllProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}
