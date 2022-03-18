import * as React from 'react';
import { useState } from 'react';
import '../styles/elements/button.scss';

const ConnectionButton: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  function connection() {
    console.log('connection', isConnected);
    setName('Toto ');
    setIsConnected(true);
  }

  function deconnection() {
    console.log('disconnection', isConnected);
    setName('');
    setIsConnected(false);
  }

  return (
    <>
      <button type="button" className="myButton" onClick={!isConnected ? connection : deconnection}>
        {isConnected ? 'Déconnexion' : 'Connexion'}
      </button>
      <p>{name}</p>
    </>
  );
};

export default ConnectionButton;
