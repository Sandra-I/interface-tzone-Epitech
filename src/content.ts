// This file is injected as a content script
console.log("Hello from content script!")
import Selector from "./components/selector"
import { DataMessage } from "./models/DataMessage";
const selector = new Selector();

chrome.runtime.onMessage.addListener( async(dataMsg: DataMessage<null>, sender, sendResponce) => {
    
    if(dataMsg.msg == "screenshot-selection"){
        const selection = selector.select().subscribe( (rec)=>{
            
            selection.unsubscribe();
            setTimeout( ()=> chrome.runtime.sendMessage( {msg: "screenshot-selection-result", data: rec, tabId: dataMsg.tabId}), 10);
        });
        
    }else if(dataMsg.msg == "screenshot-selection-with-options"){
        //TODO
        console.log("take screenshot with options")

    }

});
