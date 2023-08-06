import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import Select from "react-select";
import { RadioBtn } from "./styles";
import moment from "moment";
import "./style.css";
import { 
  useDataFetching, 
  useResidentFetching, 
  useResidentBoroughFetching,
  useHouseFetching 
} from "../../utils/employeeCustomFetchHook";
import { customSelectStyles } from "../../utils/reactSelectCustomeStyle";


const AddTask = ({
  dispatchTasks,
  indexToEdit,
  id
}) => {
  const { data: allEmployee, isLoading: allEmployeeLoading } =
    useDataFetching();
  const { residentData, isResidentLoading } = useResidentFetching();
  const { residentBoroughData, isResidentBoroughLoading } = useResidentBoroughFetching();
  const { houseData, isHouseDataLoading } = useHouseFetching();

  
  const [selectedTaskInfo] = useGlobalState("selectedTaskInfo");
  const currentTaskId = selectedTaskInfo[indexToEdit]?.id;

  const [name, setName] = useState(selectedTaskInfo[indexToEdit]?.name || "");

  const [is_paid, setIsPaid] = useState(
    selectedTaskInfo[indexToEdit]?.is_paid || false
  );

  const [concluded, setConcluded] = useState(
    selectedTaskInfo[indexToEdit]?.concluded || false
  );

  const [hours, setHours] = useState(
    selectedTaskInfo[indexToEdit]?.hours || 0
  );

  const [start_at, setStartAt] = useState(
    selectedTaskInfo[indexToEdit]?.start_at || ""
  );

  const [end_at, setEndAt] = useState(
    selectedTaskInfo[indexToEdit]?.end_at || ""
  );

  const [task_duration, setTaskDuration] = useState(
    selectedTaskInfo[indexToEdit]?.task_duration || ""
  );

  const [description, setDescription] = useState(
    selectedTaskInfo[indexToEdit]?.description || ""
  );

  const [employees, setEmployee] = useState(
    selectedTaskInfo[indexToEdit]?.employees || []
  );

  const [priority, setPriority] = useState(
    selectedTaskInfo[indexToEdit]?.priority || ""
  );

  const [progress, setProgress] = useState(
    selectedTaskInfo[indexToEdit]?.progress || ""
  );

  const [managers, setManagers] = useState(
    selectedTaskInfo[indexToEdit]?.managers || []
  );

  const [residents, setResident] = useState(
    selectedTaskInfo[indexToEdit]?.residents || []
  );

  const [house_residents, setHouseRes] = useState(
    selectedTaskInfo[indexToEdit]?.house_residents || []
  );

  const [borough_residents, setBoroughRes] = useState(
    selectedTaskInfo[indexToEdit]?.borough_residents || []
  );

  const [taskTitleError, setTaskTitleError] = useState("");
  const [timeAllocatedError, setTimeAllocatedError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [residentError, setResidentError] = useState("");
  const [taskStatusError, setTaskStatusError] = useState("");
  const [managerError, setManagerError] = useState("");
  const [employeeError, setEmployeeError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [taskPriorityError, setTaskPriorityError] = useState("");
  const [startAtError, setStartAtError] = useState("");
  const [endAtError, setEndAtError] = useState("");
  const [houseError, setHouseError] = useState("");
  const [boroughError, setBoroughError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate first name and last name
    if (name === "") {
      setTaskTitleError("Task Name is required.");
      return;
    }
    if (managers.length === 0) {
      setManagerError("Manager is required.");
      return;
    }
    // if (hours === "") {
    //   setTimeAllocatedError("Allocated Hour is required.");
    //   return;
    // }
    if (task_duration === "") {
      setDurationError("Task Duration is required.");
      return;
    }
    if (priority === "") {
      setTaskPriorityError("Task Priority is required.");
      return;
    }
    if (progress === "") {
      setTaskStatusError("Task Progress is required.");
      return;
    }
    if (start_at === "") {
      setStartAtError("Start Date/Time is required.");
      return;
    }
    if (end_at === "") {
      setEndAtError("End Date/Time is required.");
      return;
    }
    if (employees.length === 0) {
      setEmployeeError("Employee is required.");
      return;
    }
    if (residents.length === 0) {
      setResidentError("Resident is required.");
      return;
    }
    if (house_residents.length === 0) {
      setHouseError("House is required.");
      return;
    }
    if (borough_residents.length === 0) {
      setBoroughError("Borough is required.");
      return;
    }
    if (description === "") {
      setDescriptionError("Description is required.");
      return;
    }

    // Clear any existing error messages
    setTaskPriorityError("");
    setTaskTitleError("");
    setStartAtError("");
    setEndAtError("");
    // setTimeAllocatedError("");
    setTaskStatusError("");
    setDescriptionError("");
    setManagerError("");
    setEmployeeError("");
    setHouseError("");
    setBoroughError("");
    setDurationError("");
    setResidentError("");

    const task = {
      name,
      is_paid,
      hours,
      employees,
      residents,
      description,
      managers,
      progress,
      priority,
      task_duration,
      start_at,
      borough_residents,
      house_residents,
      end_at,
      concluded,
      id,
    };
    if (currentTaskId) {
      dispatchTasks({ type: "update", payload: task });
    } else {
      dispatchTasks({ type: "add", payload: task });
    }
    setGlobalState("showTaskModal", false);
  };

  const handleEmployeeChange = (event) => {
    const mappedID = event?.map((resID) => resID.id);
    setEmployee(mappedID);
    setEmployeeError("");
  };

  const users = [];
  allEmployee?.map((user) => {
    users.push({
      id: user.id,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      photo: user.photo,
    });
  });

  const handleResidentChange = (event) => {
    const mappedID = event?.map((employeeID) => employeeID.id);
    setResident(mappedID);
    setResidentError("");
  };

  const resident = [];
  residentData?.map((res) => {
    resident.push({
      id: res.id,
      first_name: res.first_name,
      middle_name: res.middle_name,
      last_name: res.last_name,
      photo: res.photo,
    });
  });

  const handleHouseResChange = (event) => {
    const mappedID = event?.map((houseID) => houseID.id);
    setHouseRes(mappedID);
    setHouseError("");
  };

  const house = [];
  houseData?.map((h) => {
    house.push({
      id: h.id,
      name: h.name
    });
  });

  const getHouseDefaultValues = () => {
    const val = selectedTaskInfo[indexToEdit]?.house_residents;
    if (!selectedTaskInfo || !val) {
      return [];
    }
    return houseData
      ?.filter((house) => val.includes(house.id))
      .map((house) => ({
        id: house.id,
        name: house.name,
      }));
  };

  const handleBoroughResChange = (event) => {
    const mappedID = event?.map((boroughID) => boroughID.id);
    setBoroughRes(mappedID);
    setBoroughError("");
  };

  const borough = [];
  residentBoroughData?.map((b) => {
    borough.push({
      id: b.id,
      borough_name: b.borough_name
    });
  });

  const getBoroughDefaultValues = () => {
    const val = selectedTaskInfo[indexToEdit]?.borough_residents;
    if (!selectedTaskInfo || !val) {
      return [];
    }
    return residentBoroughData
      ?.filter((borough) => val.includes(borough.id))
      .map((borough) => ({
        id: borough.id,
        borough_name: borough.borough_name,
      }));
  };

  const manager = [];
  allEmployee?.map((user) => {
    manager.push({
      id: user.id,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      photo: user.photo,
      key: user.id,
    });
  });

  const handleManagerChange = (e) => {
    const mappedID = e?.map((managerID) => managerID.id);
    setManagers(mappedID);
    setManagerError("");
  };
  const handleTaskNameChange = (e) => {
    setName(e.target.value);
    setTaskTitleError("");
  };
  const handleTaskTypeChange = (e) => {
    setIsPaid(e.target.checked);
  };
  const handleTaskConcludedChange = (e) => {
    setConcluded(e.target.checked);
  };
  // const handleHoursChange = (e) => {
  //   setHours(e.target.value);
  //   setTimeAllocatedError("");
  // };
  const handleDurationChange = (e) => {
    setTaskDuration(e.target.value);
    setDurationError("");
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
    setTaskPriorityError("");
  };
  const handleStartAtChange = (e) => {
    setStartAt(e.target.value);
    setStartAtError("");
  };
  const handleEndAtChange = (e) => {
    setEndAt(e.target.value);
    setEndAtError("");
  };
  const handleProgresChange = (e) => {
    setProgress(e.target.value);
    setTaskStatusError("");
  };

  const getEmployeeDefaultValues = () => {
    const val = selectedTaskInfo[indexToEdit]?.employees;
    if (!selectedTaskInfo || !val) {
      return [];
    }
    return allEmployee
      .filter((employee) => val.includes(employee.id))
      .map((employee) => ({
        id: employee.id,
        first_name: employee.first_name,
        middle_name: employee.middle_name,
        last_name: employee.last_name,
      }));
  };

  const getManagerDefaultValues = () => {
    const val = selectedTaskInfo[indexToEdit]?.managers;
    if (!selectedTaskInfo || !val) {
      return [];
    }
    return allEmployee
      .filter((manager) => val.includes(manager.id))
      .map((manager) => ({
        id: manager.id,
        first_name: manager.first_name,
        middle_name: manager.middle_name,
        last_name: manager.last_name,
      }));
  };

  const getResidentefaultValues = () => {
    const val = selectedTaskInfo[indexToEdit]?.residents;
    if (!selectedTaskInfo || !val) {
      return [];
    }
    return residentData
      .filter((resident) => val.includes(resident.id))
      .map((resident) => ({
        id: resident.id,
        first_name: resident.first_name,
        middle_name: resident.middle_name,
        last_name: resident.last_name,
      }));
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
                    {currentTaskId
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
                            value={name}
                            onChange={handleTaskNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Task Name"
                          />
                          {taskTitleError && (
                            <p className="error-message">{taskTitleError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select Manager{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={getManagerDefaultValues()}
                            onChange={handleManagerChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={manager}
                            isLoading={allEmployeeLoading}
                            styles={customSelectStyles}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) =>
                              option.first_name +
                              " " +
                              option.middle_name +
                              " " +
                              option.last_name
                            }
                            placeholder="Select Manager"
                          />
                          {managerError && (
                            <p className="error-message">{managerError}</p>
                          )}
                        </div>
                      </div>
                      {/* <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Task-type</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="task-type"
                              checked={is_paid}
                              id="paid"
                              placeholder={"Paid"}
                              onChange={handleTaskTypeChange}
                            />
                            <label htmlFor="paid">
                              <span>Paid</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div> */}
                      {currentTaskId && (
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="label">Task-Concluded</label>
                            <RadioBtn>
                              <input
                                type="checkbox"
                                name="task-concluded"
                                checked={concluded}
                                id="concluded"
                                placeholder={"Concluded"}
                                onChange={handleTaskConcludedChange}
                              />
                              <label htmlFor="concluded">
                                <span>Concluded</span>
                              </label>
                            </RadioBtn>
                          </div>
                        </div>
                      )}
                      {/* <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Hours Allocation{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={hours}
                            onChange={handleHoursChange}
                            className="form-control floating"
                            type="number"
                            placeholder="Hours allocation"
                            min={0}
                          />
                          {timeAllocatedError && (
                            <p className="error-message">
                              {timeAllocatedError}
                            </p>
                          )}
                        </div>
                      </div> */}
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Task Duration <span className="text-danger">*</span>
                          </label>
                          <input
                            value={task_duration}
                            onChange={handleDurationChange}
                            className="form-control floating"
                            type="number"
                            placeholder="Task Duration"
                            min={0}
                          />
                          {durationError && (
                            <p className="error-message">{durationError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select Task Priority{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            value={priority}
                            onChange={handlePriorityChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Priority
                            </option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                          {taskPriorityError && (
                            <p className="error-message">{taskPriorityError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Task Progress <span className="text-danger">*</span>
                          </label>
                          <input
                            value={progress}
                            onChange={handleProgresChange}
                            className="form-control floating"
                            type="number"
                            placeholder="Progress"
                            min={0}
                          />
                          {taskStatusError && (
                            <p className="error-message">{taskStatusError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Task Start At <span className="text-danger">*</span>
                          </label>
                          <input
                            value={start_at}
                            onChange={handleStartAtChange}
                            className="form-control floating"
                            type="datetime-local"
                            placeholder="Start At"
                          />
                          {startAtError && (
                            <p className="error-message">{startAtError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Task End At <span className="text-danger">*</span></label>
                          <input
                            value={end_at}
                            onChange={handleEndAtChange}
                            className="form-control floating"
                            type="datetime-local"
                            placeholder="End At"
                          />
                          {endAtError && (
                            <p className="error-message">{endAtError}</p>
                          )}
                        </div>
                      </div>
                      {/* <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">House</label>
                          <select
                            value={employee}
                            onChange={handleHouseEmployeeChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Employee
                            </option>
                            {allEmployee?.map((employee) => (
                              <option key={employee.id} value={employee.id}>
                                {`${employee.first_name} ${employee.middle_name} ${employee.last_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div> */}
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select Employees{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={getEmployeeDefaultValues()}
                            onChange={handleEmployeeChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={users}
                            isLoading={allEmployeeLoading}
                            styles={customSelectStyles}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) =>
                              option.first_name +
                              " " +
                              option.middle_name +
                              " " +
                              option.last_name
                            }
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
                            defaultValue={getResidentefaultValues()}
                            onChange={handleResidentChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={resident}
                            isLoading={isResidentLoading}
                            styles={customSelectStyles}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) =>
                              option.first_name +
                              " " +
                              option.middle_name +
                              " " +
                              option.last_name
                            }
                            placeholder="Select Resident"
                          />
                          {residentError && (
                            <p className="error-message">{residentError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select House{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={getHouseDefaultValues()}
                            onChange={handleHouseResChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={house}
                            isLoading={isHouseDataLoading}
                            styles={customSelectStyles}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) => option.name }
                            placeholder="Select House"
                          />
                          {houseError && (
                            <p className="error-message">{houseError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select Borough{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={getBoroughDefaultValues()}
                            onChange={handleBoroughResChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={borough}
                            isLoading={isResidentBoroughLoading}
                            styles={customSelectStyles}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) => option.borough_name }
                            placeholder="Select Borough"
                          />
                          {boroughError && (
                            <p className="error-message">{boroughError}</p>
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
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {currentTaskId ? "Update" : "Save"}
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
