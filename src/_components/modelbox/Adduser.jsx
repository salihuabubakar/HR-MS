import React, { useState, useEffect, useReducer } from "react";
import Select from "react-select";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import {
  PopupWrapper,
  PopupOverlay,
  PopupContainer,
  Card,
} from "./Addemployee.style";

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#ddd",
      height: "50px",
    }),
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
                            onChange={(e) => setFirstName(e.target.value)}
                            className="form-control"
                            type="text"
                          />
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
                            onChange={(e) => setUserName(e.target.value)}
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            type="email"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            type="password"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control"
                            type="password"
                          />
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
                            onChange={(e) => setEmployeeId(e.target.value)}
                            type="text"
                            className="form-control floating"
                          />
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
                            <td>Employee</td>
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
                            <td>Holidays</td>
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
                            <td>Leaves</td>
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
                            <td>Events</td>
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
