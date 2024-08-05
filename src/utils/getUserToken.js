import { isAuth } from "./helperFucntions";

// Set the Authorization header with the token
export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${isAuth()}`,
  },
};