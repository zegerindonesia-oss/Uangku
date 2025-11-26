import { eq, and, gte, lte, sql } from 'drizzle-orm';
import { db } from '../db/database';
import { budgets, transactions, categories, NewBudget } from '../db/schema';

export const budgetService = {
    // Get all budgets with progress calculation
    getAllWithProgress: async () => {
        // 1. Get all budgets with category info
        const allBudgets = await db
            .select({
                id: budgets.id,
                name: budgets.name,
                amount: budgets.amount,
                period: budgets.period,
                categoryId: budgets.categoryId,
                categoryName: categories.name,
                categoryIcon: categories.icon,
                categoryColor: categories.color,
            })
            .from(budgets)
            .leftJoin(categories, eq(budgets.categoryId, categories.id));

        // 2. Calculate spent amount for each budget for current month
        // Note: For simplicity, we're assuming monthly budgets for now
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const budgetsWithProgress = await Promise.all(
            allBudgets.map(async (budget) => {
                const result = await db
                    .select({
                        total: sql<number>`sum(${transactions.amount})`,
                    })
                    .from(transactions)
                    .where(
                        and(
                            eq(transactions.type, 'expense'),
                            eq(transactions.categoryId, budget.categoryId!),
                            gte(transactions.date, startOfMonth),
                            lte(transactions.date, endOfMonth)
                        )
                    );

                const spent = result[0]?.total || 0;

                return {
                    ...budget,
                    spent,
                    percentage: Math.min((spent / budget.amount) * 100, 100),
                };
            })
        );

        return budgetsWithProgress;
    },

    // Create new budget
    create: async (budget: NewBudget) => {
        return await db.insert(budgets).values(budget).returning();
    },

    // Update budget
    update: async (id: number, budget: Partial<NewBudget>) => {
        return await db
            .update(budgets)
            .set({ ...budget, updatedAt: new Date() })
            .where(eq(budgets.id, id))
            .returning();
    },

    // Delete budget
    delete: async (id: number) => {
        return await db.delete(budgets).where(eq(budgets.id, id)).returning();
    },
};
