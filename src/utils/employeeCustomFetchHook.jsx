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

// Get House Notices data
export const useHouseNoticesFetching = () => {
  const fetchHouseNoticesData = async () => {
    const response = await axios.get(`${BaseUrl}/house/notices/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: houseNoticeData,
    isLoading: isHouseNoticeLoading,
    error: houseNoticeError,
  } = useQuery("houseNoticesData", fetchHouseNoticesData, {
    onSuccess: () => {
      // Invalidate queries that depend on houseNoticesData
      queryClient.invalidateQueries(["houseNoticesData"]);
    },
  });

  return {
    houseNoticeData,
    isHouseNoticeLoading,
    houseNoticeError,
  };
};


// Get House Items data
export const useHouseItemsFetching = () => {
  const fetchHouseItemsData = async () => {
    const response = await axios.get(`${BaseUrl}/house/items/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: houseItemData,
    isLoading: isHouseItemLoading,
    error: houseItemError,
  } = useQuery("houseItemsData", fetchHouseItemsData, {
    onSuccess: () => {
      // Invalidate queries that depend on houseItemsData
      queryClient.invalidateQueries(["houseItemsData"]);
    },
  });

  return {
    houseItemData,
    isHouseItemLoading,
    houseItemError,
  };
};

// Get House Inspections data
export const useHouseInspectionsFetching = () => {
  const fetchHouseInspectionsData = async () => {
    const response = await axios.get(`${BaseUrl}/house/inspections/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: houseInspectionData,
    isLoading: isHouseInspectionLoading,
    error: houseInspectionError,
  } = useQuery("houseInspectionsData", fetchHouseInspectionsData, {
    onSuccess: () => {
      // Invalidate queries that depend on houseInspectionsData
      queryClient.invalidateQueries(["houseInspectionsData"]);
    },
  });

  return {
    houseInspectionData,
    isHouseInspectionLoading,
    houseInspectionError,
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

// Get resident school data
export const useResidentSchoolFetching = () => {
  const fetchResidentSchoolData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/school/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentSchoolData,
    isLoading: isResidentSchoolLoading,
    error: residentSchoolError,
  } = useQuery("residentSchoolData", fetchResidentSchoolData, {
    onSuccess: () => {
      // Invalidate queries that depend on residentSchoolData
      queryClient.invalidateQueries(["residentSchoolData"]);
    },
  });

  return { residentSchoolData, isResidentSchoolLoading, residentSchoolError };
};

// Get resident education data
export const useResidentEducationFetching = () => {
  const fetchResidentEducationData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/education/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentEducationData,
    isLoading: isResidentEducationLoading,
    error: residentEducationError,
  } = useQuery("residentEducationData", fetchResidentEducationData, {
    onSuccess: () => {
      // Invalidate queries that depend on residentEducationData
      queryClient.invalidateQueries(["residentEducationData"]);
    },
  });

  return { residentEducationData, isResidentEducationLoading, residentEducationError };
};


// Get resident gp data
export const useResidentGpFetching = () => {
  const fetchResidentGpData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/residentgp/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentGpData,
    isLoading: isResidentGpLoading,
    error: residentGpError,
  } = useQuery("residentGpData", fetchResidentGpData, {
    onSuccess: () => {
      // Invalidate queries that depend on residentGpData
      queryClient.invalidateQueries(["residentGpData"]);
    },
  });

  return { residentGpData, isResidentGpLoading, residentGpError };
};

// Get gptype data
export const useGpTypeFetching = () => {
  const fetchGpTypeData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/gptype/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: gpTypeData,
    isLoading: isGpTypeLoading,
    error: gpTypeError,
  } = useQuery("gpTypeData", fetchGpTypeData, {
    onSuccess: () => {
      // Invalidate queries that depend on gpTypeData
      queryClient.invalidateQueries(["gpTypeData"]);
    },
  });

  return { gpTypeData, isGpTypeLoading, gpTypeError };
};

// Get resident solicitor data
export const useResidentSolicitorFetching = () => {
  const fetchResidentSolicitorData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/solicitor/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentSolicitorData,
    isLoading: isResidentSolicitorLoading,
    error: residentSolicitorError,
  } = useQuery("residentSolicitorData", fetchResidentSolicitorData, {
    onSuccess: () => {
      // Invalidate queries that depend on residentSolicitorData
      queryClient.invalidateQueries(["residentSolicitorData"]);
    },
  });

  return { residentSolicitorData, isResidentSolicitorLoading, residentSolicitorError };
};

// Get social worker data
export const useSocialWorkerFetching = () => {
  const fetchSocialWorkerData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/socialworker/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: socialWorkerData,
    isLoading: socialWorkerLoading,
    error: socialWorkerError,
  } = useQuery("socialWorkerData", fetchSocialWorkerData, {
    onSuccess: () => {
      // Invalidate queries that depend on SocialWorkerData
      queryClient.invalidateQueries(["socialWorkerData"]);
    },
  });

  return {
    socialWorkerData,
    socialWorkerLoading,
    socialWorkerError,
  };
};

// Get resident social worker data
export const useRSocialWorkerFetching = () => {
  const fetchRSocialWorkerData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/rsocialworker/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: rSocialWorkerData,
    isLoading: rSocialWorkerLoading,
    error: rSocialWorkerError,
  } = useQuery("rSocialWorkerData", fetchRSocialWorkerData, {
    onSuccess: () => {
      // Invalidate queries that depend on ResidentSocialWorkerData
      queryClient.invalidateQueries(["rSocialWorkerData"]);
    },
  });

  return {
    rSocialWorkerData,
    rSocialWorkerLoading,
    rSocialWorkerError,
  };
};

// Get Resident Documents data
export const useResidentDocumentFetching = () => {
  const fetchResidentDocumentData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/document/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentDocumentData,
    isLoading: isResidentDocumentLoading,
    error: residentDocumentError,
  } = useQuery("residentDocumentData", fetchResidentDocumentData, {
    onSuccess: () => {
      // Invalidate queries that depend on residentDocumentData
      queryClient.invalidateQueries(["residentDocumentData"]);
    },
  });

  return {
    residentDocumentData,
    isResidentDocumentLoading,
    residentDocumentError,
  };
};

// Get resident school Report data
export const useResidentSchoolReportFetching = () => {
  const fetchResidentSchoolData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/report/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentSchoolReportData,
    isLoading: isResidentSchoolReportLoading,
    error: residentSchoolReportError,
  } = useQuery("residentSchoolReportData", fetchResidentSchoolData, {
    onSuccess: () => {
      // Invalidate queries that depend on residentSchoolReportData
      queryClient.invalidateQueries(["residentSchoolReportData"]);
    },
  });

  return { residentSchoolReportData, isResidentSchoolReportLoading, residentSchoolReportError };
};

// Get resident school Timetable data
export const useResidentSchoolTimetableFetching = () => {
  const fetchResidentSchoolTimetableData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/timetable/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentSchoolTimetableData,
    isLoading: isResidentSchoolTimetableLoading,
    error: residentSchoolTimetableError,
  } = useQuery(
    "residentSchoolTimetableData",
    fetchResidentSchoolTimetableData,
    {
      onSuccess: () => {
        // Invalidate queries that depend on residentSchoolTimetableData
        queryClient.invalidateQueries(["residentSchoolTimetableData"]);
      },
    }
  );

  return {
    residentSchoolTimetableData,
    isResidentSchoolTimetableLoading,
    residentSchoolTimetableError,
  };
};

// Get resident medical condition data
export const useResidentMedicalConditionFetching = () => {
  const fetchResidentMedicalConditionData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/medicalcondition/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentMedicalConditionData,
    isLoading: isResidentMedicalConditionLoading,
    error: residentMedicalConditionError,
  } = useQuery(
    "residentMedicalConditionData",
    fetchResidentMedicalConditionData,
    {
      onSuccess: () => {
        // Invalidate queries that depend on residentMedicalConditionData
        queryClient.invalidateQueries(["residentMedicalConditionData"]);
      },
    }
  );

  return {
    residentMedicalConditionData,
    isResidentMedicalConditionLoading,
    residentMedicalConditionError,
  };
};

// Get resident medication data
export const useResidentMedicationFetching = () => {
  const fetchResidentMedicationData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/medication/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentMedicationData,
    isLoading: isResidentMedicationLoading,
    error: residentMedicationError,
  } = useQuery(
    "residentMedicationData",
    fetchResidentMedicationData,
    {
      onSuccess: () => {
        // Invalidate queries that depend on residentMedicationData
        queryClient.invalidateQueries(["residentMedicationData"]);
      },
    }
  );

  return {
    residentMedicationData,
    isResidentMedicationLoading,
    residentMedicationError,
  };
};

// Get resident appointment data
export const useResidentAppointmentFetching = () => {
  const fetchResidentAppointmentData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/appointment/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentAppointmentData,
    isLoading: isResidentAppointmentLoading,
    error: residentAppointmentError,
  } = useQuery(
    "residentAppointmentData",
    fetchResidentAppointmentData,
    {
      onSuccess: () => {
        // Invalidate queries that depend on residentAppointmentData
        queryClient.invalidateQueries(["residentAppointmentData"]);
      },
    }
  );

  return {
    residentAppointmentData,
    isResidentAppointmentLoading,
    residentAppointmentError,
  };
};

// Get resident referral data
export const useResidentReferralFetching = () => {
  const fetchResidentReferralData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/referral/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentReferralData,
    isLoading: isResidentReferralLoading,
    error: residentReferralError,
  } = useQuery(
    "residentReferralData",
    fetchResidentReferralData,
    {
      onSuccess: () => {
        // Invalidate queries that depend on residentReferralData
        queryClient.invalidateQueries(["residentReferralData"]);
      },
    }
  );

  return {
    residentReferralData,
    isResidentReferralLoading,
    residentReferralError,
  };
};

// Get resident borough data
export const useResidentBoroughFetching = () => {
  const fetchResidentBoroughData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/borough/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentBoroughData,
    isLoading: isResidentBoroughLoading,
    error: residentBoroughError,
  } = useQuery(
    "residentBoroughData",
    fetchResidentBoroughData,
    {
      onSuccess: () => {
        // Invalidate queries that depend on residentBoroughData
        queryClient.invalidateQueries(["residentBoroughData"]);
      },
    }
  );

  return {
    residentBoroughData,
    isResidentBoroughLoading,
    residentBoroughError,
  };
};

// Get resident visitor data
export const useResidentVisitorFetching = () => {
  const fetchResidentVisitorData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/visitor/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentVisitorData,
    isLoading: residentVisitorLoading,
    error: residentVisitorError,
  } = useQuery("residentVisitorData", fetchResidentVisitorData, {
    onSuccess: () => {
      // Invalidate queries that depend on ResidentVisitorData
      queryClient.invalidateQueries(["residentVisitorData"]);
    },
  });

  return {
    residentVisitorData,
    residentVisitorLoading,
    residentVisitorError,
  };
};

// Get resident complaint data
export const useComplaintFetching = () => {
  const fetchResidentComplaintData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/complaint/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: complaintData,
    isLoading: complaintLoading,
    error: complaintError,
  } = useQuery("residentComplaintData", fetchResidentComplaintData, {
    onSuccess: () => {
      // Invalidate queries that depend on ResidentComplaintData
      queryClient.invalidateQueries(["residentComplaintData"]);
    },
  });

  return {
    complaintData,
    complaintLoading,
    complaintError,
  };
};

// Get resident Request data
export const useResidentRequestFetching = () => {
  const fetchResidentRequestData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/request/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentRequestData,
    isLoading: residentRequestLoading,
    error: residentRequestError,
  } = useQuery("residentRequestData", fetchResidentRequestData, {
    onSuccess: () => {
      // Invalidate queries that depend on ResidentRequestData
      queryClient.invalidateQueries(["residentRequestData"]);
    },
  });

  return {
    residentRequestData,
    residentRequestLoading,
    residentRequestError,
  };
};

// Get resident Incident data
export const useResidentIncidentFetching = () => {
  const fetchResidentIncidentData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/incident/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentIncidentData,
    isLoading: residentIncidentLoading,
    error: residentIncidentError,
  } = useQuery("residentIncidentData", fetchResidentIncidentData, {
    onSuccess: () => {
      // Invalidate queries that depend on ResidentIncidentData
      queryClient.invalidateQueries(["residentIncidentData"]);
    },
  });

  return {
    residentIncidentData,
    residentIncidentLoading,
    residentIncidentError,
  };
};

// Get resident Misper data
export const useResidentMisperFetching = () => {
  const fetchResidentMisperData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/misper/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentMisperData,
    isLoading: residentMisperLoading,
    error: residentMisperError,
  } = useQuery("residentMisperData", fetchResidentMisperData, {
    onSuccess: () => {
      // Invalidate queries that depend on ResidentMisperData
      queryClient.invalidateQueries(["residentMisperData"]);
    },
  });

  return {
    residentMisperData,
    residentMisperLoading,
    residentMisperError,
  };
};

// Get resident DocumentType data
export const useResidentDocumentTypeFetching = () => {
  const fetchResidentDocumentTypeData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/documenttype/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentDocumentTypeData,
    isLoading: residentDocumentTypeLoading,
    error: residentDocumentTypeError,
  } = useQuery("residentDocumentTypeData", fetchResidentDocumentTypeData, {
    onSuccess: () => {
      // Invalidate queries that depend on ResidentDocumentTypeData
      queryClient.invalidateQueries(["residentDocumentTypeData"]);
    },
  });

  return {
    residentDocumentTypeData,
    residentDocumentTypeLoading,
    residentDocumentTypeError,
  };
};


// Get resident Gp Type data
export const useResidentGpTypeFetching = () => {
  const fetchResidentGpTypeData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/gptype/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentGpTypeData,
    isLoading: residentGpTypeLoading,
    error: residentGpTypeError,
  } = useQuery("residentGpTypeData", fetchResidentGpTypeData, {
    onSuccess: () => {
      // Invalidate queries that depend on ResidentGpTypeData
      queryClient.invalidateQueries(["residentGpTypeData"]);
    },
  });

  return {
    residentGpTypeData,
    residentGpTypeLoading,
    residentGpTypeError,
  };
};

// Get resident Legal Status Type data
export const useResidentLegalStatusTypeFetching = () => {
  const fetchResidentLegalStatusTypeData = async () => {
    const response = await axios.get(`${BaseUrl}/resident/legalstatus/`);
    return response.data;
  };
  const queryClient = useQueryClient();

  const {
    data: residentLegalStatusTypeData,
    isLoading: residentLegalStatusTypeLoading,
    error: residentLegalStatusTypeError,
  } = useQuery("residentLegalStatusTypeData", fetchResidentLegalStatusTypeData, {
    onSuccess: () => {
      // Invalidate queries that depend on ResidentLegalStatusTypeData
      queryClient.invalidateQueries(["residentLegalStatusTypeData"]);
    },
  });

  return {
    residentLegalStatusTypeData,
    residentLegalStatusTypeLoading,
    residentLegalStatusTypeError,
  };
};






