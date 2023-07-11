import React, { useState, useEffect, useReducer } from "react";
import Select from "react-select";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import {
  PopupWrapper,
  PopupOverlay,
  PopupContainer,
} from "./Addemployee.style";
import "./style.css";
import { useOrganisationFetching, useRoleFetching, useDepartmentFetching } from "../../utils/employeeCustomFetchHook";

const Addemployee = ({
  dispatchEmployee,
  indexToEdit,
  getEmployeeId,
}) => {

  const { organisationData } = useOrganisationFetching();
  const { roleData } = useRoleFetching();
  const { departmentData } = useDepartmentFetching()

  const [selectedEmployeeAccount] = useGlobalState("selectedEmployeeAccount");
  const imageUrlFromServer = selectedEmployeeAccount[indexToEdit]?.photo;
  const [photo, setPhoto] = useState("");

  let id = getEmployeeId;

  let isIdExist;

  let formData = new FormData();

  if (selectedEmployeeAccount && indexToEdit !== undefined) {
    isIdExist = selectedEmployeeAccount[indexToEdit]?.id;
  } else {
    isIdExist = "";
  }

  const [employee_number, setEmployeeNumber] = useState(
    selectedEmployeeAccount[indexToEdit]?.employee_number || ""
  );
  const [first_name, setFirstName] = useState(
    selectedEmployeeAccount[indexToEdit]?.first_name || ""
  );
  const [middle_name, setMiddleName] = useState(
    selectedEmployeeAccount[indexToEdit]?.middle_name || ""
  );
  const [last_name, setLastName] = useState(
    selectedEmployeeAccount[indexToEdit]?.last_name || ""
  );
  const [date_of_birth, setDateOfBirth] = useState(
    selectedEmployeeAccount[indexToEdit]?.date_of_birth || ""
  );
  const [gender, setGender] = useState(
    selectedEmployeeAccount[indexToEdit]?.gender || ""
  );
  const [marital_status, setMaritalStatus] = useState(
    selectedEmployeeAccount[indexToEdit]?.marital_status || ""
  );
  const [nationality, setNationality] = useState(
    selectedEmployeeAccount[indexToEdit]?.nationality || ""
  );
  const [phone_number, setPhoneNumber] = useState(
    selectedEmployeeAccount[indexToEdit]?.phone_number || ""
  );
  const [email, setEmail] = useState(
    selectedEmployeeAccount[indexToEdit]?.email || ""
  );
  const [hire_date, setHireDate] = useState(
    selectedEmployeeAccount[indexToEdit]?.hire_date || ""
  );
  // const [appointmentLetter, setAppointmentLetter] = useState(
  //   selectedEmployeeAccount[indexToEdit]?.appointmentLetter
  //     ? selectedEmployeeAccount[indexToEdit]?.appointmentLetter
  //     : ""
  // );
  const [role, setRole] = useState(
    selectedEmployeeAccount[indexToEdit]?.role || ""
  );
  const [department, setDepartment] = useState(
    selectedEmployeeAccount[indexToEdit]?.department || ""
  );
  const [organisation, setOrganisation] = useState(
    selectedEmployeeAccount[indexToEdit]?.organisation || ""
  );
  // I will validate the number of salary should not be more than 6 figures
  const [salary, setSalary] = useState(
    selectedEmployeeAccount[indexToEdit]?.salary || ""
  );
  const [ni_number, setNiNumber] = useState(
    selectedEmployeeAccount[indexToEdit]?.ni_number || ""
  );

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

    const fields = {
      id: id,
      first_name: first_name,
      last_name: last_name,
      middle_name: middle_name,
      employee_number: employee_number,
      photo: photo,
      email: email,
      phone_number: phone_number,
      gender: gender,
      ni_number: ni_number,
      salary: salary,
      organisation: organisation,
      marital_status: marital_status,
      nationality: nationality,
      date_of_birth: date_of_birth,
      hire_date: hire_date,
      role: role,
      department: department
    };

    Object.entries(fields).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });
    if (isIdExist) {
      dispatchEmployee({ type: "update", payload: { id, formData } });
    } else {
      dispatchEmployee({
        type: "add",
        payload: formData,
      });
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

  const imageOnChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleOrganisationChange = (event) => {
    const data = event.target.value;
    setOrganisation(data);
  };

  const handleMaritalStatusChange = (event) => {
    const data = event.target.value;
    setMaritalStatus(data);
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
                      <div className="col-sm-12">
                        <div
                          style={{ borderRadius: "5px" }}
                          className="profile-img-wrap edit-img"
                        >
                          <img
                            style={{ borderRadius: "5px" }}
                            className="inline-block"
                            src={
                              photo
                                ? URL.createObjectURL(photo)
                                : imageUrlFromServer
                            }
                            alt="employee_image"
                          />
                          <div className="fileupload btn">
                            <span className="btn-text">
                              {isIdExist ? "Update" : "Upload"}
                            </span>
                            <input
                              className="upload"
                              type="file"
                              accept="image/*"
                              onChange={imageOnChange}
                            />
                          </div>
                        </div>
                      </div>
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
                            value={ni_number}
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
                            value={marital_status}
                            onChange={handleMaritalStatusChange}
                            className="form-control floating"
                          >
                            <option disabled value="">Select</option>
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
                          <label className="col-form-label">Role</label>
                          <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Role
                            </option>
                            {roleData?.map((role) => (
                              <option key={role.id} value={role.id}>
                                {`${role.role_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Department</label>
                          <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Department
                            </option>
                            {departmentData?.map((dept) => (
                              <option key={dept.id} value={dept.id}>
                                {`${dept.department_name}`}
                              </option>
                            ))}
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
                            <option disabled value="">
                              Select Organization
                            </option>
                            {organisationData?.map((org) => (
                              <option key={org.id} value={org.id}>
                                {`${org.organisation_name}`}
                              </option>
                            ))}
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
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            Appointment Letter
                          </label>
                          <select
                            // value={appointmentLetter}
                            // onChange={appLetterOnChange}
                            className="form-control floating"
                          >
                            <option disabled value="">Select</option>
                            <option value="Finance">Finance</option>
                            <option value="Sales">Sales</option>
                            <option value="Office">Office</option>
                          </select>
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

export default Addemployee;
