import axios from "axios"
import * as config from "./../../app.config.json"
export default class API {

    /**
     * API call to request a conversion, image to text from the backend
     */
    static async getTextFromImage(img: string){
        img = img.split('data:image/png;base64,')[1];
        return axios.post<{ text: string }>(config.backendurl+"/upload", {img})
    }

    /**
     * API call to request a conversion, image to text from the backend with a translation of the given language
     */
    static async getTextFromImageWithTraduction(img: string, language: string){
        img = img.split('data:image/png;base64,')[1];
        return axios.post<{
            original: {
                lang: string,
                text: string
            },
            translated: {
                lang: string,
                text: string
            }
        }>(config.backendurl+"/uploadWithTraduction", {img, language})
    }
}