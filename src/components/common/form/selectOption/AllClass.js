import React, {useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import CustomSelect from '../customeSelect';
import { createApiClient } from '../../../../apiClient';
import { AppContext } from '../../../../context/AppContext';

const AllClass = ({ selectedClass, onClassChange, selectName }) => {
    const [classOption, setClassOption] = useState([]);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AppContext);

    const fetchClassData = async () => {
        setLoading(true);
        try {
            const apiClient = await createApiClient();
            const response = await apiClient.get(`/option-all-class`);

            if (response && response.data) {
                const AllClassOption = response.data.optionClass.map((classItem) => ({
                    label: classItem.class,
                    value: classItem.class,
                }));

                setClassOption(AllClassOption);
            } else {
                console.error('No data available in response');
            }
        } catch (error) {
            console.error('Error fetching class data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchClassSectionData = async () => {
        setLoading(true);
        try {
            const apiClient = await createApiClient();
            if (selectedClass) {
                const response = await apiClient.get(`/admin/class-section?class=${selectedClass.value}`);

                if (response && response.data) {
                    const AllClassSectionOption = response.data.data.map((classItem) => ({
                        label: classItem.section,
                        value: classItem.section,
                    }));

                    dispatch({
                        type: 'SET_CLASS_SECTIONS',
                        payload: AllClassSectionOption,
                    });
                } else {
                    console.error('No data available in response');
                }
            }
        } catch (error) {
            console.error('Error fetching section data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchClassSubjectsData = async () => {
        setLoading(true);
        try {
            const apiClient = await createApiClient();
            if (selectedClass) {
                const response = await apiClient.get(`/get-all-subject?class=${selectedClass.value}`);

                if (response && response.data) {
                    const AllClassSubjects = response.data.data.map((subjectItem) => ({
                        label: subjectItem.subject_name,
                        value: subjectItem.subject_name,
                    }));

                    dispatch({
                        type: 'SET_CLASS_SUBJECTS',
                        payload: AllClassSubjects,
                    });
                } else {
                    console.error('No data available in response');
                }
            }
        } catch (error) {
            console.error('Error fetching section data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClassData();
    }, []);

    useEffect(() => {
        if (selectedClass !== null) {
            fetchClassSectionData();
            fetchClassSubjectsData();
        }
    }, [selectedClass]);

    return (
        <View>
            <CustomSelect
                options={classOption}
                selectedOption={selectedClass}
                onSelect={onClassChange}
                enableSearch={true}
                selectName="Class *"
                loading = {loading}
            />
        </View>
    );
};

export default AllClass;
