"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CulturalItem } from "@/data/types";
import Badge from "@/components/ui/Badge";

interface WbtbCarouselProps {
  items: CulturalItem[];
}

export default function WbtbCarousel({ items }: WbtbCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const max = items.length;

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % max);
  }, [max]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + max) % max);
  }, [max]);

  // Auto-play (respects reduced motion)
  useEffect(() => {
    if (isPaused || max <= 1 || prefersReducedMotion) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(goNext, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goNext, max, prefersReducedMotion]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  if (max === 0) {
    return <p className="text-center text-[#6B4F3A] py-12">Belum ada data WBTB.</p>;
  }

  const item = items[current];

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="WBTB Carousel"
      aria-roledescription="carousel"
    >
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-card border border-[#DDD0C0] p-8 md:p-10">
        {/* Gradient placeholder */}
        <div className="w-full h-32 rounded-xl bg-gradient-to-br from-[#C0392B]/10 via-[#D4A843]/10 to-[#FAF5EE] mb-6 flex items-center justify-center">
          <span className="text-4xl opacity-50" aria-hidden="true">
            {item.category?.includes("Seni") ? "🎭" : "🏛️"}
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="type-wbtb">WBTB</Badge>
          {item.year && <Badge variant="year">{item.year}</Badge>}
          {item.confidence === "needs-validation" && (
            <Badge variant="status-validation">⚠️ Perlu Validasi</Badge>
          )}
        </div>

        {/* Name */}
        <h3
          className="text-2xl md:text-3xl font-display font-bold text-[#1C0F08] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {item.displayName || item.name}
        </h3>

        {/* Domain */}
        <p className="text-sm text-[#6B4F3A] mb-2">{item.domain}</p>

        {/* Location */}
        <p className="text-sm text-[#6B4F3A] mb-3">{item.locationText}</p>

        {/* Registry number */}
        <p
          className="text-xs text-[#6B4F3A] mb-3 font-mono"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {item.skNumber}
          {item.keterangan && ` · ${item.keterangan}`}
        </p>

        {/* Notes */}
        {item.notes && (
          <p className="text-xs text-[#6B4F3A] mt-2 italic">{item.notes}</p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={goPrev}
          className="w-10 h-10 rounded-full border border-[#DDD0C0] bg-white flex items-center justify-center text-[#6B4F3A] hover:border-[#C0392B] hover:text-[#C0392B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 3L5 8l5 5" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
                i === current
                  ? "bg-[#C0392B] scale-110"
                  : "bg-[#DDD0C0] hover:bg-[#C0392B]/50"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          className="w-10 h-10 rounded-full border border-[#DDD0C0] bg-white flex items-center justify-center text-[#6B4F3A] hover:border-[#C0392B] hover:text-[#C0392B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </div>

      <p className="text-center text-xs text-[#6B4F3A] mt-2">
        {current + 1} dari {max}
      </p>
    </div>
  );
}
