import axios from "axios"
import * as config from "./../../app.config.json"
export default class API {

    /**
     * API call to request a conversion, image to text from the backend
     */
    static async getTextFromImage(img: string, language: string | null){
        img = img.split('data:image/png;base64,')[1];
        return axios.post<{text: string}>(config.backendurl+"/upload", {img, language})
    }
}