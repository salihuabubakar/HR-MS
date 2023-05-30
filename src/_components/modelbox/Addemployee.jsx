import React, { useState, useEffect, useReducer } from "react";
import Select from "react-select";
import { useGlobalState, setGlobalState } from '../../context/GlobalState';
import {
  PopupWrapper,
  PopupOverlay,
  PopupContainer,
  Card,
} from "./Addemployee.style";
import "./style.css"
import { v4 as uuidv4 } from "uuid";
import {
  initDept,
  savedDeptReducer,
  initDesignation,
  savedDesignationReducer,
} from "../../utils/localStorage";

const Addemployee = ({
  dispatchUserAcct,
  indexToEdit,
  userAcct,
}) => {
  // const isEdit = () => !!(acctIdToEdit && userAcct[indexToEdit]);
  const uniqueId = uuidv4();
  const [depts] = useReducer(savedDeptReducer, [], initDept);
  const [deptList, setDeptList] = useState();
  useEffect(() => {
    setDeptList(depts);
  }, [depts]);

  const [desig] = useReducer(
    savedDesignationReducer,
    [],
    initDesignation
  );
  const [desigList, setDesignationList] = useState();
  useEffect(() => {
    setDesignationList(desig);
  }, [desig]);

  const [selectedUserAccount] = useGlobalState("selectedUserAccount");

  let isIdExist;

  if (selectedUserAccount && indexToEdit !== undefined) {
    isIdExist = selectedUserAccount[indexToEdit]?.id;
  } else {
    isIdExist = "";
  }

  const [employeeNumber, setEmployeeNumber] = useState(
    selectedUserAccount[indexToEdit]?.employeeNumber
      ? selectedUserAccount[indexToEdit]?.employeeNumber
      : ""
  );
  const [firstName, setFirstName] = useState(
    selectedUserAccount[indexToEdit]?.firstName
      ? selectedUserAccount[indexToEdit]?.firstName
      : ""
  );
  const [middleName, setMiddleName] = useState(
    selectedUserAccount[indexToEdit]?.middleName
      ? selectedUserAccount[indexToEdit]?.middleName
      : ""
  );
  const [lastName, setLastName] = useState(
    selectedUserAccount[indexToEdit]?.lastName
      ? selectedUserAccount[indexToEdit]?.lastName
      : ""
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    selectedUserAccount[indexToEdit]?.dateOfBirth
      ? selectedUserAccount[indexToEdit]?.dateOfBirth 
      : ""
  );
  const [gender, setGender] = useState(
    selectedUserAccount[indexToEdit]?.gender
     ? selectedUserAccount[indexToEdit]?.gender 
     : ""
  );
  const [maritalStatus, setMaritalStatus] = useState(
    selectedUserAccount[indexToEdit]?.maritalStatus 
      ? selectedUserAccount[indexToEdit]?.maritalStatus 
      : ""
  );
  const [nationality, setNationality] = useState(
    selectedUserAccount[indexToEdit]?.nationality
      ? selectedUserAccount[indexToEdit]?.nationality 
      : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    selectedUserAccount[indexToEdit]?.phoneNumber
     ? selectedUserAccount[indexToEdit]?.phoneNumber
      : ""
  );
  const [email, setEmail] = useState(
    selectedUserAccount[indexToEdit]?.email
     ? selectedUserAccount[indexToEdit]?.email 
     : ""
  );
  const [hireDate, setHireDate] = useState(
    selectedUserAccount[indexToEdit]?.hireDate 
    ? selectedUserAccount[indexToEdit]?.hireDate
     : ""
  );
  const [appointmentLetter, setAppointmentLetter] = useState(
    selectedUserAccount[indexToEdit]?.appointmentLetter
     ? selectedUserAccount[indexToEdit]?.appointmentLetter
      : ""
  );
  const [role, setRole] = useState(
    selectedUserAccount[indexToEdit]?.role 
    ? selectedUserAccount[indexToEdit]?.role 
    : ""
  );
  const [department, setDepartment] = useState(
    selectedUserAccount[indexToEdit]?.department 
    ? selectedUserAccount[indexToEdit]?.department
     :""
  );
  const [organisation, setOrganisation] = useState(
    selectedUserAccount[indexToEdit]?.organisation 
    ? selectedUserAccount[indexToEdit]?.organisation 
    : ""
  );
  const [salary, setSalary] = useState(
    selectedUserAccount[indexToEdit]?.salary
     ? selectedUserAccount[indexToEdit]?.salary
      : ""
  );
  const [photo, setPhoto] = useState(
    selectedUserAccount[indexToEdit]?.photo
     ? selectedUserAccount[indexToEdit]?.photo
      : ""
  );
  // const [createdDate, setCreatedDate] = useState("");
  // const [lastUpdate, setLastUpdate] = useState("");
  // const [createdById, setCreatedById] = useState(0);
  const [niNumber, setNiNumber] = useState(
    selectedUserAccount[indexToEdit]?.niNumber
     ? selectedUserAccount[indexToEdit]?.niNumber 
     : ""
  )
  const [id] = useState(isIdExist ? isIdExist : uniqueId);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate first name and last name
    if (firstName === "") {
      setFirstNameError("First name is required.");
      return;
    }
    if (lastName === "") {
      setLastNameError("Last name is required.");
      return;
    }

    // Clear any existing error messages
    setFirstNameError("");
    setLastNameError("");

    const userAccount = {
      id,
      employeeNumber,
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      gender,
      maritalStatus,
      nationality,
      phoneNumber,
      email,
      hireDate,
      appointmentLetter,
      role,
      department,
      organisation,
      salary,
      photo,
      // createdDate,
      // lastUpdate,
      // createdById,
      niNumber,
    };
    if (isIdExist) {
      dispatchUserAcct({ type: "update", payload: userAccount });
    } else {
      dispatchUserAcct({ type: "push", payload: userAccount });
    }
    setGlobalState("showModal", false);
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

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setLastNameError("");
  };

  const handleGenderChange = (event) => {
    const data = event.target.value;
    setGender(data);
  };

  const departments = [];
  deptList?.map((dept) => {
    departments.push({ value: dept.id, label: dept.deptName });
  });

  const handleDepartmentChange = (event) => {
    setDepartment(event);
  };


  const roles = [];
  desigList?.map((role) => {
    roles.push({ value: role.id, label: role.desigName });
  });

  const handleRoleChange = (event) => {
    setRole(event);
  };

  const handleOrganisationChange = (event) => {
    const data = event.target.value;
    setOrganisation(data);
  };

  const handleMaritalStatusChange = (event) => {
    const data = event.target.value;
    setMaritalStatus(data);
  }

  const appLetterOnChange = (event) => {
    // const file = event.target.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   const base64File = reader.result;
    //   setAppointmentLetter(base64File)
    // };
    const data = event.target.value;
    setAppointmentLetter(data)
  }


  const imageOnChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setPhoto(base64Image);
    };
  };

  return (
    <>
      {/* Add Employee Modal */}
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
                    {isIdExist ? "Edit Employee" : "Add Employee"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    // className="closeX"
                    onClick={() => setGlobalState("showModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            First Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={firstName}
                            onChange={handleFirstNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="First Name"
                          />
                          {firstNameError && (
                            <p className="error-message">{firstNameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Last Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={lastName}
                            onChange={handleLastNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Last Name"
                          />
                          {lastNameError && (
                            <p className="error-message">{lastNameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Employee Number
                          </label>
                          <input
                            value={employeeNumber}
                            onChange={(event) =>
                              setEmployeeNumber(event.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Employee Number"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Middle Name</label>
                          <input
                            value={middleName}
                            onChange={(event) =>
                              setMiddleName(event.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Middle Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">NI Number</label>
                          <input
                            value={niNumber}
                            onChange={(event) =>
                              setNiNumber(event.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="NI Number"
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Gender</label>
                          <select
                            value={gender}
                            onChange={handleGenderChange}
                            className="form-control floating"
                          >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Marital Status
                          </label>
                          <select
                            value={maritalStatus}
                            onChange={handleMaritalStatusChange}
                            // className="select"
                            className="form-control floating"
                          >
                            <option value="">Select</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Divorced">Divorced</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Nationality</label>
                          <input
                            value={nationality}
                            onChange={(event) =>
                              setNationality(event.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Nationality"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Phone Number</label>
                          <input
                            value={phoneNumber}
                            onChange={(event) =>
                              setPhoneNumber(event.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Email</label>
                          <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="form-control floating"
                            type="email"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Date of Birth
                          </label>
                          <input
                            value={dateOfBirth}
                            onChange={(event) =>
                              setDateOfBirth(event.target.value)
                            }
                            className="form-control floating"
                            type="date"
                            placeholder="Date of Birth"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Hire Date</label>
                          <input
                            value={hireDate}
                            onChange={(event) =>
                              setHireDate(event.target.value)
                            }
                            className="form-control floating"
                            type="date"
                            placeholder="Hire Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Organization</label>
                          <select
                            value={organisation}
                            onChange={handleOrganisationChange}
                            className="form-control floating"
                          >
                            <option value="">Select</option>
                            <option value="Finance">Finance</option>
                            <option value="Sales">Sales</option>
                            <option value="Office">Office</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Salary</label>
                          <input
                            value={salary}
                            onChange={(event) => setSalary(event.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Salary"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Appointment Letter
                          </label>
                          <select
                            value={appointmentLetter}
                            onChange={appLetterOnChange}
                            className="form-control floating"
                          >
                            <option value="">Select</option>
                            <option value="Finance">Finance</option>
                            <option value="Sales">Sales</option>
                            <option value="Office">Office</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Photo</label>
                          <input
                            className="form-control floating"
                            type="file"
                            accept="image/*"
                            onChange={imageOnChange}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Department</label>
                          <Select
                            onChange={handleDepartmentChange}
                            options={departments}
                            styles={customSelectStyles}
                            placeholder="Select Department"
                            defaultValue={
                              selectedUserAccount[indexToEdit]?.department
                                ? {
                                    value:
                                      selectedUserAccount[indexToEdit]
                                        .department.value,
                                    label:
                                      selectedUserAccount[indexToEdit]
                                        .department.label,
                                  }
                                : "Select Department"
                            }
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Role</label>
                          <Select
                            onChange={handleRoleChange}
                            options={roles}
                            styles={customSelectStyles}
                            placeholder="Select Role"
                            defaultValue={
                              selectedUserAccount[indexToEdit]?.role
                                ? {
                                    value:
                                      selectedUserAccount[indexToEdit]?.role
                                        ?.value,
                                    label:
                                      selectedUserAccount[indexToEdit]?.role
                                        ?.label,
                                  }
                                : "Select Role"
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {isIdExist ? "Update" : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </PopupContainer>
        </PopupOverlay>
      </PopupWrapper>
      {/* /Add Employee Modal */}
    </>
  );
};

export default Addemployee