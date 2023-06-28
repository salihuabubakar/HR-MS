import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { toast } from "react-toastify";
import "./style.css";

const AddShift = ({
  dispatchShift,
  indexToEdit,
  id
}) => {
  const [selectedShift] = useGlobalState("selectedShift");

  const [name, setName] = useState(selectedShift[indexToEdit]?.name || "");
  const [start_time, setStartTime] = useState(
    selectedShift[indexToEdit]?.start_time || ""
  );
  const [end_time, setEndTime] = useState(
    selectedShift[indexToEdit]?.end_time || ""
  );
  const [hours, setHours] = useState(selectedShift[indexToEdit]?.hours || "");
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
      toast.success("Shift Updated", {
        autoClose: 1500,
      });
    } else {
      dispatchShift({ type: "add", payload: shiftList });
      toast.success("Shift Added", {
        autoClose: 1500,
      });
    }
    setGlobalState("showShiftModal", false);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    setStartTimeError("");
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    setEndTimeError("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError("");
  };

  const handleHoursChange = (event) => {
    setHours(event.target.value);
    setHoursError("");
  };

  const handleStatusChange = (event) => {
    setSatus(event.target.value);
    setStatusError("");
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
                            type="number"
                            className="form-control floating"
                            placeholder="Hours"
                            min={0}
                            value={hours}
                            onChange={handleHoursChange}
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
