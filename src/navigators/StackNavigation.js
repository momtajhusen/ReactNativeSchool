//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Dashboard from '../screens/dashboard';
import Students from '../screens/studentsManagement';
import Setting from '../screens/Settings/setting';
import DrawerNavigator from './DrawerNavigation';
import Header from '../components/common/header';
import SplashScreen from '../components/common/splashScreen';
import Login from '../screens/Authentication/SuperAdminLogin';
import Verification from '../screens/Authentication/VerifucationCode';
import SchoolSelect from '../screens/Authentication/SchoolSelect';
import ExamMarkUpdate from '../components/ExamManagement/ExamMarkUpdate';
import ViewTabulation from '../components/ExamManagement/ViewTabulation';
import Notifications from '../screens/Settings/notifications';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// create a component
const StackNavigation = () => {
    return (
        <View className="flex-1">
            <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                <Stack.Screen name="Verification" component={Verification} options={{headerShown: false}} />
                <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{headerShown: false}} />
                <Stack.Screen name="Setting" component={Setting} options={{headerShown: false}} />
                <Stack.Screen name="Notifications" component={Notifications} options={{headerShown: false}} />
                <Stack.Screen name="SchoolSelect" component={SchoolSelect} options={{headerShown: false}} />
                <Stack.Screen name="ExamMarkUpdate" component={ExamMarkUpdate} options={{headerShown: false}} />
                <Stack.Screen name="ViewTabulation" component={ViewTabulation} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
        </View>
    );
};

//make this component available to the app
export default StackNavigation;
