import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Select, { MultiValue, PropsValue } from 'react-select';

import AvailableLanguages from '../i18n/I18nInit';

export interface LangOption {
    readonly value: string;
    readonly label: string;
}

const LanguageSelection: React.FC = () => {
  const { t, i18n } = useTranslation();

  let currentLang = localStorage.getItem('lang');
  if (!currentLang) currentLang = 'fr';

  const value: PropsValue<LangOption> = { value: currentLang, label: currentLang.toUpperCase() };
  const multiValue: MultiValue<LangOption> = AvailableLanguages.LANGS.map((lang) => (
    { value: lang, label: lang.toUpperCase() }));

  const labelFormat = (langOpt: LangOption) => (
    <div style={{ color: 'white' }}>
      <img
        style={{ float: 'left', paddingRight: '5px' }}
        width="23"
        height="23"
        src={`/assets/icons/${langOpt.value}_flag.png`}
        alt={t(langOpt.label)}
      />
      <label htmlFor="langSelector">{t(langOpt.label)}</label>
    </div>
  );

  return (
    <div style={{ width: '82px' }}>
      <Select
        id="langSelector"
        theme={(theme) => ({
          ...theme,
          color: 'white',
          colors: {
            ...theme.colors,
            neutral0: 'var(--font_color)',
            primary25: 'var(--blue)',
            primary: 'var(--font_color_greyed)',
            neutral20: 'var(--middle_grey)',
            neutral40: 'var(--dark_grey_opac)',
          },
        })}
        defaultValue={value}
        options={multiValue}
        formatOptionLabel={labelFormat}
        onChange={
                (newValue) => {
                  if (newValue) {
                    i18n.changeLanguage(newValue.value);
                    localStorage.setItem('lang', newValue.value);
                  }
                }
            }
      />
    </div>
  );
};

export default LanguageSelection;
