/**
 * localStorage can throw (private mode, blocked storage, sandboxed frames).
 * Everything here fails silently: the site works fine without persistence.
 */
export const safeStorage = {
  get(key: string): string | null {
    try { return window.localStorage.getItem(key); } catch { return null; }
  },
  set(key: string, value: string) {
    try { window.localStorage.setItem(key, value); } catch { /* ignore */ }
  },
  remove(key: string) {
    try { window.localStorage.removeItem(key); } catch { /* ignore */ }
  },
};
