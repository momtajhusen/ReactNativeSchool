// Import libraries
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import HeaderTitle from '../../components/common/headerTitle';
import UserListCard from '../../components/common/UserListCard';
import { createApiClient } from '../../apiClient';
import * as Animatable from 'react-native-animatable';
import { useIsFocused } from '@react-navigation/native'; 

// Create a component
const AllStudents = () => {
  const { state } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

  // State to store students data
  const [students, setStudents] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to manage error state
  const [error, setError] = useState(null);

  const isFocused = useIsFocused(); 

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Function to fetch students data
  const fetchStudents = async (page = 1) => {
    try {

      const apiClient = await createApiClient();
      const response = await apiClient.get(`/get-all-student?page=${page}`);
 
      const newStudents = response.data.data.data || [];

      if (newStudents.length > 0) {
        setStudents((prevStudents) => [...prevStudents, ...newStudents]);
        setHasMore(true); // More data is available
      } else {
        setHasMore(false); // No more data to load
      }

      setLoading(false);
      setLoadingMore(false);
    } catch (err) {
      console.error('Error fetching students:', err); // Debug: Log the error
      setError('Failed to fetch students');
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchStudents(currentPage);
  }, [isFocused]);

  // Function to handle loading more data when scrolled to the end
  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      setLoadingMore(true); // Show loading indicator immediately
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchStudents(nextPage);
    }
  };

  // if (loading) {
  //   return (
  //     <View style={[styles.loaderContainer, { backgroundColor: themeColor.primary }]}>
  //       <ActivityIndicator size="large" color={themeColor.text} />
  //     </View>
  //   );
  // }

  // Render error message if API call fails
  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: themeColor.primary }]}>
        <Text style={[styles.errorText, { color: themeColor.text }]}>{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-5 pb-5" style={[{ backgroundColor: themeColor.primary }]}>
      <HeaderTitle title="STUDENTS" />
      <ScrollView
        className="s-y-3"
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={400}
      >
        {students.map((student, index) => (
          <Animatable.View
            key={`${student.id}-${index}`} // Ensure each card has a unique key
            animation="fadeInLeft"
            delay={300 * index}
            direction="alternate"
          >
            <UserListCard
              title={`${student.first_name} ${student.middle_name} ${student.last_name}`}
              subtitle={`${student.class} - ${index}`} // Use class and section as subtitle
              img={`https://reactschool.scriptqube.com/storage/${student.student_image}`} // Adjust the URL if necessary
            />
          </Animatable.View>
        ))}
        {loadingMore && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={themeColor.text} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Helper function to check if the user is close to the bottom of the ScrollView
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    paddingVertical: 15,
  },
});

// Make this component available to the app
export default AllStudents;
