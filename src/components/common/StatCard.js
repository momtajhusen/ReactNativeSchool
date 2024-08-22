//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import { MaterialIcons } from '@expo/vector-icons';

// create a component
const StatCard = ({ icon, title, value }) => {

    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={[styles.card, { backgroundColor: themeColor.secondary, borderColor: themeColor.border }]}>
        <View className='flex-row'>
          <MaterialIcons color={themeColor.accent} name={icon} size={17}/>
          <Text className='mx-2' style={{ color: themeColor.text, fontWeight:'bold' }}>{value}</Text>
        </View>
        <Text style={{ color: themeColor.text, fontSize:12, marginTop:2 }}>{title}</Text>
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
export default StatCard;
