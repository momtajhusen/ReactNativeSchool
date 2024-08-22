import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import HeaderTitle from '../../components/common/headerTitle';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomeSearch from '../common/search';

const ViewTabulation = ({ route }) => {
    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;
    const { examData, selectData } = route.params;

    const [studentExamData, setStudentExamData] = useState([]);
    const [originalData, setOriginalData] = useState([]); // Keep original data
    const [schoolDomain, setSchoolDomain] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        setStudentExamData(examData.data);
        setOriginalData(examData.data); // Store original data

        const fetchSchoolDomain = async () => {
            const domain = await AsyncStorage.getItem('school_domain');
            setSchoolDomain(domain);
        };
        fetchSchoolDomain();
    }, []);

    const formatMark = (mark) => {
        const numMark = Number(mark);
        return (numMark % 1 === 0) ? Math.round(numMark).toString() : numMark.toFixed(2).toString();
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setLoading(true);

        const filteredData = originalData.filter(student =>
            `${student.first_name} ${student.middle_name} ${student.last_name}`
                .toLowerCase()
                .includes(query.toLowerCase())
        );

        setStudentExamData(filteredData);
        setLoading(false);
    };

    const renderStudentItem = ({ item: student }) => (
        <View className='p-2 mb-2' style={{ borderWidth: 1, borderColor: themeColor.border }}>
            <View className='flex-row justify-between'>
                <View className='flex-row space-x-2' style={{ width: '68%' }}>
                    <Image
                        className='p-1 border'
                        style={{ width: 50, height: 50 }}
                        source={{ uri: `${schoolDomain}/storage/${student.student_image}` || 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-color-icon.png' }}
                    />
                    <Text className='font-bold' style={{ color: themeColor.text }}>
                        {student.first_name} {student.middle_name} {student.last_name}
                    </Text>
                </View>
                <View className='flex-1 px-2' style={{ borderLeftWidth: 1, borderColor: themeColor.border }}>
                    <Text className='font-bold' style={{ color: themeColor.text, fontSize: 13 }}>Rank: {student.position_rank}</Text>
                    <Text className='font-bold' style={{ color: themeColor.text, fontSize: 13 }}>Pct.: {student.final_percentage} %</Text>
                </View>
            </View>

            {student.exam_marks.map((subject, subIndex) => (
                <View key={subIndex} className='p-2 mt-1 flex-row justify-between space-x-2' style={{ backgroundColor: themeColor.secondary }}>
                    <View>
                        <View className='flex-row items-center space-x-1'>
                            <MaterialIcons name='menu-book' size={15} style={{ color: themeColor.text }} />
                            <Text className='font-bold' style={{ color: themeColor.text, fontSize: 16 }}>{subject.subject}</Text>
                        </View>
                        <View className='flex-row space-x-2'>
                            <View>
                                <Text className='font-bold' style={{ color: themeColor.text, fontSize: 11 }}>Total Marks</Text>
                                <View className='flex-row space-x-2'>
                                    <Text className='font-bold' style={{ color: themeColor.text, fontSize: 10 }}>TH: {formatMark(subject.total_th)}</Text>
                                    <Text className='font-bold' style={{ color: themeColor.text, fontSize: 10 }}>PR: {formatMark(subject.total_pr)}</Text>
                                </View>
                            </View>
                            <View>
                                <Text className='font-bold' style={{ color: themeColor.text, fontSize: 11 }}>Pass Marks</Text>
                                <View className='flex-row space-x-2'>
                                    <Text className='font-bold' style={{ color: themeColor.text, fontSize: 10 }}>TH: {formatMark(subject.pass_th)}</Text>
                                    <Text className='font-bold' style={{ color: themeColor.text, fontSize: 10 }}>PR: {formatMark(subject.pass_pr)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text className='font-bold' style={{ color: themeColor.text, fontSize: 14 }}>Obtained Marks</Text>
                            <View>
                                <View className='flex-row space-x-2'>
                                    <Text className='font-bold' style={{ color: themeColor.text, fontSize: 13 }}>TH: {formatMark(subject.obt_th_mark)}</Text>
                                    <Text className='font-bold' style={{ color: themeColor.text, fontSize: 13 }}>PR: {formatMark(subject.obt_pr_mark)}</Text>
                                </View>
                                <View className='flex-row space-x-2'>
                                    <Text className='font-bold' style={{ color: themeColor.text, fontSize: 13 }}>P: {subject.percentage} %</Text>
                                    <Text className='font-bold' style={{ color: themeColor.text, fontSize: 13 }}>G: {subject.grade_name}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );

    return (
        <View className='flex-1' style={[styles.container, { backgroundColor: themeColor.primary }]}>

            <HeaderTitle title='EXAM Tabulation Sheet' />

            <View className='p-2 rounded-t-lg mb-3' style={{ borderWidth: 1, borderColor: themeColor.border, backgroundColor: themeColor.secondary }}>
                <Text className='font-bold mb-1' style={[styles.text, { color: themeColor.text }]}>Class : {selectData.select_class} {selectData.select_section}</Text>
                <Text className='font-bold mb-1' style={[styles.text, { color: themeColor.text }]}>Exam : {selectData.exam_name}</Text>
            </View>

            <View className='flex-1 p-2' style={{ backgroundColor: themeColor.primary, borderWidth: 1, borderColor: themeColor.border }}>
                <CustomeSearch
                    searchQuery={searchQuery}
                    onSearch={handleSearch}
                    loading={loading} 
                />
                <FlatList
                    data={studentExamData}  // Use studentExamData here
                    renderItem={renderStudentItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
    },
});

export default ViewTabulation;
