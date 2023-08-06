import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { RadioBtn } from "./styles";

const AddEmpDocTypeModal = ({
  dispatchEmpDocType,
  indexToEdit,
  getEmpDocTypeId,
}) => {
  const [selectedEmployeeDocumentType] = useGlobalState("selectedEmployeeDocumentType");

  let id = getEmpDocTypeId;

  const [document_type, setDocType] = useState(
    selectedEmployeeDocumentType[indexToEdit]?.document_type || ""
  );

  const [description, setDescription] = useState(
    selectedEmployeeDocumentType[indexToEdit]?.description || ""
  );

  const [required, setRequired] = useState(
    selectedEmployeeDocumentType[indexToEdit]?.required || ""
  );

  const [docTypeError, setDocTypeError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (document_type === "") {
      setDocTypeError("Document Type is required.");
      return;
    }

    // Clear any existing error messages
    setDocTypeError("");
    const doc = {
      id,
      document_type,
      required,
      description,
    };
    if (selectedEmployeeDocumentType[indexToEdit]?.id) {
      dispatchEmpDocType({ type: "update", payload: doc });
    } else {
      dispatchEmpDocType({ type: "add", payload: doc });
    }
    setGlobalState("showEmployeeDocumentTypeModal", false);
  };

  const handleDocTypeChange = (event) => {
    setDocType(event.target.value);
    setDocTypeError("");
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
                    {selectedEmployeeDocumentType[indexToEdit]?.id ? "Edit Document Type" : "Add Document Type"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showEmployeeDocumentTypeModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Document Type <span className="text-danger">*</span>
                          </label>
                          <input
                            value={document_type}
                            onChange={handleDocTypeChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Document Type"
                          />
                          {docTypeError && (
                            <p className="error-message">{docTypeError}</p>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Required</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="Required"
                              checked={required}
                              id="Required"
                              placeholder="Required"
                              onChange={(e) => setRequired(e.target.checked)}
                            />
                            <label htmlFor="Required">
                              <span>Required</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">Description</label>
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
                        {selectedEmployeeDocumentType[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddEmpDocTypeModal;
