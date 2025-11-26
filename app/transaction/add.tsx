import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TransactionForm } from '../../components/transaction/TransactionForm';
import { transactionService } from '../../services/transactionService';
import { colors, typography, spacing } from '../../theme';

export default function AddTransactionScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            await transactionService.create({
                userId: 1, // TODO: Get from auth context
                categoryId: data.category.id || 1, // Fallback for mock data
                amount: data.amount,
                type: data.type,
                description: data.description,
                date: data.date,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            Alert.alert('Success', 'Transaction added successfully', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error('Error adding transaction:', error);
            Alert.alert('Error', 'Failed to add transaction');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={colors.gradients.primary as any}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="close" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Add Transaction</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
                <TransactionForm onSubmit={handleSubmit} loading={loading} />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingHorizontal: spacing.base,
        paddingBottom: spacing.lg,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.base,
    },
});
