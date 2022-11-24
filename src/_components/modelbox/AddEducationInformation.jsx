import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
  Card,
} from "../../_components/modelbox/Addemployee.style";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import Select from "react-select";

const AddEducationInformation = ({
  dispatchEduInfo,
  eduInformationIndex,
  emid,
  emIndex,
}) => {
  const [selectedEducationalInfo] = useGlobalState("selectedEducationalInfo");

  const [id] = useState(
    selectedEducationalInfo[eduInformationIndex]?.id
      ? selectedEducationalInfo[eduInformationIndex]?.id
      : Date.now()
  );

  const [institution, setInstitution] = useState(
    selectedEducationalInfo[eduInformationIndex]?.institution
      ? selectedEducationalInfo[eduInformationIndex]?.institution
      : ""
  );

  const [degree, setDegree] = useState(
    selectedEducationalInfo[eduInformationIndex]?.degree
      ? selectedEducationalInfo[eduInformationIndex]?.degree
      : ""
  );

  const [startingDate, setStartingDate] = useState(
    selectedEducationalInfo[eduInformationIndex]?.startingDate
      ? selectedEducationalInfo[eduInformationIndex]?.startingDate
      : ""
  );

  const [completeDate, setCompleteDate] = useState(
    selectedEducationalInfo[eduInformationIndex]?.completeDate
      ? selectedEducationalInfo[eduInformationIndex]?.completeDate
      : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const educationalInfo = {
      id,
      emIndex,
      emid,
      institution,
      degree,
      startingDate,
      completeDate,
    };
    if (selectedEducationalInfo[eduInformationIndex]?.id) {
      dispatchEduInfo({ type: "update", payload: educationalInfo });
    } else {
      dispatchEduInfo({ type: "push", payload: educationalInfo });
    }
    setGlobalState("showEducationInformationModal", false);
    // if (selectedProfileInfo[indexToEdit]?.id) {
    //   dispatchUserAcct({ type: "update", payload: profileInfo });
    // }
    // setGlobalState("showModal", false);
  };

  const handleStartingDate = (event) => {
    const d = event.target.value;
    console.log("date: ", d);
    setStartingDate(d);
  };

  const handleCompleteDate = (event) => {
    const d = event.target.value;
    console.log("date: ", d);
    setCompleteDate(d);
  };

  const handleDelete = () => {
    dispatchEduInfo({
      type: "delete",
      payload: selectedEducationalInfo[eduInformationIndex],
    });
    setGlobalState("showEducationInformationModal", false);
  };




  const [bulkOptions, setBulkOptions] = useState([]);


    const handleAddBulkPrice = () => {
      setBulkOptions(prevBulkOption => {
        const copyOfOldBulkOption = [...prevBulkOption];
        copyOfOldBulkOption.push({
          quantity: 0,
          price: "",
        });
        return copyOfOldBulkOption;
      });
    };

    const updateBulkOption = (index, property, value) => {
      setBulkOptions(prevBulkOption => {
        const copyOfOldBulkOption = [...prevBulkOption];
        if (value === "number" && property === "price") {
          copyOfOldBulkOption[index].quantity = value;
        } else if (property === "price" && value === "string") {
          copyOfOldBulkOption[index].price = value;
        }

        return copyOfOldBulkOption;
      });
    };

    const handleBulkOptionDelete = (index) => {
      setBulkOptions(prevBulkOption => {
        if (prevBulkOption.length > 1) {
          const copyOfOldBulkOption = [...prevBulkOption];
          copyOfOldBulkOption.splice(index, 1);
          return copyOfOldBulkOption;
        } else {
          return prevBulkOption;
        }
      });
    };




  return (
    <PopupWrapper className=" custom-modal" role="dialog">
      <PopupOverlay />
      <PopupContainer className="" role="document">
        <Card className="card-content">
          <div className="card-header">
            <h5 className="card-title">
              {selectedEducationalInfo[eduInformationIndex]?.id
                ? "Edit Education Information"
                : "Add Education Information"}
            </h5>
            <div className="btn-container">
              {selectedEducationalInfo[eduInformationIndex]?.id && (
                <button className="delete" type="submit" onClick={handleDelete}>
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
                {bulkOptions.map((val, index) => {
                  return (
                    <div key={index} className="Primary">
                      <h3>
                        Education Information{" "}
                        <span>
                          <a
                            className="delete-icon"
                            onClick={() => handleBulkOptionDelete(index)}
                          >
                            <i className="fa fa-trash-o" />
                          </a>
                        </span>
                      </h3>
                      <div className="col-sm">
                        <div className="right">
                          <label className="label">Institute</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Institute"
                            value={institution}
                            onChange={(event) =>
                              setInstitution(event.target.value)
                            }
                          />
                        </div>

                        <div className="">
                          <label className="label">Degree</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Degree"
                            value={degree}
                            onChange={(event) => setDegree(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-sm">
                        <div className="right">
                          <label className="label">Starting Date</label>
                          <input
                            type="date"
                            className="form-control datetimepicker"
                            placeholder="Starting Date"
                            value={startingDate}
                            onChange={handleStartingDate}
                          />
                        </div>
                        <div className="">
                          <label className="label">
                            Complete Date <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control datetimepicker"
                            type="date"
                            placeholder="Complete Date"
                            value={completeDate}
                            onChange={handleCompleteDate}
                          />
                        </div>
                      </div>
                    </div>
                    /* <div key={index}>
                        <input
                          type="number"
                          placeholder="Quantity"
                          value={val.quantity ? val.quantity : undefined}
                          onChange={(e) => {
                            updateBulkOption(index, "quantity", e.target.value);
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Price"
                          value={val.price}
                          onChange={(e) => {
                            updateBulkOption(index, "price", e.target.value);
                          }}
                        />
                        <a
                          className="delete-icon"
                          onClick={() => handleBulkOptionDelete(index)}
                        >
                          <i className="fa fa-trash-o" />
                        </a>
                      </div> */
                  );
                })}
                <div className="Primary">
                  <h3>Education Information</h3>
                  <div className="col-sm">
                    <div className="right">
                      <label className="label">Institute</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Institute"
                        value={institution}
                        onChange={(event) => setInstitution(event.target.value)}
                      />
                    </div>

                    <div className="">
                      <label className="label">Degree</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Degree"
                        value={degree}
                        onChange={(event) => setDegree(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-sm">
                    <div className="right">
                      <label className="label">Starting Date</label>
                      <input
                        type="date"
                        className="form-control datetimepicker"
                        placeholder="Starting Date"
                        value={startingDate}
                        onChange={handleStartingDate}
                      />
                    </div>
                    <div className="">
                      <label className="label">
                        Complete Date <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control datetimepicker"
                        type="date"
                        placeholder="Complete Date"
                        value={completeDate}
                        onChange={handleCompleteDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-more" onClick={handleAddBulkPrice}>
                <a>
                  <i className="fa fa-plus-circle" /> Add More Field
                </a>
              </div>

              <div className="submit-btn">
                <button onClick={handleSubmit} className="submit-Btn">
                  {selectedEducationalInfo[eduInformationIndex]?.id
                    ? "Update"
                    : "Save"}
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
