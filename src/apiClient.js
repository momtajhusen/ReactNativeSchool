import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to get the base URL from AsyncStorage
const getBaseURL = async () => {
  try {
    const schoolDomain = await AsyncStorage.getItem('school_domain');
    return schoolDomain+'/api' || 'https://demo.com'+'/api'; // Provide a default URL if none is set
  } catch (error) {
    console.error('Failed to load school domain from AsyncStorage:', error);
    return 'https://defaulturl.com/api'; // Return a default URL on error
  }
};

// Function to create an axios instance with the base URL
export const createApiClient = async () => {
  const baseURL = await getBaseURL();

  const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 10000, // 10 seconds
  });

  return apiClient;
};
