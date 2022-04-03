import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Options } from '../models/options';
import OptionsService from '../utils/optionsService';
import './Translate.scss';

type LangueAvailable = { [key: string]: string };

const Translate: React.FC = () => {
  const langueAvailable: LangueAvailable = {
    Aucun: '',
    France: 'FR',
    German: 'DE',
    American: 'EN-US',
    British: 'EN-GB',
    Spain: 'ES',
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [options, setOptions] = useState<Options>();

  useEffect(() => {
    const optionsString = localStorage.getItem('options');
    if (optionsString) {
      setOptions(JSON.parse(optionsString));
    } else {
      setOptions(OptionsService.defaultOptions);
    }
    setLoading(false);
  }, []);

  function handleSubmit(e: React.ChangeEvent<HTMLSelectElement>) {
    /** Use to keep the event during tests */
    e.persist();
    OptionsService.getOptions().then((_options) => {
      OptionsService.updateOptions({ ..._options, translateLanguage: e.target.value || null });
    });
  }

  const { t } = useTranslation();

  return (
    <div>
      {!loading && (
        <label id="translatedLangSelectorLabel" htmlFor="translatedLangSelector">
          {t('translateInto')}
          {' '}
          :
          <select id="translatedLangSelector" onChange={handleSubmit} defaultValue={options?.translateLanguage || ''}>
            {Object.keys(langueAvailable).map(
              (key) => <option key={key} value={langueAvailable[key]}>{key}</option>,
            )}
          </select>
        </label>
      )}
    </div>
  );
};

export default Translate;
