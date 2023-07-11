import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  //Employee Account
  selectedEmployeeAccount: [],
  employeeError: [],

  // Household Info
  selectedHouse: [],
  isHouseError: [],

  //Resident
  selectedResident: [],

  selectedProfileInfo: [],
  showFileUploadModal: false,
  selectedFileUpload: [],

  // Task Document
  taskDocumentError: [],
  selectedTaskDocumentInfo: [],
  showTaskDocumentModal: false,
  deleteTaskDocument: false,

  // Task Manager
  showTaskModal: false,
  taskError: [],
  selectedTaskInfo: [],

  // Sub Task Manager
  showTaskAssignmentModal: false,
  selectedTaskAssignmentInfo: [],
  deleteTaskAssignment: false,
  taskAssignmentError: [],

  selectedUserAccount: [],
  selectedComment: [],
  showSalaryModal: false,
  selectedSalary: [],
  showUsersModal: false,
  selectedUsers: [],
  deleteFile: false,
  selectedShiftList: [],

  // Delete Modal
  deleteModal: false,

  // Repeat Modal
  repeatModal: false,

  // Depatment
  showDeptModal: false,
  deleteDeptModal: false,
  selectedDept: [],
  departmentError: [],

  // Room
  showRoomModal: false,
  selectedRoom: [],
  deleteRoomModal: false,
  roomError: [],

  // Role
  showRoleModal: false,
  selectedRole: [],
  deleteRoleModal: false,
  roleError: [],

  showModal: false,
  showProfileModal: false,
  showPersonalInfoModal: false,
  selectedPersonalInfo: [],

  // Review
  showAddReviewModal: false,
  selectedReviewInfo: [],
  employeeReviewError: [],

  // Shift Schedule
  employeeShiftError: [],
  selectedScheduleEvent: [],
  showAddSchedul: false,

  // House Employee
  selectedHouseEmployee: [],
  showHouseEmployeeModal: false,
  deleteHouseEmployeeModal: false,
  houseEmployeeError: [],

  // House Resident
  selectedHouseResident: [],
  showHouseResidentModal: false,
  deleteHouseResidentModal: false,
  houseResidentError: [],

  // House Image
  showHouseImagesModal: false,
  selectedHouseImages: [],
  deleteHouseImagesModal: false,
  houseImageError: [],

  // House Document
  showHouseDocumentsModal: false,
  deleteHouseDocumentsModal: false,
  selectedHouseDocuments: [],
  houseDocumentError: [],

  // Bill
  selectedBill: [],
  showBillModal: false,
  deleteBillModal: false,
  houseBillError: [],

  // Maintenance
  selectedMaintenance: [],
  showMaintenanceModal: false,
  deleteMaintenanceModal: false,
  maintenanceError: [],

  // Organisation
  showOrganisationModal: false,
  selectedOrganisation: [],
  deleteOrganisationModal: false,
  organisationError: [],

  // Status
  showStatusModal: false,
  selectedStatus: [],
  deleteStatusModal: false,
  statusError: [],

  // Status
  showStatusTypeModal: false,
  selectedStatusType: [],
  deleteStatusTypeModal: false,
  statusTypeError: [],

  // Employee Address
  deleteEmployeeAddressModal: false,
  showEmployeeAddressModal: false,
  selectedEmployeeAddress: [],
  employeeAddressError: [],

  // Employee Emergency Contact
  deleteEmployeeEmergencyModal: false,
  showEmployeeEmergencyModal: false,
  selectedEmployeeEmergency: [],
  employeeEmergencyError: [],

  // Employee Qualification
  deleteEmployeeQualificationModal: false,
  showEmployeeQualificationModal: false,
  selectedEmployeeQualification: [],
  employeeQualificationError: [],

  // Employee Experience
  deleteEmployeeExperienceModal: false,
  showEmployeeExperienceModal: false,
  selectedEmployeeExperience: [],
  employeeExperiencError: [],

  // Employee Document
  deleteEmployeeDocumentModal: false,
  showEmployeeDocumentModal: false,
  selectedEmployeeDocument: [],
  employeeDocumentError: [],

  // Employee Bank
  deleteEmployeeBankModal: false,
  showEmployeeBankModal: false,
  selectedEmployeeBank: [],
  employeeBankError: [],

  // House Notice
  deleteNoticeModal: false,
  showNoticeModal: false,
  selectedNotice: [],
  houseNoticeError: [],

  // House Item
  deleteItemModal: false,
  showItemModal: false,
  selectedItem: [],
  houseItemError: [],

  // House Inspection
  deleteInspectionModal: false,
  showInspectionModal: false,
  selectedInspection: [],
  houseInspectionError: [],

  // Resident Account
  selectedResidentAccount: [],
  isResidentError: [],

  // Resident gp
  showResidentGpModal: false,
  selectedResidentGp: [],
  deleteResidentGpModal: false,
  gpError: [],

  // Resident solicitor
  showResidentSolicitorModal: false,
  selectedResidentSolicitor: [],
  deleteResidentSolicitorModal: false,
  solicitorError: [],

  // Resident Document
  deleteResidentDocumentModal: false,
  showResidentDocumentModal: false,
  selectedResidentDocument: [],
  residentdocumentError: [],

  // Resident School
  deleteResidentSchoolModal: false,
  showResidentSchoolModal: false,
  selectedResidentSchool: [],
  schoolError: [],

  // Resident Education
  deleteResidentEducationModal: false,
  showResidentEducationModal: false,
  selectedResidentEducation: [],
  educationError: [],

  // Resident School Report
  deleteResidentSchoolReportModal: false,
  showResidentSchoolReportModal: false,
  selectedResidentSchoolReport: [],
  schoolReportError: [],

  // Resident School Timetable
  deleteResidentSchoolTimetableModal: false,
  showResidentSchoolTimetableModal: false,
  selectedResidentSchoolTimetable: [],
  schoolTimetableError: [],

  // Resident Medical Condition
  deleteResidentMedicalConditionModal: false,
  showResidentMedicalConditionModal: false,
  selectedResidentMedicalCondition: [],
  medicalConditionError: [],

  // Resident Medication
  deleteResidentMedicationModal: false,
  showResidentMedicationModal: false,
  selectedResidentMedication: [],
  medicationError: [],

  // Resident Appointment
  deleteResidentAppointmentModal: false,
  showResidentAppointmentModal: false,
  selectedResidentAppointment: [],
  appointmentError: [],

  // Resident Social Worker
  deleteResidentSocialWorkerModal: false,
  showResidentSocialWorkerModal: false,
  selectedResidentSocialWorker: [],
  rSocialWorkerError: [],

  // Resident Referral
  deleteResidentReferralModal: false,
  showResidentReferralModal: false,
  selectedResidentReferral: [],
  referralError: [],

  // Resident Borough
  deleteBoroughModal: false,
  showBoroughModal: false,
  selectedBorough: [],
  boroughError: [],

  // Social Worker
  deleteSocialWorkerModal: false,
  showSocialWorkerModal: false,
  selectedSocialWorker: [],
  socialWorkerError: [],

  // Resident Visitor
  deleteResidentVisitorModal: false,
  showResidentVisitorModal: false,
  selectedResidentVisitor: [],
  residentVisitorError: [],

  // Resident Complaint
  deleteComplaintModal: false,
  showComplaintModal: false,
  selectedComplaint: [],
  complaintError: [],

  // Resident Request
  deleteResidentRequestModal: false,
  showResidentRequestModal: false,
  selectedResidentRequest: [],
  residentRequestError: [],

  // Resident Incident
  deleteResidentIncidentModal: false,
  showResidentIncidentModal: false,
  selectedResidentIncident: [],
  residentIncidentError: [],

  // Resident Misper
  deleteResidentMisperModal: false,
  showResidentMisperModal: false,
  selectedResidentMisper: [],
  residentMisperError: [],

  // Resident Document Type
  deleteResidentDocumentTypeModal: false,
  showResidentDocumentTypeModal: false,
  selectedResidentDocumentType: [],
  residentDocumentTypeError: [],

  // Resident Gp Type
  deleteResidentGpTypeModal: false,
  showResidentGpTypeModal: false,
  selectedResidentGpType: [],
  residentGpTypeError: [],

  // Resident Legal Status Type
  deleteResidentLegalStatusTypeModal: false,
  showResidentLegalStatusTypeModal: false,
  selectedResidentLegalStatusType: [],
  residentLegalStatusTypeError: [],

  // Shift
  deleteShiftModal: false,
  showShiftModal: false,
  selectedShift: [],
  shiftError: [],
});

export {setGlobalState, useGlobalState}
