//Use to tell to get chrome if it 
/// <reference types="chrome"/>

// This file is injected as a content script
console.log("Hello from content script!")
import Selector from "./components/selector"
import { DataMessage } from "./models/DataMessage";
import { Selection } from "./models/Selection";
import Swal from "sweetalert2"
const selector = new Selector();

let isCurrentlySelection = false;

chrome.runtime.onMessage.addListener( async(dataMsg: DataMessage<null | Error>, sender, sendResponce) => {
    if(isCurrentlySelection){
        console.error("Already selecting an area !")
    }else{
        if(dataMsg.msg == "screenshot-selection"){
            isCurrentlySelection = true;
            const selection = selector.select().subscribe( (rec: Selection)=>{
                isCurrentlySelection = false
                selection.unsubscribe();
                addLoadingAnimation();
                setTimeout( ()=> chrome.runtime.sendMessage( {msg: "screenshot-selection-result", data: rec, tabId: dataMsg.tabId}), 10);
            });
        }else if(dataMsg.msg == "screenshot-selection-with-options"){
            //TODO
            console.log("take screenshot with options")

        }else if(dataMsg.msg == "api-error"){
            removeLoadingAnimation()
            Swal.fire({"icon": "error", title:"API Error", text: "Impossible de convertire en text la capture : "+dataMsg.data?.message})
        }
    }

});

function addLoadingAnimation(){
    const existingLoader = document.getElementById("TZone-loader")
    if(!existingLoader){
        let loaderContainer = document.createElement("div")
        loaderContainer.id = "TZone-loader";
        loaderContainer.style.position = "absolute";
        loaderContainer.style.top = "0";
        loaderContainer.style.right = "0";
        let loader = document.createElement("img")
        loader.setAttribute("src", chrome.runtime.getURL("tzone-loader.svg") );
        loader.style.width = "100px"
        loader.style.height = "100px"
        loaderContainer.appendChild(loader)

        document.body.appendChild(loaderContainer);
    }
}

function removeLoadingAnimation(){
    const existingLoader = document.getElementById("TZone-loader")
    if(existingLoader) existingLoader.remove();
}
