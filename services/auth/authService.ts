import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../database/client';
import { users, NewUser } from '../database/schema';
import { eq } from 'drizzle-orm';
import * as Crypto from 'expo-crypto';

const SESSION_KEY = '@uangku_session';

export const authService = {
    async signup(name: string, email: string, password: string) {
        // Check if user exists
        const existingUser = await db.select().from(users).where(eq(users.email, email));
        if (existingUser.length > 0) {
            throw new Error('User already exists');
        }

        // Hash password
        const passwordHash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            password
        );

        const newUser: NewUser = {
            id: Crypto.randomUUID(),
            name,
            email,
            passwordHash,
            createdAt: new Date(),
            updatedAt: new Date(),
            biometricEnabled: false,
        };

        await db.insert(users).values(newUser);

        // Auto login
        await this.setSession(newUser);
        return newUser;
    },

    async login(email: string, password: string) {
        const user = await db.select().from(users).where(eq(users.email, email));

        if (user.length === 0) {
            throw new Error('Invalid email or password');
        }

        const passwordHash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            password
        );

        if (user[0].passwordHash !== passwordHash) {
            throw new Error('Invalid email or password');
        }

        await this.setSession(user[0]);
        return user[0];
    },

    async logout() {
        await AsyncStorage.removeItem(SESSION_KEY);
    },

    async getSession() {
        const session = await AsyncStorage.getItem(SESSION_KEY);
        return session ? JSON.parse(session) : null;
    },

    async setSession(user: any) {
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
    },

    async updateProfile(userId: string, data: Partial<NewUser>) {
        await db.update(users).set(data).where(eq(users.id, userId));
        const updatedUser = await db.select().from(users).where(eq(users.id, userId));
        if (updatedUser.length > 0) {
            // Update session if it's the current user
            const currentSession = await this.getSession();
            if (currentSession && currentSession.id === userId) {
                await this.setSession(updatedUser[0]);
            }
            return updatedUser[0];
        }
        return null;
    }
};
