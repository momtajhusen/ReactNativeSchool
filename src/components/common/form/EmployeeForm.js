import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CustomInput from '../../components/common/form/customTextInput';
import CustomSelect from '../../components/common/form/customeSelect';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EmployeeForm = ({ formData, handleInputChange, handleSelect, errors, themeColor, empPhoto, onPickImage, onClearImage }) => {
    return (
        <View>
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
            {/* Add more CustomInput and CustomSelect components similarly */}
            {/* Image  */}
            <View className='mb-3 justify-center'>
                <TouchableOpacity onPress={onPickImage} className='items-center justify-center' style={{ height: 110, width: 110, borderStyle: 'dashed', borderWidth: 1, borderColor: themeColor.border, borderRadius: 10, position: 'relative' }}>
                    <Image
                        style={{ width: '95%', height: '95%', borderRadius: 10 }}
                        source={{ uri: empPhoto }}
                        resizeMode="cover"
                    />
                    <MaterialIcons name="camera-alt" size={20} style={{ color: themeColor.tertiary, position: 'absolute', bottom: 10, right: 10 }} />
                    <TouchableOpacity onPress={onClearImage} style={{ position: 'absolute', top: 10, right: 10 }}>
                        <MaterialIcons name="cancel" size={20} style={{ color: themeColor.tertiary }} />
                    </TouchableOpacity>
                </TouchableOpacity>
                <Text style={{ color: themeColor.text, fontSize: 13 }}>Employee Photo</Text>
            </View>
        </View>
    );
};

const styles = {
    errorText: {
        color: 'red',
        fontSize: 12,
    },
};

export default EmployeeForm;
