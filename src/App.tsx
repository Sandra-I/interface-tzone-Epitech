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
import { User } from './models/user';
// import History from './views/History';

const App: React.FC = () => {
  const [user, setUser] = useState<User>();

  return (
    <div className="tz-body tz-global">
      <Router>
        <div className="app">
          <div className="app-header">
            <div className="button-div">
              <span>{user && <AccountButton name={user.firstName} />}</span>
            </div>
          </div>
          <div className="app-body">
            <Switch>
              <Route path="/index.html">
                <Parameters user={user!} />
              </Route>
              {/* <Route path="/history">
                <History />
              </Route> */}
            </Switch>
          </div>
          <div className="app-footer">
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
