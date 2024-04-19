import React, { useState, useEffect, useReducer } from "react";
import Select from "react-select";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import {
  PopupWrapper,
  PopupOverlay,
  PopupContainer,
  Card,
} from "./Addemployee.style";
import { customSelectStyles } from "../../utils/reactSelectCustomeStyle";

const Adduser = ({ dispatchUsers, indexToEdit }) => {
  const [selectedUsers] = useGlobalState("selectedUsers");

  const [id] = useState(
    selectedUsers[indexToEdit]?.id
      ? selectedUsers[indexToEdit]?.id
      : Date.now()
  );

  const [firstName, setFirstName] = useState(
    selectedUsers[indexToEdit]?.firstName
      ? selectedUsers[indexToEdit]?.firstName
      : ""
  );

  const [lastName, setLastName] = useState(
    selectedUsers[indexToEdit]?.lastName
      ? selectedUsers[indexToEdit]?.lastName
      : ""
  );

  const [email, setEmail] = useState(
    selectedUsers[indexToEdit]?.email ? selectedUsers[indexToEdit]?.email : ""
  );

  const [password, setPassword] = useState(
    selectedUsers[indexToEdit]?.password
      ? selectedUsers[indexToEdit]?.password
      : ""
  );

  const [confirmPassword, setConfirmPassword] = useState(
    selectedUsers[indexToEdit]?.confirmPassword
      ? selectedUsers[indexToEdit]?.confirmPassword
      : ""
  );

  const [employeeId, setEmployeeId] = useState(
    selectedUsers[indexToEdit]?.employeeId
      ? selectedUsers[indexToEdit]?.employeeId
      : ""
  );

  const [role, setRole] = useState(
    selectedUsers[indexToEdit]?.role ? selectedUsers[indexToEdit]?.role : ""
  );

  const [company, setCompany] = useState(
    selectedUsers[indexToEdit]?.company
      ? selectedUsers[indexToEdit]?.company
      : ""
  );

  const [phone, setPhone] = useState(
    selectedUsers[indexToEdit]?.phone ? selectedUsers[indexToEdit]?.phone : ""
  );

  const [userName, setUserName] = useState(
    selectedUsers[indexToEdit]?.userName
      ? selectedUsers[indexToEdit]?.userName
      : ""
  );

  const handleRoleChange = (event) => {
    setRole(event);
  };
  const handleCompanyChange = (event) => {
    setCompany(event);
  };

  const roleOptions = [
    { value: 0, label: "Admin" },
    { value: 1, label: "Employee" },
    { value: 2, label: "Client" },
  ];

  const companyOptions = [
    { value: 0, label: "Global Technologies" },
    { value: 1, label: "Delta Infotech" },
    { value: 2, label: "Niger Fintech" },
  ];

  const [firstNameError, setFirstNameError] = useState("");
  const [userNameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passWordError, setPassWordError] = useState("");
  const [confrimPassWordError, setConfirmPassWordError] = useState("");
  const [employeeIdError, setEmployeeIdError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validate inputs
    if (firstName === "") {
      setFirstNameError("First name is required.");
      return;
    }
    if (userName === "") {
      setUsernameError("Username is required.");
      return;
    }
    if (email === "") {
      setEmailError("Email is required.");
      return;
    }
    if (password === "") {
      setPassWordError("Password is required.");
      return;
    }
    if (confirmPassword === "") {
      setConfirmPassWordError("Confirm password is required.");
      return;
    }
    if (employeeId === "") {
      setEmployeeIdError("Employee ID is required.");
      return;
    }
    const user = {
      id,
      firstName,
      lastName,
      userName,
      password,
      confirmPassword,
      email,
      phone,
      employeeId,
      role,
      company,
    };
    if (selectedUsers[indexToEdit]?.id) {
      dispatchUsers({ type: "update", payload: user });
    } else {
      dispatchUsers({ type: "push", payload: user });
    }
    setGlobalState("showUsersModal", false);
  };

  const handleNameChange = (event) => {
    setFirstName(event.target.value);
    setFirstNameError("");
  };

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
    setUsernameError("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPassWordError("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPassWordError("");
  };

  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
    setEmployeeIdError("");
  };

  const [isDarkMode] = useGlobalState("isDarkMode");

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer isDarkMode={isDarkMode} top={true} className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedUsers[indexToEdit]?.id
                      ? "Update User"
                      : "Add User"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showUsersModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            First Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={firstName}
                            onChange={handleNameChange}
                            className="form-control"
                            type="text"
                          />
                          {firstNameError && (
                            <p className="error-message">{firstNameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Username <span className="text-danger">*</span>
                          </label>
                          <input
                            value={userName}
                            onChange={handleUsernameChange}
                            className="form-control"
                            type="text"
                          />
                          {userNameError && (
                            <p className="error-message">{userNameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            value={email}
                            onChange={handleEmailChange}
                            className="form-control"
                            type="email"
                          />
                          {emailError && (
                            <p className="error-message">{emailError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Password <span className="text-danger">*</span></label>
                          <input
                            value={password}
                            onChange={handlePasswordChange}
                            className="form-control"
                            type="password"
                          />
                          {passWordError && (
                            <p className="error-message">{passWordError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Confirm Password <span className="text-danger">*</span></label>
                          <input
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="form-control"
                            type="password"
                          />
                          {confrimPassWordError && (
                            <p className="error-message">{confrimPassWordError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Phone </label>
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Employee ID <span className="text-danger">*</span>
                          </label>
                          <input
                            value={employeeId}
                            onChange={handleEmployeeIdChange}
                            type="text"
                            className="form-control floating"
                          />
                          {employeeIdError && (
                            <p className="error-message">{employeeIdError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Select Role <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={selectedUsers[indexToEdit]?.role}
                            onChange={handleRoleChange}
                            options={roleOptions}
                            styles={customSelectStyles}
                            placeholder="Select Role"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Select Company{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={selectedUsers[indexToEdit]?.company}
                            onChange={handleCompanyChange}
                            options={companyOptions}
                            styles={customSelectStyles}
                            placeholder="Select Company"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive m-t-15">
                      <table className="table table-striped custom-table">
                        <thead>
                          <tr>
                            <th>Module Permission</th>
                            <th className="text-center">Read</th>
                            <th className="text-center">Write</th>
                            <th className="text-center">Create</th>
                            <th className="text-center">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}}>Employee</td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                          </tr>
                          <tr>
                            <td style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}}>Holidays</td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                          </tr>
                          <tr>
                            <td style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}}>Leaves</td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                          </tr>
                          <tr>
                            <td style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}}>Events</td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                            <td className="text-center">
                              <input defaultChecked type="checkbox" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {selectedUsers[indexToEdit]?.id ? "Update" : "Save"}
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

export default Adduser;
