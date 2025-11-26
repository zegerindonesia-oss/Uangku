import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { ViewStyle } from 'react-native';

export type IconName = keyof typeof Ionicons.glyphMap;

interface IconProps {
    name: IconName;
    size?: number;
    color?: string;
    style?: ViewStyle;
}

export const Icon: React.FC<IconProps> = ({
    name,
    size = 24,
    color,
    style,
}) => {
    const { colors } = useTheme();

    return (
        <Ionicons
            name={name}
            size={size}
            color={color || colors.text}
            style={style}
        />
    );
};
