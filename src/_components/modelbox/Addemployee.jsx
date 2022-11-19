import React, { useState, useEffect, useReducer } from "react";
import Select from "react-select";
import { useGlobalState, setGlobalState } from '../../context/GlobalState';
import {
  initDept,
  savedDeptReducer,
  initDesignation,
  savedDesignationReducer,
  initHouse,
  savedHouseReducer
} from "../../utils/localStorage";
import {
  PopupWrapper,
  PopupOverlay,
  PopupContainer,
  Card,
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

  const [image, setImage] = useState(
    selectedUserAccount[indexToEdit]?.profileInfo?.image
      ? selectedUserAccount[indexToEdit]?.profileInfo?.image
      : ""
  );
  const [address, setAddress] = useState(
    selectedUserAccount[indexToEdit]?.profileInfo?.address
      ? selectedUserAccount[indexToEdit]?.profileInfo?.address
      : ""
  );
  const [state, setState] = useState(
    selectedUserAccount[indexToEdit]?.profileInfo?.state
      ? selectedUserAccount[indexToEdit]?.profileInfo?.state
      : ""
  );
  const [country, setCountry] = useState(
    selectedUserAccount[indexToEdit]?.profileInfo?.country
      ? selectedUserAccount[indexToEdit]?.profileInfo?.country
      : ""
  );
  const [pinCode, setPinCode] = useState(
    selectedUserAccount[indexToEdit]?.profileInfo?.pinCode
      ? selectedUserAccount[indexToEdit]?.profileInfo?.pinCode
      : ""
  );
  const [dOB, setDOB] = useState(
    selectedUserAccount[indexToEdit]?.profileInfo?.dOB
      ? selectedUserAccount[indexToEdit]?.profileInfo?.dOB
      : ""
  );


    const [passPortNo, setPassportNo] = useState(
      selectedUserAccount[indexToEdit]?.personalInfo?.passPortNo
        ? selectedUserAccount[indexToEdit]?.personalInfo?.passPortNo
        : ""
    );

  const [passportExpiryDate, setPassportExpiryDate] = useState(
    selectedUserAccount[indexToEdit]?.personalInfo?.passportExpiryDate
      ? selectedUserAccount[indexToEdit]?.personalInfo?.passportExpiryDate
      : ""
  );

  const [religion, setReligion] = useState(
    selectedUserAccount[indexToEdit]?.personalInfo?.religion
      ? selectedUserAccount[indexToEdit]?.personalInfo?.religion
      : ""
  );

  const [emSpouse, setEmSpouse] = useState(
    selectedUserAccount[indexToEdit]?.personalInfo?.emSpouse
      ? selectedUserAccount[indexToEdit]?.personalInfo?.emSpouse
      : ""
  );

  const [noChildren, setNoChildren] = useState(
    selectedUserAccount[indexToEdit]?.personalInfo?.noChildren
      ? selectedUserAccount[indexToEdit]?.personalInfo?.noChildren
      : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const personalInfo = {
      passPortNo,
      passportExpiryDate,
      religion,
      emSpouse,
      noChildren,
    };
    const profileInfo = {
      image,
      address,
      state,
      country,
      dOB,
      pinCode,
    };
    const userAccount = {
      id,
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
      profileInfo,
      personalInfo,
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
        <PopupContainer className="custom-modal" role="dialog">
          <Card className="" role="document">
            <div className="card-content">
              <div className="card-header">
                <h5 className="card-title">
                  {selectedUserAccount[indexToEdit]?.id
                    ? "Edit Employee"
                    : "Add Employee"}
                </h5>
                <div className="btn-container">
                  <button
                    type="button"
                    className="closeX"
                    onClick={() => setGlobalState("showModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <form>
                  <div className="row-">
                    <div className="col-sm">
                      <div className="right">
                        <label className="label">
                          First Name <span className="text-danger">*</span>
                        </label>
                        <input
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                          className="form-control"
                          type="text"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="">
                        <label className="label">Last Name</label>
                        <input
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                          className="form-control"
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="right">
                        <label className="label">
                          Username <span className="text-danger">*</span>
                        </label>
                        <input
                          value={userName}
                          onChange={(event) => setUserName(event.target.value)}
                          className="form-control"
                          type="text"
                          placeholder="Username"
                        />
                      </div>
                      <div className="">
                        <label className="label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          className="form-control"
                          type="email"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="right">
                        <label className="label">Password</label>
                        <input
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          className="form-control"
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                      <div className="">
                        <label className="label">Confirm Password</label>
                        <input
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
                          className="form-control"
                          type="password"
                          placeholder="Confirm Password"
                        />
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="right">
                        <label className="label">
                          Employee ID <span className="text-danger">*</span>
                        </label>
                        <input
                          value={employeeId}
                          onChange={(event) =>
                            setEmployeeId(event.target.value)
                          }
                          type="text"
                          className="form-control"
                          placeholder="Employee ID"
                        />
                      </div>
                      <div className="">
                        <label className="label">
                          Joining Date <span className="text-danger">*</span>
                        </label>
                        <div>
                          <input
                            className=" datetimepicker"
                            type="date"
                            value={joinDate}
                            onChange={(event) =>
                              setJoinDate(event.target.value)
                            }
                            placeholder="Joining Date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="right">
                        <label className="label">Phone </label>
                        <input
                          value={phoneNo}
                          onChange={(event) => setPhoneNo(event.target.value)}
                          className="form-control"
                          type="text"
                          placeholder="Phone"
                        />
                      </div>
                      <div className="">
                        <label className="label">Company</label>
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
                    <div className="col-sm">
                      <div className="right">
                        <label className="label">
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
                      <div className="">
                        <label className="label">
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
                  <div className="submit-btn">
                    <button onClick={handleSubmit} className="submit-Btn">
                      {selectedUserAccount[indexToEdit]?.id ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </PopupContainer>
      </PopupWrapper>
      {/* /Add Employee Modal */}
    </>
  );
};

export default Addemployee