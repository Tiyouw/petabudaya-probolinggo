"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cagarBudaya, allCulturalSites } from "@/data/cultural-sites";
import { filterHeritageItems, filterByDistrict, uniqueDistricts } from "@/lib/filters";
import CulturalCard from "@/components/ui/CulturalCard";
import { CulturalItem } from "@/data/types";

function AnimatedCard({ item, index }: { item: CulturalItem; index: number }) {
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

  const allHeritage = useMemo(
    () => [...cagarBudaya, ...allCulturalSites.filter((i) => i.type === "odcb")],
    []
  );
  const districts = useMemo(() => uniqueDistricts(allHeritage), [allHeritage]);

  const filtered = useMemo(() => {
    let items = allHeritage;
    items = filterHeritageItems(items, filter);
    if (district) items = filterByDistrict(items, district);
    return items;
  }, [allHeritage, filter, district]);

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
            Warisan fisik yang telah tercatat dan dilindungi oleh pemerintah daerah dan
            provinsi.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex gap-2">
            {(["all", "cb", "odcb"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
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

          <select
            value={district || ""}
            onChange={(e) => setDistrict(e.target.value || null)}
            className="px-3 py-1.5 rounded-lg border border-[#DDD0C0] bg-white text-sm text-[#6B4F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
          >
            <option value="">Semua Kecamatan</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Count */}
        <p className="text-xs text-[#6B4F3A] mb-6">
          Menampilkan {filtered.length} dari {allHeritage.length} objek
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => (
            <AnimatedCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#6B4F3A] text-sm">
            Tidak ada hasil untuk filter yang dipilih.
          </div>
        )}
      </div>
    </section>
  );
}
