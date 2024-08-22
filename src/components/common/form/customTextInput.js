import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { AppContext } from '../../../context/AppContext';
import { lightTheme, darkTheme } from '../../../themes';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Or any icon library you prefer

const CustomInput = ({
  inputTitle,
  value,
  onChangeText,
  placeholder,
  icon,
  keyboardType,
  secureTextEntry,
  style,
  placeholderStyle,
  message,
  maxLength,
  showCounter = false,
  inputType // New prop for input type
}) => {
  const { state } = useContext(AppContext);
  const [isFocused, setIsFocused] = useState(false);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    if (inputType === 'date' && !value) {
      // Get current date in YYYY-MM-DD format
      const currentDate = new Date().toISOString().split('T')[0];
      // Set the current date as the input's value
      onChangeText(currentDate);
    }
  }, [inputType, value, onChangeText]);

  return (
    <View style={styles.container}>
      {icon && (
        <Icon
          name={icon}
          size={25}
          color={themeColor.text}
          style={styles.icon}
        />
      )}
      <View style={styles.inputContainer}>
        {inputTitle && (
          <View style={styles.titleContainer}>
            <Text className="mb-1" style={{ color: themeColor.text }}>
              {inputTitle}
            </Text>
            {showCounter && maxLength && (
              <Text style={[styles.charCount, { color: themeColor.text }]}>
                {value.length}/{maxLength}
              </Text>
            )}
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeColor.secondary,
              color: themeColor.text,
              borderWidth: 1,
              borderColor: themeColor.border,
            },
            style,
          ]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={themeColor.tertiary}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
        />
        {message && <Text style={{ color: themeColor.error }}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
  },
  icon: {
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  charCount: {
    fontSize: 14,
    color: 'grey',
  },
  input: {
    height: 60,
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholder: {
    position: 'absolute',
    top: 20,
    left: 10,
    fontSize: 15,
    fontWeight: 'normal',
    color: 'grey',
  },
});

export default CustomInput;
