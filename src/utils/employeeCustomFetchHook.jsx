import { useEffect, useState } from "react";
import axios from "axios";
import debounce from "lodash/debounce";

const useDataFetching = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setShowSkeleton(true);

        const response = await axios.get(
          "https://34.125.221.156/employee/?format=json"
        );

        setData(response.data);
        setIsLoading(false);
        setShowSkeleton(false);
      } catch (error) {
        console.error("Error:", error);
        setError("Network error occured.");
        setIsLoading(false);
        setShowSkeleton(false);
      }
    };

    fetchData();

  }, []);

  return { data, isLoading, error, showSkeleton };
};

export default useDataFetching;
