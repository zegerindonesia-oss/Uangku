import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { typography, spacing } from '../../theme';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface RecentTransactionItemProps {
    categoryName: string;
    categoryIcon: keyof typeof Ionicons.glyphMap;
    categoryColor: string;
    amount: number;
    type: 'income' | 'expense';
    description?: string;
    date: Date;
    onPress?: () => void;
}

export function RecentTransactionItem({
    categoryName,
    categoryIcon,
    categoryColor,
    amount,
    type,
    description,
    date,
    onPress,
}: RecentTransactionItemProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, { backgroundColor: categoryColor + '20' }]}>
                <Ionicons name={categoryIcon} size={24} color={categoryColor} />
            </View>

            <View style={styles.content}>
                <Text style={styles.category}>{categoryName}</Text>
                {description && (
                    <Text style={styles.description} numberOfLines={1}>
                        {description}
                    </Text>
                )}
                <Text style={styles.date}>{formatDate(date)}</Text>
            </View>

            <Text
                style={[
                    styles.amount,
                    { color: type === 'income' ? '#10B981' : '#EF4444' },
                ]}
            >
                {type === 'income' ? '+' : '-'}{formatCurrency(amount)}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.base,
        paddingHorizontal: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.base,
    },
    content: {
        flex: 1,
    },
    category: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        color: '#FFFFFF',
        marginBottom: 2,
    },
    description: {
        fontSize: typography.fontSize.sm,
        color: 'rgba(255,255,255,0.6)',
        marginBottom: 2,
    },
    date: {
        fontSize: typography.fontSize.xs,
        color: 'rgba(255,255,255,0.5)',
    },
    amount: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        marginLeft: spacing.sm,
    },
});
