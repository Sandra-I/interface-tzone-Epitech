export default class Popup {
  popupContent = document.createElement('div');

  /**
   * @param id
   * @param html
   * @param options time parameters are all in secondes
   */
  constructor(
    private id: string,
    html: string,
    private options?: {
      buttons?: { name: string, actionType: 'exit' | 'callback', callback?: any }[],
      timeout?: number, fadeTime?: number
    },
  ) {
    const existingElement = document.getElementById(id);
    if (existingElement) throw new Error("Can't create the popup, id already exist !");
    this.popupContent.id = id;
    // this.popupContent.className = 'tz-normal-text tz-global popup-style';

    this.popupContent.className = 'tz-normal-text tz-global';

    this.popupContent.innerHTML = html;

    if (options) {
      if (options.buttons) {
        const buttons = document.createElement('div');
        buttons.id = 'tzone_preview_result_buttons';
        options.buttons.forEach((button) => {
          const buttonElement = document.createElement('button');
          buttonElement.innerHTML = button.name;
          if (button.actionType === 'exit') buttonElement.addEventListener('click', () => this.hide());
          else if (button.actionType === 'callback' && button.callback) {
            buttonElement.addEventListener('click', () => button.callback());
          }
          buttons.appendChild(buttonElement);
        });
        this.popupContent.appendChild(buttons);
      }
    }
  }

  show() {
    const existingElement = document.getElementById(this.id);
    if (!existingElement) {
      document.body.appendChild(this.popupContent);
      this.popupContent.addEventListener('click', (e) => e.stopPropagation());
      const callback = () => {
        this.hide();
        document.removeEventListener('click', callback);
      };
      document.addEventListener('click', callback);
    }
    if (this.options && this.options.timeout) {
      setTimeout(() => {
        this.hide();
      }, this.options.timeout * 1000);
    }
  }

  hide() {
    const existingElement = document.getElementById(this.id);
    if (existingElement) {
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
