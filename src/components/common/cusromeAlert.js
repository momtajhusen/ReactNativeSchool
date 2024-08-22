// Import necessary libraries
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';

// Create a custom alert component
const CustomAlert = () => {
  // Use context to get theme mode
  const { state } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

  // State to manage dialog visibility
  const [visible, setVisible] = useState(true);

  // Function to hide the dialog
  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Icon icon="alert" style={{ color: themeColor.text }} />
        <Dialog.Title style={[styles.title, { color: themeColor.text }]}>
          This is a title
        </Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={{ color: themeColor.text }}>
            This is a simple dialog
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                // Handle delete action here
              }}
              style={[
                styles.button,
                {
                  borderColor: themeColor.border,
                  backgroundColor: themeColor.error,
                },
              ]}
            >
              <Text style={{ color: themeColor.text }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={hideDialog}
              style={[
                styles.button,
                {
                  borderColor: themeColor.border,
                  backgroundColor: themeColor.accent,
                },
              ]}
            >
              <Text style={{ color: themeColor.text }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

// Define styles
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    marginLeft: 8,
  },
});

// Export the component
export default CustomAlert;
