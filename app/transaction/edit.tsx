import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TransactionForm } from '../../components/transaction/TransactionForm';
import { transactionService } from '../../services/transactionService';
import { colors, typography, spacing } from '../../theme';

export default function EditTransactionScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState<any>(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        loadTransaction();
    }, [id]);

    const loadTransaction = async () => {
        try {
            // In a real app, we would fetch by ID. 
            // For now, we'll just simulate fetching since our service currently returns all or recent.
            // We'll assume the ID is valid and fetch all to find it (inefficient but works for mock/small data)
            const transactions = await transactionService.getAll(100);
            const transaction = transactions.find(t => t.id === Number(id));

            if (transaction) {
                setInitialData({
                    ...transaction,
                    category: {
                        name: transaction.categoryName,
                        icon: transaction.categoryIcon,
                        color: transaction.categoryColor,
                    }
                });
            } else {
                Alert.alert('Error', 'Transaction not found');
                router.back();
            }
        } catch (error) {
            console.error('Error loading transaction:', error);
            Alert.alert('Error', 'Failed to load transaction');
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            await transactionService.update(Number(id), {
                categoryId: data.category.id || 1, // Fallback
                amount: data.amount,
                type: data.type,
                description: data.description,
                date: data.date,
            });

            Alert.alert('Success', 'Transaction updated successfully', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error('Error updating transaction:', error);
            Alert.alert('Error', 'Failed to update transaction');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Transaction',
            'Are you sure you want to delete this transaction?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await transactionService.delete(Number(id));
                            router.back();
                        } catch (error) {
                            console.error('Error deleting transaction:', error);
                            Alert.alert('Error', 'Failed to delete transaction');
                        }
                    }
                }
            ]
        );
    };

    if (fetching) {
        return (
            <LinearGradient
                colors={colors.gradients.primary as any}
                style={[styles.container, styles.center]}
            >
                <ActivityIndicator size="large" color="#FFFFFF" />
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={colors.gradients.primary as any}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Edit Transaction</Text>
                <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                    <Ionicons name="trash-outline" size={24} color="#EF4444" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <TransactionForm
                    initialData={initialData}
                    onSubmit={handleSubmit}
                    loading={loading}
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
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
    deleteButton: {
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
    content: {
        flex: 1,
        paddingHorizontal: spacing.base,
    },
});
