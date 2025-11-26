import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorScheme, getThemeColors } from '../theme';

interface ThemeContextType {
    colorScheme: ColorScheme;
    toggleTheme: () => void;
    isDark: boolean;
    colors: ReturnType<typeof getThemeColors>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@uangku_theme';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        systemColorScheme === 'dark' ? 'dark' : 'light'
    );

    // Load saved theme preference
    useEffect(() => {
        loadThemePreference();
    }, []);

    const loadThemePreference = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme === 'light' || savedTheme === 'dark') {
                setColorScheme(savedTheme);
            }
        } catch (error) {
            console.error('Error loading theme preference:', error);
        }
    };

    const toggleTheme = async () => {
        const newScheme: ColorScheme = colorScheme === 'light' ? 'dark' : 'light';
        setColorScheme(newScheme);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newScheme);
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    };

    const value: ThemeContextType = {
        colorScheme,
        toggleTheme,
        isDark: colorScheme === 'dark',
        colors: getThemeColors(colorScheme),
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
