import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GoalCard } from '../../components/goal/GoalCard';
import { colors, typography, spacing } from '../../theme';

export default function GoalsScreen() {
    const router = useRouter();
    const [goals, setGoals] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    // Mock data for now
    const mockGoals = [
        {
            id: 1,
            name: 'New House',
            targetAmount: 500000000,
            currentAmount: 150000000,
            icon: 'home' as any,
            color: '#8B5CF6',
            deadline: new Date('2026-12-31'),
        },
        {
            id: 2,
            name: 'New Car',
            targetAmount: 300000000,
            currentAmount: 100000000,
            icon: 'car' as any,
            color: '#3B82F6',
            deadline: new Date('2025-12-31'),
        },
        {
            id: 3,
            name: 'Vacation',
            targetAmount: 50000000,
            currentAmount: 35000000,
            icon: 'airplane' as any,
            color: '#EC4899',
            deadline: new Date('2025-06-30'),
        },
    ];

    const loadGoals = async () => {
        // TODO: Load from database
        setGoals(mockGoals);
    };

    useFocusEffect(
        useCallback(() => {
            loadGoals();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await loadGoals();
        setRefreshing(false);
    };

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Ionicons name="trophy-outline" size={80} color="rgba(255,255,255,0.2)" />
            <Text style={styles.emptyTitle}>No Goals Yet</Text>
            <Text style={styles.emptySubtitle}>
                Set financial goals and track your progress towards achieving them.
            </Text>
            <TouchableOpacity
                style={styles.createButton}
                onPress={() => router.push('/goal/add')}
            >
                <Text style={styles.createButtonText}>Create Goal</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <LinearGradient
            colors={colors.gradients.primary as any}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.topBar}>
                <Text style={styles.title}>Financial Goals</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push('/goal/add')}
                >
                    <Ionicons name="add" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={goals}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <GoalCard
                        name={item.name}
                        targetAmount={item.targetAmount}
                        currentAmount={item.currentAmount}
                        icon={item.icon}
                        color={item.color}
                        deadline={item.deadline}
                    />
                )}
                ListEmptyComponent={renderEmptyState}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#FFFFFF"
                    />
                }
                showsVerticalScrollIndicator={false}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: spacing.base,
        paddingBottom: spacing.base,
    },
    title: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingHorizontal: spacing.base,
        paddingBottom: 100,
        flexGrow: 1,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing['4xl'],
    },
    emptyTitle: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
    },
    emptySubtitle: {
        fontSize: typography.fontSize.base,
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        marginBottom: spacing.xl,
        paddingHorizontal: spacing.xl,
    },
    createButton: {
        backgroundColor: colors.primary.purple,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.sm,
        borderRadius: 20,
    },
    createButtonText: {
        color: '#FFFFFF',
        fontWeight: typography.fontWeight.semibold,
        fontSize: typography.fontSize.base,
    },
});
