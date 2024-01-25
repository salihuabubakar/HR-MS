import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../baseUrl';

const useResidentData = (residentId) => {
  const [getSelectedData, setGetSelectedData] = useState();
  const [isSelectedLoading, setIsSelectedLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchResidentData = async () => {
      try {
        setIsSelectedLoading(true);
        const response = await axios.get(
          `${BaseUrl}/resident/detail/${residentId}?format=json`
        );

        if (isMounted) {
          setGetSelectedData(response.data);
          setIsSelectedLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setIsSelectedLoading(false);
      }
    };

    if (residentId != null) {
      fetchResidentData();
    }

    return () => {
      isMounted = false;
    };
  }, [residentId]);

  return {
    getSelectedData,
    isSelectedLoading,
  };
};

export default useResidentData;
