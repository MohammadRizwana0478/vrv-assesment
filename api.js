// import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Adjust to your backend URL

// Function to handle user login
export const loginUser = async (data) => {
  return await axios.post(`${API_URL}/auth/login`, data);
};

export default axios;


