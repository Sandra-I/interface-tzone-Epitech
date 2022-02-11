import { Options } from '../models/options';
import { DataMessage, MessageType } from '../models/DataMessage';

export default class OptionsService {
    private static options: Options = {
      checkOptions: {
        preview: false,
        retrivePolice: false,
        retriveFormat: false,
      },
      translateLanguage: null,
    }

    private static isBackground = false;

    static init() {
      OptionsService.isBackground = true;
      chrome.runtime.onMessage.addListener((dataMsg: DataMessage<NotificationOptions>, sender, reply) => {
        console.log('options event', dataMsg);
        if (dataMsg.msg === MessageType.OPTIONS_REQUEST) {
          reply(OptionsService.options);
        } else if (dataMsg.msg === MessageType.OPTIONS_UPDATE) {
          const optionsString = JSON.stringify(dataMsg.data);
          OptionsService.options = JSON.parse(optionsString);
          localStorage.setItem('options', optionsString);
        }
      });
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
