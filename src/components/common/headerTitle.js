//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import { MaterialIcons } from '@expo/vector-icons';

// create a component
const HeaderTitle = ({title}) => {

    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;
    
    return (
        <Text style={[styles.headerText, { color: themeColor.text, }]}>{title.toUpperCase()}</Text>
    );
};

// Define styles
const styles = StyleSheet.create({
    headerText: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 16,
    },
  });
  

//make this component available to the app
export default HeaderTitle;
