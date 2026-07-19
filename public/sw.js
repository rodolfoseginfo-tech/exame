const CACHE="studysim-app-v8";
const ROOT=new URL("./",self.registration.scope).href;
const CORE=["", "manifest.json", "favicon.svg", "icon.svg", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "modelo-prova.json"].map(path=>new URL(path,ROOT).href);

self.addEventListener("install",event=>event.waitUntil(
  caches.open(CACHE).then(cache=>Promise.all(CORE.map(url=>cache.add(url).catch(()=>null)))).then(()=>self.skipWaiting())
));

self.addEventListener("activate",event=>event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())
));

self.addEventListener("message",event=>{
  if(event.data?.type!=="CACHE_APP")return;
  event.waitUntil(caches.open(CACHE).then(cache=>Promise.all(event.data.urls.map(url=>cache.add(url).catch(()=>null)))).then(()=>event.ports[0]?.postMessage({ok:true})).catch(()=>event.ports[0]?.postMessage({ok:false})));
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET"||new URL(event.request.url).origin!==self.location.origin)return;
  if(event.request.mode==="navigate"){
    event.respondWith(fetch(event.request).then(response=>{if(response.ok)caches.open(CACHE).then(cache=>cache.put(event.request,response.clone()));return response}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match(ROOT))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok)caches.open(CACHE).then(cache=>cache.put(event.request,response.clone()));return response})));
});
