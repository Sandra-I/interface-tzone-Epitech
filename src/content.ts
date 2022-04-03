// Use to tell to get chrome if it
/// <reference types="chrome"/>

// This file is injected as a content script
import Swal from 'sweetalert2';
import { first } from 'rxjs';
import Selector from './utils/selector';
import { DataMessage, MessageType } from './models/DataMessage';
import { Selection } from './models/Selection';
import Popup from './utils/popup';
import './App.scss';
import UnknownMessageError from './errors/unknownMessageError';
import { APIResponce } from './models/apiResponce';
import { APIResponceWithTraduction } from './models/apiResponceWithTraduction';
import OptionsService from './utils/optionsService';

const selector = new Selector();

let isCurrentlySelection = false;

function addLoadingAnimation() {
  const existingLoader = document.getElementById('tzone-loader');
  if (!existingLoader) {
    const loaderContainer = document.createElement('div');
    loaderContainer.id = 'tzone-loader';
    loaderContainer.style.position = 'fixed';
    loaderContainer.style.top = '0';
    loaderContainer.style.right = '0';
    loaderContainer.style.zIndex = '99999';
    loaderContainer.style.backgroundColor = '#404040';
    loaderContainer.style.color = 'white';
    loaderContainer.style.borderRadius = '20px';
    loaderContainer.style.fontWeight = '700';
    loaderContainer.style.margin = '5px';
    loaderContainer.style.padding = '10px';
    loaderContainer.style.textAlign = 'center';
    loaderContainer.style.fontSize = '14px';
    loaderContainer.style.fontFamily = 'arial';

    const loadingAnimation = document.createElement('img');
    loadingAnimation.setAttribute('src', chrome.runtime.getURL('tzone-loader.svg'));
    loadingAnimation.style.width = '60px';
    loadingAnimation.style.height = '60px';
    loadingAnimation.style.display = 'block';
    loaderContainer.appendChild(loadingAnimation);

    const textLoading = document.createElement('div');
    textLoading.innerText = 'Loading';
    loaderContainer.appendChild(textLoading);

    const textImage = document.createElement('div');
    textImage.innerText = 'image';
    loaderContainer.appendChild(textImage);

    document.body.appendChild(loaderContainer);
  }
}

function removeLoadingAnimation() {
  const existingLoader = document.getElementById('tzone-loader');
  if (existingLoader) {
    existingLoader.remove();
  }
}

function removePopup() {
  const existingElement = document.getElementById('tzone-preview');
  if (existingElement) {
    existingElement.remove();
  }
}

function showPopup(data: APIResponce, options?: object) {
  removePopup();
  const htlm = '<div id="tzone_preview_result_container" style="width: 320px;margin: 5px;">'
    + '<h1 id="tzone_preview_result_title">Texte copié</h1><br>'
    + '<textarea class="tzone_preview_result_content"'
    + 'style = "resize: none;overflow: auto; background-color: white; color: black;"'
    + ' cols="40" rows="5" class="tz-result-text" readonly>'
    + `${data.text}`
    + '</textarea>'
    + '</div>';
  const popup = new Popup('tzone-preview', htlm, options);
  popup.show();
}

function copyText(text: string): void {
  const elem = document.createElement('textarea');
  elem.value = text;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand('copy');
  document.body.removeChild(elem);
}

function showPopupWithTranslation(data: APIResponceWithTraduction) {
  removePopup();
  const htlm = '<div id="tzone_preview_result_container" style="width: 320px;margin: 5px;">'
    + '<h1 id="tzone_preview_result_title">Résultat</h1><br>'
    + '<div id="tzone_preview_result_traduction_title">'
    + `<b>Texte original (${data.original.lang}):</b> <button onclick="${copyText(data.original.text)}"`
    + '>Copier</button><br></div>'
    + '<textarea style="resize: none;overflow: auto; background-color: white; color: black;"'
    + 'class="tzone_preview_result_content" > '
    + `${data.original.text}`
    + '</textarea><br><br>'
    + '<div id="tzone_preview_result_traduction_title">'
    + `<b>Texte traduit (${data.translated.lang}):</b> <button onclick="${copyText(data.translated.text)}"`
    + '>Copier</button><br></div>'
    + '<textarea style="resize: none;overflow: auto; background-color: white; color: black;"'
    + 'class="tzone_preview_result_content" > '
    + `${data.translated.text}`
    + '</textarea>'
    + '</div>';
  const popup = new Popup('tzone-preview', htlm, { buttons: [{ actionType: 'exit', name: 'Ok' }] });
  popup.show();
}


// eslint-disable-next-line no-unused-vars
chrome.runtime.onMessage.addListener(async (dataMsg: DataMessage<any>, sender, sendResponce) => {
  if (isCurrentlySelection) {
    console.error('Already selecting an area !');
  } else {
    OptionsService.getOptions().then((options) => {
      switch (dataMsg.msg) {
        case MessageType.SCREENSHOT_SELECTION:
          isCurrentlySelection = true;
          selector.select().pipe(first()).subscribe((rec: Selection) => {
            isCurrentlySelection = false;
            addLoadingAnimation();
            setTimeout(() => chrome.runtime.sendMessage({
              msg: MessageType.SCREENSHOT_SELECTION_RESULT,
              data: rec,
              tabId: dataMsg.tabId,
            }), 10);
          });
          break;
        case MessageType.API_ERROR:
          removeLoadingAnimation();
          removePopup();
          Swal.fire({
            icon: 'error',
            title: 'API Error',
            text: `Impossible de convertire en text la capture : ${dataMsg.data?.message}`,
          });
          break;
        case MessageType.SHOW_PREVIEW:
          if (options.checkOptions.preview) { // todo: check if is not member premium
            showPopup(dataMsg.data, {
              buttons: [
                {
                  name: 'Copier',
                  actionType: 'callback',
                  callback: () => copyText(dataMsg.data.text),
                },
                {
                  name: 'Fermer',
                  actionType: 'exit',
                },
              ],
            });
          } else {
            copyText(dataMsg.data.text);
            showPopup(dataMsg.data, {
              timeout: 2, fadeTime: 3,
            });
          }
          break;
        case MessageType.SHOW_PREVIEW_WITH_TRANSLATION:
          showPopupWithTranslation(dataMsg.data);
          break;
        case MessageType.API_SUCCESS:
          removeLoadingAnimation();
          break;
        default:
          throw new UnknownMessageError(`Can't find action for unknow MessageType "${dataMsg.msg}"`);
      }
    });
  }
});
