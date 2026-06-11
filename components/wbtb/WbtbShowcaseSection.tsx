"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { wbtbItems } from "@/data/wbtb";
import WbtbCarousel from "./WbtbCarousel";

export default function WbtbShowcaseSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="wbtb" className="relative py-20 md:py-28 bg-[#FAF5EE]">
      <div className="pattern-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Warisan Budaya Tak Benda
          </h2>
          <p className="text-base text-[#6B4F3A] max-w-xl mx-auto">
            Ditetapkan resmi oleh Kementerian Pendidikan dan Kebudayaan melalui
            Warisan Budaya Tak Benda Indonesia.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <WbtbCarousel items={wbtbItems} />
        </motion.div>
      </div>
    </section>
  );
}
