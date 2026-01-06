self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("bread-cache").then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./app.js",
        "./style.css"
      ])
    )
  );
});
