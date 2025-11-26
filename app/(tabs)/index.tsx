import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { FinancialCard } from '../../components/dashboard/FinancialCard';
import { QuickActionButton } from '../../components/dashboard/QuickActionButton';
import { RecentTransactionItem } from '../../components/dashboard/RecentTransactionItem';
import { SpendingChart } from '../../components/dashboard/SpendingChart';
import { GlassCard } from '../../components/ui/GlassCard';
import { colors, typography, spacing } from '../../theme';
import { TransferLimitCard } from '../../components/dashboard/TransferLimitCard';
import { GoalCard } from '../../components/goal/GoalCard';
import {
    mockTransactions,
    calculateFinancialSummary,
    getSpendingByCategory,
} from '../../utils/mockData';

export default function DashboardScreen() {
    const { colors: themeColors } = useTheme();
    const { t } = useLanguage();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);

    // Calculate financial summary
    const { income, expenses, balance } = calculateFinancialSummary(mockTransactions);
    const spendingByCategory = getSpendingByCategory(mockTransactions);

    // Get recent transactions (last 5)
    const recentTransactions = mockTransactions
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 5);

    const onRefresh = async () => {
        setRefreshing(true);
        // Simulate data refresh
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    const handleAddIncome = () => {
        Alert.alert('Add Income', 'Add income feature coming soon!');
    };

    const handleAddExpense = () => {
        Alert.alert('Add Expense', 'Add expense feature coming soon!');
    };

    const handleViewReports = () => {
        router.push('/(tabs)/reports');
    };

    const handleViewBudgets = () => {
        router.push('/(tabs)/budget');
    };

    const getCurrentGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <LinearGradient
            colors={colors.gradients.primary as any}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#FFFFFF"
                    />
                }
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>{getCurrentGreeting()}</Text>
                        <Text style={styles.userName}>User</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton}>
                        <Ionicons name="person-circle-outline" size={40} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Financial Overview Cards */}
                <View style={styles.cardsContainer}>
                    <FinancialCard
                        title="Total Balance"
                        amount={balance}
                        icon="wallet-outline"
                        iconColor="#8B5CF6"
                    />
                </View>



                {/* Transfer Limit */}
                <View style={styles.section}>
                    <TransferLimitCard currentAmount={expenses} limitAmount={10000000} />
                </View>

                {/* Financial Goals */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Financial Goals</Text>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/goals')}>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <GoalCard
                        name="New House"
                        targetAmount={500000000}
                        currentAmount={150000000}
                        icon="home"
                        color="#8B5CF6"
                        deadline={new Date('2026-12-31')}
                    />
                </View>


                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActions}>
                        <QuickActionButton
                            icon="add-circle-outline"
                            label="Add Income"
                            onPress={handleAddIncome}
                            color="#10B981"
                        />
                        <View style={styles.actionSpacer} />
                        <QuickActionButton
                            icon="remove-circle-outline"
                            label="Add Expense"
                            onPress={handleAddExpense}
                            color="#EF4444"
                        />
                        <View style={styles.actionSpacer} />
                        <QuickActionButton
                            icon="stats-chart-outline"
                            label="Reports"
                            onPress={handleViewReports}
                            color="#3B82F6"
                        />
                        <View style={styles.actionSpacer} />
                        <QuickActionButton
                            icon="wallet-outline"
                            label="Budgets"
                            onPress={handleViewBudgets}
                            color="#F59E0B"
                        />
                    </View>
                </View>

                {/* Spending Chart */}
                <View style={styles.section}>
                    <SpendingChart data={spendingByCategory} />
                </View>

                {/* Recent Transactions */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Transactions</Text>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/transactions')}>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <GlassCard style={styles.transactionsCard}>
                        {recentTransactions.map((transaction, index) => (
                            <RecentTransactionItem
                                key={transaction.id}
                                categoryName={transaction.categoryName}
                                categoryIcon={transaction.categoryIcon as any}
                                categoryColor={transaction.categoryColor}
                                amount={transaction.amount}
                                type={transaction.type}
                                description={transaction.description}
                                date={transaction.date}
                                onPress={() => Alert.alert('Transaction', 'Transaction details coming soon!')}
                            />
                        ))}
                    </GlassCard>
                </View>

                {/* Bottom Padding */}
                <View style={styles.bottomPadding} />
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 60,
        paddingHorizontal: spacing.base,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    greeting: {
        fontSize: typography.fontSize.base,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 4,
    },
    userName: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    profileButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardsContainer: {
        marginBottom: spacing.base,
    },
    cardsRow: {
        flexDirection: 'row',
        marginBottom: spacing.base,
    },
    cardSpacer: {
        width: spacing.base,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.base,
    },
    sectionTitle: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    seeAllText: {
        fontSize: typography.fontSize.sm,
        color: '#FFFFFF',
        fontWeight: typography.fontWeight.semibold,
        textDecorationLine: 'underline',
    },
    quickActions: {
        flexDirection: 'row',
    },
    actionSpacer: {
        width: spacing.sm,
    },
    transactionsCard: {
        padding: 0,
        overflow: 'hidden',
    },
    bottomPadding: {
        height: spacing['2xl'],
    },
});
