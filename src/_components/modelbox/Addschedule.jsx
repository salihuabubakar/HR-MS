import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import DeleteModal from "./DeleteModal";
import RepeatModal from "./RepeatModal";
import moment from "moment";
import { toast } from "react-toastify";
import { useEmployeeShiftFetching } from "../../utils/employeeCustomFetchHook";

const AddSchedule = ({
  employeeId: employee,
  dispatchSchedule,
  selectedDay: date,
  selectedDayIndex,
  shiftData,
  houseId: house,
  event,
  shiftScheduleId: id
}) => {

  const { employeeshiftData } = useEmployeeShiftFetching();
  const [selectedScheduleEvent] = useGlobalState("selectedScheduleEvent");
  const [deleteModal] = useGlobalState("deleteModal");
  const [repeatModal] = useGlobalState("repeatModal");
  
  let filteredShift;
  const filterEmployeeShift = employeeshiftData?.filter((s) => {
    if (s.house === house) return s;
  });

  if (filterEmployeeShift) {
    filteredShift = filterEmployeeShift?.map((sh) => {
      return sh;
    });
  }

  const currentShift = selectedScheduleEvent[selectedDayIndex]?.shift;
  
  const findCurrentShift = shiftData?.find(shift => shift.id === currentShift);

  const noShiftRemain = !shiftData?.some(
    (shft) =>
      !filteredShift?.some((fs) => fs.date === date && fs.shift === shft.id)
  );


  const [shift, setShift] = useState(
    selectedScheduleEvent[selectedDayIndex]?.shift || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date().toLocaleDateString();
    const selected = new Date(date).toLocaleDateString();

    if (selected >= currentDate) {
      if (noShiftRemain) {
        return null; // Skip further execution
      }

      const scheduleE = {
        id,
        shift,
        employee,
        date,
        house,
      };

      if (selectedScheduleEvent[selectedDayIndex]?.id) {
        dispatchSchedule({ type: "update", payload: scheduleE });
      } else {
        dispatchSchedule({ type: "add", payload: scheduleE });
      }

      setGlobalState("showAddSchedul", false);
    } else {
      toast.warning("You can't add shift for past date.", {
        autoClose: 2000,
      });
      setGlobalState("showAddSchedul", false);
      return null; // Skip further execution
    }



  };
  const handleDeleteEvent = () => {
    setGlobalState("deleteModal", true);
  };

  const handleRepeatShift = () => {
    setGlobalState("repeatModal", true);
  };

  const handleShiftChange = (event) => {
    setShift(parseInt(event.target.value));
  };

  const notify = (e) => {
    e.preventDefault();
    toast.warn("Can't submit an empty form", {
      autoClose: 1500,
    });
  }

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
                  <form onSubmit={shift === "" ? notify : handleSubmit}>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            {findCurrentShift ? (
                              <span style={{ fontSize: "0.7rem" }}>
                                current shift: {""}
                                {`${findCurrentShift?.name} -
                                ${moment(
                                  findCurrentShift?.start_time,
                                  "HH:mm"
                                ).format("hh:mm A")} :
                                ${moment(
                                  findCurrentShift?.end_time,
                                  "HH:mm"
                                ).format("hh:mm A")}
                                `}
                              </span>
                            ) : (
                              "Select Shift"
                            )}
                          </label>
                          <select
                            value={shift}
                            onChange={handleShiftChange}
                            className="form-control floating"
                          >
                            {noShiftRemain ? (
                              <option value="">
                                No shift remains for the day
                              </option>
                            ) : (
                              <>
                                {currentShift ? (
                                  <option value="">Update Shift</option>
                                ) : (
                                  <option disabled value="">
                                    Select Shift
                                  </option>
                                )}
                              </>
                            )}

                            {shiftData?.map((shft) => {
                              const isShiftAssigned = filteredShift?.some(
                                (fs) => fs.date === date && fs.shift === shft.id
                              );

                              if (!isShiftAssigned || !filteredShift) {
                                return (
                                  <option key={shft.id} value={shft.id}>
                                    {`${shft.name} - 
                                    ${moment(shft.start_time, "HH:mm").format(
                                      "hh:mm A"
                                    )} :
                                    ${moment(shft.end_time, "HH:mm").format(
                                      "hh:mm A"
                                    )}`}
                                  </option>
                                );
                              }

                              return null; // Exclude the already assigned shift from the dropdown
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      {selectedScheduleEvent[selectedDayIndex]?.id && (
                        <button
                          onClick={handleRepeatShift}
                          className="btn btn-primary repeat-btn"
                          type="button"
                        >
                          Repeat
                        </button>
                      )}
                      <button
                        style={{
                          cursor: noShiftRemain ? "not-allowed" : "pointer",
                          opacity: noShiftRemain ? "0.5" : "1",
                        }}
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {noShiftRemain ? (
                          <>Disabled</>
                        ) : (
                          <>
                            {selectedScheduleEvent[selectedDayIndex]?.id
                              ? "Update"
                              : "Save"}
                          </>
                        )}
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
          dispatch={selectedScheduleEvent}
          modalTitle={"Schedule"}
          iDToDelete={id}
        />
      )}
      {repeatModal && (
        <RepeatModal
          dispatchSchedule={dispatchSchedule}
          event={event}
          date={date}
        />
      )}
    </>
  );
};

export default AddSchedule;
