import React, { useState, useEffect, useReducer } from 'react';
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import Select from "react-select";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddSchedule = ({
  employeeId,
  employeeSelectedIndex,
  dispatchSchedule,
  selecteDay,
  selectedDayIndex,
  shiftList,
  schedule,
}) => {
  const [selectedScheduleEvent] = useGlobalState("selectedScheduleEvent");

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
      employeeSelectedIndex,
      selecteDay,
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
    dispatchSchedule({
      type: "delete",
      payload: selectedScheduleEvent[selectedDayIndex],
    });
    setGlobalState("showAddSchedul", false);
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
        new Date(shift.startTime).toLocaleString().split(" ").splice(1).join(" ") +
        " - " +
        new Date(shift.endTime).toLocaleString().split(" ").splice(1).join(" "),
    });
  });

    const handleShiftChange = (event) => {
      console.log(event);
      setShifts(event)
    };


  return (
    <>
      <PopupWrapper>
        <PopupOverlay />
        <PopupContainer className="custom-modal" role="dialog">
          <Card className="" role="document">
            <div className="card-content">
              <div className="card-header">
                <h5 className="card-title">
                  {selectedScheduleEvent[selectedDayIndex]?.id
                    ? "Edit Schedule"
                    : "Add Schedule"}
                </h5>
                <div className="btn-container">
                  {selectedScheduleEvent[selectedDayIndex]?.id && (
                    <button
                      className="delete"
                      type="submit"
                      onClick={handleDeleteEvent}
                    >
                      Delete
                    </button>
                  )}
                  <button
                    className="closeX"
                    type="button"
                    onClick={() => setGlobalState("showAddSchedul", false)}
                  >
                    <span>×</span>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <form>
                  <div className="row-">
                    <div className="col-sm space-between">
                      <div className="form-group inputText right">
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

                  <div className="submit-btn" onClick={handleSubmit}>
                    <button className="submit-Btn">
                      {selectedScheduleEvent[selectedDayIndex]?.id
                        ? "Update"
                        : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </PopupContainer>
      </PopupWrapper>
    </>
  );
};

export default AddSchedule;
