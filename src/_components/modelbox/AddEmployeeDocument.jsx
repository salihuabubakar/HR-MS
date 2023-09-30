import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { RadioBtn } from "./styles";
import { useEmployeeDocumentTypeFetching } from "../../utils/employeeCustomFetchHook";
import { isMobile } from "../../utils/mediaQuery";
const AddEmployeeDocument = ({
  employeeDocumentIndexToEdit,
  id,
  dispatchEmployeeDocument,
  employee,
}) => {
  const [selectedEmployeeDocument] = useGlobalState("selectedEmployeeDocument");

  const { employeeDocType } = useEmployeeDocumentTypeFetching();

  const [document_name, setDocumentName] = useState(
    selectedEmployeeDocument[employeeDocumentIndexToEdit]?.document_name || ""
  );

  const [document_number, setDocumentNumber] = useState(
    selectedEmployeeDocument[employeeDocumentIndexToEdit]?.document_number || ""
  );

  const [issue_date, setIssueDate] = useState(
    selectedEmployeeDocument[employeeDocumentIndexToEdit]?.issue_date || ""
  );

  const [expiry_date, setExpiryDate] = useState(
    selectedEmployeeDocument[employeeDocumentIndexToEdit]?.expiry_date || ""
  );

  const [document_upload, setDocumentUpload] = useState(
    selectedEmployeeDocument[employeeDocumentIndexToEdit]?.document_upload || ""
  );

  const [status, setStatus] = useState(
    selectedEmployeeDocument[employeeDocumentIndexToEdit]?.status || ""
  );

  const [document_type, setDocumentType] = useState(
    selectedEmployeeDocument[employeeDocumentIndexToEdit]?.document_type || ""
  );

  const [verified, setVarified] = useState(
    selectedEmployeeDocument[employeeDocumentIndexToEdit]?.verified || false
  );

  const [issueDateError, setIssueDateError] = useState("");
  // const [expiryDateError, setExpiryDateError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [documentUploadError, setDocumentUploadError] = useState("");

  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "") {
      setStatusError("Status is required.");
      return;
    }
    if (issue_date === "") {
      setIssueDateError("Issue Date is required.");
      return;
    }
    // if (expiry_date === "") {
    //   setExpiryDateError("Expiry Date is required.");
    //   return;
    // }
    if (document_upload === "") {
      setDocumentUploadError("Document file is required.");
      return;
    }

    setStatusError("");
    setIssueDateError("");
    // setExpiryDateError("");
    setDocumentUploadError("");

    const experience = {
      id: id,
      employee: employee,
      document_name: document_name,
      document_number: document_number,
      issue_date: issue_date,
      expiry_date: expiry_date,
      document_upload: document_upload,
      status: status,
      document_type: document_type,
      verified: verified,
    };

    Object.entries(experience).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (selectedEmployeeDocument[employeeDocumentIndexToEdit]?.id) {
      dispatchEmployeeDocument({
        type: "update",
        payload: { id, formData },
      });
    } else {
      dispatchEmployeeDocument({ type: "add", payload: formData });
    }
    setGlobalState("showEmployeeDocumentModal", false);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setStatusError("");
  };

  const handleIssueDateChange = (e) => {
    setIssueDate(e.target.value);
    setIssueDateError("");
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
    // setExpiryDateError("");
  };

   const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.size <= 5 * 1024 * 1024) {
      // 5MB in bytes
      setDocumentUpload(file);
    } else {
      alert(`File '${file.name}' is larger than 5MB`);
    }
    setDocumentUploadError("");
   }

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer top={ isMobile() && true } className="custom-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedEmployeeDocument[employeeDocumentIndexToEdit]?.id
                      ? "Edit Document"
                      : "Add Document"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showEmployeeDocumentModal", false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Document Name</label>
                          <input
                            value={document_name}
                            onChange={(event) => setDocumentName(event.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Document Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Document Number</label>
                          <input
                            value={document_number}
                            onChange={(event) => setDocumentNumber(event.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Document Number"
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
                              Select Status
                            </option>
                            <option value="Valid">Valid</option>
                            <option value="Expired">Expired</option>
                            <option value="Pending">Pending</option>
                          </select>
                          {statusError && <p className="error-message">{statusError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Document Type</label>
                          <select
                            value={document_type}
                            onChange={(e) => setDocumentType(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select
                            </option>
                            {employeeDocType?.map(docType => (
                              <option key={docType.id} value={docType.id}>{docType.document_type}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Issue Date <span className="text-danger">*</span>
                          </label>
                          <input
                            value={issue_date}
                            onChange={handleIssueDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Issue Date"
                          />
                          {issueDateError && <p className="error-message">{issueDateError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Expiry Date</label>
                          <input
                            value={expiry_date}
                            onChange={handleExpiryDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Expiry Date"
                          />
                          {/* {expiryDateError && (
                            <p className="error-message">{expiryDateError}</p>
                          )} */}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Verify</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="Verify"
                              checked={verified}
                              id="Verify"
                              placeholder="Verify"
                              onChange={(e) => setVarified(e.target.checked)}
                            />
                            <label htmlFor="Verify">
                              <span>Verify</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Document File Upload</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            onChange={handleFileUpload}
                            className="form-control floating"
                            type="file"
                            accept=".pdf, .doc, .docx, .txt, .xls, .xlsx, .csv, .png, .jpeg, .webp, .PNG, .JPEG,"
                            placeholder="Document File Upload"
                          />
                          {documentUploadError && (
                            <p className="error-message">{documentUploadError}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button type="submit" className="btn btn-primary submit-btn">
                        {selectedEmployeeDocument[employeeDocumentIndexToEdit]?.id
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

export default AddEmployeeDocument;
