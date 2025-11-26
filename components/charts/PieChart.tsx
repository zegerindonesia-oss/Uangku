import React from 'react';
import { Dimensions, ViewStyle, View, Text } from 'react-native';
import { PieChart as RNPieChart } from 'react-native-chart-kit';
import { useTheme } from '../../contexts/ThemeContext';

interface PieData {
    name: string;
    population: number;
    color: string;
    legendFontColor?: string;
    legendFontSize?: number;
}

interface PieChartProps {
    data: PieData[];
    width?: number;
    height?: number;
    style?: ViewStyle;
    title?: string;
    accessor?: string;
    backgroundColor?: string;
    paddingLeft?: string;
    absolute?: boolean;
    hasLegend?: boolean;
}

export const PieChart: React.FC<PieChartProps> = ({
    data,
    width = Dimensions.get('window').width - 32,
    height = 220,
    style,
    title,
    accessor = 'population',
    backgroundColor = 'transparent',
    paddingLeft = '15',
    absolute = false,
    hasLegend = true,
}) => {
    const { colors, isDark } = useTheme();

    // Enhance data with default legend styles if not provided
    const chartData = data.map(item => ({
        ...item,
        legendFontColor: item.legendFontColor || (isDark ? '#FFFFFF' : '#1F2937'),
        legendFontSize: item.legendFontSize || 12,
    }));

    return (
        <View>
            {title && (
                <Text style={{
                    color: colors.text,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 12,
                    marginLeft: 8
                }}>
                    {title}
                </Text>
            )}
            <RNPieChart
                data={chartData}
                width={width}
                height={height}
                chartConfig={{
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(31, 41, 55, ${opacity})`,
                }}
                accessor={accessor}
                backgroundColor={backgroundColor}
                paddingLeft={paddingLeft}
                absolute={absolute}
                hasLegend={hasLegend}
                style={{
                    ...style,
                }}
            />
        </View>
    );
};
