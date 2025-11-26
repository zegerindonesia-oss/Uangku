import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Users table
export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password'),
    profilePicture: text('profile_picture'),
    currency: text('currency').default('IDR'),
    language: text('language').default('en'),
    theme: text('theme').default('dark'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// Categories table
export const categories = sqliteTable('categories', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => users.id),
    name: text('name').notNull(),
    icon: text('icon').notNull(),
    color: text('color').notNull(),
    type: text('type').notNull(), // 'income' or 'expense'
    isDefault: integer('is_default', { mode: 'boolean' }).default(false),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// Transactions table
export const transactions = sqliteTable('transactions', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => users.id),
    categoryId: integer('category_id').notNull().references(() => categories.id),
    amount: real('amount').notNull(),
    type: text('type').notNull(), // 'income' or 'expense'
    description: text('description'),
    date: integer('date', { mode: 'timestamp' }).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// Budgets table
export const budgets = sqliteTable('budgets', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => users.id),
    categoryId: integer('category_id').references(() => categories.id),
    name: text('name').notNull(),
    amount: real('amount').notNull(),
    period: text('period').notNull(), // 'daily', 'weekly', 'monthly', 'yearly'
    startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
    endDate: integer('end_date', { mode: 'timestamp' }),
    alertThreshold: real('alert_threshold').default(0.8), // Alert at 80%
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// Goals table
export const goals = sqliteTable('goals', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => users.id),
    name: text('name').notNull(),
    targetAmount: real('target_amount').notNull(),
    currentAmount: real('current_amount').default(0),
    deadline: integer('deadline', { mode: 'timestamp' }),
    icon: text('icon').notNull(),
    color: text('color').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// Export types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
export type Budget = typeof budgets.$inferSelect;
export type NewBudget = typeof budgets.$inferInsert;
export type Goal = typeof goals.$inferSelect;
export type NewGoal = typeof goals.$inferInsert;
