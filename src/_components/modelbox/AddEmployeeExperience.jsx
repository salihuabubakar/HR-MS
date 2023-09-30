import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { isMobile } from "../../utils/mediaQuery";

const AddEmployeeExperience = ({
  employeeExperienceIndexToEdit,
  id,
  dispatchEmployeeExperience,
  employee,
}) => {
  const [selectedEmployeeExperience] = useGlobalState(
    "selectedEmployeeExperience"
  );

  const [job_title, setJobTitle] = useState(
    selectedEmployeeExperience[employeeExperienceIndexToEdit]?.job_title || ""
  );

  const [company_name, setCompanyName] = useState(
    selectedEmployeeExperience[employeeExperienceIndexToEdit]?.company_name ||
      ""
  );

  const [start_date, setStartDate] = useState(
    selectedEmployeeExperience[employeeExperienceIndexToEdit]
      ?.start_date || ""
  );

  const [end_date, setEndDate] = useState(
    selectedEmployeeExperience[employeeExperienceIndexToEdit]?.end_date ||
      ""
  );

  const [experience_upload, setExperienceUpload] = useState(
    selectedEmployeeExperience[employeeExperienceIndexToEdit]
      ?.experience_upload || ""
  );

  const [description, setDescription] = useState(
    selectedEmployeeExperience[employeeExperienceIndexToEdit]
      ?.description || ""
  );

  const [jobTitleError, setJobTitleError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (job_title === "") {
      setJobTitleError("Job title is required.");
      return;
    }
    if (company_name === "") {
      setCompanyNameError("Company Name is required.");
      return;
    }
    if (start_date === "") {
      setStartDateError("Start Date is required.");
      return;
    }
    if (end_date === "") {
      setEndDateError("End Date is required.");
      return;
    }

    setJobTitleError("");
    setCompanyNameError("");
    setStartDateError("");
    setEndDateError("");

    const experience = {
      id: id,
      employee: employee,
      job_title: job_title,
      company_name: company_name,
      start_date: start_date,
      end_date: end_date,
      experience_upload: experience_upload,
      description: description,
    };

    Object.entries(experience).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (selectedEmployeeExperience[employeeExperienceIndexToEdit]?.id) {
      dispatchEmployeeExperience({
        type: "update",
        payload: { id, formData },
      });
    } else {
      dispatchEmployeeExperience({ type: "add", payload: formData });
    }
    setGlobalState("showEmployeeExperienceModal", false);
  };

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
    setJobTitleError("");
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
    setCompanyNameError("");
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setStartDateError("");
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setEndDateError("");
  };

   const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.size <= 5 * 1024 * 1024) {
      // 5MB in bytes
      setExperienceUpload(file);
    } else {
      alert(`File '${file.name}' is larger than 5MB`);
    }
   }

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer top={ isMobile() && true } className="custom-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedEmployeeExperience[employeeExperienceIndexToEdit]?.id
                      ? "Edit Experience"
                      : "Add Experience"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showEmployeeExperienceModal", false)}
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
                            Job Title <span className="text-danger">*</span>
                          </label>
                          <input
                            value={job_title}
                            onChange={handleJobTitleChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Job Title"
                          />
                          {jobTitleError && <p className="error-message">{jobTitleError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Company Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={company_name}
                            onChange={handleCompanyNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Company Name"
                          />
                          {companyNameError && <p className="error-message">{companyNameError}</p>}
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
                          {startDateError && <p className="error-message">{startDateError}</p>}
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
                          {endDateError && <p className="error-message">{endDateError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Experience File Upload</label>
                          <input
                            onChange={handleFileUpload}
                            className="form-control floating"
                            type="file"
                            accept=".pdf, .doc, .docx, .txt, .xls, .xlsx, .csv, .png, .jpeg, .webp, .PNG, .JPEG,"
                            placeholder="Experience File Upload"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">Description</label>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ height: "70px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button type="submit" className="btn btn-primary submit-btn">
                        {selectedEmployeeExperience[employeeExperienceIndexToEdit]?.id
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

export default AddEmployeeExperience;
