import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { useSchoolFetching } from "../../utils/employeeCustomFetchHook";

const AddResidentSchoolReportModal = ({
  residentSchoolTimetableIndexToEdit,
  id,
  dispatchResidentSchoolTimetable,
  resident,
}) => {

  const { schoolData } = useSchoolFetching();

  const [selectedResidentSchoolTimetable] = useGlobalState(
    "selectedResidentSchoolTimetable"
  );


  const [school, setSchool] = useState(
    selectedResidentSchoolTimetable[residentSchoolTimetableIndexToEdit]
      ?.school || ""
  );

  const [year, setYear] = useState(
    selectedResidentSchoolTimetable[residentSchoolTimetableIndexToEdit]?.year ||
      ""
  );

  const [timetable, setTimetable] = useState(
    selectedResidentSchoolTimetable[residentSchoolTimetableIndexToEdit]?.timetable || ""
  );

  const [timetableError, setTimetableError] = useState("");
  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(timetable === "") {
      setTimetableError("Timetable file is required");
      return;
    }

    setTimetableError("");

    const reportobj = {
      id: id,
      resident: resident,
      school: school,
      year: year,
      timetable: timetable,
    };
    
    Object.entries(reportobj).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (selectedResidentSchoolTimetable[residentSchoolTimetableIndexToEdit]?.id) {
      dispatchResidentSchoolTimetable({
        type: "update",
        payload: { id, formData },
      });
    } else {
      dispatchResidentSchoolTimetable({ type: "add", payload: formData });
    }
    setGlobalState("showResidentSchoolTimetableModal", false);
  };

  
  const handleTimetableFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size <= 5 * 1024 * 1024) {
      // 5MB in bytes
      setTimetable(file);
    } else {
      alert(`File '${file.name}' is larger than 5MB`);
    }
    setTimetableError("");
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
                    {selectedResidentSchoolTimetable[
                      residentSchoolTimetableIndexToEdit
                    ]?.id
                      ? "Edit Resident School Timetable"
                      : "Add Resident School Timetable"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showResidentSchoolTimetableModal", false)
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
                          <label className="col-form-label">School</label>
                          <select
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select School
                            </option>
                            {schoolData?.map((schl) => (
                              <option key={schl.id} value={schl.id}>
                                {`${schl.school_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Year </label>
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
                          <label className="col-form-label">
                            Timetable <span className="text-danger">*</span>
                          </label>
                          <input
                            onChange={handleTimetableFileChange}
                            className="form-control floating"
                            type="file"
                            accept=".pdf, .doc, .docx, .txt, .xls, .xlsx, .csv, .png, .jpeg, .webp, .PNG, .JPEG,"
                            placeholder="Report File"
                          />
                          {timetableError && (
                            <p className="error-message">{timetableError}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedResidentSchoolTimetable[
                          residentSchoolTimetableIndexToEdit
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

export default AddResidentSchoolReportModal;
