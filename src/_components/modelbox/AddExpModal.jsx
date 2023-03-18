import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
  Card,
} from "../../_components/modelbox/Addemployee.style";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import { HtmlDateInput } from "./styles";

const AddExpModal = ({
  dispatchExpInfo,
  expInformationIndex,
  emid,
  emIndex,
  expfieldIndex,
}) => {
  const [selectedExperienceModal] = useGlobalState("selectedExperienceModal");
  const [inputFields, setInputFields] = useState([
    {
      companyName: selectedExperienceModal[expInformationIndex]?.inputFields[
        expfieldIndex
      ]?.companyName
        ? selectedExperienceModal[expInformationIndex]?.inputFields[expfieldIndex]
            ?.companyName
        : "",
      location: selectedExperienceModal[expInformationIndex]?.inputFields[
        expfieldIndex
      ]?.location
        ? selectedExperienceModal[expInformationIndex]?.inputFields[expfieldIndex]
            ?.location
        : "",
      jobPosition: selectedExperienceModal[expInformationIndex]?.inputFields[
        expfieldIndex
      ]?.jobPosition
        ? selectedExperienceModal[expInformationIndex]?.inputFields[expfieldIndex]
            ?.jobPosition
        : "",
      periodFrom: selectedExperienceModal[expInformationIndex]?.inputFields[
        expfieldIndex
      ]?.periodFrom
        ? selectedExperienceModal[expInformationIndex]?.inputFields[expfieldIndex]
            ?.periodFrom
        : "",
      periodTo: selectedExperienceModal[expInformationIndex]?.inputFields[
        expfieldIndex
      ]?.periodTo
        ? selectedExperienceModal[expInformationIndex]?.inputFields[expfieldIndex]
            ?.periodTo
        : "",
    },
  ]);

  const idIsTrue = selectedExperienceModal[expInformationIndex]?.id;

  const [id] = useState(
    selectedExperienceModal[expInformationIndex]?.id
      ? selectedExperienceModal[expInformationIndex]?.id
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
      dispatchExpInfo({ type: "update", payload: educationalInfo });
    } else {
      dispatchExpInfo({ type: "push", payload: educationalInfo });
    }
    setGlobalState("showExperienceModal", false);
  };

  const handleDelete = () => {
    dispatchExpInfo({
      type: "delete",
      payload: selectedExperienceModal[expInformationIndex],
    });
    setGlobalState("showExperienceModal", false);
  };

  const handleInputChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
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
                              </div>
                            </div>
                            <div className="col-sm-6">
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
export default AddExpModal;
