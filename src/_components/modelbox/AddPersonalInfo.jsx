import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
  Card,
} from "../../_components/modelbox/Addemployee.style";
import {
  setGlobalState,
  useGlobalState,
} from "../../context/GlobalState";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
import DeleteModal from "./DeleteModal";

const AddPersonalInfo = ({ dispatchPersonalInfo, indexToEdit, employeeId }) => {
  const uniqueId = uuidv4();
  const [selectedPersonalInfo] = useGlobalState("selectedPersonalInfo");
  const [deleteModal] = useGlobalState("deleteModal");

   let isIdExist;
   let isReligionExist;
   let isEmployeeSpouseExist;
   let isNoChildrenExist;

   if (selectedPersonalInfo && indexToEdit !== undefined) {
     isIdExist = selectedPersonalInfo[indexToEdit]?.id;
     isReligionExist = selectedPersonalInfo[indexToEdit]?.religion;
     isEmployeeSpouseExist = selectedPersonalInfo[indexToEdit]?.employeeSpouseEmployment;
     isNoChildrenExist = selectedPersonalInfo[indexToEdit]?.noChildren;
   } else {
     isReligionExist = "";
     isEmployeeSpouseExist = "";
     isNoChildrenExist = "";
     isIdExist = "";
   }


  const [id] = useState(isIdExist ? isIdExist : uniqueId);


  const [religion, setReligion] = useState(
    isReligionExist ? isReligionExist : ""
  );

  const [employeeSpouseEmployment, setEmployeeSpouseEmployment] = useState(
    isEmployeeSpouseExist ? isEmployeeSpouseExist : ""
  );

  const [noChildren, setNoChildren] = useState(
    isNoChildrenExist ? isNoChildrenExist : ""
  );

  const [religionError, setReligionError] = useState("");
  const [employeeSpouseError, setEmployeeSpouseError] = useState("");
  const [noChildrenError, setNoChildrenError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate first name and last name
    if (religion === "") {
      setReligionError("Religion is required.");
      return;
    }
    if (employeeSpouseEmployment === "") {
      setEmployeeSpouseError("Employee Spouse is required.");
      return;
    }
    if (noChildren === "") {
      setNoChildrenError("Number of children is required.");
      return;
    }

    // Clear any existing error messages
    setReligionError("");
    setEmployeeSpouseError("");
    setNoChildrenError("");
    const personalInfo = {
      id,
      employeeId,
      religion,
      employeeSpouseEmployment,
      noChildren,
    };
    if (isIdExist) {
      dispatchPersonalInfo({ type: "update", payload: personalInfo });
    } else {
      dispatchPersonalInfo({ type: "push", payload: personalInfo });
    }
    setGlobalState("showPersonalInfoModal", false);
  };

  const handleReligionChange = (e) => {
    setReligion(e.target.value);
    setReligionError("");
  };

  const handleEmployeeSpouseChange = (e) => {
    setEmployeeSpouseEmployment(e.target.value);
    setEmployeeSpouseError("");
  };

  const handleNoChildrenChange = (e) => {
    setNoChildren(e.target.value);
    setNoChildrenError("");
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
                      ? "Edit Personal Information"
                      : "Add Personal Information"}
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
                      setGlobalState("showPersonalInfoModal", false)
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
                          <label className="col-form-label">
                            Religion <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control floating"
                            type="text"
                            placeholder="Religion"
                            value={religion}
                            onChange={handleReligionChange}
                          />
                          {religionError && (
                            <p className="error-message">{religionError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Employment of spouse{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control floating"
                            type="text"
                            placeholder="Employment of spouse"
                            value={employeeSpouseEmployment}
                            onChange={handleEmployeeSpouseChange}
                          />
                          {employeeSpouseError && (
                            <p className="error-message">
                              {employeeSpouseError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            No. of children{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control floating"
                            type="text"
                            placeholder="No. of children"
                            value={noChildren}
                            onChange={handleNoChildrenChange}
                          />
                          {noChildrenError && (
                            <p className="error-message">{noChildrenError}</p>
                          )}
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
          deleteAction={dispatchPersonalInfo}
          indexToDelete={indexToEdit}
          dispatch={selectedPersonalInfo}
          modalTitle={"Personal Info"}
        />
      )}
    </>
  );
};

export default AddPersonalInfo;
