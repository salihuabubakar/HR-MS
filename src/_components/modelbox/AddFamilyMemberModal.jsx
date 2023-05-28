import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
  Card,
} from "../../_components/modelbox/Addemployee.style";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import { v4 as uuidv4 } from "uuid";
import "./style.css";

import DeleteModal from "./DeleteModal";
const AddFamilyMemberModal = ({
  dispatchFamilyMemberInfo,
  familyMembInformationIndex,
  employeeId,
  familyMembfieldIndex,
}) => {
  const uniqueId = uuidv4();
  const [selectedFamilyMemberInfo] = useGlobalState("selectedFamilyMemberInfo");
  const [deleteModal] = useGlobalState("deleteModal");
  const [inputFields, setInputFields] = useState([
    {
      name: selectedFamilyMemberInfo[familyMembInformationIndex]?.inputFields[
        familyMembfieldIndex
      ]?.name
        ? selectedFamilyMemberInfo[familyMembInformationIndex]?.inputFields[
            familyMembfieldIndex
          ]?.name
        : "",
      relationship: selectedFamilyMemberInfo[familyMembInformationIndex]
        ?.inputFields[familyMembfieldIndex]?.relationship
        ? selectedFamilyMemberInfo[familyMembInformationIndex]?.inputFields[
            familyMembfieldIndex
          ]?.relationship
        : "",
      dateOfBirth: selectedFamilyMemberInfo[familyMembInformationIndex]
        ?.inputFields[familyMembfieldIndex]?.dateOfBirth
        ? selectedFamilyMemberInfo[familyMembInformationIndex]?.inputFields[
            familyMembfieldIndex
          ]?.dateOfBirth
        : "",
      phone: selectedFamilyMemberInfo[familyMembInformationIndex]?.inputFields[
        familyMembfieldIndex
      ]?.phone
        ? selectedFamilyMemberInfo[familyMembInformationIndex]?.inputFields[
            familyMembfieldIndex
          ]?.phone
        : "",
      nameError: "",
      relationshipError: "",
      phoneError: "",
    },
  ]);

  const idIsTrue = selectedFamilyMemberInfo[familyMembInformationIndex]?.id;

  const [id] = useState(
    selectedFamilyMemberInfo[familyMembInformationIndex]?.id
      ? selectedFamilyMemberInfo[familyMembInformationIndex]?.id
      : uniqueId
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for empty fields
    const isAnyFieldEmpty = inputFields.some(
      (field) =>
        field.name.trim() === "" ||
        field.relationship.trim() === "" ||
        field.phone.trim() === ""
    );
    if (isAnyFieldEmpty) {
      // Set error for empty fields
      setInputFields((prevInputFields) =>
        prevInputFields.map((field) => {
          const updatedField = { ...field };

          if (field.name.trim() === "") {
            updatedField.nameError = "Name is required";
          }

          if (field.relationship.trim() === "") {
            updatedField.relationshipError = "Relationship is required";
          }

          if (field.phone.trim() === "") {
            updatedField.phoneError = "Phone is required";
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
        dispatchFamilyMemberInfo({ type: "update", payload: educationalInfo });
      } else {
        dispatchFamilyMemberInfo({ type: "push", payload: educationalInfo });
      }
    });

    setGlobalState("showFamilyMenberModal", false);
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
      name: "",
      relationship: "",
      dateOfBirth: "",
      phone: "",
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
                      ? "Edit Family Information"
                      : "Add Family Information"}
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
                      setGlobalState("showFamilyMenberModal", false)
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
                              Family Information
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
                                  Name <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control floating"
                                  placeholder="Name"
                                  name="name"
                                  value={value?.name}
                                  onChange={(event) => {
                                    handleInputChange(index, event);
                                  }}
                                />
                                {value?.nameError && (
                                  <span className="error-message">
                                    {value?.nameError}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="focus-label">
                                  Relationship{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control floating"
                                  placeholder="Relationship"
                                  name="relationship"
                                  value={value?.relationship}
                                  onChange={(event) => {
                                    handleInputChange(index, event);
                                  }}
                                />
                                {value?.relationshipError && (
                                  <span className="error-message">
                                    {value?.relationshipError}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="col-form-label">
                                  phone Number{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control floating"
                                  type="text"
                                  placeholder="Phone"
                                  name="phone"
                                  value={value?.phone}
                                  onChange={(event) => {
                                    handleInputChange(index, event);
                                  }}
                                />
                                {value?.phoneError && (
                                  <span className="error-message">
                                    {value?.phoneError}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="col-form-label">
                                  Date Of Birth
                                </label>
                                <div>
                                  <input
                                    type="date"
                                    className="form-control floating datetimepicker"
                                    placeholder="Date Of Birth"
                                    name="dateOfBirth"
                                    value={value?.dateOfBirth}
                                    onChange={(event) => {
                                      handleInputChange(index, event);
                                    }}
                                  />
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
          deleteAction={dispatchFamilyMemberInfo}
          indexToDelete={familyMembInformationIndex}
          dispatch={selectedFamilyMemberInfo}
          modalTitle={"Family Info"}
        />
      )}
    </>
  );
};
export default AddFamilyMemberModal;