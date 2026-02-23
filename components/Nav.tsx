"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
    { label: "work", href: "/#work" },
    { label: "vision", href: "/#vision" },
    { label: "about", href: "/#about" },
    { label: "contact", href: "/#contact" },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? "nav-scrolled" : ""
            }`}
        >
            <nav className="mx-auto flex max-w-container items-center justify-between px-8 py-6">
                <Link
                    href="/"
                    className="heading-serif text-base font-medium tracking-wide"
                >
                    Studio
                </Link>

                <ul className="hidden md:flex items-center gap-10">
                    {navLinks.map(({ label, href }) => (
                        <li key={label}>
                            <a
                                href={href}
                                className="nav-link text-xs tracking-widest uppercase text-(--color-foreground)"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
