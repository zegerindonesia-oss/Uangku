import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../ui/GlassCard';
import { ProgressBar } from '../ui/ProgressBar';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface BudgetCardProps {
    name: string;
    amount: number;
    spent: number;
    categoryIcon: keyof typeof Ionicons.glyphMap;
    categoryColor: string;
    onPress: () => void;
}

export function BudgetCard({
    name,
    amount,
    spent,
    categoryIcon,
    categoryColor,
    onPress,
}: BudgetCardProps) {
    const percentage = Math.min((spent / amount) * 100, 100);
    const remaining = Math.max(amount - spent, 0);

    // Determine status color
    let statusColor = '#10B981'; // Green (Safe)
    if (percentage >= 100) {
        statusColor = '#EF4444'; // Red (Exceeded)
    } else if (percentage >= 80) {
        statusColor = '#F59E0B'; // Orange (Warning)
    }

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <GlassCard style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.categoryInfo}>
                        <View style={[styles.iconContainer, { backgroundColor: categoryColor + '20' }]}>
                            <Ionicons name={categoryIcon} size={20} color={categoryColor} />
                        </View>
                        <View>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.remaining}>
                                {formatCurrency(remaining)} remaining
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.percentage, { color: statusColor }]}>
                        {formatPercentage(percentage)}
                    </Text>
                </View>

                <View style={styles.progressContainer}>
                    <ProgressBar
                        progress={percentage / 100}
                        color={statusColor}
                        height={8}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.spentText}>
                        {formatCurrency(spent)} spent
                    </Text>
                    <Text style={styles.limitText}>
                        of {formatCurrency(amount)}
                    </Text>
                </View>
            </GlassCard>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: spacing.base,
        marginBottom: spacing.base,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.base,
    },
    categoryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        color: '#FFFFFF',
    },
    remaining: {
        fontSize: typography.fontSize.xs,
        color: 'rgba(255,255,255,0.6)',
    },
    percentage: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
    },
    progressContainer: {
        marginBottom: spacing.sm,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    spentText: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
        color: '#FFFFFF',
    },
    limitText: {
        fontSize: typography.fontSize.sm,
        color: 'rgba(255,255,255,0.5)',
    },
});
