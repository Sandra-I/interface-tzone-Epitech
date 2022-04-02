import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const History = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('history')}</h1>
      <Link to="/index.html"><button type="submit">{t('back')}</button></Link>
    </>
  );
};
export default History;
