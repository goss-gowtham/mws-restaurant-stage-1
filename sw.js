let cacheName = "simply"
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
    caches.match(event.request).then(function(response){
      if(response !== undefined){
        return response;
      }
      else{
        return fetch(event.request)
          .then(function(response){
            const clonedResponse = response.clone();
            caches.open(cacheName).then(function(cache){
              cache.put(event.request,clonedResponse);
            })
            return response;
          })
          .catch(error => {
            console.log(error);
          });
      }
    })

  )
});
