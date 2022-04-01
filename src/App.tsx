import * as React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useState } from 'react';
import Parameters from './views/Parameters';
import AccountButton from './components/AccountButton';
import AuthButton from './components/AuthButton';
import LanguageSelection from './components/LanguageSelection';
import { MessageType } from './models/DataMessage';
import { useTranslation } from "react-i18next";
// import History from './views/History';

const App: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  function login() {
    console.warn('login test');
    setIsAuthenticated(true);
    setName('tz');
  }

  function logout() {
    console.warn('logout test');
    setIsAuthenticated(false);
    setName('');
  }

  return (
    <div className="tz-body tz-global">
      <Router>
        <div className="app">
          <div className="app-header">
            <div className="button-div">
              <span>{isAuthenticated && <AccountButton name={name} />}</span>
              <LanguageSelection />
            </div>
          </div>
          <div className="app-body">
            <Switch>
              <Route path="/index.html">
                <Parameters />
              </Route>
              {/* <Route path="/history">
                <History />
              </Route> */}
            </Switch>
          </div>
          <div className="app-footer">
            <div className="button-div">
              <button className="myButton" onClick={triggerSelectionEvent}>{t('doScreenshot')}</button>
            </div>
            <div className="button-div">
              <AuthButton onClick={() => (!isAuthenticated ? login() : logout())} isAuthenticated={isAuthenticated} />
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};

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

export default App;
