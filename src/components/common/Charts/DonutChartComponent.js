import React, { useContext } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { AppContext } from '../../../context/AppContext';
import { lightTheme, darkTheme } from '../../../themes';
import { PieChart } from 'react-native-chart-kit';

const DonutChartComponent = ({ data, title }) => {
  const screenWidth = Dimensions.get('window').width - 50;

  const { state } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

  const chartConfig = {
    backgroundGradientFrom: themeColor.secondary,
    backgroundGradientTo: themeColor.secondary,
    color: (opacity = 1) => `${themeColor.accent}${Math.round(opacity * 255).toString(16)}`,
    labelColor: (opacity = 1) => themeColor.text,
    strokeWidth: 2,
  };

  return (
    <View style={{ marginVertical: 10, paddingVertical: 10, borderRadius: 16, backgroundColor: themeColor.secondary, alignItems: 'center', borderWidth:1, borderColor:themeColor.border  }}>
      {title && (
        <Text style={{ textAlign: 'center', fontSize: 18, color: themeColor.text }}>
          {title}
        </Text>
      )}
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        hasLegend={false} // Optionally hide legend if not needed
        innerRadius={0.5} // This creates the donut effect
      />
    </View>
  );
};

export default DonutChartComponent;
