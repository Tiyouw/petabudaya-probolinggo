"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, ScrollText, Layers, Search } from "lucide-react";
import { getStats } from "@/lib/stats";

const statConfig = [
  { key: "cagarBudaya", label: "Cagar Budaya Ditetapkan", Icon: Building2 },
  { key: "wbtb", label: "WBTB Tercatat", Icon: ScrollText },
  { key: "opkCategories", label: "Kategori OPK", Icon: Layers },
  { key: "odcb", label: "ODCB Tersebar", Icon: Search },
] as const;

function AnimatedStat({
  value,
  label,
  Icon,
  index,
}: {
  value: number;
  label: string;
  Icon: typeof Building2;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="text-center p-6 rounded-xl bg-[#FAF5EE] shadow-card"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <motion.span
        className="mb-2 block text-[#C0392B]"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring" }}
      >
        <Icon size={28} strokeWidth={1.5} className="mx-auto" />
      </motion.span>
      <motion.p
        className="text-3xl sm:text-4xl font-display font-bold text-[#C0392B] mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <CountUp target={value} isInView={isInView} delay={index * 0.1 + 0.3} />
      </motion.p>
      <p className="text-xs sm:text-sm text-[#6B4F3A] font-medium">{label}</p>
    </motion.div>
  );
}

function CountUp({
  target,
  isInView,
  delay,
}: {
  target: number;
  isInView: boolean;
  delay: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3, delay }}
    >
      {target}
    </motion.span>
  );
}

export default function StatsSection() {
  const stats = getStats();

  return (
    <section
      id="stats"
      className="relative py-16 bg-white border-y border-[#DDD0C0]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statConfig.map(({ key, label, Icon }, i) => (
            <AnimatedStat
              key={key}
              value={stats[key as keyof typeof stats]}
              label={label}
              Icon={Icon}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
