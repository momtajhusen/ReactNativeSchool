//import liraries
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomSelect from '../customeSelect';
import { AppContext } from '../../../../context/AppContext';

// create a component
const ClassSection = () => {

  const { state } = useContext(AppContext);

  const [selectedSection, setSection] = useState(null);

  const handleInputChange = (option) => {
    setSection(option); 
  };

    return (
        <View>
            <CustomSelect
            options={state.options.classSections}
            selectedOption={selectedSection}
            onSelect={handleInputChange}
            enableSearch={true}
            selectTitle="Select Section *"
            selectName="Section *"
            />
        </View>
    );
};


//make this component available to the app
export default ClassSection;
