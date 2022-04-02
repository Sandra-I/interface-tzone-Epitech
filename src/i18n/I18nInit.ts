import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as enTranslation from './langs/en.json';
import * as frTranslation from './langs/fr.json';

let storageLang = localStorage.getItem('lang');
if (!storageLang) storageLang = 'fr';

const languageRessources = {
  fr: {
    translation: frTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

const AvailableLanguages = class AvailableLanguages {
  static readonly LANGS = Object.keys(languageRessources)
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: languageRessources,
    lng: storageLang, // if you're using a language detector, do not define the lng option
    fallbackLng: storageLang,

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default AvailableLanguages;
