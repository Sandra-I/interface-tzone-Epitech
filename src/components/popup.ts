enum ActionType {
    exit = 'exit',
    callback = 'callback'
}

export default class Popup {
  popupContent = document.createElement('div');

  /**
     * @param id
     * @param html
     * @param options time parameters are all in secondes
     */
  constructor(private id: string, html: string, private options?: {buttons?: {name: string, actionType: 'exit' | 'callback', callback?: any}[], timeout?: number, fadeTime?: number}) {
    const existingElement = document.getElementById(id);
    if (existingElement) throw new Error("Can't create the popup, id already exist !");
    this.popupContent.id = id;
    this.popupContent.style.opacity = '1';
    this.popupContent.style.position = 'fixed';
    this.popupContent.style.top = '0';
    this.popupContent.style.right = '0';
    this.popupContent.style.zIndex = '99999';
    this.popupContent.style.backgroundColor = '#FFFFFF';
    this.popupContent.style.color = 'white';
    this.popupContent.style.borderRadius = '20px';
    this.popupContent.style.fontWeight = '700';
    this.popupContent.style.margin = '5px';
    this.popupContent.style.padding = '10px';
    this.popupContent.style.textAlign = 'center';
    this.popupContent.style.fontSize = '14px';
    this.popupContent.style.fontFamily = 'arial';
    this.popupContent.style.boxShadow = '1px 4px 10px #444444';

    this.popupContent.innerHTML = html;

    if (options) {
      if (options.buttons) {
        const buttons = document.createElement('div');
        options.buttons.forEach((button) => {
          const buttonElement = document.createElement('button');
          buttonElement.innerHTML = button.name;
          if (button.actionType === ActionType.exit) buttonElement.addEventListener('click', () => this.hide());
          if (button.actionType === ActionType.callback && button.callback) buttonElement.addEventListener('click', () => button.callback());
          buttons.appendChild(buttonElement);
        });
        this.popupContent.appendChild(buttons);
      }
      if (options.timeout) setTimeout(() => {
        this.hide();
      }, options.timeout * 1000);
    }
  }

  show() {
    const existingElement = document.getElementById(this.id);
    if (!existingElement) {
      console.log('Show popup');
      document.body.appendChild(this.popupContent);
    }
  }

  hide() {
    const existingElement = document.getElementById(this.id);
    if (existingElement) {
      console.log('Hide popup');
      if (this.options && this.options.fadeTime) {
        this.popupContent.style.transition = `opacity ${this.options.fadeTime}s ease-in-out`;
        setTimeout(() => { this.popupContent.style.opacity = '0'; }, 10);
        setTimeout(() => {
          existingElement.remove();
        }, this.options.fadeTime * 1000);
      } else existingElement.remove();
    }
  }
}
