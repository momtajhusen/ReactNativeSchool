import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { AppContext } from '../context/AppContext';
import { lightTheme, darkTheme } from '../themes';
import StatCard from '../components/common/StatCard';
import HeaderTitle from '../components/common/headerTitle';
import BarChartComponent from '../components/common/Charts/BarChartComponent';
import LineChartComponent from '../components/common/Charts/LineChartComponent';
import PieChartComponent from '../components/common/Charts/PieChartComponent';
import StatCardLoader from '../components/common/SkeletonLoader/StatCardLoader';
import BarChartLoader from '../components/common/SkeletonLoader/BarChartLoader';
import { createApiClient } from '../apiClient';
import NepaliCalendar from 'react-native-nepali-calendar';

const Dashboard = () => {
  const { state } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [maleStudent, setMaleStudent] = useState(0);
  const [femaleStudent, setFemaleStudent] = useState(0);

  const screenWidth = Dimensions.get('window').width - 50;

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const pieData = [
    {
      name: 'Male',
      population: maleStudent,
      color: themeColor.accent,
      legendFontColor: themeColor.accent,
      legendFontSize: 15,
    },
    {
      name: 'Female',
      population: femaleStudent,
      color: themeColor.tertiary,
      legendFontColor: themeColor.tertiary,
      legendFontSize: 15,
    },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const apiClient = await createApiClient();
      const response = await apiClient.get('/super-admin-dashboard-data');
      setDashboardData(response.data);
      setMaleStudent(response.data.Male_Student || 0);
      setFemaleStudent(response.data.Female_Student || 0);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColor.primary }]}>
      <HeaderTitle title="Dashboard" />

      {loading ? (
        <View style={styles.cardContainer}>
          {[...Array(6)].map((_, index) => (
            <StatCardLoader key={index} />
          ))}
          <BarChartLoader />
          <BarChartLoader />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.cardContainer}>
            <StatCard icon="group" title="Total Students" value={dashboardData?.Total_Student ?? 0} />
            <StatCard icon="person-add" title="New Students" value={dashboardData?.New_Students ?? 0} />
            <StatCard icon="person-off" title="Leaved Students" value={dashboardData?.kickout_students ?? 0} />
            <StatCard icon="people" title="Parents" value={dashboardData?.Total_Parents ?? 0} />
            <StatCard icon="school" title="Teachers" value={dashboardData?.Total_Teacher ?? 0} />
            <StatCard icon="attach-money" title="Expenses" value={`₹ ${dashboardData?.Total_Expenses ?? 0}`} />

            <BarChartComponent data={data} title="Fee Collection Data" />
            <LineChartComponent data={data} title="Expenses Data" />
            <PieChartComponent data={pieData} title="Students" />

            {/* Nepali Calendar Integration */}
            <NepaliCalendar
              onMonthChange={(month) => {
                console.log('Selected Month:', month);
              }}
              onDateChange={(date) => {
                console.log('Selected Date:', date);
              }}
              onDayLongPress={(day) => {
                console.log('Long Pressed Day:', day);
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default Dashboard;
