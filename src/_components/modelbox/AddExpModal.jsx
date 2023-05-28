import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
  Card,
} from "../../_components/modelbox/Addemployee.style";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "./DeleteModal";
import { v4 as uuidv4 } from "uuid";

const AddExpModal = ({
  dispatchExpInfo,
  expInformationIndex,
  employeeId,
  expfieldIndex,
}) => {
  const uniqueId = uuidv4();
  const [selectedExperienceModal] = useGlobalState("selectedExperienceModal");
  const [deleteModal] = useGlobalState("deleteModal");
  const [inputFields, setInputFields] = useState([
    {
      companyName: selectedExperienceModal[expInformationIndex]?.inputFields[
        expfieldIndex
      ]?.companyName
        ? selectedExperienceModal[expInformationIndex]?.inputFields[
            expfieldIndex
          ]?.companyName
        : "",
      location: selectedExperienceModal[expInformationIndex]?.inputFields[
        expfieldIndex
      ]?.location
        ? selectedExperienceModal[expInformationIndex]?.inputFields[
            expfieldIndex
          ]?.location
        : "",
      jobPosition: selectedExperienceModal[expInformationIndex]?.inputFields[
        expfieldIndex
      ]?.jobPosition
        ? selectedExperienceModal[expInformationIndex]?.inputFields[
            expfieldIndex
          ]?.jobPosition
        : "",
      periodFrom: selectedExperienceModal[expInformationIndex]?.inputFields[
        expfieldIndex
      ]?.periodFrom
        ? selectedExperienceModal[expInformationIndex]?.inputFields[
            expfieldIndex
          ]?.periodFrom
        : "",
      periodTo: selectedExperienceModal[expInformationIndex]?.inputFields[
        expfieldIndex
      ]?.periodTo
        ? selectedExperienceModal[expInformationIndex]?.inputFields[
            expfieldIndex
          ]?.periodTo
        : "",
      companyNameError: "",
      locationError: "",
      jobPositionError: "",
      periodFromError: "",
      periodToError: "",
    },
  ]);

  const idIsTrue = selectedExperienceModal[expInformationIndex]?.id;

  const [id] = useState(
    selectedExperienceModal[expInformationIndex]?.id
      ? selectedExperienceModal[expInformationIndex]?.id
      : uniqueId
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for empty fields
    const isAnyFieldEmpty = inputFields.some(
      (field) =>
        field.companyName.trim() === "" ||
        field.location.trim() === "" ||
        field.jobPosition.trim() === "" ||
        field.periodFrom.trim() === "" ||
        field.periodTo.trim() === ""
    );
    if (isAnyFieldEmpty) {
      // Set error for empty fields
      setInputFields((prevInputFields) =>
        prevInputFields.map((field) => {
          const updatedField = { ...field };

          if (field.companyName.trim() === "") {
            updatedField.companyNameError = "Company Name is required";
          }

          if (field.location.trim() === "") {
            updatedField.locationError = "Location is required";
          }

          if (field.jobPosition.trim() === "") {
            updatedField.jobPositionError = "Job Position is required";
          }

          if (field.periodFrom.trim() === "") {
            updatedField.periodFromError = "Period From is required";
          }

          if (field.periodTo.trim() === "") {
            updatedField.periodToError = "Period To is required";
          }

          return updatedField;
        })
      );

      return;
    }
    //Proceed with form submission
    inputFields.forEach((field, i) => {
      const educationalInfo = {
        id: idIsTrue ? id : uniqueId + i,
        employeeId,
        inputFields: [field],
      };

      if (idIsTrue) {
        dispatchExpInfo({ type: "update", payload: educationalInfo });
      } else {
        dispatchExpInfo({ type: "push", payload: educationalInfo });
      }
    });
    setGlobalState("showExperienceModal", false);
  };

  const handleDelete = () => {
    setGlobalState("deleteModal", true);
  };

   const handleInputChange = (index, event) => {
     const { name, value } = event.target;

     setInputFields((prevInputFields) => {
       const updatedFields = [...prevInputFields];
       const field = updatedFields[index];

       // Update field value
       field[name] = value;

       // Clear corresponding error
       field[`${name}Error`] = "";

       return updatedFields;
     });
   };

  const addFields = () => {
    let newfield = {
      companyName: "",
      location: "",
      jobPosition: "",
      periodFrom: "",
      periodTo: "",
    };

    setInputFields([...inputFields, newfield]);
  };

  const removeFields = (index) => {
    const updatedFields = inputFields.filter((_, i) => i !== index);
    setInputFields(updatedFields);
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
                    {idIsTrue
                      ? "Edit Experience Informations"
                      : "Add Experience Informations"}
                  </h5>
                  {idIsTrue && (
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
                    onClick={() => setGlobalState("showExperienceModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      {inputFields.map((value, index) => {
                        return (
                          <div key={index} className="row Primary">
                            <h5 className="section-title">
                              Experience Informations
                              {idIsTrue ? (
                                ""
                              ) : (
                                <span>
                                  {index != 0 && (
                                    <a
                                      className="delete-icon"
                                      onClick={() => removeFields(index)}
                                    >
                                      <i className="fa fa-trash-o" />
                                    </a>
                                  )}
                                </span>
                              )}
                            </h5>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="focus-label">
                                  Company Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control floating"
                                  placeholder="Company Name"
                                  name="companyName"
                                  value={value?.companyName}
                                  onChange={(event) => {
                                    handleInputChange(index, event);
                                  }}
                                />
                                {value?.companyNameError && (
                                  <span className="error-message">
                                    {value?.companyNameError}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="focus-label">Location</label>
                                <input
                                  type="text"
                                  className="form-control floating"
                                  placeholder="Location"
                                  name="location"
                                  value={value?.location}
                                  onChange={(event) => {
                                    handleInputChange(index, event);
                                  }}
                                />
                                {value?.locationError && (
                                  <span className="error-message">
                                    {value?.locationError}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="col-form-label">
                                  Period From
                                </label>
                                <div>
                                  <input
                                    className="form-control floating datetimepicker"
                                    type="date"
                                    placeholder="Period From"
                                    name="periodFrom"
                                    value={value?.periodFrom}
                                    onChange={(event) => {
                                      handleInputChange(index, event);
                                    }}
                                  />
                                  {value?.periodFromError && (
                                    <span className="error-message">
                                      {value?.periodFromError}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="col-form-label">
                                  Period To
                                </label>
                                <div>
                                  <input
                                    className="form-control floating datetimepicker"
                                    type="date"
                                    placeholder="Period To"
                                    name="periodTo"
                                    value={value?.periodTo}
                                    onChange={(event) => {
                                      handleInputChange(index, event);
                                    }}
                                  />
                                  {value?.periodToError && (
                                    <span className="error-message">
                                      {value?.periodToError}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="form-group">
                                <label className="focus-label">
                                  Job Position
                                </label>
                                <input
                                  type="text"
                                  className="form-control floating"
                                  placeholder="Job Position"
                                  name="jobPosition"
                                  value={value?.jobPosition}
                                  onChange={(event) => {
                                    handleInputChange(index, event);
                                  }}
                                />
                                {value?.jobPositionError && (
                                  <span className="error-message">
                                    {value?.jobPositionError}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {!idIsTrue ? (
                      <div className="add-more" onClick={addFields}>
                        <a>
                          <i className="fa fa-plus-circle" /> Add More Field
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {idIsTrue ? "Update" : "Save"}
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
          deleteAction={dispatchExpInfo}
          indexToDelete={expInformationIndex}
          dispatch={selectedExperienceModal}
          modalTitle={"Experience Info"}
        />
      )}
    </>
  );
};
export default AddExpModal;
