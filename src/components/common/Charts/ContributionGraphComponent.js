import React, { useContext } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { AppContext } from '../../../context/AppContext';
import { lightTheme, darkTheme } from '../../../themes';
import { ContributionGraph } from 'react-native-chart-kit';

const ContributionGraphComponent = ({ data, title }) => {
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
    <View style={{ marginVertical: 10, paddingVertical: 10, borderRadius: 16, backgroundColor:themeColor.secondary, borderWidth:1, borderColor:themeColor.border  }} >
      {title && (
        <Text style={{ textAlign: 'center', fontSize: 18, color:themeColor.text }}>
          {title}
        </Text>
      )}
      <ContributionGraph
        values={data}
        endDate={new Date('2024-08-23')}
        numDays={105}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
};

export default ContributionGraphComponent;
