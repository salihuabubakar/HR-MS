import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddEmployeeQualification = ({
  employeeQualificationIndexToEdit,
  id,
  dispatchEmployeeQualification,
  employee,
}) => {
  const [selectedEmployeeQualification] = useGlobalState(
    "selectedEmployeeQualification"
  );

  const [qualification_name, setQualificationName] = useState(
    selectedEmployeeQualification[employeeQualificationIndexToEdit]
      ?.qualification_name || ""
  );

  const [institute_name, setInstituteName] = useState(
    selectedEmployeeQualification[employeeQualificationIndexToEdit]
      ?.institute_name || ""
  );

  const [start_date, setStartDate] = useState(
    selectedEmployeeQualification[employeeQualificationIndexToEdit]
      ?.start_date || ""
  );

  const [end_date, setEndDate] = useState(
    selectedEmployeeQualification[employeeQualificationIndexToEdit]?.end_date ||
      ""
  );

  const [qualification_upload, setQualificationUpload] = useState(
    selectedEmployeeQualification[employeeQualificationIndexToEdit]
      ?.qualification_upload || ""
  );

  const [description, setDescription] = useState(
    selectedEmployeeQualification[employeeQualificationIndexToEdit]
      ?.description || ""
  );

  const [qualificationNameError, setQualificationNameError] = useState("");
  const [instituteNameError, setInstituteNameError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (qualification_name === "") {
      setQualificationNameError("Qualification name is required.");
      return;
    }
    if (institute_name === "") {
      setInstituteNameError("Institute Name is required.");
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

    setQualificationNameError("");
    setInstituteNameError("");
    setStartDateError("");
    setEndDateError("");

    const qualifications = {
      id: id,
      employee: employee,
      qualification_name: qualification_name,
      institute_name: institute_name,
      start_date: start_date,
      end_date: end_date,
      qualification_upload: qualification_upload,
      description: description,
    };

    Object.entries(qualifications).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (selectedEmployeeQualification[employeeQualificationIndexToEdit]?.id) {
      dispatchEmployeeQualification({
        type: "update",
        payload: { id, formData },
      });
    } else {
      dispatchEmployeeQualification({ type: "add", payload: formData });
    }
    setGlobalState("showEmployeeQualificationModal", false);
  };

  const handleQualificationNameChange = (e) => {
    setQualificationName(e.target.value);
    setQualificationNameError("");
  };

  const handleInsttituteNameChange = (e) => {
    setInstituteName(e.target.value);
    setInstituteNameError("");
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setStartDateError("");
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setEndDateError("");
  };
  

  //  const handleFileDrop = (acceptedFiles) => {
  //    const file = acceptedFiles[0];

  //    if (file.size <= 5 * 1024 * 1024) {
  //      // 5MB in bytes
  //      setQualificationUpload(file);
  //    } else {
  //      alert(`File '${file.name}' is larger than 5MB`);
  //    }
  //  };

  // const handleFileRemove = () => {
  //   setQualificationUpload("");
  // };

   const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.size <= 5 * 1024 * 1024) {
      // 5MB in bytes
      setQualificationUpload(file);
    } else {
      alert(`File '${file.name}' is larger than 5MB`);
    }
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
                    {selectedEmployeeQualification[
                      employeeQualificationIndexToEdit
                    ]?.id
                      ? "Edit Qualification"
                      : "Add Qualification"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showEmployeeQualificationModal", false)
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
                          <label className="label">
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
                          <label className="label">
                            Institute Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={institute_name}
                            onChange={handleInsttituteNameChange}
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
                          <label className="label">
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
                          <label className="label">
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
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Qualification File Upload
                          </label>
                          <input
                            onChange={handleFileUpload}
                            className="form-control floating"
                            type="file"
                            accept=".png, .jpg, .pdf, .doc, .docx, .xls, .xlsx, .txt, .webp"
                            placeholder="Qualification File Upload"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Description</label>
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
                      {/* <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            Qualification File Upload
                          </label>
                          <div>
                            <Dropzone onDrop={handleFileDrop} multiple={false}>
                              {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} className="dropzone">
                                  <input {...getInputProps()} />
                                  <p>
                                    Drag and drop an image or PDF file here, or
                                    click to select a file.
                                  </p>
                                </div>
                              )}
                            </Dropzone>
                            {qualification_upload && (
                              <div className="file-preview">
                                <div className="file-info">
                                  {qualification_upload.type &&
                                  qualification_upload.type.startsWith(
                                    "image/"
                                  ) ? (
                                    <img
                                      className="img-preview"
                                      src={URL.createObjectURL(
                                        qualification_upload
                                      )}
                                      alt="Preview"
                                    />
                                  ) : (
                                    <div className="file-type">
                                      <span className="files-icon">
                                        <i className="fa fa-file-pdf-o" />
                                      </span>
                                    </div>
                                  )}
                                  <div className="files-info">
                                    <span className="file-name text-ellipsis">
                                      <a
                                        href="#"
                                        onClick={(event) =>
                                          event.preventDefault()
                                        }
                                      >
                                        {qualification_upload.name}
                                      </a>
                                    </span>
                                    <button
                                      className="removeBtn"
                                      onClick={handleFileRemove}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedEmployeeQualification[
                          employeeQualificationIndexToEdit
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

export default AddEmployeeQualification;
