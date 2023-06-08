import { useEffect, useState } from "react";
import axios from "axios";
import debounce from "lodash/debounce";

export const useDataFetching = () => {
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
          "https://www.jakago.com.ng/employee/list/?format=json"
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


export const useDataEdit = () => {
  const [employeeEditData, setEmployeeEditData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.jakago.com.ng/employee/detail/?format=json"
        );
        setEmployeeEditData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [employeeEditData]);

  return { employeeEditData };
};


