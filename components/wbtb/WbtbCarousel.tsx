"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CulturalItem } from "@/data/types";
import Badge from "@/components/ui/Badge";

interface WbtbCarouselProps {
  items: CulturalItem[];
}

// ── Probolinggo palette ──
const PALETTE = {
  red: "#C0392B",
  gold: "#D4A843",
  cream: "#FAF5EE",
  dark: "#1C0F08",
  brown: "#6B4F3A",
  redLight: "#E8A09A",
  goldLight: "#F0D89C",
};

// ── Distinct cultural-pattern placeholders for each WBTB item ──
function getWbtbVisual(itemId: string) {
  switch (itemId) {
    // wbtb-001 — Yadnya Kasada: Mountain/volcano silhouette with offerings
    case "yadnya-kasada":
      return (
        <svg
          viewBox="0 0 320 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Sky glow */}
          <ellipse cx="160" cy="40" rx="140" ry="50" fill={`${PALETTE.goldLight}33`} />
          {/* Volcano — main cone */}
          <polygon points="120,70 160,10 200,70" fill={`${PALETTE.red}1A`} />
          <polygon points="120,70 160,10 200,70" fill="none" stroke={PALETTE.red} strokeOpacity="0.4" strokeWidth="1.2" />
          {/* Volcano — crater notch */}
          <polygon points="148,28 160,10 172,28" fill={PALETTE.cream} fillOpacity="0.7" />
          {/* Smoke wisps */}
          <path d="M155 12 Q148 2 155 -4" stroke={`${PALETTE.brown}55`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M160 8 Q165 -2 160 -8" stroke={`${PALETTE.brown}55`} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M168 14 Q175 4 170 -2" stroke={`${PALETTE.brown}44`} strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* Ground line */}
          <line x1="30" y1="70" x2="290" y2="70" stroke={`${PALETTE.brown}33`} strokeWidth="0.8" />
          {/* Offerings — small geometric shapes at base */}
          <circle cx="100" cy="68" r="2.5" fill={PALETTE.gold} opacity="0.7" />
          <circle cx="210" cy="66" r="2.5" fill={PALETTE.gold} opacity="0.7" />
          <circle cx="132" cy="65" r="2" fill={PALETTE.red} opacity="0.5" />
          <circle cx="188" cy="67" r="2" fill={PALETTE.red} opacity="0.5" />
          <rect x="80" y="63" width="4" height="4" rx="0.5" fill={PALETTE.goldLight} opacity="0.8" />
          <rect x="235" y="64" width="4" height="4" rx="0.5" fill={PALETTE.goldLight} opacity="0.8" />
          {/* Sun/moon behind */}
          <circle cx="240" cy="20" r="14" fill={`${PALETTE.gold}33`} />
          <circle cx="240" cy="20" r="10" fill={`${PALETTE.gold}22`} />
          {/* Decorative dots */}
          <circle cx="50" cy="55" r="1.2" fill={`${PALETTE.brown}44`} />
          <circle cx="270" cy="50" r="1.2" fill={`${PALETTE.brown}44`} />
          <circle cx="60" cy="40" r="1" fill={`${PALETTE.brown}33`} />
          <circle cx="260" cy="35" r="1" fill={`${PALETTE.brown}33`} />
        </svg>
      );

    // wbtb-002 — Jaran Bodhag: Horse/dance pattern with energetic curves
    case "jaran-bodhag":
      return (
        <svg
          viewBox="0 0 320 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Energetic swoop background */}
          <path d="M10 60 Q80 0 160 45 T310 20" stroke={`${PALETTE.red}22`} strokeWidth="2" fill="none" />
          <path d="M20 50 Q90 -5 170 50 T300 10" stroke={`${PALETTE.gold}33`} strokeWidth="1.5" fill="none" />
          {/* Abstract horse mane — flowing curves */}
          <path d="M130 12 Q120 20 135 28 Q115 35 128 44" stroke={PALETTE.red} strokeOpacity="0.5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M140 10 Q128 22 142 30 Q125 38 138 46" stroke={PALETTE.gold} strokeOpacity="0.6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Horse body — geometric diamond */}
          <polygon points="160,28 195,15 180,60 148,55" fill={`${PALETTE.brown}1A`} stroke={PALETTE.brown} strokeOpacity="0.4" strokeWidth="1" />
          {/* Head */}
          <polygon points="148,50 135,42 148,35" fill={`${PALETTE.red}22`} stroke={PALETTE.red} strokeOpacity="0.4" strokeWidth="0.8" />
          {/* Legs — angled lines */}
          <line x1="160" y1="58" x2="150" y2="72" stroke={PALETTE.brown} strokeOpacity="0.5" strokeWidth="1.5" />
          <line x1="178" y1="56" x2="182" y2="72" stroke={PALETTE.brown} strokeOpacity="0.5" strokeWidth="1.5" />
          {/* Dance energy dots */}
          <circle cx="70" cy="30" r="3" fill={PALETTE.red} opacity="0.35" />
          <circle cx="250" cy="25" r="2.5" fill={PALETTE.gold} opacity="0.5" />
          <circle cx="265" cy="18" r="1.8" fill={PALETTE.red} opacity="0.3" />
          <circle cx="280" cy="28" r="2" fill={PALETTE.gold} opacity="0.4" />
          {/* Motion arcs */}
          <path d="M50 50 Q70 30 80 50" stroke={`${PALETTE.red}33`} strokeWidth="1" fill="none" />
          <path d="M240 40 Q255 22 268 40" stroke={`${PALETTE.gold}44`} strokeWidth="1.2" fill="none" />
          {/* Ground */}
          <line x1="40" y1="72" x2="290" y2="72" stroke={`${PALETTE.brown}2A`} strokeWidth="0.6" />
        </svg>
      );

    // wbtb-003 — Mecak Tengger: Ceremonial circle pattern
    case "mecak-tengger":
      return (
        <svg
          viewBox="0 0 320 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Outer ceremonial circle */}
          <circle cx="160" cy="40" r="32" fill={`${PALETTE.cream}88`} stroke={PALETTE.gold} strokeOpacity="0.5" strokeWidth="1.5" />
          {/* Inner rings */}
          <circle cx="160" cy="40" r="24" fill="none" stroke={PALETTE.red} strokeOpacity="0.35" strokeWidth="0.8" />
          <circle cx="160" cy="40" r="16" fill="none" stroke={PALETTE.gold} strokeOpacity="0.45" strokeWidth="1" />
          <circle cx="160" cy="40" r="8" fill={`${PALETTE.red}1A`} stroke={PALETTE.red} strokeOpacity="0.4" strokeWidth="0.6" />
          {/* Center dot */}
          <circle cx="160" cy="40" r="2.5" fill={PALETTE.red} opacity="0.7" />
          {/* Ritual dots around the circle — like people sitting */}
          <circle cx="128" cy="40" r="2" fill={PALETTE.brown} opacity="0.5" />
          <circle cx="136" cy="20" r="1.8" fill={PALETTE.brown} opacity="0.45" />
          <circle cx="156" cy="14" r="2" fill={PALETTE.brown} opacity="0.5" />
          <circle cx="176" cy="16" r="1.8" fill={PALETTE.brown} opacity="0.45" />
          <circle cx="192" cy="26" r="2" fill={PALETTE.brown} opacity="0.5" />
          <circle cx="198" cy="46" r="1.8" fill={PALETTE.brown} opacity="0.45" />
          <circle cx="188" cy="62" r="2" fill={PALETTE.brown} opacity="0.5" />
          <circle cx="168" cy="68" r="1.8" fill={PALETTE.brown} opacity="0.45" />
          <circle cx="144" cy="66" r="2" fill={PALETTE.brown} opacity="0.5" />
          <circle cx="124" cy="56" r="1.8" fill={PALETTE.brown} opacity="0.45" />
          {/* Decorative rays */}
          <line x1="160" y1="8" x2="160" y2="2" stroke={`${PALETTE.gold}55`} strokeWidth="0.8" />
          <line x1="188" y1="12" x2="196" y2="4" stroke={`${PALETTE.gold}44`} strokeWidth="0.7" />
          <line x1="132" y1="12" x2="124" y2="4" stroke={`${PALETTE.gold}44`} strokeWidth="0.7" />
          <line x1="208" y1="28" x2="216" y2="22" stroke={`${PALETTE.gold}33`} strokeWidth="0.6" />
          <line x1="112" y1="28" x2="104" y2="22" stroke={`${PALETTE.gold}33`} strokeWidth="0.6" />
          <line x1="208" y1="52" x2="216" y2="58" stroke={`${PALETTE.gold}33`} strokeWidth="0.6" />
          <line x1="112" y1="52" x2="104" y2="58" stroke={`${PALETTE.gold}33`} strokeWidth="0.6" />
          {/* Connecting arcs between outer dots */}
          <path d="M128 40 Q130 28 136 20" stroke={`${PALETTE.red}22`} strokeWidth="0.8" fill="none" />
          <path d="M136 20 Q148 13 156 14" stroke={`${PALETTE.red}22`} strokeWidth="0.8" fill="none" />
          <path d="M198 46 Q196 56 188 62" stroke={`${PALETTE.red}22`} strokeWidth="0.8" fill="none" />
          <path d="M188 62 Q178 69 168 68" stroke={`${PALETTE.red}22`} strokeWidth="0.8" fill="none" />
          {/* Side geometric pillars */}
          <rect x="42" y="22" width="3" height="36" rx="1" fill={`${PALETTE.brown}22`} />
          <rect x="275" y="22" width="3" height="36" rx="1" fill={`${PALETTE.brown}22`} />
          <rect x="38" y="28" width="3" height="28" rx="1" fill={`${PALETTE.gold}33`} />
          <rect x="279" y="28" width="3" height="28" rx="1" fill={`${PALETTE.gold}33`} />
        </svg>
      );

    // wbtb-004 — Entas-Entas Tengger: Spiritual ascending pattern
    case "entas-entas-tengger":
      return (
        <svg
          viewBox="0 0 320 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Ascending stepped forms — like a stairway to the spiritual realm */}
          <rect x="80" y="60" width="30" height="8" rx="1" fill={`${PALETTE.brown}33`} />
          <rect x="115" y="48" width="30" height="8" rx="1" fill={`${PALETTE.red}2A`} />
          <rect x="150" y="36" width="30" height="8" rx="1" fill={`${PALETTE.gold}44`} />
          <rect x="185" y="24" width="30" height="8" rx="1" fill={`${PALETTE.red}33`} />
          <rect x="220" y="12" width="30" height="8" rx="1" fill={`${PALETTE.gold}55`} />
          {/* Ascending curve — soul ascending */}
          <path d="M40 68 Q100 55 140 42 Q190 24 250 12 Q290 0 310 4" stroke={PALETTE.gold} strokeOpacity="0.5" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Inner spiritual line */}
          <path d="M55 64 Q130 46 175 30 Q220 15 270 6" stroke={PALETTE.red} strokeOpacity="0.3" strokeWidth="0.8" fill="none" strokeDasharray="3 4" />
          {/* Spirit dots — ascending like rising souls */}
          <circle cx="95" cy="58" r="2.5" fill={PALETTE.gold} opacity="0.5" />
          <circle cx="130" cy="46" r="2.8" fill={PALETTE.red} opacity="0.4" />
          <circle cx="165" cy="34" r="3" fill={PALETTE.gold} opacity="0.55" />
          <circle cx="200" cy="22" r="2.5" fill={PALETTE.red} opacity="0.35" />
          <circle cx="235" cy="10" r="2.2" fill={PALETTE.gold} opacity="0.6" />
          {/* Ground plane with earth tones */}
          <line x1="20" y1="68" x2="300" y2="68" stroke={`${PALETTE.brown}55`} strokeWidth="1" />
          <line x1="30" y1="72" x2="290" y2="72" stroke={`${PALETTE.brown}33`} strokeWidth="0.5" />
          {/* Prayer-offering shapes at bottom left */}
          <circle cx="55" cy="65" r="3" fill={PALETTE.red} opacity="0.3" />
          <circle cx="60" cy="60" r="2" fill={PALETTE.red} opacity="0.25" />
          <circle cx="65" cy="56" r="1.5" fill={PALETTE.red} opacity="0.2" />
        </svg>
      );

    // wbtb-005 — Rawon Nguling: Bowl/food pattern with warm colors
    case "rawon-nguling":
      return (
        <svg
          viewBox="0 0 320 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Warm background glow */}
          <ellipse cx="160" cy="50" rx="100" ry="35" fill={`${PALETTE.gold}22`} />
          {/* Bowl — main shape */}
          <ellipse cx="160" cy="48" rx="50" ry="10" fill={`${PALETTE.brown}44`} />
          <path d="M110 48 Q112 72 160 72 Q208 72 210 48" fill={`${PALETTE.brown}33`} stroke={PALETTE.brown} strokeOpacity="0.5" strokeWidth="1" />
          {/* Bowl rim */}
          <ellipse cx="160" cy="48" rx="50" ry="10" fill="none" stroke={PALETTE.gold} strokeOpacity="0.6" strokeWidth="1.2" />
          {/* Bowl interior — dark broth */}
          <ellipse cx="160" cy="48" rx="44" ry="7" fill={`${PALETTE.dark}44`} />
          {/* Kluwek / black broth depth */}
          <ellipse cx="155" cy="46" rx="20" ry="4" fill={`${PALETTE.dark}33`} />
          {/* Steam wisps */}
          <path d="M135 42 Q132 30 138 22" stroke={`${PALETTE.cream}88`} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M155 40 Q158 26 152 16" stroke={`${PALETTE.cream}77`} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M175 40 Q178 28 172 18" stroke={`${PALETTE.cream}88`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M148 41 Q145 32 150 26" stroke={`${PALETTE.cream}66`} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* Side garnish dots — taoge / green hint */}
          <circle cx="108" cy="44" r="1.5" fill={PALETTE.goldLight} opacity="0.7" />
          <circle cx="104" cy="40" r="1.2" fill={PALETTE.goldLight} opacity="0.6" />
          <circle cx="214" cy="44" r="1.5" fill={PALETTE.goldLight} opacity="0.7" />
          <circle cx="218" cy="41" r="1.2" fill={PALETTE.goldLight} opacity="0.6" />
          {/* Table surface */}
          <line x1="40" y1="62" x2="280" y2="62" stroke={`${PALETTE.brown}44`} strokeWidth="0.8" />
          {/* Decorative chili shapes */}
          <path d="M68 56 Q72 50 70 46" stroke={PALETTE.red} strokeOpacity="0.5" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M252 56 Q256 50 254 46" stroke={PALETTE.red} strokeOpacity="0.5" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Small lime shapes */}
          <circle cx="60" cy="58" r="3" fill={`${PALETTE.goldLight}66`} />
          <circle cx="260" cy="58" r="3" fill={`${PALETTE.goldLight}66`} />
        </svg>
      );

    // wbtb-006 — Kiprah Glipang: Dance motion swirl pattern
    case "kiprah-glipang":
      return (
        <svg
          viewBox="0 0 320 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Motion swirl — flowing dance arcs */}
          <path d="M20 50 Q60 0 120 40 Q180 80 220 30 Q260 -5 300 35" stroke={PALETTE.red} strokeOpacity="0.35" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Counter-swirl */}
          <path d="M10 30 Q70 80 140 30 Q200 -10 260 40 Q290 60 310 45" stroke={PALETTE.gold} strokeOpacity="0.4" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {/* Spinning abstract figure 1 — left dancer */}
          <ellipse cx="80" cy="35" rx="8" ry="8" fill={`${PALETTE.red}1A`} stroke={PALETTE.red} strokeOpacity="0.5" strokeWidth="1" />
          <line x1="80" y1="43" x2="72" y2="58" stroke={PALETTE.red} strokeOpacity="0.4" strokeWidth="1.5" />
          <line x1="80" y1="43" x2="88" y2="56" stroke={PALETTE.red} strokeOpacity="0.4" strokeWidth="1.5" />
          {/* Spinning abstract figure 2 — center dancer */}
          <ellipse cx="160" cy="30" rx="9" ry="9" fill={`${PALETTE.gold}22`} stroke={PALETTE.gold} strokeOpacity="0.55" strokeWidth="1" />
          <line x1="160" y1="39" x2="150" y2="56" stroke={PALETTE.gold} strokeOpacity="0.5" strokeWidth="1.5" />
          <line x1="160" y1="39" x2="170" y2="54" stroke={PALETTE.gold} strokeOpacity="0.5" strokeWidth="1.5" />
          {/* Spinning abstract figure 3 — right dancer */}
          <ellipse cx="240" cy="38" rx="8" ry="8" fill={`${PALETTE.red}1A`} stroke={PALETTE.red} strokeOpacity="0.45" strokeWidth="1" />
          <line x1="240" y1="46" x2="232" y2="60" stroke={PALETTE.red} strokeOpacity="0.4" strokeWidth="1.5" />
          <line x1="240" y1="46" x2="248" y2="58" stroke={PALETTE.red} strokeOpacity="0.4" strokeWidth="1.5" />
          {/* Motion trail dots */}
          <circle cx="45" cy="20" r="2" fill={PALETTE.gold} opacity="0.5" />
          <circle cx="35" cy="26" r="1.5" fill={PALETTE.gold} opacity="0.4" />
          <circle cx="130" cy="56" r="2" fill={PALETTE.red} opacity="0.4" />
          <circle cx="145" cy="58" r="1.5" fill={PALETTE.red} opacity="0.35" />
          <circle cx="185" cy="10" r="1.8" fill={PALETTE.gold} opacity="0.45" />
          <circle cx="200" cy="14" r="1.5" fill={PALETTE.gold} opacity="0.35" />
          <circle cx="270" cy="50" r="2" fill={PALETTE.red} opacity="0.4" />
          <circle cx="285" cy="46" r="1.5" fill={PALETTE.red} opacity="0.3" />
          {/* Ground */}
          <line x1="30" y1="70" x2="290" y2="70" stroke={`${PALETTE.brown}33`} strokeWidth="0.7" strokeDasharray="4 6" />
          {/* Percussive accent marks */}
          <line x1="50" y1="68" x2="50" y2="62" stroke={PALETTE.red} strokeOpacity="0.3" strokeWidth="0.8" />
          <line x1="162" y1="68" x2="162" y2="60" stroke={PALETTE.gold} strokeOpacity="0.4" strokeWidth="0.8" />
          <line x1="275" y1="68" x2="275" y2="63" stroke={PALETTE.red} strokeOpacity="0.3" strokeWidth="0.8" />
        </svg>
      );

    default:
      // Fallback generic pattern
      return (
        <svg
          viewBox="0 0 320 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          <rect x="40" y="20" width="240" height="40" rx="8" fill={`${PALETTE.red}0D`} />
          <circle cx="160" cy="40" r="20" fill={`${PALETTE.gold}1A`} stroke={PALETTE.gold} strokeOpacity="0.4" strokeWidth="1" />
          <circle cx="160" cy="40" r="8" fill={`${PALETTE.red}1A`} />
          <circle cx="160" cy="40" r="3" fill={PALETTE.red} opacity="0.5" />
        </svg>
      );
  }
}

export default function WbtbCarousel({ items }: WbtbCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true // SSR fallback: assume reduced motion (safer default)
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const max = items.length;

  // Auto-play (respects reduced motion)

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % max);
  }, [max]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + max) % max);
  }, [max]);

  // Auto-play interval
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
        {/* Distinct cultural-pattern placeholder per WBTB item */}
        <div className="w-full h-32 rounded-xl bg-gradient-to-br from-[#C0392B]/10 via-[#D4A843]/10 to-[#FAF5EE] mb-6 flex items-center justify-center overflow-hidden">
          {getWbtbVisual(item.id)}
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

        {/* Description */}
        {item.description && (
          <p className="text-sm text-[#6B4F3A] leading-relaxed line-clamp-3 mb-3">
            {item.description}
          </p>
        )}

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
          <ChevronLeft size={18} />
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
          <ChevronRight size={18} />
        </button>
      </div>

      <p className="text-center text-xs text-[#6B4F3A] mt-2">
        {current + 1} dari {max}
      </p>
    </div>
  );
}
