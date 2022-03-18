import * as React from 'react';
// import { Link } from 'react-router-dom';
import SwitchCheckbox from '../components/SwitchCheckbox';
import Translate from '../components/Translate';

const Parameters = () => (
  <div className="card">
    <h1>Paramètres</h1>
    <div className="params">
      <SwitchCheckbox />
      <Translate />
      <div>
        <span>Raccourci clavier récupération :</span>
        <span className="short">ALT + S</span>
      </div>
    </div>
    {/* <Link to="/history"><button>Historique</button></Link> */}
    {/* <br /> */}
  </div>
);
export default Parameters;
