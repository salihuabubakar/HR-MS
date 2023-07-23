import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { useResidentSchoolFetching } from "../../utils/employeeCustomFetchHook";

const AddResidentSchoolReportModal = ({
  residentSchoolReportIndexToEdit,
  id,
  dispatchResidentSchoolReport,
  resident,
}) => {

  const { residentSchoolData } = useResidentSchoolFetching();

  const [selectedResidentSchoolReport] = useGlobalState(
    "selectedResidentSchoolReport"
  );


  const [school, setSchool] = useState(
    selectedResidentSchoolReport[residentSchoolReportIndexToEdit]
      ?.school || ""
  );

  const [year, setYear] = useState(
    selectedResidentSchoolReport[residentSchoolReportIndexToEdit]?.year ||
      ""
  );

  const [report, setReport] = useState(
    selectedResidentSchoolReport[residentSchoolReportIndexToEdit]?.report || ""
  );

  const [reportError, setReportError] = useState("");
  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(report === "") {
      setReportError("Report file is required");
      return;
    }

    setReportError("");

    const reportobj = {
      id: id,
      resident: resident,
      school: school,
      year: year,
      report: report,
    };
    
    Object.entries(reportobj).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (selectedResidentSchoolReport[residentSchoolReportIndexToEdit]?.id) {
      dispatchResidentSchoolReport({
        type: "update",
        payload: { id, formData },
      });
    } else {
      dispatchResidentSchoolReport({ type: "add", payload: formData });
    }
    setGlobalState("showResidentSchoolReportModal", false);
  };

  
  const handleReportFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size <= 5 * 1024 * 1024) {
      // 5MB in bytes
      setReport(file);
    } else {
      alert(`File '${file.name}' is larger than 5MB`);
    }
    setReportError("");
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
                    {selectedResidentSchoolReport[
                      residentSchoolReportIndexToEdit
                    ]?.id
                      ? "Edit Resident School Report"
                      : "Add Resident School Report"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showResidentSchoolReportModal", false)
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
                            {residentSchoolData?.map((schl) => (
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
                            Report File <span className="text-danger">*</span>
                          </label>
                          <input
                            onChange={handleReportFileChange}
                            className="form-control floating"
                            type="file"
                            accept=".png, .jpg, .pdf, .doc, .docx, .xls, .xlsx, .txt, .webp"
                            placeholder="Report File"
                          />
                          {reportError && (
                            <p className="error-message">{reportError}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedResidentSchoolReport[
                          residentSchoolReportIndexToEdit
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
