import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../baseUrl';

const useJobData = (jobId) => {
  const [getSelectedJobData, setGetSelectedJobData] = useState();
  const [isSelectedJobLoading, setIsSelectedJobLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchJobData = async () => {
      setIsSelectedJobLoading(true);

      try {
        const response = await axios.get(`${BaseUrl}/careers/jobs/${jobId}/`);
        if (isMounted) {
          setGetSelectedJobData(response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        if (isMounted) {
          setIsSelectedJobLoading(false);
        }
      }
    };

    if (jobId !== null) {
      fetchJobData();
    }

    return () => {
      isMounted = false;
    };
  }, [jobId]);

  return {
    getSelectedJobData,
    isSelectedJobLoading,
  };
};

export default useJobData;
