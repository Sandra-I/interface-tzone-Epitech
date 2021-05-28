
import axios from "axios"
import * as config from "../app.config.json"
export default class API {

    /**
     * API call to request an conversion image to text from the backend
     * @param img 
     */
    async getTextFromImage(img: ImageData){
        const responce = await axios.get(config.backendurl+"/", {params: {image: img}})
        console.log( responce )
        return responce;
    }
}