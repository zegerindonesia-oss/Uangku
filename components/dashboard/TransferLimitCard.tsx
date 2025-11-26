import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { GlassCard } from '../ui/GlassCard';
import { typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface TransferLimitCardProps {
    currentAmount: number;
    limitAmount: number;
}

export function TransferLimitCard({ currentAmount, limitAmount }: TransferLimitCardProps) {
    const percentage = Math.min(currentAmount / limitAmount, 1);
    const data = {
        data: [percentage]
    };

    return (
        <GlassCard style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Monthly Limit</Text>
                <Text style={styles.percentage}>{Math.round(percentage * 100)}%</Text>
            </View>

            <View style={styles.content}>
                <ProgressChart
                    data={data}
                    width={120}
                    height={120}
                    strokeWidth={12}
                    radius={40}
                    chartConfig={{
                        backgroundGradientFrom: '#1E2923',
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: '#08130D',
                        backgroundGradientToOpacity: 0,
                        color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`, // Purple
                        strokeWidth: 2,
                    }}
                    hideLegend={true}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.amount}>{formatCurrency(currentAmount)}</Text>
                    <Text style={styles.limit}>of {formatCurrency(limitAmount)}</Text>
                    <Text style={styles.subtitle}>Spent this month</Text>
                </View>
            </View>
        </GlassCard>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.base,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    title: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    percentage: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: spacing.base,
        flex: 1,
    },
    amount: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    limit: {
        fontSize: typography.fontSize.sm,
        color: 'rgba(255, 255, 255, 0.6)',
    },
    subtitle: {
        fontSize: typography.fontSize.xs,
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 4,
    },
});
