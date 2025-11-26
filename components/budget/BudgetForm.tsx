import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../ui/GlassCard';
import { GradientButton } from '../ui/GradientButton';
import { CategorySelector } from '../transaction/CategorySelector';
import { colors, typography, spacing } from '../../theme';

interface BudgetFormProps {
    initialData?: any;
    onSubmit: (data: any) => void;
    loading?: boolean;
}

export function BudgetForm({ initialData, onSubmit, loading = false }: BudgetFormProps) {
    const [name, setName] = useState(initialData?.name || '');
    const [amount, setAmount] = useState(initialData?.amount?.toString() || '');
    const [category, setCategory] = useState(initialData?.category || null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const handleSubmit = () => {
        if (!name || !amount || !category) return;

        onSubmit({
            name,
            amount: parseFloat(amount),
            category,
            period: 'monthly', // Default to monthly for now
        });
    };

    const handleCategorySelect = (selectedCategory: any) => {
        setCategory(selectedCategory);
        // Auto-fill name if empty
        if (!name) {
            setName(`${selectedCategory.name} Budget`);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Category Selection */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Category</Text>
                    <TouchableOpacity onPress={() => setShowCategoryModal(true)}>
                        <GlassCard style={styles.selectorCard}>
                            {category ? (
                                <View style={styles.selectedCategory}>
                                    <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                                        <Ionicons name={category.icon} size={20} color={category.color} />
                                    </View>
                                    <Text style={styles.selectorValue}>{category.name}</Text>
                                </View>
                            ) : (
                                <Text style={styles.placeholderText}>Select Category</Text>
                            )}
                            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.5)" />
                        </GlassCard>
                    </TouchableOpacity>
                </View>

                {/* Name Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Budget Name</Text>
                    <GlassCard style={styles.inputCard}>
                        <TextInput
                            style={styles.textInput}
                            value={name}
                            onChangeText={setName}
                            placeholder="e.g., Monthly Food Budget"
                            placeholderTextColor="rgba(255,255,255,0.3)"
                        />
                    </GlassCard>
                </View>

                {/* Amount Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Limit Amount</Text>
                    <GlassCard style={styles.amountCard}>
                        <Text style={styles.currencyPrefix}>Rp</Text>
                        <TextInput
                            style={styles.amountInput}
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            placeholder="0"
                            placeholderTextColor="rgba(255,255,255,0.3)"
                        />
                    </GlassCard>
                </View>

                <View style={styles.infoContainer}>
                    <Ionicons name="information-circle-outline" size={20} color="rgba(255,255,255,0.6)" />
                    <Text style={styles.infoText}>
                        This budget will reset on the 1st of every month.
                    </Text>
                </View>

                <GradientButton
                    title="Save Budget"
                    onPress={handleSubmit}
                    loading={loading}
                    disabled={!name || !amount || !category}
                    style={styles.submitButton}
                />
            </ScrollView>

            {/* Category Modal */}
            <CategorySelector
                visible={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                onSelect={handleCategorySelect}
                currentType="expense" // Budgets are usually for expenses
                selectedCategoryId={category?.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: spacing.lg,
    },
    label: {
        fontSize: typography.fontSize.sm,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: spacing.xs,
        marginLeft: spacing.xs,
    },
    selectorCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.base,
    },
    selectedCategory: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    categoryIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectorValue: {
        fontSize: typography.fontSize.base,
        color: '#FFFFFF',
    },
    placeholderText: {
        fontSize: typography.fontSize.base,
        color: 'rgba(255,255,255,0.3)',
    },
    inputCard: {
        padding: spacing.base,
    },
    textInput: {
        fontSize: typography.fontSize.base,
        color: '#FFFFFF',
    },
    amountCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
    },
    currencyPrefix: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
        marginRight: spacing.sm,
    },
    amountInput: {
        flex: 1,
        fontSize: typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        paddingHorizontal: spacing.sm,
        marginBottom: spacing.xl,
    },
    infoText: {
        fontSize: typography.fontSize.sm,
        color: 'rgba(255,255,255,0.6)',
        flex: 1,
    },
    submitButton: {
        marginTop: spacing.base,
        marginBottom: spacing['2xl'],
    },
});
