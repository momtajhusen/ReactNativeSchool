//import liraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


// create a component
const Setting = () => {

  // Access the theme mode from context
  const { state, dispatch } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

  const [isSwitchOn, setIsSwitchOn] = React.useState(state.theme.themeMode === 'dark');


  const navigation = useNavigation();
  
  
  const onToggleSwitch = () => {
    const newTheme = isSwitchOn ? 'light' : 'dark';
    setIsSwitchOn(!isSwitchOn);
    dispatch({ type: 'SET_THEME', payload: newTheme });
    dispatch({ type: 'SET_THEME_SWITCH', payload: !isSwitchOn });
  };

  const logout = async ()=>{
    const email = await AsyncStorage.removeItem('email');
    navigation.replace('SchoolSelect');
  }


    return (
        <View className="flex-1 p-4" style={{backgroundColor:themeColor.primary}}>
            <Text style={{fontSize:25, color:themeColor.text}}>Settings</Text>

            <TouchableOpacity className="flex-row items-center justify-between p-2 px-4 mt-4" style={[{ backgroundColor: themeColor.secondary }]}>
                 <Text style={{ color: themeColor.text }}>Light Theme</Text>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
           </TouchableOpacity>

           <TouchableOpacity onPress={logout} className="flex-row p-4 items-center justify-between my-4" style={[{ backgroundColor: themeColor.secondary }]}>
                 <Text style={{ color: themeColor.text }}>Log-out</Text>
                 <MaterialIcons name="logout" size={30} style={{ color: themeColor.text }} />
           </TouchableOpacity>
        </View>
    );
};
 

//make this component available to the app
export default Setting;
