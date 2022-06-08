import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import resources from './resources';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: import.meta.env.VITE_DEFAULT_LANGUAGE ?? 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {},
  });

export default i18n;
