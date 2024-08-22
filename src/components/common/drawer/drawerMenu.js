import React, { useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import your context and themes
import { AppContext } from '../../../context/AppContext';
import { lightTheme, darkTheme } from '../../../themes';

// Define menu data with route names for navigation
const MENU_ITEMS = [
  {
    id: 1,
    title: 'Dashboard',
    icon: 'dashboard',
    route: 'Dashboard', // Add a direct route for non-submenu items
  },
  {
    id: 2,
    title: 'Students Management',
    icon: 'group',
    content: [
      { title: 'Student Registration', route: 'StudentRegister' },
      // { title: 'Redistration List', route: 'SubMenu2' },
      { title: 'All Students', route: 'AllStudents' },
      // { title: 'All Parents', route: 'SubMenu3' },
      // { title: 'Student Promotion', route: 'SubMenu3' },
      // { title: 'Passout Students', route: 'SubMenu3' },
      // { title: 'Kick Out Students', route: 'SubMenu3' },
      // { title: 'Generate Id Card', route: 'SubMenu3' },
    ],
  },
  {
    id: 3,
    title: 'Employee Management',
    icon: 'man',
    content: [
      { title: 'All Employee', route: 'AllEmployee'},
      { title: 'Add New Employee', route: 'AddNewEmployee'},
    ],
  },
  {
    id: 4,
    title: 'Exam Management',
    icon: 'edit-note',
    content: [
      { title: 'Exam Mark Entry', route: 'MarkEntry'},
      { title: 'Exam Tabulation', route: 'Tabulation'},
    ],
  },
 
  // Add more items as needed
];

const DrawerMenu = () => {
  // Access the theme mode from context
  const { state } = useContext(AppContext);
  const themeColor = state.theme.themeMode === 'dark' ? darkTheme : lightTheme;

  // Access navigation prop
  const navigation = useNavigation();

  // Animated values for submenu heights and icon rotations
  const [heights] = useState(
    MENU_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: new Animated.Value(0) }), {})
  );
  const [rotations] = useState(
    MENU_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: new Animated.Value(0) }), {})
  );
  
  // State to track expanded menu and submenu items
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);

  // Function to toggle the submenu
  const toggleSubMenu = useCallback(
    (id, content) => {
      const isOpen = heights[id]._value === 45 * content.length;

      // If another menu is expanded, collapse it
      if (expandedMenu && expandedMenu !== id) {
        Animated.timing(heights[expandedMenu], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(rotations[expandedMenu], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }

      const newHeight = isOpen ? 0 : 45 * content.length;
      const newRotate = isOpen ? 0 : 1;

      Animated.parallel([
        Animated.timing(heights[id], {
          toValue: newHeight,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(rotations[id], {
          toValue: newRotate,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();

      // Update expanded menu state
      setExpandedMenu(isOpen ? null : id);
    },
    [heights, rotations, expandedMenu]
  );

  // Function to handle submenu item selection
  const handleSubItemPress = useCallback(
    (subItem) => {
      navigation.navigate(subItem.route);
      setSelectedSubItem(subItem.title); // Set the selected submenu item
    },
    [navigation]
  );

  // Function to handle direct item press (without submenu)
  const handleItemPress = useCallback(
    (item) => {
      if (item.content) {
        toggleSubMenu(item.id, item.content);
      } else {
        navigation.navigate(item.route);
        setExpandedMenu(null); // Reset the expanded menu state for direct navigation
        setSelectedSubItem(null); // Reset the selected submenu item
      }
    },
    [navigation, toggleSubMenu]
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColor.primary }]}>
      {MENU_ITEMS.map((item) => {
        const rotate = rotations[item.id].interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '90deg'],
        });

        const isExpandedMenu = expandedMenu === item.id;
        const menuItemColor = isExpandedMenu ? themeColor.accent : themeColor.text; // Change active menu color

        return (
          <TouchableOpacity key={item.id} onPress={() => handleItemPress(item)}>
            <View style={styles.menuHeader}>
              <View style={styles.menuTitle}>
                <MaterialIcons name={item.icon} size={25} style={{ color: menuItemColor }} />
                <Text style={{ color: menuItemColor, marginLeft: 8 }}>{item.title}</Text>
              </View>
              {item.content && (
                <Animated.View style={{ transform: [{ rotate }] }}>
                  <MaterialIcons name="chevron-right" size={25} style={{ color: menuItemColor }} />
                </Animated.View>
              )}
            </View>
            {item.content && (
              <Animated.View className="px-2" style={[styles.subMenuContainer, { height: heights[item.id] }]}>
                {item.content.map((subItem, index) => {
                  const isActiveSubItem = selectedSubItem === subItem.title;
                  const subMenuItemColor = isActiveSubItem ? themeColor.accent : themeColor.text; // Change active submenu color

                  return (
                    <TouchableOpacity
                      key={index}
                      style={[styles.subMenuItem, { backgroundColor: themeColor.secondary }]}
                      onPress={() => handleSubItemPress(subItem)}
                    >
                      <Text
                        style={{
                          color: subMenuItemColor,
                        }}
                      >
                        {subItem.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </Animated.View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuHeader: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subMenuContainer: {
    overflow: 'hidden',
  },
  subMenuItem: {
    padding: 12,
  },
});

// Export the component
export default DrawerMenu;
