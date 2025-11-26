import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../ui/GlassCard';
import { colors, typography, spacing } from '../../theme';
import { Category } from '../../db/schema';
import { defaultCategories } from '../../utils/mockData';

interface CategorySelectorProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (category: any) => void;
    currentType: 'income' | 'expense';
    selectedCategoryId?: number;
}

export function CategorySelector({
    visible,
    onClose,
    onSelect,
    currentType,
    selectedCategoryId,
}: CategorySelectorProps) {
    // Filter categories by type
    const categories = defaultCategories.filter(c => c.type === currentType);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <GlassCard style={styles.card}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Select Category</Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.grid}>
                                {categories.map((category, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.categoryItem,
                                            // Simulate selected state logic (using name since we don't have IDs in defaultCategories yet)
                                            // In real app, use ID comparison
                                        ]}
                                        onPress={() => {
                                            onSelect(category);
                                            onClose();
                                        }}
                                    >
                                        <View
                                            style={[
                                                styles.iconContainer,
                                                { backgroundColor: category.color + '20' },
                                            ]}
                                        >
                                            <Ionicons
                                                name={category.icon as any}
                                                size={24}
                                                color={category.color}
                                            />
                                        </View>
                                        <Text style={styles.categoryName} numberOfLines={1}>
                                            {category.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </GlassCard>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        height: '60%',
        width: '100%',
    },
    card: {
        flex: 1,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: spacing.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    title: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    closeButton: {
        padding: spacing.xs,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.lg,
        justifyContent: 'space-between',
        paddingBottom: spacing.xl,
    },
    categoryItem: {
        width: '30%',
        alignItems: 'center',
        gap: spacing.sm,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    categoryName: {
        fontSize: typography.fontSize.xs,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
    },
});
