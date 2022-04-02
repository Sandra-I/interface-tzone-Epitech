import * as React from 'react';
// import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SwitchCheckbox from '../components/SwitchCheckbox';
import Translate from '../components/Translate';

const Parameters = () => {
  const { t } = useTranslation();
  return (
    <div className="card">
      <h1>{t('parameters')}</h1>
      <div className="params">
        <SwitchCheckbox />
        <Translate />
        <div>
          <span>
            {t('keyShortcutScreenshot')}
            {' '}
            :
          </span>
          <span className="short">ALT + S</span>
        </div>
      </div>
      {/* <Link to="/history"><button>Historique</button></Link> */}
      {/* <br /> */}
    </div>
  );
};

export default Parameters;
