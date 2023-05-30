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
  initResident,
  savedResidentReducer,
} from "../../utils/localStorage";
import Select from "react-select";
import { RadioBtn } from "./styles";
import { v4 as uuidv4 } from "uuid";
import "./style.css";

const AddTask = ({
  dispatchTasks,
  indexToEdit,
}) => {
  const [selectedTaskInfo] = useGlobalState("selectedTaskInfo");
  const uniqueId = uuidv4();

  const [userAcct] = useReducer(
    savedUserAccountReducer,
    [],
    initUserAccount
  );
  const [employeeAccts, setEmployeeAccts] = useState();
  useEffect(() => {
    setEmployeeAccts(userAcct);
  }, [userAcct]);

  const [residentAcct] = useReducer(
    savedResidentReducer,
    [],
    initResident
  );
  const [residentAccts, setResidentAccts] = useState();
  useEffect(() => {
    setResidentAccts(residentAcct);
  }, [residentAcct]);

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

  const [resident, setResident] = useState(
    selectedTaskInfo[indexToEdit]?.resident
      ? selectedTaskInfo[indexToEdit]?.resident
      : ""
  );

  const [id, setId] = useState(
    selectedTaskInfo[indexToEdit]?.id
      ? selectedTaskInfo[indexToEdit]?.id
      : uniqueId
  );

  const today = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const now = today.toLocaleDateString("en-GB", options);

  const [dateCreated] = useState(
    selectedTaskInfo[indexToEdit]?.dateCreated
      ? selectedTaskInfo[indexToEdit]?.dateCreated
      : now
  );

  // let taskStatus = "In-progress";

  const priorityOptions = [
    { value: 1, label: "highest" },
    { value: 2, label: "medium" },
    { value: 3, label: "low" },
  ];

  

    const statusOptions = [
      { value: 1, label: "not-started" },
      { value: 2, label: "started" },
      { value: 3, label: "middle" },
      { value: 4, label: "rounding-up" },
      { value: 5, label: "completed" },
    ];


  const [taskTitleError, setTaskTitleError] = useState("");
  const [taskTypeError, setTaskTypeError] = useState("");
  const [timeAllocatedError, setTimeAllocatedError] = useState("");
  const [residentError, setResidentError] = useState("");
  const [taskStatusError, setTaskStatusError] = useState("");
  const [managerError, setManagerError] = useState("");
  const [employeeError, setEmployeeError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [taskPriorityError, setTaskPriorityError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate first name and last name
    if (taskTitle === "") {
      setTaskTitleError("Task Title is required.");
      return;
    }
    if (manager === "") {
      setManagerError("Manager is required.");
      return;
    }
    if (taskType === "") {
      setTaskTypeError("Task Type is required.");
      return;
    }
    if (timeAllocated === "") {
      setTimeAllocatedError("Allocated Time is required.");
      return;
    }
    if (description === "") {
      setDescriptionError("Description is required.");
      return;
    }
    if (taskPriority === "") {
      setTaskPriorityError("Task Priority is required.");
      return;
    }
    if (taskStatus === "") {
      setTaskStatusError("Task Status is required.");
      return;
    }
    if (employee === "") {
      setEmployeeError("Employee is required.");
      return;
    }
    if (resident === "") {
      setResidentError("Resident is required.");
      return;
    }

    // Clear any existing error messages
    setTaskPriorityError("");
    setTaskTitleError("");
    setTaskTypeError("");
    setTimeAllocatedError("");
    setTaskStatusError("");
    setDescriptionError("");
    setManagerError("");
    setEmployeeError("");
    setResidentError("");
    const task = {
      taskTitle,
      taskType,
      timeAllocated,
      employee,
      resident,
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
    setEmployeeError("")
  };

  const users = [];
  employeeAccts?.map((user) => {
    users.push({
      value: user.id,
      label: user.firstName + " " + user.lastName,
      image: user.photo,
      role: user.role,
    });
  });

  const handleResidentChange = (event) => {
    setResident(event);
    setResidentError("")
  };

  const residents = [];
  residentAccts?.map((resident) => {
    residents.push({
      value: resident.id,
      label: resident.residentName,
      image: resident.image,
    });
  });

  const handleManagerChange = (e) => {
    setManager(e.target.value);
    setManagerError("");
  };
  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
    setTaskTitleError("");
  };
  const handleTaskTypeChange = (e) => {
    setTaskType(e.target.value);
    setTaskTypeError("");
  };
  const handleTimeAllocatedChange = (e) => {
    setTimeAllocated(e.target.value);
    setTimeAllocatedError("");
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };

  const handlePriorityChange = (event) => {
    setTaskPriority(event);
    setTaskPriorityError("");
  };
  const handleStatusChange = (event) => {
    setTaskStatus(event);
    setTaskStatusError("");
  };

  const getEmployeeDefaultValues = (employeeData) => {
    if (Array.isArray(employeeData)) {
      return employeeData.map((employee) => ({
        value: employee.value,
        label: employee.label,
        image: employee.photo,
        role: employee.role,
      }));
    }
    return [];
  };

  const getResidentefaultValues = (residentData) => {
    if (Array.isArray(residentData)) {
      return residentData.map((resident) => ({
        value: resident.value,
        label: resident.label,
        image: resident.image,
      }));
    }
    return [];
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
                            onChange={handleTaskTitleChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Task Title"
                          />
                          {taskTitleError && (
                            <p className="error-message">{taskTitleError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Manager <span className="text-danger">*</span>
                          </label>
                          <input
                            value={manager}
                            onChange={handleManagerChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Manager"
                          />
                          {managerError && (
                            <p className="error-message">{managerError}</p>
                          )}
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
                              onChange={handleTaskTypeChange}
                            />
                            <label htmlFor="paid">
                              <span>Paid</span>
                            </label>
                            <input
                              type="radio"
                              name="task-type"
                              id="non-paid"
                              value={"Non-Paid Task"}
                              onChange={handleTaskTypeChange}
                            />
                            <label htmlFor="non-paid">
                              <span>Non-Paid</span>
                            </label>
                          </RadioBtn>
                          {taskTypeError && (
                            <p className="error-message">{taskTypeError}</p>
                          )}
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
                            onChange={handleTimeAllocatedChange}
                            className="form-control floating"
                            type="number"
                            placeholder="Time allocation e.g 5hr"
                            min={0}
                          />
                          {timeAllocatedError && (
                            <p className="error-message">
                              {timeAllocatedError}
                            </p>
                          )}
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
                            onChange={handleDescriptionChange}
                            style={{ height: "120px" }}
                          />
                          {descriptionError && (
                            <p className="error-message">{descriptionError}</p>
                          )}
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
                          {taskPriorityError && (
                            <p className="error-message">{taskPriorityError}</p>
                          )}
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
                          {taskStatusError && (
                            <p className="error-message">{taskStatusError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select Employees{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={getEmployeeDefaultValues(
                              selectedTaskInfo[indexToEdit]?.employee
                            )}
                            onChange={handleEmployeeChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={users}
                            styles={customSelectStyles}
                            placeholder="Select Employees"
                          />
                          {employeeError && (
                            <p className="error-message">{employeeError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select Resident{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={getResidentefaultValues(
                              selectedTaskInfo[indexToEdit]?.resident
                            )}
                            onChange={handleResidentChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={residents}
                            styles={customSelectStyles}
                            placeholder="Select Resident"
                          />
                          {residentError && (
                            <p className="error-message">{residentError}</p>
                          )}
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
