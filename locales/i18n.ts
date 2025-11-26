import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import id from './id.json';

const LANGUAGE_STORAGE_KEY = '@uangku_language';

const resources = {
    en: { translation: en },
    id: { translation: id },
};

// Get device language
const deviceLanguage = Localization.locale.split('-')[0];

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: deviceLanguage === 'id' ? 'id' : 'en',
        fallbackLng: 'en',
        compatibilityJSON: 'v3',
        interpolation: {
            escapeValue: false,
        },
    });

// Load saved language preference
AsyncStorage.getItem(LANGUAGE_STORAGE_KEY).then((savedLanguage) => {
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'id')) {
        i18n.changeLanguage(savedLanguage);
    }
});

export default i18n;
