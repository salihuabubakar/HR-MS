import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import Select from "react-select";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import DeleteModal from "./DeleteModal";
import RepeatModal from "./RepeatModal";

const AddSchedule = ({
  employeeId,
  dispatchSchedule,
  selectedDay,
  selectedDayIndex,
  shiftList,
  houseId,
  event,
  selectedDayIndex2,
}) => {
  const [selectedScheduleEvent] = useGlobalState("selectedScheduleEvent");
  const [deleteModal] = useGlobalState("deleteModal");
  const [repeatModal] = useGlobalState("repeatModal");

  let isIdExist;
  let isSubIdExist;
  let isShiftExist;
  let isSubShiftExist;

  if (selectedScheduleEvent && selectedDayIndex !== undefined && (selectedDayIndex2 === undefined || selectedDayIndex2 !== undefined)) {
      isIdExist = selectedScheduleEvent[selectedDayIndex]?.id;
      isShiftExist = selectedScheduleEvent[selectedDayIndex]?.shifts;
      isSubIdExist = selectedScheduleEvent[selectedDayIndex][selectedDayIndex2]?.id;
      isSubShiftExist = selectedScheduleEvent[selectedDayIndex][selectedDayIndex2]?.shifts;
  } else {
      isIdExist = "";
      isSubIdExist = "";
      isShiftExist = "";
      isSubShiftExist = "";
  }

  const [shifts, setShifts] = useState(
    (isShiftExist || isSubShiftExist) ? (isShiftExist || isSubShiftExist) : ""
  );

  const [id, setId] = useState(
    (isIdExist || isSubIdExist) ? (isIdExist || isSubIdExist) : Date.now()
  );

  const [dayInWeeks, setDayInWeeks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const scheduleE = {
      shifts,
      employeeId,
      selectedDay,
      houseId,
      id,
    };
    if (isIdExist || isSubIdExist) {
      dispatchSchedule({ type: "update", payload: scheduleE });
    } else {
      dispatchSchedule({ type: "push", payload: scheduleE });
    }
    setGlobalState("showAddSchedul", false);
  };
  const handleDeleteEvent = () => {
    setGlobalState("deleteModal", true);
  };

  const handleRepeatShift = () => {
    setGlobalState("repeatModal", true);
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
                    {isIdExist || isSubIdExist
                      ? "Edit Schedule"
                      : "Add Schedule"}
                  </h5>
                  {(isIdExist || isSubIdExist) && (
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
                    {dayInWeeks.length > 0 && (
                      <p>Repeat shift on {dayInWeeks.join(", ")}</p>
                    )}
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
                              isShiftExist || isSubShiftExist
                                ? {
                                    value:
                                      isShiftExist?.value ||
                                      isSubShiftExist?.value,
                                    label:
                                      isShiftExist?.label ||
                                      isSubShiftExist?.label,
                                  }
                                : "Select Shift"
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      {(isIdExist || isSubIdExist) && (
                        <button
                          onClick={handleRepeatShift}
                          className="btn btn-primary repeat-btn"
                          type="button"
                        >
                          Repeat
                        </button>
                      )}
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {isIdExist || isSubIdExist ? "Update" : "Save"}
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
          selectedDayIndex2={selectedDayIndex2}
          modalTitle={"Schedule"}
        />
      )}
      {repeatModal && (
        <RepeatModal
          setDayInWeeks={setDayInWeeks}
          dispatchSchedule={dispatchSchedule}
          event={event}
        />
      )}
    </>
  );
};

export default AddSchedule;
