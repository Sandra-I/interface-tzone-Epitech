import * as React from 'react';
import { useTranslation } from 'react-i18next';

const Result: React.FC<{text: string, /** translatedText: string, translatLanguage: string */ }> = ({ text }) => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('result')}</h1>
      <div className="tz-small-text">
        <div>
          <span>
            {t('mainText')}
            {' '}
            :
          </span>
          <span>{text}</span>
        </div>
      </div>
    </>
  );
};

export default Result;
