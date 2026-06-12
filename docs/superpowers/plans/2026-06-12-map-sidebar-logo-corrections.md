# Map Sidebar Logo Corrections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix map marker readability, map controls, Kabupaten Probolinggo boundary, clustering toggle, OPK sticky navigation, desktop sidebar UX, and real Probolinggo logo placement.

**Architecture:** Keep the current Next.js App Router structure. Make focused edits in existing map, sidebar, OPK, layout, hero, footer, and logo files; do not rework unrelated sections. Boundary data is a static GeoJSON/JSON asset imported by `CultureMap`.

**Tech Stack:** Next.js 16, React, TypeScript, Tailwind utility classes, Framer Motion, lucide-react, react-map-gl/maplibre, MapLibre GL.

---

## File Structure

- Modify `components/map/CultureMap.tsx`: marker SVG redesign, clustering default/toggle state, MapLibre navigation class, boundary paint improvements.
- Modify `components/map/MapFilterBar.tsx`: add `clusterEnabled` and `onClusterToggle` props and a visible Cluster toggle.
- Modify `components/map/MapFullscreen.tsx`: move fullscreen buttons to avoid zoom-control overlap.
- Modify `data/probolinggo-boundary.json`: replace approximate boundary with Kabupaten Probolinggo boundary data.
- Modify `components/opk/OpkShowcase.tsx`: remove `ScrollProgressNav` import/render and unused scroll-spy logic.
- Modify `app/layout.tsx`: remove desktop right margin reserved for sidebar.
- Modify `components/layout/Sidebar.tsx`: floating desktop panel, high-contrast icons, vertical drag, real compact logos.
- Modify `components/hero/HeroSection.tsx`: use real city/regency logos instead of placeholder logo.
- Modify `components/layout/Footer.tsx`: use real logos instead of placeholder where applicable.
- Create/move assets into `public/assets/logos/`:
  - `Coat_of_arms_of_the_City_of_Probolinggo.svg`
  - `Logo_Kabupaten_Probolinggo_-_Seal_of_Probolinggo_Regency.svg.png`

---

### Task 1: Move Logo Assets and Wire Hero/Footer

**Files:**
- Move: `D:/Kuliah/cagarbudaya-probolinggo/Coat_of_arms_of_the_City_of_Probolinggo.svg` → `D:/Kuliah/cagarbudaya-probolinggo/petabudaya-probolinggo/public/assets/logos/Coat_of_arms_of_the_City_of_Probolinggo.svg`
- Move: `D:/Kuliah/cagarbudaya-probolinggo/Logo_Kabupaten_Probolinggo_-_Seal_of_Probolinggo_Regency.svg.png` → `D:/Kuliah/cagarbudaya-probolinggo/petabudaya-probolinggo/public/assets/logos/Logo_Kabupaten_Probolinggo_-_Seal_of_Probolinggo_Regency.svg.png`
- Modify: `components/hero/HeroSection.tsx`
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Move files with PowerShell**

Run:

```powershell
$project = "D:\Kuliah\cagarbudaya-probolinggo\petabudaya-probolinggo"
$logoDir = Join-Path $project "public\assets\logos"
if (-not (Test-Path $logoDir)) { New-Item -ItemType Directory -Force $logoDir | Out-Null }
Move-Item "D:\Kuliah\cagarbudaya-probolinggo\Coat_of_arms_of_the_City_of_Probolinggo.svg" (Join-Path $logoDir "Coat_of_arms_of_the_City_of_Probolinggo.svg") -Force
Move-Item "D:\Kuliah\cagarbudaya-probolinggo\Logo_Kabupaten_Probolinggo_-_Seal_of_Probolinggo_Regency.svg.png" (Join-Path $logoDir "Logo_Kabupaten_Probolinggo_-_Seal_of_Probolinggo_Regency.svg.png") -Force
```

Expected: files exist under `public/assets/logos/`; root copies no longer exist.

- [ ] **Step 2: Update hero imports and logo block**

In `components/hero/HeroSection.tsx`, remove `import Logo from "@/components/ui/Logo";` and add:

```tsx
import Image from "next/image";
```

Replace the existing `<Logo ... />` block inside the logo `motion.div` with:

```tsx
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
  <div className="h-16 w-px bg-[#DDD0C0]" aria-hidden="true" />
  <div className="relative h-20 w-20 sm:h-24 sm:w-24">
    <Image
      src="/assets/logos/Coat_of_arms_of_the_City_of_Probolinggo.svg"
      alt="Lambang Kota Probolinggo"
      fill
      sizes="96px"
      className="object-contain drop-shadow-[0_5px_12px_rgba(0,0,0,0.18)]"
      priority
    />
  </div>
</div>
```

- [ ] **Step 3: Update footer logo use**

In `components/layout/Footer.tsx`, replace placeholder `Logo` usage with a compact `Image` pair using the same two asset paths. If the footer imports `Logo`, remove it and import `Image from "next/image"`.

Use this JSX where the logo currently appears:

```tsx
<div className="flex items-center gap-3">
  <div className="relative h-12 w-12">
    <Image src="/assets/logos/Logo_Kabupaten_Probolinggo_-_Seal_of_Probolinggo_Regency.svg.png" alt="Logo Kabupaten Probolinggo" fill sizes="48px" className="object-contain" />
  </div>
  <div className="relative h-12 w-12">
    <Image src="/assets/logos/Coat_of_arms_of_the_City_of_Probolinggo.svg" alt="Lambang Kota Probolinggo" fill sizes="48px" className="object-contain" />
  </div>
</div>
```

- [ ] **Step 4: Verify assets compile**

Run:

```powershell
npm run lint
```

Expected: no import errors for `next/image` or logo paths.

---

### Task 2: Fix Map Pins, Fullscreen Controls, and Clustering Toggle

**Files:**
- Modify: `components/map/CultureMap.tsx`
- Modify: `components/map/MapFilterBar.tsx`
- Modify: `components/map/MapFullscreen.tsx`

- [ ] **Step 1: Add cluster props to filter bar**

Change `MapFilterBarProps` in `components/map/MapFilterBar.tsx` to:

```tsx
interface MapFilterBarProps {
  activeLayers: PinLayerType[];
  onToggle: (layer: PinLayerType) => void;
  clusterEnabled: boolean;
  onClusterToggle: () => void;
}
```

Change function signature:

```tsx
export default function MapFilterBar({
  activeLayers,
  onToggle,
  clusterEnabled,
  onClusterToggle,
}: MapFilterBarProps) {
```

Add this button after category layer buttons:

```tsx
<button
  onClick={onClusterToggle}
  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
    clusterEnabled
      ? "bg-[#1C0F08] text-white shadow-sm"
      : "bg-transparent text-[#6B4F3A] hover:bg-[#F0E6D8]"
  }`}
  aria-pressed={clusterEnabled}
>
  <span
    className={`inline-block h-2 w-2 rounded-full ${clusterEnabled ? "bg-[#D4A843]" : "bg-[#C4B5A5]"}`}
  />
  Cluster
</button>
```

- [ ] **Step 2: Add clustering state in CultureMap**

In `CultureMap`, add state after `mapError`:

```tsx
const [clusterEnabled, setClusterEnabled] = useState(false);
```

Change:

```tsx
const isClustered = currentZoom < CLUSTER_ZOOM;
```

to:

```tsx
const isClustered = clusterEnabled && currentZoom < CLUSTER_ZOOM;
```

Change filter bar render to:

```tsx
<MapFilterBar
  activeLayers={activeLayers}
  onToggle={toggleLayer}
  clusterEnabled={clusterEnabled}
  onClusterToggle={() => setClusterEnabled((value) => !value)}
/>
```

- [ ] **Step 3: Replace pin icon SVG geometry**

In `CultureMap.tsx`, replace `getPinIcon` and `buildPinSvg` with:

```tsx
function getPinIcon(type: string): string {
  switch (type) {
    case "cagar-budaya":
      return (
        `<path d="M7.4 10.1h9.2v5.6H7.4z" fill="none" stroke="white" stroke-width="1.8" stroke-linejoin="round"/>` +
        `<path d="M6.4 10.1 12 6.5l5.6 3.6" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` +
        `<path d="M10.4 15.7v-3h3.2v3" fill="none" stroke="white" stroke-width="1.6" stroke-linejoin="round"/>`
      );
    case "odcb":
      return (
        `<path d="M8.2 8.8c.8-1.5 2.2-2.3 4-2.1 2 .2 3.4 1.5 3.4 3.2 0 1.6-1 2.4-2.4 3.2-.9.5-1.2.9-1.2 1.8" fill="none" stroke="white" stroke-width="1.9" stroke-linecap="round"/>` +
        `<circle cx="12" cy="17.2" r="1.25" fill="white"/>`
      );
    case "wbtb":
      return `<path d="m12 6.6 1.25 3.15 3.35.25-2.58 2.13.8 3.27L12 13.62 9.18 15.4l.8-3.27L7.4 10l3.35-.25L12 6.6Z" fill="none" stroke="white" stroke-width="1.9" stroke-linejoin="round"/>`;
    default:
      return getPinIcon("odcb");
  }
}

function buildPinSvg(type: string, color: string, size: number): string {
  const icon = getPinIcon(type);
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 10}" viewBox="0 0 24 34" aria-hidden="true">
      <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="#1C0F08" flood-opacity="0.25" />
      </filter>
      <g filter="url(#pinShadow)">
        <circle cx="12" cy="12" r="10.2" fill="${color}" opacity="0.22" />
        <path d="M12 32 6.9 21.4h10.2L12 32Z" fill="${color}" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
        <circle cx="12" cy="12" r="9" fill="${color}" stroke="white" stroke-width="2.2" />
        ${icon}
      </g>
    </svg>
  `;
}
```

- [ ] **Step 4: Shift MapLibre zoom controls down**

In `CultureMap.tsx`, change:

```tsx
<NavigationControl position="top-right" />
```

to:

```tsx
<NavigationControl position="top-right" style={{ marginTop: 56 }} />
```

- [ ] **Step 5: Move fullscreen buttons above zoom controls**

In `MapFullscreen.tsx`, change both button classNames from:

```tsx
absolute top-3 right-3 z-10 p-2 rounded-lg ...
```

to:

```tsx
absolute top-3 right-3 z-20 p-2 rounded-lg ...
```

This puts fullscreen at the top-right while `NavigationControl` is pushed below it.

- [ ] **Step 6: Verify map TypeScript compile**

Run:

```powershell
npm run lint
```

Expected: no prop/type errors in map components.

---

### Task 3: Replace Boundary and Improve Boundary Styling

**Files:**
- Modify: `data/probolinggo-boundary.json`
- Modify: `components/map/CultureMap.tsx`

- [ ] **Step 1: Find Kabupaten Probolinggo GeoJSON source**

Use web search for public administrative boundary GeoJSON for Kabupaten Probolinggo, Jawa Timur. Prefer official/open sources such as GADM, geoBoundaries, OpenStreetMap-derived boundary, or Indonesian administrative boundary repositories. The final file must be valid GeoJSON FeatureCollection in WGS84 `[lng, lat]` coordinates.

- [ ] **Step 2: Replace `data/probolinggo-boundary.json`**

Write the full FeatureCollection to `D:\Kuliah\cagarbudaya-probolinggo\petabudaya-probolinggo\data\probolinggo-boundary.json`.

The file shape must be:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Kabupaten Probolinggo",
        "source": "<source name/url>"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": []
      }
    }
  ]
}
```

If source geometry is `MultiPolygon`, keep it as `MultiPolygon` instead of forcing it to `Polygon`.

- [ ] **Step 3: Improve boundary map layers**

In `CultureMap.tsx`, change fill paint to:

```tsx
paint: {
  "fill-color": "#C0392B",
  "fill-opacity": 0.08,
},
```

Add a second fill layer before the outline:

```tsx
map.addLayer({
  id: "probolinggo-fill-soft",
  type: "fill",
  source: "probolinggo-boundary",
  paint: {
    "fill-color": "#D4A843",
    "fill-opacity": 0.025,
  },
});
```

Change outline paint to:

```tsx
paint: {
  "line-color": "#C0392B",
  "line-width": 3,
  "line-opacity": 0.78,
  "line-dasharray": [3, 1.5],
},
```

- [ ] **Step 4: Verify JSON import works**

Run:

```powershell
npm run build
```

Expected: build succeeds and no JSON parse/import errors.

---

### Task 4: Remove OPK Sticky Progress Nav

**Files:**
- Modify: `components/opk/OpkShowcase.tsx`

- [ ] **Step 1: Remove unused imports**

Remove:

```tsx
import { useScrollSpy } from "@/hooks/useScrollSpy";
import ScrollProgressNav from "@/components/scroll/ScrollProgressNav";
```

Change React import from:

```tsx
import { useRef, useCallback } from "react";
```

to:

```tsx
import { useRef } from "react";
```

- [ ] **Step 2: Remove section ID array and scroll spy logic**

Delete:

```tsx
const opkSectionIds = opkCategories.map((c) => `opk-${c.id}`);
```

Inside `OpkShowcase`, delete:

```tsx
const { activeIndex, scrollTo } = useScrollSpy({
  sectionIds: opkSectionIds,
  offset: 0,
});

const handleScrollTo = useCallback(
  (index: number) => {
    scrollTo(index);
  },
  [scrollTo]
);
```

- [ ] **Step 3: Remove progress nav JSX**

Delete:

```tsx
{/* Progress nav */}
<ScrollProgressNav
  categories={opkCategories}
  activeIndex={activeIndex}
  onNavigate={handleScrollTo}
/>
```

- [ ] **Step 4: Verify no sticky OPK nav remains**

Run:

```powershell
npm run lint
```

Expected: no unused import warnings/errors in `OpkShowcase.tsx`.

---

### Task 5: Make Desktop Sidebar Floating, Visible, Clickable, and Draggable

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/layout/Sidebar.tsx`

- [ ] **Step 1: Remove desktop layout gap**

In `app/layout.tsx`, change:

```tsx
<main id="main-content" className="flex-1 mr-0 md:mr-[60px] pb-16 md:pb-0" tabIndex={-1}>
```

to:

```tsx
<main id="main-content" className="flex-1 pb-16 md:pb-0" tabIndex={-1}>
```

- [ ] **Step 2: Import Image and pointer event types**

In `Sidebar.tsx`, add:

```tsx
import Image from "next/image";
```

Keep React import as:

```tsx
import { useState, useEffect, useCallback } from "react";
```

- [ ] **Step 3: Replace sidebar logo mark**

Inside `SidebarLogo`, replace the PB monogram SVG wrapper with:

```tsx
<div className="relative h-[42px] w-[42px] flex-shrink-0 rounded-full bg-white p-1.5 shadow-[0_6px_18px_rgba(212,168,67,0.25)] ring-1 ring-[#F2C86B]/50">
  <Image
    src="/assets/logos/Logo_Kabupaten_Probolinggo_-_Seal_of_Probolinggo_Regency.svg.png"
    alt="Logo Kabupaten Probolinggo"
    fill
    sizes="42px"
    className="object-contain p-1"
  />
</div>
```

- [ ] **Step 4: Add drag offset state and handlers**

Inside `Sidebar`, after `isMobile` state, add:

```tsx
const [dragY, setDragY] = useState(0);
const [isDragging, setIsDragging] = useState(false);

const clampDragY = useCallback((value: number) => {
  if (typeof window === "undefined") return value;
  const limit = Math.max(120, window.innerHeight / 2 - 140);
  return Math.min(limit, Math.max(-limit, value));
}, []);

const handlePointerDown = useCallback(
  (event: React.PointerEvent<HTMLElement>) => {
    const startY = event.clientY;
    const startOffset = dragY;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      setDragY(clampDragY(startOffset + moveEvent.clientY - startY));
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  },
  [clampDragY, dragY]
);
```

- [ ] **Step 5: Update desktop aside/nav classes**

Change desktop aside from:

```tsx
<aside className="fixed right-0 top-0 bottom-0 z-50 flex items-center">
```

to:

```tsx
<aside
  className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 md:flex"
  style={{ transform: `translateY(calc(-50% + ${dragY}px))` }}
>
```

Change nav opening to:

```tsx
<nav
  onPointerDown={handlePointerDown}
  className={`bg-[#1C0F08]/95 backdrop-blur-xl flex flex-col gap-0 rounded-2xl shadow-[0_24px_70px_rgba(28,15,8,0.35)] border border-[#6B4F3A]/70 overflow-hidden ${
    isDragging ? "cursor-grabbing" : "cursor-grab"
  }`}
  style={{
    width: isExpanded ? "248px" : "68px",
    transition: isDragging ? "none" : "width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  }}
  aria-label="Navigasi utama"
>
```

- [ ] **Step 6: Prevent button clicks from being swallowed by drag**

Add `onPointerDown={(event) => event.stopPropagation()}` to each desktop nav button and OPK sub button.

Example desktop main button:

```tsx
<button
  onPointerDown={(event) => event.stopPropagation()}
  onClick={() => handleNav(item.id)}
```

- [ ] **Step 7: Increase icon contrast and hit area**

Change desktop button class inactive colors to:

```tsx
activeId === item.id
  ? "text-[#FFD36A] border-r-[3px] border-r-[#FFD36A] bg-[#C0392B]/20"
  : "text-[#FAF5EE] hover:text-[#FFD36A] hover:bg-[#2A1A10]"
```

Change icon render to:

```tsx
<item.icon
  size={24}
  strokeWidth={activeId === item.id ? 2.8 : 2.35}
  className="shrink-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
/>
```

- [ ] **Step 8: Verify sidebar compile**

Run:

```powershell
npm run lint
```

Expected: no TypeScript or ESLint errors in `Sidebar.tsx` or `layout.tsx`.

---

### Task 6: Final Verification, Commit, and Deploy

**Files:**
- All modified files from Tasks 1-5.

- [ ] **Step 1: Run production build**

Run:

```powershell
npm run build
```

Expected: Next.js production build succeeds.

- [ ] **Step 2: Run browser validation if Playwright is available**

Open the local site and validate:

- pins show category icons clearly at normal and zoomed map levels;
- fullscreen button no longer overlaps `+/-`;
- Cluster toggle defaults OFF and all markers show;
- enabling Cluster groups markers at low zoom;
- Kabupaten Probolinggo boundary is visible as internal map overlay;
- OPK sticky nav is gone;
- desktop sidebar floats without a right cream/white layout column;
- desktop sidebar icons are visible and clickable;
- desktop sidebar can be dragged up/down;
- real logos render in hero/footer/sidebar.

- [ ] **Step 3: Commit changes**

Run:

```powershell
git status --short
git add app components data public docs
git commit -m @'
fix: polish map controls, sidebar, boundary, and logos

Co-Authored-By: Claude <noreply@anthropic.com>
'@
```

Expected: commit created.

- [ ] **Step 4: Push and deploy**

Run only if user still wants publish/deploy:

```powershell
git push
npx vercel --prod --yes
```

Expected: push succeeds and Vercel returns production URL.

---

## Self-Review

- Spec coverage: all approved requirements have tasks: marker icons, fullscreen placement, Kabupaten boundary, clustering default OFF/toggle, OPK sticky nav removal, floating draggable sidebar, real logo move/use, verification.
- Placeholder scan: no TBD/TODO/later placeholders remain. Boundary source selection is explicit and constrained to valid public GeoJSON/WGS84 data.
- Type consistency: `clusterEnabled`, `onClusterToggle`, `MapFilterBarProps`, and sidebar drag handlers are named consistently across tasks.
