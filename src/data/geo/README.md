# basemap.json

Bundled basemap drawn by the interactive map (no tiles, no API).

- Source: Natural Earth 1:10m, `ne_10m_admin_1_states_provinces` (Saudi regions,
  including the Eastern Province, ISO SA-04) and `ne_10m_admin_0_countries`
  (the Gulf states and surrounding countries).
  https://github.com/nvkelso/natural-earth-vector — public domain.
- Processing: clipped to lon 32–68 / lat 8–38 and simplified 70% with mapshaper.
- Properties: `role` (province | region | country), `ar`, `en`, `iso`.
- Limitation: at this scale small islands such as Tarout are not drawn, and the
  Ras Tanura peninsula tip is generalised by about 1 km. Markers use their own
  sourced coordinates and are unaffected.
- To replace with an official boundary file, keep the same `role` property.

# bluemarble-arabian-gulf.jpg (src/assets/map)

NASA Blue Marble: Next Generation (public domain), cropped to lon 32–68 / lat 8–38,
reprojected to Web Mercator and softened. Used as the always-available satellite
background; online Sentinel-2 tiles draw on top when the device has internet.

# detail.json

Natural Earth 1:10m `ne_10m_urban_areas` and `ne_10m_roads`, clipped to
lon 45–52 / lat 23–29 (public domain). Drawn from zoom 7 so city-scale views
stay crisp and readable without online imagery. Properties: `role`
(urban | road), `major` (true for major highways).
