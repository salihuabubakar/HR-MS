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
    const response = await axios.get(`${BaseUrl}/employee/create/`);
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
    data: houseImagesData,
    isLoading: isHouseImagesLoading,
    error: houseImagesError,
  } = useQuery("houseImagesData", fetchHouseImageData, {
    onSuccess: () => {
      // Invalidate queries that depend on houseImageData
      queryClient.invalidateQueries(["houseImagesData"]);
    },
  });

  return { houseImagesData, isHouseImagesLoading, houseImagesError };
};

// Get House Maintenance data
export const useHouseMaintenanceData = () => {
  const fetchHouseMaintenanceData = async () => {
    const response = await axios.get(`${BaseUrl}/house/maintenances/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: houseMaintenanceData,
    isLoading: isHouseMaintenanceLoading,
    error: houseMaintenanceError,
  } = useQuery("houseMaintenanceData", fetchHouseMaintenanceData, {
    onSuccess: () => {
      // Invalidate queries that depend on houseMaintenanceData
      queryClient.invalidateQueries(["houseMaintenanceData"]);
    },
  });

  return {
    houseMaintenanceData,
    isHouseMaintenanceLoading,
    houseMaintenanceError,
  };
};

// Get House Documents data
export const useHouseDocumentFetching = () => {
  const fetchHouseDocumentData = async () => {
    const response = await axios.get(`${BaseUrl}/house/documents/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: houseDocumentsData,
    isLoading: isHouseDocumentsLoading,
    error: houseDocumentsError,
  } = useQuery("houseDocumentData", fetchHouseDocumentData, {
    onSuccess: () => {
      // Invalidate queries that depend on houseDocumentData
      queryClient.invalidateQueries(["houseDocumentData"]);
    },
  });

  return {
    houseDocumentsData,
    isHouseDocumentsLoading,
    houseDocumentsError,
  };
};

// Get House Bills data
export const useBillFetching = () => {
  const fetchBillData = async () => {
    const response = await axios.get(`${BaseUrl}/house/bills/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: billData,
    isLoading: isBillDataLoading,
    error: billError,
  } = useQuery("billData", fetchBillData, {
    onSuccess: () => {
      // Invalidate queries that depend on billData
      queryClient.invalidateQueries(["billData"]);
    },
  });

  return { billData, isBillDataLoading, billError };
};


// Get organisation data
export const useOrganisationFetching = () => {
  const fetchData = async () => {
    const response = await axios.get(`${BaseUrl}/employee/organisations/?format=json`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: organisationData,
    isLoading: isOrganisationDataLoading,
    error: organisationError,
  } = useQuery("orgData", fetchData, {
    onSuccess: () => {
      // Invalidate queries that depend on organisationData
      queryClient.invalidateQueries(["orgData"]);
    },
  });

  return { organisationData, isOrganisationDataLoading, organisationError };
};

// Get status data
export const useStatusFetching = () => {
  const fetchData = async () => {
    const response = await axios.get(`${BaseUrl}/employee/status/?format=json`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: statusData,
    isLoading: isStatusDataLoading,
    error: statusError,
  } = useQuery("statusData", fetchData, {
    onSuccess: () => {
      // Invalidate queries that depend on statusData
      queryClient.invalidateQueries(["statusData"]);
    },
  });

  return { statusData, isStatusDataLoading, statusError };
};

// Get employeeAddress data
export const useEmployeeAddressFetching = () => {
  const fetchData = async () => {
    const response = await axios.get(
      `${BaseUrl}/employee/addresses/?format=json`
    );
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: employeeAddressData,
    isLoading: isEmployeeAddressDataLoading,
    error: employeeAddressError,
  } = useQuery("employeeAddressData", fetchData, {
    onSuccess: () => {
      // Invalidate queries that depend on employeeAddressData
      queryClient.invalidateQueries(["employeeAddressData"]);
    },
  });

  return { employeeAddressData, isEmployeeAddressDataLoading, employeeAddressError };
};

// Get emergency data
export const useEmployeeEmergencyFetching = () => {
  const fetchData = async () => {
    const response = await axios.get(
      `${BaseUrl}/employee/emergency/?format=json`
    );
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: employeeEmergencyData,
    isLoading: isEmployeeEmergencyDataLoading,
    error: employeeEmergencyError,
  } = useQuery("emergencyData", fetchData, {
    onSuccess: () => {
      // Invalidate queries that depend on emergencyData
      queryClient.invalidateQueries(["emergencyData"]);
    },
  });

  return {
    employeeEmergencyData,
    isEmployeeEmergencyDataLoading,
    employeeEmergencyError,
  };
};

// Get qualification data
export const useEmployeeQualificationFetching = () => {
  const fetchData = async () => {
    const response = await axios.get(
      `${BaseUrl}/employee/qualifications/?format=json`
    );
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: employeeQualificationData,
    isLoading: isEmployeeQualificationDataLoading,
    error: employeeQualificationError,
  } = useQuery("qualificationData", fetchData, {
    onSuccess: () => {
      // Invalidate queries that depend on qualificationData
      queryClient.invalidateQueries(["qualificationData"]);
    },
  });

  return {
    employeeQualificationData,
    isEmployeeQualificationDataLoading,
    employeeQualificationError,
  };
};

// Get experience data
export const useEmployeeExperienceFetching = () => {
  const fetchData = async () => {
    const response = await axios.get(
      `${BaseUrl}/employee/workexperience/?format=json`
    );
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: employeeExperienceData,
    isLoading: isEmployeeExperienceDataLoading,
    error: employeeExperienceError,
  } = useQuery("experienceData", fetchData, {
    onSuccess: () => {
      // Invalidate queries that depend on experienceData
      queryClient.invalidateQueries(["experienceData"]);
    },
  });

  return {
    employeeExperienceData,
    isEmployeeExperienceDataLoading,
    employeeExperienceError,
  };
};

// Get document data
export const useEmployeeDocumentFetching = () => {
  const fetchData = async () => {
    const response = await axios.get(
      `${BaseUrl}/employee/documents/?format=json`
    );
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: employeeDocumentData,
    isLoading: isEmployeeDocumentDataLoading,
    error: employeeDocumentError,
  } = useQuery("documentData", fetchData, {
    onSuccess: () => {
      // Invalidate queries that depend on documentData
      queryClient.invalidateQueries(["documentData"]);
    },
  });

  return {
    employeeDocumentData,
    isEmployeeDocumentDataLoading,
    employeeDocumentError,
  };
};

// Get bank data
export const useEmployeeBankFetching = () => {
  const fetchData = async () => {
    const response = await axios.get(
      `${BaseUrl}/employee/bank/?format=json`
    );
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: employeeBankData,
    isLoading: isEmployeeBankDataLoading,
    error: employeeBankError,
  } = useQuery("bankData", fetchData, {
    onSuccess: () => {
      // Invalidate queries that depend on bankData
      queryClient.invalidateQueries(["bankData"]);
    },
  });

  return {
    employeeBankData,
    isEmployeeBankDataLoading,
    employeeBankError,
  };
};

// Get review data
export const useEmployeeReviewFetching = () => {
  const fetchData = async () => {
    const response = await axios.get(
      `${BaseUrl}/employee/reviews/?format=json`
    );
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: employeeReviewData,
    isLoading: isEmployeeReviewDataLoading,
    error: employeeReviewError,
  } = useQuery("reviewData", fetchData, {
    onSuccess: () => {
      // Invalidate queries that depend on reviewData
      queryClient.invalidateQueries(["reviewData"]);
    },
  });

  return {
    employeeReviewData,
    isEmployeeReviewDataLoading,
    employeeReviewError,
  };
};

// Get resident data
export const useResidentFetching = () => {
  const fetchData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/residents/?format=json`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentData,
    isLoading: isResidentLoading,
    error: residentError,
  } = useQuery("residentData", fetchData, {
    onSuccess: () => {
      // Invalidate queries that depend on residentData
      queryClient.invalidateQueries(["residentData"]);
    },
  });

  return { residentData, isResidentLoading, residentError };
};















