import * as React from 'react';
import '../styles/elements/button.scss';

const AccountButton: React.FC<{name: string}> = ({ name }) => {
  function showAccount() {
    const url = 'https://main.deqtbus9d66sw.amplifyapp.com/account';
    const token = localStorage.getItem('token');
    window.open(`${url}?token=${token}`, '_blank');
  }

  return (
    <div role="button" className="accountButton" onClick={showAccount} onKeyUp={showAccount} tabIndex={0}>
      <p>{name.substring(0, 2).toUpperCase()}</p>
    </div>
  );
};

export default AccountButton;
