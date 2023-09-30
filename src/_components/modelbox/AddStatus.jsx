import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useDataFetching } from "../../utils/employeeCustomFetchHook";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { isMobile } from "../../utils/mediaQuery";

const AddStatus = ({
  indexToEdit,
  id,
  dispatchStatus,
}) => {
  const { data: allEmployee, isLoading } = useDataFetching();
  const [selectedStatus] = useGlobalState("selectedStatus");

  const [employee, setEmployee] = useState(
    selectedStatus[indexToEdit]?.employee || ""
  );

  const [status, setStatus] = useState(
    selectedStatus[indexToEdit]?.status || ""
  );

  const [authorising_manager, setAuthorisingManager] = useState(
    selectedStatus[indexToEdit]?.authorising_manager || ""
  );

  const [comments, setComment] = useState(
    selectedStatus[indexToEdit]?.comments || ""
  );

  const [start_date, setStartDate] = useState(
    selectedStatus[indexToEdit]?.start_date || ""
  );

  const [end_date, setEndDate] = useState(
    selectedStatus[indexToEdit]?.end_date || ""
  );

  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (start_date === "") {
      setStartDateError("Start Date is required.");
      return;
    }
    if (end_date === "") {
      setEndDateError("End Date is required.");
      return;
    }

    setStartDateError("");
    setEndDateError("");


    const statusObject = {
      id: id,
      employee,
      status,
      authorising_manager,
      comments,
      start_date,
      end_date,
    };


    if (selectedStatus[indexToEdit]?.id) {
      dispatchStatus({
        type: "update",
        payload: statusObject,
      });
    } else {
      dispatchStatus({ type: "add", payload: statusObject });
    }
    setGlobalState("showStatusModal", false);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setStartDateError("");
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setEndDateError("");
  };

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer top={ isMobile() && true } className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedStatus[indexToEdit]?.id
                      ? "Edit Status"
                      : "Add Status"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showStatusModal", false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Employee</label>
                          <select
                            value={employee}
                            onChange={(e) => setEmployee(e.target.value)}
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
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Status</label>
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Status
                            </option>
                            <option value={1}>Active</option>
                            <option value={2}>Inactive</option>
                            <option value={3}>Suspended</option>
                            <option value={4}>Retired</option>
                            <option value={5}>Terminated</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Start Date</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={start_date}
                            onChange={handleStartDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Date"
                          />
                          {startDateError && (
                            <p className="error-message">{startDateError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">End Date</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={end_date}
                            onChange={handleEndDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Date"
                          />
                          {endDateError && (
                            <p className="error-message">{endDateError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            Authorising Manager
                          </label>
                          <input
                            value={authorising_manager}
                            onChange={(e) =>
                              setAuthorisingManager(e.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Authorising Manager"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">Comment</label>
                          <textarea
                            value={comments}
                            onChange={(e) => setComment(e.target.value)}
                            className="form-control floating"
                            placeholder="Comment"
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
                        {selectedStatus[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddStatus;
