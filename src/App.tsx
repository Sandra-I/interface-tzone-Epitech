import * as React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Parameters from './Views/Parameters';
// import History from "./Views/History";

const App = () => (
  <div className="tz-body tz-global">
    <Router>
      <div className="app">
        <div className="app-header">
          <Switch>
            <Route path="/popup.html">
              <Parameters />
            </Route>
            {/* <Route path="/history">
                            <History/>
                        </Route> */}
          </Switch>
        </div>
      </div>
    </Router>
  </div>
);

export default App;
