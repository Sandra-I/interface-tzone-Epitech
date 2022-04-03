// Use to tell to get chrome if it
/// <reference types="chrome"/>
import ImageCropper from './utils/ImageCropper';
import { DataMessage, MessageType } from './models/DataMessage';
import { Selection } from './models/Selection';
import API from './services/text-service';
import OptionsService from './utils/optionsService';
import UnknownMessageError from './errors/unknownMessageError';
import UserService from './services/user-service';

declare type NotificationOptions = any;

// Load config
OptionsService.init();
const savedConf = localStorage.getItem('options');
if (savedConf) OptionsService.updateOptions(JSON.parse(savedConf));

const updateHistory = (text: string) => {
  UserService.updateHistory(text);
};

// Listen command keys
chrome.commands.onCommand.addListener(async (command: string) => {
  // Get active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab && tab.id) {
      if (command === 'take-screenshot') {
        // Tell the page script ta make a screenshot
        chrome.tabs.sendMessage(tab.id, { msg: MessageType.SCREENSHOT_SELECTION, tabId: tab.id });
      } else if (command === 'take-screenshot-with-options') {
        // TODO - take screenshot with options
      }
    } else {
      throw Error("Can't find active tab !");
    }
  });
});

// Responce of selection call
chrome.runtime.onMessage.addListener((dataMsg: DataMessage<Selection | NotificationOptions>, sender, response) => {
  // if it's the result of a selection then
  if (dataMsg.msg === MessageType.SCREENSHOT_SELECTION_RESULT) {
    // make a screenshoot
    chrome.tabs.captureVisibleTab({ format: 'png' }, async (responce) => {
      // Crop the image according to the selection
      const croppedImageData = await ImageCropper.cropImage(responce, dataMsg.data as Selection);
      if (croppedImageData) {
        OptionsService.getOptions().then((options) => {
          if (options.translateLanguage) {
            API.getTextFromImageWithTraduction(croppedImageData, options.translateLanguage).then((result) => {
              updateHistory(result.data.original.text);
              if (sender.tab && sender.tab.id) {
                chrome.tabs.sendMessage(sender.tab.id, { msg: MessageType.API_SUCCESS, tabId: sender.tab.id });
                chrome.tabs.sendMessage(sender.tab.id,
                  { msg: MessageType.SHOW_PREVIEW_WITH_TRANSLATION, tabId: sender.tab.id, data: result.data });
              }
            }).catch((err: Error) => {
              console.error(err);
              if (sender.tab && sender.tab.id) {
                chrome.tabs.sendMessage(sender.tab.id, { msg: MessageType.API_ERROR, data: err, tabId: sender.tab.id });
              }
            });
          } else {
            API.getTextFromImage(croppedImageData).then((result) => {
              updateHistory(result.data.text);
              if (sender.tab && sender.tab.id) {
                chrome.tabs.sendMessage(sender.tab.id, { msg: MessageType.API_SUCCESS, tabId: sender.tab.id });
                chrome.tabs.sendMessage(sender.tab.id, {
                  msg: MessageType.SHOW_PREVIEW,
                  tabId: sender.tab.id,
                  data: result.data,
                });
              }
            }).catch((err) => {
              console.error(err);
              if (sender.tab && sender.tab.id) {
                chrome.tabs.sendMessage(sender.tab.id, { msg: MessageType.API_ERROR, data: err, tabId: sender.tab.id });
              }
            });
          }
        });
      }
    });
  } else if (dataMsg.msg === MessageType.NOTIFICATION) {
    chrome.notifications.create('', dataMsg.data as NotificationOptions);
    response(true);
  } else if (!Object.keys(MessageType).find((o) => o === dataMsg.msg)) {
    throw new UnknownMessageError(`Can't find action for unknow MessageType "${dataMsg.msg}"`);
  }
});
