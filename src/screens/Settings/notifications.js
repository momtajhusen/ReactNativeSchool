//import liraries
import React, { useContext } from 'react';
import { View, Text} from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';



// create a component
const Notifications = () => {

  // Access the theme mode from context
  const { state, dispatch } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

 
  const navigation = useNavigation();
  

    return (
        <View className="flex-1 p-4" style={{backgroundColor:themeColor.primary}}>
            <Text style={{fontSize:25, color:themeColor.text}}>Notifications</Text>

            <View className='flex-1 justify-center items-center'>
                    <MaterialIcons name="notifications-off" size={60} style={{ color: themeColor.text }} />  
                    <Text style={{fontSize:23, color:themeColor.text}}>No Notifications</Text>
                    <Text style={{fontSize:15, color:themeColor.text}}> You do not have any</Text>
                    <Text style={{fontSize:15, color:themeColor.text}}> notifications at this time</Text>
            </View>

        </View>
    );
};
 

//make this component available to the app
export default Notifications;
