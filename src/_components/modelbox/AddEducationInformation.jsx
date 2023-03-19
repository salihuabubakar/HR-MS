import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
  Card,
} from "../../_components/modelbox/Addemployee.style";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "./DeleteModal";

import { HtmlDateInput } from "./styles";

const AddEducationInformation = ({
  dispatchEduInfo,
  eduInformationIndex,
  emid,
  emIndex,
  fieldIndex
}) => {
  const [selectedEducationalInfo] = useGlobalState("selectedEducationalInfo");
  const [deleteModal] = useGlobalState("deleteModal");
  const [inputFields, setInputFields] = useState([
    {
      institution: selectedEducationalInfo[eduInformationIndex]?.inputFields[fieldIndex]?.institution 
        ? selectedEducationalInfo[eduInformationIndex]?.inputFields[fieldIndex]?.institution 
        : "",
      degree: selectedEducationalInfo[eduInformationIndex]?.inputFields[fieldIndex]?.degree 
        ? selectedEducationalInfo[eduInformationIndex]?.inputFields[fieldIndex]?.degree 
        :"",
      startingDate: selectedEducationalInfo[eduInformationIndex]?.inputFields[fieldIndex]?.startingDate 
        ? selectedEducationalInfo[eduInformationIndex]?.inputFields[fieldIndex]?.startingDate 
        :"",
      completeDate: selectedEducationalInfo[eduInformationIndex]?.inputFields[fieldIndex]?.completeDate 
        ? selectedEducationalInfo[eduInformationIndex]?.inputFields[fieldIndex]?.completeDate 
        :"",
    },
  ]);

  const idIsTrue = selectedEducationalInfo[eduInformationIndex]?.id;

  const [id] = useState(
    selectedEducationalInfo[eduInformationIndex]?.id
      ? selectedEducationalInfo[eduInformationIndex]?.id
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
      dispatchEduInfo({ type: "update", payload: educationalInfo });
    } else {
      dispatchEduInfo({ type: "push", payload: educationalInfo });
    }
    setGlobalState("showEducationInformationModal", false);
  };

  const handleDelete = () => {
    setGlobalState("deleteModal", true);
  };

  const handleInputChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = {
      institution: "",
      degree: "",
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
                                <label className="focus-label">Institute</label>
                                <input
                                  type="text"
                                  className="form-control floating"
                                  placeholder="Institute"
                                  name="institution"
                                  value={value?.institution}
                                  onChange={(event) => {
                                    handleInputChange(index, event);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="focus-label">Degree</label>
                                <input
                                  type="text"
                                  className="form-control floating"
                                  placeholder="Degree"
                                  name="degree"
                                  value={value?.degree}
                                  onChange={(event) => {
                                    handleInputChange(index, event);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="col-form-label">
                                  Starting Date
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
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="col-form-label">
                                  Complete Date
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
