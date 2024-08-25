import React, { useContext } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { AppContext } from '../../../context/AppContext';
import { lightTheme, darkTheme } from '../../../themes';
import { PieChart } from 'react-native-chart-kit';

const PieChartComponent = ({ data, title }) => {
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

  // Define the style to make the PieChart look like a ring
  const ringStyle = {
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: themeColor.secondary,
    alignItems: 'center',
    borderWidth:1, borderColor:themeColor.border ,
  };

  return (
    <View style={ringStyle}>
      {title && (
        <View className='flex-row'>
          <Text style={{ textAlign: 'center', fontSize: 18, color: themeColor.text }}>
            {title}  
          </Text>
          <Text className='ml-5' style={{ textAlign: 'center', fontSize: 18, color: themeColor.text }}>
             {data[0].population+data[1].population}
          </Text>
        </View>

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
        innerRadius={0.3} // Adjust this value to create a ring effect
      />
    </View>
  );
};

export default PieChartComponent;
