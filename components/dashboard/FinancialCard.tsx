import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../ui/GlassCard';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface FinancialCardProps {
    title: string;
    amount: number;
    icon: keyof typeof Ionicons.glyphMap;
    iconColor: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

export function FinancialCard({ title, amount, icon, iconColor, trend }: FinancialCardProps) {
    return (
        <GlassCard style={styles.card}>
            <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
                    <Ionicons name={icon} size={24} color={iconColor} />
                </View>
                {trend && (
                    <View style={styles.trendContainer}>
                        <Ionicons
                            name={trend.isPositive ? 'trending-up' : 'trending-down'}
                            size={16}
                            color={trend.isPositive ? '#10B981' : '#EF4444'}
                        />
                        <Text
                            style={[
                                styles.trendText,
                                { color: trend.isPositive ? '#10B981' : '#EF4444' },
                            ]}
                        >
                            {trend.value}%
                        </Text>
                    </View>
                )}
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.amount}>{formatCurrency(amount)}</Text>
        </GlassCard>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: spacing.base,
        minHeight: 120,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    trendText: {
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.semibold,
    },
    title: {
        fontSize: typography.fontSize.sm,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: spacing.xs,
    },
    amount: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
});
