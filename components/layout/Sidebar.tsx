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

const SIDEBAR_COLLAPSED_WIDTH = 64;
const SIDEBAR_EXPANDED_WIDTH = 236;

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
function SidebarLogo({ expanded }: { expanded: boolean }) {
  const [hovered, setHovered] = useState(false);
  const showText = expanded || hovered;

  return (
    <div
      className="flex flex-col items-center gap-0.5 pt-4 pb-3 border-b border-[#2A1A10] overflow-visible"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-2.5 px-[14px] min-h-[44px] overflow-visible">
        {/* Real Kabupaten Probolinggo logo */}
        <div className="relative w-[42px] h-[42px] flex-shrink-0 group/logo">
          <Image
            src="/assets/logos/Logo_Kabupaten_Probolinggo_-_Seal_of_Probolinggo_Regency.svg.png"
            alt="Logo Kabupaten Probolinggo"
            width={42}
            height={42}
            className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(212,168,67,0.35)] transition-all duration-300 group-hover/logo:drop-shadow-[0_2px_12px_rgba(212,168,67,0.55)]"
            priority
            unoptimized
          />
          {/* Subtle glow ring on hover */}
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              boxShadow: "0 0 16px 4px rgba(212,168,67,0.45)",
            }}
          />
        </div>

        {/* Brand name — reveals on logo hover or sidebar expansion */}
        <motion.div
          className="overflow-hidden whitespace-nowrap"
          initial={false}
          animate={{
            opacity: showText ? 1 : 0,
            width: showText ? "auto" : 0,
            marginLeft: showText ? undefined : "-4px",
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <span
            className="text-[#F2C86B] text-[13px] italic tracking-wide select-none"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            PetaBudaya Probolinggo
          </span>
        </motion.div>
      </div>

      {/* Subtitle — visible only when sidebar is fully expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[8px] text-[#8B7A6A] font-medium tracking-[0.13em] uppercase whitespace-nowrap overflow-hidden leading-none mt-1"
          >
            Dinas Kebudayaan dan Pariwisata
          </motion.p>
        )}
      </AnimatePresence>
    </div>
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
        setExpandedId(expandedId === "opk" ? null : "opk");
      } else {
        setExpandedId(null);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [expandedId]
  );

  const handleOpkSub = useCallback((categoryId: string) => {
    setExpandedId(null);
    document
      .getElementById(`opk-${categoryId}`)
      ?.scrollIntoView({ behavior: "smooth" });
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
  const isExpanded = expandedId !== null;

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
        className="bg-[#1C0F08] flex flex-col gap-0 rounded-2xl shadow-2xl border border-[#6B4F3A] overflow-hidden"
        style={{
          width: isExpanded
            ? `${SIDEBAR_EXPANDED_WIDTH}px`
            : `${SIDEBAR_COLLAPSED_WIDTH}px`,
          transition: "width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        aria-label="Navigasi utama"
      >
        {/* Drag handle — only this strip triggers vertical drag */}
        <div
          ref={dragHandleRef}
          className="flex items-center justify-center h-7 cursor-grab active:cursor-grabbing touch-none select-none border-b border-[#2A1A10] hover:bg-[#2A1A10] transition-colors"
          onPointerDown={handleDragStart}
          title="Seret untuk memindahkan sidebar"
          aria-label="Seret untuk memindahkan sidebar"
        >
          <GripHorizontal size={14} className="text-[#8B7A6A]" />
        </div>

        {/* Logo area */}
        <SidebarLogo expanded={isExpanded} />

        {/* Nav items */}
        {mainNav.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-[18px] py-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] lightsweep min-h-[48px] ${
                activeId === item.id
                  ? "text-[#C0392B] border-r-[3px] border-r-[#C0392B] bg-[#C0392B]/10"
                  : "text-[#DDD0C0] hover:text-white hover:bg-[#2A1A10]"
              }`}
              aria-label={item.label}
              aria-current={activeId === item.id ? "page" : undefined}
            >
              <item.icon
                size={24}
                strokeWidth={activeId === item.id ? 2.5 : 2}
              />
              <motion.span
                className="text-sm font-medium whitespace-nowrap select-none"
                animate={{ opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.15 }}
              >
                {item.label}
              </motion.span>
              {item.id === "opk" && (
                <motion.span
                  className="ml-auto"
                  animate={{ rotate: expandedId === "opk" ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight size={16} />
                </motion.span>
              )}
            </button>

            {/* OPK sub-panel */}
            <AnimatePresence>
              {expandedId === "opk" && item.id === "opk" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-[#2A1A10]"
                >
                  <div className="py-2 space-y-1">
                    {opkCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleOpkSub(cat.id)}
                        className="w-full flex items-center gap-2.5 pl-[52px] pr-4 py-2 text-xs text-[#DDD0C0] hover:text-white hover:bg-[#2A1A10] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: cat.accentColor }}
                        />
                        <span className="text-left leading-tight whitespace-nowrap">
                          {cat.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </aside>
  );
}
