// Import libraries
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import { AppContext } from '../context/AppContext';
import { lightTheme, darkTheme } from '../themes';
import { MaterialIcons } from '@expo/vector-icons';
import StatCard from '../components/common/StatCard';
import { createApiClient } from '../apiClient'; // Make sure this is correctly set up to make API requests
import HeaderTitle from '../components/common/headerTitle';
import * as Animatable from 'react-native-animatable';
import CustomAlert from '../components/common/cusromeAlert';
import CustomButton from '../components/common/customeButton';
import { BarChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';
import BarChartComponent from '../components/common/Charts/BarChartComponent';
import LineChartComponent from '../components/common/Charts/LineChartComponent';

import ProgressChartComponent from '../components/common/Charts/ProgressChartComponent';
import StackedBarChartComponent from '../components/common/Charts/StackedBarChartComponent';
import PieChartComponent from '../components/common/Charts/PieChartComponent';
import ContributionGraphComponent from '../components/common/Charts/ContributionGraphComponent';
// import AbstractChartComponent from '../components/common/Charts/AbstractChartComponent';
import DonutChartComponent from '../components/common/Charts/DonutChartComponent';

 

// Create Dashboard component
const Dashboard = () => {
  const { state } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;
  
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(true);

  const screenWidth = Dimensions.get('window').width-50;

  const [MaleStudent, setMaleStudent] = useState(0);
  const [FemaleStudent, setFemaleStudent] = useState(0);

  const [scrollPosition, setScrollPercentage] = useState(0);

 

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const progressData = {
    labels: ["Swim", "Bike", "Run"], // Labels for each progress segment
    data: [0.4, 0.6, 0.8] // Values should be between 0 and 1 (representing percentages)
  };

  const stackedBarData = {
    labels: ["Q1", "Q2", "Q3", "Q4"], // Labels for the X-axis
    legend: ["Sales", "Profit", "Expense"], // Legend labels
    data: [
      [60, 60, 60], // Data for Q1
      [30, 40, 50], // Data for Q2
      [80, 90, 100], // Data for Q3
      [40, 50, 60] // Data for Q4
    ],
    barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"] // Colors for each segment
  };

  const pieData = [
    {
      name: "Male",
      population: MaleStudent, // Percentage or actual number
      color: themeColor.accent, // Color for Male
      legendFontColor: themeColor.accent, // Color of legend text
      legendFontSize: 15 // Size of legend text
    },
    {
      name: "Female",
      population: FemaleStudent, // Percentage or actual number
      color: themeColor.tertiary, // Color for Female
      legendFontColor: themeColor.tertiary, // Color of legend text
      legendFontSize: 15 // Size of legend text
    }
  ];
  

  const contributionData = [
    { date: "2024-01-01", count: 1 },
    { date: "2024-08-02", count: 2 },
    { date: "2024-08-03", count: 3 },
    { date: "2024-08-04", count: 4 },
    { date: "2024-08-05", count: 5 },
    { date: "2024-08-06", count: 2 },
    { date: "2024-08-07", count: 4 },
    { date: "2024-08-08", count: 6 },
    // Add more entries as needed
  ];

  const abstractData = {
    labels: ["January", "February", "March", "April", "May", "June"], // Labels for X-axis
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43], // Data points for Y-axis
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Color of the data points
        strokeWidth: 2, // Width of the line
      },
    ],
    legend: ["Sales"], // Legend label
  };

 
  
  
  
  



 

  // Fetch data from API
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const apiClient = await createApiClient();
      const response = await apiClient.get('/super-admin-dashboard-data');
      setDashboardData(response.data);
      console.log(response.data);
      setMaleStudent(response.data.Male_Student);
      setFemaleStudent(response.data.Female_Student);
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

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const percentage = (contentOffset.y / (contentSize.height - layoutMeasurement.height)) * 100;
 

    const scrollPercentage =  Math.round(percentage);

    // if(scrollPercentage == 100){
    //   alert(scrollPercentage);
    // }
  };


  return (
    <View style={[styles.container, { backgroundColor: themeColor.primary }]}>

      {/* <RefreshControl refreshing={loading} onRefresh={()=>{
         fetchDashboardData();
      }}> */}

     <HeaderTitle title='Dashboard' /> 
       <Text>{scrollPosition}</Text>

        <ScrollView showsVerticalScrollIndicator={true}  onScroll={handleScroll}>
        <View style={styles.cardContainer}>
          <StatCard icon='group' title="Total Students" value={dashboardData.Total_Student} />
          <StatCard icon='person-add' title="New Students" value={dashboardData.New_Students} />
          <StatCard icon='person-off' title="Leaved Students" value={dashboardData.kickout_students} />
          <StatCard icon='people' title="Parents" value={dashboardData.Total_Parents} />
          <StatCard icon='school' title="Teachers" value={dashboardData.Total_Teacher} />
          <StatCard icon='attach-money' title="Expenses" value={`₹ ${dashboardData.Total_Expenses}`} />

          <BarChartComponent data={data} title="Fee Collection Data" />
          <LineChartComponent data={data} title="Expenses Data" />
          <PieChartComponent data={pieData} title="Students" />

 

        </View>
        </ScrollView>

      {/* </RefreshControl> */}



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
