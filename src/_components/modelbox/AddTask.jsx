import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import {
  initUserAccount,
  savedUserAccountReducer,
} from "../../utils/localStorage";
import Select from "react-select";
import { RadioBtn } from "./styles";

const AddTask = ({
  dispatchTasks,
  indexToEdit,
}) => {
  const [selectedTaskInfo] = useGlobalState("selectedTaskInfo");

  const [userAcct, dispatchUserAcct] = useReducer(
    savedUserAccountReducer,
    [],
    initUserAccount
  );
  const [employeeAccts, setEmployeeAccts] = useState();
  useEffect(() => {
    setEmployeeAccts(userAcct);
  }, [userAcct]);

  const [taskTitle, setTaskTitle] = useState(
    selectedTaskInfo[indexToEdit]?.taskTitle
      ? selectedTaskInfo[indexToEdit]?.taskTitle
      : ""
  );

  const [taskType, setTaskType] = useState(
    selectedTaskInfo[indexToEdit]?.taskType
      ? selectedTaskInfo[indexToEdit]?.taskType
      : ""
  );

  const [timeAllocated, setTimeAllocated] = useState(
    selectedTaskInfo[indexToEdit]?.timeAllocated
      ? selectedTaskInfo[indexToEdit]?.timeAllocated
      : ""
  );

  const [description, setDescription] = useState(
    selectedTaskInfo[indexToEdit]?.description
      ? selectedTaskInfo[indexToEdit]?.description
      : ""
  );

  const [employee, setEmployee] = useState(
    selectedTaskInfo[indexToEdit]?.employee
      ? selectedTaskInfo[indexToEdit]?.employee
      : ""
  );

  const [taskPriority, setTaskPriority] = useState(
    selectedTaskInfo[indexToEdit]?.taskPriority
      ? selectedTaskInfo[indexToEdit]?.taskPriority
      : ""
  );

  const [taskStatus, setTaskStatus] = useState(
    selectedTaskInfo[indexToEdit]?.taskStatus
      ? selectedTaskInfo[indexToEdit]?.taskStatus
      : ""
  );

  const [manager, setManager] = useState(
    selectedTaskInfo[indexToEdit]?.manager
      ? selectedTaskInfo[indexToEdit]?.manager
      : ""
  );

  const [id, setId] = useState(
    selectedTaskInfo[indexToEdit]?.id ? selectedTaskInfo[indexToEdit]?.id : Date.now()
  );

  // let taskStatus = "In-progress";

  const priorityOptions = [
    { value: 1, label: "highest" },
    { value: 2, label: "medium" },
    { value: 3, label: "low" },
  ];

  const handlePriorityChange = (event) => {
    setTaskPriority(event);
  };

    const statusOptions = [
      { value: 1, label: "start" },
      { value: 2, label: "middle" },
      { value: 3, label: "finish" },
    ];

  const handleStatusChange = (event) => {
    setTaskStatus(event);
  };

  const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const dateCreated = today.toLocaleDateString("en-GB", options);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      taskTitle,
      taskType,
      timeAllocated,
      employee,
      description,
      manager,
      taskStatus,
      taskPriority,
      dateCreated,
      id,
    };
    if (selectedTaskInfo[indexToEdit]?.id) {
      dispatchTasks({ type: "update", payload: task });
    } else {
      dispatchTasks({ type: "push", payload: task });
    }
    setGlobalState("showTaskModal", false);
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

  const handleEmployeeChange = (event) => {
    setEmployee(event);
  };

  const users = [];
  employeeAccts?.map((user) => {
    users.push({
      value: user.id,
      label: user.firstName + " " + user.lastName,
      image: user.image,
      designation: user.designation
    });
  });

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
                    {selectedTaskInfo[indexToEdit]?.id
                      ? "Edit Task"
                      : "Add Task"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showTaskModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Task Title <span className="text-danger">*</span>
                          </label>
                          <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Task Title"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Manager <span className="text-danger">*</span>
                          </label>
                          <input
                            value={manager}
                            onChange={(e) => setManager(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Task Title"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Task-type <span className="text-danger">*</span>
                          </label>
                          <RadioBtn>
                            <input
                              type="radio"
                              name="task-type"
                              // checked={
                              //   selectedTaskInfo[indexToEdit]?.id ? taskType : ""
                              // }
                              id="paid"
                              value={"Paid Task"}
                              onChange={(e) => setTaskType(e.target.value)}
                            />
                            <label htmlFor="paid">
                              <span>Paid</span>
                            </label>
                            <input
                              type="radio"
                              name="task-type"
                              id="non-paid"
                              value={"Non-Paid Task"}
                              onChange={(e) => setTaskType(e.target.value)}
                            />
                            <label htmlFor="non-paid">
                              <span>Non-Paid</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Time Allocation{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={timeAllocated}
                            onChange={(e) => setTimeAllocated(e.target.value)}
                            className="form-control floating"
                            type="number"
                            placeholder="Time allocation e.g 5hr"
                            min={0}
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">
                            Description <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select Task Priority{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={
                              selectedTaskInfo
                                ? {
                                    value: taskPriority?.value,
                                    label: taskPriority?.label,
                                  }
                                : "Select Priority"
                            }
                            onChange={handlePriorityChange}
                            options={priorityOptions}
                            styles={customSelectStyles}
                            placeholder="Select Priority"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select Task Status{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={
                              selectedTaskInfo
                                ? {
                                    value: taskStatus?.value,
                                    label: taskStatus?.label,
                                  }
                                : "Select Status"
                            }
                            onChange={handleStatusChange}
                            options={statusOptions}
                            styles={customSelectStyles}
                            placeholder="Select Status"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select Employees{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={[
                              selectedTaskInfo[indexToEdit]?.employee[0],
                              selectedTaskInfo[indexToEdit]?.employee[1],
                              selectedTaskInfo[indexToEdit]?.employee[2],
                              selectedTaskInfo[indexToEdit]?.employee[3],
                              selectedTaskInfo[indexToEdit]?.employee[4],
                              selectedTaskInfo[indexToEdit]?.employee[5],
                              selectedTaskInfo[indexToEdit]?.employee[6],
                              selectedTaskInfo[indexToEdit]?.employee[7],
                              selectedTaskInfo[indexToEdit]?.employee[8],
                              selectedTaskInfo[indexToEdit]?.employee[9],
                              selectedTaskInfo[indexToEdit]?.employee[10],
                            ]}
                            onChange={handleEmployeeChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={users}
                            styles={customSelectStyles}
                            placeholder="Select Employees"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {selectedTaskInfo[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddTask;
