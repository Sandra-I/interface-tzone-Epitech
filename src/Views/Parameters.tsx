import * as React from "react";
import "../App.scss";
import SwitchCheckbox from "../components/SwitchCheckbox";

const Parameters = () => {

    return (
        <>
            <h3>Paramètres</h3>
            <div className="Params">
                <SwitchCheckbox/>
                <div className="shortCut">
                    <span>Raccourci clavier avec option</span>
                    <span className="short">Ctrl + Shift + K</span>
                </div>
                <div className="shortCut">
                    <span>Raccourci clavier sans option</span>
                    <span className="short">Ctrl + Shift + I</span>
                </div>
            </div>
            <button>Historique</button>
            <br/>
            <button>Deconnexion</button>
        </>
    );
};
export default Parameters;
