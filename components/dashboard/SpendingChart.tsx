import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { GlassCard } from '../ui/GlassCard';
import { typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

const screenWidth = Dimensions.get('window').width;

interface SpendingData {
    name: string;
    amount: number;
    color: string;
    legendFontColor?: string;
    legendFontSize?: number;
}

interface SpendingChartProps {
    data: SpendingData[];
    title?: string;
}

export function SpendingChart({ data, title = 'Spending by Category' }: SpendingChartProps) {
    // Transform data for PieChart
    const chartData = data.map(item => ({
        name: item.name,
        population: item.amount,
        color: item.color,
        legendFontColor: '#FFFFFF',
        legendFontSize: 12,
    }));

    const totalSpending = data.reduce((sum, item) => sum + item.amount, 0);

    return (
        <GlassCard style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {data.length > 0 ? (
                <>
                    <PieChart
                        data={chartData}
                        width={screenWidth - 80}
                        height={200}
                        chartConfig={{
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                        hasLegend={false}
                    />

                    {/* Custom Legend */}
                    <View style={styles.legendContainer}>
                        {data.slice(0, 5).map((item, index) => {
                            const percentage = ((item.amount / totalSpending) * 100).toFixed(1);
                            return (
                                <View key={index} style={styles.legendItem}>
                                    <View style={styles.legendLeft}>
                                        <View
                                            style={[
                                                styles.legendColor,
                                                { backgroundColor: item.color },
                                            ]}
                                        />
                                        <Text style={styles.legendName} numberOfLines={1}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View style={styles.legendRight}>
                                        <Text style={styles.legendPercentage}>{percentage}%</Text>
                                        <Text style={styles.legendAmount}>
                                            {formatCurrency(item.amount)}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </>
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No spending data available</Text>
                </View>
            )}
        </GlassCard>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.base,
    },
    title: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
        marginBottom: spacing.base,
    },
    legendContainer: {
        marginTop: spacing.base,
        gap: spacing.sm,
    },
    legendItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.xs,
    },
    legendLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: spacing.sm,
    },
    legendColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: spacing.sm,
    },
    legendName: {
        fontSize: typography.fontSize.sm,
        color: '#FFFFFF',
        flex: 1,
    },
    legendRight: {
        alignItems: 'flex-end',
    },
    legendPercentage: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
        color: '#FFFFFF',
    },
    legendAmount: {
        fontSize: typography.fontSize.xs,
        color: 'rgba(255,255,255,0.6)',
    },
    emptyState: {
        paddingVertical: spacing['2xl'],
        alignItems: 'center',
    },
    emptyText: {
        fontSize: typography.fontSize.base,
        color: 'rgba(255,255,255,0.5)',
    },
});
