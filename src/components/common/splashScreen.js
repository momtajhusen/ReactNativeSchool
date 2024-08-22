//import liraries
import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';




// create a component
const SplashScreen = () => {

    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

    const navigation = useNavigation();

    useEffect(() => {
        const checkEmailAndNavigate = async () => {
          const email = await AsyncStorage.getItem('email');
          if (email !== null) {
            navigation.replace('DrawerNavigator');
          } else {
            navigation.replace('SchoolSelect');
          }
        };
    
        const timer = setTimeout(() => {
          checkEmailAndNavigate();
        }, 3000);
    
        return () => clearTimeout(timer);
      }, [navigation]);

    return (
        <View style={[styles.container, {backgroundColor:themeColor.primary}]}>
              <Animatable.View 
              animation="zoomIn"
              duration={2000} 
              className='p-1' 
              style={{borderWidth: 1,
               borderColor:themeColor.border, 
               borderRadius: 10,}}>
              <Image 
               source={require('../../../assets/schoolLogo/logo.png')} 
               style={{ width: 100, height: 100}}
              />
              </Animatable.View>

               <Animatable.Text delay={1500} animation="flipInY" className='mt-4' style={{color:themeColor.accent, fontWeight:'bold', fontSize:30}}>ScriptQube</Animatable.Text>
        </View>
    );
};

// create styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default SplashScreen;
