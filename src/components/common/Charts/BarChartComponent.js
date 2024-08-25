import React, { useContext } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { AppContext } from '../../../context/AppContext';
import { lightTheme, darkTheme } from '../../../themes';
import { BarChart } from 'react-native-chart-kit';

const BarChartComponent = ({ data, title }) => {
  const { state } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

  const screenWidth = Dimensions.get('window').width - 50;

  // Adjust the width of the chart based on the number of labels
  const chartWidth = Math.max(screenWidth, data.labels.length * 50); // Adjust multiplier for spacing

  const chartConfig = {
    backgroundGradientFrom: themeColor.secondary,
    backgroundGradientTo: themeColor.secondary,
    color: (opacity = 1) => `${themeColor.accent}${Math.round(opacity * 255).toString(16)}`,
    labelColor: (opacity = 1) => themeColor.text,
    strokeWidth: 2,
    barPercentage: 1,
  };

  return (
    <View style={{ marginVertical: 10, paddingVertical: 10, borderRadius: 16, backgroundColor:themeColor.secondary, borderWidth:1, borderColor:themeColor.border }} >
      {title && (
        <Text style={{ textAlign: 'center', fontSize: 18, color: themeColor.text }}>
          {title}
        </Text>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ width: chartWidth }}>
          <BarChart
            data={data}
            width={chartWidth}
            height={220}
            yAxisLabel={'₹ '}
            chartConfig={chartConfig}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default BarChartComponent;
