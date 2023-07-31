import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import Select from "react-select";
import { useDataFetching, useResidentFetching, useTaskDocumentFetching } from "../../utils/employeeCustomFetchHook";

const AddTaskAssignment = ({ 
  dispatchTaskAssignment, 
  indexToEdit, 
  id, 
  task,
  totalAssignedEmployees,
  totalAssignedManagers,
  totalAssignedResident,
}) => {
  const { data: allEmployee, isLoading: allEmployeeLoading } = useDataFetching();
  const { residentData, isResidentLoading } = useResidentFetching();
  const { taskDocumentData, isTaskDocumentLoading } = useTaskDocumentFetching();
  const [selectedTaskAssignmentInfo] = useGlobalState(
    "selectedTaskAssignmentInfo"
  );

  const [description, setDescription] = useState(
    selectedTaskAssignmentInfo[indexToEdit]?.description || ""
  );

  const [resident, setResident] = useState(
    selectedTaskAssignmentInfo[indexToEdit]?.resident || []
  );

  const [manager, setManager] = useState(
    selectedTaskAssignmentInfo[indexToEdit]?.manager || ""
  );

  const [Managers_comment, setManagersComment] = useState(
    selectedTaskAssignmentInfo[indexToEdit]?.Managers_comment || ""
  );

  const [employees, setEmployee] = useState(
    selectedTaskAssignmentInfo[indexToEdit]?.employees || []
  );

  const [document, setDocument] = useState(
    selectedTaskAssignmentInfo[indexToEdit]?.document || []
  );

  const [status, setStatus] = useState(
    selectedTaskAssignmentInfo[indexToEdit]?.status || "Pending"
  );

  const [descriptionError, setDescriptionError] = useState("");
  const [employeeError, setEmployeeError] = useState("");
  const [managerError, setManagerError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (manager === "") {
      setManagerError("Manager is required.");
      return;
    }
    if (employees?.length === 0) {
      setEmployeeError("Employee is required.");
      return;
    }
    if (description === "") {
      setDescriptionError("Assignment description is required.");
      return;
    }

    setManagerError("")
    setEmployeeError("");
    setDescriptionError("");
    const taskAssignment = {
      id,
      description,
      resident,
      employees,
      manager,
      Managers_comment,
      document,
      status,
      task
    };
    if (selectedTaskAssignmentInfo[indexToEdit]?.id) {
      dispatchTaskAssignment({ type: "update", payload: taskAssignment });
    } else {
      dispatchTaskAssignment({ type: "add", payload: taskAssignment });
    }
    setGlobalState("showTaskAssignmentModal", false);
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


  const handleDocumentChange = (event) => {
    const mappedID = event?.map((docID) => docID.id);
    setDocument(mappedID);
  };

  const documents = [];
  taskDocumentData?.map((doc) => {
    documents.push({
      id: doc.id,
      name: doc.name
    });
  });


  const handleEmployeeChange = (event) => {
    const mappedID = event?.map((resID) => resID.id);
    setEmployee(mappedID);
    setEmployeeError("");
  };

  const users = [];
  allEmployee?.map((user) => {
    const taskEmployees = totalAssignedEmployees;
    if(taskEmployees.includes(user.id)) {
      users.push({
        id: user.id,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        photo: user.photo,
      });
    }
  });

  const handleResidentChange = (event) => {
    const mappedID = event?.map((employeeID) => employeeID.id);
    setResident(mappedID);
  };

  const residents = [];
  residentData?.map((res) => {
    const taskResidents = totalAssignedResident;
    if(taskResidents.includes(res.id)) {
      residents.push({
        id: res.id,
        first_name: res.first_name,
        middle_name: res.middle_name,
        last_name: res.last_name,
        photo: res.photo,
      });
    }
  });



  const handleManagerChange = (event) => {
    setManager(event.target.value);
    setManagerError("");
  };


  const HandleTaskAssignmentChange = (event) => {
    setDescription(event.target.value);
    setDescriptionError("");
  };

  const getDocDefaultValues = () => {
    const val = selectedTaskAssignmentInfo[indexToEdit]?.document;
    if (!selectedTaskAssignmentInfo || !val) {
      return [];
    }
    return taskDocumentData
      .filter((doc) => val.includes(doc.id))
      .map((doc) => ({
        id: doc.id,
        name: doc.name,
      }));
  };

  const getEmployeeDefaultValues = () => {
    const val = selectedTaskAssignmentInfo[indexToEdit]?.employees;
    if (!selectedTaskAssignmentInfo || !val) {
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

  const getResidentDefaultValues = () => {
    const val = selectedTaskAssignmentInfo[indexToEdit]?.resident;
    if (!selectedTaskAssignmentInfo || !val) {
      return [];
    }
    return allEmployee
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
          <PopupContainer className="custom-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedTaskAssignmentInfo[indexToEdit]?.id
                      ? "Edit Task Assignment"
                      : "Add Task Assignment"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showTaskAssignmentModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select Manager <span className="text-danger">*</span>
                          </label>
                          <select
                            value={manager}
                            onChange={handleManagerChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Manager
                            </option>
                            {allEmployee?.map((emp) => {
                              const taskManagers = totalAssignedManagers;
                              if(taskManagers.includes(emp.id)) {
                                return (
                                  <option value={emp.id}>
                                    {`${emp.first_name} ${emp.middle_name} ${emp.last_name}`}
                                  </option>
                                )
                              }
                            })}
                          </select>
                          {managerError && <p className="error-message">{managerError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select Document
                          </label>
                          <Select
                            defaultValue={getDocDefaultValues()}
                            onChange={handleDocumentChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={documents}
                            isLoading={isTaskDocumentLoading}
                            styles={customSelectStyles}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) =>option.name}
                            placeholder="Select Document"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select Employees <span className="text-danger">*</span>
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
                              option.first_name + " " + option.middle_name + " " + option.last_name
                            }
                            placeholder="Select Employees"
                          />
                          {employeeError && <p className="error-message">{employeeError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Select Resident</label>
                          <Select
                            defaultValue={getResidentDefaultValues()}
                            onChange={handleResidentChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={residents}
                            isLoading={isResidentLoading}
                            styles={customSelectStyles}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) =>
                              option.first_name + " " + option.middle_name + " " + option.last_name
                            }
                            placeholder="Select Resident"
                          />
                        </div>
                      </div>
                      {selectedTaskAssignmentInfo[indexToEdit]?.id && (
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="label">Select Assignment Status</label>
                            <select
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                              className="form-control floating"
                            >
                              <option disabled value="">
                                Select Status
                              </option>
                              <option value="Pending">Pending</option>
                              <option value="Completed">Completed</option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </div>
                        </div>
                      )}
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">
                            Assignment Description <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="Assignment Description"
                            value={description}
                            onChange={HandleTaskAssignmentChange}
                            style={{ height: "120px" }}
                          />
                          {descriptionError && <p className="error-message">{descriptionError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Manager's Comment</label>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="Manager's Comment"
                            value={Managers_comment}
                            onChange={(e) => setManagersComment(e.target.value)}
                            style={{ height: "90px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button className="btn btn-primary submit-btn">
                        {selectedTaskAssignmentInfo[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddTaskAssignment;
