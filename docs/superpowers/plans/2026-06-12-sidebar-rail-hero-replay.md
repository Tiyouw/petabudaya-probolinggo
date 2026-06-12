# Sidebar Rail + Hero Replay Plan

**Goal:** Fix desktop sidebar icon visibility, logo behavior, OPK toggle, and hero animation replay on "Back to top".

**Architecture:** Sidebar becomes stable icon-only rail with left-side tooltip/flyout. OPK opens separate flyout panel. Hero listens for custom event to replay entrance. No expand/collapse for non-OPK items.

**Tech Stack:** React, TypeScript, Framer Motion, lucide-react, Tailwind

---

### Task 1: Desktop Sidebar Icon Rail

**Files:**
- Modify: `components/layout/Sidebar.tsx`

- [ ] **Step 1: Rewrite desktop sidebar return**

Replace the entire desktop return block (lines ~264–369) with an icon rail:

```tsx
// Desktop icon rail
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
      className="bg-[#1C0F08] flex flex-col gap-0 rounded-2xl shadow-2xl border border-[#6B4F3A] overflow-visible"
      style={{ width: "56px" }}
      aria-label="Navigasi utama"
    >
      {/* Drag handle */}
      <div
        ref={dragHandleRef}
        className="flex items-center justify-center h-6 cursor-grab active:cursor-grabbing touch-none select-none border-b border-[#2A1A10] hover:bg-[#2A1A10] transition-colors"
        onPointerDown={handleDragStart}
        aria-label="Seret untuk memindahkan sidebar"
      >
        <GripHorizontal size={12} className="text-[#6B4F3A]" />
      </div>

      {/* Logo — compact, click scrolls to hero, hover scale+glow only */}
      <SidebarLogo onClick={handleLogoClick} />

      {/* Nav items — icon only, tooltip on hover via title, OR tooltip flyout */}
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
          {/* Tooltip flyout left */}
          <div className="absolute right-[calc(100%+8px)] top-1/2 -translate-y-1/2 hidden group-hover/item:block z-[60]">
            <div className="bg-[#1C0F08] text-white text-xs font-medium whitespace-nowrap px-3 py-1.5 rounded-lg shadow-lg border border-[#6B4F3A]">
              {item.label}
              {item.id === "opk" && expandedId === "opk" ? " (Tutup)" : ""}
            </div>
          </div>
          {/* Chevron indicator for OPK */}
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

    {/* OPK submenu flyout — separate panel to the left */}
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
```

- [ ] **Step 2: Update handlers and logo**

Change `handleNav` to handle non-OPK items without expanding the whole sidebar. OPK still toggles `expandedId` but only the flyout panel shows. The rail itself never changes width.

Update `handleNav`:
```tsx
const handleNav = useCallback(
  (id: string) => {
    if (id === "opk") {
      setExpandedId(expandedId === "opk" ? null : "opk");
    } else {
      setExpandedId(null);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      // Dispatch hero replay if navigating to hero
      if (id === "hero") {
        window.dispatchEvent(new CustomEvent("petabudaya:replay-hero"));
      }
    }
  },
  [expandedId]
);
```

Add `handleLogoClick`:
```tsx
const handleLogoClick = useCallback(() => {
  setExpandedId(null);
  const hero = document.getElementById("hero");
  if (hero) {
    hero.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("petabudaya:replay-hero"));
  }
}, []);
```

Update `SidebarLogo` signature to accept `onClick`:
```tsx
function SidebarLogo({ onClick }: { onClick: () => void }) {
```
Replace the logo block with a button:
```tsx
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
  {/* Glow ring on hover */}
  <div className="absolute inset-2 rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 pointer-events-none"
    style={{ boxShadow: "0 0 14px 4px rgba(212,168,67,0.45)" }}
  />
</button>
```

Remove the old `SidebarLogo` with `expanded` prop and title-sliding logic entirely.

- [ ] **Step 3: Run ESLint on changed files**

```powershell
npx eslint components/layout/Sidebar.tsx
```

Expected: exit 0.

---

### Task 2: Hero Replay Animation

**Files:**
- Modify: `components/hero/HeroSection.tsx`
- Modify: `components/layout/CulturalOutro.tsx`

- [ ] **Step 1: Add replay state and effect to HeroSection**

Add `useCallback` import. After `sectionRef` add:

```tsx
const [replayKey, setReplayKey] = useState(0);

useEffect(() => {
  const handler = () => setReplayKey((k) => k + 1);
  window.addEventListener("petabudaya:replay-hero", handler);
  return () => window.removeEventListener("petabudaya:replay-hero", handler);
}, []);
```

- [ ] **Step 2: Key hero content groups to replayKey**

Add `key={replayKey}` to the motion.div wrapping the logo block:

```tsx
<motion.div
  key={`logos-${replayKey}`}
  className="mb-8"
  variants={logoScale}
  initial="hidden"
  animate="visible"
>
```

Add `key={`title-${replayKey}`}` to the h1:

```tsx
<motion.h1
  key={`title-${replayKey}`}
  ...
```

Add `key={`desc-${replayKey}`}` to the paragraph:

```tsx
<motion.p
  key={`desc-${replayKey}`}
  ...
```

Add `key={`cta-${replayKey}`}` to the CTA div:

```tsx
<motion.div
  key={`cta-${replayKey}`}
  ...
```

- [ ] **Step 3: Add replay-only lightsweep/radial effect**

Inside the hero section, before the content area, add a conditional glow:

```tsx
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212,168,67,0.3) 0%, rgba(192,57,43,0.15) 40%, transparent 70%)",
        }}
      />
    </motion.div>
  )}
</AnimatePresence>
```

- [ ] **Step 4: Add `AnimatePresence` import to HeroSection**

```tsx
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
```

- [ ] **Step 5: Update CulturalOutro to dispatch hero replay**

In `CulturalOutro`, change the scroll handler:

```tsx
const handleBackToTop = () => {
  document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent("petabudaya:replay-hero"));
  }, 800); // slight delay to let scroll start
};
```

If inside a button's onClick, bind `handleBackToTop`.

- [ ] **Step 6: Run ESLint on both files**

```powershell
npx eslint components/hero/HeroSection.tsx components/layout/CulturalOutro.tsx
```

Expected: exit 0.

---

### Task 3: Build, Verify, Commit, Deploy

**Files:** all modified from Tasks 1-2

- [ ] **Step 1: Build**

```powershell
set NODE_OPTIONS=--max-old-space-size=4096 && npm run build
```

Expected: BUILD_OK, all static routes generated.

- [ ] **Step 2: Browser smoke test via Playwright**

Open production URL and verify:
- Desktop sidebar rail shows icons visibly (56px wide, centered icons)
- OPK flyout opens to the left
- Logo hover scales/glows only, no inline text
- Logo click scrolls to hero
- Kembali ke Beranda scrolls and replays hero animation with radial glow

- [ ] **Step 3: Commit**

```powershell
git add . && git commit -m "fix: sidebar icon rail, logo home button, hero replay animation"
```

- [ ] **Step 4: Push + Deploy**

```powershell
git push && npx vercel --prod --yes
```

Expected: production URL updated.
