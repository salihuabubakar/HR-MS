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

const Addemployee = ({
  dispatchUserAcct,
  indexToEdit,
  // acctIdToEdit,
  userAcct,
}) => {
  // const isEdit = () => !!(acctIdToEdit && userAcct[indexToEdit]);
  const uniqueId = uuidv4();

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

  const handleDepartmentChange = (event) => {
    const data = event.target.value;
    setDepartment(data);
  };

  const handleRoleChange = (event) => {
    const data = event.target.value;
    setRole(data);
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

  // const [selectedOptions, setSelectedOptions] = useState([]);

  // const handleOptionChange = (event) => {
  //   const selectedValues = Array.from(
  //     event.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   setSelectedOptions(selectedValues);
  // };

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

                      {/* <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Select Options
                          </label>
                          <select
                            className="select"
                            multiple
                            value={selectedOptions}
                            onChange={handleOptionChange}
                          >
                            <option value="">Select</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                          </select>
                        </div>
                      </div> */}

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
                          <label className="col-form-label">Role</label>
                          <select
                            value={role}
                            onChange={handleRoleChange}
                            className="form-control floating"
                          >
                            <option value="">Select</option>
                            <option value="Hr">Hr</option>
                            <option value="Director">Director</option>
                            <option value="Manager">Manager</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Department</label>
                          <select
                            value={department}
                            onChange={handleDepartmentChange}
                            className="form-control floating"
                          >
                            <option value="">Select</option>
                            <option value="Software">Software</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Mechanical">Mechanical</option>
                          </select>
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
                      {/* <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Created By ID
                          </label>
                          <input
                            value={createdById}
                            onChange={(event) =>
                              setCreatedById(event.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Created By ID"
                          />
                        </div>
                      </div> */}
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