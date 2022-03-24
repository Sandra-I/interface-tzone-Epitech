import * as React from 'react';
// import { Link } from 'react-router-dom';
import SwitchCheckbox from '../components/SwitchCheckbox';
import Translate from '../components/Translate';
import { MessageType } from '../models/DataMessage';

const Parameters = () => (
  <div className="card">
    <h1>Paramètres</h1>
    <div className="params">
      <SwitchCheckbox />
      <Translate />
      <div>
        <span>Raccourci clavier récupération :</span>
        <span className="short">ALT + S</span>
      </div>
    </div>
    {/* <Link to="/history"><button>Historique</button></Link> */}
    {/* <br /> */}
    <button className="myButton" onClick={triggerSelectionEvent}>Faire une capture</button>
  </div>
);

function triggerSelectionEvent(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab && tab.id) {
            // Tell the page script ta make a screenshot
            chrome.tabs.sendMessage(tab.id, { msg: MessageType.SCREENSHOT_SELECTION, tabId: tab.id });
        } else {
          throw Error("Can't find active tab !");
        }
      });
}

export default Parameters;
