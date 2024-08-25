import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const AbstractChartComponent = ({ data, title, renderChart }) => {
  const screenWidth = Dimensions.get('window').width - 50;

  return (
   <View style={{ marginVertical: 10, paddingVertical: 10, borderRadius: 16, backgroundColor:themeColor.secondary, borderWidth:1, borderColor:themeColor.border  }} >
    <View>
      {title && (
        <Text style={{ textAlign: 'center', fontSize: 18, color:themeColor.text }}>
          {title}
        </Text>
      )}
      <View>
        {renderChart({ data, width: screenWidth, height: 220 })}
      </View>
    </View>
    </View>
  );
};

export default AbstractChartComponent;
