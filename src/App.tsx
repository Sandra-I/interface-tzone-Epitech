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
// import History from './views/History';

const App: React.FC = () => {
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
              <AuthButton onClick={() => (!isAuthenticated ? login() : logout())} isAuthenticated={isAuthenticated} />
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
