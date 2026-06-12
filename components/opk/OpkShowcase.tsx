"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, MessageCircle, Building2, Flame, Brain, Wrench, Palette, Languages, Gamepad2, Swords } from "lucide-react";
import { opkCategories } from "@/data/opk";
import { OPKCategory } from "@/data/types";

const PREVIEW_ITEM_LIMIT = 8;

export default function OpkShowcase() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(opkCategories[4]?.id ?? opkCategories[0].id);
  const [showAll, setShowAll] = useState(false);

  const selectedCategory = useMemo(
    () => opkCategories.find((category) => category.id === selectedCategoryId) ?? opkCategories[0],
    [selectedCategoryId],
  );

  const visibleItems = showAll
    ? selectedCategory.items
    : selectedCategory.items.slice(0, PREVIEW_ITEM_LIMIT);
  const hasMoreItems = selectedCategory.items.length > PREVIEW_ITEM_LIMIT;

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setShowAll(false);
  };

  return (
    <section id="opk" className="relative bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-[0.32em] text-[#C0392B] font-semibold mb-3">
            Warisan Budaya Hidup
          </p>
          <h2
            className="text-3xl md:text-5xl font-display font-bold text-[#1C0F08] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Jelajahi Objek Pemajuan Kebudayaan
          </h2>
          <p className="text-base text-[#6B4F3A] max-w-2xl mx-auto">
            Dari ritus Tengger, seni pertunjukan, permainan rakyat, hingga pengetahuan tradisional yang diwariskan lintas generasi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-10">
          <StatCard value="127" label="Objek budaya" />
          <StatCard value="10" label="Kategori OPK" />
          <StatCard value="1" label="Warisan hidup Probolinggo" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
          <CategorySelector
            selectedCategoryId={selectedCategory.id}
            onSelectCategory={handleSelectCategory}
          />

          <OpkCategoryPanel
            category={selectedCategory}
            visibleItems={visibleItems}
            hasMoreItems={hasMoreItems}
            showAll={showAll}
            onToggleShowAll={() => setShowAll((value) => !value)}
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[#F0E6D8] bg-[#FAF5EE] px-5 py-4 text-center shadow-card">
      <p className="text-2xl font-display font-bold text-[#1C0F08]" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </p>
      <p className="text-xs uppercase tracking-[0.18em] text-[#6B4F3A] mt-1">
        {label}
      </p>
    </div>
  );
}

function CategorySelector({
  selectedCategoryId,
  onSelectCategory,
}: {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}) {
  return (
    <div className="lg:sticky lg:top-24 rounded-3xl border border-[#F0E6D8] bg-[#FAF5EE] p-3 shadow-card">
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
        {opkCategories.map((category) => {
          const isSelected = category.id === selectedCategoryId;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className={`min-w-[210px] lg:min-w-0 w-full text-left rounded-2xl border px-4 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
                isSelected
                  ? "bg-white border-[#DDD0C0] shadow-card"
                  : "bg-transparent border-transparent hover:bg-white/70"
              }`}
              aria-pressed={isSelected}
            >
              <span className="flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${category.accentColor}18`, color: category.accentColor }}
                >
                  {getCategoryIcon(category.id, "w-5 h-5")}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-[#1C0F08] truncate">
                    {category.name}
                  </span>
                  <span className="block text-xs text-[#6B4F3A]">
                    {category.count} objek
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OpkCategoryPanel({
  category,
  visibleItems,
  hasMoreItems,
  showAll,
  onToggleShowAll,
}: {
  category: OPKCategory;
  visibleItems: OPKCategory["items"];
  hasMoreItems: boolean;
  showAll: boolean;
  onToggleShowAll: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const panelInView = useInView(panelRef, { once: false, margin: "-80px" });
  const featuredItems = category.items.slice(0, 3);

  return (
    <motion.div
      ref={panelRef}
      key={category.id}
      initial={{ opacity: 0, y: 16 }}
      animate={panelInView ? { opacity: 1, y: 0 } : { opacity: 0.85, y: 8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-[#F0E6D8] bg-white shadow-lift"
    >
      <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: category.accentColor }} />
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-0">
        <div className="relative p-6 md:p-8 bg-[#FAF5EE]">
          <div className="pattern-overlay absolute inset-0 opacity-70" />
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{ backgroundColor: `${category.accentColor}18`, color: category.accentColor }}
            >
              {getCategoryIcon(category.id)}
            </div>
            <p className="text-xs uppercase tracking-[0.24em] font-semibold mb-3" style={{ color: category.accentColor }}>
              {category.count} objek budaya
            </p>
            <h3 className="text-2xl md:text-4xl font-display font-bold text-[#1C0F08] mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {category.name}
            </h3>
            <p className="text-sm md:text-base text-[#6B4F3A] leading-relaxed mb-6">
              {category.description}
            </p>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[#6B4F3A] font-semibold">
                Sorotan kategori
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3">
                {featuredItems.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-white/85 border border-white px-4 py-3 shadow-card">
                    <p className="text-sm font-semibold text-[#1C0F08] leading-tight">{item.name}</p>
                    {item.locationText && <p className="text-xs text-[#6B4F3A] mt-1">{item.locationText}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#6B4F3A] font-semibold mb-2">
                Daftar objek
              </p>
              <h4 className="text-xl font-display font-bold text-[#1C0F08]" style={{ fontFamily: "var(--font-display)" }}>
                {showAll ? `Semua ${category.count} objek` : `Preview ${Math.min(PREVIEW_ITEM_LIMIT, category.count)} objek`}
              </h4>
            </div>
            {hasMoreItems && (
              <button
                type="button"
                onClick={onToggleShowAll}
                className="self-start sm:self-auto rounded-full bg-[#C0392B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#96231A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] focus-visible:ring-offset-2"
              >
                {showAll ? "Tampilkan lebih sedikit" : `Lihat semua ${category.count} objek`}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="rounded-2xl bg-[#FAF5EE] border border-[#F0E6D8] p-4 hover:shadow-card hover:-translate-y-0.5 transition-all"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
              >
                <p className="text-sm font-semibold text-[#1C0F08] leading-tight mb-1">{item.name}</p>
                {item.subcategory && <p className="text-xs text-[#6B4F3A]">{item.subcategory}</p>}
                {item.locationText && <p className="text-xs text-[#6B4F3A] mt-1 opacity-80">{item.locationText}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function getCategoryIcon(id: string, cls = "w-7 h-7"): React.ReactNode {
  const icons: Record<string, React.ReactNode> = {
    manuskrip: <FileText className={cls} />,
    "tradisi-lisan": <MessageCircle className={cls} />,
    "adat-istiadat": <Building2 className={cls} />,
    ritus: <Flame className={cls} />,
    "pengetahuan-tradisional": <Brain className={cls} />,
    "teknologi-tradisional": <Wrench className={cls} />,
    seni: <Palette className={cls} />,
    bahasa: <Languages className={cls} />,
    "permainan-rakyat": <Gamepad2 className={cls} />,
    "olahraga-tradisional": <Swords className={cls} />,
  };
  return icons[id] || <Building2 className={cls} />;
}
