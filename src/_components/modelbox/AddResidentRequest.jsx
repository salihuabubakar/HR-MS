import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import {
  useResidentFetching,
  useHouseFetching,
} from "../../utils/employeeCustomFetchHook";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
const AddResidentVisitor = ({
  indexToEdit,
  id,
  dispatchResidentRequest,
}) => {
  const [selectedResidentRequest] = useGlobalState("selectedResidentRequest");
  const { residentData } = useResidentFetching();
  const { houseData } = useHouseFetching();

  const [request, setRequest] = useState(
    selectedResidentRequest[indexToEdit]?.request || ""
  );

  const [date_requested, setDateRequested] = useState(
    selectedResidentRequest[indexToEdit]?.date_requested || ""
  );

  const [time_requested, setTimeRequested] = useState(
    selectedResidentRequest[indexToEdit]?.time_requested || ""
  );

  const [status, setStatus] = useState(
    selectedResidentRequest[indexToEdit]?.status || ""
  );

  const [date_completed, setDateCompleted] = useState(
    selectedResidentRequest[indexToEdit]?.date_completed || ""
  );

  const [time_completed, setTimeCompleted] = useState(
    selectedResidentRequest[indexToEdit]?.time_completed || ""
  );

  const [resident, setResident] = useState(
    selectedResidentRequest[indexToEdit]?.resident || ""
  );

  const [description, setDescription] = useState(
    selectedResidentRequest[indexToEdit]?.description || ""
  );

 
  const [statusError, setStatusError] = useState("");
  const [dateRequestedError, setDateRequestedError] = useState("");
  const [timeRequestedError, setTimeRequestedError] = useState("");
  const [dateCompletedError, setDateCompletedError] = useState("");
  const [timeCompletedError, setTimeCompletedError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    if (date_requested == "") {
      setDateRequestedError("Date is required");
      return;
    }
    if (time_requested == "") {
      setTimeRequestedError("Time is required");
      return;
    }
    if (date_completed == "") {
      setDateCompletedError("Date is required");
      return;
    }
    if (time_completed == "") {
      setTimeCompletedError("Time is required");
      return;
    }
    if (status == "") {
      setStatusError("Status is required");
      return;
    }
    if (description == "") {
      setDescriptionError("Description is required");
      return;
    }

    setDateRequestedError("");
    setTimeRequestedError("");
    setDateCompletedError("");
    setTimeCompletedError("");
    setStatusError("");
    setDescriptionError("");


    const requestObject = {
      id,
      request,
      time_requested,
      date_requested,
      status,
      date_completed,
      time_completed,
      resident,
      description,
    };


    if (selectedResidentRequest[indexToEdit]?.id) {
      dispatchResidentRequest({
        type: "update",
        payload: requestObject,
      });
    } else {
      dispatchResidentRequest({ type: "add", payload: requestObject });
    }
    setGlobalState("showResidentRequestModal", false);
  };

  const handleRequestChange = (e) => {
    setRequest(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setStatusError("");
  }

  const handleDateRequested = (e) => {
    setDateRequested(e.target.value);
    setDateRequestedError("");
  }

  const handleDateCompleted = (e) => {
    setDateCompleted(e.target.value);
    setDateCompletedError("");
  };

  const handleTimeRequested = (e) => {
    setTimeRequested(e.target.value);
    setTimeRequestedError("");
  }

  const handleTimeCompleted = (e) => {
    setTimeCompleted(e.target.value);
    setTimeCompletedError("");
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");
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
                    {selectedResidentRequest[indexToEdit]?.id
                      ? "Edit Request"
                      : "Add Request"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showResidentRequestModal", false)
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
                          <label className="col-form-label">Request</label>
                          <input
                            value={request}
                            onChange={handleRequestChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Request"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Date Requested
                          </label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={date_requested}
                            onChange={handleDateRequested}
                            className="form-control floating"
                            type="date"
                          />
                          {dateRequestedError && (
                            <p className="error-message">
                              {dateRequestedError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Time Requested
                          </label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={time_requested}
                            onChange={handleTimeRequested}
                            className="form-control floating"
                            type="time"
                          />
                          {timeRequestedError && (
                            <p className="error-message">
                              {timeRequestedError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Resident</label>
                          <select
                            value={resident}
                            onChange={(e) => setResident(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Resident
                            </option>
                            {residentData?.map((r) => (
                              <option key={r.id} value={r.id}>
                                {`${r.first_name} ${r.middle_name} ${r.last_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Time Completed
                          </label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={time_completed}
                            onChange={handleTimeCompleted}
                            className="form-control floating"
                            type="time"
                          />
                          {timeCompletedError && (
                            <p className="error-message">
                              {timeCompletedError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Date Completed
                          </label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={date_completed}
                            onChange={handleDateCompleted}
                            className="form-control floating"
                            type="date"
                          />
                          {dateCompletedError && (
                            <p className="error-message">
                              {dateCompletedError}
                            </p>
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
                              Select
                            </option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Denied">Denied</option>
                            <option value="Completed">Completed</option>
                          </select>
                          {statusError && (
                            <p className="error-message">{statusError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Description</label>{" "}
                          <span className="text-danger">*</span>
                          <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Description"
                            style={{ height: "90px" }}
                          />
                          {descriptionError && (
                            <p className="error-message">{descriptionError}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedResidentRequest[indexToEdit]?.id
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

export default AddResidentVisitor;
