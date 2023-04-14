import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import {
  initResident,
  savedResidentReducer,
} from "../../utils/localStorage";
import Select from "react-select";

const AddSubTask = ({
  dispatchSubTaskTitle,
  indexToEdit,
  taskId,
  dateTimeCreated,
}) => {
  const [selectedSubTaskInfo] = useGlobalState("selectedSubTaskInfo");

  const [residentAcct, dispatchResidentAcct] = useReducer(
    savedResidentReducer,
    [],
    initResident
  );
  const [residentAccts, setResidentAccts] = useState();
  useEffect(() => {
    setResidentAccts(residentAcct);
  }, [residentAcct]);

  const [subTask, setSubTask] = useState(
    selectedSubTaskInfo[indexToEdit]?.subTask
      ? selectedSubTaskInfo[indexToEdit]?.subTask
      : ""
  );

  const [resident, setResident] = useState(
    selectedSubTaskInfo[indexToEdit]?.resident
      ? selectedSubTaskInfo[indexToEdit]?.resident
      : ""
  );

  const [checkToComplete, setCheckToComplete] = useState(
    selectedSubTaskInfo[indexToEdit]?.checkToComplete
      ? selectedSubTaskInfo[indexToEdit]?.checkToComplete
      : ""
  );

  const [id, setId] = useState(
    selectedSubTaskInfo[indexToEdit]?.id
      ? selectedSubTaskInfo[indexToEdit]?.id
      : Date.now()
  );

  const [dateCreated, setDateCreated] = useState();

  const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const permanentDate = today.toLocaleDateString("en-GB", options);

  useEffect(() => {
      if (dateTimeCreated) {
        setDateCreated(dateTimeCreated);
      } else {
        setDateCreated(permanentDate);
      }
    },[]
  );

  let dateUpdated = permanentDate;

  const handleSubmit = (e) => {
    e.preventDefault();
    const subTaskInfo = {
      id,
      dateCreated,
      dateUpdated,
      taskId,
      subTask,
      resident,
      checkToComplete,
    };
    if (selectedSubTaskInfo[indexToEdit]?.id) {
      dispatchSubTaskTitle({ type: "update", payload: subTaskInfo });
    } else {
      dispatchSubTaskTitle({ type: "push", payload: subTaskInfo });
    }
    setGlobalState("showSubTaskModal", false);
  };

  const customSelectStyles = {
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: state.isSelected && "#FF9B44",
      color: state.isSelected && "#262626",
      "&:hover": {
        backgroundColor: "#FF9B44",
        color: "#262626",
      },
    }),
  };

  const handleResidentChange = (event) => {
    setResident(event);
  };

  const residents = [];
  residentAccts?.map((resident) => {
    residents.push({
      value: resident.id,
      label: resident.residentName,
      image: resident.image,
    });
  });

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedSubTaskInfo[indexToEdit]?.id
                      ? "Edit Task"
                      : "Add Task"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showSubTaskModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">
                            Task <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="SubTask"
                            value={subTask}
                            onChange={(e) => setSubTask(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">
                            Select Service Worker{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={[
                              selectedSubTaskInfo[indexToEdit]?.resident[0],
                              selectedSubTaskInfo[indexToEdit]?.resident[1],
                              selectedSubTaskInfo[indexToEdit]?.resident[2],
                              selectedSubTaskInfo[indexToEdit]?.resident[3],
                              selectedSubTaskInfo[indexToEdit]?.resident[4],
                              selectedSubTaskInfo[indexToEdit]?.resident[5],
                              selectedSubTaskInfo[indexToEdit]?.resident[6],
                              selectedSubTaskInfo[indexToEdit]?.resident[7],
                              selectedSubTaskInfo[indexToEdit]?.resident[8],
                              selectedSubTaskInfo[indexToEdit]?.resident[9],
                              selectedSubTaskInfo[indexToEdit]?.resident[10],
                            ]}
                            onChange={handleResidentChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={residents}
                            styles={customSelectStyles}
                            placeholder="Select Resident"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          {selectedSubTaskInfo[indexToEdit]?.id && (
                            <div className="form-group form-focus focused">
                              <input
                                checked={
                                  selectedSubTaskInfo[indexToEdit]?.id
                                    ? checkToComplete
                                    : ""
                                }
                                type="checkbox"
                                name="check"
                                id=""
                                value={checkToComplete}
                                onChange={(e) =>
                                  setCheckToComplete(e.target.checked)
                                }
                              />{" "}
                              {selectedSubTaskInfo[indexToEdit]?.checkToComplete
                                ? "Marked as completed"
                                : "Mark as completed"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {selectedSubTaskInfo[indexToEdit]?.id
                          ? "Update"
                          : "Save"}
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

export default AddSubTask;
