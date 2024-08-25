import React, { useContext } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { AppContext } from '../../../context/AppContext';
import { lightTheme, darkTheme } from '../../../themes';
import { StackedBarChart } from 'react-native-chart-kit';

const StackedBarChartComponent = ({ data, title }) => {
  const screenWidth = Dimensions.get('window').width - 50;

  const { state } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

  const chartConfig = {
    backgroundGradientFrom: themeColor.secondary,
    backgroundGradientTo: themeColor.secondary,
    color: (opacity = 1) => `${themeColor.accent}${Math.round(opacity * 255).toString(16)}`,
    labelColor: (opacity = 1) => themeColor.text,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <View style={{ marginVertical: 10, paddingVertical: 10, borderRadius: 16, backgroundColor:themeColor.secondary, borderWidth:1, borderColor:themeColor.border  }} >
      {title && (
        <Text style={{ textAlign: 'center', fontSize: 18, color:themeColor.text }}>
          {title}
        </Text>
      )}
      <StackedBarChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
};

export default StackedBarChartComponent;
