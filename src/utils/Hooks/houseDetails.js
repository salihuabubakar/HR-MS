import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../baseUrl';

const useHouseData = (houseId) => {
  const [getSelectedData, setGetSelectedData] = useState();
  const [isSelectedLoading, setIsSelectedLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchHouseData = async () => {
      try {
        setIsSelectedLoading(true);
        const response = await axios.get(
          `${BaseUrl}/house/details/${houseId}/?format=json`
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

    if (houseId != null) {
      fetchHouseData();
    }

    return () => {
      isMounted = false;
    };
  }, [houseId]);

  return {
    getSelectedData,
    isSelectedLoading,
  };
};

export default useHouseData;
