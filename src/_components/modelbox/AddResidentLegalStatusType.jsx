import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddResidentLegalStatusType = ({
  indexToEdit,
  id,
  dispatchResidentLegalStatusType,
}) => {
  const [selectedResidentLegalStatusType] = useGlobalState(
    "selectedResidentLegalStatusType"
  );

  const [legal_status_name, setLegalStatusName] = useState(
    selectedResidentLegalStatusType[indexToEdit]?.legal_status_name || ""
  );

  const [legal_status_description, setLegalStatusTypeDescription] = useState(
    selectedResidentLegalStatusType[indexToEdit]?.legal_status_description || ""
  );

 
  const [legalStatusTypeError, setLegalStatusTypeError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    if(legal_status_name === "") {
      setLegalStatusTypeError("Legal Status type is required");
      return;
    }

    setLegalStatusTypeError("");

    const legalStatusTypeObject = {
      id,
      legal_status_name,
      legal_status_description,
    };


    if (selectedResidentLegalStatusType[indexToEdit]?.id) {
      dispatchResidentLegalStatusType({
        type: "update",
        payload: legalStatusTypeObject,
      });
    } else {
      dispatchResidentLegalStatusType({ type: "add", payload: legalStatusTypeObject });
    }
    setGlobalState("showResidentLegalStatusTypeModal", false);
  };

  const handleLegalStatusTypeChange = (e) => {
    setLegalStatusName(e.target.value);
    setLegalStatusTypeError("");
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
                  <h5 className="modal-title">
                    {selectedResidentLegalStatusType[indexToEdit]?.id
                      ? "Edit Legal Status Type"
                      : "Add Legal Status Type"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showResidentLegalStatusTypeModal", false)
                    }
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">Legal Status Type</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={legal_status_name}
                            onChange={handleLegalStatusTypeChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Gp Type"
                          />
                          {legalStatusTypeError && (
                            <p className="error-message">
                              {legalStatusTypeError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Description</label>
                          <textarea
                            value={legal_status_description}
                            onChange={(e) =>
                              setLegalStatusTypeDescription(e.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Description"
                            style={{ height: "90px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedResidentLegalStatusType[indexToEdit]?.id
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

export default AddResidentLegalStatusType;
