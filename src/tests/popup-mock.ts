import Popup from '../utils/popup';

const htlm = '<div style="width: 320px;margin: 5px;">'
  + '<h1 class="tz-title">Texte copié</h1><br>'
  + '<textarea style="resize: none;overflow: auto;width: 320px;background-color: white; color: black;"'
  + ' cols="40" rows="5" class="tz-result-text" readonly>'
  + 'Test Popup'
  + '</textarea>'
  + '</div>';

const PopupMock = () => new Popup('tzone-preview', htlm, {
  buttons: [
    {
      name: 'Copier',
      actionType: 'callback',
      callback: () => null,
    },
    {
      name: 'Fermer',
      actionType: 'exit',
    },
  ],
});

export default PopupMock;
