import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { RadioBtn } from "./styles";

const AddResidentDocumentType = ({
  indexToEdit,
  id,
  dispatchResidentDocumentType,
}) => {
  const [selectedResidentDocumentType] = useGlobalState(
    "selectedResidentDocumentType"
  );
  const [document_type, setDocumentType] = useState(
    selectedResidentDocumentType[indexToEdit]?.document_type || ""
  );

  const [required, setRequired] = useState(
    selectedResidentDocumentType[indexToEdit]?.required || false
  );

  const [description, setDescription] = useState(
    selectedResidentDocumentType[indexToEdit]?.description || ""
  );


 
  const [docTypeError, setDocTypeError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    if(document_type === "") {
      setDocTypeError("Document type is required");
      return;
    }

    setDocTypeError("");

    const docTypeObject = {
      id,
      document_type,
      description,
      required,
    };


    if (selectedResidentDocumentType[indexToEdit]?.id) {
      dispatchResidentDocumentType({
        type: "update",
        payload: docTypeObject,
      });
    } else {
      dispatchResidentDocumentType({ type: "add", payload: docTypeObject });
    }
    setGlobalState("showResidentDocumentTypeModal", false);
  };

  const handleDocTypeChange = (e) => {
    setDocumentType(e.target.value);
    setDocTypeError("");
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
                    {selectedResidentDocumentType[indexToEdit]?.id
                      ? "Edit Document Type"
                      : "Add Document Type"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showResidentDocumentTypeModal", false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Document Type</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={document_type}
                            onChange={handleDocTypeChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Document Type"
                          />
                          {docTypeError && <p className="error-message">{docTypeError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Required</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="required"
                              checked={required}
                              id="required"
                              placeholder="Required"
                              onChange={(e) => setRequired(e.target.checked)}
                            />
                            <label htmlFor="required">
                              <span>Required</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Description</label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Description"
                            style={{ height: "90px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button type="submit" className="btn btn-primary submit-btn">
                        {selectedResidentDocumentType[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddResidentDocumentType;
