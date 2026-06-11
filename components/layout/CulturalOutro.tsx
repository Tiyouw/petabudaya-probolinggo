"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUp } from "lucide-react";

export default function CulturalOutro() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToTop = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-40 bg-[#1C0F08] text-center overflow-hidden"
    >
      {/* Pattern overlay */}
      <div className="pattern-overlay absolute inset-0 pointer-events-none" />

      {/* Lightsweep accent line top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A843] to-transparent opacity-60" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.blockquote
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p
            className="text-2xl md:text-3xl lg:text-4xl font-display italic text-[#FAF5EE] leading-relaxed"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;Budaya adalah napas
            <br />
            yang menghidupi tanah Probolinggo.&rdquo;
          </p>
        </motion.blockquote>

        <motion.p
          className="text-sm text-[#DDD0C0] mb-12 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Dinas Kebudayaan dan Pariwisata Kabupaten Probolinggo
        </motion.p>

        <motion.button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#C0392B] text-white font-medium text-base hover:bg-[#96231A] transition-colors shadow-lift lightsweep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ArrowUp size={20} />
          Kembali ke Beranda
        </motion.button>
      </div>
    </section>
  );
}
