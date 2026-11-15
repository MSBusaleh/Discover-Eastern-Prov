import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath, URL } from 'node:url';

/**
 * The public address of the site, used for link previews (social networks
 * need a full URL for the preview image). Set SITE_URL yourself, or let the
 * host provide it: Netlify (URL), Cloudflare Pages (CF_PAGES_URL) and Vercel
 * (VERCEL_PROJECT_PRODUCTION_URL) all do so automatically.
 */
function siteUrl(): string {
  const env = process.env;
  const url = env.SITE_URL || env.URL || env.CF_PAGES_URL
    || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
  return url ? url.replace(/\/?$/, '/') : '';
}

/** Fills %SITE_URL% in index.html; without a known address the links stay relative. */
const siteUrlPlugin = (): Plugin => ({
  name: 'site-url',
  transformIndexHtml: (html) => html.replace(/%SITE_URL%/g, siteUrl()),
});

// `npm run build`         -> dist/ (normal static site: index.html + hashed assets)
// `npm run build:single`  -> dist-single/index.html (everything inlined; works offline
//                            from a USB stick at the booth, except the map tiles)
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), siteUrlPlugin(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: {
    outDir: mode === 'single' ? 'dist-single' : 'dist',
    assetsInlineLimit: mode === 'single' ? 100_000_000 : 4096,
  },
}));
