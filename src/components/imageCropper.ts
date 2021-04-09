import { Rectangle } from "../models/Rectangle";

export default class ImageCropper {

    public static async cropImage(imgUrl: string, bounds: Rectangle): Promise<ImageData|null>{
        let img = new Image();
        img.src = imgUrl;
        
        let canvas = document.createElement("canvas");
        canvas.width = bounds.w;
        canvas.height = bounds.h;

        let ctx = canvas.getContext("2d")

        return new Promise(res=>img.addEventListener('load', (e) => {
            if(ctx){
                ctx.drawImage(img, -bounds.x, -bounds.y, img.width, img.height)
                res( ctx.getImageData(0, 0, bounds.w, bounds.h) )
            }else{
                console.error("Unable to find graphic context of generated canvas")
                res(null)
            }
        }));
        
    }

}