# اكتشف الشرقية | Discover the Eastern Province

A bilingual (Arabic-first) interactive website made for the Eastern Province booth of the
**SPE KFUPM Student Chapter** at the university's Saudi National Day celebration (30 September 2026).

> A project by the SPE Student Chapter at King Fahd University of Petroleum & Minerals. It is not an
> official publication of SPE International or of any government body.

---

## 1. Quick start

Requirements: **Node.js 18+** and npm.

```bash
npm install
npm run dev            # local dev server → http://localhost:5173
npm run build          # production build  → dist/
npm run preview        # serve dist/ locally → http://localhost:4173
npm run build:single   # one self-contained file → dist-single/index.html
npm run typecheck      # TypeScript check
npm run check:content  # checks IDs, links, sources and images in src/data
npm run images         # optimise new photos + make blurred previews (also runs before dev and every build)
```

`dist/` is a plain static site you can upload to any static host.
`dist-single/index.html` puts all code, styles, fonts, images and the map into one file that opens
straight from a USB stick with no internet. Keep a copy on the booth laptop as a backup.

---

## 2. What's on the site

| Tab | Route | What it shows |
|---|---|---|
| Home | `/#/` | Title, a live map and a card for each section |
| الخريطة · Map | `/#/explore?loc=LOC-001` | Interactive map with a card for each place |
| عبر الزمن · Timeline | `/#/timeline?event=HIS-001` | Seven entries, from Tarout (5000+ BCE) to Al-Ahsa Oasis joining the World Heritage List (2018) |
| التوحيد · Unification | `/#/unification?stage=UNI-02` | Four stages, from 1891 to the founding of the Kingdom in 1932 |
| الملوك · Kings | `/#/kings?king=KING-05` | Seven reigns, from King Abdulaziz to King Salman, each with a portrait, a summary and its key milestones in the province |
| Sources | `/#/sources` | Every source, photo credit and map credit (linked from the footer) |

**"View on map" buttons.** On the Timeline, Unification and Kings pages, each entry links to its
places on the map. The map then opens in a focused view: the header, filters and footer are hidden,
and a gold banner at the top takes the visitor back to the exact entry they came from.

---

## 3. Technology

| Choice | Why |
|---|---|
| **React 18 + TypeScript + Vite** | Fast builds, and the typed content model catches broken data early. |
| **React Router (HashRouter)** | Links like `/#/explore?loc=LOC-001` work on any static host with no server setup, and every view can be linked to (for example from a QR code). |
| **Leaflet + markercluster** | Mature, small and needs no API key. Clustering keeps the crowded Dammam–Dhahran–Khobar area easy to tap. |
| **Map and Terrain views** | The Map view is drawn from bundled Natural Earth data, so it works offline. The Terrain view adds OpenTopoMap tiles (CC BY-SA) when there is internet. Settings are in `src/config/site.ts`. |
| **Fonts** | Body text uses the Ministry of Culture's **Saudi** typeface (files in `public/fonts/`). Headings use **Al-Awwal** when its file is added to `public/fonts/`; until then they fall back to Saudi, then IBM Plex Sans Arabic / Reem Kufi. |
| **No backend** | All content lives in data files. Nothing is collected from visitors. |

---

## 4. Project structure

```
src/
├── config/
│   ├── site.ts            ← launch switches: visible statuses, badges, map views, booth timings
│   └── sections.ts        ← the tabs (order, icons, labels)
├── types/content.ts       ← the content model (start here)
├── assets/photos/         ← every photo, as WebP: timeline/, unification/, kings/, map/
├── assets/brand/          ← the SPE KFUPM logo shown in the footer
├── data/                  ← all content, kept apart from components
│   ├── locations/         LOC-xxx  places, with a sourced position for each marker;
│   │                      images.json holds each place's photo and its credit
│   ├── historical-events/ events.json  HIS-xxx timeline entries + their sources and images
│   ├── unification/       stages.json  UNI-xx stages + their sources and images
│   ├── kings/             reigns.json  KING-xx reigns + their sources and images
│   ├── sources/           SRC-xxx  the source registry (built-in sources + those from the JSON files)
│   ├── media/             IMG-xxx  the image registry (built-in + JSON files); photos.json and assets.ts
│   │                      map each photo to its optimised file and blurred preview
│   ├── geo/               Natural Earth basemap + README with map data credits
│   ├── taxonomy.ts        bilingual labels (place types, eras, map filters, statuses …)
│   └── index.ts           status filtering, ID lookup, two-way links, routes
├── i18n/
│   ├── strings.ts         every interface string in Arabic and English
│   └── LanguageContext.tsx  language state and RTL/LTR switching
├── state/                 map memory (ExploreState), booth mode flag
├── components/
│   ├── Navigation/        header, language/theme buttons, footer, emblem
│   ├── InteractiveMap/    MapView, LocationCard, LocationList, markers
│   ├── Journey/           the row of stops + detail card shared by the Timeline and Kings pages
│   ├── HistoricalTimeline/
│   ├── ContentCards/      shared: MediaFrame (photo with caption and source, or a placeholder),
│   │                      MapLinks ("View on map"), SourceList, Text, Icon, Chip, PageHeader, StatusBadge
│   └── Booth/IdleReset.tsx
├── pages/                 one file per route
└── styles/global.css      design tokens (light and dark) and all styles
public/sw.js               service worker that caches photos in the browser
scripts/check-content.ts   content checker
scripts/optimize-images.mjs  photo pipeline (resize, WebP, blurred previews)
```

---

## 5. Editing content

### Content status

Every item has a `status`:

| Status | Meaning |
|---|---|
| `demo` | Sample structure (none is left on the site). |
| `draft` | Real, sourced content. All of the current content is `draft`. |
| `approved` | Content signed off by a reviewer. |

`visibleStatuses` in `src/config/site.ts` controls what is shown. It currently shows all three, which
is what the published site needs. **Don't switch it to `['approved']`** unless you have marked items
`approved` first: every section would otherwise go empty. Status labels are never shown to visitors
(`showStatusBadges: false`); turn them on only for an internal review session.

### Where things live

| Content | File |
|---|---|
| Timeline entries | `src/data/historical-events/events.json` |
| Unification stages | `src/data/unification/stages.json` |
| Kings and their milestones | `src/data/kings/reigns.json` |
| Places | `src/data/locations/index.ts` (photos in `images.json`) |
| Other sources (map positions, basemap) | `src/data/sources/index.ts` |
| Interface wording | `src/i18n/strings.ts` |

Each JSON file holds three lists: the entries, the `sources` they cite, and the `images` they show.
The site merges those sources and images into the shared registries automatically, so the Sources
page and every card stay in sync.

### Text

Every text field is `{ "ar": "…", "en": "…" }`. An empty string shows nothing at all, so never leave
one language empty by accident. A source's `title` and `publisher` can be
either one string (when the source only has one language) or an `{ ar, en }` pair.

### Images

1. Put the photo (JPG, PNG, WebP…, any size) in the right `src/assets/photos/…` folder.
2. Run `npm run images`. It converts the photo to WebP (max 1200 px) **in place, replacing the
   file you added**, and records a tiny blurred preview. Keep your own copy of the original if you
   need it. This also runs automatically before `npm run dev` and every build.
3. Add an entry to that section's JSON `images` list: `id`, `file` (the `.webp` path inside
   `src/assets/photos/`, e.g. `kings/king1.webp`), `alt` (ar/en), optional `caption` (ar/en), `sourceUrl` (link to the
   original), `credit` (ar/en: how the source is named on screen, e.g. "UNESCO World Heritage
   Centre" or "Photo by …, via … on Instagram"), plus `accuracyReview` and `rightsReview`.
   Without a `credit`, the site falls back to `attribution`, then to the website's name.
4. Add the image ID to the entry's `imageIds`.

An image appears only when both reviews are `"approved"`; until then a plain decorative panel in
the site's own pattern shows (never an invented photograph).
Its caption and source are shown under the image and on the Sources page.

**How photos load quickly.** The 29 photos total about 2.2 MB (the originals were about 11 MB).
While a photo loads, its blurred preview fills the same space, then the photo fades in. After the
first page settles, the site downloads the remaining photos in the background, and a service worker
(`public/sw.js`) keeps them in the browser, so they appear instantly on later visits. On Netlify,
Cloudflare Pages and Vercel, `public/_headers` and `vercel.json` also tell browsers to keep built
files for a year (their names change whenever their content does).

### Adding a place

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

Use `coordinates: null` to list a place without a marker until its position is verified. Any entry
can then link to it with `locationIds: ['LOC-012']` to get a "View on map" button.

### How items connect

Items point at each other with `locationIds`, `eventIds` and `relatedIds`. `src/data/index.ts`
follows links in both directions and `routeFor(id)` turns any ID into its page, so "View on map"
buttons are generated, not hand-written. A place linked from a unification stage or a king's reign
automatically gets the map filter **Saudi History & the Kings**.

---

## 6. Booth mode (shared touchscreen)

- Off by default; phones never turn it on by themselves.
- On the booth screen, open the site once as `https://YOUR-SITE/?booth=1#/`. The device remembers
  it (nothing visible changes except slightly larger text and buttons). `?booth=0` turns it off.
- After **120 s** with no touch, key or scroll, a dialog counts down **15 s** with a large
  "Keep exploring" button. At zero the site returns to the home page in Arabic with the map reset.
- Timings are in `siteConfig.booth` (`src/config/site.ts`).
- Suggested kiosk launch: Chrome with `--kiosk "https://YOUR-SITE/?booth=1#/"`.

---

## 7. Accessibility and languages

- Arabic by default. The language button switches instantly and is remembered on the device.
- Light and dark themes follow the device on the first visit; the sun/moon button saves a choice.
- `<html lang dir>` updates with the language, layouts use CSS logical properties, and arrows
  mirror in right-to-left mode.
- Touch targets are at least 44 px (56 px in booth mode, which also enlarges the text).
- Every place can also be reached from the text list next to the map, and markers are keyboard
  focusable. Arrow keys move along the Timeline and Kings rows.
- Visible focus rings, a skip link, and all animation turned off for visitors who prefer reduced
  motion.

---

## 8. Known limitations

- **Photo rights.** The 29 photos (Timeline, Unification, Kings and the 11 map places) come from the
  sources credited under each one and are marked approved so they display. Confirm the usage
  rights before the public launch.
- **Map positions.** Marker positions come from Wikipedia, Wikidata and an IRCICA heritage record
  (listed on the Sources page). Official sources would be stronger.
- **Thaj (LOC-009):** Wikipedia and Wikidata place it about 5 km apart, so its marker may be off by a
  few kilometres. This is not shown on screen.
- **Terrain tiles** need internet. Offline, the bundled Map view is always available.
- **Basemap** is Natural Earth 1:10m: Tarout Island is too small to be drawn (its marker sits
  correctly in the sea) and governorate boundaries are not shown.
- **Al-Awwal** heading font file is not included yet (see Technology).
- **Not tested** on physical touchscreens, iOS Safari, Android or with screen readers. Please try
  the booth screen and a few phones before the event.

---

## 9. Deployment

**Quickest (no account setup beyond a free login): Netlify Drop.**

1. Run `npm run build` (or use the ready-made `dist/` folder).
2. Open <https://app.netlify.com/drop> and drag the `dist/` folder onto the page.
3. You get an address like `https://random-name.netlify.app`. Rename it under
   *Site configuration → Change site name* (e.g. `discover-eastern-province.netlify.app`).

**Recommended for later updates: connect a Git repository** (Netlify, Vercel or Cloudflare Pages):
build command `npm run build`, output directory `dist`. Every push then republishes the site.

**Link previews (WhatsApp, X, LinkedIn …).** The preview card is `public/og-image.jpg`. Social
networks need its full address, which the build fills in automatically on Netlify, Vercel and
Cloudflare Pages when they build the site. If you upload a pre-built `dist/` folder (Netlify Drop)
or use another host, build with your final address first:

```bash
SITE_URL=https://your-site.netlify.app npm run build
```

Routing uses `#` links, so no redirect rules are needed, and deep links work (e.g. `…/#/kings`).
The map needs no API keys. The icon set (`favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`) is
in `public/`.

---

## 10. Design notes for the booth

Visitors give the screen a few seconds, so each page has one title, one row of choices and one
content area:

- The home page has no header bar: just the title, a tagline, a "Start exploring" button, the map
  (opening on the area where the places are) and a card per section. The header appears on every
  other page.
- The footer credits the SPE KFUPM Student Chapter with its logo (`src/assets/brand/`), kept small
  so "اكتشف الشرقية" stays the main identity. The logo sits on a white tile so it reads in dark mode.
- Dark mode uses a deeper green (`--c-fill`) for solid buttons and selected items, so they don't
  glare; text and outlines keep the brighter green.
- Map filters are single-choice chips: one tap, one result.
- Pages fade in, cards slide in, and detail panels cross-fade. All of it switches off for visitors
  who prefer reduced motion.
- Arabic text is written in clear Modern Standard Arabic.
