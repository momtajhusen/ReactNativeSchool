import React, {useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import CustomSelect from '../customeSelect';
import { createApiClient } from '../../../../apiClient';
import { AppContext } from '../../../../context/AppContext';

const ExamTerms = ({ selectedClass, onClassChange, selectName }) => {
    const [examOption, setexamOption] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchExamermsData = async () => {
        setLoading(true);
        try {
            const apiClient = await createApiClient();
            const response = await apiClient.get(`/process-exam-term`);

            if (response && response.data) {
                const ExamtermsOption = response.data.processTerm.map((examItem) => ({
                    label: examItem.year+' '+examItem.exam_name,
                    value: examItem.id,
                }));

                setexamOption(ExamtermsOption);
            } else {
                console.error('No data available in response');
            }
        } catch (error) {
            console.error('Error fetching exam term data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExamermsData();
    }, []);


    return (
        <View>
            <CustomSelect
                options={examOption}
                selectedOption={selectedClass}
                onSelect={onClassChange}
                enableSearch={true}
                selectName="Exam Term *"
                loading = {loading}
            />
        </View>
    );
};

export default ExamTerms;
