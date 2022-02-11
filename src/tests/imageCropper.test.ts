/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import ImageCropper from '../components/ImageCropper';
import { Selection } from '../models/Selection';
import 'jest-canvas-mock';

const imgUrl = 'data:image/png;';
const selection: Selection = {
  x: 18, y: 17, w: 14, h: 16,
};

describe('imageCropper', () => {
  it('should return a `HTMLImageElement`', () => {
    const img = ImageCropper.getImg(imgUrl);
    expect(img instanceof HTMLImageElement).toBeTruthy();
    expect(img.src).toBe(imgUrl);
  });

  it('should return a `HTMLCanvasElement`', () => {
    const canvas = ImageCropper.getCanvas(selection);
    expect(canvas instanceof HTMLCanvasElement).toBeTruthy();
    expect(canvas.width).toBe(selection.w);
    expect(canvas.height).toBe(selection.h);
  });

  it('should throw an error', () => {
    expect(() => ImageCropper.hasCtx(null)).toThrowError('Unable to find graphic context of generated canvas');
  });

  it('should call multiple functions', () => {
    jest.spyOn(ImageCropper, 'getImg');
    jest.spyOn(ImageCropper, 'getCanvas');
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext');
    jest.spyOn(ImageCropper, 'loadAndSend');
    ImageCropper.cropImage(imgUrl, selection);
    expect(ImageCropper.getImg).toHaveBeenCalled();
    expect(ImageCropper.getCanvas).toHaveBeenCalled();
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalled();
    expect(ImageCropper.loadAndSend).toHaveBeenCalled();
  });
});
