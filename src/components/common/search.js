//import liraries
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';



// create a component
const CustomeSearch = ({ searchQuery, onSearch, loading }) => {

    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

    return (
        <View className='space-x-3 p-1 px-3 mb-2' style={[styles.inputContainer, {borderWidth:1, borderColor:themeColor.border}]}>
            <TextInput
                className="flex-1"
                style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    fontWeight: 'bold',
                    color: themeColor.text,
                }}
                placeholder='Search'
                placeholderTextColor={themeColor.tertiary}
                value={searchQuery}
                onChangeText={onSearch}
            />   

                {loading ? (
                <ActivityIndicator color={themeColor.tertiary}  size={20} />
                ) : (
                    <MaterialIcons name='search' size={23} style={{ color: themeColor.tertiary }} />   
                )}
        </View>
    );
};


const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginLeft: 10,
    },
});
 

//make this component available to the app
export default CustomeSearch;
