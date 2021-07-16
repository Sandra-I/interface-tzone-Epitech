
import axios from "axios"
import * as config from "./../../app.config.json"
export default class API {

    /**
     * API call to request an conversion image to text from the backend
     * @param img 
     */
    static async getTextFromImage(img: string){
        img = img.split('data:image/png;base64,')[1];
        const response = await axios.post<{text: string}>(config.backendurl+"/upload", {img: img})
        return response;    
    }
}