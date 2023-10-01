import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import "./style.css";
import { isMobile } from "../../utils/mediaQuery";

const AddShift = ({
  dispatchShift,
  indexToEdit,
  id
}) => {
  let dynamic = "";
  const [selectedShift] = useGlobalState("selectedShift");

  const [name, setName] = useState(selectedShift[indexToEdit]?.name || "");
  const [start_time, setStartTime] = useState(
    selectedShift[indexToEdit]?.start_time || ""
  );
  const [end_time, setEndTime] = useState(
    selectedShift[indexToEdit]?.end_time || ""
  );
  const [hours, setHours] = useState(selectedShift[indexToEdit]?.hours || 0);
  const [status, setSatus] = useState(selectedShift[indexToEdit]?.status || "");

  const [nameError, setNameError] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const [hoursError, setHoursError] = useState("");
  const [statusError, setStatusError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate first name and last name
    if (name === "") {
      setNameError("Shift name is required.");
      return;
    }
    if (start_time === "") {
      setStartTimeError("Start Time is required.");
      return;
    }
    if (end_time === "") {
      setEndTimeError("End Time is required.");
      return;
    }
    if (hours === "") {
      setHoursError("Hours is required.");
      return;
    }
    if (status === "") {
      setStatusError("Status is required.");
      return;
    }

    // Clear any existing error messages
    setNameError("");
    setStartTimeError("");
    setEndTimeError("");
    setHoursError("");
    setStatusError("");

    const shiftList = {
      id,
      name,
      start_time,
      end_time,
      hours,
      status
    };
    if (selectedShift[indexToEdit]?.id) {
      dispatchShift({ type: "update", payload: shiftList });
    } else {
      dispatchShift({ type: "add", payload: shiftList });
    }
    setGlobalState("showShiftModal", false);
  };


  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError("");
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    calculateDifference(e.target.value, end_time);
    setStartTimeError("");
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    calculateDifference(start_time, e.target.value);
    setEndTimeError("");
  };

  const handleStatusChange = (event) => {
    setSatus(event.target.value);
    setStatusError("");
  };

  const calculateDifference = (startTime, endTime) => {
    if (startTime && endTime) {
      const startSplit = startTime.split(":");
      const endSplit = endTime.split(":");
      const startDate = new Date(0, 0, 0, parseInt(startSplit[0]), parseInt(startSplit[1]), 0);
      const endDate = new Date(0, 0, 0, parseInt(endSplit[0]), parseInt(endSplit[1]), 0);
      const diff = endDate.getTime() - startDate.getTime();
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const timeDifference = `${hours < 9 ? "0" : ""}${hours}:${
        minutes < 9 ? "0" : ""
      }${minutes}`;
      setHours(parseInt(timeDifference));
      setHoursError("");
    } else {
      setHours(0);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setStartTime("");
    setEndTime("");
    setHours(0);
  };



  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer  className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedShift[indexToEdit]?.id
                      ? "Edit Shift"
                      : "Add shift"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showShiftModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control floating"
                            placeholder="Name"
                            value={name}
                            onChange={handleNameChange}
                          />
                          {nameError && (
                            <p className="error-message">{nameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Start Time <span className="text-danger">*</span>
                          </label>
                          <input
                            type="time"
                            className="form-control floating"
                            placeholder="Start Time"
                            value={start_time}
                            onChange={handleStartTimeChange}
                          />
                          {startTimeError && (
                            <p className="error-message">{startTimeError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            End Time <span className="text-danger">*</span>
                          </label>
                          <input
                            type="time"
                            className="form-control floating"
                            placeholder="End Time"
                            value={end_time}
                            onChange={handleEndTimeChange}
                          />
                          {endTimeError && (
                            <p className="error-message">{endTimeError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Hours <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control floating"
                            placeholder="Hours"
                            disabled
                            value={hours}
                          />
                          {hoursError && (
                            <p className="error-message">{hoursError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Status</label>{" "}
                          <span className="text-danger">*</span>
                          <select
                            value={status}
                            onChange={handleStatusChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Status
                            </option>
                            <option value={"Active"}>Active</option>
                            <option value={"Inactive"}>Inactive</option>
                          </select>
                          {statusError && (
                            <p className="error-message">{statusError}</p>
                          )}
                        </div>
                      </div>

                      {hours === 0 ? null : (
                        <div className="col-sm-6">
                          <div className="form-group">
                            <button onClick={handleClear}>Clear Time</button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {selectedShift[indexToEdit]?.id ? "Update" : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </PopupContainer>
        </PopupOverlay>
      </PopupWrapper>
    </>
  );
};

export default AddShift;
