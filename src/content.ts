//Use to tell to get chrome if it 
/// <reference types="chrome"/>

// This file is injected as a content script
console.log("Hello from content script!")
import Selector from "./components/selector"
import { DataMessage } from "./models/DataMessage";
import { Selection } from "./models/Selection";
const selector = new Selector();

let isCurrentlySelection = false;

chrome.runtime.onMessage.addListener( async(dataMsg: DataMessage<null>, sender, sendResponce) => {
    console.log("dataMsg",dataMsg)
    if(isCurrentlySelection){
        console.error("Already selecting an area !")
    }else{
        if(dataMsg.msg == "screenshot-selection"){
            isCurrentlySelection = true;
            const selection = selector.select().subscribe( (rec: Selection)=>{
                isCurrentlySelection = false
                selection.unsubscribe();
                setTimeout( ()=> chrome.runtime.sendMessage( {msg: "screenshot-selection-result", data: rec, tabId: dataMsg.tabId}), 10);
            });
            
        }else if(dataMsg.msg == "screenshot-selection-with-options"){
            //TODO
            console.log("take screenshot with options")

        }
    }

});

