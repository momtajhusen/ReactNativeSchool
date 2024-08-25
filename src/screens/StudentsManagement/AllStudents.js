// Import libraries
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import HeaderTitle from '../../components/common/headerTitle';
import UserListCard from '../../components/common/UserListCard';
import { createApiClient } from '../../apiClient';
import { useIsFocused } from '@react-navigation/native'; 

// Create a component
const AllStudents = () => {
  const { state } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;
  const schoolDomain = state.school.schoolDomainName;

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
    
    // Check if response is defined and has the expected structure
    const newStudents = response?.data?.data?.data || [];

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

  return (
    <View className="flex-1 px-5 pb-5" style={[{ backgroundColor: themeColor.primary }]}>
      <HeaderTitle title="STUDENTS" />
      <FlatList
        data={students}
        renderItem={({ item, index }) => (
          <View>
            <UserListCard
              key={item.id}
              title={`${item.first_name} ${item.middle_name} ${item.last_name}`}
              subtitle={`${item.class} - ${index + 1}`} // Use class and section as subtitle
              img={`${schoolDomain}/storage/${item.student_image}`} // Adjust the URL if necessary
            />
          </View>

        )}
        onEndReached={handleLoadMore} // Trigger when reaching the end
        onEndReachedThreshold={0.9} // Trigger when 90% of the list is scrolled
        ListFooterComponent={
          hasMore ? (
            loadingMore && (
              <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <ActivityIndicator size="large" color={themeColor.accent} />
                <Text style={{ color: themeColor.text }}>Loading more students ...</Text>
              </View>
            )
          ) : (
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <Text style={{ color: themeColor.text }}>No more students available</Text>
            </View>
          )
        }
      />
    </View>
  );
};

// Make this component available to the app
export default AllStudents;
