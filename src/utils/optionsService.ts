import { Options } from '../models/options';
import { DataMessage, MessageType } from '../models/DataMessage';

declare type NotificationOptions = any;
export default class OptionsService {
  public static readonly defaultOptions: Options = {
    checkOptions: {
      preview: false,
      // retriveFormat: false,
    },
    translateLanguage: null,
  };

  private static options: Options = OptionsService.defaultOptions;

  private static isBackground = false;

  static init() {
    OptionsService.isBackground = true;
    chrome.runtime.onMessage.addListener(this.messageListener);
  }

  static messageListener(
    dataMsg: DataMessage<NotificationOptions>,
    sender: chrome.runtime.MessageSender,
    reply: Function,
  ) {
    if (dataMsg.msg === MessageType.OPTIONS_REQUEST) {
      reply(OptionsService.options);
    } else if (dataMsg.msg === MessageType.OPTIONS_UPDATE) {
      const optionsString = JSON.stringify(dataMsg.data);
      OptionsService.options = JSON.parse(optionsString);
      localStorage.setItem('options', optionsString);
    }
  }

  static getOptions() {
    return new Promise<Options>((res) => {
      if (OptionsService.isBackground) {
        res(OptionsService.options);
      } else {
        chrome.runtime.sendMessage({ msg: MessageType.OPTIONS_REQUEST, data: null, tabId: null }, (response) => {
          res(response);
        });
      }
    });
  }

  static updateOptions(options: Options) {
    if (OptionsService.isBackground) {
      const optionsString = JSON.stringify(options);
      OptionsService.options = JSON.parse(optionsString);
      localStorage.setItem('options', optionsString);
    } else {
      chrome.runtime.sendMessage({ msg: MessageType.OPTIONS_UPDATE, data: options, tabId: null });
    }
  }
}
