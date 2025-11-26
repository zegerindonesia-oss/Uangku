import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GlassCard } from '../ui/GlassCard';
import { GradientButton } from '../ui/GradientButton';
import { CategorySelector } from './CategorySelector';
import { colors, typography, spacing } from '../../theme';
import { formatDate } from '../../utils/formatters';

interface TransactionFormProps {
    initialData?: any;
    onSubmit: (data: any) => void;
    loading?: boolean;
}

export function TransactionForm({ initialData, onSubmit, loading = false }: TransactionFormProps) {
    const [type, setType] = useState<'income' | 'expense'>(initialData?.type || 'expense');
    const [amount, setAmount] = useState(initialData?.amount?.toString() || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [date, setDate] = useState(initialData?.date ? new Date(initialData.date) : new Date());
    const [category, setCategory] = useState(initialData?.category || null);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const handleSubmit = () => {
        if (!amount || !category) return;

        onSubmit({
            type,
            amount: parseFloat(amount),
            description,
            date,
            category,
        });
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            {/* Type Toggle */}
            <GlassCard style={styles.toggleCard}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        type === 'income' && styles.incomeActive
                    ]}
                    onPress={() => setType('income')}
                >
                    <Text style={[
                        styles.toggleText,
                        type === 'income' && styles.activeText
                    ]}>Income</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        type === 'expense' && styles.expenseActive
                    ]}
                    onPress={() => setType('expense')}
                >
                    <Text style={[
                        styles.toggleText,
                        type === 'expense' && styles.activeText
                    ]}>Expense</Text>
                </TouchableOpacity>
            </GlassCard>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Amount Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Amount</Text>
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

                {/* Date Selection */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Date</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <GlassCard style={styles.selectorCard}>
                            <View style={styles.dateContent}>
                                <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
                                <Text style={styles.selectorValue}>{formatDate(date, 'long')}</Text>
                            </View>
                        </GlassCard>
                    </TouchableOpacity>
                </View>

                {/* Description Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Description (Optional)</Text>
                    <GlassCard style={styles.inputCard}>
                        <TextInput
                            style={styles.textInput}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Add notes..."
                            placeholderTextColor="rgba(255,255,255,0.3)"
                            multiline
                        />
                    </GlassCard>
                </View>

                <GradientButton
                    title="Save Transaction"
                    onPress={handleSubmit}
                    loading={loading}
                    disabled={!amount || !category}
                    style={styles.submitButton}
                />
            </ScrollView>

            {/* Modals */}
            <CategorySelector
                visible={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                onSelect={setCategory}
                currentType={type}
                selectedCategoryId={category?.id}
            />

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toggleCard: {
        flexDirection: 'row',
        padding: 4,
        marginBottom: spacing.xl,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: spacing.sm,
        alignItems: 'center',
        borderRadius: 12,
    },
    incomeActive: {
        backgroundColor: '#10B981',
    },
    expenseActive: {
        backgroundColor: '#EF4444',
    },
    toggleText: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        color: 'rgba(255,255,255,0.6)',
    },
    activeText: {
        color: '#FFFFFF',
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
    dateContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    inputCard: {
        padding: spacing.base,
        minHeight: 100,
    },
    textInput: {
        fontSize: typography.fontSize.base,
        color: '#FFFFFF',
        textAlignVertical: 'top',
        flex: 1,
    },
    submitButton: {
        marginTop: spacing.xl,
        marginBottom: spacing['2xl'],
    },
});
