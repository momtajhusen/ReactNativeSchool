//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../../context/AppContext';
import { lightTheme, darkTheme } from '../../../themes';

import {LinearGradient} from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);


// create a component
const UserListCardLoader = () => {

    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;
    

    return (
    
        <View className='p-2 my-1 flex-row' style={{borderRadius:8, backgroundColor:themeColor.secondary, borderBottomWidth:1, borderBottomColor:themeColor.border}}>

            <ShimmerPlaceholder shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} style={{ width: 50, height: 50, borderRadius: 3, backgroundColor:themeColor.tertiary}} />
            <View className='mx-3 py-3 space-y-1 flex-1'>
                <ShimmerPlaceholder shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} style={{ height: 10, width:'70%', backgroundColor:themeColor.tertiary,  marginBottom: 3 }} />
                <ShimmerPlaceholder shimmerColors={[themeColor.tertiary, themeColor.secondary, themeColor.tertiary]} style={{ height: 10, width:'50%', backgroundColor:themeColor.tertiary }} />
            </View>
        </View>

     
    );
};

//make this component available to the app
export default UserListCardLoader;

