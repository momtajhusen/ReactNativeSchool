//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../../context/AppContext';
import { lightTheme, darkTheme } from '../../../themes';

// import {LinearGradient} from 'expo-linear-gradient';
// import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);


// create a component
const StatCardLoader = () => {

    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;
    
    return (

        <View className='space-y-2' style={[styles.card, { backgroundColor: themeColor.secondary, borderColor: themeColor.border }]}>
        <View className='flex-row space-x-2 items-center'>
          <View shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} style={{width:20, height:20, backgroundColor: themeColor.tertiary, borderRadius: 3}} />
          <View shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} style={{width:25, height:10, backgroundColor: themeColor.tertiary, borderRadius: 3}}/>
        </View>
          <View shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} style={{width:'100%', height:10, backgroundColor: themeColor.tertiary, borderRadius: 3}}/>
          <View shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} style={{width:'100%', height:5, backgroundColor: themeColor.tertiary, borderRadius: 3}}/>
        </View>

     
    );
};

// Define styles
const styles = StyleSheet.create({
    card: {
      width: '30%', // Each card takes up approximately 30% of the container width
      padding: 16,
      marginVertical: 8,
      borderWidth: 1,
      borderRadius: 8,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
  });

//make this component available to the app
export default StatCardLoader;

