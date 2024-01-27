import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../baseUrl';

const useHouseData = (houseId) => {
  const [getSelectedData, setGetSelectedData] = useState();
  const [isSelectedLoading, setIsSelectedLoading] = useState(false);

    /**
   * useEffect for Fetching House Data
   *
   * This useEffect hook is designed to fetch house data based on the provided 'houseId'. It uses the 'axios' library to make an asynchronous API call to retrieve details about a specific house. The loading states 'setIsSelectedLoading' are managed to indicate the ongoing data fetch operation.
   * 
   * Dependencies:
   * - houseId: ID of the house for which data is to be fetched.
   * - setIsSelectedLoading: Function to set loading state for the data fetch operation.
   * - setGetSelectedData: Function to set the fetched house data.
   *
   * Actions:
   * 1. Initialize a boolean flag 'isMounted' to track whether the component is still mounted.
   * 2. Define an asynchronous function 'fetchHouseData' to make an API call for house data.
   *    a. Set 'setIsSelectedLoading' to true before making the API call.
   *    b. Use 'axios' to make a GET request to the API endpoint containing the 'houseId'.
   *    c. If the component is still mounted, update the state with the fetched house data and set loading state to false.
   *    d. In case of an error during the API call, log the error and set loading state to false.
   * 3. Check if 'houseId' is not null before initiating the data fetch.
   * 4. The cleanup function returned by 'useEffect' sets 'isMounted' to false when the component is unmounted.
   *
   * @function useEffect
   * @param {string} houseId - ID of the house for which data is to be fetched.
   * @param {Function} setIsSelectedLoading - Function to set loading state for the data fetch operation.
   * @param {Function} setGetSelectedData - Function to set the fetched house data.
   */
  useEffect(() => {
    let isMounted = true;
  
    const fetchHouseData = async () => {
      try {
        // Set loading state to indicate the start of the data fetch operation
        setIsSelectedLoading(true);
      
        // Make an API call to fetch house data based on the provided 'houseId'
        const response = await axios.get(
          `${BaseUrl}/house/details/${houseId}/?format=json`
        );
        
        // If the component is still mounted, update the state with the fetched house data and set loading state to false
        if (isMounted) {
          setGetSelectedData(response.data);
          setIsSelectedLoading(false);
        }
      } catch (error) {
        // Log the error and set loading state to false in case of an error during the API call
        console.error('Error:', error);
        setIsSelectedLoading(false);
      }
    };
  
    // Check if 'houseId' is not null before initiating the data fetch
    if (houseId != null) {
      fetchHouseData();
    }
  
    // Cleanup function to set 'isMounted' to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, [houseId]); // Dependency array with 'houseId' as a dependency for the useEffect


  return {
    getSelectedData,
    isSelectedLoading,
  };
};

export default useHouseData;
