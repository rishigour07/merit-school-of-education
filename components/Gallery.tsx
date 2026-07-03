"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { galleryPhotos } from "@/lib/school";
import type { ContentCard } from "@/lib/content";

export default function Gallery({ items }: { items?: ContentCard[] }) {
  const photos = items?.length
    ? items.filter((item) => item.imageUrl).map((item) => ({
        title: item.title,
        src: item.imageUrl || "",
        alt: item.altText || item.description || item.title
      }))
    : galleryPhotos;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const touchStart = useRef<number | null>(null);

  const close = useCallback(() => {
    const index = selectedIndex;
    setSelectedIndex(null);
    if (index !== null) window.setTimeout(() => triggerRefs.current[index]?.focus(), 0);
  }, [selectedIndex]);

  const previous = useCallback(() => {
    setSelectedIndex((index) => index === null ? null : (index - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
    setSelectedIndex((index) => index === null ? null : (index + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, close, next, previous]);

  const selected = selectedIndex === null ? null : photos[selectedIndex];

  return (
    <section id="gallery" className="section-y bg-white">
      <div className="container-pad">
        <Reveal>
          <SectionHeading
            eyebrow="Explore Life at Merit School"
            title="A premium glimpse of learning, campus life and student growth."
            description="A curated view of learning, reading, sports and activities presented with clean professional school-life photography."
          />
        </Reveal>

        <div className="mt-9 grid auto-rows-[200px] gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((item, index) => (
            <Reveal key={item.title} className={index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : index === 4 ? "sm:col-span-2" : ""}>
              <button
                ref={(element) => { triggerRefs.current[index] = element; }}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Open ${item.title} in gallery`}
                className="focus-ring group relative h-full w-full overflow-hidden rounded-lg bg-royal-50 text-left shadow-soft"
              >
                <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-royal-800 opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="h-5 w-5" />
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-royal-900/86 to-transparent p-5">
                  <span className="text-base font-black text-white">{item.title}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onMouseDown={(event) => event.target === event.currentTarget && close()}
          onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const end = event.changedTouches[0]?.clientX ?? touchStart.current;
            const distance = end - touchStart.current;
            if (distance > 55) previous();
            if (distance < -55) next();
            touchStart.current = null;
          }}
        >
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={`${selected.title} image preview`} className="relative flex h-[min(82vh,760px)] w-full max-w-6xl items-center justify-center">
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-black/20">
              <Image src={selected.src} alt={selected.alt} fill sizes="95vw" className="object-contain" />
            </div>
            <button ref={closeRef} type="button" onClick={close} aria-label="Close gallery" className="focus-ring absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-royal-900 shadow-soft">
              <X className="h-5 w-5" />
            </button>
            <button type="button" onClick={previous} aria-label="Previous gallery image" className="focus-ring absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-royal-900 shadow-soft">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button type="button" onClick={next} aria-label="Next gallery image" className="focus-ring absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-royal-900 shadow-soft">
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="pointer-events-none absolute inset-x-16 bottom-3 rounded-md bg-black/55 px-4 py-3 text-center text-white backdrop-blur">
              <p className="font-black">{selected.title}</p>
              <p className="mt-1 text-sm text-white/75">{selectedIndex! + 1} of {photos.length}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
