import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { useSolicitorFetching } from "../../utils/employeeCustomFetchHook";

const AddResidentSolicitorModal = ({
  residentSolicitorIndexToEdit,
  id,
  dispatchResidentSolicitor,
  resident,
}) => {
  const [selectedResidentSolicitor] = useGlobalState("selectedResidentSolicitor");
  const { solicitorData } = useSolicitorFetching();

  const [start_date, setStart_date] = useState(
    selectedResidentSolicitor[residentSolicitorIndexToEdit]?.start_date || ""
  );

  const [end_date, setEnd_date] = useState(
    selectedResidentSolicitor[residentSolicitorIndexToEdit]?.end_date || ""
  );

  const [solicitor, setSolicitor] = useState(
    selectedResidentSolicitor[residentSolicitorIndexToEdit]?.solicitor || ""
  );

  const [status, setStatus] = useState(
    selectedResidentSolicitor[residentSolicitorIndexToEdit]?.status || ""
  );

  const [description, setDescription] = useState(
    selectedResidentSolicitor[residentSolicitorIndexToEdit]?.description || ""
  );

  const [dateError, setDateError] = useState("");
  const [statusError, setStatusError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (start_date === "") {
      setDateError("Start date is required.");
      return;
    }
    if (status === "") {
      setStatusError("Status is required");
      return;
    }

    // Clear any existing error messages
    setDateError("");
    setStatusError("");
    const gpPractice = {
      id,
      resident,
      start_date,
      end_date,
      description,
      status,
      solicitor,
    };
    if (selectedResidentSolicitor[residentSolicitorIndexToEdit]?.id) {
      dispatchResidentSolicitor({ type: "update", payload: gpPractice });
    } else {
      dispatchResidentSolicitor({ type: "add", payload: gpPractice });
    }
    setGlobalState("showResidentSolicitorModal", false);
  };

  const handleDateChange = (event) => {
    setStart_date(event.target.value);
    setDateError("");
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
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
                    {selectedResidentSolicitor[residentSolicitorIndexToEdit]?.id
                      ? "Edit Solicitor"
                      : "Add Solicitor"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showResidentSolicitorModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Start Date <span className="text-danger">*</span>
                          </label>
                          <input
                            value={start_date}
                            onChange={handleDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Start Date"
                          />
                          {dateError && (
                            <p className="error-message">{dateError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            End Date
                          </label>
                          <input
                            value={end_date}
                            onChange={(e) => setEnd_date(e.target.value)}
                            className="form-control floating"
                            type="date"
                            placeholder="End Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Solicitor</label>
                          <select
                            value={solicitor}
                            onChange={(e) => setSolicitor(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select
                            </option>
                            {solicitorData?.map((s) => (
                              <option key={s.id} value={s.id}>
                                {`${s.solicitor_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Status</label>{" "}
                          <span className="text-danger">*</span>
                          <select
                            value={status}
                            onChange={handleStatusChange}
                            className="form-control floating"
                          >
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                          {statusError && (
                            <p className="error-message">{statusError}</p>
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                        {selectedResidentSolicitor[residentSolicitorIndexToEdit]?.id
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

export default AddResidentSolicitorModal;