//import liraries
import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { lightTheme, darkTheme } from '../../themes';
import HeaderTitle from '../../components/common/headerTitle';
import { createApiClient } from '../../apiClient';
import UserListCard from '../../components/common/UserListCard';
import UserListCardLoader from '../../components/common/SkeletonLoader/UserListCardLoader';

// create a component
const AllEmployee = () => {
    const { state } = useContext(AppContext);
    const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;
    const schoolDomain = state.school.schoolDomainName;

    const [EmployeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllEmployee();
    }, []);

    const fetchAllEmployee = async () => {
        try {
            const apiClient = await createApiClient();
            const response = await apiClient.get('/get-all-employee');
            if (response.data && response.data.AllEmployee) {
                setEmployeeData(response.data.AllEmployee);
            } else {
                setEmployeeData([]); // Fallback to empty array if data is missing
            }
        } catch (error) {
            console.error("Failed to fetch employee data:", error);
            setEmployeeData([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <View className='flex-1 py-3 px-6' style={{ backgroundColor: themeColor.primary }}>
            <HeaderTitle title="All Employee" />

            {/* <UserListCardLoader /> */}

            <FlatList
                data={loading ? Array(20).fill({}) : EmployeeData}
                renderItem={({ item, index }) => {
                    if (loading) {
                        return <UserListCardLoader key={index} />;
                    } else if (item && item.first_name) { // Ensure item is valid
                        return (
                            <UserListCard
                                key={index}
                                title={`${item.first_name} ${item.last_name}`}
                                subtitle={`${item.phone} - ${index}`} 
                                img={item.image ? `${schoolDomain}/storage/${item.image}` : 'path/to/placeholder/image.png'} 
                            />
                        );
                    }
                }}
            />

        </View>
    );
};

//make this component available to the app
export default AllEmployee;
