import React, { useState, useContext } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { AppContext } from '../../../context/AppContext';
import { lightTheme, darkTheme } from '../../../themes';
import { MaterialIcons } from '@expo/vector-icons';
import CustomInput from './customTextInput';

// Import optionSets
import { optionSets } from '../form/selectOption/optionSets'; // Adjust the path as necessary

const CustomSelect = ({
  onSelect,
  selectName = '',
  selectTitle = '',
  selectedOption,
  customOption = '', // New prop to determine the option type
  enableSearch = true, // Prop to enable/disable search
  showAddress = true,  // Prop to show/hide address
  modalFullHeight = false, // Prop to adjust modal height
  options = [], // Add options prop here
  loading = false // New prop for loading state
}) => {
  const { state } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Determine the options to use based on prop or type
  const currentOptions = options.length > 0 ? options : optionSets[customOption] || [];

  // Filter options based on search input
  const filteredOptions = currentOptions.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase()) ||
    (showAddress && option.address?.toLowerCase().includes(searchText.toLowerCase()))
  );

  // Handle the selection of an option
  const handleOptionPress = (option) => {
    onSelect(option);
    setModalVisible(false);
    setSearchText(''); // Reset search text after selection
  };

  return (
    <View className='mb-3'>
      {/* Select Button */}
      {selectTitle && (
        <Text className='mb-1' style={{ color: themeColor.text }}>{selectTitle}</Text>
      )}
      <TouchableOpacity
        className="flex-row justify-between"
        style={[
          styles.selectButton,
          {
            backgroundColor: themeColor.secondary,
            borderWidth: 1,
            borderColor: themeColor.border,
          },
        ]}
        onPress={() => setModalVisible(true)}
        disabled={currentOptions.length === 0} // Disable if no options
      >
        <Text style={{ fontSize: 16, color: themeColor.text }}>
          {selectedOption ? selectedOption.label : 'Select ' + selectName}
        </Text>

        {loading ? (
          <ActivityIndicator color={themeColor.text}  size={25} />
        ) : (
          <MaterialIcons className="mr-2 my-4" color={themeColor.text} name="arrow-drop-down" size={25} />
        )}
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSearchText(''); // Reset search text when modal is closed
        }}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: themeColor.secondary,
                height: modalFullHeight ? '80%' : 'auto', // Adjust modal height
              },
            ]}
          >
            {/* Conditionally render Search Input */}
            {enableSearch && (
              <CustomInput
                placeholder="Search..."
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />
            )}
            <Text className='mx-2 mb-1' style={{ color: themeColor.tertiary }}>select this option</Text>
            <FlatList
              data={filteredOptions}
              keyExtractor={(item, index) => `${item.value}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleOptionPress(item)}
                  className='flex-row p-2 items-center'
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: themeColor.border,
                  }}
                >
                  <View className='flex-1'>
                    <View className='flex-row justify-between'>
                      <Text style={{ color: themeColor.text, fontWeight: 'bold' }}>
                        {item.label}
                      </Text>
                      {/* Conditionally render the "done" icon */}
                      {selectedOption && selectedOption.value === item.value && (
                        <MaterialIcons
                          className='mr-2 my-4'
                          color={themeColor.text}
                          name='done'
                          size={20}
                        />
                      )}
                    </View>
                    {/* Conditionally render Address */}
                    {showAddress && item.address && (
                      <Text style={{ color: themeColor.tertiary }}>{item.address}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.noOptionsText}>No options available</Text>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    // margin: 20,
  },
  selectButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: '80%',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  option: {
    height: 50,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  noOptionsText: {
    padding: 10,
    textAlign: 'center',
    color: '#999',
  },
});

export default CustomSelect;
