import React, { useState, useEffect, useReducer } from "react";
import Select from "react-select";
import { designations } from '../../utils/localDate';
import { useGlobalState, setGlobalState } from '../../context/GlobalState';
import {
  initDept,
  savedDeptReducer,
  initDesignation,
  savedDesignationReducer,
} from "../../utils/localStorage";
import {
  PopupWrapper,
  PopupOverlay,
  PopupContainer,
} from "./Addemployee.style";

const Addemployee = ({
  dispatchUserAcct,
  indexToEdit,
  // acctIdToEdit,
  userAcct,
}) => {
  // const isEdit = () => !!(acctIdToEdit && userAcct[indexToEdit]);

  const [selectedUserAccount] = useGlobalState("selectedUserAccount");
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

  const [firstName, setFirstName] = useState(
    selectedUserAccount[indexToEdit]?.firstName
      ? selectedUserAccount[indexToEdit]?.firstName
      : ""
  );
  const [lastName, setLastName] = useState(
    selectedUserAccount[indexToEdit]?.lastName
      ? selectedUserAccount[indexToEdit]?.lastName
      : ""
  );
  const [userName, setUserName] = useState(
    selectedUserAccount[indexToEdit]?.userName
      ? selectedUserAccount[indexToEdit]?.userName
      : ""
  );
  const [email, setEmail] = useState(
    selectedUserAccount[indexToEdit]?.email
      ? selectedUserAccount[indexToEdit]?.email
      : ""
  );
  const [password, setPassword] = useState(
    selectedUserAccount[indexToEdit]?.password
      ? selectedUserAccount[indexToEdit]?.password
      : ""
  );
  const [confirmPassword, setConfirmPassword] = useState(
    selectedUserAccount[indexToEdit]?.confirmPassword
      ? selectedUserAccount[indexToEdit]?.confirmPassword
      : ""
  );
  const [employeeId, setEmployeeId] = useState(
    selectedUserAccount[indexToEdit]?.employeeId
      ? selectedUserAccount[indexToEdit]?.employeeId
      : ""
  );
  const [joinDate, setJoinDate] = useState(
    selectedUserAccount[indexToEdit]?.joinDate
      ? selectedUserAccount[indexToEdit]?.joinDate
      : ""
  );
  const [phoneNo, setPhoneNo] = useState(
    selectedUserAccount[indexToEdit]?.phoneNo
      ? selectedUserAccount[indexToEdit]?.phoneNo
      : ""
  );
  const [company, setCompany] = useState(
    selectedUserAccount[indexToEdit]?.company
      ? selectedUserAccount[indexToEdit]?.company
      : ""
  );
  const [dept, setDept] = useState(
    selectedUserAccount[indexToEdit]?.dept
      ? selectedUserAccount[indexToEdit]?.dept
      : ""
  );
  const [designation, setDesignation] = useState(
    selectedUserAccount[indexToEdit]?.designation
      ? selectedUserAccount[indexToEdit]?.designation
      : ""
  );
  const [id, setId] = useState(
    selectedUserAccount[indexToEdit]?.id
    ? selectedUserAccount[indexToEdit]?.id
    : Date.now()
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAccount = {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
      employeeId,
      joinDate,
      phoneNo,
      company,
      dept,
      designation,
      id,
    };
    if (selectedUserAccount[indexToEdit]?.id) {
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

  const companyOptions = [
    { value: 1, label: "Global Technologies" },
    { value: 2, label: "Delta Infotech" },
    { value: 3, label: "Niger Fintech" },
  ];

  const departments = [];
  deptList?.map((dept) => {
    departments.push({ value: dept.id, label: dept.deptName });
  });

  const handleCompanyChange = (event) => {
    setCompany(event);
  };

  const handleDeptChange = (event) => {
    console.log(event);
    setDept(event);
  };

  const roles = [];
  desigList?.map((role) => {
    roles.push({ value: role.id, label: role.desigName });
  });

  const handleRoleChange = (event) => {
    setDesignation(event);
  };

  return (
    <>
      {/* Add Employee Modal */}
      <PopupWrapper>
        <PopupOverlay />
        <PopupContainer className=" custom-modal" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Employee</h5>
                <button
                  type="button"
                  className="close"
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
                          onChange={(event) => setFirstName(event.target.value)}
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">Last Name</label>
                        <input
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          Username <span className="text-danger">*</span>
                        </label>
                        <input
                          value={userName}
                          onChange={(event) => setUserName(event.target.value)}
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          className="form-control"
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">Password</label>
                        <input
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          className="form-control"
                          type="password"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          Confirm Password
                        </label>
                        <input
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
                          className="form-control"
                          type="password"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          Employee ID <span className="text-danger">*</span>
                        </label>
                        <input
                          value={employeeId}
                          onChange={(event) =>
                            setEmployeeId(event.target.value)
                          }
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          Joining Date <span className="text-danger">*</span>
                        </label>
                        <div>
                          <input
                            className="form-control datetimepicker"
                            type="date"
                            value={joinDate}
                            onChange={(event) =>
                              setJoinDate(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">Phone </label>
                        <input
                          value={phoneNo}
                          onChange={(event) => setPhoneNo(event.target.value)}
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-form-label">Company</label>
                        <Select
                          defaultValue={
                            selectedUserAccount[indexToEdit]?.company
                              ? {
                                  value: userAcct[indexToEdit].company.value,
                                  label: userAcct[indexToEdit].company.label,
                                }
                              : "Select Company"
                          }
                          onChange={handleCompanyChange}
                          options={companyOptions}
                          styles={customSelectStyles}
                          placeholder="Select Company"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Department <span className="text-danger">*</span>
                        </label>
                        <Select
                          defaultValue={
                            selectedUserAccount[indexToEdit]?.dept
                              ? {
                                  value: userAcct[indexToEdit].dept.value,
                                  label: userAcct[indexToEdit].dept.label,
                                }
                              : "Select Department"
                          }
                          onChange={handleDeptChange}
                          options={departments}
                          styles={customSelectStyles}
                          placeholder="Select Department"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Designation <span className="text-danger">*</span>
                        </label>
                        <Select
                          defaultValue={
                            selectedUserAccount[indexToEdit]?.designation
                              ? {
                                  value:
                                    userAcct[indexToEdit].designation.value,
                                  label:
                                    userAcct[indexToEdit].designation.label,
                                }
                              : "Select Designation"
                          }
                          onChange={handleRoleChange}
                          options={roles}
                          styles={customSelectStyles}
                          placeholder="Select Designation"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="table-responsive m-t-15">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th>Module Permission</th>
                        <th className="text-center">Read</th>
                        <th className="text-center">Write</th>
                        <th className="text-center">Create</th>
                        <th className="text-center">Delete</th>
                        <th className="text-center">Import</th>
                        <th className="text-center">Export</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={1}>
                        <td>Holidays</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr key={2}>
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
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr key={3}>
                        <td>Clients</td>
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
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr key={4}>
                        <td>Projects</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr key={5}>
                        <td>Tasks</td>
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
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr key={6}>
                        <td>Chats</td>
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
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr key={7}>
                        <td>Assets</td>
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
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                      <tr key={8}>
                        <td>Timing Sheets</td>
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
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input type="checkbox" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
                  <div className="submit-section">
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary submit-btn"
                    >
                      {selectedUserAccount[indexToEdit]?.id ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </PopupContainer>
      </PopupWrapper>
      {/* /Add Employee Modal */}
    </>
  );
};

export default Addemployee