// Network first, cache fallback: always fresh when online, still opens offline.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone(); caches.open('logbook').then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request, {ignoreSearch: true})));
});
