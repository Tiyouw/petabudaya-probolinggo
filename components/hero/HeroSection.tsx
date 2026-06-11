"use client";

import { motion, type Variants } from "framer-motion";
import Button from "@/components/ui/Button";

const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  },
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF5EE]"
    >
      {/* Pattern overlay */}
      <div className="absolute inset-0 pattern-overlay pointer-events-none" />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C0392B]/5 via-transparent to-[#FAF5EE]" />

      {/* Decorative map outline — subtle parallax-like float */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none"
        animate={{ rotate: [12, 14, 12], scale: [1, 1.02, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-[600px] h-[400px] rounded-[40%] border-2 border-[#C0392B]"
          aria-hidden="true"
        />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#1C0F08] leading-tight mb-6"
          style={{ fontFamily: "var(--font-display)" }}
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
        >
          Jelajah Budaya
          <br />
          <span className="text-[#C0392B]">Probolinggo</span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-[#6B4F3A] max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="visible"
        >
          Dari kawasan Tengger hingga pesisir utara, Probolinggo menyimpan jejak
          budaya yang hidup dalam ritus, bangunan, kuliner, bahasa, seni, dan
          permainan rakyat. Temukan sebarannya melalui peta interaktif dan cerita
          budaya yang dirancang untuk mudah dijelajahi.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp(0.4)}
          initial="hidden"
          animate="visible"
        >
          <Button
            variant="primary"
            onClick={() =>
              document.getElementById("peta")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Jelajahi Peta
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 3l5 5-5 5" />
            </svg>
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              document.getElementById("cagar-budaya")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Lihat Objek Budaya
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 3l5 5-5 5" />
            </svg>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator — subtle, respects reduced-motion */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6B4F3A]"
        animate={{ opacity: [1, 0.4, 1], y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <span className="text-xs font-medium">Gulir ke bawah</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 5l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  );
}
