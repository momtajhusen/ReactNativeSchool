import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from '../../components/common/customeButton';
import CustomSelect from '../../components/common/form/customeSelect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SchoolSelect = () => {
  const { state, dispatch } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const navigation = useNavigation();

  // Define options for the select component
  const options = [
    { label: 'Gurukul', address: 'arang', value: 'https://gurukul.scriptqube.com' },
    { label: 'Sunrise', address: 'arang', value: 'https://sunrise.scriptqube.com' },
    { label: 'Demo School', address: 'arang', value: 'https://demo.scriptqube.com' },
    // { label: 'LocalHost', address: 'arang', value: 'http://127.0.0.1:8000' },
  ];

  const next = async () => {
    if (selectedOption) {
      const school = selectedOption.label;
      const url = selectedOption.value;

      await AsyncStorage.setItem('school_domain', url);
      await AsyncStorage.setItem('schoolname', school);

      dispatch({ type: 'SET_DOMAIN_NAME', payload: url });

      navigation.navigate('Login', { school: school });
    } else {
      alert('Please select a school');
    }
  };

  return (
    <View className='p-4 px-5 flex-1 justify-around' style={[{ backgroundColor: themeColor.primary }]}>
      <View>
        <View className='flex items-center p-4 my-5'>
          <MaterialIcons className="mr-2 my-4" color={themeColor.text} name="school" size={40} />
          <Text style={{ color: themeColor.text, fontWeight: 'bold' }}>Select Your School</Text>
        </View>

        <CustomSelect
          options={options}
          selectedOption={selectedOption}
          onSelect={(option) => setSelectedOption(option)}
          selectType="schools"
        />

        <CustomButton className='my-5' buttonText='Next' onPress={next} loading={isLoading} buttonDesign='border' />
      </View>
      <Text className='text-center' style={{ color: themeColor.text }}>Script Qube Software</Text>
    </View>
  );
};

export default SchoolSelect;
