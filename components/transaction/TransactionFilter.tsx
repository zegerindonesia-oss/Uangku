import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { GlassCard } from '../ui/GlassCard';
import { colors, typography, spacing } from '../../theme';

interface TransactionFilterProps {
    currentFilter: 'all' | 'income' | 'expense';
    onFilterChange: (filter: 'all' | 'income' | 'expense') => void;
    dateRange: 'week' | 'month' | 'year';
    onDateRangeChange: (range: 'week' | 'month' | 'year') => void;
}

export function TransactionFilter({
    currentFilter,
    onFilterChange,
    dateRange,
    onDateRangeChange,
}: TransactionFilterProps) {
    return (
        <View style={styles.container}>
            {/* Type Filter */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.typeFilterContainer}
            >
                {(['all', 'income', 'expense'] as const).map((type) => (
                    <TouchableOpacity
                        key={type}
                        onPress={() => onFilterChange(type)}
                    >
                        <GlassCard
                            style={[
                                styles.filterChip,
                                currentFilter === type && styles.activeFilterChip,
                                currentFilter === type && type === 'income' ? { backgroundColor: '#10B981' } : {},
                                currentFilter === type && type === 'expense' ? { backgroundColor: '#EF4444' } : {},
                            ] as any}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    currentFilter === type && styles.activeFilterText,
                                ]}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Text>
                        </GlassCard>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Date Range Filter */}
            <View style={styles.dateRangeContainer}>
                {(['week', 'month', 'year'] as const).map((range) => (
                    <TouchableOpacity
                        key={range}
                        onPress={() => onDateRangeChange(range)}
                        style={[
                            styles.rangeButton,
                            dateRange === range && styles.activeRangeButton,
                        ]}
                    >
                        <Text
                            style={[
                                styles.rangeText,
                                dateRange === range && styles.activeRangeText,
                            ]}
                        >
                            This {range.charAt(0).toUpperCase() + range.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.base,
    },
    typeFilterContainer: {
        gap: spacing.sm,
        paddingHorizontal: spacing.base,
        marginBottom: spacing.base,
    },
    filterChip: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xs,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    activeFilterChip: {
        backgroundColor: colors.primary.purple,
    },
    filterText: {
        fontSize: typography.fontSize.sm,
        color: 'rgba(255,255,255,0.7)',
        fontWeight: typography.fontWeight.medium,
    },
    activeFilterText: {
        color: '#FFFFFF',
        fontWeight: typography.fontWeight.semibold,
    },
    dateRangeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.base,
        paddingHorizontal: spacing.base,
    },
    rangeButton: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
    },
    activeRangeButton: {
        borderBottomWidth: 2,
        borderBottomColor: '#FFFFFF',
    },
    rangeText: {
        fontSize: typography.fontSize.sm,
        color: 'rgba(255,255,255,0.5)',
    },
    activeRangeText: {
        color: '#FFFFFF',
        fontWeight: typography.fontWeight.semibold,
    },
});
