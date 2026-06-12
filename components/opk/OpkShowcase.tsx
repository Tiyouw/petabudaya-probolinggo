"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, MessageCircle, Building2, Flame, Brain, Wrench, Palette, Languages, Gamepad2, Swords } from "lucide-react";
import { opkCategories } from "@/data/opk";
import { OPKCategory } from "@/data/types";

export default function OpkShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <section id="opk" className="relative bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-8 text-center">
        <h2
          className="text-3xl md:text-4xl font-display font-bold text-[#1C0F08] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Objek Pemajuan Kebudayaan
        </h2>
        <p className="text-base text-[#6B4F3A] max-w-xl mx-auto">
          Budaya Probolinggo tidak hanya tersimpan dalam bangunan, tetapi juga hidup
          dalam lisan, ritus, pengetahuan, teknologi, seni, bahasa, permainan, dan
          olahraga tradisional masyarakatnya.
        </p>
      </div>

      {/* Scroll-snap sections */}
      <div ref={containerRef} className="snap-container relative">
        {opkCategories.map((category) => (
          <OpkSectionContent key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

function OpkSectionContent({ category }: { category: OPKCategory }) {
  const leftRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-100px" });

  return (
    <div
      id={`opk-${category.id}`}
      className="snap-section flex items-center relative overflow-hidden"
    >
      {/* Category accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5"
        style={{ backgroundColor: category.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Icon + Info */}
          <div ref={leftRef}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={leftInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5"
                style={{ backgroundColor: `${category.accentColor}15` }}
              >
                {getCategoryIcon(category.id)}
              </div>
            </motion.div>

            <motion.h3
              className="text-2xl md:text-3xl font-display font-bold text-[#1C0F08] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ opacity: 0, x: -30 }}
              animate={leftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {category.name}
            </motion.h3>

            <motion.p
              className="text-sm text-[#6B4F3A] mb-3"
              initial={{ opacity: 0 }}
              animate={leftInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {category.description}
            </motion.p>

            <motion.p
              className="text-sm font-medium"
              style={{ color: category.accentColor }}
              initial={{ opacity: 0 }}
              animate={leftInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              {category.count} objek budaya
            </motion.p>
          </div>

          {/* Right: Staggered item grid */}
          {/*
            Mobile: horizontal scroll container with snap.
            Tablet/Desktop (md+): 2-column grid with vertical scroll.
          */}
          <div
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory py-1 md:grid md:grid-cols-2 md:gap-3 md:overflow-visible md:max-h-[400px] md:pr-2 md:snap-none [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {category.items.map((item, i) => (
              <motion.div
                key={item.id}
                className="min-w-[160px] flex-shrink-0 snap-start
                           md:min-w-0
                           p-3 rounded-xl bg-[#FAF5EE] border border-[#F0E6D8] hover:shadow-card hover:scale-[1.02] transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.35,
                  delay: 0.15 + i * 0.06,
                  ease: "easeOut",
                }}
              >
                <p className="text-sm font-medium text-[#1C0F08] mb-1 leading-tight">
                  {item.name}
                </p>
                {item.subcategory && (
                  <p className="text-xs text-[#6B4F3A]">{item.subcategory}</p>
                )}
                {item.locationText && (
                  <p className="text-xs text-[#6B4F3A] mt-0.5 opacity-70">
                    {item.locationText}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

function getCategoryIcon(id: string): React.ReactNode {
  const cls = "w-7 h-7";
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
