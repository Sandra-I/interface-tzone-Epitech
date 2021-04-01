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
    console.log("chrome cmd",command)
    //selection.select()
    if(command == "take-screenshot"){
        console.log("take screenshot, tabId:",tab.id)

        //Call a selection
        chrome.tabs.sendMessage(tab.id, {msg:"screenshot-selection", tabId: tab.id}, function(recData){
            console.log("recData:",recData)

            //when the selection have been done, make a screenshoot
            chrome.tabs.captureVisibleTab({format:"png"},(responce)=>{
                console.log("responce",responce)
            });
        })
        
    }else if(command == "screenshot-selection-with-options"){
        console.log("take screenshot with options")

    }
});
