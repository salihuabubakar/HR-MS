import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
} from "../../_components/modelbox/Addemployee.style";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "./DeleteModal";
import { v4 as uuidv4 } from "uuid";
import "./style.css"

const AddEducationInformation = ({
  dispatchEduInfo,
  eduInformationIndex,
  employeeId,
  fieldIndex
}) => {
  const uniqueId = uuidv4();
  const [selectedEducationalInfo] = useGlobalState("selectedEducationalInfo");
  const [deleteModal] = useGlobalState("deleteModal");
  const [inputFields, setInputFields] = useState([
    {
      institution: selectedEducationalInfo[eduInformationIndex]?.inputFields[
        fieldIndex
      ]?.institution
        ? selectedEducationalInfo[eduInformationIndex]?.inputFields[fieldIndex]
            ?.institution
        : "",
      qualification: selectedEducationalInfo[eduInformationIndex]?.inputFields[
        fieldIndex
      ]?.qualification
        ? selectedEducationalInfo[eduInformationIndex]?.inputFields[fieldIndex]
            ?.qualification
        : "",
      startingDate: selectedEducationalInfo[eduInformationIndex]?.inputFields[
        fieldIndex
      ]?.startingDate
        ? selectedEducationalInfo[eduInformationIndex]?.inputFields[fieldIndex]
            ?.startingDate
        : "",
      completeDate: selectedEducationalInfo[eduInformationIndex]?.inputFields[
        fieldIndex
      ]?.completeDate
        ? selectedEducationalInfo[eduInformationIndex]?.inputFields[fieldIndex]
            ?.completeDate
        : "",
      institutionError: "",
      qualificationError: "",
      startingDateError: "",
      completeDateError: "",
    },
  ]);

  const idIsTrue = selectedEducationalInfo[eduInformationIndex]?.id;

  const [id] = useState(
    selectedEducationalInfo[eduInformationIndex]?.id
      ? selectedEducationalInfo[eduInformationIndex]?.id
      : uniqueId
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for empty fields
    const isAnyFieldEmpty = inputFields.some(
      (field) =>
        field.institution.trim() === "" ||
        field.qualification.trim() === "" ||
        field.startingDate.trim() === "" ||
        field.completeDate.trim() === ""
    );

    if (isAnyFieldEmpty) {
      // Set error for empty fields
      setInputFields((prevInputFields) =>
        prevInputFields.map((field) => {
          const updatedField = { ...field };

          if (field.institution.trim() === "") {
            updatedField.institutionError = "Institution is required";
          }

          if (field.qualification.trim() === "") {
            updatedField.qualificationError = "Qualification is required";
          }

          if (field.startingDate.trim() === "") {
            updatedField.startingDateError = "Starting date is required";
          }

          if (field.completeDate.trim() === "") {
            updatedField.completeDateError = "Complete date is required";
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
        dispatchEduInfo({ type: "update", payload: educationalInfo });
      } else {
        dispatchEduInfo({ type: "push", payload: educationalInfo });
      }
    });
    setGlobalState("showEducationInformationModal", false);
  };

  const handleDelete = () => {
    setGlobalState("deleteModal", true);
  };

  const addFields = () => {
    let newfield = {
      institution: "",
      qualification: "",
      startingDate: "",
      completeDate: "",
    };

    setInputFields([...inputFields, newfield]);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
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
                      ? "Edit Education Information"
                      : "Add Education Information"}
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
                    onClick={() =>
                      setGlobalState("showEducationInformationModal", false)
                    }
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
                              Education Information
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
                                  Institution{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control floating"
                                  placeholder="Institution"
                                  name="institution"
                                  value={value?.institution}
                                  onChange={(event) => {
                                    handleInputChange(index, event);
                                  }}
                                />
                                {value?.institutionError && (
                                  <span className="error-message">
                                    {value?.institutionError}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="focus-label">
                                  Qualification{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control floating"
                                  placeholder="Qualification"
                                  name="qualification"
                                  value={value?.qualification}
                                  onChange={(event) => {
                                    handleInputChange(index, event);
                                  }}
                                />
                                {value?.qualificationError && (
                                  <span className="error-message">
                                    {value?.qualificationError}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="col-form-label">
                                  Starting Date{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <div>
                                  <input
                                    type="date"
                                    className="form-control floating datetimepicker"
                                    placeholder="Starting Date"
                                    name="startingDate"
                                    value={value?.startingDate}
                                    onChange={(event) => {
                                      handleInputChange(index, event);
                                    }}
                                  />
                                  {value?.startingDateError && (
                                    <span className="error-message">
                                      {value?.startingDateError}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="col-form-label">
                                  Complete Date{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <div>
                                  <input
                                    className="form-control floating datetimepicker"
                                    type="date"
                                    placeholder="Complete Date"
                                    name="completeDate"
                                    value={value?.completeDate}
                                    onChange={(event) => {
                                      handleInputChange(index, event);
                                    }}
                                  />
                                  {value?.completeDateError && (
                                    <span className="error-message">
                                      {value?.completeDateError}
                                    </span>
                                  )}
                                </div>
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
          deleteAction={dispatchEduInfo}
          indexToDelete={eduInformationIndex}
          dispatch={selectedEducationalInfo}
          modalTitle={"Education Info"}
        />
      )}
    </>
  );
};
export default AddEducationInformation;
