import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
  Card,
} from "../../_components/modelbox/Addemployee.style";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";

import { HtmlDateInput } from "./styles";

const AddEducationInformation = ({
  dispatchEduInfo,
  eduInformationIndex,
  emid,
  emIndex,
  fieldIndex
}) => {
  const [selectedEducationalInfo] = useGlobalState("selectedEducationalInfo");
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
    dispatchEduInfo({
      type: "delete",
      payload: selectedEducationalInfo[eduInformationIndex],
    });
    setGlobalState("showEducationInformationModal", false);
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
    <PopupWrapper className=" custom-modal" role="dialog">
      <PopupOverlay />
      <PopupContainer className="" role="document">
        <Card className="card-content">
          <div className="card-header">
            <h5 className="card-title">
              {idIsTrue
                ? "Edit Education Information"
                : "Add Education Information"}
            </h5>
            <div className="btn-container">
              {idIsTrue && (
                <button
                  className="delete"
                  type="submit"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
              <button
                className="closeX"
                type="button"
                onClick={() =>
                  setGlobalState("showEducationInformationModal", false)
                }
              >
                <span>×</span>
              </button>
            </div>
          </div>
          <div className="card-body">
            <form>
              <div className="row-">
                {inputFields.map((value, index) => {
                  return (
                    <div key={index} className="Primary">
                      <h3>
                        Education Information
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
                      </h3>
                      <div className="col-sm">
                        <div className="right form-group form-focus focused">
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

                        <div className="form-group form-focus focused">
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

                      <div className="col-sm">
                        <div className="right form-group form-focus focused">
                          <label className="focus-label">Starting Date</label>
                          <HtmlDateInput
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
                        <div className="form-group form-focus focused">
                          <label className="focus-label">
                            Complete Date <span className="text-danger">*</span>
                          </label>
                          <HtmlDateInput
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

              <div className="submit-btn">
                <button onClick={handleSubmit} className="submit-Btn">
                  {idIsTrue ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </Card>
      </PopupContainer>
    </PopupWrapper>
  );
};
export default AddEducationInformation;
