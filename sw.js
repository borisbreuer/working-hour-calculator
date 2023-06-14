const cacheVersion = 'v2-wh-cache'
const BASE_URL = location.protocol + '//' + location.host
const cacheMatcherQuery = 'cache=true'

const resources = [
    '/',
    '/index.html',
    '/js/main.js',
    '/js/registerSW.js',
    '/css/style.css',
]

self.addEventListener('install', (e) => {
    console.log('Installing')
    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheVersion)
            await cache.addAll(resources)
            self.skipWaiting()
        })()
    )
})

self.addEventListener('activate', (e) => {
    console.log('Activating')
    e.waitUntil(
        (async () => {
            console.log('-> Deleting old Cache')
            const cacheArr = await caches.keys()
            const cachesToDelete = cacheArr.filter(cache => cache !== cacheVersion)
            if (cachesToDelete.length > 0) {
                await Promise.all(cachesToDelete.map(cacheToDelete => {
                    return (async () => await caches.delete(cacheToDelete))()
                }))
            }
            console.log('-> Claiming ', cacheVersion)
            await self.clients.claim()
            self.skipWaiting()
        })()
    )
})

const isIndexOrRoot = (request) => {
    let reqUrl = request.url
    const splitQuery = reqUrl.split('?')
    if(splitQuery) reqUrl = splitQuery[0]
    reqUrl = reqUrl.replace(BASE_URL, '')
    return (reqUrl === '/' || reqUrl.match('index.html'))
}

const isMeantForCache = (request) => ( !!request.url.match(cacheMatcherQuery) )

const putInCache = async (request, response) => {
    if (!isMeantForCache(request) || isIndexOrRoot(request)) {
        console.log('prevet from putting in cache')
        return
    }

    const cache = await caches.open(cacheVersion)
    console.log('Put')
    await cache.put(request, response)
}

const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request)

    if (responseFromCache) {
        console.log('response from Cache')
        return responseFromCache
    }
    const responseFromNetwork = await fetch(request)
    putInCache(request, responseFromNetwork.clone())
    console.log('response from Network')
    return responseFromNetwork
}

self.addEventListener('fetch', (e) => {
    console.log('Fetch')
    e.respondWith(
        cacheFirst(e.request)
    )
})

// self.registration.showNotification("New articles available", {
//     actions: [{ action: "get", title: "Get now." }],
// });

// console.log(self.registration)

// addEventListener("notificationclick", function (event) {
//     console.log(event.notification);
//     event.notification.close();
// })

// addEventListener("notificationclose", function (event) {
//     event.notification.close();
//     console.log('user has clicked notification close');    
// });

// self.addEventListener("notificationclick", (event) => {
//     console.log(`On notification click: ${event.notification.tag}`);
//     event.notification.close();
//     event.waitUntil(
//         clients
//             .matchAll({
//                 type: "window",
//             })
//             .then((clientList) => {
//                 for (const client of clientList) {
//                     if (client.url === "/" && "focus" in client) return client.focus();
//                 }

//                 if (clients.openWindow) return clients.openWindow("/");
//             })
//     );
// });