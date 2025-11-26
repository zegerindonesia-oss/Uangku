import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'en' | 'id';

interface LanguageContextType {
    language: Language;
    changeLanguage: (lang: Language) => Promise<void>;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = '@uangku_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { i18n, t } = useTranslation();
    const [language, setLanguage] = useState<Language>(
        i18n.language as Language
    );

    useEffect(() => {
        loadLanguagePreference();
    }, []);

    const loadLanguagePreference = async () => {
        try {
            const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
            if (savedLanguage === 'en' || savedLanguage === 'id') {
                setLanguage(savedLanguage);
                i18n.changeLanguage(savedLanguage);
            }
        } catch (error) {
            console.error('Error loading language preference:', error);
        }
    };

    const changeLanguage = async (lang: Language) => {
        try {
            await i18n.changeLanguage(lang);
            setLanguage(lang);
            await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        } catch (error) {
            console.error('Error changing language:', error);
        }
    };

    const value: LanguageContextType = {
        language,
        changeLanguage,
        t,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};
