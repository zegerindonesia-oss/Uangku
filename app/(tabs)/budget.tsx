import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BudgetCard } from '../../components/budget/BudgetCard';
import { budgetService } from '../../services/budgetService';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

export default function BudgetScreen() {
    const router = useRouter();
    const [budgets, setBudgets] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [summary, setSummary] = useState({ totalBudget: 0, totalSpent: 0 });

    const loadBudgets = async () => {
        try {
            const data = await budgetService.getAllWithProgress();
            setBudgets(data);

            const totalBudget = data.reduce((sum, b) => sum + b.amount, 0);
            const totalSpent = data.reduce((sum, b) => sum + b.spent, 0);
            setSummary({ totalBudget, totalSpent });
        } catch (error) {
            console.error('Error loading budgets:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadBudgets();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await loadBudgets();
        setRefreshing(false);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                    <View>
                        <Text style={styles.summaryLabel}>Total Budget</Text>
                        <Text style={styles.summaryValue}>
                            {formatCurrency(summary.totalBudget)}
                        </Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View>
                        <Text style={styles.summaryLabel}>Total Spent</Text>
                        <Text style={styles.summaryValue}>
                            {formatCurrency(summary.totalSpent)}
                        </Text>
                    </View>
                </View>
                <View style={styles.progressBarContainer}>
                    <View
                        style={[
                            styles.progressBar,
                            {
                                width: `${Math.min((summary.totalSpent / summary.totalBudget) * 100, 100)}%`,
                                backgroundColor: summary.totalSpent > summary.totalBudget ? '#EF4444' : '#10B981'
                            }
                        ]}
                    />
                </View>
                <Text style={styles.periodText}>This Month</Text>
            </View>
        </View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Ionicons name="wallet-outline" size={80} color="rgba(255,255,255,0.2)" />
            <Text style={styles.emptyTitle}>No Budgets Yet</Text>
            <Text style={styles.emptySubtitle}>
                Create a budget to track your spending and save more money.
            </Text>
            <TouchableOpacity
                style={styles.createButton}
                onPress={() => router.push('/budget/add')}
            >
                <Text style={styles.createButtonText}>Create Budget</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <LinearGradient
            colors={colors.gradients.primary as any}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.topBar}>
                <Text style={styles.title}>Budgets</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push('/budget/add')}
                >
                    <Ionicons name="add" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={budgets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <BudgetCard
                        name={item.name}
                        amount={item.amount}
                        spent={item.spent}
                        categoryIcon={item.categoryIcon}
                        categoryColor={item.categoryColor}
                        onPress={() => router.push({
                            pathname: '/budget/edit',
                            params: { id: item.id }
                        })}
                    />
                )}
                ListHeaderComponent={budgets.length > 0 ? renderHeader : null}
                ListEmptyComponent={renderEmptyState}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#FFFFFF"
                    />
                }
                showsVerticalScrollIndicator={false}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: spacing.base,
        paddingBottom: spacing.base,
    },
    title: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingHorizontal: spacing.base,
        paddingBottom: 100,
        flexGrow: 1,
    },
    header: {
        marginBottom: spacing.lg,
    },
    summaryCard: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: spacing.base,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.base,
    },
    summaryLabel: {
        fontSize: typography.fontSize.xs,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 4,
    },
    summaryValue: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    summaryDivider: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        marginBottom: spacing.xs,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 3,
    },
    periodText: {
        fontSize: typography.fontSize.xs,
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'right',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing['4xl'],
    },
    emptyTitle: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
    },
    emptySubtitle: {
        fontSize: typography.fontSize.base,
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        marginBottom: spacing.xl,
        paddingHorizontal: spacing.xl,
    },
    createButton: {
        backgroundColor: colors.primary.purple,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.sm,
        borderRadius: 20,
    },
    createButtonText: {
        color: '#FFFFFF',
        fontWeight: typography.fontWeight.semibold,
        fontSize: typography.fontSize.base,
    },
});
