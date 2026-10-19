// ─────────────────────────────────────────────────────────────────────────────
// White Glove System — Service Worker
// ─────────────────────────────────────────────────────────────────────────────

const CACHE_VERSION = "white-glove-v1";
const CACHE_NAME = `white-glove-cache-${CACHE_VERSION}`;
const PRECACHE_URLS = [
  "./",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];
const CDN_HOSTS = ["unpkg.com", "cdn.jsdelivr.net"];

// ── Install ──────────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch((err) =>
        console.warn("[SW] Pre-cache failed:", err)
      )
    )
  );
});

// ── Activate ─────────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith("white-glove-cache-") && k !== CACHE_NAME)
            .map((k) => {
              console.log("[SW] Clearing old cache:", k);
              return caches.delete(k);
            })
        )
      )
    ])
  );
});

// ── Fetch ────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (url.hostname.includes("supabase.co")) return;
  if (url.hostname.includes("onesignal.com")) return;
  if (request.method !== "GET") return;

  if (CDN_HOSTS.some((h) => url.hostname.includes(h))) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;

      const res = await fetch(request);
      if (!res || !res.ok) return res;

      const resForCache = res.clone();
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, resForCache);

      return res;
    })());
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      try {
        const res = await fetch(request);

        if (res && res.ok) {
          const resForCache = res.clone();
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, resForCache);
        }

        return res;
      } catch (err) {
        const cached = await caches.match(request);
        if (cached) return cached;

        if (request.mode === "navigate") {
          const fallback = await caches.match("./index.html");
          if (fallback) return fallback;
        }

        throw err;
      }
    })());
    return;
  }
});

// ── Message ──────────────────────────────────────────────────────────────────
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING" || event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
