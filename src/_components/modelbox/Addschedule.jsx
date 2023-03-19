import React, { useState, useEffect, useReducer } from 'react';
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import Select from "react-select";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import DeleteModal from "./DeleteModal";

const AddSchedule = ({
  employeeId,
  dispatchSchedule,
  selecteDay,
  selectedDayIndex,
  shiftList,
  schedule,
  houseId,
}) => {
  const [selectedScheduleEvent] = useGlobalState("selectedScheduleEvent");
  const [deleteModal] = useGlobalState("deleteModal");

  const [shifts, setShifts] = useState(
    selectedScheduleEvent[selectedDayIndex]?.shifts
      ? selectedScheduleEvent[selectedDayIndex]?.shifts
      : ""
  );

  const [id, setId] = useState(
    selectedScheduleEvent[selectedDayIndex]?.id
      ? selectedScheduleEvent[selectedDayIndex]?.id
      : Date.now()
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const schedule = {
      shifts,
      employeeId,
      selecteDay,
      houseId,
      id,
    };
    if (selectedScheduleEvent[selectedDayIndex]?.id) {
      dispatchSchedule({ type: "update", payload: schedule });
    } else {
      dispatchSchedule({ type: "push", payload: schedule });
    }
    setGlobalState("showAddSchedul", false);
  };
  const handleDeleteEvent = () => {  
    setGlobalState("deleteModal", true);
  };

  const customSelectStyles = {
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: state.isSelected && "#FF9B44",
      color: state.isSelected && "#262626",
      "&:hover": {
        backgroundColor: "#FF9B44",
        color: "#262626",
      },
    }),
  };

  const shiftLists = [];
  shiftList?.map((shift) => {
    shiftLists.push({
      value: shift.id,
      label:
        shift.title +
        " " +
        new Date(shift.startTime)
          .toLocaleString()
          .split(" ")
          .splice(1)
          .join(" ") +
        " - " +
        new Date(shift.endTime).toLocaleString().split(" ").splice(1).join(" "),
    });
  });

  const handleShiftChange = (event) => {
    setShifts(event);
  };

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div style={{ position: "relative" }} className="card-header">
                  <h5 className="card-title">
                    {selectedScheduleEvent[selectedDayIndex]?.id
                      ? "Edit Schedule"
                      : "Add Schedule"}
                  </h5>
                  {selectedScheduleEvent[selectedDayIndex]?.id && (
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        position: "absolute",
                        top: "5px",
                        right: "50px",
                      }}
                      className="delete-icon"
                      type="button"
                      onClick={handleDeleteEvent}
                    >
                      <i className="fa fa-trash-o" />
                    </button>
                  )}
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showAddSchedul", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">
                            Select Shift <span className="text-danger">*</span>
                          </label>
                          <Select
                            onChange={handleShiftChange}
                            options={shiftLists}
                            styles={customSelectStyles}
                            placeholder="Select Shift"
                            defaultValue={
                              selectedScheduleEvent[selectedDayIndex]?.shifts
                                ? {
                                    value:
                                      schedule[selectedDayIndex].shifts.value,
                                    label:
                                      schedule[selectedDayIndex].shifts.label,
                                  }
                                : "Select Shift"
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {selectedScheduleEvent[selectedDayIndex]?.id
                          ? "Update"
                          : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </PopupContainer>
        </PopupOverlay>
      </PopupWrapper>
      {deleteModal && (
        <DeleteModal
          deleteAction={dispatchSchedule}
          indexToDelete={selectedDayIndex}
          dispatch={selectedScheduleEvent}
          modalTitle={"Schedule"}
        />
      )}
    </>
  );
};

export default AddSchedule;
