//import liraries
import React, { useContext, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import { MaterialIcons } from '@expo/vector-icons';
import CustomInput from '../../components/common/form/customTextInput';
import CustomButton from '../../components/common/customeButton';
import { createApiClient } from '../../apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// create a component
  const Verification = ({route}) => {

    const { email, psd} = route.params;


    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

    const navigation = useNavigation();


    const [code, setCode] = useState('');
    const [codeMessage, setCodeMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateInputs = ()=>{
           let isValid = true;

           if(code.length == 0){
              setCodeMessage('enter code');
              isValid = false;
           } else if(code.length < 6){
              setCodeMessage('code must be 6 digit.');
              isValid = false;
           }

           setTimeout(()  => {
            setCodeMessage('');
           }, 2000);

           return isValid;
    }

    const verify = async () => {
        if (validateInputs()) {
            try {
                setIsLoading(true);

                const apiClient = await createApiClient();
    
                const response = await apiClient.post('/super-admin-code-verify', {
                    email: email,
                    psd: psd,
                    code: code,
                });
    
                if (response.status === 200) {
                    const { data } = response;
    
                    if (data.status === 'Verify Success') {

                        await AsyncStorage.setItem('email', email);
                        await AsyncStorage.setItem('role_type', data.role_type);

                        navigation.replace('DrawerNavigator');

                    } else if (data.status === 'Not Verified') {
                        // Alert.alert('Wrong Code', 'plese enter correct code'); // Correct spelling and logic here
                        setCodeMessage('plese enter correct code');
                    }
                }

            } catch (error) {
                // Handle errors
                if (error.response) {
                    // Server responded with a status other than 200 range
                    Alert.alert('Verify failed', error.response.data.message || 'An error occurred');
                    console.log(error);
                } else if (error.request) {
                    // No response from the server
                    Alert.alert('Network error', 'Please check your internet connection');
                } else {
                    // Other errors
                    Alert.alert('Error', 'An error occurred while verify');
                }
            } finally {
                setIsLoading(false);
            }
        }

        setTimeout(() => {
            setCodeMessage('');
        }, 2000);
    }
    



    return (
        <View className='p-4 px-5 flex-1 justify-around' style={[{ backgroundColor: themeColor.primary }]}>

            <View>

                <View className='flex items-center p-4 my-5'>
                   <MaterialIcons  className="mr-2 my-4" color={themeColor.text} name="mobile-friendly" size={40}/>
                   <Text style={{color:themeColor.text, fontWeight:'bold'}}>Verification</Text>
                   <Text style={{color:themeColor.text, fontWeight:'bold'}}>Check your email</Text>
                   <Text style={{color:themeColor.text, fontWeight:'bold'}}>{email}</Text>
                   <Text style={{color:themeColor.text, fontWeight:'bold'}}>Enter 6 Digit code for login</Text>
                   <Text style={{color:themeColor.text, fontWeight:'bold'}}>------------------------------------</Text>

                </View>

                <CustomInput
                    placeholder='Code'
                    value={code}
                    onChangeText={setCode}
                    message={codeMessage}
                    keyboardType='numeric'
                    className='mb-3'
                />

                <CustomButton buttonText='Verified' onPress={verify} loading={isLoading} buttonDesign='border' />
            </View>
            <Text className='text-center' style={{color:themeColor.text}}>Script Qube Software</Text>
           
        </View>
    );

};


//make this component available to the app
export default Verification;
