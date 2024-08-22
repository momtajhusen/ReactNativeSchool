import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Modal, TouchableOpacity, Alert } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentsListCard = ({ student, student_image, th, pr, onThChange, onPrChange }) => {
    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

    const [schoolDomain, setSchoolDomain] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

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
    }, []);

    const handleImagePress = () => {
        setModalVisible(true);
    };

    return (
        <View className='p-2 flex-row items-center justify-between' style={{ borderBottomWidth: 1, borderColor: themeColor.border }}>
            <View className='flex-row space-x-2'>
                <TouchableOpacity onPress={handleImagePress}>
                    <View className='p-1' style={{ borderWidth: 1, borderColor: themeColor.border, borderRadius: 2 }}>
                        <Image
                            source={{ uri: `${schoolDomain}/storage/${student_image}` }}
                            style={{ height: 40, width: 40, borderRadius: 2 }}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={{ color: themeColor.text }}>{student}</Text>
            </View>
            <View className='flex-row space-x-2'>
                <View className='items-center'>
                    <Text style={{ color: themeColor.text, fontSize: 12 }}>TH</Text>
                    <TextInput
                        className='text-center'
                        style={{
                            height: 30,
                            width: 50,
                            borderWidth: 1,
                            borderColor: themeColor.border,
                            borderRadius: 5,
                            fontWeight: 'bold',
                            color: themeColor.text
                        }}
                        maxLength={5}
                        keyboardType="decimal-pad"
                        value={th}
                        onChangeText={onThChange}
                    />
                </View>
                <View className='items-center'>
                    <Text style={{ color: themeColor.text, fontSize: 12 }}>PR</Text>
                    <TextInput
                        className='text-center'
                        style={{
                            height: 30,
                            width: 50,
                            borderWidth: 1,
                            borderColor: themeColor.border,
                            borderRadius: 5,
                            fontWeight: 'bold',
                            color: themeColor.text
                        }}
                        maxLength={6}
                        keyboardType="decimal-pad"
                        value={pr}
                        onChangeText={onPrChange}
                    />
                </View>
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View className='items-center p-3 justify-start' style={[styles.modalImage, { backgroundColor: themeColor.secondary }]}>
                        <Image source={{ uri: `${schoolDomain}/storage/${student_image}` }}
                            style={{
                                width: '100%',
                                height: '90%',
                                borderRadius: 10
                            }}
                        />
                        <Text className='m-3 font-bold' style={{ fontSize: 15, color: themeColor.tertiary }}>{student}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalImage: {
        width: '60%',
        height: '40%',
        padding: 10,
        borderRadius: 10
    },
});

export default StudentsListCard;
