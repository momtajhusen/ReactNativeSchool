// Import necessary libraries
import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'; // Import Provider
import StackNavigation from './src/navigators/StackNavigation';
import { AppProvider } from './src/context/AppContext';

// Create the main App component
const App = () => {
  return (
    // Wrap your app with both AppProvider and PaperProvider
    <PaperProvider>
      <AppProvider>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" backgroundColor="black" />
          <StackNavigation />
        </View>
      </AppProvider>
    </PaperProvider>
  );
};

// Export the App component
export default App;
