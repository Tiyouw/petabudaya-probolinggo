"use client";

import { OPKCategory } from "@/data/types";

interface ScrollProgressNavProps {
  categories: OPKCategory[];
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export default function ScrollProgressNav({
  categories,
  activeIndex,
  onNavigate,
}: ScrollProgressNavProps) {
  return (
    <>
      {/* Desktop: Fixed right-side dots */}
      <nav
        className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-2"
        aria-label="Navigasi kategori OPK"
      >
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => onNavigate(i)}
            className={`group flex items-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] rounded-lg`}
            aria-label={cat.name}
            aria-current={i === activeIndex ? "true" : undefined}
          >
            {/* Label (on hover / active) */}
            <span
              className={`text-xs font-medium transition-all whitespace-nowrap ${
                i === activeIndex
                  ? "text-[#C0392B] opacity-100"
                  : "text-[#6B4F3A] opacity-0 group-hover:opacity-100"
              }`}
            >
              {cat.name}
            </span>
            {/* Dot */}
            <span
              className={`inline-block rounded-full transition-all ${
                i === activeIndex
                  ? "w-3.5 h-3.5 bg-[#C0392B] shadow-sm"
                  : "w-2.5 h-2.5 border border-[#DDD0C0] bg-white group-hover:border-[#C0392B]"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* Mobile: Horizontal sticky tabs */}
      <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-[#DDD0C0] overflow-x-auto">
        <div className="flex gap-1 px-4 py-2">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => onNavigate(i)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
                i === activeIndex
                  ? "bg-[#C0392B] text-white"
                  : "bg-[#F0E6D8] text-[#6B4F3A]"
              }`}
            >
              {getShortLabel(cat.name)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function getShortLabel(name: string): string {
  const map: Record<string, string> = {
    "Manuskrip": "Manuskrip",
    "Tradisi Lisan": "Tradisi Lisan",
    "Adat Istiadat": "Adat Ist.",
    "Ritus": "Ritus",
    "Pengetahuan Tradisional": "Pengetahuan",
    "Teknologi Tradisional": "Teknologi",
    "Seni": "Seni",
    "Bahasa": "Bahasa",
    "Permainan Rakyat": "Permainan",
    "Olahraga Tradisional": "Olahraga",
  };
  return map[name] || name;
}
