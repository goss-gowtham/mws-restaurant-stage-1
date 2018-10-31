let cacheName = "v1"
let cacheFiles = [
  'index.html',
  'restaurant.html',
  '/css/main.css',
  '/css/responsive.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/img/*', //selecting all images with *
  '/js/register.js'
];
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
    return cache.addAll(cacheFiles)
    .catch(error => {   //as per ES6 Arrow Function!
      console.log(error);
    });
  }));
});
self.addEventListener("fetch", function(event){
  event.respondWith(
    caches.match(event.request)
    .then(function(response){
      caches.open(cacheName)
      .then(function (cache) {
          cache.put(event.request, response);
      })
        return response;
    });
  );
});
