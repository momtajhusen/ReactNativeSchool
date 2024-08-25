//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import HeaderTitle from '../../components/common/headerTitle';
import CustomButton from '../../components/common/customeButton';

// create a component
const FeePayment = () => {
    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

    return (
        <View className='px-6 flex-1' style={[{ backgroundColor: themeColor.primary }]}>
            <HeaderTitle title='Fee Payment' />
 
        </View>
    );
};
 

//make this component available to the app
export default FeePayment;
