import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../baseUrl';

/**
 * Custom Hook - useEmployeeData
 *
 * Custom hook for fetching employee data based on the provided employee ID.
 * Manages the state for selected employee data, loading status, and skeleton loading status.
 *
 * @function useEmployeeData
 * @param {string} employeeId - ID of the employee for whom data is to be fetched.
 * @returns {Object} - Object containing selected employee data, loading status, and skeleton loading status.
 * @property {Object} getSelectedData - Selected employee data fetched from the API.
 * @property {boolean} isSelectedLoading - Loading status for fetching selected employee data.
 * @property {boolean} skeletonLoading - Skeleton loading status for UI placeholders.
 */

const useEmployeeData = (employeeId) => {
  const [getSelectedData, setGetSelectedData] = useState();
  const [isSelectedLoading, setIsSelectedLoading] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchEmployeeData = async () => {
      try {
        setIsSelectedLoading(true);
        setSkeletonLoading(true);

        const response = await axios.get(
          `${BaseUrl}/employee/detail/${employeeId}?format=json`
        );

        if (isMounted) {
          setGetSelectedData(response.data);
          setIsSelectedLoading(false);
          setSkeletonLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setIsSelectedLoading(false);
        setSkeletonLoading(false);
      }
    };

    if (employeeId != null) {
      fetchEmployeeData();
    }

    return () => {
      isMounted = false;
    };
  }, [employeeId]);

  return {
    getSelectedData,
    isSelectedLoading,
    skeletonLoading,
  };
};

export default useEmployeeData;
