import * as React from 'react';
import { useEffect, useState } from 'react';
import { Options } from '../models/options';
import OptionsService from '../utils/optionsService';

type LangueAvailable = {[key: string]: string};

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
    OptionsService.getOptions().then((_options) => {
      setLoading(false);
      setOptions(_options);
    });
  }, []);

  function handleSubmit(e: React.ChangeEvent<HTMLSelectElement>) {
    OptionsService.getOptions().then((_options) => {
      OptionsService.updateOptions({ ..._options, translateLanguage: e.target.value || null });
    });
  }

  return (
    <div>
      <form className="form">
        {!loading && (
          <label htmlFor="langSelector">
            Traduire mon texte en :
            <select id="langSelector" onChange={handleSubmit} defaultValue={options?.translateLanguage || ''}>
              {Object.keys(langueAvailable).map(
                (key) => <option key={key} value={langueAvailable[key]}>{key}</option>,
              )}
            </select>
          </label>
        )}
      </form>
    </div>
  );
};

export default Translate;
