import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite/next';
import * as schema from './schema';

// Open database
const expoDb = openDatabaseSync('uangku.db');

// Create drizzle instance
export const db = drizzle(expoDb, { schema });

// Initialize database with default categories
export const initializeDatabase = async () => {
    try {
        // Create tables if they don't exist
        await expoDb.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT,
        name TEXT NOT NULL,
        photo_url TEXT,
        phone TEXT,
        biometric_enabled INTEGER DEFAULT 0,
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        updated_at INTEGER DEFAULT (strftime('%s', 'now'))
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
        category TEXT NOT NULL,
        amount REAL NOT NULL,
        date INTEGER NOT NULL,
        note TEXT,
        tags TEXT,
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS budgets (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        category TEXT NOT NULL,
        limit_amount REAL NOT NULL,
        spent_amount REAL DEFAULT 0,
        period TEXT NOT NULL CHECK(period IN ('monthly', 'weekly')),
        start_date INTEGER NOT NULL,
        end_date INTEGER NOT NULL,
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS goals (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        goal_name TEXT NOT NULL,
        target_amount REAL NOT NULL,
        current_amount REAL DEFAULT 0,
        deadline INTEGER,
        interest_rate REAL,
        icon TEXT,
        color TEXT,
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('income', 'expense', 'both')),
        is_custom INTEGER DEFAULT 0,
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS shared_accounts (
        id TEXT PRIMARY KEY,
        owner_id TEXT NOT NULL,
        shared_with_id TEXT NOT NULL,
        permission TEXT NOT NULL CHECK(permission IN ('view', 'edit')),
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        FOREIGN KEY (owner_id) REFERENCES users(id),
        FOREIGN KEY (shared_with_id) REFERENCES users(id)
      );
    `);

        // Insert default categories
        await insertDefaultCategories();

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};

const insertDefaultCategories = async () => {
    const defaultCategories = [
        { id: 'cat_food', name: 'Food & Dining', icon: 'restaurant', color: '#F59E0B', type: 'expense' },
        { id: 'cat_transport', name: 'Transportation', icon: 'car', color: '#3B82F6', type: 'expense' },
        { id: 'cat_entertainment', name: 'Entertainment', icon: 'game-controller', color: '#EC4899', type: 'expense' },
        { id: 'cat_shopping', name: 'Shopping', icon: 'cart', color: '#8B5CF6', type: 'expense' },
        { id: 'cat_health', name: 'Health', icon: 'medical', color: '#10B981', type: 'expense' },
        { id: 'cat_education', name: 'Education', icon: 'school', color: '#6366F1', type: 'expense' },
        { id: 'cat_bills', name: 'Bills & Utilities', icon: 'receipt', color: '#EF4444', type: 'expense' },
        { id: 'cat_salary', name: 'Salary', icon: 'cash', color: '#10B981', type: 'income' },
        { id: 'cat_investment', name: 'Investment', icon: 'trending-up', color: '#8B5CF6', type: 'income' },
        { id: 'cat_other', name: 'Other', icon: 'ellipsis-horizontal', color: '#6B7280', type: 'both' },
    ];

    try {
        for (const category of defaultCategories) {
            await expoDb.execAsync(`
        INSERT OR IGNORE INTO categories (id, user_id, name, icon, color, type, is_custom)
        VALUES ('${category.id}', NULL, '${category.name}', '${category.icon}', '${category.color}', '${category.type}', 0)
      `);
        }
    } catch (error) {
        console.error('Error inserting default categories:', error);
    }
};

export { schema };
