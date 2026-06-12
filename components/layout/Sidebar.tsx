"use client";

import { useState, useEffect, useCallback, useSyncExternalStore, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Map,
  Building2,
  ScrollText,
  Layers,
  ChevronRight,
  GripHorizontal,
} from "lucide-react";
import { opkCategories } from "@/data/opk";

const mainNav = [
  { id: "hero", label: "Beranda", icon: Home, href: "#hero" },
  { id: "peta", label: "Peta", icon: Map, href: "#peta" },
  {
    id: "cagar-budaya",
    label: "Cagar Budaya",
    icon: Building2,
    href: "#cagar-budaya",
  },
  { id: "wbtb", label: "WBTB", icon: ScrollText, href: "#wbtb" },
  { id: "opk", label: "OPK", icon: Layers, href: "#opk" },
];

// ─── Sidebar Logo Component ───────────────────────────────────────────────
function SidebarLogo({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center py-3 px-3 border-b border-[#2A1A10] hover:bg-[#2A1A10] transition-all group/logo relative"
      aria-label="Kembali ke Beranda"
    >
      <div className="relative w-9 h-9 flex-shrink-0 group-hover/logo:scale-110 transition-transform duration-300">
        <Image
          src="/assets/logos/Logo_Kabupaten_Probolinggo_-_Seal_of_Probolinggo_Regency.svg.png"
          alt="Logo Kabupaten Probolinggo"
          width={36}
          height={36}
          className="object-contain drop-shadow-[0_2px_6px_rgba(212,168,67,0.35)] transition-all duration-300 group-hover/logo:drop-shadow-[0_2px_12px_rgba(212,168,67,0.55)]"
          priority
          unoptimized
        />
      </div>
      <div className="absolute inset-2 rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "0 0 14px 4px rgba(212,168,67,0.45)" }}
      />
    </button>
  );
}

// ─── Main Sidebar Component ──────────────────────────────────────────────
export default function Sidebar() {
  const [activeId, setActiveId] = useState("hero");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sidebarTop, setSidebarTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Hydration-safe mobile detection via useSyncExternalStore — avoids
  // synchronous setState in effect body which triggers react-hooks/set-state-in-effect.
  const isMobile = useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia("(max-width: 768px)");
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia("(max-width: 768px)").matches,
    () => false
  );

  // Center sidebar vertically on first render (desktop only)
  useEffect(() => {
    if (!isMobile && sidebarRef.current) {
      const sidebarHeight = sidebarRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      setSidebarTop(Math.max(0, (viewportHeight - sidebarHeight) / 2));
    }
  }, [isMobile]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = mainNav.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNav = useCallback(
    (id: string) => {
      if (id === "opk") {
        const toggling = expandedId !== "opk";
        setExpandedId((prev) => (prev === "opk" ? null : "opk"));
        if (toggling) {
          const el = document.getElementById("opk");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        setExpandedId(null);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        if (id === "hero") {
          window.dispatchEvent(new CustomEvent("petabudaya:replay-hero"));
        }
      }
    },
    [expandedId]
  );

  const handleOpkSub = useCallback((categoryId: string) => {
    setExpandedId(null);
    const el = document.getElementById("opk");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(
      new CustomEvent("petabudaya:select-opk-category", {
        detail: { categoryId },
      })
    );
  }, []);

  const handleLogoClick = useCallback(() => {
    setExpandedId(null);
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("petabudaya:replay-hero"));
    }
  }, []);

  // ─── Vertical drag (desktop only) ─────────────────────────────────────
  // Pointer events only on the handle strip — buttons keep normal click behavior.
  const handleDragStart = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      const startY = e.clientY;
      const startTop = sidebarTop;
      const el = dragHandleRef.current;
      if (el) el.setPointerCapture(e.pointerId);

      const onMove = (ev: PointerEvent) => {
        const delta = ev.clientY - startY;
        const newTop = startTop + delta;
        if (sidebarRef.current) {
          const sidebarHeight = sidebarRef.current.offsetHeight;
          const maxTop = Math.max(0, window.innerHeight - sidebarHeight);
          setSidebarTop(Math.max(0, Math.min(newTop, maxTop)));
        }
      };

      const onUp = () => {
        setIsDragging(false);
        if (el) el.releasePointerCapture(e.pointerId);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [sidebarTop]
  );

  // ─── Mobile bottom bar ───────────────────────────────────────────────
  if (isMobile) {
    return (
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#1C0F08] border-t border-[#6B4F3A] flex justify-around py-2 px-2"
        aria-label="Navigasi utama"
      >
        {mainNav.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
              activeId === item.id
                ? "text-[#C0392B]"
                : "text-[#C4B5A5] hover:text-[#DDD0C0]"
            }`}
          >
            <item.icon
              size={20}
              strokeWidth={activeId === item.id ? 2.5 : 1.5}
            />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}

        {/* Mobile OPK sub-menu */}
        <AnimatePresence>
          {expandedId === "opk" && (
            <motion.div
              className="fixed bottom-16 left-0 right-0 bg-[#1C0F08] border-t border-[#2A1A10] flex justify-around py-3 px-2 overflow-x-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {opkCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleOpkSub(cat.id)}
                  className="flex flex-col items-center gap-1 px-2 py-1 min-w-[48px]"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.accentColor }}
                  />
                  <span className="text-[9px] text-[#DDD0C0] leading-tight text-center max-w-[60px]">
                    {cat.name.substring(0, 12)}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    );
  }

  // ─── Desktop sidebar (floating overlay, right edge) ──────────────────
  return (
    <aside
      ref={sidebarRef}
      className="fixed right-3 z-50 hidden md:flex items-start"
      style={{
        top: `${sidebarTop}px`,
        transition: isDragging ? "none" : "top 0.2s ease-out",
      }}
    >
      <nav
        className="bg-[#1C0F08] flex flex-col gap-0 rounded-2xl shadow-2xl border border-[#6B4F3A] overflow-visible"
        style={{ width: "56px" }}
        aria-label="Navigasi utama"
      >
        <div
          ref={dragHandleRef}
          className="flex items-center justify-center h-6 cursor-grab active:cursor-grabbing touch-none select-none border-b border-[#2A1A10] transition-colors"
          onPointerDown={handleDragStart}
          aria-label="Seret untuk memindahkan sidebar"
        >
          <GripHorizontal size={12} className="text-[#6B4F3A]" />
        </div>

        <SidebarLogo onClick={handleLogoClick} />

        {mainNav.map((item) => (
          <div key={item.id} className="relative group/item">
            <button
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center justify-center py-3.5 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] lightsweep min-h-[48px] ${
                activeId === item.id
                  ? "text-[#C0392B] bg-[#C0392B]/10"
                  : "text-[#DDD0C0] hover:text-white hover:bg-[#2A1A10]"
              }`}
              aria-label={item.label}
              aria-current={activeId === item.id ? "page" : undefined}
            >
              <item.icon
                size={22}
                strokeWidth={activeId === item.id ? 2.8 : 2.35}
                className="shrink-0"
              />
            </button>
            <div className="absolute right-[calc(100%+8px)] top-1/2 -translate-y-1/2 hidden group-hover/item:block z-[60]">
              <div className="bg-[#1C0F08] text-white text-xs font-medium whitespace-nowrap px-3 py-1.5 rounded-lg shadow-lg border border-[#6B4F3A]">
                {item.label}
                {item.id === "opk" && expandedId === "opk" ? " (Tutup)" : ""}
              </div>
            </div>
            {item.id === "opk" && (
              <div className="flex justify-center pb-1">
                <ChevronRight
                  size={10}
                  className={`text-[#8B7A6A] transition-transform duration-300 ${
                    expandedId === "opk" ? "rotate-90" : ""
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </nav>

      <AnimatePresence>
        {expandedId === "opk" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute right-[calc(100%+12px)] top-0 z-[55] bg-[#1C0F08] rounded-2xl border border-[#6B4F3A] shadow-2xl py-3 px-3 min-w-[180px]"
          >
            <p className="text-[#F2C86B] text-[10px] font-semibold tracking-wider uppercase px-2 pb-2 border-b border-[#2A1A10] mb-2">
              Objek Pemajuan Kebudayaan
            </p>
            {opkCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleOpkSub(cat.id)}
                className="w-full flex items-center gap-2.5 px-2 py-2 text-xs text-[#DDD0C0] hover:text-white hover:bg-[#2A1A10] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.accentColor }}
                />
                <span className="text-left leading-tight">{cat.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
