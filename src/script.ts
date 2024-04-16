export default class Main {
  constructor() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('sw.ts')
        .then((res) => {
          console.log('ServiceWorker Registered', res);
        });
    }
  }
}

new Main();