console.log("service worker from sw.js")
let cacheName="emi-calculatorexp";


var urlCache = [
    "/static/js/bundle.js",
    "/static/js/vendors~main.chunk.js",
    "/static/js/main.chunk.js",
    "/static/js/0.chunk.js",
    "/static/media/logo.0ed4a2ac.png",
    "/static/media/Gilroy-Regular.5b89a8df.ttf",
    "/index.html",
    '/manifest.json',
    "/"

];


/// install service worker
this.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(cacheName)
            .then((cache)=>{
                return cache.addAll(urlCache)
            })
    )
})


// "/users"=if route availabel in install

// if there need to fetch api from like user page u sould do that
// componentDIdmount(){
//     let url="http:// api url"
//     fetch(url).then((response)=>{
//         response.json().then((result)=>{
//             console.log(result)
//             this.setState({
//                 resutl:result
//             })
//             localStorage.setItem("users",JSON.stringify(result))
//         })
//     }).catch((error)=>{
//         alert("Now  You are Offline mode")
//         let collectionData= localStorage.getItem("users")
//         this.setState({
//             result:JSON.parse(collectionData),
//             modeBoolean:offline(true)
//         })
//
//
//     })
// }



this.addEventListener('fetch', event => {
    if(!navigator.onLine) {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                        // Cache hit - return response
                        if (response) {
                            return response;
                        }
                        return fetch(event.request);
                    }
                )
        );
    }
});



// Update a service worker
this.addEventListener('activate', event => {
    let cacheWhitelist = ['emi-calculatorexp'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});