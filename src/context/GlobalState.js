import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  selectedEmployeeAccount: [],

  selectedHouse: [],
  selectedResident: [],
  selectedScheduleEvent: [],
  selectedShiftList: [],
  selectedProfileInfo: [],
  deleteModal: false,
  showFileUploadModal: false,
  selectedFileUpload: [],

  repeatModal: false,
  deleteFile: false,
  deleteSubTask: false,

  // Depatment
  showDeptModal: false,
  deleteDeptModal: false,
  selectedDept: [],

  // Room
  showRoomModal: false,
  selectedRoom: [],
  deleteRoomModal: false,

  // Role
  showRoleModal: false,
  selectedRole: [],
  deleteRoleModal: false,

  showModal: false,
  showProfileModal: false,
  showPersonalInfoModal: false,
  selectedPersonalInfo: [],

  // Review
  showAddReviewModal: false,
  selectedReviewInfo: [],

  showAddSchedul: false,
  showEmergencyContactModal: false,
  selectedEmergencyContact: [],
  showEducationInformationModal: false,
  selectedEducationalInfo: [],
  showExperienceModal: false,
  selectedExperienceModal: [],
  showFamilyMenberModal: false,
  selectedFamilyMemberInfo: [],
  showTaskModal: false,
  selectedTaskInfo: [],
  showSubTaskModal: false,
  selectedSubTaskInfo: [],
  selectedComment: [],
  showSalaryModal: false,
  selectedSalary: [],
  showUsersModal: false,
  selectedUsers: [],

  // House Employee
  selectedHouseEmployee: [],
  showHouseEmployeeModal: false,
  deleteHouseEmployeeModal: false,

  // House Resident
  selectedHouseResident: [],
  showHouseResidentModal: false,
  deleteHouseResidentModal: false,

  // House Image
  showHouseImagesModal: false,
  selectedHouseImages: [],
  deleteHouseImagesModal: false,

  // House Document
  showHouseDocumentsModal: false,
  deleteHouseDocumentsModal: false,
  selectedHouseDocuments: [],

  // Bill
  selectedBill: [],
  showBillModal: false,
  deleteBillModal: false,

  // Maintenance
  selectedMaintenance: [],
  showMaintenanceModal: false,
  deleteMaintenanceModal: false,

  // Organisation
  showOrganisationModal: false,
  selectedOrganisation: [],
  deleteOrganisationModal: false,

  // Status
  showStatusModal: false,
  selectedStatus: [],
  deleteStatusModal: false,

  // Employee Address
  deleteEmployeeAddressModal: false,
  showEmployeeAddressModal: false,
  selectedEmployeeAddress: [],

  // Employee Emergency Contact
  deleteEmployeeEmergencyModal: false,
  showEmployeeEmergencyModal: false,
  selectedEmployeeEmergency: [],

  // Employee Qualification
  deleteEmployeeQualificationModal: false,
  showEmployeeQualificationModal: false,
  selectedEmployeeQualification: [],

  // Employee Experience
  deleteEmployeeExperienceModal: false,
  showEmployeeExperienceModal: false,
  selectedEmployeeExperience: [],

  // Employee Document
  deleteEmployeeDocumentModal: false,
  showEmployeeDocumentModal: false,
  selectedEmployeeDocument: [],

  // Employee Bank
  deleteEmployeeBankModal: false,
  showEmployeeBankModal: false,
  selectedEmployeeBank: [],

  // House Notice
  deleteNoticeModal: false,
  showNoticeModal: false,
  selectedNotice: [],

  // House Item
  deleteItemModal: false,
  showItemModal: false,
  selectedItem: [],

  // House Inspection
  deleteInspectionModal: false,
  showInspectionModal: false,
  selectedInspection: [],

  // Resident Account
  selectedResidentAccount: [],

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
});

export {setGlobalState, useGlobalState}
