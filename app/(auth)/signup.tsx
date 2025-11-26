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
import { colors, typography, spacing } from '../../theme';
import { validateEmail, validatePassword } from '../../utils/validators';

export default function SignupScreen() {
    const router = useRouter();
    const { t } = useLanguage();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSignup = async () => {
        // Validate inputs
        const newErrors = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        };

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
        }

        const passwordValidation = validatePassword(password);
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.message;
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error !== '')) {
            return;
        }

        if (!agreeToTerms) {
            Alert.alert('Terms & Conditions', 'Please agree to the terms and conditions');
            return;
        }

        setLoading(true);

        // TODO: Implement actual signup
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Account created successfully!', [
                { text: 'OK', onPress: () => router.replace('/(tabs)') }
            ]);
        }, 1500);
    };

    const handleGoogleSignUp = () => {
        Alert.alert('Google Sign Up', 'Google OAuth will be implemented');
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
                    {/* Back Button */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>{t('auth.createAccount')}</Text>
                        <Text style={styles.subtitle}>
                            Join Uangku and start managing your finances
                        </Text>
                    </View>

                    {/* Signup Form */}
                    <GlassCard style={styles.formCard}>
                        <CustomInput
                            label={t('auth.name')}
                            placeholder="John Doe"
                            value={name}
                            onChangeText={setName}
                            icon="person-outline"
                            error={errors.name}
                        />

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

                        <CustomInput
                            label={t('auth.confirmPassword')}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            isPassword
                            icon="lock-closed-outline"
                            error={errors.confirmPassword}
                        />

                        {/* Terms Checkbox */}
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => setAgreeToTerms(!agreeToTerms)}
                        >
                            <View style={[
                                styles.checkbox,
                                agreeToTerms && styles.checkboxChecked
                            ]}>
                                {agreeToTerms && (
                                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                                )}
                            </View>
                            <Text style={styles.checkboxText}>
                                {t('auth.termsAgree')}
                            </Text>
                        </TouchableOpacity>

                        <GradientButton
                            title={t('auth.signup')}
                            onPress={handleSignup}
                            loading={loading}
                            size="large"
                            style={styles.signupButton}
                        />
                    </GlassCard>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Social Signup */}
                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={handleGoogleSignUp}
                    >
                        <GlassCard style={styles.socialButtonCard}>
                            <Ionicons name="logo-google" size={24} color="#FFFFFF" />
                            <Text style={styles.socialButtonText}>
                                Sign up with Google
                            </Text>
                        </GlassCard>
                    </TouchableOpacity>

                    {/* Login Link */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>
                            {t('auth.alreadyHaveAccount')}{' '}
                        </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.loginLink}>{t('auth.login')}</Text>
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
        paddingTop: 60,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    header: {
        marginBottom: spacing['2xl'],
    },
    title: {
        fontSize: typography.fontSize['4xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
        marginBottom: spacing.sm,
    },
    subtitle: {
        fontSize: typography.fontSize.base,
        color: 'rgba(255,255,255,0.9)',
    },
    formCard: {
        padding: spacing.xl,
        marginBottom: spacing.xl,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
        marginTop: spacing.sm,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.5)',
        marginRight: spacing.sm,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: colors.primary.purple,
        borderColor: colors.primary.purple,
    },
    checkboxText: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.sm,
        flex: 1,
    },
    signupButton: {
        marginTop: spacing.base,
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
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.base,
    },
    loginText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: typography.fontSize.base,
    },
    loginLink: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.bold,
        textDecorationLine: 'underline',
    },
});
