import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../ui/GlassCard';
import { ProgressBar } from '../ui/ProgressBar';
import { Icon, IconName } from '../ui/Icon';
import { typography, spacing } from '../../theme';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface GoalCardProps {
    name: string;
    targetAmount: number;
    currentAmount: number;
    icon: IconName;
    color: string;
    deadline?: Date;
}

export function GoalCard({
    name,
    targetAmount,
    currentAmount,
    icon,
    color,
    deadline,
}: GoalCardProps) {
    const progress = Math.min(currentAmount / targetAmount, 1);

    return (
        <GlassCard style={styles.container}>
            <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
                    <Icon name={icon} size={24} color={color} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.name}>{name}</Text>
                    {deadline && (
                        <Text style={styles.deadline}>
                            Target: {deadline.toLocaleDateString()}
                        </Text>
                    )}
                </View>
                <Text style={styles.percentage}>{formatPercentage(progress * 100, 0)}</Text>
            </View>

            <View style={styles.progressContainer}>
                <ProgressBar progress={progress * 100} gradientColors={[color, color]} height={8} />
            </View>

            <View style={styles.footer}>
                <Text style={styles.amount}>{formatCurrency(currentAmount)}</Text>
                <Text style={styles.target}>of {formatCurrency(targetAmount)}</Text>
            </View>
        </GlassCard>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.base,
        marginBottom: spacing.base,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
    },
    titleContainer: {
        flex: 1,
    },
    name: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    deadline: {
        fontSize: typography.fontSize.xs,
        color: 'rgba(255, 255, 255, 0.6)',
    },
    percentage: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    progressContainer: {
        marginBottom: spacing.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amount: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    target: {
        fontSize: typography.fontSize.xs,
        color: 'rgba(255, 255, 255, 0.6)',
    },
});
