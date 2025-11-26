import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../ui/GlassCard';
import { typography, spacing } from '../../theme';

interface QuickActionButtonProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
    color: string; // base color for icon and background accent
}

export function QuickActionButton({ icon, label, onPress, color }: QuickActionButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.touchable}>
            <GlassCard style={{ ...styles.card, backgroundColor: `${color}20` }}>
                <View style={styles.content}>
                    <Ionicons name={icon} size={28} color={color} />
                    <Text style={styles.label}>{label}</Text>
                </View>
            </GlassCard>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchable: {
        flex: 1,
    },
    card: {
        padding: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        gap: spacing.xs,
    },
    label: {
        marginTop: spacing.sm,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
        color: '#FFFFFF',
        textAlign: 'center',
    },
});

