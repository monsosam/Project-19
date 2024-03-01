const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precaching important files during service worker installation
precacheAndRoute(self.__WB_MANIFEST);

// Caching strategy for pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({ statuses: [0, 200] }),
    new ExpirationPlugin({ maxAgeSeconds: 30 * 24 * 60 * 60 }),
  ],
});

// Cache strategy for navigation requests
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Cache strategy for assets (styles, scripts, workers)
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
);
