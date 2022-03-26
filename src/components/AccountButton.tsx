import * as React from 'react';
import '../styles/elements/button.scss';

const AccountButton: React.FC<{name: string}> = ({ name }) => {
  function showAccount() {
    console.warn('Account button');
  }

  return (
    <>
      <div role="button" className="accountButton" onClick={showAccount} onKeyUp={showAccount} tabIndex={0}>
        <p>
          <a href="https://main.deqtbus9d66sw.amplifyapp.com/login" target="_blank" rel="noreferrer">
            {name.toUpperCase()}
          </a>
        </p>
      </div>
    </>
  );
};

export default AccountButton;
