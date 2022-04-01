import { Subject } from 'rxjs';
import { Selection } from '../models/Selection';

export default class Selector {
  coordStart: { x: number, y: number } = { x: 0, y: 0 };

  coordEnd: { x: number, y: number } = { x: 0, y: 0 };

  tzone: HTMLDivElement;

  selector: HTMLDivElement;

  selectorBackground: {
    topL: HTMLDivElement,
    topR: HTMLDivElement,
    bottomL: HTMLDivElement,
    bottomRight: HTMLDivElement,
    title: HTMLDivElement
  };

  bodyScrollStyle: string = 'initial';

  bodySelectStyle: string = 'auto';

  listen = false;

  isSelecting = false;

  startDrawing = false;

  rectangle: Selection = {
    x: 0, y: 0, w: 0, h: 0,
  };

  selection = new Subject<Selection>();

  // Initialise all required elements for an area selection
  constructor() {
    // Main container
    this.tzone = document.createElement('div');
    this.tzone.id = 'TZone';
    this.tzone.style.position = 'absolute';
    this.tzone.style.left = '0px';
    this.tzone.style.top = '0px';
    this.tzone.style.width = '100%';
    this.tzone.style.height = '100%';

    // Selection rectangle
    this.selector = document.createElement('div');
    this.selector.style.border = '1px solid black';
    this.selector.style.position = 'absolute';
    this.selector.style.overflow = 'hidden';
    this.selector.style.zIndex = '10000';
    this.tzone.appendChild(this.selector);

    // Selection rectangle background
    this.selectorBackground = {
      topL: Selector.createBackground(this.tzone),
      topR: Selector.createBackground(this.tzone),
      bottomL: Selector.createBackground(this.tzone),
      bottomRight: Selector.createBackground(this.tzone),
      title: Selector.setBackgroundTitle(this.tzone),
    };

    // Add mouse listener
    window.addEventListener('mousedown', (evt) => (this.isSelecting ? this.selectionStart(evt) : null), true);
    window.addEventListener('mousemove', (evt) => (this.isSelecting ? this.selectionChange(evt) : null), true);
    window.addEventListener('mouseup', (evt) => (this.isSelecting ? this.selectionEnd(evt) : null), true);
  }

  private static createBackground(parent?: HTMLElement) {
    const background = document.createElement('div');
    background.style.position = 'absolute';
    background.style.zIndex = '10000';
    background.style.backgroundColor = 'rgba(0,0,0,0.5)';
    if (parent) parent.appendChild(background);
    return background;
  }

  private static setBackgroundTitle(parent?: HTMLElement) {
    const title = document.createElement('h1');
    title.innerHTML = 'Sélectionner la zone souhaitée';
    title.style.position = 'absolute';
    title.style.transform = 'translate(-50%, 50%)';
    title.style.color = 'white';
    title.style.fontSize = '32px';
    title.style.zIndex = '10001';
    if (parent) parent.appendChild(title);
    return title;
  }

  /**
   * Make the selection of the window start, and wait the user to select the area
   * @return Selection of the window
   */
  select(): Subject<Selection> {
    this.bodyScrollStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.bodySelectStyle = document.body.style.userSelect;
    document.body.style.userSelect = 'none';
    this.selectorBackground.title.style.opacity = '1';
    this.selectorBackground.title.style.left = `calc(50% + ${window.scrollX}px)`;
    this.selectorBackground.title.style.top = `calc(50% + ${window.scrollY}px)`;
    this.coordStart = { x: 0, y: 0 };
    this.coordEnd = { x: 0, y: 0 };
    this.drawSelector();
    this.drawSelectionBackground();
    this.isSelecting = true;
    document.body.appendChild(this.tzone);
    return this.selection;
  }

  /**
   * Normalize position to be window position and not page position
   * @param selection Selection
   * @returns Selection
   */
  private static normalizeSelection(selection:Selection): Selection {
    return {
      ...selection,
      x: selection.x - window.pageXOffset,
      y: selection.y - window.pageYOffset,
    };
  }

  selectionEnd(evt: MouseEvent) {
    this.coordEnd = { x: evt.pageX, y: evt.pageY };
    this.isSelecting = false;
    this.startDrawing = false;
    document.body.removeChild(this.tzone);
    document.body.style.overflow = this.bodyScrollStyle;
    document.body.style.userSelect = this.bodySelectStyle;
    // Wait a bit to make time for the selector to be removed from display, to not be on the screenshot
    new Promise((res) => setTimeout(() => res(null), 20))
      .then(() => this.selection.next(Selector.normalizeSelection(this.rectangle)));
  }

  public selectionStart(evt: MouseEvent) {
    this.coordStart = { x: evt.pageX, y: evt.pageY };
    this.startDrawing = true;
    this.selectorBackground.title.style.opacity = '0';
  }

  selectionChange(evt: MouseEvent) {
    this.coordEnd = { x: evt.pageX, y: evt.pageY };
    if (this.startDrawing) this.drawSelector();
    this.drawSelectionBackground();
  }

  /**
   * Draw the selection rectangle
   */
  drawSelector() {
    this.rectangle = {
      x: 0, y: 0, w: 0, h: 0,
    };
    if (this.coordStart.x < this.coordEnd.x) {
      this.rectangle.x = this.coordStart.x;
      this.rectangle.w = this.coordEnd.x - this.coordStart.x;
    } else {
      this.rectangle.x = this.coordEnd.x;
      this.rectangle.w = this.coordStart.x - this.coordEnd.x;
    }

    if (this.coordStart.y < this.coordEnd.y) {
      this.rectangle.y = this.coordStart.y;
      this.rectangle.h = this.coordEnd.y - this.coordStart.y;
    } else {
      this.rectangle.y = this.coordEnd.y;
      this.rectangle.h = this.coordStart.y - this.coordEnd.y;
    }
    this.selector.style.left = `${this.rectangle.x}px`;
    this.selector.style.top = `${this.rectangle.y}px`;
    this.selector.style.width = `${this.rectangle.w}px`;
    this.selector.style.height = `${this.rectangle.h}px`;
  }

  drawSelectionBackground() {
    this.selectorBackground.topL.style.left = '0px';
    this.selectorBackground.topL.style.top = '0px';
    this.selectorBackground.topL.style.width = `${this.rectangle.x + this.rectangle.w}px`;
    this.selectorBackground.topL.style.height = `${this.rectangle.y}px`;

    this.selectorBackground.topR.style.left = this.selectorBackground.topL.style.width;
    this.selectorBackground.topR.style.top = `${window.pageYOffset}px`;
    this.selectorBackground.topR.style.width = `${window.innerWidth + window.pageXOffset - this.rectangle.x}px`;
    this.selectorBackground.topR.style.height = '100%';

    this.selectorBackground.bottomL.style.left = '0px';
    this.selectorBackground.bottomL.style.top = `${this.rectangle.y}px`;
    this.selectorBackground.bottomL.style.width = `${this.rectangle.x}px`;
    this.selectorBackground.bottomL.style.height = '100%';

    this.selectorBackground.bottomRight.style.left = `${this.rectangle.x}px`;
    this.selectorBackground.bottomRight.style.top = `${this.rectangle.y + this.rectangle.h}px`;
    this.selectorBackground.bottomRight.style.width = `${this.rectangle.w > 0 ? this.rectangle.w : 0}px`;
    this.selectorBackground.bottomRight.style.height = '100%';
  }
}
