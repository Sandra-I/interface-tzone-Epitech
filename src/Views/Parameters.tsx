import * as React from "react";
import "../App.scss";
import SwitchCheckbox from "../components/SwitchCheckbox";
import {Link} from "react-router-dom";
const Parameters = () => {

    return (
        <>
            <h3>Paramètres</h3>
            <div className="Params">
                <SwitchCheckbox/>
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
