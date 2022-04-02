import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SwitchCheckbox from '../components/SwitchCheckbox';
import Translate from '../components/Translate';
import { MessageType } from '../models/DataMessage';
import { User } from '../models/user';

const Parameters: React.FC<{user: User}> = ({ user }) => {
  function triggerSelectionEvent() {
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
  const { t } = useTranslation();
  return (
    <div className="card">
      <h1>{t('parameters')}</h1>
      <div className="params">
        <SwitchCheckbox />
        { user?.permissions.translation && <Translate /> }
        <div>
          <span>Raccourci clavier récupération :</span>
          <span className="short">ALT + S</span>
        </div>
      </div>
      { user?.permissions.history && <Link to="/history"><button type="button">Historique</button></Link> }
      {/* <Link to="/history"><button>Historique</button></Link> */}
      {/* <br /> */}
      <button type="button" className="myButton" onClick={triggerSelectionEvent}>Faire une capture</button>
    </div>
  );
};

export default Parameters;
