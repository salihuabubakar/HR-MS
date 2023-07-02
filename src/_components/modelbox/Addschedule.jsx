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
  

  const [selectedScheduleEvent] = useGlobalState("selectedScheduleEvent");
  const [deleteModal] = useGlobalState("deleteModal");
  const [repeatModal] = useGlobalState("repeatModal");

  const [shift, setShift] = useState(
    selectedScheduleEvent[selectedDayIndex]?.shift || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const scheduleE = {
      id,
      shift,
      employee,
      date,
      house,
    };
    if (selectedScheduleEvent[selectedDayIndex]?.id) {
      dispatchSchedule({ type: "update", payload: scheduleE });
      toast.success("Shift Schedule Updated", {
        autoClose: 1500,
      });
    } else {
      dispatchSchedule({ type: "add", payload: scheduleE });
      toast.success("Shift Schedule Added", {
        autoClose: 1500,
      });
    }
    setGlobalState("showAddSchedul", false);
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
    toast.warn("Can't submit empty form", {
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
                          <label className="col-form-label">Select Shift</label>
                          <select
                            value={shift}
                            onChange={handleShiftChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Shift
                            </option>
                            {shiftData?.map((shft) => (
                              <option key={shft.id} value={shft.id}>
                                {`${shft.name} - ${moment(
                                  shft.start_time,
                                  "HH:mm"
                                ).format("hh:mm A")} : ${moment(
                                  shft.end_time,
                                  "HH:mm"
                                ).format("hh:mm A")}`}
                              </option>
                            ))}
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
                      <button className="btn btn-primary submit-btn">
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
          dispatch={selectedScheduleEvent}
          modalTitle={"Schedule"}
          iDToDelete={id}
        />
      )}
      {repeatModal && (
        <RepeatModal dispatchSchedule={dispatchSchedule} event={event} />
      )}
    </>
  );
};

export default AddSchedule;
