"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "work", href: "/work" },
  { label: "style", href: "/style" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
] as const;

export default function SidebarShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // A link is active if the current path starts with its href
  // e.g. /work/some-project still highlights "work"
  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {/* Mobile — work in progress */}
      <div className="flex md:hidden min-h-screen items-center justify-center px-8 bg-[var(--color-background)]">
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
      <div className="hidden md:flex h-screen overflow-hidden">
      <aside className="w-48 shrink-0 flex flex-col py-10 px-7 border-r border-stone-200">
        <Link
          href="/work"
          className="heading-serif text-sm font-medium leading-snug mb-12 hover:opacity-70 transition-opacity duration-200"
        >
          Upasna
          <br />
          Chhabra
        </Link>
        <nav>
          <ul className="space-y-5">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={`sidebar-link text-xs tracking-widest uppercase transition-opacity duration-200 hover:opacity-100 ${
                    isActive(href) ? "opacity-100" : "opacity-30"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto space-y-1">
          <p className="text-[10px] text-[var(--color-muted)] leading-snug">
            &copy; {new Date().getFullYear()} Upasna Chhabra
          </p>
          <p className="text-[10px] text-[var(--color-muted)] leading-snug">
            Design by{" "}
            <a
              href="https://tejchhabra.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity duration-200"
            >
              Tej Chhabra
            </a>
          </p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </>
  );
}
