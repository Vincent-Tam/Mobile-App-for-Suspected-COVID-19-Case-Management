import i18n from 'i18next'
import * as Localization from 'expo-localization'
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';
import { en, zh } from './languages'

/* const systemLanguage = Localization.locale;
if(systemLanguage) {
    i18n.locale = systemLanguage;
} else {
    i18n.locale = 'en';
} */

const resources = {
    en: {
        translation: en,
    },
    zh: {
        translation: zh,
    }
};

i18n
    // .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        debug: true,
        fallbackLng: ['en','zh'],
        compatibilityJSON: 'v3',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
