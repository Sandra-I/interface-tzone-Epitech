import axios from 'axios';
import { APIResponce } from '../models/apiResponce';
import { APIResponceWithTraduction } from '../models/apiResponceWithTraduction';
import * as config from '../../app.config.json';

export default class API {
    private static url = config.backendurldev

    /**
     * API call to request a conversion, image to text from the backend
     */
    static async getTextFromImage(_img: string) {
      const img = _img.split('data:image/png;base64,')[1];
      return axios.post<APIResponce>(`${this.url}/upload`, { img });
    }

    /**
     * API call to request a conversion, image to text from the backend with a translation of the given language
     */
    static async getTextFromImageWithTraduction(_img: string, language: string) {
      const img = _img.split('data:image/png;base64,')[1];
      return axios.post<APIResponceWithTraduction>(`${this.url}/upload-with-translation`, { img, language });
    }
}
