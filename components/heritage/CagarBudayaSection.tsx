"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { cagarBudaya, allCulturalSites } from "@/data/cultural-sites";
import {
  filterHeritageItems,
  filterByDistrict,
  uniqueDistricts,
} from "@/lib/filters";
import CulturalCard from "@/components/ui/CulturalCard";
import { CulturalItem } from "@/data/types";
import { ChevronDown } from "lucide-react";

const INITIAL_SHOW = 6;
const LOAD_MORE = 12;

function AnimatedCard({
  item,
  index,
}: {
  item: CulturalItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
    >
      <CulturalCard
        item={item}
        variant={item.type === "cagar-budaya" ? "official" : "featured"}
      />
    </motion.div>
  );
}

export default function CagarBudayaSection() {
  const [filter, setFilter] = useState<"all" | "cb" | "odcb">("all");
  const [district, setDistrict] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const allHeritage = useMemo(
    () => [
      ...cagarBudaya,
      ...allCulturalSites.filter((i) => i.type === "odcb"),
    ],
    []
  );
  const districts = useMemo(
    () => uniqueDistricts(allHeritage),
    [allHeritage]
  );
  const districtActive = district !== null;

  const filtered = useMemo(() => {
    let items = allHeritage;
    items = filterHeritageItems(items, filter);
    if (district) items = filterByDistrict(items, district);
    return items;
  }, [allHeritage, filter, district]);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = useCallback((f: "all" | "cb" | "odcb") => {
    setFilter(f);
    setVisibleCount(INITIAL_SHOW);
  }, []);

  const handleDistrictChange = useCallback((d: string | null) => {
    setDistrict(d);
    setVisibleCount(INITIAL_SHOW);
    setDropdownOpen(false);
  }, []);

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + LOAD_MORE);
      setIsLoading(false);
    }, 300);
  }, []);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="cagar-budaya" className="relative py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-3xl md:text-4xl font-display font-bold text-[#1C0F08] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Cagar Budaya
          </h2>
          <p className="text-base text-[#6B4F3A] max-w-xl mx-auto">
            Warisan fisik yang telah tercatat dan dilindungi oleh pemerintah
            daerah dan provinsi.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex gap-2">
            {(["all", "cb", "odcb"] as const).map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
                  filter === f
                    ? "bg-[#C0392B] text-white"
                    : "bg-[#F0E6D8] text-[#6B4F3A] hover:bg-[#DDD0C0]"
                }`}
              >
                {f === "all"
                  ? "Semua"
                  : f === "cb"
                  ? "Cagar Budaya Ditetapkan"
                  : "ODCB"}
              </button>
            ))}
          </div>

          {/* Custom kecamatan dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
                districtActive
                  ? "border-[#C0392B] bg-[#C0392B]/5 text-[#C0392B]"
                  : "border-[#DDD0C0] bg-white text-[#6B4F3A] hover:border-[#C0392B]/50"
              }`}
            >
              <span>
                {districtActive ? district : "Filter Kecamatan"}
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-[#DDD0C0] rounded-xl shadow-lift z-20 max-h-[260px] overflow-y-auto min-w-[180px]">
                <button
                  onClick={() => handleDistrictChange(null)}
                  className="w-full text-left px-4 py-2 text-xs text-[#6B4F3A] hover:bg-[#F0E6D8] border-b border-[#F0E6D8]"
                >
                  Semua Kecamatan
                </button>
                {districts.map((d) => (
                  <button
                    key={d}
                    onClick={() => handleDistrictChange(d)}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                      district === d
                        ? "bg-[#C0392B]/5 text-[#C0392B] font-semibold"
                        : "text-[#6B4F3A] hover:bg-[#F0E6D8]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Count */}
        <p className="text-xs text-[#6B4F3A] mb-6">
          Menampilkan {visible.length} dari {filtered.length} objek
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((item, i) => (
            <AnimatedCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#C0392B] text-[#C0392B] font-medium text-sm hover:bg-[#C0392B] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] disabled:opacity-50 lightsweep"
            >
              {isLoading
                ? "Memuat..."
                : `Tampilkan Lebih Banyak (${Math.min(
                    LOAD_MORE,
                    filtered.length - visibleCount
                  )})`}
            </button>
          </motion.div>
        )}

        {!hasMore && filtered.length > 0 && (
          <p className="text-center mt-10 text-sm text-[#6B4F3A]">
            {filtered.length} objek ditampilkan
          </p>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#6B4F3A] text-sm">
            Tidak ada hasil untuk filter yang dipilih.
          </div>
        )}
      </div>
    </section>
  );
}
