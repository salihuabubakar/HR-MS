import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddResidentAppointmentModal = ({
  residentAppointmentIndexToEdit,
  id,
  dispatchResidentAppointment,
  resident,
  handleDeleteResidentAppointment
}) => {


  const [selectedResidentAppointment] = useGlobalState(
    "selectedResidentAppointment"
  );

  const [appointment_name, setAppointmentName] = useState(
    selectedResidentAppointment[residentAppointmentIndexToEdit]
      ?.appointment_name || ""
  );

  const [appointment_date, setAppointmentDate] = useState(
    selectedResidentAppointment[residentAppointmentIndexToEdit]
      ?.appointment_date || ""
  );

  const [appointment_time, setAppointmentTime] = useState(
    selectedResidentAppointment[residentAppointmentIndexToEdit]
      ?.appointment_time || ""
  );

  const [appointment_description, setAppointmentDescription] = useState(
    selectedResidentAppointment[residentAppointmentIndexToEdit]
      ?.appointment_description || ""
  );


  const [appointmentDateError, setAppointmentDateError] = useState("");
  const [appointmentTimeError, setAppointmentTimeError] = useState("");
  const [nameError, setNameError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (appointment_name === "") {
      setNameError("Appointment Name is required");
      return;
    }
    if (appointment_time === "") {
      setAppointmentTimeError("Time is required");
      return;
    }
    if (appointment_date === "") {
      setAppointmentDateError("Date is required");
      return;
    }

    setNameError("");    
    setAppointmentTimeError("");
    setAppointmentDateError("");

    const appObj = {
      id,
      resident,
      appointment_name,
      appointment_date,
      appointment_time,
      appointment_description,
    };


    if (
      selectedResidentAppointment[residentAppointmentIndexToEdit]?.id
    ) {
      dispatchResidentAppointment({
        type: "update",
        payload: appObj,
      });
    } else {
      dispatchResidentAppointment({ type: "add", payload: appObj });
    }
    setGlobalState("showResidentAppointmentModal", false);
  };

  const handleDeleteEvent = () => {
    handleDeleteResidentAppointment(id);
    setGlobalState("showResidentAppointmentModal", false);
  };

  const handleNameChange = (e) => {
    setAppointmentName(e.target.value);
    setNameError("");
  };

  const handleDateChange = (e) => {
    setAppointmentDate(e.target.value);
    setAppointmentDateError("");
  };

  const handleTimeChange = (e) => {
    setAppointmentTime(e.target.value);
    setAppointmentTimeError("");
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
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedResidentAppointment[residentAppointmentIndexToEdit]
                      ?.id
                      ? "Edit Resident Appointment"
                      : "Add Resident Appointment"}
                  </h5>
                  {selectedResidentAppointment[residentAppointmentIndexToEdit]?.id && (
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
                    onClick={() =>
                      setGlobalState("showResidentAppointmentModal", false)
                    }
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Appointment Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={appointment_name}
                            onChange={handleNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Appointment Name"
                          />
                          {nameError && (
                            <p className="error-message">
                              {nameError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Appointment Time{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={appointment_time}
                            onChange={handleTimeChange}
                            className="form-control floating"
                            type="time"
                            placeholder="Appointment Time"
                          />
                          {appointmentTimeError && (
                            <p className="error-message">
                              {appointmentTimeError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Appointment Date{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={appointment_date}
                            onChange={handleDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Appointment Date"
                          />
                          {appointmentDateError && (
                            <p className="error-message">
                              {appointmentDateError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Description</label>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="Description"
                            value={appointment_description}
                            onChange={(e) =>
                              setAppointmentDescription(e.target.value)
                            }
                            style={{ height: "70px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedResidentAppointment[
                          residentAppointmentIndexToEdit
                        ]?.id
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
    </>
  );
};

export default AddResidentAppointmentModal;
