# Map, Sidebar, OPK, and Logo Corrections Design

Date: 2026-06-12

## Scope

Implement the approved targeted UX polish for PetaBudaya Probolinggo. This work fixes the map marker readability, fullscreen control overlap, Kabupaten Probolinggo boundary overlay, clustering behavior, OPK sticky navigation, desktop sidebar behavior, and real logo asset placement.

## Decisions

- Boundary shown on the map is Kabupaten Probolinggo only.
- Pendopo and other data points outside/near the Kabupaten boundary may remain visible as point data.
- Pin markers keep category icons. They must not become plain solid circles.
- Clustering is default OFF and only activates when the user enables it.
- Desktop sidebar is a floating overlay, not a reserved layout column.
- OPK sticky/horizontal progress navigation is removed. OPK navigation remains through the main sidebar and mobile bottom nav.
- Real logo files are moved from project root into public assets and used in the UI.

## Map Marker Design

`CultureMap` will keep SVG-generated markers, but the artwork will be redrawn with safe geometry:

- main badge circle uses a larger radius so icons have enough room;
- icons are centered inside the circle and use simple readable paths;
- white strokes are thicker and rounded;
- no icon element extends outside the main circle;
- the pin tail remains visible below the circle.

The icon set remains category-specific: heritage/building for Cagar Budaya, distinct unknown/artefact marker for ODCB, and star/ornament for WBTB.

## Map Controls

`MapFullscreen` owns the fullscreen toggle button. The normal and fullscreen states will place the fullscreen/minimize button at the top-right above the MapLibre zoom buttons. `CultureMap` will apply a class to the MapLibre navigation control so the `+/-` control is shifted downward. If MapLibre class overrides prove unstable, the fallback position is a fullscreen button slightly left of the zoom control.

## Boundary Overlay

Replace the current approximate boundary file with a real/public Kabupaten Probolinggo boundary dataset where available. The layer rendering will use:

- subtle red fill with low opacity;
- stronger red outline;
- optional secondary soft fill/tint to mimic a light gradient without obscuring labels or markers.

The boundary must be added inside MapLibre as a source/layer, not as a border around the map container.

## Clustering Toggle

Add `clusterEnabled` state in `CultureMap`, defaulting to `false`.

- OFF: render all filtered markers regardless of zoom.
- ON: render grid clusters only below the configured cluster zoom.

`MapFilterBar` will expose a clear Cluster toggle while preserving category layer toggles.

## OPK Navigation

Remove the `ScrollProgressNav` render and imports from `OpkShowcase`. This eliminates the mobile sticky bar identified by the user (`lg:hidden sticky top-16 ...`). Desktop OPK navigation is handled by the right sidebar OPK submenu; mobile navigation stays in the bottom app-like nav.

## Desktop Sidebar

Update the desktop sidebar so it floats above content:

- remove `md:mr-[60px]` from the root layout main element;
- position sidebar with right inset and vertical center/offset;
- make icons high-contrast with thicker strokes and larger hit areas;
- preserve click behavior and OPK submenu;
- add vertical dragging with constrained viewport bounds;
- keep mobile bottom navigation behavior unchanged.

## Logo Assets

Move these files into `public/assets/logos/`:

- `Coat_of_arms_of_the_City_of_Probolinggo.svg`
- `Logo_Kabupaten_Probolinggo_-_Seal_of_Probolinggo_Regency.svg.png`

Use the real assets in hero and footer. Sidebar may use a compact version when space is limited. Placeholder logo components should no longer be the primary displayed government logo.

## Verification

- Run the production build.
- Validate source-level behavior for default clustering OFF, removed OPK sticky nav, and removed desktop layout gap.
- If browser tools are available, run the app and check map controls, pin readability, sidebar visibility/clickability, and logo rendering.
- Report any skipped validation honestly.
