import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  selectedUserAccount: [],
  selectedDept: [],
  selectedDesignation: [],
  selectedHouse: [],
  selectedResident: [],
  selectedScheduleEvent: [],
  selectedShiftList: [],
  selectedProfileInfo: [],
  showModal: false,
  showProfileModal: false,
  showPersonalInfoModal: false,
  showAddSchedul: false,
  showEmergencyContactModal: false,
  showEducationInformationModal: false,
  selectedEducationalInfo: [],
  showExperienceModal: false,
  selectedExperienceModal: [],
  showFamilyMenberModal: false,
  selectedFamilyMemberInfo: [],
});

export {setGlobalState, useGlobalState}
