/* eslint-disable no-undef */
import Selector from '../utils/selector';

describe('selector', () => {
  let selector: Selector = new Selector();
  beforeEach(() => { selector = new Selector(); });

  it('should init selector', () => {
    selector.select();
    expect(selector.isSelecting).toBeTruthy();
  });

  it('should triggered `selectionStart`', () => {
    selector.isSelecting = true;
    jest.spyOn(selector, 'selectionStart');
    document.dispatchEvent(new Event('mousedown'));
    expect(selector.selectionStart).toHaveBeenCalled();
  });

  it('should triggered `selectionChange`', () => {
    selector.isSelecting = true;
    jest.spyOn(selector, 'selectionChange');
    document.dispatchEvent(new Event('mousemove'));
    expect(selector.selectionChange).toHaveBeenCalled();
  });

  it('should draw `selector`', () => {
    selector.coordStart = { x: 50, y: 40 };
    selector.coordEnd = { x: 125, y: 100 };
    selector.drawSelector();
    const rectangle = {
      x: 50,
      y: 40,
      w: 75,
      h: 60,
    };
    expect(selector.rectangle).toEqual(rectangle);
  });

  it('should draw `background`', () => {
    // @ts-ignore
    window.innerWidth = 1200;
    selector.rectangle = {
      x: 50,
      y: 40,
      w: 75,
      h: 60,
    };
    selector.drawSelectionBackground();
    expect(selector.selectorBackground.topL.style.left).toEqual('0px');
    expect(selector.selectorBackground.topL.style.top).toEqual('0px');
    expect(selector.selectorBackground.topL.style.width).toEqual('125px');
    expect(selector.selectorBackground.topL.style.height).toEqual('40px');
    expect(selector.selectorBackground.topR.style.left).toEqual('125px');
    expect(selector.selectorBackground.topR.style.top).toEqual('0px');
    expect(selector.selectorBackground.topR.style.width).toEqual('1150px');
    expect(selector.selectorBackground.topR.style.height).toEqual('100%');
    expect(selector.selectorBackground.bottomL.style.left).toEqual('0px');
    expect(selector.selectorBackground.bottomL.style.top).toEqual('40px');
    expect(selector.selectorBackground.bottomL.style.width).toEqual('50px');
    expect(selector.selectorBackground.bottomL.style.height).toEqual('100%');
    expect(selector.selectorBackground.bottomRight.style.left).toEqual('50px');
    expect(selector.selectorBackground.bottomRight.style.top).toEqual('100px');
    expect(selector.selectorBackground.bottomRight.style.width).toEqual('75px');
    expect(selector.selectorBackground.bottomRight.style.height).toEqual('100%');
  });
});
