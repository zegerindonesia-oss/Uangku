import { eq, desc, and, gte, lte, sql } from 'drizzle-orm';
import { db } from '../db/database';
import { transactions, categories, Transaction, NewTransaction } from '../db/schema';

export const transactionService = {
    // Get all transactions with category details
    getAll: async (limit = 50, offset = 0) => {
        return await db
            .select({
                id: transactions.id,
                amount: transactions.amount,
                type: transactions.type,
                description: transactions.description,
                date: transactions.date,
                categoryName: categories.name,
                categoryIcon: categories.icon,
                categoryColor: categories.color,
            })
            .from(transactions)
            .leftJoin(categories, eq(transactions.categoryId, categories.id))
            .orderBy(desc(transactions.date))
            .limit(limit)
            .offset(offset);
    },

    // Get recent transactions
    getRecent: async (limit = 5) => {
        return await transactionService.getAll(limit);
    },

    // Add new transaction
    create: async (transaction: NewTransaction) => {
        return await db.insert(transactions).values(transaction).returning();
    },

    // Update transaction
    update: async (id: number, transaction: Partial<NewTransaction>) => {
        return await db
            .update(transactions)
            .set({ ...transaction, updatedAt: new Date() })
            .where(eq(transactions.id, id))
            .returning();
    },

    // Delete transaction
    delete: async (id: number) => {
        return await db.delete(transactions).where(eq(transactions.id, id)).returning();
    },

    // Get financial summary (income, expense, balance)
    getSummary: async (startDate?: Date, endDate?: Date) => {
        const conditions = [];
        if (startDate) conditions.push(gte(transactions.date, startDate));
        if (endDate) conditions.push(lte(transactions.date, endDate));

        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        const result = await db
            .select({
                type: transactions.type,
                total: sql<number>`sum(${transactions.amount})`,
            })
            .from(transactions)
            .where(whereClause)
            .groupBy(transactions.type);

        const income = result.find(r => r.type === 'income')?.total || 0;
        const expenses = result.find(r => r.type === 'expense')?.total || 0;

        return {
            income,
            expenses,
            balance: income - expenses,
        };
    },

    // Get spending by category
    getSpendingByCategory: async (startDate?: Date, endDate?: Date) => {
        const conditions = [eq(transactions.type, 'expense')];
        if (startDate) conditions.push(gte(transactions.date, startDate));
        if (endDate) conditions.push(lte(transactions.date, endDate));

        return await db
            .select({
                name: categories.name,
                color: categories.color,
                icon: categories.icon,
                amount: sql<number>`sum(${transactions.amount})`,
            })
            .from(transactions)
            .leftJoin(categories, eq(transactions.categoryId, categories.id))
            .where(and(...conditions))
            .groupBy(categories.id)
            .orderBy(desc(sql`sum(${transactions.amount})`));
    },
};
