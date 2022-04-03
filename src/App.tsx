import * as React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Parameters from './views/Parameters';
import AuthButton from './components/AuthButton';
import LanguageSelection from './components/LanguageSelection';
import { MessageType } from './models/DataMessage';
import { User } from './models/user';
import DropDownAccount from './components/DropDownAccount';
import History from './views/History';
import UserService from './services/user-service';

const App: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [showMainPageButton, setShowMainPageButton] = useState(true);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      UserService.getMe(setUser)
        .catch(() => { localStorage.removeItem('token'); })
        .finally(() => { setLoading(false); });
    } else setLoading(false);
  }, []);

  function chromeTabsQueryCallback(tabs: chrome.tabs.Tab[]) {
    const tab = tabs[0];
    if (tab && tab.id) {
      // Tell the page script ta make a screenshot
      chrome.tabs.sendMessage(tab.id, { msg: MessageType.SCREENSHOT_SELECTION, tabId: tab.id });
    } else {
      throw Error("Can't find active tab !");
    }
  }

  function triggerSelectionEvent() {
    chrome.tabs.query({ active: true, currentWindow: true }, chromeTabsQueryCallback);
  }

  return (
    <div className="tz-body tz-global">
      <Router>
        <div className="app">
          {!loading && (
            <>
              <div className="app-header">
                <div className="button-div">
                  {!user && <AuthButton setUser={setUser} />}
                  {user && <DropDownAccount setUser={setUser} user={user} />}
                </div>
                <div className="button-div">
                  <LanguageSelection />
                </div>
              </div>
              <div className="app-body">
                <Switch>
                  <Route path="/index.html">
                    <Parameters user={user!} />
                  </Route>
                  <Route path="/history">
                    <History user={user!} />
                  </Route>
                </Switch>
              </div>
              <div className="app-footer">
                {showMainPageButton && (
                  <div className="button-div">
                    <button
                      id="screenshot_button"
                      type="button"
                      className="myButton"
                      onClick={triggerSelectionEvent}
                    >
                      {t('doScreenshot')}
                    </button>
                  </div>
                )}
                {user?.permissions.history && showMainPageButton && (
                  <div className="button-div">
                    <Link to="/history">
                      <button
                        className="myButton"
                        type="button"
                        onClick={() => setShowMainPageButton(false)}
                      >
                        {t('history')}
                      </button>
                    </Link>
                  </div>
                )}
                {!showMainPageButton && (
                  <div className="button-div">
                    <Link to="/index.html">
                      <button
                        className="myButton back_button"
                        type="button"
                        onClick={() => setShowMainPageButton(true)}
                      >
                        <div>🠔</div>
                        <div>{t('back')}</div>
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
          {loading && <div className="ring_loader" />}
        </div>
      </Router>
    </div>
  );
};

export default App;
