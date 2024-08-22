// components/ExamMarkUpdate/HeaderSection.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExamHeaderSection = ({ themeColor, subject, classes, section, exam_name  }) => (
    <View className='p-2 rounded-t-lg' style={[styles.container]}>
        <View className='flex-row space-x-3'>
            <Text className='font-bold mb-1' style={[styles.text, { color: themeColor.text }]}>Class : {classes} {section}</Text>
            <Text className='font-bold mb-1' style={[styles.text, { color: themeColor.text }]}>Exam : {exam_name}</Text>
        </View>
        <Text className='font-bold mb-1' style={[styles.text, { color: themeColor.text }]}>Subject : {subject}</Text>
    </View>
);

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
    },
});

export default ExamHeaderSection;
