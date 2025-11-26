import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BudgetForm } from '../../components/budget/BudgetForm';
import { budgetService } from '../../services/budgetService';
import { colors, typography, spacing } from '../../theme';

export default function AddBudgetScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            await budgetService.create({
                userId: 1, // TODO: Get from auth context
                categoryId: data.category.id || 1,
                name: data.name,
                amount: data.amount,
                period: data.period,
                alertThreshold: 80, // Default threshold
                startDate: new Date(),
                endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            Alert.alert('Success', 'Budget created successfully', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error('Error creating budget:', error);
            Alert.alert('Error', 'Failed to create budget');
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
                <Text style={styles.title}>Create Budget</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
                <BudgetForm onSubmit={handleSubmit} loading={loading} />
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
