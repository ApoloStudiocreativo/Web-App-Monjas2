const CACHE_NAME = 'museum-app-v32';
const ASSETS_TO_CACHE_IMMEDIATELY = [
    './',
    './index.html',
    './js/app.js',
    './js/desktop-view.js',
    './manifest.json',
    './Logotipo/Logotipo3.png',
    './Logotipo/isotipo.png',
    './Imagen portada/imagen-portada.jpg'
];

// Install Event: Cache core assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installed');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching core assets');
            return cache.addAll(ASSETS_TO_CACHE_IMMEDIATELY);
        })
    );
    self.skipWaiting();
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activated');
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

// Fetch Event: Stale-While-Revalidate for HTML, Cache-First for others
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests (like Google Fonts/Analytics for now, or handle them separately)
    // and skip non-GET requests
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    // Strategy 1: HTML files -> Network First (to get updates), fall back to Cache
    // For SPA routing: all navigation requests should serve index.html
    if (event.request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    const clonedResponse = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, clonedResponse);
                    });
                    return response;
                })
                .catch(() => {
                    // If network fails, serve cached index.html for all routes
                    return caches.match('./index.html');
                })
        );
        return;
    }

    // Strategy 2: Assets (Models, Images, Audio, JS, CSS) -> Cache First, fall back to Network
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Return cached response
                return cachedResponse;
            }

            // Not in cache, fetch from network
            return fetch(event.request).then((networkResponse) => {
                // Check if we received a valid response
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                // Cache the new resource (dynamic caching)
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch((err) => {
                console.log('[Service Worker] Fetch failed:', err);
                // Optionally return a fallback image/placeholder here
            });
        })
    );
});
