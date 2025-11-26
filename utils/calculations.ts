/**
 * Generate unique ID
 */
export const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calculate compound interest
 */
export const calculateCompoundInterest = (
    principal: number,
    rate: number,
    time: number,
    frequency: number = 12
): number => {
    return principal * Math.pow(1 + rate / (frequency * 100), frequency * time);
};

/**
 * Calculate time to reach goal
 */
export const calculateTimeToGoal = (
    currentAmount: number,
    targetAmount: number,
    monthlyContribution: number,
    interestRate: number = 0
): number => {
    if (monthlyContribution <= 0) return Infinity;

    if (interestRate === 0) {
        return Math.ceil((targetAmount - currentAmount) / monthlyContribution);
    }

    const monthlyRate = interestRate / 12 / 100;
    const months = Math.log(
        (targetAmount * monthlyRate + monthlyContribution) /
        (currentAmount * monthlyRate + monthlyContribution)
    ) / Math.log(1 + monthlyRate);

    return Math.ceil(months);
};

/**
 * Calculate budget progress percentage
 */
export const calculateBudgetProgress = (spent: number, limit: number): number => {
    return Math.min((spent / limit) * 100, 100);
};

/**
 * Get budget status color
 */
export const getBudgetStatusColor = (percentage: number): string => {
    if (percentage >= 90) return '#EF4444'; // Red
    if (percentage >= 70) return '#F59E0B'; // Orange
    return '#10B981'; // Green
};

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (oldValue: number, newValue: number): number => {
    if (oldValue === 0) return 0;
    return ((newValue - oldValue) / oldValue) * 100;
};

/**
 * Group transactions by date
 */
export const groupTransactionsByDate = <T extends { date: number }>(
    transactions: T[]
): Record<string, T[]> => {
    return transactions.reduce((groups, transaction) => {
        const date = new Date(transaction.date * 1000).toDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
    }, {} as Record<string, T[]>);
};
