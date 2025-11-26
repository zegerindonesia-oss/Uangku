import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Users table
export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    email: text('email').unique().notNull(),
    passwordHash: text('password_hash'),
    name: text('name').notNull(),
    photoUrl: text('photo_url'),
    phone: text('phone'),
    biometricEnabled: integer('biometric_enabled', { mode: 'boolean' }).default(false),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Transactions table
export const transactions = sqliteTable('transactions', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => users.id),
    type: text('type', { enum: ['income', 'expense'] }).notNull(),
    category: text('category').notNull(),
    amount: real('amount').notNull(),
    date: integer('date', { mode: 'timestamp' }).notNull(),
    note: text('note'),
    tags: text('tags'), // JSON string array
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Budgets table
export const budgets = sqliteTable('budgets', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => users.id),
    category: text('category').notNull(),
    limitAmount: real('limit_amount').notNull(),
    spentAmount: real('spent_amount').default(0),
    period: text('period', { enum: ['monthly', 'weekly'] }).notNull(),
    startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
    endDate: integer('end_date', { mode: 'timestamp' }).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Goals table
export const goals = sqliteTable('goals', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => users.id),
    goalName: text('goal_name').notNull(),
    targetAmount: real('target_amount').notNull(),
    currentAmount: real('current_amount').default(0),
    deadline: integer('deadline', { mode: 'timestamp' }),
    interestRate: real('interest_rate'),
    icon: text('icon'),
    color: text('color'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Categories table
export const categories = sqliteTable('categories', {
    id: text('id').primaryKey(),
    userId: text('user_id').references(() => users.id),
    name: text('name').notNull(),
    icon: text('icon').notNull(),
    color: text('color').notNull(),
    type: text('type', { enum: ['income', 'expense', 'both'] }).notNull(),
    isCustom: integer('is_custom', { mode: 'boolean' }).default(false),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Shared Accounts table
export const sharedAccounts = sqliteTable('shared_accounts', {
    id: text('id').primaryKey(),
    ownerId: text('owner_id').notNull().references(() => users.id),
    sharedWithId: text('shared_with_id').notNull().references(() => users.id),
    permission: text('permission', { enum: ['view', 'edit'] }).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Type exports for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;

export type Budget = typeof budgets.$inferSelect;
export type NewBudget = typeof budgets.$inferInsert;

export type Goal = typeof goals.$inferSelect;
export type NewGoal = typeof goals.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type SharedAccount = typeof sharedAccounts.$inferSelect;
export type NewSharedAccount = typeof sharedAccounts.$inferInsert;
