// import libraries
import {useEffect, useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import screens
import Dashboard from '../screens/dashboard';
import StudentRegister from '../screens/StudentsManagement/StudentRegister';
import DrawerContent from '../components/common/drawer/drawerContent';
import Header from '../components/common/header';
import AllStudents from '../screens/StudentsManagement/AllStudents';
import AddNewEmployee from '../screens/Employee/AddNewEmployee';
import AllEmployee from '../screens/Employee/AllEmployee';
import MarkEntry from '../screens/Exam Management/MarkEntry';
import Tabulation from '../screens/Exam Management/Tabulation';
import Expenses from '../screens/Report/Expenses';
import FeeCollection from '../screens/Report/FeeCollections';
import FeePayment from '../screens/AccountManagement/FeePayment';
import AddExpenses  from '../screens/AccountManagement/AddExpenses';
import CheckDuesList  from '../screens/AccountManagement/CheckDuesList';


// create drawer navigator
const Drawer = createDrawerNavigator();




// drawer navigator component
const DrawerNavigator = () => {


  const [schoolName, setSchoolName] = useState('');

// Fetch data from AsyncStorage when the component mounts
useEffect(() => {
  const fetchSchoolDomain = async () => {
    try {
      const schoolname = await AsyncStorage.getItem('schoolname');
      if (schoolname !== null) {
        setSchoolName(schoolname);
      } else {
        Alert.alert('Error', 'School domain not found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch school domain');
      console.error(error);
    }
  };

  fetchSchoolDomain();
}, []); // Add empty dependency array to run only once

 

  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          header: () => <Header title={schoolName} rightIcon='settings' navigation={navigation} />, // Set Header for all screens
          drawerStyle: {
            width: 300,
          },
        })}
      >
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Expenses" component={Expenses} />
        <Drawer.Screen name="FeeCollection" component={FeeCollection} />

        <Drawer.Screen name="FeePayment" component={FeePayment} />
        <Drawer.Screen name="CheckDuesList" component={CheckDuesList} />
        <Drawer.Screen name="AddExpenses" component={AddExpenses} />


        <Drawer.Screen name="StudentRegister" component={StudentRegister} />
        <Drawer.Screen name="AllStudents" component={AllStudents} />
        <Drawer.Screen name="AddNewEmployee" component={AddNewEmployee} />
        <Drawer.Screen name="AllEmployee" component={AllEmployee} />
        <Drawer.Screen name="MarkEntry" component={MarkEntry} />
        <Drawer.Screen name="Tabulation" component={Tabulation} />


      </Drawer.Navigator>
      {/* <Text>Hello</Text> */}
    </View>
  );
};

export default DrawerNavigator;
