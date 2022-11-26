import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
  Card,
} from "../../_components/modelbox/Addemployee.style";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";

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
    <PopupWrapper className=" custom-modal" role="dialog">
      <PopupOverlay />
      <PopupContainer className="" role="document">
        <Card className="card-content">
          <div className="card-header">
            <h5 className="card-title">
              {idIsTrue
                ? "Edit Experience Informations"
                : "Add Experience Informations"}
            </h5>
            <div className="btn-container">
              {idIsTrue && (
                <button
                  style={{ backgroundColor: "#ff9b44", border: "none" }}
                  className="delete"
                  type="submit"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
              <button
                style={{ backgroundColor: "#ff9b44", border: "none" }}
                className="closeX"
                type="button"
                onClick={() => setGlobalState("showExperienceModal", false)}
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
                      </h3>
                      <div className="col-sm">
                        <div className="right">
                          <label className="label">Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Company Name"
                            name="companyName"
                            value={value?.companyName}
                            onChange={(event) => {
                              handleInputChange(index, event);
                            }}
                          />
                        </div>

                        <div className="">
                          <label className="label">Location</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Location"
                            name="location"
                            value={value?.location}
                            onChange={(event) => {
                              handleInputChange(index, event);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-sm">
                        <div className="right">
                          <label className="label">Job Position</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Job Position"
                            name="jobPosition"
                            value={value?.jobPosition}
                            onChange={(event) => {
                              handleInputChange(index, event);
                            }}
                          />
                        </div>
                        <div className="">
                          <label className="label">
                            Period From <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control datetimepicker"
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

                      <div className="col-sm">
                        <div className="">
                          <label className="label">
                            Period To <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control datetimepicker"
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
export default AddExpModal;
