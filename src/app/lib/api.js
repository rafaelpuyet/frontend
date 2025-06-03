import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example: Fetch appointments
export const getAppointments = async () => {
  try {
    const response = await api.get('/api/appointments');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Example: Create an appointment
export const createAppointment = async (data) => {
  try {
    const response = await api.post('/api/appointments', data);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// Add authentication if needed (e.g., JWT)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Adjust based on your auth method
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;