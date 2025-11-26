import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BudgetForm } from '../../components/budget/BudgetForm';
import { budgetService } from '../../services/budgetService';
import { colors, typography, spacing } from '../../theme';

export default function EditBudgetScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState<any>(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        loadBudget();
    }, [id]);

    const loadBudget = async () => {
        try {
            const budgets = await budgetService.getAllWithProgress();
            const budget = budgets.find(b => b.id === Number(id));

            if (budget) {
                setInitialData({
                    ...budget,
                    category: {
                        id: budget.categoryId,
                        name: budget.categoryName,
                        icon: budget.categoryIcon,
                        color: budget.categoryColor,
                    }
                });
            } else {
                Alert.alert('Error', 'Budget not found');
                router.back();
            }
        } catch (error) {
            console.error('Error loading budget:', error);
            Alert.alert('Error', 'Failed to load budget');
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            await budgetService.update(Number(id), {
                categoryId: data.category.id,
                name: data.name,
                amount: data.amount,
                period: data.period,
            });

            Alert.alert('Success', 'Budget updated successfully', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error('Error updating budget:', error);
            Alert.alert('Error', 'Failed to update budget');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Budget',
            'Are you sure you want to delete this budget?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await budgetService.delete(Number(id));
                            router.back();
                        } catch (error) {
                            console.error('Error deleting budget:', error);
                            Alert.alert('Error', 'Failed to delete budget');
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
                <Text style={styles.title}>Edit Budget</Text>
                <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                    <Ionicons name="trash-outline" size={24} color="#EF4444" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <BudgetForm
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
