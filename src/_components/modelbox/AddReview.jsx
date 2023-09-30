import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import "./style.css";
import { useDataFetching } from "../../utils/employeeCustomFetchHook";
import { isMobile } from "../../utils/mediaQuery";
const AddReview = ({ dispatchReviewDetails, indexToEdit, id }) => {

  const [selectedReviewInfo] = useGlobalState("selectedReviewInfo");
  const { data: allEmployee, isLoading } = useDataFetching();

  const [employee, setEmployee] = useState(
    selectedReviewInfo[indexToEdit]?.employee || ""
  );
  const [review_type, setReviewType] = useState(
    selectedReviewInfo[indexToEdit]?.review_type || ""
  );

  const [review_date, setReviewDate] = useState(
    selectedReviewInfo[indexToEdit]?.review_date || ""
  );

  const [description, setDescription] = useState(
    selectedReviewInfo[indexToEdit]?.description || ""
  );

  const [review_status, setReviewStatus] = useState(
    selectedReviewInfo[indexToEdit]?.review_status || ""
  );

  const [review_manager, setReviewManager] = useState(
    selectedReviewInfo[indexToEdit]?.review_manager || ""
  );

  const [review_file, setReviewFile] = useState(
    selectedReviewInfo[indexToEdit]?.review_file || ""
  );


  const [employeeError, setEmployeeError] = useState("");
  const [reviewTypeError, setReviewTypeError] = useState("");
  const [reviewDateError, setReviewDateError] = useState("");

  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate first name and last name
    if (employee === "") {
      setEmployeeError("Employee is required.");
      return;
    }
    if (review_type === "") {
      setReviewTypeError("Review Type is required.");
      return;
    }
    if (review_date === "") {
      setReviewDateError("Review Date is required.");
      return;
    }
    // Clear any existing error messages
    setEmployeeError("");
    setReviewTypeError("");
    setReviewDateError("");

    const review = {
      review_type: review_type,
      review_date: review_date,
      review_file: review_file,
      review_manager: review_manager,
      review_status: review_status,
      employee: employee,
      description: description,
      id: id,
    };

    Object.entries(review).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (selectedReviewInfo[indexToEdit]?.id) {
      dispatchReviewDetails({ type: "update", payload: { id, formData } });
    } else {
      dispatchReviewDetails({ type: "add", payload: formData });
    }
    setGlobalState("showAddReviewModal", false);
  };

  const handleEmployeeChange = (e) => {
    setEmployee(e.target.value);
    setEmployeeError("")
  }


  const handleReviewTypeChange = (event) => {
    setReviewType(event.target.value);
    setReviewTypeError("");
  };

  const handleReviewDateChange = (e) => {
    setReviewDate(e.target.value);
    setReviewDateError("");
  };

  const handleReviewFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size <= 5 * 1024 * 1024) {
      // 5MB in bytes
      setReviewFile(file);
    } else {
      alert(`File '${file.name}' is larger than 5MB`);
    }
  };



  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer top={ isMobile() && true} className="custom-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedReviewInfo[indexToEdit]?.id ? "Edit Review" : "Add Review"}
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
                          <label className="col-form-label">Employee</label>{" "}
                          <span className="text-danger">*</span>
                          <select
                            value={employee}
                            onChange={handleEmployeeChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Employee
                            </option>
                            {allEmployee?.map((employee) => (
                              <option key={employee.id} value={employee.id}>
                                {`${employee.first_name} ${employee.middle_name} ${employee.last_name}`}
                              </option>
                            ))}
                          </select>
                          {employeeError && <p className="error-message">{employeeError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Review Type <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control floating"
                            name="reviewManager"
                            placeholder="Review Type"
                            value={review_type}
                            type="text"
                            onChange={handleReviewTypeChange}
                          />
                          {reviewTypeError && <p className="error-message">{reviewTypeError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Review Date <span className="text-danger">*</span>
                          </label>
                          <input
                            value={review_date}
                            onChange={handleReviewDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Review Date"
                          />
                          {reviewDateError && <p className="error-message">{reviewDateError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Review Status</label>
                          <input
                            value={review_status}
                            onChange={(e) => setReviewStatus(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Review Status"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Review Manager</label>
                          <select
                            value={review_manager}
                            onChange={(e) => setReviewManager(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Manager
                            </option>
                            {allEmployee?.map((employee) => (
                              <option key={employee.id} value={employee.id}>
                                {`${employee.first_name} ${employee.middle_name} ${employee.last_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Review File</label>
                          <input
                            onChange={handleReviewFileChange}
                            className="form-control floating"
                            type="file"
                            accept=".pdf,.docx,.xls,.png, .jpg, .txt, .webp, .xlsx"
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
                            style={{ height: "120px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button onClick={handleSubmit} className="btn btn-primary submit-btn">
                        {selectedReviewInfo[indexToEdit]?.id ? "Update" : "Save"}
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
