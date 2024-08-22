//import liraries
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl, FlatList } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import HeaderTitle from '../../components/common/headerTitle';
import { createApiClient } from '../../apiClient';
import { Avatar, Card, IconButton } from 'react-native-paper';
import UserListCard from '../../components/common/UserListCard';

// create a component
const AllEmployee = () => {

    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;
    const schoolDomain = state.school.schoolDomainName;
 

    const [EmployeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);
 

    useEffect(()=>{
        fetchAllEmployee();
    },[]);

    const fetchAllEmployee = async () => {
        try {
          const apiClient = await createApiClient();
          const response = await apiClient.get('/get-all-employee');

          console.log(response.data.AllEmployee);
        //   return false;
          setEmployeeData(response.data.AllEmployee);
        } catch (error) {
          console.error("Failed to fetch employee data:", error);
        } finally {
          setLoading(false);
        }
      };
    

    return (
        <View className='flex-1 py-3 px-6' style={{backgroundColor:themeColor.primary}}>

          <HeaderTitle title="All Employee" />


            <RefreshControl refreshing={loading} onRefresh={()=>{fetchAllEmployee()}} className='flex'>
 

               <FlatList data={EmployeeData} renderItem={({item, index})=>{
                   return (
                    <UserListCard
                    key={index}
                    title={`${item.first_name} ${item.last_name}`}
                    subtitle={`${item.phone} - ${index}`} // Use class and section as subtitle
                    img={`${schoolDomain}/storage/${item.image}`} // Adjust the URL if necessary
                />
                   )
               }} ></FlatList>

            </RefreshControl>
        </View>
    );
};
 

//make this component available to the app
export default AllEmployee;
