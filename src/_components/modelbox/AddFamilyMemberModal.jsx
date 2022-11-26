import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
  Card,
} from "../../_components/modelbox/Addemployee.style";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";

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
    <PopupWrapper className=" custom-modal" role="dialog">
      <PopupOverlay />
      <PopupContainer className="" role="document">
        <Card className="card-content">
          <div className="card-header">
            <h5 className="card-title">
              {idIsTrue ? "Edit Family Information" : "Add Family Information"}
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
                onClick={() => setGlobalState("showFamilyMenberModal", false)}
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
                      </h3>
                      <div className="col-sm">
                        <div className="right">
                          <label className="label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            name="name"
                            value={value?.name}
                            onChange={(event) => {
                              handleInputChange(index, event);
                            }}
                          />
                        </div>

                        <div className="">
                          <label className="label">Relationship</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Relationship"
                            name="relationship"
                            value={value?.relationship}
                            onChange={(event) => {
                              handleInputChange(index, event);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-sm">
                        <div className="right">
                          <label className="label">Date Of Birth</label>
                          <input
                            type="date"
                            className="form-control datetimepicker"
                            placeholder="Date Of Birth"
                            name="dateOfBirth"
                            value={value?.dateOfBirth}
                            onChange={(event) => {
                              handleInputChange(index, event);
                            }}
                          />
                        </div>
                        <div className="">
                          <label className="label">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
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
export default AddFamilyMemberModal;
