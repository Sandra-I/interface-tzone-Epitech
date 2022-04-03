import * as React from 'react';
import { useTranslation } from 'react-i18next';
import UserService from '../services/user-service';
import '../styles/elements/button.scss';

const AuthButton: React.FC<{setUser: Function}> = ({ setUser }) => {
  const { t } = useTranslation();
  function login() {
    UserService.getGoogleConnexion(setUser);
  }

  function logout() {
    UserService.logout(setUser);
  }

  return (
    <>
      <button id="auth_button" type="button" className="myButton" onClick={UserService.user ? logout : login}>
        {!UserService.user ? t('login') : t('logout')}
      </button>
    </>
  );
};

export default AuthButton;
