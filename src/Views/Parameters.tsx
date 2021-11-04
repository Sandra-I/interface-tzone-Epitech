import * as React from "react";
import "../App.scss";
import {SwitchCheckbox} from "../components/SwitchCheckbox";
import Translate from "../components/Translate";

const Parameters = () => {

    return (
        <>
            <h3 className="tz-title">Paramètres</h3>
            <div className="Params tz-small-text">
                <SwitchCheckbox/>
                <Translate/>
                <div>
                    <span>Raccourci clavier avec option</span>
                    <span className="short">Ctrl + Shift + K</span>
                </div>
                <div>
                    <span>Raccourci clavier sans option</span>
                    <span className="short">Ctrl + Shift + I</span>
                </div>
            </div>
            {/* <Link to="/history"><button>Historique</button></Link>
            <br/>
            <button>Deconnexion</button> */}
        </>
    );
};
export default Parameters;
