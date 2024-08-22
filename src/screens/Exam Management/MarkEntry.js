// Exam Management/MarkEntry.js 
import React, { useContext, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import HeaderTitle from '../../components/common/headerTitle';
import AllClass from '../../components/common/form/selectOption/AllClass';
import CustomButton from '../../components/common/customeButton';
import CustomSelect from '../../components/common/form/customeSelect';
import ExamTerms from '../../components/common/form/selectOption/ExamTerms';
import { createApiClient } from '../../apiClient'; // Ensure correct import
import { useNavigation } from '@react-navigation/native';

const MarkEntry = () => {
  const { state } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

  const navigation = useNavigation();

  const [selectedExam, setExam] = useState(null);
  const [selectedClass, setClass] = useState(null);
  const [selectedSection, setSection] = useState(null);
  const [selectedSubject, setSubject] = useState(null);

  const [loading, setLoading] = useState(false);
 
  // Create an object to hold all selected values
  const selectedOptions = {
    exam_id: selectedExam?.value,
    exam_name: selectedExam?.label,
    select_class: selectedClass?.value,
    select_section: selectedSection?.value,
    select_subject: selectedSubject?.value,
  };

  const handleExamChange = (option) => {
    setExam(option);
  };

  const handleClassChange = (option) => {
    setClass(option);
    setSection(null);
    setSubject(null);
  };

  const handleSectionChange = (option) => {
    setSection(option);
  };

  const handleSubjectChange = (option) => {
    setSubject(option);
  };

  const searchExam = async () => {
  
    // Validate that all fields are selected
    if (
      !selectedOptions.exam_id ||
      !selectedOptions.select_class ||
      !selectedOptions.select_section ||
      !selectedOptions.select_subject
    ) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
  
    setLoading(true);
  
    try {
      const apiClient = await createApiClient();
      const response = await apiClient.get('/get-studen-mark-entry', {
        params: selectedOptions, // Ensure params are correctly included
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Log and handle the response data as needed
      // console.log('Response:', response.data);

      navigation.navigate('ExamMarkUpdate', { examData: response.data, selectData: selectedOptions});
  
      // Check if response.data is valid for alert display
      const dataString = JSON.stringify(response.data, null, 2);
    } catch (error) {
      console.error('Error fetching data:', error);
      const errorMessage = error.response ? JSON.stringify(error.response.data, null, 2) : error.message;
      Alert.alert('Error', `Failed to fetch data. Details: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={[styles.container, { backgroundColor: themeColor.primary }]}>
      <HeaderTitle title='EXAM MARK ENTRY' />
      <View className='flex flex-col space-y-5'>
        <ExamTerms selectedClass={selectedExam} onClassChange={handleExamChange} />

        <AllClass selectedClass={selectedClass} onClassChange={handleClassChange} />

        <CustomSelect
          options={state.options.classSections}
          selectedOption={selectedSection}
          onSelect={handleSectionChange}
          selectName='Section *'
          enableSearch={false}
        />

        <CustomSelect
          options={state.options.classSubjects}
          selectedOption={selectedSubject}
          onSelect={handleSubjectChange}
          selectName='Subject *'
          loading={false}
        />

        <CustomButton
          buttonText={'Submit'}
          onPress={searchExam}
          buttonDesign='border'
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
});

export default MarkEntry;
