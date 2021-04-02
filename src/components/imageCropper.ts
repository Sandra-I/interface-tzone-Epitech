import { Rectangle } from "../models/Rectangle";

export default class ImageCropper {

    public static cropImage(imgUrl: string, bounds: Rectangle){
        let img = document.createElement("img")
        img.src = imgUrl;
        
        let canvas = document.createElement("canvas");
        canvas.width = bounds.w;
        canvas.height = bounds.h;
        let ctx = canvas.getContext("2d")
        if(ctx){
            ctx.drawImage(img, -bounds.x, -bounds.y, bounds.w, bounds.h)
            //ctx.drawImage(img, bounds.x, bounds.y, bounds.w, bounds.h)
            console.log("cropped img", canvas.toDataURL("image/png") )
            return ctx.getImageData(0,0,bounds.w-bounds.x, bounds.h-bounds.y)
        }else{
            console.error("Unable to find graphic context of generated canvas")
            return null
        }
    }

}