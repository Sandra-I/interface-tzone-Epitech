// This file is injected as a content script
console.log("Hello from content script!")
import Selector from "./components/selector"
const selector = new Selector();

chrome.runtime.onMessage.addListener( async(dataMsg: {msg: string, tabId: number}, sender, sendResponce) => {

    console.log("message",dataMsg,"sender",sender)
    
    if(dataMsg.msg == "screenshot-selection"){
        console.log("select area")
        const selection = selector.select().subscribe( (rec)=>{
            console.log("new selection:", rec)
            selection.unsubscribe();
            sendResponce(rec);
        });
        

    }else if(dataMsg.msg == "screenshot-selection-with-options"){
        console.log("take screenshot with options")

    }
});

function dlUrl(url: string, filename: string){
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}