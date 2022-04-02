import * as React from 'react';
import { useTranslation } from 'react-i18next';
import UserService from '../services/user-service';
import '../styles/elements/button.scss';

const AuthButton: React.FC<{setUser: Function}> = ({ setUser }) => {
  function login() {
    UserService.getGoogleConnexion(setUser);
  }

  function logout() {
    UserService.logout(setUser);
  }

  const { t } = useTranslation();

  return (
    <>
      <button type="button" className="myButton" onClick={UserService.user ? logout : login}>
        {!UserService.user ? t('login') : t('logout')}
      </button>
    </>
  );
};

export default AuthButton;
