//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../../context/AppContext';
import { lightTheme, darkTheme } from '../../../themes';

// import {LinearGradient} from 'expo-linear-gradient';
// import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);


// create a component
const BarChartLoader = () => {

    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;
    
    return (

        <View className='space-y-3' style={[styles.card, { backgroundColor: themeColor.secondary, borderColor: themeColor.border }]}>
            <View className='flex-row justify-center'>
              <View shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} style={{width:'80%', height:15, backgroundColor: themeColor.tertiary, borderRadius: 3}}/>
            </View>
            <View className='flex-row p-0 m-0 space-x-2' style={{height:'85%'}}>
                <View className='justify-between' style={{width:'15%'}}>
                    <View shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} style={{height:10, width:'100%', borderRadius:5}}/>
                    <View shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} style={{height:10, width:'100%', borderRadius:5}}/>
                    <View shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} style={{height:10, width:'100%', borderRadius:5}}/>
                    <View shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} style={{height:10, width:'100%', borderRadius:5}}/>
                    <View shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} style={{height:10, width:'100%', borderRadius:5}}/>
                    <View shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} style={{height:10, width:'100%', borderRadius:5}} />
                </View>
                <View shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} className='flex-1' style={{height:'100%', borderRadius:3}}/>
            </View>
        </View>

     
    );
};

// Define styles
const styles = StyleSheet.create({
    card: {
      height:250,
      width: '100%', // Each card takes up approximately 30% of the container width
      padding: 16,
      marginVertical: 8,
      borderWidth: 1,
      borderRadius: 8,
      borderRadius: 16,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
  });

//make this component available to the app
export default BarChartLoader;

