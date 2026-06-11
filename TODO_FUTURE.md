# TODO Future — PetaBudaya Probolinggo

## Phase 2: Multi-Page Routes
- [ ] Ekstrak section menjadi `/peta`, `/cagar-budaya`, `/wbtb`
- [ ] Navbar links dari hash anchor → Next.js `<Link>`
- [ ] Fullscreen dedicated map page
- [ ] AI-generated illustrations (6 WBTB + 10 kategori OPK)
- [ ] SEO: sitemap.xml, OG images, structured data (Schema.org)
- [ ] Umami or GA4 analytics

## Phase 3: Detail Pages
- [ ] `/cagar-budaya/[slug]` — detail page per heritage site
- [ ] `/wbtb/[slug]` — detail page per intangible heritage
- [ ] `/objek-pemajuan/[kategori]` — category page per OPK

## Phase 4: CMS (Sanity.io)
- [ ] Sanity schema: heritageSite, intangibleHeritage, culturalObject
- [ ] Sanity Studio v3 di `/studio`
- [ ] Migration: static JSON → Sanity via GROQ import
- [ ] Email whitelist for staf dinas

## Geocoding
- [ ] Update 13 ODCB dengan kecamatan tidak diketahui setelah konfirmasi dinas
- [ ] Ganti semua `coordinateConfidence: 'exact'` yang masih bernilai `'approx-district'`

## Illustrations
- [ ] Generate 6 ilustrasi WBTB (Midjourney/DALL-E 3, flat illustration style)
- [ ] Generate 10 ilustrasi representatif per kategori OPK
- [ ] Format: WebP optimized, fallback SVG

## MapTiler Key
- [ ] Ganti placeholder key di `CultureMap.tsx` dengan key produksi
- [ ] Custom map style: cream/off-white base, muted roads, soft water blue
