const CACHE_NAME = 'life-log-cache-v1';
const CACHE_FILES = [
  './',
  './index.html',
  './manifest.json'
];

// 安裝：預先快取檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_FILES);
    })
  );
});

// 啟用：清掉舊的 cache（如果有）
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      );
    })
  );
});

// 讀取：先看 cache，沒有再走網路
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
