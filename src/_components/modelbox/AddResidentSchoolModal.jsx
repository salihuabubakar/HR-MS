import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AddResidentSchoolModal = ({
  residentSchoolIndexToEdit,
  id,
  dispatchResidentSchool,
  resident,
}) => {

  const [selectedResidentSchool] = useGlobalState("selectedResidentSchool");


  const [school, setSchool] = useState(
    selectedResidentSchool[residentSchoolIndexToEdit]?.school || ""
  );

  const [year, setYear] = useState(
    selectedResidentSchool[residentSchoolIndexToEdit]?.year || ""
  );

  const [grade, setGrade] = useState(
    selectedResidentSchool[residentSchoolIndexToEdit]?.grade || ""
  );

  const [status, setStatus] = useState(
    selectedResidentSchool[residentSchoolIndexToEdit]?.status || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const schoolObj = {
      id,
      resident,
      school,
      year,
      grade,
      status,
    };
    

    if (selectedResidentSchool[residentSchoolIndexToEdit]?.id) {
      dispatchResidentSchool({
        type: "update",
        payload: schoolObj,
      });
      toast.success("Resident School Updated", {
        autoClose: 1500,
      });
    } else {
      dispatchResidentSchool({ type: "add", payload: schoolObj });
      toast.success("Resident School Updated", {
        autoClose: 1500,
      });
    }
    setGlobalState("showResidentSchoolModal", false);
  };

  const notify = (e) => {
    e.preventDefault();
    toast.warn("Can't submit empty form");
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
                    {selectedResidentSchool[residentSchoolIndexToEdit]?.id
                      ? "Edit Resident School"
                      : "Add Resident School"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showResidentSchoolModal", false)
                    }
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={school === "" && year === "" ? notify : handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">School Name</label>
                          <input
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="School Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Year</label>
                          <input
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Year"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Grade</label>
                          <input
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Grade"
                          />
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
                            <option value={"Enrolled"}>Enrolled</option>
                            <option value={"Graduated"}>Graduated</option>
                            <option value={"Suspended"}>Suspended</option>
                            <option value={"Expelled"}>Expelled</option>
                            <option value={"Dropped Out"}>Dropped Out</option>
                            <option value={"Other"}>Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedResidentSchool[residentSchoolIndexToEdit]?.id
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

export default AddResidentSchoolModal;
