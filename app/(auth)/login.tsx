import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../../components/ui/GlassCard';
import { CustomInput } from '../../components/ui/CustomInput';
import { GradientButton } from '../../components/ui/GradientButton';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, typography, spacing } from '../../theme';
import { validateEmail } from '../../utils/validators';

export default function LoginScreen() {
    const router = useRouter();
    const { t } = useLanguage();
    const { colors: themeColors } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleLogin = async () => {
        // Validate inputs
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        if (newErrors.email || newErrors.password) {
            return;
        }

        setLoading(true);

        // TODO: Implement actual authentication
        setTimeout(() => {
            setLoading(false);
            router.replace('/(tabs)');
        }, 1500);
    };

    const handleBiometric = async () => {
        Alert.alert('Biometric Auth', 'Biometric authentication will be implemented');
    };

    const handleGoogleSignIn = () => {
        Alert.alert('Google Sign In', 'Google OAuth will be implemented');
    };

    return (
        <LinearGradient
            colors={colors.gradients.primary}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Logo/Title */}
                    <View style={styles.header}>
                        <Text style={styles.appName}>{t('common.appName')}</Text>
                        <Text style={styles.subtitle}>{t('auth.login')}</Text>
                    </View>

                    {/* Login Form */}
                    <GlassCard style={styles.formCard}>
                        <CustomInput
                            label={t('auth.email')}
                            placeholder="your@email.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            icon="mail-outline"
                            error={errors.email}
                        />

                        <CustomInput
                            label={t('auth.password')}
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            isPassword
                            icon="lock-closed-outline"
                            error={errors.password}
                        />

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>
                                {t('auth.forgotPassword')}
                            </Text>
                        </TouchableOpacity>

                        <GradientButton
                            title={t('auth.login')}
                            onPress={handleLogin}
                            loading={loading}
                            size="large"
                            style={styles.loginButton}
                        />

                        {/* Biometric Login */}
                        <TouchableOpacity
                            style={styles.biometricButton}
                            onPress={handleBiometric}
                        >
                            <Ionicons name="finger-print" size={24} color="#FFFFFF" />
                            <Text style={styles.biometricText}>
                                {t('auth.useBiometric')}
                            </Text>
                        </TouchableOpacity>
                    </GlassCard>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Social Login */}
                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={handleGoogleSignIn}
                    >
                        <GlassCard style={styles.socialButtonCard}>
                            <Ionicons name="logo-google" size={24} color="#FFFFFF" />
                            <Text style={styles.socialButtonText}>
                                {t('auth.signInWithGoogle')}
                            </Text>
                        </GlassCard>
                    </TouchableOpacity>

                    {/* Sign Up Link */}
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>
                            {t('auth.dontHaveAccount')}{' '}
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                            <Text style={styles.signupLink}>{t('auth.signup')}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: spacing['2xl'],
        paddingTop: 80,
    },
    header: {
        marginBottom: spacing['3xl'],
        alignItems: 'center',
    },
    appName: {
        fontSize: typography.fontSize['5xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
        marginBottom: spacing.sm,
    },
    subtitle: {
        fontSize: typography.fontSize.xl,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: typography.fontWeight.medium,
    },
    formCard: {
        padding: spacing.xl,
        marginBottom: spacing.xl,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: spacing.lg,
    },
    forgotPasswordText: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
    },
    loginButton: {
        marginBottom: spacing.base,
    },
    biometricButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        paddingVertical: spacing.base,
    },
    biometricText: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.medium,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.xl,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    dividerText: {
        color: 'rgba(255,255,255,0.7)',
        paddingHorizontal: spacing.base,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
    },
    socialButton: {
        marginBottom: spacing.xl,
    },
    socialButtonCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.base,
        padding: spacing.base,
    },
    socialButtonText: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.base,
    },
    signupText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: typography.fontSize.base,
    },
    signupLink: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.bold,
        textDecorationLine: 'underline',
    },
});
