import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TransactionFilter } from '../../components/transaction/TransactionFilter';
import { RecentTransactionItem } from '../../components/dashboard/RecentTransactionItem';
import { transactionService } from '../../services/transactionService';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function TransactionsScreen() {
    const router = useRouter();
    const [transactions, setTransactions] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
    const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('month');
    const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 });

    const loadData = async () => {
        try {
            // In a real app, pass filter and dateRange to service
            const data = await transactionService.getAll(100);

            // Client-side filtering for now since service is basic
            let filteredData = data;
            if (filter !== 'all') {
                filteredData = data.filter(t => t.type === filter);
            }

            // TODO: Implement date filtering logic

            setTransactions(filteredData);

            // Calculate summary based on filtered data
            const income = filteredData
                .filter(t => t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0);
            const expenses = filteredData
                .filter(t => t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0);

            setSummary({
                income,
                expenses,
                balance: income - expenses,
            });

        } catch (error) {
            console.error('Error loading transactions:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [filter, dateRange])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.summaryContainer}>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Income</Text>
                    <Text style={[styles.summaryValue, styles.incomeText]}>
                        {formatCurrency(summary.income)}
                    </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Expenses</Text>
                    <Text style={[styles.summaryValue, styles.expenseText]}>
                        {formatCurrency(summary.expenses)}
                    </Text>
                </View>
            </View>

            <TransactionFilter
                currentFilter={filter}
                onFilterChange={setFilter}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
            />
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
                <Text style={styles.title}>Transactions</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push('/transaction/add')}
                >
                    <Ionicons name="add" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <RecentTransactionItem
                        categoryName={item.categoryName}
                        categoryIcon={item.categoryIcon}
                        categoryColor={item.categoryColor}
                        amount={item.amount}
                        type={item.type}
                        description={item.description}
                        date={item.date}
                        onPress={() => router.push({
                            pathname: '/transaction/edit',
                            params: { id: item.id }
                        })}
                    />
                )}
                ListHeaderComponent={renderHeader}
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
    },
    header: {
        marginBottom: spacing.base,
    },
    summaryContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: spacing.base,
        marginBottom: spacing.lg,
    },
    summaryItem: {
        flex: 1,
        alignItems: 'center',
    },
    divider: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginHorizontal: spacing.base,
    },
    summaryLabel: {
        fontSize: typography.fontSize.xs,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 4,
    },
    summaryValue: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
    },
    incomeText: {
        color: '#10B981',
    },
    expenseText: {
        color: '#EF4444',
    },
});
