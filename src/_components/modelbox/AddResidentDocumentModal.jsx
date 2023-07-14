import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { RadioBtn } from "./styles";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { useResidentDocumentTypeFetching } from "../../utils/employeeCustomFetchHook";

const AddResidentDocumentModal = ({
  residentDocumentIndexToEdit,
  id,
  dispatchResidentDocument,
  resident,
}) => {
  const [selectedResidentDocument] = useGlobalState("selectedResidentDocument");
  const { residentDocumentTypeData } = useResidentDocumentTypeFetching();

  const [document_name, setDocumentName] = useState(
    selectedResidentDocument[residentDocumentIndexToEdit]?.document_name || ""
  );

  const [document_number, setDocumentNumber] = useState(
    selectedResidentDocument[residentDocumentIndexToEdit]?.document_number || ""
  );

  const [issue_date, setIssueDate] = useState(
    selectedResidentDocument[residentDocumentIndexToEdit]?.issue_date || ""
  );

  const [expiry_date, setExpiryDate] = useState(
    selectedResidentDocument[residentDocumentIndexToEdit]?.expiry_date || ""
  );

  const [document, setDocument] = useState(
    selectedResidentDocument[residentDocumentIndexToEdit]?.document || ""
  );

  const [status, setStatus] = useState(
    selectedResidentDocument[residentDocumentIndexToEdit]?.status || ""
  );

  const [document_type, setDocumentType] = useState(
    selectedResidentDocument[residentDocumentIndexToEdit]?.document_type || ""
  );

  const [verified, setVerified] = useState(
    selectedResidentDocument[residentDocumentIndexToEdit]?.verified || false
  );

  const [statusError, setStatusError] = useState("");
  const [documentError, setDocumentError] = useState("");

  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "") {
      setStatusError("Status is required.");
      return;
    }
    if (document === "") {
      setDocumentError("Document file is required.");
      return;
    }

    setStatusError("");
    setDocumentError("");

    const documentUpload = {
      id: id,
      resident: resident,
      document_name: document_name,
      document_number: document_number,
      issue_date: issue_date,
      expiry_date: expiry_date,
      document: document,
      status: status,
      document_type: document_type,
      verified: verified,
    };

    Object.entries(documentUpload).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (selectedResidentDocument[residentDocumentIndexToEdit]?.id) {
      dispatchResidentDocument({
        type: "update",
        payload: { id, formData },
      });
    } else {
      dispatchResidentDocument({ type: "add", payload: formData });
    }
    setGlobalState("showResidentDocumentModal", false);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setStatusError("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.size <= 5 * 1024 * 1024) {
      // 5MB in bytes
      setDocument(file);
    } else {
      alert(`File '${file.name}' is larger than 5MB`);
    }
    setDocumentError("");
  };

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer className="custom-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedResidentDocument[residentDocumentIndexToEdit]?.id
                      ? "Edit Resident Document"
                      : "Add Resident Document"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showResidentDocumentModal", false)}
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
                            {residentDocumentTypeData?.map((type) => {
                              return (
                                <option key={type.id} value={type.id}>
                                  {type.document_type}
                                </option>
                              );
                            })}
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
                            onChange={(e) => setIssueDate(e.target.value)}
                            className="form-control floating"
                            type="date"
                            placeholder="Issue Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Expiry Date</label>
                          <input
                            value={expiry_date}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="form-control floating"
                            type="date"
                            placeholder="Expiry Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Verify</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="verified"
                              checked={verified}
                              id="verified"
                              placeholder="Verify"
                              onChange={(e) => setVerified(e.target.checked)}
                            />
                            <label htmlFor="verified">
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
                            accept=".png, .jpg, .pdf, .doc, .docx, .xls, .xlsx, .txt, .webp"
                            placeholder="Document File Upload"
                          />
                          {documentError && <p className="error-message">{documentError}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button type="submit" className="btn btn-primary submit-btn">
                        {selectedResidentDocument[residentDocumentIndexToEdit]?.id
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

export default AddResidentDocumentModal;
