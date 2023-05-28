import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
} from "../../_components/modelbox/Addemployee.style";
import "./style.css";
import { v4 as uuidv4 } from "uuid";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "./DeleteModal";
const AddEmergencyContact = ({
  dispatchEmergencyContactInfo,
  employeeId,
  indexToEdit,
}) => {
  const uniqueId = uuidv4();
  const [selectedEmergencyContact] = useGlobalState("selectedEmergencyContact");
  const [deleteModal] = useGlobalState("deleteModal");

  let isIdExist;
  let isNameExist;
  let isRelationshipExist;
  let isPrimaryPhoneExist;
  let isOptionalPhoneExist;


  if (selectedEmergencyContact && indexToEdit !== undefined) {
    isIdExist = selectedEmergencyContact[indexToEdit]?.id;
    isNameExist = selectedEmergencyContact[indexToEdit]?.name;;
    isRelationshipExist = selectedEmergencyContact[indexToEdit]?.relationship;
    isPrimaryPhoneExist = selectedEmergencyContact[indexToEdit]?.primaryPhone;
    isOptionalPhoneExist = selectedEmergencyContact[indexToEdit]?.optionalPhone;
  } else {
    isNameExist = "";
    isRelationshipExist = "";
    isPrimaryPhoneExist = "";
    isOptionalPhoneExist = "";
    isIdExist = "";
  }

  const [name, setName] = useState(isNameExist ? isNameExist : "");
  const [relationship, setRelationship] = useState(isRelationshipExist ? isRelationshipExist : "");
  const [primaryPhone, setPrimaryPhone] = useState(isPrimaryPhoneExist ? isPrimaryPhoneExist : "");
  const [optionalPhone, setOptionalPhone] = useState(isOptionalPhoneExist ? isOptionalPhoneExist : "");
  const [id] = useState(isIdExist ? isIdExist : uniqueId);

  const [nameError, setNameError] = useState("");
  const [relationshipError, setRelationshipError] = useState("");
  const [primaryPhoneError, setPrimaryPhoneError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate first name and last name
    if (name === "") {
      setNameError("Name is required.");
      return;
    }
    if (relationship === "") {
      setRelationshipError("Relationship is required.");
      return;
    }
    if (primaryPhone === "") {
      setPrimaryPhoneError("Primary Phone is required.");
      return;
    }

    // Clear any existing error messages
    setNameError("");
    setRelationshipError("");
    setPrimaryPhoneError("");
    const emergencyContact = {
      id,
      employeeId,
      name,
      relationship,
      primaryPhone,
      optionalPhone,
    };
    if (isIdExist) {
      dispatchEmergencyContactInfo({
        type: "update",
        payload: emergencyContact,
      });
    } else {
      dispatchEmergencyContactInfo({ type: "push", payload: emergencyContact });
    }
    setGlobalState("showEmergencyContactModal", false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError("");
  };

  const handleRelationshipChange = (e) => {
    setRelationship(e.target.value);
    setRelationshipError("");
  };

  const handlePrimaryPhoneChange = (e) => {
    setPrimaryPhone(e.target.value);
    setPrimaryPhoneError("");
  };

  const handleDelete = () => {
    setGlobalState("deleteModal", true);
  };
  
  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer top={true} className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {isIdExist
                      ? "Edit Emergency Contact"
                      : "Add Emergency Contact"}
                  </h5>
                  {isIdExist && (
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        marginBottom: "15px",
                      }}
                      className="delete-icon"
                      type="button"
                      onClick={handleDelete}
                    >
                      <i className="fa fa-trash-o" />
                    </button>
                  )}
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showEmergencyContactModal", false)
                    }
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="focus-label">
                            Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control floating"
                            placeholder="Name"
                            value={name}
                            onChange={handleNameChange}
                          />
                          {nameError && (
                            <p className="error-message">{nameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="focus-label">
                            Relationship <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control floating"
                            placeholder="Relationship"
                            value={relationship}
                            onChange={handleRelationshipChange}
                          />
                          {relationshipError && (
                            <p className="error-message">{relationshipError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Primary Phone <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control floating"
                            placeholder="Primary Phone"
                            value={primaryPhone}
                            onChange={handlePrimaryPhoneChange}
                          />
                          {primaryPhoneError && (
                            <p className="error-message">{primaryPhoneError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Optional Phone{" "}
                          </label>
                          <input
                            className="form-control floating"
                            type="text"
                            placeholder="Optional Phone"
                            value={optionalPhone}
                            onChange={(event) =>
                              setOptionalPhone(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {isIdExist ? "Update" : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </PopupContainer>
        </PopupOverlay>
      </PopupWrapper>
      {deleteModal && (
        <DeleteModal
          deleteAction={dispatchEmergencyContactInfo}
          indexToDelete={indexToEdit}
          dispatch={selectedEmergencyContact}
          modalTitle={"Emergency Info"}
        />
      )}
    </>
  );
};

export default AddEmergencyContact;
