import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import {
  useResidentFetching,
  useHouseFetching,
} from "../../utils/employeeCustomFetchHook";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { toast } from "react-toastify";

const AddResidentVisitor = ({
  indexToEdit,
  id,
  dispatchResidentVisitor,
}) => {
  const [selectedResidentVisitor] = useGlobalState("selectedResidentVisitor");
  const { residentData } = useResidentFetching();
  const { houseData } = useHouseFetching();

  const [visitor, setVisitor] = useState(
    selectedResidentVisitor[indexToEdit]?.visitor || ""
  );

  const [visit_date, setVisitDate] = useState(
    selectedResidentVisitor[indexToEdit]?.visit_date || ""
  );

  const [visit_time, setVisitTime] = useState(
    selectedResidentVisitor[indexToEdit]?.visit_time || ""
  );

  const [purpose, setPurpose] = useState(
    selectedResidentVisitor[indexToEdit]?.purpose || ""
  );

  const [status, setStatus] = useState(
    selectedResidentVisitor[indexToEdit]?.status || ""
  );
  const [left_time, setLeftTime] = useState(
    selectedResidentVisitor[indexToEdit]?.left_time || ""
  );

  const [house, setHouse] = useState(
    selectedResidentVisitor[indexToEdit]?.house || ""
  );

  const [resident, setResident] = useState(
    selectedResidentVisitor[indexToEdit]?.resident || ""
  );

 
  const [statusError, setStatusError] = useState("");
  const [visitDateError, setVisitDateError] = useState("")
  const [visitTimeError, setVisitTimeError] = useState("");
  const [leftTimeError, setLeftTimeError] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();

    if(visit_date === "") {
      setVisitDateError("Visit Date is required");
      return;
    }

    if(visit_time === "") {
      setVisitTimeError("Visit Time is required");
      return;
    }

    if (status == "") {
      setStatusError("Status is required");
      return;
    }

    if(left_time === "") {
      setLeftTimeError("Left Time is required");
      return;
    }

    setVisitDateError("");
    setVisitTimeError("");
    setStatusError("");
    setLeftTimeError("");


    const visitorObject = {
      id: id,
      visitor,
      visit_time,
      visit_date,
      purpose,
      status,
      status,
      left_time,
      house,
      resident
    };


    if (selectedResidentVisitor[indexToEdit]?.id) {
      dispatchResidentVisitor({
        type: "update",
        payload: visitorObject,
      });
      toast.success("Visitor Updated", {
        autoClose: 1500,
      });
    } else {
      dispatchResidentVisitor({ type: "add", payload: visitorObject });
      toast.success("Visitor Added", {
        autoClose: 1500,
      });
    }
    setGlobalState("showResidentVisitorModal", false);
  };

  const handleVisitorChange = (e) => {
    setVisitor(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setStatusError("");
  }

  const handleVisitDate = (e) => {
    setVisitDate(e.target.value)
    setVisitDateError("")
  }

  const handleVisitTime = (e) => {
    setVisitTime(e.target.value)
    setVisitTimeError("");
  }

  const handleTimeLeft = (e) => {
    setLeftTime(e.target.value);
    setLeftTimeError("");
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
                    {selectedResidentVisitor[indexToEdit]?.id
                      ? "Edit Visitor"
                      : "Add Visitor"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showResidentVisitorModal", false)
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
                          <label className="col-form-label">Visitor</label>
                          <input
                            value={visitor}
                            onChange={handleVisitorChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Visitor"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Visit Date</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={visit_date}
                            onChange={handleVisitDate}
                            className="form-control floating"
                            type="date"
                            placeholder="Visit Date"
                          />
                          {visitDateError && (
                            <p className="error-message">{visitDateError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Visit Time</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={visit_time}
                            onChange={handleVisitTime}
                            className="form-control floating"
                            type="time"
                            placeholder="Visit Time"
                          />
                          {visitTimeError && (
                            <p className="error-message">{visitTimeError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">House</label>
                          <select
                            value={house}
                            onChange={(e) => setHouse(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select House
                            </option>
                            {houseData?.map((h) => (
                              <option key={h.id} value={h.id}>
                                {`${h.name}`}
                              </option>
                            ))}
                          </select>
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
                            Visit Purpose
                          </label>
                          <input
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Visit Purpose"
                          />
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
                            <option value="Left">Left</option>
                          </select>
                          {statusError && (
                            <p className="error-message">{statusError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Left Time</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={left_time}
                            onChange={handleTimeLeft}
                            className="form-control floating"
                            type="time"
                          />
                          {leftTimeError && (
                            <p className="error-message">{leftTimeError}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedResidentVisitor[indexToEdit]?.id
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
