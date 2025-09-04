self.addEventListener("install", e => {
  self.skipWaiting(); // Force update
  e.waitUntil(
    caches.open("skill-tracker").then(cache =>
      cache.addAll(["/","/index.html","/style.css","/script.js","/manifest.json"])
    )
  );
});

self.addEventListener("activate", e => self.clients.claim());

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(resp => resp || fetch(e.request)));
});
