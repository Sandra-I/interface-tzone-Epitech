//Use to tell to get chrome if it 
/// <reference types="chrome"/>

// This file is injected as a content script
console.log("Hello from content script!")
import Selector from "./components/selector"
import { DataMessage } from "./models/DataMessage";
import { Selection } from "./models/Selection";
import Swal from "sweetalert2"
import Popup from "./components/popup";
import "./App.scss"
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
        }else if(dataMsg.msg === "show-preview"){
            showPreview(dataMsg.data)
        }else if(dataMsg.msg === "api-success"){
            removeLoadingAnimation();
        }
    }

});

function addLoadingAnimation(){
    const existingLoader = document.getElementById("TZone-loader")
    if(!existingLoader){
        let loaderContainer = document.createElement("div")
        loaderContainer.id = "TZone-loader";
        loaderContainer.style.position = "fixed";
        loaderContainer.style.top = "0";
        loaderContainer.style.right = "0";
        loaderContainer.style.zIndex = "99999";
        loaderContainer.style.backgroundColor = "#404040";
        loaderContainer.style.color = "white";
        loaderContainer.style.borderRadius = "20px";
        loaderContainer.style.fontWeight = "700";
        loaderContainer.style.margin = "5px";
        loaderContainer.style.padding = "10px";
        loaderContainer.style.textAlign = "center";
        loaderContainer.style.fontSize = "14px";
        loaderContainer.style.fontFamily = "arial";

        let loadingAnimation = document.createElement("img")
        loadingAnimation.setAttribute("src", chrome.runtime.getURL("tzone-loader.svg") );
        loadingAnimation.style.width = "60px"
        loadingAnimation.style.height = "60px"
        loadingAnimation.style.display = "block"
        loaderContainer.appendChild(loadingAnimation)
        
        let textLoading = document.createElement("div")
        textLoading.innerText = "Loading"
        loaderContainer.appendChild(textLoading)

        let textImage = document.createElement("div")
        textImage.innerText = "image"
        loaderContainer.appendChild(textImage)

        document.body.appendChild(loaderContainer);
    }
}

function removeLoadingAnimation(){
    const existingLoader = document.getElementById("TZone-loader")
    if(existingLoader) existingLoader.remove();
}

function showPreview(data: any){
    const htlm = 
    `<div style="width: 320px;margin: 5px;">`+
        `<h2 class="tz-title">Résultat</h2><br>`+
        `<b>Text original :</b><br>`+
        `<textarea style="resize: none;overflow: auto;width: 320px;" cols="40" rows="5" class="tz-result-text" readonly>`+
            `${data.text}`+
        `</textarea>`+
    `</div>`;
    const existingElement = document.getElementById("tzon-preview");
    if(existingElement) existingElement.remove();
    const popup = new Popup("tzon-preview",htlm, { timeout: 2, fadeTime: 3} )
    popup.show();
}
