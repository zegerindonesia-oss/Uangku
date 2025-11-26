import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { spacing, borderRadius, typography } from '../../theme';

interface CustomInputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    isPassword?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
    label,
    error,
    icon,
    isPassword = false,
    style,
    ...props
}) => {
    const { colors, isDark } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {label && (
                <Text style={[styles.label, { color: colors.text }]}>
                    {label}
                </Text>
            )}
            <View
                style={[
                    styles.inputContainer,
                    {
                        backgroundColor: colors.card,
                        borderColor: isFocused
                            ? '#8B5CF6'
                            : error
                                ? '#EF4444'
                                : colors.border,
                    },
                    isFocused && styles.inputFocused,
                ]}
            >
                {icon && (
                    <Ionicons
                        name={icon}
                        size={20}
                        color={isFocused ? '#8B5CF6' : colors.textSecondary}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    {...props}
                    secureTextEntry={isPassword && !showPassword}
                    style={[
                        styles.input,
                        { color: colors.text },
                        icon && styles.inputWithIcon,
                        style,
                    ]}
                    placeholderTextColor={colors.textTertiary}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={colors.textSecondary}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && (
                <Text style={styles.error}>{error}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.base,
    },
    label: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
        marginBottom: spacing.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: borderRadius.lg,
        borderWidth: 1.5,
        paddingHorizontal: spacing.base,
        height: 52,
    },
    inputFocused: {
        borderWidth: 2,
    },
    input: {
        flex: 1,
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.regular,
    },
    inputWithIcon: {
        marginLeft: spacing.sm,
    },
    icon: {
        marginRight: 0,
    },
    eyeIcon: {
        padding: spacing.sm,
    },
    error: {
        color: '#EF4444',
        fontSize: typography.fontSize.sm,
        marginTop: spacing.xs,
        marginLeft: spacing.xs,
    },
});
