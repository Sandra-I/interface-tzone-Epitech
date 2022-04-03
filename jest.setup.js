Object.assign(global, require('jest-chrome'));

jest.mock('react-i18next', () => ({
  initReactI18next: { type: '3rdParty', init: jest.fn() },
  useTranslation: () => ({ t: (key) => key, i18n: { changeLanguage: (key) => key } }),
  Trans: ({ children }) => children,
}));
