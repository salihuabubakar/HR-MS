import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  selectedUserAccount: [],
  selectedDept: [],
  selectedDesignation: [],
  selectedHouse: [],
  selectedResident: [],
  selectedShiftEvent: [],
  selectedProfileInfo: [],
  showModal: false,
});

export {setGlobalState, useGlobalState}
