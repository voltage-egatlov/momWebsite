import Image from "next/image";
import Nav from "@/components/Nav";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();

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
        <main>
          {/* Hero */}
          <section className="relative min-h-screen flex items-end pb-28 px-8">
            <div className="mx-auto w-full max-w-[var(--spacing-container)]">
              <p className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-8">
                Architecture Studio
              </p>
              <h1
                className="heading-serif font-medium leading-[0.93] tracking-tight"
                style={{ fontSize: "clamp(3.5rem, 8vw, 9rem)" }}
              >
                Studio
              </h1>
              <p className="mt-10 max-w-md text-base text-[var(--color-muted)] leading-relaxed">
                Thoughtful architecture rooted in place, material, and light.
              </p>
              <a
                href="#work"
                className="nav-link mt-12 inline-block text-xs tracking-widest uppercase"
              >
                View work
              </a>
            </div>
          </section>

          {/* Work */}
          <section id="work" className="py-24 px-8 border-t border-stone-200">
            <div className="mx-auto max-w-[var(--spacing-container)]">
              <p className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-16">
                Selected Work
              </p>
              {projects.length === 0 ? (
                <p className="text-[var(--color-muted)] text-sm">
                  No projects yet. Add a folder to{" "}
                  <code className="text-xs bg-stone-100 px-1 py-0.5 rounded">
                    public/projects/
                  </code>
                  .
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Vision */}
          <section
            id="vision"
            className="py-32 px-8 bg-stone-900 text-stone-50"
          >
            <div className="mx-auto max-w-3xl">
              <p className="text-xs tracking-widest uppercase text-stone-500 mb-16">
                Vision
              </p>
              <p
                className="heading-serif font-normal italic leading-[1.2] text-stone-100"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
              >
                &ldquo;Architecture is the art of how to waste space.&rdquo;
              </p>
              <div className="mt-16 space-y-6 text-base text-stone-400 leading-relaxed max-w-prose">
                <p>
                  We believe that architecture is not merely the construction of
                  buildings, but the careful shaping of human experience. Every
                  project begins with a deep listening — to the land, to the
                  light, to the people who will inhabit the space.
                </p>
                <p>
                  Our work seeks an architecture that is rooted in its place,
                  honest in its materials, and generous in its spirit. We resist
                  the fashionable and the fleeting, working instead toward
                  buildings that belong — that feel as though they could have
                  been there forever.
                </p>
              </div>
            </div>
          </section>

          {/* About */}
          <section id="about" className="py-32 px-8">
            <div className="mx-auto max-w-[var(--spacing-container)] grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <p className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-12">
                  About
                </p>
                <p className="heading-serif text-4xl font-medium leading-snug mb-8">
                  The Architect
                </p>
                <p className="text-base text-[var(--color-muted)] leading-relaxed max-w-prose">
                  With over a decade of practice, the studio has built a
                  reputation for architecture that is both rigorous and humane.
                  Projects range from intimate private residences to larger civic
                  and cultural works, each approached with the same careful
                  attention to material, proportion, and place.
                </p>
                <p className="mt-6 text-base text-[var(--color-muted)] leading-relaxed max-w-prose">
                  The studio is based in Antwerp and works across Belgium and
                  Europe.
                </p>
              </div>
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                {/* Replace with actual photo: /about.jpg in public/ */}
                <div className="absolute inset-0 flex items-center justify-center text-xs tracking-widest uppercase text-stone-400">
                  Photo
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section
            id="contact"
            className="py-32 px-8 border-t border-stone-200"
          >
            <div className="mx-auto max-w-[var(--spacing-container)]">
              <p className="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-16">
                Contact
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <p
                    className="heading-serif font-medium leading-tight mb-10"
                    style={{ fontSize: "clamp(2rem, 3vw, 3.5rem)" }}
                  >
                    Let&apos;s build something lasting.
                  </p>
                  <div className="space-y-3 text-base text-[var(--color-muted)]">
                    <p>
                      <a
                        href="mailto:studio@example.com"
                        className="nav-link"
                      >
                        studio@example.com
                      </a>
                    </p>
                    <p>
                      <a href="tel:+3200000000" className="nav-link">
                        +32 0 000 00 00
                      </a>
                    </p>
                    <p>Antwerp, Belgium</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

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
