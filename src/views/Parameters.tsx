import * as React from 'react';
import { useTranslation } from 'react-i18next';
import SwitchCheckbox from '../components/SwitchCheckbox';
import Translate from '../components/Translate';
import { User } from '../models/user';

const Parameters: React.FC<{user: User}> = ({ user }) => {
  const { t } = useTranslation();

  return (
    <div className="card">
      <h1>{t('parameters')}</h1>
      <div className="params">
        <SwitchCheckbox />
        { user?.permissions.translation && <Translate /> }
        <div>
          <span>
            {t('keyShortcutScreenshot')}
            {' '}
            :
          </span>
          <span className="short">ALT + S</span>
        </div>
      </div>
    </div>
  );
};

export default Parameters;
