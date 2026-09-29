# اكتشف الشرقية | Discover the Eastern Province

A bilingual (Arabic-first) interactive website made for the Eastern Province booth of the
**SPE KFUPM Student Chapter** at the university's Saudi National Day celebration (30 September 2026).

> This is a prototype and not an official or endorsed SPE platform. Most content is marked
> **draft** until the content team reviews it (see [Content status](#content-status)).

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

The People and Today & Tomorrow sections were removed from the site. Their data files are still in
`src/data/personalities/` and `src/data/contemporary-topics/` in case they return, but nothing
displays or links to them.

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
├── assets/                ← images bundled into the build
│   ├── timeline/          timeline1–7
│   ├── unification/       unification1–4
│   └── kings/             king1–7
├── data/                  ← all content, kept apart from components
│   ├── locations/         LOC-xxx  places, with a sourced position for each marker
│   ├── historical-events/ events.json  HIS-xxx timeline entries + their sources and images
│   ├── unification/       stages.json  UNI-xx stages + their sources and images
│   ├── kings/             reigns.json  KING-xx reigns + their sources and images
│   ├── sources/           SRC-xxx  the source registry (built-in sources + those from the JSON files)
│   ├── media/             IMG-xxx  the image registry (built-in + JSON files); assets.ts finds bundled files
│   ├── geo/               Natural Earth basemap + README with map data credits
│   ├── personalities/     not published
│   ├── contemporary-topics/ not published
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
scripts/check-content.ts   content checker
```

---

## 5. Editing content

### Content status

Every item has a `status`:

| Status | Meaning |
|---|---|
| `demo` | Sample structure, not real content. Empty text shows "This content is on its way". |
| `draft` | Real content that still needs a final review. The Timeline, Unification and Kings entries are drafts. |
| `approved` | Final, reviewed content. |

Before the public launch, set this in `src/config/site.ts` so only approved items appear:

```ts
visibleStatuses: ['approved'],
```

Demo and draft items then disappear from every page, filter and link. For review sessions, set
`showStatusBadges: true` to label drafts on screen. `npm run check:content` counts the items in each
status.

### Where things live

| Content | File |
|---|---|
| Timeline entries | `src/data/historical-events/events.json` |
| Unification stages | `src/data/unification/stages.json` |
| Kings and their milestones | `src/data/kings/reigns.json` |
| Places | `src/data/locations/index.ts` |
| Other sources (map positions, basemap) | `src/data/sources/index.ts` |
| Interface wording | `src/i18n/strings.ts` |

Each JSON file holds three lists: the entries, the `sources` they cite, and the `images` they show.
The site merges those sources and images into the shared registries automatically, so the Sources
page and every card stay in sync.

### Text

Every text field is `{ "ar": "…", "en": "…" }`. An empty string means "not supplied yet" and shows a
clearly marked placeholder line, never invented filler. A source's `title` and `publisher` can be
either one string (when the source only has one language) or an `{ ar, en }` pair.

### Images

1. Put the file in the right `src/assets/…` folder (JPG/PNG/WebP, ideally under ~500 KB).
2. Add an entry to that section's JSON `images` list: `id`, `file` (path inside `src/assets`, e.g.
   `kings/king1.jpg`), `alt` (ar/en), optional `caption` (ar/en), and either `sourceUrl` (a link;
   the site shows the website name) or `attribution` (plain text), plus `accuracyReview` and
   `rightsReview`.
3. Add the image ID to the entry's `imageIds`.

An image appears only when both reviews are `"approved"`; until then a labelled placeholder shows.
Its caption and source are shown under the image and on the Sources page.

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
  it, and a small "Booth mode on" tag appears in the header. `?booth=0` turns it off.
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

- **Photo rights.** The 18 photos on the Timeline, Unification and Kings pages come from the
  sources credited under each one and are marked approved so they display. Confirm the usage
  rights before the public launch.
- **Temporary sources.** Map marker positions come from Wikipedia, Wikidata and an IRCICA heritage
  record, tagged "Temporary source" on the Sources page. Replace them with official sources.
- **Thaj (LOC-009):** Wikipedia and Wikidata place it about 5 km apart; its card says so.
- **Terrain tiles** need internet. Offline, the bundled Map view is always available.
- **Basemap** is Natural Earth 1:10m: Tarout Island is too small to be drawn (its marker sits
  correctly in the sea) and governorate boundaries are not shown.
- **Al-Awwal** heading font file is not included yet (see Technology).
- **Not tested** on physical touchscreens, iOS Safari, Android or with screen readers. Please try
  the booth screen and a few phones before the event.

---

## 9. Deployment

**Recommended: Netlify, Vercel, Cloudflare Pages or GitHub Pages (all have free tiers).**

1. Push this folder to a GitHub repository.
2. Connect the repository with build command `npm run build` and output directory `dist`.
3. Use the HTTPS address you get for the QR code (you can deep-link, e.g. `…/#/kings`).
4. Or drag the `dist/` folder onto Netlify Drop (<https://app.netlify.com/drop>).

Routing uses `#` links, so no redirect rules are needed. The map needs no API keys; the credits
required by the tile provider are already shown on the map.

---

## 10. Design notes for the booth

Visitors give the screen a few seconds, so each page has one title, one row of choices and one
content area:

- The home page has no header bar: just the title, a tagline, a "Start exploring" button, the map
  and a card per section. The header appears on every other page.
- Map filters are single-choice chips: one tap, one result.
- Pages fade in, cards slide in, and detail panels cross-fade. All of it switches off for visitors
  who prefer reduced motion.
- Arabic text is written in clear Modern Standard Arabic.
