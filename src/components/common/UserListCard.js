import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import { Avatar, Card, IconButton } from 'react-native-paper';

// Create a component
const UserListCard = ({ title, subtitle, img }) => {

    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

    return (
        <View>
            <View className='p-2 my-1 flex-row' style={{backgroundColor:themeColor.secondary, borderBottomWidth:1, borderBottomColor:themeColor.border}}>
               <Image className='p-1 border' style={{width:50,}} source={{ uri: img}} />
               <View className='mx-3'>
                  <Text style={{color:themeColor.text, fontWeight:'bold', fontSize:16,}}>{title}</Text>
                  <Text style={{color:themeColor.tertiary, fontWeight:'bold'}}>{subtitle}</Text>
               </View>
            </View>
        </View>
    );
};

// Make this component available to the app
export default UserListCard;
