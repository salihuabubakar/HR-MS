import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../baseUrl';

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
