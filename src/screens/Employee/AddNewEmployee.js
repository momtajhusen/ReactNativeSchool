import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert, Image, Button, PermissionsAndroid, TouchableOpacity, Modal, Pressable} from 'react-native';
import { AppContext } from '../../context/AppContext';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from '../../themes';
import CustomInput from '../../components/common/form/customTextInput';
import CustomSelect from '../../components/common/form/customeSelect';
import HeaderTitle from '../../components/common/headerTitle';
import CustomButton from '../../components/common/customeButton';
import { createApiClient } from '../../apiClient';
import * as ImagePicker from 'expo-image-picker';
import CustomAlert from '../../components/common/cusromeAlert';

const AddNewEmployee = () => {
    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;


    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const [empPhoto, setEmpPhoto] = useState(null);

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        address: '',
        phoneNumber: '',
        email: '',
        qualification: '',
        joiningDate: '',
        selectedDepartmentRole: null,
        selectedGender: null,
        selectedReligion: null,
        selectedBloodGroup: null,
    });

    const validateInputs = () => {
        const errors = {};
        let isValid = true;

        const requiredFields = [
            { field: 'firstName', message: 'First Name is required' },
            { field: 'lastName', message: 'Last Name is required' },
            { field: 'dateOfBirth', message: 'Date of Birth is required' },
            { field: 'address', message: 'Address is required' },
            { field: 'phoneNumber', message: 'Phone Number is required' },
            { field: 'email', message: 'Email is required' },
            { field: 'qualification', message: 'Qualification is required' },
            { field: 'joiningDate', message: 'Joining Date is required' },
        ];

        requiredFields.forEach(({ field, message }) => {
            if (!formData[field]?.trim()) {
                errors[field] = message;
                isValid = false;
            }
        });

        if (!formData.selectedGender) {
            errors.gender = 'Gender is required';
            isValid = false;
        }

        if (formData.phoneNumber && !/^\d+$/.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Phone Number must be numeric';
            isValid = false;
        }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email address is invalid';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            address: '',
            phoneNumber: '',
            email: '',
            qualification: '',
            joiningDate: '',
            selectedDepartmentRole: null,
            selectedGender: null,
            selectedReligion: null,
            selectedBloodGroup: null,
        });
        setErrors({});
    };

    const handleImagePicker = async  () => {

 
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          });        
          if (!result.canceled) {

            const selectedImage = result.assets[0];

            if (selectedImage.fileSize > 5 * 1024 * 1024) { // 5MB max file size
                Alert.alert('Image too large', 'The selected image is too large. Please select an image smaller than 5MB.');
                return;
            }

            console.log(selectedImage);

            setEmpPhoto(selectedImage.uri);
            setModalVisible(!modalVisible);
          }
    };

    const handleCameraPicker = async () => {
        try {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          });
      
          if (!result.canceled) {
            const selectedImage = result.assets[0];
            console.log(selectedImage.uri);
            setEmpPhoto(selectedImage.uri);
            setModalVisible(!modalVisible);
          }
        } catch (error) {
          console.error(error);
          alert('An error occurred while capturing the image');
        }
    };
      
    const saveEmployee = async () => {
        
        if (validateInputs()) {
            try {
                setIsLoading(true);

                const formDataToSubmit = new FormData();
                formDataToSubmit.append('first_name', formData.firstName);
                formDataToSubmit.append('last_name', formData.lastName);
                formDataToSubmit.append('department_role', formData.selectedDepartmentRole?.value);
                formDataToSubmit.append('gender', formData.selectedGender?.value);
                formDataToSubmit.append('dob', formData.dateOfBirth);
                formDataToSubmit.append('religion', formData.selectedReligion?.value);
                formDataToSubmit.append('blood_group', formData.selectedBloodGroup?.value);
                formDataToSubmit.append('address', formData.address);
                formDataToSubmit.append('phone', formData.phoneNumber);
                formDataToSubmit.append('email', formData.email);
                formDataToSubmit.append('qualification', formData.qualification);
                formDataToSubmit.append('joining_date', formData.joiningDate);

                if (empPhoto) {
                    formDataToSubmit.append('image', {
                        uri: empPhoto,
                        type: 'image/jpeg',
                        name: 'employee_image.jpg',
                    });
                }

                const apiClient = await createApiClient();
                const response = await apiClient.post('/admin/add_new_employee', formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(response);

                if (response.status === 201) {
                    Alert.alert('Success', 'Employee added successfully');
                    // resetForm();
                } else {
                    Alert.alert('Error', 'Unexpected response from server');
                }
            } catch (error) {
                console.log(error);
                if (error.response) {
                    Alert.alert('Failed', error.response.data.message || 'An error occurred');
                } else if (error.request) {
                    Alert.alert('Network error', 'Please check your internet connection');
                } else {
                    Alert.alert('Error', 'An error occurred while adding employee');
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: themeColor.primary }]}>
            <HeaderTitle title="Add New Employee" />


            {/* Bottom Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.bottomModal, { backgroundColor: themeColor.secondary }]}>
                        <Text style={[styles.modalText, { color: themeColor.text }]}>Upload Photo</Text>
                        <View style={styles.modalButtonContainer}>

                            <TouchableOpacity className='p-3' onPress={handleCameraPicker} style={{borderWidth:1, borderColor:themeColor.border, borderRadius:20}}>
                                <MaterialIcons name="camera-alt" size={30} style={{ color: themeColor.text }} />
                            </TouchableOpacity>

                            <TouchableOpacity className='p-3' onPress={handleImagePicker} style={{borderWidth:1, borderColor:themeColor.border, borderRadius:20}}>
                                <MaterialIcons name="insert-photo" size={30} style={{ color: themeColor.text }} />
                            </TouchableOpacity>

                            <TouchableOpacity className='p-3' onPress={() => setModalVisible(!modalVisible)} style={{borderWidth:1, borderColor:themeColor.border, borderRadius:20}}>
                                <MaterialIcons name="close" size={30} style={{ color: themeColor.text }} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>

            <ScrollView>
                <CustomInput
                    className="mb-3"
                    inputTitle="First Name *"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChangeText={(value) => handleInputChange('firstName', value)}
                    maxLength={15}
                    showCounter={true}
                />
                {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

                <CustomInput
                    className="mb-3"
                    inputTitle="Last Name *"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChangeText={(value) => handleInputChange('lastName', value)}
                    maxLength={15}
                    showCounter={true}
                />
                {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                <CustomSelect
                    selectName='Department Role'
                    selectTitle='Department Role'
                    selectedOption={formData.selectedDepartmentRole}
                    onSelect={(option) => setFormData({ ...formData, selectedDepartmentRole: option })}
                    customOption="departmentRole"
                />
                {errors.departmentRole && <Text style={styles.errorText}>{errors.departmentRole}</Text>}

                <CustomSelect
                    selectName='Gender'
                    selectTitle='Gender'
                    selectedOption={formData.selectedGender}
                    onSelect={(option) => setFormData({ ...formData, selectedGender: option })}
                    customOption="gender"
                    enableSearch={false}
                />
                {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

                <CustomInput
                    className="mb-3"
                    placeholder="Date Of Birth *"
                    inputTitle="Dob *"
                    value={formData.dateOfBirth}
                    onChangeText={(value) => handleInputChange('dateOfBirth', value)}
                    maxLength={10}
                    showCounter={true}
                    keyboardType='numeric'
                    inputType='date'
                />
                {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}

                <CustomSelect
                    selectName='Religion'
                    selectTitle='Religion'
                    selectedOption={formData.selectedReligion}
                    onSelect={(option) => setFormData({ ...formData, selectedReligion: option })}
                    customOption="religion"
                />

                <CustomSelect
                    selectName='Blood Group'
                    selectTitle='Blood Group'
                    selectedOption={formData.selectedBloodGroup}
                    onSelect={(option) => setFormData({ ...formData, selectedBloodGroup: option })}
                    customOption="bloodGroup"
                />

                <CustomInput
                    className="mb-3"
                    placeholder="Address *"
                    inputTitle="Address"
                    value={formData.address}
                    onChangeText={(value) => handleInputChange('address', value)}
                    maxLength={25}
                    showCounter={true}
                />
                {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

                <CustomInput
                    className="mb-3"
                    placeholder="Phone Number *"
                    inputTitle="Phone Number"
                    value={formData.phoneNumber}
                    onChangeText={(value) => handleInputChange('phoneNumber', value)}
                    maxLength={15}
                    keyboardType='numeric'
                    showCounter={true}
                />
                {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

                <CustomInput
                    className="mb-3"
                    placeholder="Email Address"
                    inputTitle="Email Address"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    maxLength={25}
                    keyboardType='email-address'
                    showCounter={true}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <CustomInput
                    className="mb-3"
                    placeholder="Qualification *"
                    inputTitle="Qualification"
                    value={formData.qualification}
                    onChangeText={(value) => handleInputChange('qualification', value)}
                    maxLength={25}
                    showCounter={true}
                />
                {errors.qualification && <Text style={styles.errorText}>{errors.qualification}</Text>}

                <CustomInput
                    className="mb-3"
                    placeholder="Joining Date *"
                    inputTitle="Joining Date"
                    value={formData.joiningDate}
                    onChangeText={(value) => handleInputChange('joiningDate', value)}
                    maxLength={10}
                    keyboardType='numeric'
                    showCounter={true}
                    inputType='date'
                />
                {errors.joiningDate && <Text style={styles.errorText}>{errors.joiningDate}</Text>}


                {/* Image  */}
                <View className='mb-3 justify-center'>
                    <TouchableOpacity onPress={() => setModalVisible(true)} className='items-center justify-center' style={{height:110, width:110,  borderStyle: 'dashed', borderWidth:1, borderColor:themeColor.border, borderRadius:10, position:'relative'}}>
                        <Image
                            style={{  width: '95%', height: '95%', borderRadius:10 }}
                            source={{ uri: empPhoto}} // Replace with your image URL
                            resizeMode="cover"
                        />
                      <MaterialIcons name="camera-alt" size={20} style={{ color: themeColor.tertiary, position:'absolute', bottom:10, right:10, }} />

                      <TouchableOpacity onPress={() => setEmpPhoto(null)} style={{ position:'absolute', top:10, right:10,}}>
                         <MaterialIcons name="cancel" size={20} style={{ color: themeColor.tertiary }} />
                      </TouchableOpacity>

                    </TouchableOpacity>
                    <Text style={{color:themeColor.text, fontSize:13,}}>Employee Photo</Text>
                </View>

                <CustomButton 
                className='my-5' 
                buttonText='Save' 
                onPress={saveEmployee} 
                loading={isLoading} 
                buttonDesign='border' />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomModal: {
        width: '100%',
        paddingTop:15,
        padding: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AddNewEmployee;
