import { Stack } from 'expo-router';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import '../locales/i18n';
import { useEffect } from 'react';
import { initializeDatabase } from '../services/database/client';

export default function RootLayout() {
    useEffect(() => {
        // Initialize database on app start
        initializeDatabase().catch(console.error);
    }, []);

    return (
        <ThemeProvider>
            <LanguageProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(auth)" />
                    <Stack.Screen name="(tabs)" />
                </Stack>
            </LanguageProvider>
        </ThemeProvider>
    );
}
