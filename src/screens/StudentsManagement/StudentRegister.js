import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import CustomInput from '../../components/common/form/customTextInput';
import CustomSelect from '../../components/common/form/customeSelect';
import HeaderTitle from '../../components/common/headerTitle';

import AllClass from '../../components/common/form/selectOption/AllClass';

const StudentRegister = () => {
    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

    const [selectedGender, setselectedGender] = useState(null);
    const [selectedReligion, setselectedReligion] = useState(null);
    const [selectedBloodGroup, setBloodGroup] = useState(null);
    const [selectedClass, setClass] = useState(null);

    // Function to handle the change in class selection
    const handleSelectChange = (option) => {
        setClass(option);
    };

    return (
        <View className='flex-1' style={[styles.container, { backgroundColor: themeColor.primary }]}>
            <HeaderTitle title='Student Registration' />
            
            <ScrollView>
            <AllClass 
                    selectedClass={selectedClass} 
                    onClassChange={handleSelectChange} 
            />

            <Text className='mb-3' style={{color:themeColor.text}}>Student Details</Text>
            <CustomInput placeholder="First Name *" onChangeText={(text) => console.log(text)} style={styles.input} />
            <CustomInput placeholder="Middle Name" onChangeText={(text) => console.log(text)} style={styles.input} />
            <CustomInput placeholder="Last Name *" onChangeText={(text) => console.log(text)} style={styles.input} />
            <CustomSelect 
               options={[{ label: 'Male', value: 'male' },{ label: 'Female', value: 'female' }]}
               selectedOption={selectedGender}
               onSelect={(option) => setselectedGender(option)} 
               enableSearch={false}
               selectName='Gender'
            />
            <CustomInput placeholder="Date Of Birth" onChangeText={(text) => console.log(text)} style={styles.input} />
            <CustomSelect 
               options={[{ label: 'Islam', value: 'islam' },{ label: 'Hindu', value: 'hindu' },{ label: 'Christian', value: 'christian' }]}
               selectedOption={selectedReligion}
               onSelect={(option) => setselectedReligion(option)} 
               enableSearch={false}
               selectName='Religion'
            />
            <CustomSelect 
               options={[{ label: 'Islam', value: 'islam' },{ label: 'Hindu', value: 'hindu' },{ label: 'Christian', value: 'christian' }]}
               selectedOption={selectedBloodGroup}
               onSelect={(option) => setBloodGroup(option)} 
               enableSearch={false}
               selectName='Blood Group'
            />


            <CustomInput placeholder="Student Phone" onChangeText={(text) => console.log(text)} style={styles.input} />

            <Text className='mb-3' style={{color:themeColor.text}}>Academy Information</Text>
            <CustomInput placeholder="Admission Date *" onChangeText={(text) => console.log(text)} style={styles.input} />
 
            <Text className='mb-3' style={{color:themeColor.text}}>Address</Text>

            <CustomInput placeholder="District" onChangeText={(text) => console.log(text)} style={styles.input} />
            <CustomInput placeholder="Municipality" onChangeText={(text) => console.log(text)} style={styles.input} />
            <CustomInput placeholder="Village" onChangeText={(text) => console.log(text)} style={styles.input} />
            <CustomInput placeholder="Ward No" onChangeText={(text) => console.log(text)} style={styles.input} />


            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        marginBottom: 12,
    },
});

export default StudentRegister;
