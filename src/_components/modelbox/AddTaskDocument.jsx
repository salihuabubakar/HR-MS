import React, { useState } from "react";
import { PopupContainer, PopupOverlay, PopupWrapper, Card } from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
const AddEmployeeDocument = ({
  indexToEdit,
  id,
  dispatchTaskDocument,
  task,
}) => {
  const [selectedTaskDocumentInfo] = useGlobalState("selectedTaskDocumentInfo");

  const [name, setName] = useState(
    selectedTaskDocumentInfo[indexToEdit]?.name || ""
  );

  const [document, setDocument] = useState(
    selectedTaskDocumentInfo[indexToEdit]?.document || ""
  );
  
  const [nameError, setNameError] = useState("");
  const [documentUploadError, setDocumentUploadError] = useState("");

  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setNameError("Name is required.");
      return;
    }
    if (document === "") {
      setDocumentUploadError("Document file is required.");
      return;
    }

    setNameError("");
    setDocumentUploadError("");

    const doc = {
      id: id,
      name: name,
      document: document,
      task: task,
    };

    Object.entries(doc).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (selectedTaskDocumentInfo[indexToEdit]?.id) {
      dispatchTaskDocument({
        type: "update",
        payload: { id, formData },
      });
    } else {
      dispatchTaskDocument({ type: "add", payload: formData });
    }
    setGlobalState("showTaskDocumentModal", false);
  };

  const handleNameErrorChange = (e) => {
    setName(e.target.value);
    setNameError("")
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.size <= 5 * 1024 * 1024) {
      // 5MB in bytes
      setDocument(file);
    } else {
      alert(`File '${file.name}' is larger than 5MB`);
    }
    setDocumentUploadError("");
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
                    {selectedTaskDocumentInfo[indexToEdit]?.id ? "Edit Document" : "Add Document"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showTaskDocumentModal", false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Document Name {""} <span className="text-danger">*</span>
                          </label>
                          <input
                            value={name}
                            onChange={handleNameErrorChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Document Name"
                          />
                          {nameError && <p className="error-message">{nameError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Document File Upload</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            onChange={handleFileUpload}
                            className="form-control floating"
                            type="file"
                            accept=".png, .jpg, .pdf, .doc, .docx, .xls, .xlsx, .txt, .webp"
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
                        {selectedTaskDocumentInfo[indexToEdit]?.id ? "Update" : "Save"}
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
