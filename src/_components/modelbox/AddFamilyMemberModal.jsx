import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
  Card,
} from "../../_components/modelbox/Addemployee.style";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import { HtmlDateInput } from "./styles";

const AddFamilyMemberModal = ({
  dispatchFamilyMemb,
  familyMembInformationIndex,
  emid,
  emIndex,
  familyMembfieldIndex,
}) => {
  const [selectedFamilyMemberInfo] = useGlobalState("selectedFamilyMemberInfo");
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
    },
  ]);

  const idIsTrue = selectedFamilyMemberInfo[familyMembInformationIndex]?.id;

  const [id] = useState(
    selectedFamilyMemberInfo[familyMembInformationIndex]?.id
      ? selectedFamilyMemberInfo[familyMembInformationIndex]?.id
      : Date.now()
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const educationalInfo = {
      id,
      emIndex,
      emid,
      inputFields,
    };
    if (idIsTrue) {
      dispatchFamilyMemb({ type: "update", payload: educationalInfo });
    } else {
      dispatchFamilyMemb({ type: "push", payload: educationalInfo });
    }
    setGlobalState("showFamilyMenberModal", false);
  };

  const handleDelete = () => {
    dispatchFamilyMemb({
      type: "delete",
      payload: selectedFamilyMemberInfo[familyMembInformationIndex],
    });
    setGlobalState("showFamilyMenberModal", false);
  };

  const handleInputChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
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
          <PopupContainer
            top={true}
            className="custom-modal"
            role="dialog"
          >
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
                                  <a
                                    className="delete-icon"
                                    onClick={() => removeFields(index)}
                                  >
                                    <i className="fa fa-trash-o" />
                                  </a>
                                </span>
                              )}
                            </h5>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="focus-label">Name</label>
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
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="focus-label">
                                  Relationship
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
    </>
  );
};
export default AddFamilyMemberModal;