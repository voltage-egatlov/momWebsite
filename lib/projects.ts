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
    gallery: {
        before: string[];
        after: string[];
    };
}

function readImages(dir: string, urlBase: string): string[] {
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
        .sort()
        .map((f) => `${urlBase}/${f}`);
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

            const galleryBase = path.join(projectsDir, slug, "gallery");
            const urlBase = `/projects/${slug}/gallery`;

            return {
                slug,
                title: String(data.title ?? ""),
                category: String(data.category ?? ""),
                year: Number(data.year ?? 0),
                location: String(data.location ?? ""),
                description: String(data.description ?? ""),
                longDescription: String(data.longDescription ?? ""),
                mainImage: `/projects/${slug}/main.JPG`,
                gallery: {
                    before: readImages(
                        path.join(galleryBase, "before"),
                        `${urlBase}/before`,
                    ),
                    after: readImages(
                        path.join(galleryBase, "after"),
                        `${urlBase}/after`,
                    ),
                },
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
