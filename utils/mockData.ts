import { Category, Transaction } from '../db/schema';

// Default categories for new users
export const defaultCategories = [
    // Income categories
    { name: 'Salary', icon: 'cash-outline', color: '#10B981', type: 'income' as const },
    { name: 'Freelance', icon: 'briefcase-outline', color: '#3B82F6', type: 'income' as const },
    { name: 'Investment', icon: 'trending-up-outline', color: '#8B5CF6', type: 'income' as const },
    { name: 'Gift', icon: 'gift-outline', color: '#EC4899', type: 'income' as const },
    { name: 'Other Income', icon: 'add-circle-outline', color: '#6366F1', type: 'income' as const },

    // Expense categories
    { name: 'Food & Dining', icon: 'restaurant-outline', color: '#EF4444', type: 'expense' as const },
    { name: 'Transportation', icon: 'car-outline', color: '#F59E0B', type: 'expense' as const },
    { name: 'Shopping', icon: 'cart-outline', color: '#EC4899', type: 'expense' as const },
    { name: 'Entertainment', icon: 'game-controller-outline', color: '#8B5CF6', type: 'expense' as const },
    { name: 'Bills & Utilities', icon: 'receipt-outline', color: '#6366F1', type: 'expense' as const },
    { name: 'Healthcare', icon: 'medical-outline', color: '#10B981', type: 'expense' as const },
    { name: 'Education', icon: 'school-outline', color: '#3B82F6', type: 'expense' as const },
    { name: 'Other Expense', icon: 'remove-circle-outline', color: '#6B7280', type: 'expense' as const },
];

// Mock transactions for demonstration
export const mockTransactions = [
    {
        id: 1,
        categoryName: 'Salary',
        categoryIcon: 'cash-outline',
        categoryColor: '#10B981',
        amount: 15000000,
        type: 'income' as const,
        description: 'Monthly salary',
        date: new Date(2025, 10, 1),
    },
    {
        id: 2,
        categoryName: 'Food & Dining',
        categoryIcon: 'restaurant-outline',
        categoryColor: '#EF4444',
        amount: 150000,
        type: 'expense' as const,
        description: 'Lunch at restaurant',
        date: new Date(2025, 10, 24),
    },
    {
        id: 3,
        categoryName: 'Transportation',
        categoryIcon: 'car-outline',
        categoryColor: '#F59E0B',
        amount: 50000,
        type: 'expense' as const,
        description: 'Grab to office',
        date: new Date(2025, 10, 24),
    },
    {
        id: 4,
        categoryName: 'Shopping',
        categoryIcon: 'cart-outline',
        categoryColor: '#EC4899',
        amount: 500000,
        type: 'expense' as const,
        description: 'New shoes',
        date: new Date(2025, 10, 23),
    },
    {
        id: 5,
        categoryName: 'Freelance',
        categoryIcon: 'briefcase-outline',
        categoryColor: '#3B82F6',
        amount: 3000000,
        type: 'income' as const,
        description: 'Web design project',
        date: new Date(2025, 10, 22),
    },
    {
        id: 6,
        categoryName: 'Bills & Utilities',
        categoryIcon: 'receipt-outline',
        categoryColor: '#6366F1',
        amount: 750000,
        type: 'expense' as const,
        description: 'Electricity bill',
        date: new Date(2025, 10, 20),
    },
    {
        id: 7,
        categoryName: 'Entertainment',
        categoryIcon: 'game-controller-outline',
        categoryColor: '#8B5CF6',
        amount: 200000,
        type: 'expense' as const,
        description: 'Movie tickets',
        date: new Date(2025, 10, 19),
    },
    {
        id: 8,
        categoryName: 'Food & Dining',
        categoryIcon: 'restaurant-outline',
        categoryColor: '#EF4444',
        amount: 85000,
        type: 'expense' as const,
        description: 'Grocery shopping',
        date: new Date(2025, 10, 18),
    },
];

// Calculate financial summary from transactions
export function calculateFinancialSummary(transactions: typeof mockTransactions) {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return { income, expenses, balance };
}

// Get spending by category
export function getSpendingByCategory(transactions: typeof mockTransactions) {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');

    const categoryMap = new Map<string, { amount: number; color: string; icon: string }>();

    expenseTransactions.forEach(t => {
        const existing = categoryMap.get(t.categoryName) || { amount: 0, color: t.categoryColor, icon: t.categoryIcon };
        existing.amount += t.amount;
        categoryMap.set(t.categoryName, existing);
    });

    return Array.from(categoryMap.entries())
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.amount - a.amount);
}

// Mock budgets
export const mockBudgets = [
    {
        id: 1,
        name: 'Monthly Food Budget',
        amount: 3000000,
        spent: 1850000,
        period: 'monthly' as const,
        categoryName: 'Food & Dining',
    },
    {
        id: 2,
        name: 'Transportation',
        amount: 1000000,
        spent: 450000,
        period: 'monthly' as const,
        categoryName: 'Transportation',
    },
    {
        id: 3,
        name: 'Entertainment',
        amount: 500000,
        spent: 200000,
        period: 'monthly' as const,
        categoryName: 'Entertainment',
    },
];

// Mock goals
export const mockGoals = [
    {
        id: 1,
        name: 'Emergency Fund',
        targetAmount: 50000000,
        currentAmount: 15000000,
        deadline: new Date(2026, 11, 31),
        icon: 'shield-checkmark-outline',
        color: '#10B981',
    },
    {
        id: 2,
        name: 'New Laptop',
        targetAmount: 20000000,
        currentAmount: 8000000,
        deadline: new Date(2026, 5, 30),
        icon: 'laptop-outline',
        color: '#3B82F6',
    },
    {
        id: 3,
        name: 'Vacation Fund',
        targetAmount: 15000000,
        currentAmount: 3000000,
        deadline: new Date(2026, 7, 15),
        icon: 'airplane-outline',
        color: '#EC4899',
    },
];
