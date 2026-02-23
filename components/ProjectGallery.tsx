"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

type Tab = "before" | "after";

interface ProjectGalleryProps {
  before: string[];
  after: string[];
  projectTitle: string;
}

const INTERVAL_MS = 3500;

export default function ProjectGallery({
  before,
  after,
  projectTitle,
}: ProjectGalleryProps) {
  const [tab, setTab] = useState<Tab>("before");
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const paused = useRef(false);

  const images = tab === "before" ? before : after;

  useEffect(() => {
    setIndex((i) => (images.length > 0 ? i % images.length : 0));
  }, [tab, images.length]);

  const advance = useCallback(() => {
    if (images.length <= 1) return;
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const retreat = useCallback(() => {
    if (images.length <= 1) return;
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      if (!paused.current) advance();
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [advance, images.length]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const hasBefore = before.length > 0;
  const hasAfter = after.length > 0;
  const hasAny = hasBefore || hasAfter;

  if (!hasAny) return null;

  const currentSrc = images[index] ?? null;

  return (
    <section className="pb-16 flex flex-col items-center">
      {/* Section divider */}
      <div className="w-full border-t border-stone-200 mb-10" />

      {/* Before / After toggle */}
      {hasBefore && hasAfter && (
        <div className="flex gap-10 mb-8">
          {(["before", "after"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-sm tracking-widest uppercase transition-opacity duration-200 hover:opacity-100 ${
                tab === t ? "opacity-100" : "opacity-30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Carousel */}
      {currentSrc && (
        <div
          className="relative w-full max-w-2xl select-none"
          onMouseEnter={() => { paused.current = true; }}
          onMouseLeave={() => { paused.current = false; }}
        >
          {/* Image area */}
          <div
            className="relative h-[420px] bg-stone-50 cursor-pointer"
            onClick={() => setLightbox(currentSrc)}
          >
            {images.map((src, i) => (
              <div
                key={src}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: i === index ? 1 : 0 }}
              >
                <Image
                  src={src}
                  alt={`${projectTitle} — ${tab} ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="672px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* Controls row: caret left — dots — caret right */}
          {images.length > 1 && (
            <div className="flex items-center justify-between mt-4 px-1">
              <button
                onClick={retreat}
                className="text-stone-400 hover:text-stone-700 transition-colors p-1"
                aria-label="Previous image"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="flex gap-1.5">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`block w-1 h-1 rounded-full transition-opacity duration-300 bg-stone-400 ${
                      i === index ? "opacity-100" : "opacity-30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={advance}
                className="text-stone-400 hover:text-stone-700 transition-colors p-1"
                aria-label="Next image"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-8 text-white/70 hover:text-white text-xs tracking-widest uppercase transition-colors"
            onClick={() => setLightbox(null)}
          >
            Close
          </button>
          <div
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox}
              alt={projectTitle}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}
