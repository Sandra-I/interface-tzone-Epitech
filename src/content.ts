//Use to tell to get chrome if it 
/// <reference types="chrome"/>

// This file is injected as a content script
console.log("Hello from content script!")
import Selector from "./components/selector"
import {DataMessage, MessageType} from "./models/DataMessage";
import {Selection} from "./models/Selection";
import Swal from "sweetalert2"
import Popup from "./components/popup";
import "./App.scss"
import {UnknowMessageError} from "./errors/unknowMessageError";
import {APIResponce} from "./models/apiResponce";
import {APIResponceWithTraduction} from "./models/apiResponceWithTraduction";

const selector = new Selector();

let isCurrentlySelection = false;

chrome.runtime.onMessage.addListener(async (dataMsg: DataMessage<any>, sender, sendResponce) => {
    if (isCurrentlySelection) {
        console.error("Already selecting an area !")
    } else {
        switch (dataMsg.msg) {
            case MessageType.SCREENSHOT_SELECTION:
                isCurrentlySelection = true;
                const selection = selector.select().subscribe((rec: Selection) => {
                    isCurrentlySelection = false
                    selection.unsubscribe();
                    addLoadingAnimation();
                    setTimeout(() => chrome.runtime.sendMessage({
                        msg: MessageType.SCREENSHOT_SELECTION_RESULT,
                        data: rec,
                        tabId: dataMsg.tabId
                    }), 10);
                });
                break;
            case MessageType.API_ERROR:
                removeLoadingAnimation();
                removePopup();
                Swal.fire({
                    "icon": "error",
                    title: "API Error",
                    text: "Impossible de convertire en text la capture : " + dataMsg.data?.message
                });
                break;
            case MessageType.SHOW_PREVIEW:
                showPopup(dataMsg.data);
                break;
            case MessageType.SHOW_PREVIEW_WITH_TRANSLATION:
                showPopupWithTranslation(dataMsg.data);
                break;
            case MessageType.API_SUCCESS:
                removeLoadingAnimation();
                break;
            default:
                throw new UnknowMessageError(`Can't find action for unknow MessageType "${dataMsg.msg}"`)

        }
    }

});

function addLoadingAnimation() {
    const existingLoader = document.getElementById("TZone-loader")
    if (!existingLoader) {
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
        loadingAnimation.setAttribute("src", chrome.runtime.getURL("tzone-loader.svg"));
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

function removeLoadingAnimation() {
    const existingLoader = document.getElementById("TZone-loader")
    if (existingLoader) existingLoader.remove();
}

function removePopup() {
    const existingElement = document.getElementById("tzone-preview");
    if (existingElement) existingElement.remove();
}

function showPopup(data: APIResponce) {
    removePopup();
    const htlm =
        `<div style="width: 320px;margin: 5px;">` +
        `<h2 class="tz-title">Texte copié</h2><br>` +
        `<textarea style="resize: none;overflow: auto;width: 320px;background-color: white; color: black;" cols="40" rows="5" class="tz-result-text" readonly>` +
        `${data.text}` +
        `</textarea>` +
        `</div>`;
    const popup = new Popup("tzone-preview", htlm, {timeout: 2, fadeTime: 3});
    popup.show();
}

function showPopupWithTranslation(data: APIResponceWithTraduction) {
    removePopup();
    const htlm =
        `<div style="width: 320px;margin: 5px;">` +
        `<h2 class="tz-title">Résultat</h2><br>` +
        `<b>Texte original (${data.original.lang}):</b><br>` +
        `<p style="overflow: auto;width: 320px;" class="tz-result-text">` +
        `${data.original.text}` +
        `</p><br><br>` +
        `<b>Texte traduit (${data.translated.lang}):</b><br>` +
        `<p style="overflow: auto;width: 320px;" class="tz-result-text">` +
        `${data.translated.text}` +
        `</textarea>` +
        `</div>`;
    const popup = new Popup("tzone-preview", htlm, {buttons: [{actionType: "exit", name: "Ok"}]})
    popup.show();
}
