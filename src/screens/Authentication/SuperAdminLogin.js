import React, { useState, useContext, useEffect } from 'react';
import { View, Alert, Text, Image } from 'react-native';
import CustomInput from '../../components/common/form/customTextInput';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import CustomButton from '../../components/common/customeButton';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createApiClient } from '../../apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({route}) => {
 
    const { school } = route.params;

  const { state } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;


  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [schoolDomain, setSchoolDomain] = useState('');


// Fetch data from AsyncStorage when the component mounts
useEffect(() => {
    const fetchSchoolDomain = async () => {
      try {
        const domain = await AsyncStorage.getItem('school_domain');
        if (domain !== null) {
          setSchoolDomain(domain);
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

  const validateInputs = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailMessage('Please enter a valid email');
      isValid = false;
    } else {
      setEmailMessage('');
    }

    if (password.length === 0) {
      setPasswordMessage('Please enter your password.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordMessage('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setPasswordMessage('');
    }

    setTimeout(() => {
      setPasswordMessage('');
      setEmailMessage('');
    }, 2000);

    return isValid;
  };

  const login = async () => {
    if (validateInputs()) {
      try {
        setIsLoading(true);
        const apiClient = await createApiClient();
        const baseURL = apiClient.defaults.baseURL;

        console.log(baseURL);

        const response = await apiClient.post('/super-admin-login', {
          email: email,
          password: password,
        });

        console.log(response);

        if (response.status === 200) {
          const { data } = response;

          if (data.status === 'user match') {

                if (data.email_verification === 'off') {
                  navigation.replace('DrawerNavigator');
                } 
                else if(data.email_verification === 'on'){
                  navigation.navigate('Verification', { email: email, psd: password });
                }

          } else if (data.status === 'Incorrect password') {
            setPasswordMessage('Incorrect password');
          }
        } else {
          Alert.alert('Error', 'Unexpected response from server');
        }
      } catch (error) {
        if (error.response) {
          Alert.alert('Login failed', error.response.data.message || 'An error occurred');
          console.log(error);
        } else if (error.request) {
          Alert.alert('Network error', 'Please check your internet connection');
        } else {
          Alert.alert('Error', 'An error occurred while logging in');
        }
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      setPasswordMessage('');
      setEmailMessage('');
    }, 2000);
  };

  return (
    <View className='p-4 px-5 flex-1 justify-around' style={[{ backgroundColor: themeColor.primary }]}>
      <View>
        <View className='flex items-center p-4 my-5'>
        <Image
            style={{  width: 70, height: 70, borderRadius: 10,}}
            source={{ uri: schoolDomain+'/storage/upload_assets/school/school_logo.png' }} // Replace with your image URL
            resizeMode="cover" // or 'contain', 'stretch', 'repeat', 'center'
        />
          <Text className='mt-3' style={{ color: themeColor.text, fontWeight: 'bold', fontSize:20 }}>{school} School</Text>
        </View>

        <CustomInput
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          message={emailMessage}
          className='mb-3'
        />
        <CustomInput
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          keyboardType='visible-password'
          message={passwordMessage}
          className='mb-5'
        />

        <CustomButton
          className='my-5'
          buttonText='Login'
          onPress={login}
          loading={isLoading}
          buttonDesign='border'
        />
      </View>
      <Text className='text-center' style={{ color: themeColor.text }}>Script Qube Software</Text>
    </View>
  );
};

export default Login;
