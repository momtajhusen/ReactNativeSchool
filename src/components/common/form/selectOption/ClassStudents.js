//import liraries
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomSelect from '../customeSelect';
import { AppContext } from '../../../../context/AppContext';

// create a component
const ClassSubjects = () => {

  const { state } = useContext(AppContext);

  const [selectedSubjects, setSubjects] = useState(null);

  const handleInputChange = (option) => {
    setSubjects(option); 
  };

    return (
        <View>
            <CustomSelect
            options={state.options.classSubjects}
            selectedOption={selectedSubjects}
            onSelect={handleInputChange}
            enableSearch={true}
            selectTitle="Select Subject *"
            selectName="Subject *"
            />
        </View>
    );
};


//make this component available to the app
export default ClassSubjects;
