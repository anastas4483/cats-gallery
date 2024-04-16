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
      return cache.addAll(["/index.html", "/offline.html", '/index.tsx']);
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
  console.log('in fetch event');
  event.respondWith(
    // Делаем запрос на бек
    fetch(event.request)
      // Если успешно выполнился, сохраняем данные и возвращаем результат
      .then((fetchedResponse) => {
        const responcseCopy = fetchedResponse.clone();
        caches.open(version + cacheName).then(cache => cache.put(event.request, responcseCopy));
        return fetchedResponse;
      })

      // Если интернета нет, идем в кеш и берем оттуда даные
      .catch((err) =>
        caches.match(event.request).then((foundCaches) => {
          if (foundCaches) {
            return foundCaches;
          }

          // Если в кеше нет данных такого запроса, возвращаем заглушку
          return caches.match('/offline.html');
        })
      )
  );
});
