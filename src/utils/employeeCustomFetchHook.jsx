import { useEffect, useState } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import { BaseUrl } from "./baseUrl";


// Get employee data
export const useDataFetching = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setShowSkeleton(true);

        const response = await axios.get(
          `${BaseUrl}/employee/list/?format=json`
        );

        if(isMounted) {
          setData(response.data);
          setIsLoading(false);
          setShowSkeleton(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Network error occured.");
        setIsLoading(false);
        setShowSkeleton(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };

  }, []);

  return { data, isLoading, error, showSkeleton };
};

// Use to get employee data for editing
export const useDataEdit = () => {
  const [employeeEditData, setEmployeeEditData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/employee/detail/?format=json`
        );
        if(isMounted) {
          setEmployeeEditData(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [employeeEditData]);

  return { employeeEditData };
};

// Get role data
export const useRoleFetching = () => {
  const [roleData, setRoleData] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(false);
  const [roleError, setRoleError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsRoleLoading(true);

        const response = await axios.get(
          `${BaseUrl}/employee/roles/?format=json`
        );

        if(isMounted) {
          setRoleData(response.data);
          setIsRoleLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setRoleError("Network error occured.");
        setIsRoleLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };

  }, [roleData]);

  return { roleData, isRoleLoading, roleError };
};


// Get department data
export const useDepartmentFetching = () => {
  const [departmentData, setDepartmentDate] = useState(null);
  const [isDepartmentDataLoading, setIsDepartmentDataLoading] = useState(false);
  const [departmentError, setDepartmentError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsDepartmentDataLoading(true);

        const response = await axios.get(
          `${BaseUrl}/employee/departments/?format=json`
        );

        if(isMounted) {
          setDepartmentDate(response.data);
          setIsDepartmentDataLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setDepartmentError("Network error occured.");
        setIsDepartmentDataLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };

  }, [departmentData]);

  return { departmentData, isDepartmentDataLoading, departmentError };
};


