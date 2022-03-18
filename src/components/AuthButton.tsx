import * as React from 'react';
import { useState } from 'react';
import '../styles/elements/button.scss';

const AuthButton: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  function login() {
    setName('Toto ');
    setIsAuthenticated(true);
  }

  function logout() {
    setName('');
    setIsAuthenticated(false);
  }

  return (
    <>
      <button type="button" className="myButton" onClick={!isAuthenticated ? login : logout}>
        {isAuthenticated ? 'Déconnexion' : 'Connexion'}
      </button>
      <p>{name}</p>
    </>
  );
};

export default AuthButton;
