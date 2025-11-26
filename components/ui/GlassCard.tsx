import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../contexts/ThemeContext';
import { borderRadius, shadows, spacing } from '../../theme';

interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    intensity?: number;
    padding?: keyof typeof spacing;
    borderRadiusSize?: keyof typeof borderRadius;
    withShadow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    style,
    intensity = 20,
    padding = 'base',
    borderRadiusSize = 'xl',
    withShadow = true,
}) => {
    const { isDark, colors } = useTheme();

    return (
        <View
            style={[
                styles.container,
                {
                    borderRadius: borderRadius[borderRadiusSize],
                    backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                },
                withShadow && shadows.md,
                style,
            ]}
        >
            <BlurView
                intensity={intensity}
                tint={isDark ? 'dark' : 'light'}
                style={[
                    styles.blurView,
                    {
                        borderRadius: borderRadius[borderRadiusSize],
                        padding: spacing[padding],
                    },
                ]}
            >
                {children}
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderWidth: 1,
    },
    blurView: {
        overflow: 'hidden',
    },
});
