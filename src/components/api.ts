
import axios from "axios"
import config = require("../app.config.json")
export default class API {

    async getTextFromImage(img){
        
        const responce = await axios.get(config.backendurl+"/", {params: {image: img}})
        console.log( responce )
        
    }
}