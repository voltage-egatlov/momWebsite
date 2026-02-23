"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "work", href: "/work" },
  { label: "style", href: "/style" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
] as const;

export default function SidebarShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="flex flex-col min-h-screen md:hidden bg-[var(--color-background)]">

        {/* Sticky mobile header */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-5 border-b border-stone-200 bg-[var(--color-background)]">
          <Link
            href="/work"
            className="heading-serif text-base font-medium leading-none"
          >
            Upasna Chhabra
          </Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex flex-col justify-center gap-[5px] w-6 h-6 shrink-0"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-px bg-[var(--color-foreground)] transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-px bg-[var(--color-foreground)] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px bg-[var(--color-foreground)] transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </header>

        {/* Fullscreen menu overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-30 bg-[var(--color-background)] flex flex-col px-6 pt-24 pb-10">
            <nav>
              <ul className="space-y-8">
                {navLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className={`heading-serif text-4xl font-medium transition-opacity duration-200 ${
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
          </div>
        )}

        {/* Page content */}
        <div className="flex-1">
          {children}
        </div>
      </div>

      {/* ── DESKTOP ── */}
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

        <main className="flex-1 overflow-y-auto scrollbar-minimal">{children}</main>
      </div>
    </>
  );
}
