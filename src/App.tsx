import * as React from "react";
import Parameters from "./Views/Parameters";
import "./App.scss"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
// import History from "./Views/History";

const App = () => {
    return (
        <Router>
            <div className="App">
                <div className="App-header">
                    <Switch>
                        <Route path="/popup.html">
                            <Parameters/>
                        </Route>
                        {/* <Route path="/history">
                            <History/>
                        </Route> */}
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
