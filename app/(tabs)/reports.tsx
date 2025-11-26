import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../../components/ui/GlassCard';
import { LineChart } from '../../components/charts/LineChart';
import { colors, typography, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

type ReportType = 'income' | 'cashflow' | 'balance';

export default function ReportsScreen() {
    const [selectedReport, setSelectedReport] = useState<ReportType>('income');

    // Mock data
    const incomeData = {
        totalIncome: 15000000,
        totalExpenses: 8500000,
        netIncome: 6500000,
        categories: [
            { name: 'Salary', amount: 12000000 },
            { name: 'Investment', amount: 3000000 },
        ],
        expenseCategories: [
            { name: 'Food', amount: 3000000 },
            { name: 'Transport', amount: 2000000 },
            { name: 'Shopping', amount: 1500000 },
            { name: 'Bills', amount: 2000000 },
        ],
    };

    const cashFlowData = {
        operating: 5000000,
        investing: -2000000,
        financing: 1000000,
        netCashFlow: 4000000,
    };

    const balanceData = {
        assets: 50000000,
        liabilities: 15000000,
        equity: 35000000,
    };

    const renderIncomeStatement = () => (
        <ScrollView showsVerticalScrollIndicator={false}>
            <GlassCard style={styles.card}>
                <Text style={styles.cardTitle}>Income Statement</Text>
                <Text style={styles.cardSubtitle}>This Month</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Income</Text>
                    {incomeData.categories.map((cat, idx) => (
                        <View key={idx} style={styles.row}>
                            <Text style={styles.label}>{cat.name}</Text>
                            <Text style={[styles.value, styles.incomeText]}>
                                {formatCurrency(cat.amount)}
                            </Text>
                        </View>
                    ))}
                    <View style={[styles.row, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total Income</Text>
                        <Text style={[styles.totalValue, styles.incomeText]}>
                            {formatCurrency(incomeData.totalIncome)}
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Expenses</Text>
                    {incomeData.expenseCategories.map((cat, idx) => (
                        <View key={idx} style={styles.row}>
                            <Text style={styles.label}>{cat.name}</Text>
                            <Text style={[styles.value, styles.expenseText]}>
                                {formatCurrency(cat.amount)}
                            </Text>
                        </View>
                    ))}
                    <View style={[styles.row, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total Expenses</Text>
                        <Text style={[styles.totalValue, styles.expenseText]}>
                            {formatCurrency(incomeData.totalExpenses)}
                        </Text>
                    </View>
                </View>

                <View style={[styles.row, styles.netIncomeRow]}>
                    <Text style={styles.netIncomeLabel}>Net Income</Text>
                    <Text style={[styles.netIncomeValue, incomeData.netIncome >= 0 ? styles.incomeText : styles.expenseText]}>
                        {formatCurrency(incomeData.netIncome)}
                    </Text>
                </View>
            </GlassCard>

            <GlassCard style={styles.card}>
                <Text style={styles.cardTitle}>Trend</Text>
                <LineChart
                    data={[3000000, 4500000, 5000000, 6000000, 5500000, 6500000]}
                    labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
                    height={200}
                />
            </GlassCard>
        </ScrollView>
    );

    const renderCashFlow = () => (
        <ScrollView showsVerticalScrollIndicator={false}>
            <GlassCard style={styles.card}>
                <Text style={styles.cardTitle}>Cash Flow Statement</Text>
                <Text style={styles.cardSubtitle}>This Month</Text>

                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Operating Activities</Text>
                        <Text style={[styles.value, styles.incomeText]}>
                            {formatCurrency(cashFlowData.operating)}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Investing Activities</Text>
                        <Text style={[styles.value, styles.expenseText]}>
                            {formatCurrency(cashFlowData.investing)}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Financing Activities</Text>
                        <Text style={[styles.value, styles.incomeText]}>
                            {formatCurrency(cashFlowData.financing)}
                        </Text>
                    </View>
                </View>

                <View style={[styles.row, styles.netIncomeRow]}>
                    <Text style={styles.netIncomeLabel}>Net Cash Flow</Text>
                    <Text style={[styles.netIncomeValue, cashFlowData.netCashFlow >= 0 ? styles.incomeText : styles.expenseText]}>
                        {formatCurrency(cashFlowData.netCashFlow)}
                    </Text>
                </View>
            </GlassCard>
        </ScrollView>
    );

    const renderBalanceSheet = () => (
        <ScrollView showsVerticalScrollIndicator={false}>
            <GlassCard style={styles.card}>
                <Text style={styles.cardTitle}>Balance Sheet</Text>
                <Text style={styles.cardSubtitle}>Current Position</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Assets</Text>
                    <View style={[styles.row, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total Assets</Text>
                        <Text style={[styles.totalValue, styles.incomeText]}>
                            {formatCurrency(balanceData.assets)}
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Liabilities</Text>
                    <View style={[styles.row, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total Liabilities</Text>
                        <Text style={[styles.totalValue, styles.expenseText]}>
                            {formatCurrency(balanceData.liabilities)}
                        </Text>
                    </View>
                </View>

                <View style={[styles.row, styles.netIncomeRow]}>
                    <Text style={styles.netIncomeLabel}>Net Worth (Equity)</Text>
                    <Text style={[styles.netIncomeValue, styles.incomeText]}>
                        {formatCurrency(balanceData.equity)}
                    </Text>
                </View>
            </GlassCard>
        </ScrollView>
    );

    return (
        <LinearGradient
            colors={colors.gradients.primary as any}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Reports</Text>
            </View>

            {/* Report Type Tabs */}
            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, selectedReport === 'income' && styles.activeTab]}
                    onPress={() => setSelectedReport('income')}
                >
                    <Ionicons
                        name="stats-chart"
                        size={20}
                        color={selectedReport === 'income' ? '#FFFFFF' : 'rgba(255,255,255,0.5)'}
                    />
                    <Text style={[styles.tabText, selectedReport === 'income' && styles.activeTabText]}>
                        Income
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, selectedReport === 'cashflow' && styles.activeTab]}
                    onPress={() => setSelectedReport('cashflow')}
                >
                    <Ionicons
                        name="swap-horizontal"
                        size={20}
                        color={selectedReport === 'cashflow' ? '#FFFFFF' : 'rgba(255,255,255,0.5)'}
                    />
                    <Text style={[styles.tabText, selectedReport === 'cashflow' && styles.activeTabText]}>
                        Cash Flow
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, selectedReport === 'balance' && styles.activeTab]}
                    onPress={() => setSelectedReport('balance')}
                >
                    <Ionicons
                        name="pie-chart"
                        size={20}
                        color={selectedReport === 'balance' ? '#FFFFFF' : 'rgba(255,255,255,0.5)'}
                    />
                    <Text style={[styles.tabText, selectedReport === 'balance' && styles.activeTabText]}>
                        Balance
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {selectedReport === 'income' && renderIncomeStatement()}
                {selectedReport === 'cashflow' && renderCashFlow()}
                {selectedReport === 'balance' && renderBalanceSheet()}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: spacing.base,
        paddingBottom: spacing.base,
    },
    title: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    tabs: {
        flexDirection: 'row',
        paddingHorizontal: spacing.base,
        gap: spacing.sm,
        marginBottom: spacing.base,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingVertical: spacing.sm,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    activeTab: {
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    tabText: {
        fontSize: typography.fontSize.xs,
        color: 'rgba(255,255,255,0.5)',
        fontWeight: typography.fontWeight.semibold,
    },
    activeTabText: {
        color: '#FFFFFF',
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.base,
    },
    card: {
        padding: spacing.base,
        marginBottom: spacing.base,
    },
    cardTitle: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
        marginBottom: spacing.xs,
    },
    cardSubtitle: {
        fontSize: typography.fontSize.sm,
        color: 'rgba(255,255,255,0.6)',
        marginBottom: spacing.lg,
    },
    section: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        color: '#FFFFFF',
        marginBottom: spacing.sm,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.xs,
    },
    label: {
        fontSize: typography.fontSize.sm,
        color: 'rgba(255,255,255,0.7)',
    },
    value: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        marginTop: spacing.xs,
        paddingTop: spacing.sm,
    },
    totalLabel: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        color: '#FFFFFF',
    },
    totalValue: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.bold,
    },
    netIncomeRow: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 8,
        padding: spacing.sm,
        marginTop: spacing.base,
    },
    netIncomeLabel: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    netIncomeValue: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
    },
    incomeText: {
        color: '#10B981',
    },
    expenseText: {
        color: '#EF4444',
    },
});
