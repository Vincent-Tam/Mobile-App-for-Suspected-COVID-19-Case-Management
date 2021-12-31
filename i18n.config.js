import i18n from 'i18next'
import * as Localization from 'expo-localization'
import { initReactI18next } from 'react-i18next';
import { en, zh } from './languages'
  
const resources = {
    en: {
        translation: en,
    },
    zh: {
        translation: zh,
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: Localization.locale,
        debug: true,
        fallbackLng: 'en',
        compatibilityJSON: 'v3',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
