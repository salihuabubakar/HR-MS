import { useEffect, useState } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import { BaseUrl } from "./baseUrl";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

// Get employee data
export const useDataFetching = () => {
  const fetchData = async () => {
    const response = await axios.get(`${BaseUrl}/employee/create/?format=json`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery("employeeData", fetchData, {
    onSuccess: () => {
      // Invalidate queries that depend on roleData
      queryClient.invalidateQueries(["employeeData"]);
    },
  });

  return { data, isLoading, error };
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
  const fetchData = async () => {
    const response = await axios.get(`${BaseUrl}/employee/roles/?format=json`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: roleData,
    isLoading: isRoleLoading,
    error: roleError,
  } = useQuery("roleData", fetchData, {
    onSuccess: () => {
      // Invalidate queries that depend on roleData
      queryClient.invalidateQueries(["roleData"]);
    },
  });

  return { roleData, isRoleLoading, roleError };
};



// Get department data
export const useDepartmentFetching = () => {
  const fetchData = async () => {
    const response = await axios.get(`${BaseUrl}/employee/departments/?format=json`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: departmentData,
    isLoading: isDepartmentDataLoading,
    error: departmentError,
  } = useQuery("deptData", fetchData, {
    onSuccess: () => {
      // Invalidate queries that depend on roleData
      queryClient.invalidateQueries(["deptData"]);
    },
  });

  return { departmentData, isDepartmentDataLoading, departmentError };
};


// Get house data
export const useHouseFetching = () => {
  const fetchHouseData = async () => {
    const response = await axios.get(`${BaseUrl}/house/houses/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: houseData,
    isLoading: isHouseDataLoading,
    error: houseError,
  } = useQuery("houseData", fetchHouseData, {
    onSuccess: () => {
      // Invalidate queries that depend on roleData
      queryClient.invalidateQueries(["houseData"]);
    },
  });

  return { houseData, isHouseDataLoading, houseError };
};

// Get room data
export const useRoomFetching = () => {
  const fetchRoomData = async () => {
    const response = await axios.get(`${BaseUrl}/house/rooms/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: roomData,
    isLoading: isRoomDataLoading,
    error: roomError,
  } = useQuery("roomData", fetchRoomData, {
    onSuccess: () => {
      // Invalidate queries that depend on roleData
      queryClient.invalidateQueries(["roomData"]);
    },
  });

  return { roomData, isRoomDataLoading, roomError };
};


// Get House Employee data
export const useHouseEmployeeFetching = () => {
  const fetchHouseEmployeeData = async () => {
    const response = await axios.get(`${BaseUrl}/house/employees/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: houseEmployeeData,
    isLoading: isHouseEmployeeLoading,
    error: houseEmployeeError,
  } = useQuery("houseEmployeeData", fetchHouseEmployeeData, {
    onSuccess: () => {
      // Invalidate queries that depend on roleData
      queryClient.invalidateQueries(["houseEmployeeData"]);
    },
  });

  return { houseEmployeeData, isHouseEmployeeLoading, houseEmployeeError };
};

// Get House Employee data
export const useHouseResidentFetching = () => {
  const fetchHouseResidentData = async () => {
    const response = await axios.get(`${BaseUrl}/house/residents/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: houseResidentData,
    isLoading: isHouseResidentLoading,
    error: houseResidentError,
  } = useQuery("houseResidentData", fetchHouseResidentData, {
    onSuccess: () => {
      // Invalidate queries that depend on roleData
      queryClient.invalidateQueries(["houseResidentData"]);
    },
  });

  return { houseResidentData, isHouseResidentLoading, houseResidentError };
};

// Get House Images data
export const useHouseImageFetching = () => {
  const fetchHouseImageData = async () => {
    const response = await axios.get(`${BaseUrl}/house/images/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: houseImageData,
    isLoading: isHouseImageLoading,
    error: houseImageError,
  } = useQuery("houseImageData", fetchHouseImageData, {
    onSuccess: () => {
      // Invalidate queries that depend on houseImageData
      queryClient.invalidateQueries(["houseImageData"]);
    },
  });

  return { houseImageData, isHouseImageLoading, houseImageError };
};
