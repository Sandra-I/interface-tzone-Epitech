import * as React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Parameters from './views/Parameters';
import AccountButton from './components/AccountButton';
import AuthButton from './components/AuthButton';
import LanguageSelection from './components/LanguageSelection';
import { MessageType } from './models/DataMessage';
import { User } from './models/user';
import History from './views/History';

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

const App: React.FC = () => {
  const [user, setUser] = useState<User>();
  const { t } = useTranslation();
  return (
    <div className="tz-body tz-global">
      <Router>
        <div className="app">
          <div className="app-header">
            <div className="button-div">
              <span>{user && <AccountButton name={user.firstName} />}</span>
              <LanguageSelection />
            </div>
          </div>
          <div className="app-body">
            <Switch>
              <Route path="/index.html">
                <Parameters user={user!} />
              </Route>
              <Route path="/history">
                <History user={user} />
              </Route>
            </Switch>
          </div>
          <div className="app-footer">
            <div className="button-div">
              <button type="button" className="myButton" onClick={triggerSelectionEvent}>{t('doScreenshot')}</button>
            </div>
            <div className="button-div">
              <AuthButton setUser={setUser} />
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
