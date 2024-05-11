// Get the token from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Set the Authorization header with the token
export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user?.token}`,
  },
};