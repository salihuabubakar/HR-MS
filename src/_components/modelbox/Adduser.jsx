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

  const [firstName, setFirstName] = useState(
    selectedUsers[indexToEdit]?.firts_name
      ? selectedUsers[indexToEdit]?.firts_name
      : ""
  );

  const [otherName, setOtherName] = useState(
    selectedUsers[indexToEdit]?.other_name
      ? selectedUsers[indexToEdit]?.other_name
      : ""
  );

  const [username, setUsername] = useState(
    selectedUsers[indexToEdit]?.username ? selectedUsers[indexToEdit]?.username : ""
  );

  const [password, setPassword] = useState(
    selectedUsers[indexToEdit]?.password
      ? selectedUsers[indexToEdit]?.password
      : ""
  );

  const [confirmPassword, setConfirmPassword] = useState("");

  const [phone, setPhone] = useState(
    selectedUsers[indexToEdit]?.phone ? selectedUsers[indexToEdit]?.phone : ""
  );

  const [employeeId, setEmployeeId] = useState(
    selectedUsers[indexToEdit]?.employee_id
      ? selectedUsers[indexToEdit]?.employee_id
      : ""
  );

  const [role, setRole] = useState(
    selectedUsers[indexToEdit]?.role ? selectedUsers[indexToEdit]?.role : []
  );


  const roleOptions = [
    { value: 0, label: "admin" },
    { value: 1, label: "manager" },
    { value: 2, label: "employee" },
  ];

  const [firstNameError, setFirstNameError] = useState("");
  const [otherNameError, setOtherNameError] = useState("");
  const [usernamelError, setUsernameError] = useState("");
  const [passWordError, setPassWordError] = useState("");
  const [confrimPassWordError, setConfirmPassWordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [employeeIdError, setEmployeeIdError] = useState("");
  const [roleError, setRoleError] = useState("");

  useEffect(() => {
    if(password !== confirmPassword) {
      setConfirmPassWordError("Confirm password mismatched");
    }
  }, [password, confirmPassword, setConfirmPassWordError])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validate inputs
    if (firstName === "") {
      setFirstNameError("First name is required.");
      return;
    }
    if(otherName === "") {
      setOtherNameError("Other name is required");
      return;
    }
    if (username === "") {
      setUsernameError("Email is required.");
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
    if (phone === "") {
      setPhoneError("Phone number is required.");
      return;
    }
    if (employeeId === "") {
      setEmployeeIdError("Employee ID is required.");
      return;
    }

    if (role?.length === 0) {
      setRoleError("Role is required.");
      return;
    }

    const user = {
      first_name: firstName.trim(),
      other_name: otherName.trim(),
      password,
      username,
      phone: phone.trim(),
      employee_id: employeeId.trim(),
      role,
    };
    if (selectedUsers[indexToEdit]?.id) {
      dispatchUsers({ type: "update", payload: user });
    } else {
      dispatchUsers({ type: "add", payload: user });
    }
    setGlobalState("showUsersModal", false);
  };

  const handleNameChange = (event) => {
    setFirstName(event.target.value);
    setFirstNameError("");
  };

  const handleOtherNameChange = (event) => {
    setOtherName(event.target.value);
    setOtherNameError("");
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPassWordError("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPassWordError("");
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setPhoneError("");
  };

  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
    setEmployeeIdError("");
  };

  const handleRoleChange = (event) => {
    setRole(event.label);
    setRoleError("");
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
                  <form onSubmit={handleSubmit}>
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
                          <label>Other Name <span className="text-danger">*</span></label>
                          <input
                            value={otherName}
                            onChange={handleOtherNameChange}
                            className="form-control"
                            type="text"
                          />
                          {otherNameError && (
                            <p className="error-message">{otherNameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            value={username}
                            onChange={handleUsernameChange}
                            className="form-control"
                            type="email"
                          />
                          {usernamelError && (
                            <p className="error-message">{usernamelError}</p>
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
                          <label>Phone <span className="text-danger">*</span></label>
                          <input
                            value={phone}
                            onChange={handlePhoneChange}
                            className="form-control"
                            type="text"
                          />
                          {phoneError && (
                            <p className="error-message">{phoneError}</p>
                          )}
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
                          <label>
                            Select Role <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={selectedUsers[indexToEdit]?.role}
                            onChange={handleRoleChange}
                            options={roleOptions}
                            styles={customSelectStyles}
                            placeholder="Select Role"
                          />
                          {roleError && <p className="error-message">{roleError}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
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
