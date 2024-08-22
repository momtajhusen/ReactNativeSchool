import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DrawerMenu from './drawerMenu';

// Import your context and themes
import { AppContext } from '../../../context/AppContext';
import { lightTheme, darkTheme } from '../../../themes';

 

const DrawerContent = (props) => {
  // Access the theme mode from context
  const { state } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

 

  return (
    <View className="flex-1 p-3" style={[{ backgroundColor: themeColor.primary }]}>

        <View className='py-5 items-center' style={{backgroundColor:themeColor.secondary}}>
            <Text style={{fontWeight:'bold', color:themeColor.text}}>Script Qube</Text>
        </View>
 
        <View className="flex-1 items-center" >
            <View className="flex-1" style={{width:'100%', height:'30%'}}>
               <DrawerMenu />
            </View>
        </View>
  
    </View>
  );
};


// Export the component
export default DrawerContent;
