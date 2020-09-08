  
  'use strict';

  // cache name; to be updated any time files change
  const CACHE_NAME = 'static-cache-v1';
  
  // list of files to cache 
  const FILES_TO_CACHE = [
      './offline.html',
  ];
  
  // install event; opens the cache with caches.open() and provides a cache name 
  // with cache.addAll(),response is added to the cache after taking a list of URLs 
  self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // Precache the offline page here
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
          console.log('[ServiceWorker] Pre-caching offline page');
          return cache.addAll(FILES_TO_CACHE);
        })
    );
  
    self.skipWaiting();
  });
  
  // activate event 
  self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    // cleans up old data from cache 
    evt.waitUntil(
        caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
    );
  
    self.clients.claim();
  });
  
  // fetch event
  self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
      }
      evt.respondWith(
          fetch(evt.request)
              .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                      return cache.match('offline.html');
                    });
              })
      );
  
  });
  