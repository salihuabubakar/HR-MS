import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import {
  initUserAccount,
  savedUserAccountReducer,
} from "../../utils/localStorage";
import Select from "react-select";
import { RadioBtn } from "./styles";
import { v4 as uuidv4 } from "uuid";
import "./style.css";

const AddReview = ({ dispatchReviewDetails, indexToEdit }) => {
  const [selectedReviewInfo] = useGlobalState("selectedReviewInfo");
  const uniqueId = uuidv4();

  const [userAcct] = useReducer(savedUserAccountReducer, [], initUserAccount);
  const [employeeAccts, setEmployeeAccts] = useState();
  useEffect(() => {
    setEmployeeAccts(userAcct);
  }, [userAcct]);


  const [employee, setEmployee] = useState(
    selectedReviewInfo[indexToEdit]?.employee
      ? selectedReviewInfo[indexToEdit]?.employee
      : ""
  );
  const [reviewType, setReviewType] = useState(
    selectedReviewInfo[indexToEdit]?.reviewType
      ? selectedReviewInfo[indexToEdit]?.reviewType
      : ""
  );

  const [reviewDate, setReviewDate] = useState(
    selectedReviewInfo[indexToEdit]?.reviewDate
      ? selectedReviewInfo[indexToEdit]?.reviewDate
      : ""
  );

  const [description, setDescription] = useState(
    selectedReviewInfo[indexToEdit]?.description
      ? selectedReviewInfo[indexToEdit]?.description
      : ""
  );

  const [reviewStatus, setReviewStatus] = useState(
    selectedReviewInfo[indexToEdit]?.reviewStatus
      ? selectedReviewInfo[indexToEdit]?.reviewStatus
      : ""
  );

  const [reviewManager, setReviewManager] = useState(
    selectedReviewInfo[indexToEdit]?.reviewManager
      ? selectedReviewInfo[indexToEdit]?.reviewManager
      : ""
  );

  const [reviewFile, setReviewFile] = useState(
    selectedReviewInfo[indexToEdit]?.reviewFile
      ? selectedReviewInfo[indexToEdit]?.reviewFile
      : ""
  );

  const [id] = useState(
    selectedReviewInfo[indexToEdit]?.id
      ? selectedReviewInfo[indexToEdit]?.id
      : uniqueId
  );

  const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const now = today.toLocaleDateString("en-GB", options);

  const [dateCreated] = useState(
    selectedReviewInfo[indexToEdit]?.dateCreated
      ? selectedReviewInfo[indexToEdit]?.dateCreated
      : now
  );

  const reviewTypeOptions = [
    { value: 1, label: "not-started" },
    { value: 2, label: "started" },
    { value: 3, label: "middle" },
    { value: 4, label: "rounding-up" },
    { value: 5, label: "completed" },
  ];

  const reviewStatusOptions = [
    { value: 1, label: "not-started" },
    { value: 2, label: "started" },
    { value: 3, label: "middle" },
    { value: 4, label: "rounding-up" },
    { value: 5, label: "completed" },
  ];

  const [employeeError, setEmployeeError] = useState("");
  const [reviewTypeError, setReviewTypeError] = useState("");
  const [reviewDateError, setReviewDateError] = useState("");
  const [reviewStatusError, setReviewStatusError] = useState("");
  const [reviewManagerError, setReviewManagerError] = useState("");
  const [reviewFileError, setReviewFileError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate first name and last name
    if (employee === "") {
      setEmployeeError("Employee is required.");
      return;
    }
    if (reviewType === "") {
      setReviewTypeError("Review Type is required.");
      return;
    }
    if (reviewDate === "") {
      setReviewDateError("Review Date is required.");
      return;
    }
    if (reviewStatus === "") {
      setReviewStatusError("Review Status is required.");
      return;
    }
    if (reviewManager === "") {
      setReviewManagerError("Review Manager is required.");
      return;
    }
    if (!reviewFile) {
      setReviewFileError("Review File is required.");
      return;
    }
    if (description === "") {
      setDescriptionError("Description is required.");
      return;
    }

    // Clear any existing error messages
    setEmployeeError("");
    setReviewTypeError("");
    setReviewDateError("");
    setReviewStatusError("");
    setReviewManagerError("");
    setReviewFileError("");
    setDescriptionError("");

    

    const task = {
      reviewType,
      reviewDate,
      reviewFile,
      reviewManager,
      reviewStatus,
      employee,
      description,
      dateCreated,
      id,
    };
    if (selectedReviewInfo[indexToEdit]?.id) {
      dispatchReviewDetails({ type: "update", payload: task });
    } else {
      dispatchReviewDetails({ type: "push", payload: task });
    }
    setGlobalState("showAddReviewModal", false);
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

  const handleEmployeeChange = (event) => {
    setEmployee(event);
    setEmployeeError("");
  };

  const users = [];
  employeeAccts?.map((user) => {
    users.push({
      value: user.id,
      label: user.firstName + " " + user.lastName,
      image: user.photo,
      role: user.role,
    });
  });


  const handleReviewTypeChange = (event) => {
    setReviewType(event);
    setReviewTypeError("");
  };

  const handleReviewDateChange = (event) => {
    setReviewDate(event.target.value);
    setReviewDateError("");
  };

  const handleReviewStatusChange = (event) => {
    setReviewStatus(event);
    setReviewStatusError("");
  };

  const handleReviewManagerChange = (event) => {
    setReviewManager(event.target.value);
    setReviewManagerError("");
  };

  const handleReviewFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64File = reader.result;
      const fileName = file.name;
      setReviewFile({fileName ,base64File});
    };
    setReviewFileError("");
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setDescriptionError("");
  };


  const getEmployeeDefaultValues = (employeeData) => {
    if (Array.isArray(employeeData)) {
      return employeeData.map((employee) => ({
        value: employee.value,
        label: employee.label,
        image: employee.photo,
        role: employee.role,
      }));
    }
    return [];
  };

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer top={true} className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedReviewInfo[indexToEdit]?.id
                      ? "Edit Review"
                      : "Add Review"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showAddReviewModal", false)}
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
                            Select Employees{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={getEmployeeDefaultValues(
                              selectedReviewInfo[indexToEdit]?.employee
                            )}
                            onChange={handleEmployeeChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={users}
                            styles={customSelectStyles}
                            placeholder="Select Employees"
                          />
                          {employeeError && (
                            <p className="error-message">{employeeError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Review Type <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={
                              selectedReviewInfo
                                ? {
                                    value: reviewType?.value,
                                    label: reviewType?.label,
                                  }
                                : "Select Type"
                            }
                            onChange={handleReviewTypeChange}
                            options={reviewTypeOptions}
                            styles={customSelectStyles}
                            placeholder="Select Type"
                          />
                          {reviewTypeError && (
                            <p className="error-message">{reviewTypeError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Review Date <span className="text-danger">*</span>
                          </label>
                          <input
                            value={reviewDate}
                            onChange={handleReviewDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Review Date"
                          />
                          {reviewDateError && (
                            <p className="error-message">{reviewDateError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Review Status <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={
                              selectedReviewInfo
                                ? {
                                    value: reviewStatus?.value,
                                    label: reviewStatus?.label,
                                  }
                                : "Select Status"
                            }
                            onChange={handleReviewStatusChange}
                            options={reviewStatusOptions}
                            styles={customSelectStyles}
                            placeholder="Select Status"
                          />
                          {reviewStatusError && (
                            <p className="error-message">{reviewStatusError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Review Manager{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control floating"
                            name="reviewManager"
                            placeholder="Review Manager"
                            value={reviewManager}
                            type="text"
                            onChange={handleReviewManagerChange}
                          />
                          {reviewManagerError && (
                            <p className="error-message">
                              {reviewManagerError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Review File <span className="text-danger">*</span>
                          </label>
                          <input
                            onChange={handleReviewFileChange}
                            className="form-control floating"
                            type="file"
                            accept=".pdf,.docx,.xls"
                          />
                          {reviewFileError && (
                            <p className="error-message">{reviewFileError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">
                            Description <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                            style={{ height: "120px" }}
                          />
                          {descriptionError && (
                            <p className="error-message">{descriptionError}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {selectedReviewInfo[indexToEdit]?.id
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

export default AddReview;
