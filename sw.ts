/// <reference lib="WebWorker" />
export type { };
declare const self: ServiceWorkerGlobalScope;

const cacheName = "::сats-gallery";
const version = "v0.0.7";

// Установка
self.addEventListener("install", function (event) {
  console.log('installed');
  event.waitUntil(
    caches.open(version + cacheName).then(function (cache) {
      return cache.addAll(["/index.html", "/offline.html"]);
    })
  );
});

// Активация - удаление ненужного кеша
self.addEventListener('activate', (event) => {
  console.log('activated');
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key.indexOf(version) !== 0)
            .map((key) => caches.delete(key))
        );
      })
  );
});

// Обработка запросов
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Возвращаем кэшированный ответ, если он есть
      if (response) {
        return response;
      }

      // В противном случае выполняем запрос к сети
      return fetch(event.request)
        .then(function (response) {
          // Ответ от сети закешируем для будущего использования
          let responseClone = response.clone();
          caches.open(version + cacheName).then(function (cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(function () {
          // В случае ошибки сети (fetch), показываем страницу offline.html
          return caches.match('/offline.html');
        });
    })
  );
});
