export default function swDev(){
    navigator.serviceWorker.register("sw.js").then((response)=>{
        console.log("responses",response)
    })
}