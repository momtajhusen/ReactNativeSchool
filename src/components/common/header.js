// import libraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';


// create a component
const Header = ({ title, rightIcon }) => {
  const { state } = useContext(AppContext);
  const theme = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

  const navigation = useNavigation();

  return (
    <View className="flex-row justify-between p-5"
      style={{ backgroundColor: theme.primary, color: theme.text }}
    >
      <View className="flex-row">
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <MaterialIcons name="apps" size={30} style={{ color: theme.text }} />
          </TouchableOpacity>
          <Text className="font-bold text-base ml-2" style={{ color: theme.text }}>
            {title}
          </Text>
      </View>

      <View className='flex-row space-x-4'>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <MaterialIcons name={rightIcon} size={25} style={{ color: theme.text }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <MaterialIcons name='notifications' size={25} style={{ color: theme.text }} />
          </TouchableOpacity>
      </View>

    </View>
  );
};

//make this component available to the app
export default Header;
