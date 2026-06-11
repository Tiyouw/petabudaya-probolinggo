# PetaBudaya Probolinggo

Peta interaktif cagar budaya, warisan budaya tak benda (WBTB), dan objek pemajuan kebudayaan (OPK) Kabupaten Probolinggo.

Dibangun untuk **Dinas Kebudayaan dan Pariwisata Kabupaten Probolinggo** sebagai etalase digital resmi.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom design tokens
- **Animation:** Framer Motion
- **Map:** react-map-gl + MapLibre GL JS + MapTiler
- **Data:** Static TypeScript files (CMS-ready for Sanity.io migration)

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy

Push to GitHub and connect to Vercel. No environment variables required for MVP.

### MapTiler Key

Replace `MAPTILER_KEY` in `components/map/CultureMap.tsx` with a production key from [MapTiler](https://cloud.maptiler.com/).

## Project Structure

```
app/              → Next.js pages & layout
components/
  layout/         → Navbar, Footer, SectionShell
  hero/           → Hero section
  stats/          → Statistics section
  map/            → CultureMap (react-map-gl) + filter
  heritage/       → Cagar Budaya section + filter
  wbtb/           → WBTB showcase + carousel
  opk/            → OPK scroll-snap experience
  scroll/         → Scroll progress navigation
  ui/             → Button, Badge, CulturalCard
data/             → TypeScript data files
hooks/            → useScrollSpy, useMapFilter
lib/              → map-utils, filters, stats
```

## Data Sources

- `DAFTAR SEBARAN WBTB KABUPATEN PROBOLINGGO.pdf`
- `OBJEK PEMAJUAN KEBUDAYAAN KAB PROBOLINGGO.pdf`
- `PETA CAGAR BUDAYA.pdf`
- `Screenshot 4.11 Cagar Budaya`
- `geocoding_result.json` — OpenStreetMap/Nominatim geocoding (63 items)

## Data Principles

- **No fake precision** — koordinat tidak dikarang
- Badge "📍 Lokasi Perkiraan" untuk data tanpa koordinat presisi
- Badge "⚠️ Perlu Validasi" untuk data konflik
- Semua data traceable ke dokumen sumber

## Status

**MVP** — Single-page dengan hash sections. TypeScript build sukses.

Lihat `TODO_DATA.md` untuk item yang butuh konfirmasi dinas.
Lihat `TODO_FUTURE.md` untuk roadmap Phase 2–4.
