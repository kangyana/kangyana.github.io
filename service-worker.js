const cacheName = "pwa-v1";

const contentToCache = [
  "index.html",
  "app.js",
  "assets/favicon.ico",
  "assets/guoba.jpeg",
];

// 初始化
self.addEventListener("install", (e) => {
  console.log("SW 初始化");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("SW 缓存");
      return cache.addAll(contentToCache);
    })
  );
});

// 拦截请求 加载与缓存
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log(`SW 加载资源: ${e.request.url}`);
      return (
        r ||
        fetch(e.request).then((response) => {
          return caches.open(cacheName).then((cache) => {
            console.log(`SW 缓存新资源: ${e.request.url}`);
            if (e.request.url.startsWith("http")) {
              cache.put(e.request, response.clone());
            }
            return response;
          });
        })
      );
    })
  );
});

// 激活 删除旧缓存
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (cacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
