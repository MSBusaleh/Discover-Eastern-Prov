/*
 * Photo cache. Built files in assets/ have a content hash in their name, so a
 * given URL never changes: serve photos from the cache when we have them, and
 * download and keep them when we don't. Everything else goes to the network.
 */
const CACHE = 'photos-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  const isPhoto = request.method === 'GET' && url.origin === self.location.origin
    && url.pathname.includes('/assets/') && /\.(webp|jpe?g|png|avif)$/i.test(url.pathname);
  if (!isPhoto) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(request);
    if (hit) return hit;
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  })());
});
