// components/ExamMarkUpdate/MarksInputSection.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const SubjectTotalPassMarks = ({ themeColor, totalThMarks, totalPrMarks, passThMarks, passPrMarks, onTotalThChange, onTotalPrChange, onPassThChange, onPassPrChange }) => (
    <View className='flex-row space-x-2'>
        <View className='p-2 flex-1' style={[styles.inputContainer, { borderColor: themeColor.border }]}>
            <Text className='font-bold mb-1' style={[styles.label, { color: themeColor.text }]}>Total Marks</Text>
            <View className='flex-row justify-between'>
                <View className='flex-row space-x-1 items-center'>
                    <Text style={[styles.text, { color: themeColor.text }]}>TH :</Text>
                    <TextInput
                        className='text-center p-1'
                        style={[styles.input, {borderWidth: 1, borderColor: themeColor.border, color: themeColor.text }]}
                        maxLength={5}
                        keyboardType="decimal-pad"
                        value={totalThMarks.toString()}
                        onChangeText={onTotalThChange}
                    />
                </View>
                <View className='flex-row space-x-1 items-center'>
                    <Text style={[styles.text, { color: themeColor.text }]}>PR :</Text>
                    <TextInput
                        className='text-center p-1'
                        style={[styles.input, {borderWidth: 1, borderColor: themeColor.border, color: themeColor.text }]}
                        maxLength={5}
                        keyboardType="decimal-pad"
                        value={totalPrMarks.toString()}
                        onChangeText={onTotalPrChange}
                    />
                </View>
            </View>
        </View>
        <View className='p-2 flex-1' style={[styles.inputContainer, { borderColor: themeColor.border }]}>
            <Text className='font-bold mb-1' style={[styles.label, { color: themeColor.text }]}>Pass Marks</Text>
            <View className='flex-row justify-between'>
                <View className='flex-row space-x-1 items-center'>
                    <Text style={[styles.text, { color: themeColor.text }]}>TH :</Text>
                    <TextInput
                        className='text-center p-1'
                        style={[styles.input, {borderWidth: 1, borderColor: themeColor.border, color: themeColor.text }]}
                        maxLength={5}
                        keyboardType="decimal-pad"
                        value={passThMarks.toString()}
                        onChangeText={onPassThChange}
                    />
                </View>
                <View className='flex-row space-x-1 items-center'>
                    <Text style={[styles.text, { color: themeColor.text }]}>PR :</Text>
                    <TextInput
                        className='text-center p-1'
                        style={[styles.input, {borderWidth: 1, borderColor: themeColor.border, color: themeColor.text }]}
                        maxLength={5}
                        keyboardType="decimal-pad"
                        value={passPrMarks.toString()}
                        onChangeText={onPassPrChange}
                    />
                </View>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
    },
    label: {
        fontSize: 13,
    },
    text: {
        fontSize: 12,
    },
    input: {
        height: 30,
        width: 40,
        borderRadius: 5,
        fontWeight: 'bold',
    },
});

export default SubjectTotalPassMarks;
