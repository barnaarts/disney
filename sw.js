// Offline support: page fetched fresh when online, everything else from cache
const V="xmas26-20261127m";
const FILES=["./","index.html","manifest.webmanifest","xmas-icon-180.png","xmas-icon-192.png","xmas-icon-512.png","img/katie.jpg","img/albert.jpg","img/nonna.jpg","img/jason.jpg","img/london.jpg","img/bowie.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
 if(e.request.mode==="navigate"||u.pathname.endsWith(".html")||u.pathname.endsWith("/")){e.respondWith(fetch(e.request,{cache:"no-cache"}).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))));return}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
