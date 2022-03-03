import * as React from 'react';
import '../App.scss';
import SwitchCheckbox from '../components/SwitchCheckbox';
import Translate from '../components/Translate';

const Parameters = () => (
  <>
    <h3 className="tz-title">Paramètres</h3>
    <div className="params tz-small-text">
      <SwitchCheckbox />
      <Translate />
      <div>
        <span>Raccourci clavier récupération :</span>
        <span className="short">ALT + S</span>
      </div>
    </div>
    {/* <Link to="/history"><button>Historique</button></Link>
            <br/>
            <button>Deconnexion</button> */}
  </>
);
export default Parameters;
