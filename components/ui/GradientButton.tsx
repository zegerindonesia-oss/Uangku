import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, typography, borderRadius, shadows } from '../../theme';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface GradientButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    gradientColors?: string[];
    disabled?: boolean;
    loading?: boolean;
    size?: 'small' | 'medium' | 'large';
}

export const GradientButton: React.FC<GradientButtonProps> = ({
    title,
    onPress,
    style,
    textStyle,
    gradientColors = colors.gradients.purplePink,
    disabled = false,
    loading = false,
    size = 'medium',
}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.95);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const sizeStyles = {
        small: {
            height: 40,
            paddingHorizontal: 16,
        },
        medium: {
            height: 52,
            paddingHorizontal: 24,
        },
        large: {
            height: 60,
            paddingHorizontal: 32,
        },
    };

    const textSizeStyles = {
        small: typography.styles.buttonSmall,
        medium: typography.styles.button,
        large: { ...typography.styles.button, fontSize: 18 },
    };

    return (
        <AnimatedTouchable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled || loading}
            style={[animatedStyle, style]}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={disabled ? ['#9CA3AF', '#6B7280'] : gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                    styles.gradient,
                    sizeStyles[size],
                    shadows.md,
                ]}
            >
                {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={[styles.text, textSizeStyles[size], textStyle]}>
                        {title}
                    </Text>
                )}
            </LinearGradient>
        </AnimatedTouchable>
    );
};

const styles = StyleSheet.create({
    gradient: {
        borderRadius: borderRadius.xl,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        color: '#FFFFFF',
        fontWeight: typography.fontWeight.semibold,
    },
});
