# Sidebar Rail and Hero Replay Design

Date: 2026-06-12

## Scope

Fix the remaining desktop sidebar UX issues and add a hero replay animation when returning to the top of the page.

## Validated Issues

- Desktop sidebar collapsed state still lays out hidden labels beside icons. The labels take layout space and are clipped by the narrow rail, making icons feel missing until the OPK expanded state opens the sidebar.
- Only the OPK item expands the sidebar because `handleNav` only sets `expandedId` for `id === "opk"`.
- Sidebar logo hover reveals inline text inside a narrow rail, causing the title to slide/clash through the sidebar.
- `Kembali ke Beranda` only scrolls to the hero. It does not replay hero entrance animation because HeroSection animations run only on mount.

## Approved Direction: Icon Rail + OPK Flyout + Hero Replay

Desktop sidebar becomes a stable icon-only rail. Text labels no longer live inside the collapsed rail layout. Instead, each item shows a small tooltip/flyout label to the left on hover/focus. The OPK item opens a separate floating flyout panel to the left of the rail with OPK categories. Non-OPK items scroll directly and keep the rail collapsed.

The logo becomes a compact home button. Hovering it only pops/scales the logo with glow; it does not reveal inline title text. Clicking it scrolls to `#hero` and triggers the same hero replay event used by the bottom outro button.

Hero replay uses a small browser custom event, `petabudaya:replay-hero`. `HeroSection` listens for the event and increments a local `replayKey`, causing the logo/title/body/buttons animation group to replay. A short red/gold lightsweep/radial pulse appears behind the hero content during replay.

## Component Responsibilities

- `components/layout/Sidebar.tsx`
  - Own desktop rail layout, drag handle, active section state, OPK flyout, logo-home behavior.
  - Keep mobile bottom nav behavior unchanged.
  - Dispatch hero replay when logo or Beranda item navigates to hero.

- `components/hero/HeroSection.tsx`
  - Listen for `petabudaya:replay-hero`.
  - Replay hero animation by keying animation groups.
  - Add a short replay-only glow/lightsweep layer.

- `components/layout/CulturalOutro.tsx`
  - Dispatch `petabudaya:replay-hero` after scrolling back to hero.

## Verification

- Browser desktop snapshot should show visible icons in the collapsed right rail without opening OPK.
- Hover/focus on logo should pop/glow only, not reveal inline text.
- Clicking logo should scroll to hero.
- Clicking OPK should open a separate flyout; clicking Beranda/Peta/Cagar/WBTB should scroll without needing OPK expanded state.
- Clicking `Kembali ke Beranda` should scroll to hero and replay hero entrance/pulse animation.
- Changed files should pass ESLint.
- Production build/deploy should succeed.
