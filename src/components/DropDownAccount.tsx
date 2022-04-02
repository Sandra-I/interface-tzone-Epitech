import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '../models/user';
import '../styles/elements/button.scss';
import AccountButton from './AccountButton';
import AuthButton from './AuthButton';

const DropDownAccount: React.FC<{setUser: Function, user: User}> = ({ setUser, user }) => {
  function showAccount() {
    const url = 'https://main.deqtbus9d66sw.amplifyapp.com/account';
    const token = localStorage.getItem('token');
    window.open(`${url}?token=${token}`, '_blank');
  }

  const { t } = useTranslation();

  return (
    <div className="dropdown">
      <AccountButton name={user.firstName} />
      <div className="dropdown-content">
        <button type="button" className="myButton" onClick={showAccount}>{t('seeProfile')}</button>
        <AuthButton setUser={setUser} />
      </div>
    </div>
  );
};

export default DropDownAccount;
