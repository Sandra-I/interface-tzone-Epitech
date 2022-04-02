import * as React from 'react';
import '../styles/elements/button.scss';
import { useTranslation } from 'react-i18next';

const AuthButton: React.FC<{onClick: any, isAuthenticated: boolean}> = ({ onClick, isAuthenticated = false }) => {
  const { t } = useTranslation();

  return (
    <>
      <button type="button" className="myButton" onClick={onClick}>
        {!isAuthenticated ? t('login') : t('logout')}
      </button>
    </>
  );
};

export default AuthButton;
