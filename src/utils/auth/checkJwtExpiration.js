import { jwtDecode } from "jwt-decode";
import { isAuth } from "../helperFucntions";

export const checkTokenExpiration = () => {
  if (!isAuth()) {
    // Token is not available, user is not logged in
    return true;
  }

  try {
    const decodedToken = jwtDecode(isAuth());
    const currentTime = Date.now() / 1000; // Convert to seconds
    if (decodedToken.exp < currentTime) {
      // Token has expired, log the user out
      localStorage.removeItem('user');
      // Clear any other user-related data
      return true;
    } else {
      // Token is still valid
      return false;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return true
  }
};

