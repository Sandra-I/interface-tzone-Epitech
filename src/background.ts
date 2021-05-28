import ImageCropper from "./components/ImageCropper";
import { DataMessage } from "./models/DataMessage";
import { Selection } from "./models/Selection";

console.log("Init TZone")

//Parameters with default config
let options: {
    preview: boolean,
    retrivePolice: boolean,
    retriveFormat: boolean,
    translate: string|null
} = {
    preview: false,
    retrivePolice: false,
    retriveFormat: false,
    translate: null
}

//Load config
const savedConf = localStorage.getItem("options")
if(savedConf) options = JSON.parse(savedConf);

//Listen command keys
chrome.commands.onCommand.addListener( async(command: string, tab: any) => {
    if(command == "take-screenshot"){
        //Call a selection
        chrome.tabs.sendMessage(tab.id, {msg:"screenshot-selection", tabId: tab.id})
        
    }else if(command == "screenshot-selection-with-options"){
        //TODO
        console.log("take screenshot with options")

    }
});

//Responce of selection call
chrome.runtime.onMessage.addListener( (msg: DataMessage<Selection>)=>{
    if(msg.msg == "screenshot-selection-result"){
        
        //when the selection have been done, make a screenshoot
        chrome.tabs.captureVisibleTab({format:"png"}, async (responce)=>{
            const croppedImageData = await ImageCropper.cropImage(responce,msg.data)
            if(croppedImageData){
                //TODO api call
            }
            console.log("Cropped result",  await ImageCropper.cropImage(responce,msg.data))

        });

    }
})
