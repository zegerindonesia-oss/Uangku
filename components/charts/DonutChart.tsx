import React from 'react';
import { Dimensions, ViewStyle, View, Text } from 'react-native';
import { PieChart } from './PieChart';
import { useTheme } from '../../contexts/ThemeContext';

interface DonutChartProps {
    data: {
        name: string;
        population: number;
        color: string;
        legendFontColor?: string;
        legendFontSize?: number;
    }[];
    width?: number;
    height?: number;
    style?: ViewStyle;
    title?: string;
    centerLabel?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
    data,
    width = Dimensions.get('window').width - 32,
    height = 220,
    style,
    title,
    centerLabel,
}) => {
    const { colors } = useTheme();
    // Donut chart simulation using PieChart
    // Note: react-native-chart-kit doesn't support true Donut charts natively.
    // We are using PieChart for now. A true donut implementation would require
    // a different library or SVG manipulation.

    return (
        <PieChart
            data={data}
            width={width}
            height={height}
            style={style}
            title={title}
            hasLegend={true}
        />
    );
};
