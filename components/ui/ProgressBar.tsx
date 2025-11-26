import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, spacing, borderRadius, typography } from '../../theme';

interface ProgressBarProps {
    progress: number; // 0 to 100
    height?: number;
    showLabel?: boolean;
    label?: string;
    gradientColors?: string[];
    backgroundColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    height = 8,
    showLabel = false,
    label,
    gradientColors = colors.gradients.purplePink,
    backgroundColor,
}) => {
    const { colors: themeColors } = useTheme();
    const progressValue = useSharedValue(0);

    useEffect(() => {
        progressValue.value = withTiming(Math.min(Math.max(progress, 0), 100), {
            duration: 800,
        });
    }, [progress]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${progressValue.value}%`,
    }));

    return (
        <View style={styles.container}>
            {showLabel && label && (
                <View style={styles.labelContainer}>
                    <Text style={[styles.label, { color: themeColors.text }]}>
                        {label}
                    </Text>
                    <Text style={[styles.percentage, { color: themeColors.textSecondary }]}>
                        {Math.round(progress)}%
                    </Text>
                </View>
            )}
            <View
                style={[
                    styles.track,
                    {
                        height,
                        backgroundColor: backgroundColor || themeColors.border,
                        borderRadius: height / 2,
                    },
                ]}
            >
                <Animated.View style={[styles.progressContainer, animatedStyle]}>
                    <LinearGradient
                        colors={gradientColors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[
                            styles.progress,
                            {
                                height,
                                borderRadius: height / 2,
                            },
                        ]}
                    />
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    label: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
    },
    percentage: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
    },
    track: {
        width: '100%',
        overflow: 'hidden',
    },
    progressContainer: {
        height: '100%',
    },
    progress: {
        width: '100%',
    },
});
