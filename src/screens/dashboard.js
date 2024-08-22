// Import libraries
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { AppContext } from '../context/AppContext';
import { lightTheme, darkTheme } from '../themes';
import { MaterialIcons } from '@expo/vector-icons';
import StatCard from '../components/common/StatCard';
import { createApiClient } from '../apiClient'; // Make sure this is correctly set up to make API requests
import HeaderTitle from '../components/common/headerTitle';
import * as Animatable from 'react-native-animatable';
import CustomAlert from '../components/common/cusromeAlert';
import CustomButton from '../components/common/customeButton';
 

// Create Dashboard component
const Dashboard = () => {
  const { state } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;
  
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(true);

  // Fetch data from API
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const apiClient = await createApiClient();
      const response = await apiClient.get('/super-admin-dashboard-data');
      setDashboardData(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: themeColor.primary }]}>
        {/* <ActivityIndicator size="large" color={themeColor.text} /> */}
      </View>
    );
  }


  const notification = ()=>{
    alert('Hello');
}



  return (
    <View style={[styles.container, { backgroundColor: themeColor.primary }]}>

      <RefreshControl refreshing={loading} onRefresh={()=>{
         fetchDashboardData();
      }}>

     <HeaderTitle title='Dashboard' />   



        <Animatable.View
          animation="fadeIn"
          delay={300}
          duration={2000}
        style={styles.cardContainer}>
          <StatCard icon='group' title="Total Students" value={dashboardData.Total_Student} />
          <StatCard icon='person-add' title="New Students" value={dashboardData.New_Students} />
          <StatCard icon='person-off' title="Leaved Students" value={dashboardData.kickout_students} />
          <StatCard icon='people' title="Parents" value={dashboardData.Total_Parents} />
          <StatCard icon='school' title="Teachers" value={dashboardData.Total_Teacher} />
          <StatCard icon='attach-money' title="Expenses" value={`$${dashboardData.Total_Expenses}`} />
          <StatCard icon='savings' title="Total Advance" value={`$${dashboardData.TotalAdvancePaymentAmount}`} />
          <StatCard icon='home' title="Hostel Deposits" value={`$${dashboardData.TotalHostelDepositeAmount}`} />
          <StatCard icon='male' title="Male Students" value={dashboardData.Male_Student} />
          <StatCard icon='female' title="Female Students" value={dashboardData.Female_Student} />
        </Animatable.View>

      </RefreshControl>

    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    // paddingVertical: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

// Export component
export default Dashboard;
