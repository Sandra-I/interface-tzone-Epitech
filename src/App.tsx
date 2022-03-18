import * as React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Parameters from './views/Parameters';
import ConnectionButton from './components/ConnectionButton';
// import History from './views/History';

const App = () => (
  <div className="tz-body tz-global">
    <Router>
      <div className="app">
        <div className="app-header">
          HEADER
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
            <ConnectionButton />
          </div>
        </div>
      </div>
    </Router>
  </div>
);

export default App;
