import * as React from 'react';
import '../styles/elements/button.scss';

const AuthButton: React.FC<{onClick: any, isAuthenticated: boolean}> = ({ onClick, isAuthenticated = false }) => (
  <>
    <button type="button" className="myButton" onClick={onClick}>
      {!isAuthenticated ? 'Connexion' : 'Déconnexion'}
    </button>
  </>
);

export default AuthButton;
