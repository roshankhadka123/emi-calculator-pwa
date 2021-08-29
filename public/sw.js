console.log("service worker from sw.js")
let cacheData="appV1";
this.addEventListener("install",(event)=>{
    event.waitUntil(
     caches.open(cacheData).then((cache)=>{
         cache.addAll([
             "/static/js/bundle.js",
             "/static/js/vendors~main.chunk.js",
             "/static/js/main.chunk.js",
             "/static/js/0.chunk.js",
             "/static/media/logo.0ed4a2ac.png",
             "/static/media/Gilroy-Regular.5b89a8df.ttf",
             "/index.html",
             "/logo.png",
             "/"




         ])
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

this.addEventListener("fetch",(event)=>{
    if(!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((result) => {
                if (result) {
                    return result
                }
                let requestUrl=event.request.clone();
                fetch(requestUrl)
            })
        )
    }
})


// Update a service worker
this.addEventListener('activate', event => {
    var cacheWhitelist = ['appV1'];
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