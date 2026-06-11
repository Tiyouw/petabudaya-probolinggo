# UX Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace top navbar with fixed right sidebar navigation, fullscreen map with Probolinggo boundary, load-more on CagarBudaya, smooth OPK scroll, cultural outro, and all emoji → lucide-react SVG icons with lightsweep effects.

**Architecture:** New `Sidebar.tsx` replaces `Navbar.tsx` entirely. Map gains a `MapFullscreen.tsx` wrapper with GeoJSON overlay and legend panel. `CagarBudayaSection` gets load-more pagination. `OpkShowcase` switches to `proximity` snap. Lightsweep is a pure CSS utility class. All emoji replaced with `lucide-react` `<Icon>` components.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Framer Motion, lucide-react, react-map-gl/maplibre, GeoJSON

---

### Task 0: Install lucide-react and clean up

**Files:**
- Run: `npm install lucide-react`

- [ ] **Step 1: Install lucide-react**

```bash
npm install lucide-react
```

- [ ] **Step 2: Verify install**

```bash
node -e "require('lucide-react'); console.log('OK')"
```

Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json && git commit -m "chore: install lucide-react icon library"
```

---

### Task 1: Lightsweep CSS effect

**Files:**
- Modify: `app/globals.css` (append)

- [ ] **Step 1: Add lightsweep utility to globals.css**

Append to `app/globals.css`:

```css
/* ===== Lightsweep Effect ===== */
@property --sweep-x {
  syntax: '<percentage>';
  initial-value: -100%;
  inherits: false;
}

.lightsweep {
  position: relative;
  overflow: hidden;
}

.lightsweep::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 35%,
    rgba(255, 255, 255, 0.08) 40%,
    rgba(255, 255, 255, 0.18) 45%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 55%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.lightsweep:hover::after {
  transform: translateX(100%);
}

.lightsweep-active::after {
  animation: sweep-once 1.8s ease forwards;
}

@keyframes sweep-once {
  0% { transform: translateX(-100%); }
  40% { transform: translateX(100%); }
  100% { transform: translateX(100%); }
}
```

- [ ] **Step 2: Build check**

```bash
npm run build 2>&1 | tail -3
```

Expected: `○  (Static)  prerendered as static content`

- [ ] **Step 3: Commit**

```bash
git add app/globals.css && git commit -m "feat: add lightsweep CSS effect utility"
```

---

### Task 2: Right Sidebar Navigation (replaces Navbar)

**Files:**
- Create: `components/layout/Sidebar.tsx`
- Modify: `app/layout.tsx` — import Sidebar instead of Navbar
- Delete: `components/layout/Navbar.tsx` (or keep as unused)

- [ ] **Step 1: Create Sidebar component**

Create `components/layout/Sidebar.tsx`:

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Map, Building2, ScrollText, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { opkCategories } from "@/data/opk";

const mainNav = [
  { id: "hero", label: "Beranda", icon: Home, href: "#hero" },
  { id: "peta", label: "Peta", icon: Map, href: "#peta" },
  { id: "cagar-budaya", label: "Cagar Budaya", icon: Building2, href: "#cagar-budaya" },
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

  const handleNav = useCallback((id: string, href: string) => {
    if (id === "opk") {
      setExpandedId(expandedId === "opk" ? null : "opk");
      return;
    }
    setExpandedId(null);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, [expandedId]);

  const handleOpkSub = useCallback((categoryId: string) => {
    setExpandedId(null);
    document.getElementById(`opk-${categoryId}`)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1C0F08] border-t border-[#6B4F3A] flex justify-around py-2 px-2" aria-label="Mobile navigation">
        {mainNav.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id, item.href)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
              activeId === item.id ? "text-[#C0392B]" : "text-[#6B4F3A]"
            }`}
          >
            <item.icon size={20} strokeWidth={activeId === item.id ? 2.5 : 1.5} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    );
  }

  return (
    <>
      <aside className="fixed right-0 top-0 bottom-0 z-50 flex items-center">
        <nav
          className="bg-[#1C0F08] flex flex-col gap-0 py-4 rounded-l-2xl shadow-2xl border-l border-[#6B4F3A]"
          style={{ width: expandedId ? "236px" : "60px", transition: "width 0.3s ease" }}
          aria-label="Navigasi utama"
        >
          {mainNav.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleNav(item.id, item.href)}
                className={`w-full flex items-center gap-3 px-[18px] py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] rounded-none lightsweep ${
                  activeId === item.id
                    ? "text-[#C0392B] border-r-[3px] border-r-[#C0392B] bg-[#C0392B]/10"
                    : "text-[#6B4F3A] hover:text-[#DDD0C0] hover:bg-[#2A1A10]"
                }`}
                aria-label={item.label}
                aria-current={activeId === item.id ? "page" : undefined}
              >
                <item.icon size={22} strokeWidth={activeId === item.id ? 2.5 : 1.5} />
                <motion.span
                  className="text-sm font-medium whitespace-nowrap"
                  animate={{ opacity: expandedId ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
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
                          <span className="text-left leading-tight">{cat.name}</span>
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
    </>
  );
}
```

- [ ] **Step 2: Update layout.tsx**

In `app/layout.tsx`, replace:
```tsx
import Navbar from "@/components/layout/Navbar";
```
with:
```tsx
import Sidebar from "@/components/layout/Sidebar";
```

And replace `<Navbar />` with `<Sidebar />` in the JSX.

Also add `pb-16 md:pb-0` and `mr-[60px]` to the `<main>` element for sidebar spacing:

```tsx
<main id="main-content" className="flex-1 mr-0 md:mr-[60px] pb-16 md:pb-0" tabIndex={-1}>
```

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | tail -5
```

Expected: clean build

- [ ] **Step 4: Commit**

```bash
git add components/layout/Sidebar.tsx app/layout.tsx && git commit -m "feat: replace top navbar with right sidebar navigation"
```

---

### Task 3: Fullscreen Map Mode + GeoJSON Boundary + Legend + Popup Fix

**Files:**
- Create: `components/map/MapFullscreen.tsx` — fullscreen wrapper
- Modify: `components/map/CultureMap.tsx` — enlarge popup close, zoom 9, GeoJSON source/layer, use lucide icons
- Modify: `components/map/MapSection.tsx` — use MapFullscreen
- Modify: `lib/map-utils.ts` — DEFAULT_ZOOM = 9
- Create: `data/probolinggo-boundary.geojson` — simplified boundary polygon

- [ ] **Step 1: Update DEFAULT_ZOOM**

In `lib/map-utils.ts`:
```ts
export const DEFAULT_ZOOM = 9; // was 10
```

- [ ] **Step 2: Create GeoJSON boundary file**

Create `data/probolinggo-boundary.geojson`:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "Kabupaten Probolinggo" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [112.95, -7.65], [113.05, -7.66], [113.12, -7.68], [113.18, -7.69],
          [113.22, -7.72], [113.28, -7.70], [113.35, -7.73], [113.42, -7.74],
          [113.48, -7.72], [113.55, -7.71], [113.60, -7.72], [113.65, -7.70],
          [113.70, -7.71], [113.75, -7.73], [113.80, -7.76], [113.82, -7.78],
          [113.85, -7.80], [113.88, -7.82], [113.90, -7.84], [113.88, -7.86],
          [113.85, -7.88], [113.80, -7.90], [113.75, -7.92], [113.70, -7.94],
          [113.65, -7.95], [113.58, -7.96], [113.52, -7.97], [113.45, -7.98],
          [113.38, -7.99], [113.30, -8.00], [113.22, -8.01], [113.15, -8.02],
          [113.08, -8.03], [113.00, -8.02], [112.95, -8.01], [112.90, -7.98],
          [112.88, -7.95], [112.86, -7.92], [112.85, -7.88], [112.87, -7.85],
          [112.90, -7.80], [112.92, -7.76], [112.94, -7.72], [112.95, -7.68],
          [112.95, -7.65]
        ]]
      }
    }
  ]
}
```

- [ ] **Step 3: Create MapFullscreen wrapper**

Create `components/map/MapFullscreen.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import CultureMap from "./CultureMap";

export default function MapFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      {/* Normal view */}
      <div className={`relative ${isFullscreen ? "hidden" : ""}`}>
        <CultureMap />
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-white/90 backdrop-blur-sm border border-[#DDD0C0] shadow-card hover:bg-[#F0E6D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
          aria-label="Buka peta layar penuh"
        >
          <Maximize2 size={18} className="text-[#6B4F3A]" />
        </button>
      </div>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-4 md:inset-6 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C0392B]">
            <CultureMap isFullscreen />
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-white/90 backdrop-blur-sm border border-[#DDD0C0] shadow-card hover:bg-[#F0E6D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
              aria-label="Tutup peta layar penuh"
            >
              <Minimize2 size={18} className="text-[#6B4F3A]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 4: Update CultureMap — add GeoJSON boundary, legend, fix popup close, replace emoji pins with lucide SVGs**

Modify `components/map/CultureMap.tsx`:

Add import:
```tsx
import { Building2, HelpCircle, Sparkles, X } from "lucide-react";
import mapBoundaryGeoJSON from "@/data/probolinggo-boundary.geojson";
```

Change the component to accept `isFullscreen` prop:
```tsx
export default function CultureMap({ isFullscreen = false }: { isFullscreen?: boolean }) {
```

After `onLoad` add GeoJSON source/layer (wrap in useEffect):

```tsx
// GeoJSON boundary source + layers
useEffect(() => {
  const map = mapRef.current?.getMap();
  if (!map) return;
  
  const addBoundary = () => {
    if (map.getSource("probolinggo-boundary")) return;
    map.addSource("probolinggo-boundary", {
      type: "geojson",
      data: mapBoundaryGeoJSON as GeoJSON.FeatureCollection,
    });
    map.addLayer({
      id: "probolinggo-fill",
      type: "fill",
      source: "probolinggo-boundary",
      paint: {
        "fill-color": "#C0392B",
        "fill-opacity": 0.06,
      },
    });
    map.addLayer({
      id: "probolinggo-outline",
      type: "line",
      source: "probolinggo-boundary",
      paint: {
        "line-color": "#C0392B",
        "line-width": 2.5,
        "line-opacity": 0.5,
        "line-dasharray": [4, 2],
      },
    });
  };
  
  if (map.isStyleLoaded()) {
    addBoundary();
  } else {
    map.on("style.load", addBoundary);
    return () => { map.off("style.load", addBoundary); };
  }
}, []);
```

Replace emoji pins with lucide SVGs inline or HTML. Replace the pin div content with:
```tsx
{item.type === "cagar-budaya" && (
  <svg width={badge.pinSize * 0.4} height={badge.pinSize * 0.4} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="16" y2="11" /><line x1="8" y1="15" x2="16" y2="15" />
  </svg>
)}
```

Larger popup close: add `closeButton={false}` to `<Popup>` and render a custom close button:

```tsx
{/* Custom close button */}
<button
  onClick={handleClosePopup}
  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border border-[#DDD0C0] shadow flex items-center justify-center hover:bg-[#C0392B] hover:text-white hover:border-[#C0392B] transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
  aria-label="Tutup"
>
  <X size={14} />
</button>
```

Add legend panel (fullscreen only):
```tsx
{isFullscreen && (
  <div className="absolute bottom-6 right-6 z-10 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-map border border-[#DDD0C0] text-xs">
    <h4 className="font-semibold text-[#1C0F08] mb-2">Legenda</h4>
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#C0392B]" /><span className="text-[#6B4F3A]">Cagar Budaya (5)</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#8B5E34]" /><span className="text-[#6B4F3A]">ODCB (54)</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#D4A843]" /><span className="text-[#6B4F3A]">WBTB (6)</span>
      </div>
    </div>
  </div>
)}
```

- [ ] **Step 5: Update MapSection to use MapFullscreen**

Modify `components/map/MapSection.tsx`:
```tsx
import MapFullscreen from "./MapFullscreen";

export default function MapSection() {
  return <MapFullscreen />;
}
```

- [ ] **Step 6: Build check**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 7: Commit**

```bash
git add components/map/ lib/map-utils.ts data/probolinggo-boundary.geojson && git commit -m "feat: fullscreen map with GeoJSON boundary, legend, improved popup, zoom 9"
```

---

### Task 4: Cagar Budaya — Load More + Filter UX Refresh

**Files:**
- Modify: `components/heritage/CagarBudayaSection.tsx`

- [ ] **Step 1: Rewrite CagarBudayaSection with load-more**

Rewrite `components/heritage/CagarBudayaSection.tsx`:

```tsx
"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { cagarBudaya, allCulturalSites } from "@/data/cultural-sites";
import { filterHeritageItems, filterByDistrict, uniqueDistricts } from "@/lib/filters";
import CulturalCard from "@/components/ui/CulturalCard";
import { CulturalItem } from "@/data/types";
import { ChevronDown } from "lucide-react";

const INITIAL_SHOW = 6;
const LOAD_MORE = 12;

function AnimatedCard({ item, index }: { item: CulturalItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
    >
      <CulturalCard
        item={item}
        variant={item.type === "cagar-budaya" ? "official" : "featured"}
      />
    </motion.div>
  );
}

export default function CagarBudayaSection() {
  const [filter, setFilter] = useState<"all" | "cb" | "odcb">("all");
  const [district, setDistrict] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);
  const [isLoading, setIsLoading] = useState(false);

  const allHeritage = useMemo(
    () => [...cagarBudaya, ...allCulturalSites.filter((i) => i.type === "odcb")],
    []
  );
  const districts = useMemo(() => uniqueDistricts(allHeritage), [allHeritage]);
  const districtActive = district !== null;

  const filtered = useMemo(() => {
    let items = allHeritage;
    items = filterHeritageItems(items, filter);
    if (district) items = filterByDistrict(items, district);
    return items;
  }, [allHeritage, filter, district]);

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const hasMore = visibleCount < filtered.length;

  // Reset visible count when filters change
  const handleFilterChange = useCallback((f: "all" | "cb" | "odcb") => {
    setFilter(f);
    setVisibleCount(INITIAL_SHOW);
  }, []);

  const handleDistrictChange = useCallback((d: string | null) => {
    setDistrict(d);
    setVisibleCount(INITIAL_SHOW);
  }, []);

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + LOAD_MORE);
      setIsLoading(false);
    }, 300);
  }, []);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="cagar-budaya" className="relative py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Cagar Budaya
          </h2>
          <p className="text-base text-[#6B4F3A] max-w-xl mx-auto">
            Warisan fisik yang telah tercatat dan dilindungi oleh pemerintah daerah dan provinsi.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex gap-2">
            {(["all", "cb", "odcb"] as const).map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
                  filter === f
                    ? "bg-[#C0392B] text-white"
                    : "bg-[#F0E6D8] text-[#6B4F3A] hover:bg-[#DDD0C0]"
                }`}
              >
                {f === "all" ? "Semua" : f === "cb" ? "Cagar Budaya Ditetapkan" : "ODCB"}
              </button>
            ))}
          </div>

          {/* Custom dropdown — only active when user picks */}
          <div className="relative">
            <button
              onClick={() => {
                if (!districtActive) {
                  const next = districts[0];
                  handleDistrictChange(next);
                } else {
                  handleDistrictChange(null);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
                districtActive
                  ? "border-[#C0392B] bg-[#C0392B]/5 text-[#C0392B]"
                  : "border-[#DDD0C0] bg-white text-[#6B4F3A] hover:border-[#C0392B]/50"
              }`}
            >
              <span>{districtActive ? district : "Filter Kecamatan"}</span>
              <ChevronDown size={14} className={`transition-transform ${districtActive ? "rotate-180" : ""}`} />
            </button>
            {districtActive && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-[#DDD0C0] rounded-xl shadow-lift z-20 max-h-[260px] overflow-y-auto min-w-[180px]">
                <button
                  onClick={() => handleDistrictChange(null)}
                  className="w-full text-left px-4 py-2 text-xs text-[#6B4F3A] hover:bg-[#F0E6D8] border-b border-[#F0E6D8]"
                >
                  Semua Kecamatan
                </button>
                {districts.map((d) => (
                  <button
                    key={d}
                    onClick={() => handleDistrictChange(d)}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                      district === d
                        ? "bg-[#C0392B]/5 text-[#C0392B] font-semibold"
                        : "text-[#6B4F3A] hover:bg-[#F0E6D8]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Count */}
        <p className="text-xs text-[#6B4F3A] mb-6">
          Menampilkan {visible.length} dari {filtered.length} objek
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((item, i) => (
            <AnimatedCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <motion.div className="text-center mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#C0392B] text-[#C0392B] font-medium text-sm hover:bg-[#C0392B] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] disabled:opacity-50 lightsweep"
            >
              {isLoading ? "Memuat..." : `Tampilkan Lebih Banyak (${LOAD_MORE})`}
            </button>
          </motion.div>
        )}

        {!hasMore && filtered.length > 0 && (
          <p className="text-center mt-10 text-sm text-[#6B4F3A]">{filtered.length} objek ditampilkan</p>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#6B4F3A] text-sm">
            Tidak ada hasil untuk filter yang dipilih.
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build check**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add components/heritage/CagarBudayaSection.tsx && git commit -m "feat: load-more on cagar budaya, custom kecamatan dropdown"
```

---

### Task 5: OPK Smooth Scroll Fix

**Files:**
- Modify: `components/opk/OpkShowcase.tsx` — proximity snap, velocity-based Framer Motion scrolling
- Modify: `hooks/useScrollSpy.ts` — smoother thresholds
- Modify: `app/globals.css` — replace mandatory snap with proximity

- [ ] **Step 1: Change scroll-snap to proximity**

In `app/globals.css`, find `.snap-container` and replace `y mandatory` with `y proximity`:

```css
.snap-container {
  scroll-snap-type: y proximity;
  overflow-y: scroll;
  height: 100vh;
}
```

- [ ] **Step 2: Add smooth scroll wrapper in OpkShowcase**

In `components/opk/OpkShowcase.tsx`, modify the scroll behavior. Change the container from `snap-container` to use a custom smooth scroll approach. Replace the container div:

```tsx
<div
  ref={containerRef}
  className="relative"
  style={{
    height: "100vh",
    overflowY: "scroll",
    scrollSnapType: "y proximity",
    scrollBehavior: "smooth",
  }}
>
```

And modify the `scrollTo` logic in `handleScrollTo` to use the container ref:

```tsx
const handleScrollTo = useCallback(
  (index: number) => {
    const el = document.getElementById(opkSectionIds[index]);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },
  []
);
```

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add components/opk/OpkShowcase.tsx hooks/useScrollSpy.ts app/globals.css && git commit -m "fix: smooth OPK scroll with proximity snap type"
```

---

### Task 6: Cultural Outro + Scroll-to-Top

**Files:**
- Create: `components/layout/CulturalOutro.tsx`
- Modify: `app/page.tsx` — add CulturalOutro after OpkShowcase

- [ ] **Step 1: Create CulturalOutro**

Create `components/layout/CulturalOutro.tsx`:

```tsx
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
            &ldquo;Budaya adalah napas yang menghidupi tanah Probolinggo.&rdquo;
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
```

- [ ] **Step 2: Add CulturalOutro to page.tsx**

In `app/page.tsx`, add import:
```tsx
import CulturalOutro from "@/components/layout/CulturalOutro";
```

And after `<OpkShowcase />`:
```tsx
<CulturalOutro />
```

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add components/layout/CulturalOutro.tsx app/page.tsx && git commit -m "feat: cultural outro section with scroll-to-top"
```

---

### Task 7: Replace All Emoji with lucide-react Icons

**Files:**
- Modify: `components/hero/HeroSection.tsx` — remove emoji pattern, use lucide SVG
- Modify: `components/stats/StatsSection.tsx` — replace emoji with lucide icons
- Modify: `components/opk/OpkShowcase.tsx` — replace `getCategoryIcon` emoji with lucide icons
- Modify: `components/wbtb/WbtbCarousel.tsx` — replace emoji in placeholder
- Modify: `components/ui/CulturalCard.tsx` — replace emoji badges
- Modify: `components/scroll/ScrollProgressNav.tsx` — replace inline emoji dots

- [ ] **Step 1: Replace Hero scroll indicator emoji**

In `components/hero/HeroSection.tsx`, the scroll indicator is already text-based ("Gulir ke bawah"). No emoji there — skip.

- [ ] **Step 2: Replace StatsSection emoji icons with lucide**

In `components/stats/StatsSection.tsx`, replace:
```tsx
const statLabels = [
  { key: "cagarBudaya", label: "Cagar Budaya Ditetapkan", icon: "🏛️" },
  ...
```
with lucide icons. Change AnimatedStat to accept a lucide Icon component:

```tsx
import { Building2, ScrollText, Layers, Search } from "lucide-react";

const statConfig = [
  { key: "cagarBudaya", label: "Cagar Budaya Ditetapkan", Icon: Building2 },
  { key: "wbtb", label: "WBTB Tercatat", Icon: ScrollText },
  { key: "opkCategories", label: "Kategori OPK", Icon: Layers },
  { key: "odcb", label: "ODCB Tersebar", Icon: Search },
] as const;
```

And in AnimatedStat component, render `<Icon size={28} />` instead of the emoji span. Adjust color:

```tsx
<Icon size={28} className="text-[#C0392B] mx-auto" />
```

- [ ] **Step 3: Replace OPK category emoji with lucide**

In `components/opk/OpkShowcase.tsx`, replace `getCategoryIcon` function:

```tsx
import { FileText, MessageCircle, Building2, Flame, Brain, Wrench, Palette, Languages, Gamepad2, Swords } from "lucide-react";

function getCategoryIcon(id: string): React.ReactNode {
  const iconMap: Record<string, React.ReactNode> = {
    manuskrip: <FileText size={28} />,
    "tradisi-lisan": <MessageCircle size={28} />,
    "adat-istiadat": <Building2 size={28} />,
    ritus: <Flame size={28} />,
    "pengetahuan-tradisional": <Brain size={28} />,
    "teknologi-tradisional": <Wrench size={28} />,
    seni: <Palette size={28} />,
    bahasa: <Languages size={28} />,
    "permainan-rakyat": <Gamepad2 size={28} />,
    "olahraga-tradisional": <Swords size={28} />,
  };
  return iconMap[id] || <Building2 size={28} />;
}
```

Update the category icon box to accept JSX:
```tsx
<div
  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
  style={{ backgroundColor: `${category.accentColor}15`, color: category.accentColor }}
>
  {getCategoryIcon(category.id)}
</div>
```

- [ ] **Step 4: Replace WBTB carousel placeholder emoji**

In `components/wbtb/WbtbCarousel.tsx`, replace the emoji placeholder `<span className="text-4xl opacity-50">` with:

```tsx
import { Music, Building2 } from "lucide-react";

// In the card placeholder div:
{item.category?.includes("Seni") ? (
  <Music size={48} className="opacity-40 text-[#C0392B]" />
) : (
  <Building2 size={48} className="opacity-40 text-[#C0392B]" />
)}
```

- [ ] **Step 5: Build check**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 6: Commit**

```bash
git add components/stats/StatsSection.tsx components/opk/OpkShowcase.tsx components/wbtb/WbtbCarousel.tsx && git commit -m "refactor: replace all emoji with lucide-react SVG icons"
```

---

### Task 8: Geocoding JSON — Inject exact coordinates for all 63 items

**Files:**
- Modify: `data/cultural-sites.ts` — update items with geocoding coordinates that still have `approx-district`

**Note:** The current `cultural-sites.ts` already has `coordinateConfidence: 'exact'` for most items with coordinates from geocoding. Verify and fix any remaining `approx-district` or `unknown` items.

- [ ] **Step 1: Audit and fix remaining coordinates**

Check `cultural-sites.ts` for any items with `coordinateConfidence: 'approx-district'` or `coordinateConfidence: 'unknown'` that have coordinates available in `geocoding_result.json`.

The file `D:\Kuliah\cagarbudaya-probolinggo\geocoding_result.json` is at the project root and has 63 exact coordinates. Cross-reference and ensure:
- All 5 CB have `coordinateConfidence: 'exact'` ✓ (already done)
- All 6 WBTB have `coordinateConfidence: 'exact'` ✓ (already done)
- All ODCB Situs have `coordinateConfidence: 'exact'` (except Situs Eyang Mahasuri = unknown)
- SDN Banjarsari (odcb-b-021): still `coordinateConfidence: 'unknown'` — geocoding_result had `null` coords. Keep as unknown.

- [ ] **Step 2: Build check**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add data/cultural-sites.ts && git commit -m "fix: verify all geocoding coordinates injected"
```

---

### Task 9: Final Integration Build + Deploy

**Files:**
- All files

- [ ] **Step 1: Full build**

```bash
npm run build 2>&1
```

Expected: clean TypeScript + static generation.

- [ ] **Step 2: Deploy to Vercel**

```bash
npx vercel --prod --yes 2>&1
```

- [ ] **Step 3: Verify production URL**

Navigate to production URL and verify all sections work.

- [ ] **Step 4: Commit final**

```bash
git add -A && git commit -m "chore: final integration build after UX overhaul"
```
