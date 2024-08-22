import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


const ImagePickerModal = ({ visible, onClose, onCameraPick, onGalleryPick }) => {

    const handleCameraPick = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 4],
              quality: 1,
            });
        
            if (!result.canceled) {
              const selectedImage = result.assets[0];
              onCameraPick(selectedImage);
            }
          } catch (error) {
            console.error(error);
            alert('An error occurred while capturing the image');
          }
    };

    const handleGalleryPick = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          });        
          if (!result.canceled) {

            const selectedImage = result.assets[0];

            if (selectedImage.fileSize > 5 * 1024 * 1024) {
                Alert.alert('Image too large', 'The selected image is too large. Please select an image smaller than 5MB.');
                return;
            }
            onGalleryPick(selectedImage);
          }

    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.bottomModal}>
                    <Text style={styles.modalText}>Upload Photo</Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity onPress={handleCameraPick} style={styles.modalButton}>
                            <MaterialIcons name="camera-alt" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleGalleryPick} style={styles.modalButton}>
                            <MaterialIcons name="insert-photo" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={styles.modalButton}>
                            <MaterialIcons name="close" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomModal: {
        width: '100%',
        padding: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
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
    modalButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        padding: 10,
    },
};

export default ImagePickerModal;