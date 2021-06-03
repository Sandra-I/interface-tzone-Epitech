import { Selection } from "../models/Selection";

export default class ImageCropper {

    /**
     * Crop given image
     * @param imgUrl html address or URL of the image to crop
     * @param bounds Selection area of the image to crop
     * @return croped image 
     */
    public static async cropImage(imgUrl: string, bounds: Selection): Promise<ImageData|null>{
        const img = document.createElement("img");
        img.src = imgUrl;
        
        const canvas = document.createElement("canvas");
        canvas.width = bounds.w;
        canvas.height = bounds.h;

        const ctx = canvas.getContext("2d")

        return new Promise(res=>img.addEventListener('load', (e) => {
            if(ctx){
                ctx.drawImage(img, -bounds.x, -bounds.y, img.width, img.height)
                res( ctx.getImageData(0, 0, bounds.w, bounds.h) )
            }else{
                
                //This error is just in case, normaly can't be trigger as of the canvas is create localy
                console.error("Unable to find graphic context of generated canvas")
                res(null)
            }
        }));
        
    }

}