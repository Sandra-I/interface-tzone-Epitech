import axios, { AxiosResponse } from "axios"
import { APIResponce } from "../models/apiResponce";
import { APIResponceWithTraduction } from "../models/apiResponceWithTraduction";
import * as config from "./../../app.config.json"
export default class API {

    /**
     * API call to request a conversion, image to text from the backend
     */
    static async getTextFromImage(img: string){
        img = img.split('data:image/png;base64,')[1];
        return axios.post<APIResponce>(config.backendurl+"/upload", {img})
    }

    /**
     * API call to request a conversion, image to text from the backend with a translation of the given language
     */
    static async getTextFromImageWithTraduction(img: string, language: string){
        return {data: {original: {lang:"langue ori",text:"ceci est le texxt origi"}, translated: {lang:"langue trans",text:"this is the translated text"}}}
        img = img.split('data:image/png;base64,')[1];
        return axios.post<APIResponceWithTraduction>(config.backendurl+"/upload-with-translation", {img, language})
    }
}