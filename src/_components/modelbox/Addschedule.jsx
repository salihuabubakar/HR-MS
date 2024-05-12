import React, { useState, useEffect } from "react";
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
  selectedDay,
  selectedDayIndex,
  shiftData,
  houseId: house,
  event,
  shiftScheduleId: id
}) => {

  let date = moment(selectedDay, "ddd DD MMM YYYY").format("YYYY-MM-DD");

  const { employeeshiftData } = useEmployeeShiftFetching();
  const [selectedScheduleEvent] = useGlobalState("selectedScheduleEvent");
  const [deleteModal] = useGlobalState("deleteModal");
  const [repeatModal] = useGlobalState("repeatModal");
  const [showAddSchedul] = useGlobalState("showAddSchedul");
  
  let filteredShift;
  /* The code is filtering the `employeeshiftData` array to only include the shifts that have a `house`
  value equal to the `house` variable. It uses the `filter` method to iterate over each element in
  the `employeeshiftData` array and checks if the `house` value of the element matches the `house`
  variable. If it does, the element is included in the filtered array. */
  const filterEmployeeShift = employeeshiftData?.filter((s) => {
    if (s.house === house) return s;
  });

  /* The code is checking if the `filterEmployeeShift` variable is truthy (i.e., not null or
  undefined). If it is truthy, it means that there are shifts available for the selected employee
  and house on the selected day. */
  if (filterEmployeeShift) {
    filteredShift = filterEmployeeShift?.map((sh) => {
      return sh;
    });
  }

  const currentShift = selectedScheduleEvent[selectedDayIndex]?.shift;
  
  const findCurrentShift = shiftData?.find(shift => shift.id === currentShift);

  /* The code is checking if there are any shifts remaining for the selected day. It does this by
  checking if there is any shift in the `shiftData` array that is not assigned to the employee on
  the selected day. If there are no shifts remaining, `noShiftRemain` will be `true`, otherwise it
  will be `false`. */
  const noShiftRemain = !shiftData?.some(
    (shft) =>
      !filteredShift?.some((fs) => fs.date === selectedDay && fs.shift === shft.id)
  );


  const [shift, setShift] = useState(
    selectedScheduleEvent[selectedDayIndex]?.shift || ""
  );

  /**
   * The handleSubmit function is used to handle form submission and add or update a schedule event
   * based on the selected date.
   * @returns If the condition `if (noShiftRemain)` is true, then nothing is being returned. Otherwise,
   * if the condition `if (selected >= currentDate)` is true, then code get executed.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (noShiftRemain) return;

    const currentDate = new Date();
    const selected = new Date(selectedDay);
    currentDate.setHours(0, 0, 0, 0);// This is to set the currentTime to match the selected time as the time difference do alter the expected operattion.

    if (selected >= currentDate) {
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
      return null;
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

  const [isDarkMode] = useGlobalState("isDarkMode");

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer isDarkMode={isDarkMode} className="custom-modal" role="dialog">
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
                      title="Delete schedule"
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
                  <form onSubmit={handleSubmit}>
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
                              /* The code is checking if a shift is already assigned to an employee on
                              the selected day. */
                              const isShiftAssigned = filteredShift?.some(
                                (fs) => fs.date === selectedDay && fs.shift === shft.id
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
                          style={{backgroundColor: "#FF9B44"}}
                          onClick={handleRepeatShift}
                          className="btn btn-primary"
                          type="button"
                        >
                          Copy shift
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
          date={selectedDay}
          employeeId={employee}
          houseId={house}
        />
      )}
    </>
  );
};

export default AddSchedule;
