import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { useSchoolFetching } from "../../utils/employeeCustomFetchHook";

const AddResidentSchoolModal = ({
  residentSchoolIndexToEdit,
  id,
  dispatchResidentSchool,
  resident,
}) => {

  const { schoolData } = useSchoolFetching();
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
    } else {
      dispatchResidentSchool({ type: "add", payload: schoolObj });
    }
    setGlobalState("showResidentSchoolModal", false);
  };

  const notify = (e) => {
    e.preventDefault();
    toast.warn("Can't submit empty form");
  }

  const [isDarkMode] = useGlobalState("isDarkMode");

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer isDarkMode={isDarkMode} className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
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
                          <label className="col-form-label">School</label>
                          <select
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                            className="form-control floating"
                            placeholder="Select School"
                          >
                            <option disabled value="">
                              Select School
                            </option>
                            {schoolData?.map(s => {
                              return <option value={s.id} key={s.id}>{s.school_name}</option>
                            })}
                          </select>
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
