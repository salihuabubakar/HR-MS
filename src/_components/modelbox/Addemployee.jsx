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
  dispatchEmployee,
  indexToEdit,
  employeeIdToEdit,
  getEmployeeId,
}) => {
  // const isEdit = () => !!(acctIdToEdit && userAcct[indexToEdit]);
  const uniqueId = uuidv4();
  const [depts] = useReducer(savedDeptReducer, [], initDept);
  const [deptList, setDeptList] = useState();
  useEffect(() => {
    setDeptList(depts);
  }, [depts]);

  const [desig] = useReducer(savedDesignationReducer, [], initDesignation);
  const [desigList, setDesignationList] = useState();
  useEffect(() => {
    setDesignationList(desig);
  }, [desig]);

  const [selectedEmployeeAccount] = useGlobalState("selectedEmployeeAccount");

  // console.log("selectedEmployeeAccount", selectedEmployeeAccount);
  // console.log("employeeIdToEdit", employeeIdToEdit);
  // console.log("indexToEdit", indexToEdit);
  // console.log("getEmployeeId", getEmployeeId);

  let isIdExist;

  if (selectedEmployeeAccount && indexToEdit !== undefined) {
    isIdExist = selectedEmployeeAccount[indexToEdit]?.id;
  } else {
    isIdExist = "";
  }

  const [employee_number, setEmployeeNumber] = useState(
    selectedEmployeeAccount[indexToEdit]?.employee_number
      ? selectedEmployeeAccount[indexToEdit]?.employee_number
      : ""
  );
  const [first_name, setFirstName] = useState(
    selectedEmployeeAccount[indexToEdit]?.first_name
      ? selectedEmployeeAccount[indexToEdit]?.first_name
      : ""
  );
  const [middle_name, setMiddleName] = useState(
    selectedEmployeeAccount[indexToEdit]?.middle_name
      ? selectedEmployeeAccount[indexToEdit]?.middle_name
      : ""
  );
  const [last_name, setLastName] = useState(
    selectedEmployeeAccount[indexToEdit]?.last_name
      ? selectedEmployeeAccount[indexToEdit]?.last_name
      : ""
  );
  const [date_of_birth, setDateOfBirth] = useState(
    selectedEmployeeAccount[indexToEdit]?.date_of_birth
      ? selectedEmployeeAccount[indexToEdit]?.date_of_birth
      : ""
  );
  const [gender, setGender] = useState(
    selectedEmployeeAccount[indexToEdit]?.gender
      ? selectedEmployeeAccount[indexToEdit]?.gender
      : ""
  );
  // const [maritalStatus, setMaritalStatus] = useState(
  //   selectedEmployeeAccount[indexToEdit]?.maritalStatus
  //     ? selectedEmployeeAccount[indexToEdit]?.maritalStatus
  //     : ""
  // );
  // const [nationality, setNationality] = useState(
  //   selectedEmployeeAccount[indexToEdit]?.nationality
  //     ? selectedEmployeeAccount[indexToEdit]?.nationality
  //     : ""
  // );
  const [phone_number, setPhoneNumber] = useState(
    selectedEmployeeAccount[indexToEdit]?.phone_number
      ? selectedEmployeeAccount[indexToEdit]?.phone_number
      : ""
  );
  const [email, setEmail] = useState(
    selectedEmployeeAccount[indexToEdit]?.email
      ? selectedEmployeeAccount[indexToEdit]?.email
      : ""
  );
  const [hire_date, setHireDate] = useState(
    selectedEmployeeAccount[indexToEdit]?.hire_date
      ? selectedEmployeeAccount[indexToEdit]?.hire_date
      : ""
  );
  // const [appointmentLetter, setAppointmentLetter] = useState(
  //   selectedEmployeeAccount[indexToEdit]?.appointmentLetter
  //     ? selectedEmployeeAccount[indexToEdit]?.appointmentLetter
  //     : ""
  // );
  // const [role, setRole] = useState(
  //   selectedEmployeeAccount[indexToEdit]?.role
  //     ? selectedEmployeeAccount[indexToEdit]?.role
  //     : ""
  // );
  // const [department, setDepartment] = useState(
  //   selectedEmployeeAccount[indexToEdit]?.department
  //     ? selectedEmployeeAccount[indexToEdit]?.department
  //     : ""
  // );
  // const [organisation, setOrganisation] = useState(
  //   selectedEmployeeAccount[indexToEdit]?.organisation
  //     ? selectedEmployeeAccount[indexToEdit]?.organisation
  //     : ""
  // );
  // const [salary, setSalary] = useState(
  //   selectedEmployeeAccount[indexToEdit]?.salary
  //     ? selectedEmployeeAccount[indexToEdit]?.salary
  //     : ""
  // );
  const [photo, setPhoto] = useState(
    selectedEmployeeAccount[indexToEdit]?.photo
      ? selectedEmployeeAccount[indexToEdit]?.photo
      : null
  );
  // const [niNumber, setNiNumber] = useState(
  //   selectedEmployeeAccount[indexToEdit]?.niNumber
  //     ? selectedEmployeeAccount[indexToEdit]?.niNumber
  //     : ""
  // );
  // const [id] = useState(isIdExist ? isIdExist : uniqueId);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate first name and last name
    if (first_name === "") {
      setFirstNameError("First name is required.");
      return;
    }
    if (last_name === "") {
      setLastNameError("Last name is required.");
      return;
    }

    // // Clear any existing error messages
    setFirstNameError("");
    setLastNameError("");

    // const userAccount = {
    //   maritalStatus,
    //   nationality,
    //   hireDate,
    //   appointmentLetter,
    //   role,
    //   department,
    //   organisation,
    //   salary,
    //   niNumber,
    // };
    const employeeData = {
      first_name,
      last_name,
      middle_name,
      employee_number,
      photo,
      email,
      phone_number,
    };
    if (isIdExist) {
      dispatchEmployee({ type: "update", payload: employeeData });
    } else {
      dispatchEmployee({
        type: "add",
        payload: employeeData
      });
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

  // const departments = [];
  // deptList?.map((dept) => {
  //   departments.push({ value: dept.id, label: dept.deptName });
  // });

  // const handleDepartmentChange = (event) => {
  //   setDepartment(event);
  // };

  // const roles = [];
  // desigList?.map((role) => {
  //   roles.push({ value: role.id, label: role.desigName });
  // });

  // const handleRoleChange = (event) => {
  //   setRole(event);
  // };

  // const handleOrganisationChange = (event) => {
  //   const data = event.target.value;
  //   setOrganisation(data);
  // };

  // const handleMaritalStatusChange = (event) => {
  //   const data = event.target.value;
  //   setMaritalStatus(data);
  // };

  // const appLetterOnChange = (event) => {
  //   // const file = event.target.files[0];
  //   // const reader = new FileReader();
  //   // reader.readAsDataURL(file);
  //   // reader.onload = () => {
  //   //   const base64File = reader.result;
  //   //   setAppointmentLetter(base64File)
  //   // };
  //   const data = event.target.value;
  //   setAppointmentLetter(data);
  // };

  const imageOnChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader();
    const imagePath = URL.createObjectURL(file);
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   const base64Image = reader.result;
    //   setPhoto(base64Image);
    // };
    setPhoto(null);
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
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            First Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={first_name}
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
                            value={last_name}
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
                            value={employee_number}
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
                            value={middle_name}
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
                            // value={niNumber}
                            // onChange={(event) =>
                            //   setNiNumber(event.target.value)
                            // }
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
                            <option disabled value="">
                              Select
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Marital Status
                          </label>
                          <select
                            // value={maritalStatus}
                            // onChange={handleMaritalStatusChange}
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
                            // value={nationality}
                            // onChange={(event) =>
                            //   setNationality(event.target.value)
                            // }
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
                            value={phone_number}
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
                            value={date_of_birth}
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
                            value={hire_date}
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
                            // value={organisation}
                            // onChange={handleOrganisationChange}
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
                            // value={salary}
                            // onChange={(event) => setSalary(event.target.value)}
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
                            // value={appointmentLetter}
                            // onChange={appLetterOnChange}
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
                      {/* <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Department</label>
                          <Select
                            onChange={handleDepartmentChange}
                            options={departments}
                            styles={customSelectStyles}
                            placeholder="Select Department"
                            defaultValue={
                              selectedEmployeeAccount[indexToEdit]?.department
                                ? {
                                    value:
                                      selectedEmployeeAccount[indexToEdit]
                                        .department.value,
                                    label:
                                      selectedEmployeeAccount[indexToEdit]
                                        .department.label,
                                  }
                                : "Select Department"
                            }
                          />
                        </div>
                      </div> */}
                      {/* <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Role</label>
                          <Select
                            onChange={handleRoleChange}
                            options={roles}
                            styles={customSelectStyles}
                            placeholder="Select Role"
                            defaultValue={
                              selectedEmployeeAccount[indexToEdit]?.role
                                ? {
                                    value:
                                      selectedEmployeeAccount[indexToEdit]?.role
                                        ?.value,
                                    label:
                                      selectedEmployeeAccount[indexToEdit]?.role
                                        ?.label,
                                  }
                                : "Select Role"
                            }
                          />
                        </div>
                      </div> */}
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
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