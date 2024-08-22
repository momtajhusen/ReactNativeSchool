import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import HeaderTitle from '../../components/common/headerTitle';
import CustomButton from '../../components/common/customeButton';
import StudentsListCard from './StudentMarkList';
import { createApiClient } from '../../apiClient';
import CustomeSearch from '../common/search';

import ExamHeaderSection from './ExamHeaderSection';
import SubjectTotalPassMarks from './SubjectTotalPassMarks';

// create a component
const ExamMarkUpdate = ({ route }) => {
    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;
    const { examData, selectData } = route.params;

    // Total Marks and Pass Marks 
    const { total_th, total_pr, pass_th, pass_pr } = examData.student_data[0];
    const [StudentData, setStudentData] = useState(examData.student_data);
    const [searchQuery, setSearchQuery] = useState('');

    const [totalThMarks, setTotalThMarks] = useState(total_th);
    const [totalPrMarks, setTotalPrMarks] = useState(total_pr);
    const [passThMarks, setPassThMarks] = useState(pass_th);
    const [passPrMarks, setPassPrMarks] = useState(pass_pr);

    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async () => {
        try {
            setIsLoading(true);

            const apiClient = await createApiClient();
            const response = await apiClient.post('/entry-mark', {
                class_select: selectData.select_class,
                section_select: selectData.select_section,
                select_subject: selectData.select_subject,
                exam_id: selectData.exam_id,
                total_th: totalThMarks,
                total_pr: totalPrMarks,
                pass_th: passThMarks,
                pass_pr: passPrMarks,
                st_id: StudentData.map(student => student.id),
                obt_th_mark: StudentData.map(student => student.obt_th_mark),
                obt_pr_mark: StudentData.map(student => student.obt_pr_mark)
            });
    
            console.log(response.data);
    
            // Handle success
            Alert.alert('Success', response.data.status);
        } catch (error) {
            Alert.alert('Error', 'An error occurred while updating the marks.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleThChange = (studentId, value) => {
        // Allow empty value and values less than or equal to totalThMarks
        if (value === '' || Number(value) <= totalThMarks) {
            setStudentData(prevData =>
                prevData.map(student =>
                    student.id === studentId
                        ? { ...student, obt_th_mark: value }
                        : student
                )
            );
        }
    };

    const handlePrChange = (studentId, value) => {
        // Allow empty value and values less than or equal to totalPrMarks
        if (value === '' || Number(value) <= totalPrMarks) {
            setStudentData(prevData =>
                prevData.map(student =>
                    student.id === studentId
                        ? { ...student, obt_pr_mark: value }
                        : student
                )
            );
        }
    };

    // Search and Filter Data 
    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    const filteredStudentData = StudentData.filter(student =>
        `${student.first_name} ${student.middle_name} ${student.last_name}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

        // Format marks based on condition
        const formatMark = (mark) => {
            const numMark = Number(mark);
            return (numMark % 1 === 0) ? Math.round(numMark).toString() : numMark.toFixed(2).toString();
        };

        

    return (
        <View className='flex-1' style={[styles.container, { backgroundColor: themeColor.primary }]}>
            <HeaderTitle title='EXAM MARK ENTRY' />
            <View className='p-2 rounded-t-lg mb-3' style={{ borderWidth: 1, borderColor: themeColor.border, backgroundColor: themeColor.secondary }}>

                <ExamHeaderSection 
                  themeColor={themeColor} 
                  subject={selectData.select_subject} 
                  classes={selectData.select_class} 
                  section={selectData.select_section} 
                  exam_name={selectData.exam_name} 
                />
 

                <SubjectTotalPassMarks 
                   themeColor={themeColor} 
                   totalThMarks={formatMark(totalThMarks)} 
                   totalPrMarks={formatMark(totalPrMarks)} 
                   passThMarks={formatMark(passThMarks)} 
                   passPrMarks={formatMark(passPrMarks)} 
                   onTotalThChange={(text) => setTotalThMarks(text)}
                   onTotalPrChange={(text) => setTotalPrMarks(text)}
                   onPassThChange={(text) => {
                       if (text === '') {
                           setPassThMarks('');
                           return;
                       }
                       const value = Number(text);
                       if (totalThMarks >= value || text === '') {
                           setPassThMarks(value);
                       } else {
                           setPassThMarks(totalThMarks);
                       }
                   }}
                   onPassPrChange={(text) => {
                       if (text === '') {
                           setPassPrMarks('');
                           return;
                       }
                       const value = Number(text);
                       if (totalPrMarks >= value || text === '') {
                           setPassPrMarks(value);
                       } else {
                           setPassPrMarks(totalPrMarks);
                       }
                   }} 
                />
            </View>

            <View className='p-2 flex-1 mb-3' style={{ borderWidth: 1, borderColor: themeColor.border }}>
                <CustomeSearch 
                    searchQuery={searchQuery} 
                    onSearch={handleSearch}
                />

                <ScrollView>
                    {filteredStudentData.map((student) => (
                        <StudentsListCard 
                          key={student.id} 
                          student={student.first_name + ' ' + student.middle_name + ' ' + student.last_name} 
                          student_image={student.student_image}
                          th={formatMark(student.obt_th_mark)} 
                          pr={formatMark(student.obt_pr_mark)} 
                          onThChange={(value) => handleThChange(student.id, value)}
                          onPrChange={(value) => handlePrChange(student.id, value)}
                        />
                    ))}
                </ScrollView>
            </View>

 
            <CustomButton
                className='my-5'
                buttonText='Update'
                onPress={handleUpdate}
                loading={isLoading}
                buttonDesign='border'
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
    },
});

//make this component available to the app
export default ExamMarkUpdate;
