import { Selection } from '../models/Selection';
import UnknownMessageError from '../errors/unknownMessageError';

export default class ImageCropper {
  /**
     * Crop given image
     * @param imgUrl html address or URL of the image to crop
     * @param bounds Selection area of the image to crop
     * @return The cropped image corresponding to the bounds selected
     */
  public static cropImage(imgUrl: string, bounds: Selection): Promise<string | null> {
    const img = this.getImg(imgUrl);
    const canvas = this.getCanvas(bounds);
    const ctx = canvas.getContext('2d');
    return this.loadAndSend(img, ctx, bounds, canvas);
  }

  /**
     * Wait for `img` to load then try to crop the wanted image
     * @param img The image to load
     * @param ctx The rendering context of the canvas displaying the image
     * @param bounds The dimension to cut from the original image
     * @returns A promise returning a string or null
     */
  public static loadAndSend(
    _img: HTMLImageElement,
    ctx: CanvasRenderingContext2D | null,
    bounds: Selection,
    canvas: HTMLCanvasElement,
  ): Promise<string | null> {
    return new Promise((res, rej) => {
      const img = _img;
      img.onload = () => {
        try {
          this.hasCtx(ctx);
          res(this.sendImage(ctx!, img, bounds, canvas));
        } catch {
          rej(new UnknownMessageError('Impossible to crop the image'));
        }
      };
    });
  }

  /**
     * Create an `HTMLImageElement` and pass `imgUrl` to its `src` property
     * @param imgUrl The sources of the image. Can be a html address or an URL
     * @returns The `HTMLImageElement` with `src` set
     */
  public static getImg(imgUrl: string): HTMLImageElement {
    const img = document.createElement('img');
    img.src = imgUrl;
    return img;
  }

  /**
     * Create an `HTMLCanvasElement` and pass properties `w` and `h` of `bounds` to its `width` and `height` properties
     * @param bounds Selection area of the image to crop
     * @returns The `HTMLCanvasElement` with `height` & `width` set
     */
  public static getCanvas(bounds: Selection): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = bounds.w;
    canvas.height = bounds.h;
    return canvas;
  }

  /**
     * Draw the image and get the part corresponding to the bounds
     * @param ctx The context of the canvas rendering the image
     * @param img The image to render
     * @param bounds The bounds of the image to return
     * @returns The string of the original image corresponding to the bounds
     */
  public static sendImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement, bounds: Selection, canvas: HTMLCanvasElement): string {
    ctx.drawImage(img, -bounds.x, -bounds.y, img.width, img.height);
    return canvas.toDataURL();
  }

  /**
     * Throw an error if the `CanvasRenderingContext2D` is null
     * @param ctx The context to check
     */
  public static hasCtx(ctx: CanvasRenderingContext2D | null): void {
    if (!ctx) {
      throw new Error('Unable to find graphic context of generated canvas');
    }
  }
}
