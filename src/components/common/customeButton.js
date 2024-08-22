// import libraries
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';

// create a component
const CustomButton = ({ onPress, buttonText, buttonStyle, textStyle, loading, buttonDesign }) => {
    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

    // Determine button styles based on buttonDesign prop
    const buttonStyles = [
        styles.button,
        buttonStyle,
        {
            borderWidth: buttonDesign === 'border' ? 1 : 0,
            borderColor: themeColor.border,
            backgroundColor: buttonDesign === 'fill' ? themeColor.tertiary : 'transparent',
        },
    ];

    return (
        <TouchableOpacity
            className="flex-row justify-center"
            onPress={onPress}
            style={buttonStyles}
            disabled={loading} // disable the button while loading
        >
            {loading ? (
                <ActivityIndicator size="large" color={themeColor.text} />
            ) : (
                <Text style={[styles.buttonText, { color: themeColor.text }, textStyle]}>
                    {buttonText}
                </Text>
            )}
        </TouchableOpacity>
    );
};

// define default styles
const styles = StyleSheet.create({
    button: {
        height: 60,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row', // Ensure horizontal alignment for the spinner and text
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

// make this component available to the app
export default CustomButton;
