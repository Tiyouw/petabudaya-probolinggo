"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  },
});

const logoScale: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0 },
  },
};

/* -------------------------------------------------------------------------- */
/*  1. Floating Particles — data-driven dots                                 */
/* -------------------------------------------------------------------------- */

interface Particle {
  id: string;
  color: "#C0392B" | "#D4A843";
  size: number;
  initialX: string;
  initialY: string;
  animateX: number[];
  animateY: number[];
  duration: number;
  opacity: number;
  delay: number;
}

const particles: Particle[] = [
  {
    id: "p1",
    color: "#C0392B",
    size: 8,
    initialX: "15%",
    initialY: "20%",
    animateX: [0, 40, -25, 15, 0],
    animateY: [0, -30, 15, -10, 0],
    duration: 22,
    opacity: 0.25,
    delay: 0,
  },
  {
    id: "p2",
    color: "#D4A843",
    size: 6,
    initialX: "80%",
    initialY: "30%",
    animateX: [0, -35, 20, -10, 0],
    animateY: [0, 25, -15, 20, 0],
    duration: 18,
    opacity: 0.3,
    delay: 2,
  },
  {
    id: "p3",
    color: "#C0392B",
    size: 5,
    initialX: "25%",
    initialY: "70%",
    animateX: [0, 20, -30, 10, 0],
    animateY: [0, -20, -10, -25, 0],
    duration: 25,
    opacity: 0.2,
    delay: 5,
  },
  {
    id: "p4",
    color: "#D4A843",
    size: 7,
    initialX: "70%",
    initialY: "65%",
    animateX: [0, -25, 30, -15, 0],
    animateY: [0, 15, -25, 10, 0],
    duration: 20,
    opacity: 0.25,
    delay: 3,
  },
];

/* -------------------------------------------------------------------------- */
/*  5. Staggered Letter Reveal                                                */
/* -------------------------------------------------------------------------- */

const letterContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.5,
    },
  },
};

const letterItem: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function AnimatedLetters({ text }: { text: string }) {
  return (
    <motion.span
      variants={letterContainer}
      initial="hidden"
      animate="visible"
      style={{ display: "inline", whiteSpace: "nowrap" }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={letterItem}
          style={{ display: "inline-block" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero Section                                                              */
/* -------------------------------------------------------------------------- */

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const handler = () => setReplayKey((k) => k + 1);
    window.addEventListener("petabudaya:replay-hero", handler);
    return () => window.removeEventListener("petabudaya:replay-hero", handler);
  }, []);

  /* ---- 3. Map parallax — scroll-driven translateY ------------------------ */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mapTranslateY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF5EE]"
    >
      {/* ---- 4. PATTERN DRIFT — slow background-position shift -------------- */}
      <motion.div
        className="absolute inset-0 pattern-overlay pointer-events-none"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* ---- 2. GRADIENT BREATHING — pulsing opacity ----------------------- */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#C0392B]/5 via-transparent to-[#FAF5EE]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ---- 3. MAP OUTLINE PARALLAX — scroll-driven + ambient rotation ---- */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none"
        animate={{ rotate: [12, 14, 12], scale: [1, 1.02, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: mapTranslateY }}
      >
        <div
          className="w-[600px] h-[400px] rounded-[40%] border-2 border-[#C0392B]"
          aria-hidden="true"
        />
      </motion.div>

      {/* ---- 1. FLOATING PARTICLES — drifting dots ------------------------- */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            left: p.initialX,
            top: p.initialY,
            opacity: p.opacity,
          }}
          animate={{
            x: p.animateX,
            y: p.animateY,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Replay glow burst */}
      <AnimatePresence>
        {replayKey > 0 && (
          <motion.div
            key={`burst-${replayKey}`}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: [0, 0.25, 0], scale: [0.3, 1.8, 2.2] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,168,67,0.3) 0%, rgba(192,57,43,0.15) 40%, transparent 70%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Content ------------------------------------------------------- */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* ── Logo — top center, fades in and scales up ── */}
        <motion.div
          key={`logos-${replayKey}`}
          className="mb-8"
          variants={logoScale}
          initial="hidden"
          animate="visible"
        >
          <div className="mx-auto flex w-fit items-center justify-center gap-5 rounded-[2rem] border border-white/70 bg-white/70 px-6 py-4 shadow-[0_18px_50px_rgba(28,15,8,0.12)] backdrop-blur-md">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24">
              <Image
                src="/assets/logos/Logo_Kabupaten_Probolinggo_-_Seal_of_Probolinggo_Regency.svg.png"
                alt="Logo Kabupaten Probolinggo"
                fill
                sizes="96px"
                className="object-contain drop-shadow-[0_5px_12px_rgba(0,0,0,0.18)]"
                priority
              />
            </div>
          </div>
        </motion.div>

        <motion.h1
          key={`title-${replayKey}`}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#1C0F08] leading-tight mb-6"
          style={{ fontFamily: "var(--font-display)" }}
          variants={fadeUp(0.15)}
          initial="hidden"
          animate="visible"
        >
          Jelajah Budaya
          <br />
          {/* ---- 5. HERO TITLE LETTER REVEAL — staggered per letter --------- */}
          <span className="text-[#C0392B]">
            <AnimatedLetters text="Probolinggo" />
          </span>
        </motion.h1>

        <motion.p
          key={`desc-${replayKey}`}
          className="text-base sm:text-lg text-[#6B4F3A] max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={fadeUp(0.35)}
          initial="hidden"
          animate="visible"
        >
          Dari kawasan Tengger hingga pesisir utara, Probolinggo menyimpan jejak
          budaya yang hidup dalam ritus, bangunan, kuliner, bahasa, seni, dan
          permainan rakyat. Temukan sebarannya melalui peta interaktif dan cerita
          budaya yang dirancang untuk mudah dijelajahi.
        </motion.p>

        <motion.div
          key={`cta-${replayKey}`}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp(0.55)}
          initial="hidden"
          animate="visible"
        >
          <Button
            variant="primary"
            onClick={() =>
              document
                .getElementById("peta")
                ?.scrollIntoView({ behavior: "smooth" })
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
              document
                .getElementById("cagar-budaya")
                ?.scrollIntoView({ behavior: "smooth" })
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

      {/* ---- Scroll indicator — subtle, respects reduced-motion ------------ */}
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
