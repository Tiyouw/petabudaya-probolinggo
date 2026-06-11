"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Map,
  Building2,
  ScrollText,
  Layers,
  ChevronRight,
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

export default function Sidebar() {
  const [activeId, setActiveId] = useState("hero");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
              activeId === item.id ? "text-[#C0392B]" : "text-[#6B4F3A]"
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

  return (
    <aside className="fixed right-0 top-0 bottom-0 z-50 flex items-center">
      <nav
        className="bg-[#1C0F08] flex flex-col gap-0 py-4 rounded-l-2xl shadow-2xl border-l border-[#6B4F3A]"
        style={{
          width: expandedId ? "236px" : "60px",
          transition: "width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        aria-label="Navigasi utama"
      >
        {mainNav.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-[18px] py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] lightsweep ${
                activeId === item.id
                  ? "text-[#C0392B] border-r-[3px] border-r-[#C0392B] bg-[#C0392B]/10"
                  : "text-[#6B4F3A] hover:text-[#DDD0C0] hover:bg-[#2A1A10]"
              }`}
              aria-label={item.label}
              aria-current={activeId === item.id ? "page" : undefined}
            >
              <item.icon
                size={22}
                strokeWidth={activeId === item.id ? 2.5 : 1.5}
              />
              <motion.span
                className="text-sm font-medium whitespace-nowrap"
                animate={{ opacity: expandedId ? 1 : 0 }}
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
                  <ChevronRight size={14} />
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
