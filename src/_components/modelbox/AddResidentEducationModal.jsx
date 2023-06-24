import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { toast } from "react-toastify";

const AddResidentEducationModal = ({
  residentEducationIndexToEdit,
  id,
  dispatchResidentEducation,
  resident,
}) => {

  const [selectedResidentEducation] = useGlobalState(
    "selectedResidentEducation"
  );


  const [qualification_name, setQualificationName] = useState(
    selectedResidentEducation[residentEducationIndexToEdit]
      ?.qualification_name || ""
  );

  const [institute_name, setInstituteName] = useState(
    selectedResidentEducation[residentEducationIndexToEdit]?.institute_name ||
      ""
  );

  const [start_date, setStartDate] = useState(
    selectedResidentEducation[residentEducationIndexToEdit]?.start_date || ""
  );

  const [end_date, setEndDate] = useState(
    selectedResidentEducation[residentEducationIndexToEdit]?.end_date || ""
  );

  const [qualificationNameError, setQualificationNameError] = useState("");
  const [instituteNameError, setInstituteNameError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(qualification_name === "") {
      setQualificationNameError("Qualification name is required");
      return;
    }
    if(institute_name === "") {
      setInstituteNameError("Institute name is required");
      return;
    }
    if(start_date === "") {
      setStartDateError("Start date is required");
      return;
    }
    if(end_date === "") {
      setEndDateError("End date is required");
      return;
    }

    setQualificationNameError("");
    setInstituteNameError("");
    setStartDateError("");
    setEndDateError("");

    const educationObj = {
      id,
      resident,
      qualification_name,
      institute_name,
      start_date,
      end_date
    };
    

    if (selectedResidentEducation[residentEducationIndexToEdit]?.id) {
      dispatchResidentEducation({
        type: "update",
        payload: educationObj,
      });
      toast.success("Resident Education Updated", {
        autoClose: 1500,
      });
    } else {
      dispatchResidentEducation({ type: "add", payload: educationObj });
      toast.success("Resident Education Updated", {
        autoClose: 1500,
      });
    }
    setGlobalState("showResidentEducationModal", false);
  };

  const handleQualificationNameChange = (e) => {
    setQualificationName(e.target.value);
    setQualificationNameError("");
  }
  const handleInstituteNameChange = (e) => {
    setInstituteName(e.target.value);
    setInstituteNameError("");
  }
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setStartDateError("");
  }
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setEndDateError("");
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
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedResidentEducation[residentEducationIndexToEdit]?.id
                      ? "Edit Resident Education"
                      : "Add Resident Education"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showResidentEducationModal", false)
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
                            Qualification Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={qualification_name}
                            onChange={handleQualificationNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Qualification Name"
                          />
                          {qualificationNameError && (
                            <p className="error-message">
                              {qualificationNameError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Institute Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={institute_name}
                            onChange={handleInstituteNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Institute Name"
                          />
                          {instituteNameError && (
                            <p className="error-message">
                              {instituteNameError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Start Date <span className="text-danger">*</span>
                          </label>
                          <input
                            value={start_date}
                            onChange={handleStartDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Start Date"
                          />
                          {startDateError && (
                            <p className="error-message">{startDateError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            End Date <span className="text-danger">*</span>
                          </label>
                          <input
                            value={end_date}
                            onChange={handleEndDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="End Date"
                          />
                          {endDateError && (
                            <p className="error-message">{endDateError}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedResidentEducation[residentEducationIndexToEdit]
                          ?.id
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

export default AddResidentEducationModal;
