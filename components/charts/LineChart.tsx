import React from 'react';
import { Dimensions, ViewStyle, View, Text } from 'react-native';
import { LineChart as RNLineChart } from 'react-native-chart-kit';
import { useTheme } from '../../contexts/ThemeContext';
import { colors as themeColors } from '../../theme/colors';

interface LineChartProps {
    data: number[];
    labels: string[];
    width?: number;
    height?: number;
    yAxisLabel?: string;
    yAxisSuffix?: string;
    style?: ViewStyle;
    bezier?: boolean;
    title?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
    data,
    labels,
    width = Dimensions.get('window').width - 32,
    height = 220,
    yAxisLabel = '',
    yAxisSuffix = '',
    style,
    bezier = true,
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
            <RNLineChart
                data={{
                    labels,
                    datasets: [
                        {
                            data,
                            color: (opacity = 1) => themeColors.primary.purple,
                            strokeWidth: 2,
                        },
                    ],
                }}
                width={width}
                height={height}
                yAxisLabel={yAxisLabel}
                yAxisSuffix={yAxisSuffix}
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: 'transparent',
                    backgroundGradientFrom: 'transparent',
                    backgroundGradientTo: 'transparent',
                    decimalPlaces: 0,
                    color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(31, 41, 55, ${opacity})`,
                    labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(31, 41, 55, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: themeColors.primary.purple,
                    },
                }}
                bezier={bezier}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    ...style,
                }}
            />
        </View>
    );
};
