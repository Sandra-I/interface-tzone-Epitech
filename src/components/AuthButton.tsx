import * as React from 'react';
import UserService from '../services/user-service';
import '../styles/elements/button.scss';

const AuthButton: React.FC<{setUser: Function}> = ({ setUser }) => {
  function login() {
    UserService.getGoogleConnexion(setUser);
  }

  function logout() {
    UserService.logout(setUser);
  }

  return (
    <>
      <button type="button" className="myButton" onClick={UserService.user ? logout : login}>
        {!UserService.user ? 'Connexion' : 'Déconnexion'}
      </button>
    </>
  );
};

export default AuthButton;
