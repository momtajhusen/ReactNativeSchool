import apiClient from "../../../../apiClient";

// optionSets.js
export const optionSets = {
  departmentRole: [
    { label: 'Teacher', value: 'Teacher' },
    { label: 'Security Guard', value: 'Security Guard' },
    { label: 'Cook', value: 'Cook' },
    { label: 'Sweeper', value: 'Sweeper' },
    { label: 'Driver', value: 'Driver' },
    { label: 'Conductor', value: 'Conductor' },
    { label: 'Driver Incharge', value: 'Driver Incharge' },
    { label: 'Helper', value: 'Helper' },
    { label: 'Office Boy', value: 'Office Boy' },
    { label: 'Sports Coach', value: 'Sports Coach' },
    { label: 'Receptionist', value: 'Receptionist' },
  ],
  gender: [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ],
  religion: [
    { label: 'Islam', value: 'islam' },
    { label: 'Hindu', value: 'hindu' },
    { label: 'Christian', value: 'christian' },
  ],
  bloodGroup: [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
  ],
  students: [],

  vehicle: [],

  schools : [
    { label: 'React School', address:'arang', value: 'https://reactschool.scriptqube.com' },
    { label: 'Gurukul', address:'arang', value: 'https://gurukul.scriptqube.com' },
    { label: 'Polar', address:'arang', value: 'https://polar.scriptqube.com' },
    { label: 'Sunrise', address:'arang', value: 'https://sunrise.scriptqube.com' },
  ]
};

// Function to fetch department roles
export const fetchStudentsData = async () => {
  try {
    // Replace with your actual API endpoint
    const response = await fetch('https://reactschool.scriptqube.com/api/get-all-admit-student');
    const data = await response.json();

    // Format student data
    const studentOptions = data.studentsData.map(student => ({
      label: student.student_name,
      value: student.student_id
    }));

    // Update optionSets with student names
    optionSets.students = studentOptions;

    console.log('Student options:', optionSets.students);
  } catch (error) {
    console.error('Error fetching department roles:', error);
  }
};

// Function to fetch department roles
export const fetchVehicleData = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://reactschool.scriptqube.com/api/get-all-vehicle');
      const data = await response.json();
  
      // Format student data
      const vehicleOptions = data.vehicle.map(vehicle => ({
        label: vehicle.vehicle_type,
        value: vehicle.id
      }));
  
      // Update optionSets with student names
      optionSets.vehicle = vehicleOptions;
  
      console.log('Student options:', optionSets.vehicle);
    } catch (error) {
      console.error('Error fetching department roles:', error);
    }
  };
 
// fetchStudentsData();
// fetchVehicleData();