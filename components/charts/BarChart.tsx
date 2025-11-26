import React from 'react';
import { Dimensions, ViewStyle, View, Text } from 'react-native';
import { BarChart as RNBarChart } from 'react-native-chart-kit';
import { useTheme } from '../../contexts/ThemeContext';
import { colors as themeColors } from '../../theme/colors';

interface BarChartProps {
    data: number[];
    labels: string[];
    width?: number;
    height?: number;
    yAxisLabel?: string;
    yAxisSuffix?: string;
    style?: ViewStyle;
    title?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
    data,
    labels,
    width = Dimensions.get('window').width - 32,
    height = 220,
    yAxisLabel = '',
    yAxisSuffix = '',
    style,
    title,
}) => {
    const { colors, isDark } = useTheme();

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
            <RNBarChart
                data={{
                    labels,
                    datasets: [
                        {
                            data,
                        },
                    ],
                }}
                width={width}
                height={height}
                yAxisLabel={yAxisLabel}
                yAxisSuffix={yAxisSuffix}
                chartConfig={{
                    backgroundColor: 'transparent',
                    backgroundGradientFrom: 'transparent',
                    backgroundGradientTo: 'transparent',
                    decimalPlaces: 0,
                    color: (opacity = 1) => themeColors.primary.blue,
                    labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(31, 41, 55, ${opacity})`,
                    barPercentage: 0.7,
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    ...style,
                }}
                showValuesOnTopOfBars
            />
        </View>
    );
};
