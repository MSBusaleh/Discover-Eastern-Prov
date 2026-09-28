# اكتشف الشرقية | Discover the Eastern Province

Interactive, bilingual (Arabic-first) website prototype for the Eastern Province booth of the
**SPE KFUPM Student Chapter** at the university's Saudi National Day celebration (30 September 2026).

> Prototype status: all six sections work end to end (the quiz was dropped). Content is **sample** or **draft**
> (see [Content status](#content-status)). This is not an official or endorsed SPE platform.

---

## 1. Quick start

Requirements: **Node.js 18+** (tested with Node 22) and npm.

```bash
npm install
npm run dev            # local dev server → http://localhost:5173
npm run build          # production build  → dist/
npm run preview        # serve dist/ locally → http://localhost:4173
npm run build:single   # one self-contained file → dist-single/index.html
npm run typecheck      # TypeScript check
npm run check:content  # validate IDs, links, sources and images in src/data
```

`dist/` is a plain static site: upload the folder to any static host.
`dist-single/index.html` inlines all code, styles, fonts and the map in one file; it opens straight
from a USB stick or desktop with no internet at all. Keep it as a booth backup.

---

## 2. Technology choices

| Choice | Why |
|---|---|
| **React 18 + TypeScript + Vite** | Lightweight, fast builds, typed content model catches broken data early. |
| **React Router (HashRouter)** | URLs like `/#/explore?loc=LOC-001` work on any static host with no server rewrites, and every view is linkable (QR codes can point at a specific place). |
| **Leaflet + Leaflet.markercluster** | Mature, small, no API key. Clustering keeps the dense Dammam–Dhahran–Khobar area tappable on touch. |
| **Satellite / Terrain / Map views** | Satellite (default) uses Sentinel-2 cloudless 2016 tiles by EOX (CC BY 4.0); Terrain uses OpenTopoMap (CC BY-SA). No API keys. Under them, two bundled layers always show, so the map is never empty offline: a NASA Blue Marble image of the region and the Natural Earth basemap with the real Eastern Province outline. Configure in `src/config/site.ts`. |
| **Fonts** | Saudi Ministry of Culture typefaces: **Al-Awwal** (الخط الأول) for headings and **Saudi** (الخط السعودي) for body text. Drop the font files into `public/fonts/` (names in `public/fonts/fonts.css`). Until then, bundled IBM Plex Sans Arabic / Reem Kufi are used automatically. |
| **No backend** | All content is typed data files. Nothing is collected from visitors. |

---

## 3. Project structure

```
src/
├── config/
│   ├── site.ts            ← launch switches: visible content statuses, badges, map views and imagery, booth timings, logos
│   └── sections.ts        ← the six sections (nav order, icons, labels)
├── types/content.ts       ← THE content model (read this first)
├── data/                  ← all content, separated from components
│   ├── locations/         LOC-xxx  places with hierarchy + sourced coordinates
│   ├── historical-events/ HIS-xxx  timeline entries
│   ├── unification/       UNI-xx   four narrative stages
│   ├── royal-visits/      KING-xx kings, RV-xxx visits
│   ├── personalities/     PER-xxx
│   ├── contemporary-topics/ CT-xxx + the 8 interest categories
│   ├── geo/               basemap.json (Natural Earth) + README (map data credits)
│   ├── sources/           SRC-xxx  every reference used anywhere
│   ├── media/             IMG-xxx  image registry with rights metadata
│   ├── taxonomy.ts        bilingual labels for kinds, eras, fields, stages …
│   └── index.ts           registry: status filtering, ID lookup, two-way relationships, routes
├── i18n/
│   ├── strings.ts         every interface string in Arabic + English
│   └── LanguageContext.tsx  language state, RTL/LTR switching
├── state/                 map view memory (ExploreState), booth mode flag
├── components/
│   ├── Navigation/        header (inner pages only), QuickControls (language + theme), footer, emblem
│   ├── InteractiveMap/    MapView, LocationCard, LocationList, markers
│   ├── HistoricalTimeline/
│   ├── RoyalVisitsGallery/
│   ├── PeopleGallery/
│   ├── ContentCards/      shared: Icon, Text (pending text), MediaFrame (image/placeholder),
│   │                      RelatedLinks, SourceList, StatusBadge, Chip, PageHeader
│   └── Booth/IdleReset.tsx
├── pages/                 one file per route
└── styles/global.css      design tokens (light + dark) and all styles
scripts/check-content.ts   content integrity checker
```

### Routes

| Route | Section |
|---|---|
| `/#/` | Home (hero + live map + entry cards) |
| `/#/explore?loc=LOC-001` | 1 · Interactive map (optional selected place) |
| `/#/timeline?event=HIS-001` | 2 · Journey Through Time |
| `/#/unification?stage=UNI-02` | 3 · Unification (four stages) |
| `/#/royal-visits?visit=RV-001` | 4 · Kings in the Eastern Province |
| `/#/today?cat=energy` · `?topic=CT-002` | 5 · Today & Tomorrow |
| `/#/sources` | Sources, image credits, map attribution |

---

## 4. How the sections connect

Every item has a unique ID. Items point at each other with `locationIds`, `personIds`,
`eventIds` and `relatedIds`. `src/data/index.ts` resolves links **in both directions**, so a link
is written once:

```
HIS-001 (event) ── locationIds: ['LOC-003'] ──▶ LOC-003 Tarout Island
                                                 └─ Tarout's card automatically lists HIS-001
PER-004 (person) ─ locationIds: ['LOC-004'], eventIds: ['HIS-006']
                                                 └─ Dhahran's card lists PER-004; HIS-006 lists PER-004
```

- `routeFor(id)` turns any ID into the page that shows it, so every "Explore related" link and
  "View on map" button is generated, not hand-written.
- The map filters **Historical Figures** and **Saudi History & Royal Visits** are derived: a place
  gets them automatically when a person, visit or unification stage links to it.
- Locations form a hierarchy with `parentId` (Ibrahim Palace → Al-Ahsa). Cards show
  "Within …" and "Places inside".
- The map remembers its view and filters while the visitor visits other sections
  (`state/ExploreState.tsx`), so "Back to the map" returns to the same spot.

---

## 5. Content integration guide

### Content status

Every item has `status`:

| Status | Meaning | Shown now |
|---|---|---|
| `demo` | Sample structure. Not factual. Empty text shows "Content coming soon" | Yes |
| `draft` | Short sourced text written for the prototype. Needs content-team review. | Yes |
| `approved` | Final content from the content package. | Yes, no badge |

**Before the public launch** set in `src/config/site.ts`:

```ts
visibleStatuses: ['approved'],
```

For review sessions, set `showStatusBadges: true` to label every sample/draft item on screen.

Every demo and draft item then disappears from pages, filters and links
automatically. Run `npm run check:content` to see how many items are in each status.

### Where each kind of content goes

| Content | File | Notes |
|---|---|---|
| Places | `src/data/locations/index.ts` | `kind` (governorate / city / island / site), `siteType`, `parentId`, `coordinates` **with `sourceId`**, `themes`, `summary` |
| Timeline events | `src/data/historical-events/index.ts` | `dateLabel` (display, per language), `sortYear` (number, negative = BCE), `era`, links |
| Unification stages | `src/data/unification/stages.json` | keep 4 stages, `order` 1–4; the file also holds their sources and images |
| Kings / royal visits | `src/data/royal-visits/index.ts` | replace the three sample visits |
| People | `src/data/personalities/index.ts` | **not published** — the People section was removed from the site; the data is kept for a possible return |
| Today & Tomorrow | `src/data/contemporary-topics/index.ts` | `stage`: `existing` / `in-progress` / `announced` |
| References | `src/data/sources/index.ts` | one entry per source, referenced by `sourceIds` |
| Images | `src/data/media/index.ts` + `public/images/…` | see below |
| Interface wording | `src/i18n/strings.ts` | Arabic and English side by side |
| Logos | `src/config/site.ts` → `logos[].src` | put files in `public/logos/`, set `src: 'logos/spe-kfupm.svg'` |

The content package's IDs (`LOC-001`, `HIS-001`, `IMG-001` …) can be used directly. Reusing the
existing IDs keeps the sample links working; new IDs just need to be unique.

### Text

Every text field is `{ ar: '…', en: '…' }`. An empty string means "not supplied yet" and renders
as a clearly marked pending line, never as invented filler.

### People: origin vs association (brief §9.4)

- `originType: 'from-region'` only when birthplace / upbringing / origin in the province is **documented**.
- `originType: 'associated'` for people who studied, worked or contributed here.
  Working at Saudi Aramco or KFUPM does **not** make someone `from-region`.

### Images

1. Put the file in `public/images/…` (WebP or AVIF, about 1600 px wide max, under ~250 KB).
2. Add an entry in `src/data/media/index.ts` (copy `IMG-001`): `file`, `alt` (ar/en), `sourceUrl`,
   `rightsHolder`, `license`, `attribution`, and the two review fields.
3. Add the ID to the item's `imageIds`.

An image only appears when `file` is set **and** both `accuracyReview` and `rightsReview` are
`'approved'`. Until then a labelled placeholder shows. Approved images are credited on the
Sources page and on the image itself when `attribution` is set.

### Adding a place (e.g. Hafr Al-Batin, Khafji, Abqaiq, Nairyah, Ras Al-Khair)

```ts
{
  id: 'LOC-012', status: 'approved',
  name: { ar: 'حفر الباطن', en: 'Hafr Al-Batin' },
  kind: 'governorate',
  coordinates: { lat: …, lng: …, sourceId: 'SRC-0xx', review: 'verified-against-source' },
  themes: ['history'],
  summary: { ar: '…', en: '…' },
  sourceIds: ['SRC-0xx'], imageIds: [],
}
```

Use `coordinates: null` to list a place without a marker until its coordinates are verified.
Administrative boundaries are not drawn; if an official boundary dataset (GeoJSON) is supplied
later it can be added as its own Leaflet layer in `MapView.tsx` without touching the content.

---

## 6. Booth mode (shared touchscreen)

- Off by default. Phones never enter it on their own.
- On the booth screen, open the site once as `https://YOUR-SITE/?booth=1#/`. The device remembers it
  (a small "Booth mode on" tag appears in the header). `?booth=0` turns it off.
- After **120 s** without touch, key or scroll, a dialog counts down **15 s** with a large
  "Keep exploring" button. At zero the site returns to the home page in Arabic, with the map and
  filters reset. It never triggers while the home page is already showing in Arabic.
- Timings: `siteConfig.booth` in `src/config/site.ts`.
- Suggested kiosk launch: Chrome with `--kiosk "https://YOUR-SITE/?booth=1#/"`.

---

## 7. Accessibility and bilingual behaviour

- Arabic default; the language button (header, or top corner on the home page) switches instantly and is remembered per device.
- Light/dark: follows the device setting on first visit; the moon/sun button stores a choice per device.
  `<html lang dir>` updates, layout uses CSS logical properties, and directional icons mirror in RTL.
  The map canvas itself stays LTR (a Leaflet requirement); marker labels use `dir="auto"`.
- Touch targets are at least 44 px (56 px in booth mode, which also enlarges the type).
- Marker type is shown by **shape** (ring, dot, square, diamond) and every marker has a text label when zoomed in, not colour alone.
  Selected filters show a check mark; development stages use
  filled / half / dashed shapes plus labels.
- Every place is reachable from the text list beside the map (keyboard and screen-reader route,
  and a text alternative to the map). Markers are keyboard focusable.
- Visible focus rings, skip link, `prefers-reduced-motion` respected, light and dark themes.

---

## 8. Testing performed

Automated in headless Chromium (Playwright), last run 27 Sep 2026:

- Every route rendered in Arabic and English at 1440 px and 390 px; no console errors.
- No horizontal page overflow at 390 px on any route in either language.
- Booth mode: overlay appears after 121 s idle and resets
  to the home page after the countdown; with booth mode off, no reset after 200 s.
- `npm run typecheck` and `npm run check:content` pass.

**Not tested:** physical touchscreens, iOS Safari, Android devices, screen readers. Please test on
the actual booth screen and a few phones before the event.

---

## 9. Limitations and pending work

- **All narrative content is pending.** Timeline, unification, royal visits and people are sample
  structures. Location summaries, and a few Today & Tomorrow items are short sourced
  drafts that need review.
- **Fonts:** the Saudi and Al-Awwal font files are not included yet; download them from the Ministry of Culture (https://engage.moc.gov.sa/e/fonts/), add them to `public/fonts/`, and uncomment the `fonts.css` link in `index.html`.
- **Without internet access to the tile servers** (offline, strict networks, the claude.ai preview): the site tests one tile first and, if it cannot load, never adds the online layer (failed tiles used to cover the map). It then shows the bundled Blue Marble image at province scale, fading into a crisp map with city areas and main roads (Natural Earth) when zoomed in, with zoom capped at 10. With internet, satellite/terrain tiles are used up to zoom 14.
- **Satellite/terrain tiles** load from EOX and OpenTopoMap and need internet; I could not load them from the build environment, so only their request URLs were checked. Offline (and in the claude.ai preview, which blocks outside images) the bundled Blue Marble image shows instead; it is sharp at province scale and soft when zoomed in on a city.
- **Basemap**: Natural Earth 1:10m. At this scale Tarout Island is not drawn (its marker sits correctly
  in the sea) and the Ras Tanura peninsula tip is generalised by about 1 km.
- **Coordinates** come from Wikipedia / Wikidata / an IRCICA heritage record (see `/#/sources`),
  flagged "prototype source". **Thaj (LOC-009)**: Wikipedia and Wikidata disagree by about 5 km;
  it is flagged "needs review" on its card.
- Al-Ahsa's governorate marker sits at Al-Hofuf (its main city); this is stated on the card.
- Governorate boundaries inside the province are not drawn (no verified dataset supplied).
- Royal visit cards are samples, not real visits.
- No images: every image slot is a labelled placeholder until approved assets arrive.
- Logos: two placeholder slots in the footer (`siteConfig.logos`).
- Empty dates (not yet confirmed) are simply hidden on screen.

---

## 10. Deployment recommendation

**Recommended: Netlify, Vercel or Cloudflare Pages (free tiers), or GitHub Pages.**

1. Push this folder to a GitHub repository (private is fine for Netlify / Vercel / Cloudflare).
2. Connect the repo; build command `npm run build`, output directory `dist`.
3. You get an HTTPS URL; generate the QR code from it (optionally deep-link, e.g. `…/#/explore`).
4. Or drag the `dist/` folder onto Netlify Drop (<https://app.netlify.com/drop>) for a URL in a minute.

Because routing uses hashes, no redirect rules are needed. Keep `dist-single/index.html` on the
booth laptop as a fallback if the venue network fails.

**Map:** no API keys needed. Satellite tiles (EOX Sentinel-2 cloudless 2016, CC BY 4.0) and
terrain tiles (OpenTopoMap, CC BY-SA) are free with the attribution already shown on the map.
Event-scale traffic is fine; for a permanent high-traffic site, check each provider's usage terms
or switch the URLs in `siteConfig.map`. The bundled layers keep the map working offline.

---

## 11. Design notes for the fair

Visitors give the screen a few seconds, so every page shows one title, one row of choices and one
content area:

- Home: no header bar; title, tagline, one "Start Exploring" button, the satellite map, five section tiles. Language and theme buttons sit in the top corner. The header slides in on every other page.
- No intro paragraphs, legends, counters, IDs or coordinates on screen.
- Filters are single-choice chips (one tap, one result).
- "See also" shows at most four links, one per content type first.
- Motion: pages fade up on entry, the home screen assembles in a short stagger, place cards slide in, detail panels cross-fade, and the Start button pulses gently. All motion is off for visitors with reduced-motion enabled.
- Wording is formal Modern Standard Arabic throughout.
