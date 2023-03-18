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
import { HtmlDateInput } from "./styles";

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

  const [image, setImage] = useState(
    selectedUserAccount[indexToEdit]?.image
      ? selectedUserAccount[indexToEdit]?.image
      : ""
  );

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
  const [id] = useState(
    selectedUserAccount[indexToEdit]?.id
    ? selectedUserAccount[indexToEdit]?.id
    : Date.now()
  );

  // const [image] = useState(
  //   selectedUserAccount[indexToEdit]?.profileInfo?.image
  //     ? selectedUserAccount[indexToEdit]?.profileInfo?.image
  //     : ""
  // );
  const [address] = useState(
    selectedUserAccount[indexToEdit]?.profileInfo?.address
      ? selectedUserAccount[indexToEdit]?.profileInfo?.address
      : ""
  );
  const [state] = useState(
    selectedUserAccount[indexToEdit]?.profileInfo?.state
      ? selectedUserAccount[indexToEdit]?.profileInfo?.state
      : ""
  );
  const [country] = useState(
    selectedUserAccount[indexToEdit]?.profileInfo?.country
      ? selectedUserAccount[indexToEdit]?.profileInfo?.country
      : ""
  );
  const [pinCode] = useState(
    selectedUserAccount[indexToEdit]?.profileInfo?.pinCode
      ? selectedUserAccount[indexToEdit]?.profileInfo?.pinCode
      : ""
  );
  const [dOB] = useState(
    selectedUserAccount[indexToEdit]?.profileInfo?.dOB
      ? selectedUserAccount[indexToEdit]?.profileInfo?.dOB
      : ""
  );


    const [passPortNo] = useState(
      selectedUserAccount[indexToEdit]?.personalInfo?.passPortNo
        ? selectedUserAccount[indexToEdit]?.personalInfo?.passPortNo
        : ""
    );

  const [passportExpiryDate] = useState(
    selectedUserAccount[indexToEdit]?.personalInfo?.passportExpiryDate
      ? selectedUserAccount[indexToEdit]?.personalInfo?.passportExpiryDate
      : ""
  );

  const [religion] = useState(
    selectedUserAccount[indexToEdit]?.personalInfo?.religion
      ? selectedUserAccount[indexToEdit]?.personalInfo?.religion
      : ""
  );

  const [emSpouse] = useState(
    selectedUserAccount[indexToEdit]?.personalInfo?.emSpouse
      ? selectedUserAccount[indexToEdit]?.personalInfo?.emSpouse
      : ""
  );

  const [noChildren] = useState(
    selectedUserAccount[indexToEdit]?.personalInfo?.noChildren
      ? selectedUserAccount[indexToEdit]?.personalInfo?.noChildren
      : ""
  );

  const [primaryName] = useState(
    selectedUserAccount[indexToEdit]?.emergencyContact?.primary?.primaryName
      ? selectedUserAccount[indexToEdit]?.emergencyContact?.primary?.primaryName
      : ""
  );
  const [primaryRelationship] = useState(
    selectedUserAccount[indexToEdit]?.emergencyContact?.primary?.primaryRelationship
      ? selectedUserAccount[indexToEdit]?.emergencyContact?.primary?.primaryRelationship
      : ""
  );
  const [primaryPhone1] = useState(
    selectedUserAccount[indexToEdit]?.emergencyContact?.primary?.primaryPhone1
      ? selectedUserAccount[indexToEdit]?.emergencyContact?.primary?.primaryPhone1
      : ""
  );
  const [primaryPhone2] = useState(
    selectedUserAccount[indexToEdit]?.emergencyContact?.primary?.primaryPhone2
      ? selectedUserAccount[indexToEdit]?.emergencyContact?.primary?.primaryPhone2
      : ""
  );
    const [secondaryName] = useState(
      selectedUserAccount[indexToEdit]?.emergencyContact?.secondary?.secondaryName
        ? selectedUserAccount[indexToEdit]?.emergencyContact?.secondary?.secondaryName
        : ""
    );
  const [secondaryRelationship] = useState(
    selectedUserAccount[indexToEdit]?.emergencyContact?.secondary?.secondaryRelationship
      ? selectedUserAccount[indexToEdit]?.emergencyContact?.secondary?.secondaryRelationship
      : ""
  );
  const [secondaryPhone1] = useState(
    selectedUserAccount[indexToEdit]?.emergencyContact?.secondary?.secondaryPhone1
      ? selectedUserAccount[indexToEdit]?.emergencyContact?.secondary?.secondaryPhone1
      : ""
  );
  const [secondaryPhone2] = useState(
    selectedUserAccount[indexToEdit]?.emergencyContact?.secondary?.secondaryPhone2
      ? selectedUserAccount[indexToEdit]?.emergencyContact?.secondary?.secondaryPhone2
      : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
     const emergencyContact = {
       primary: {
         primaryName,
         primaryRelationship,
         primaryPhone1,
         primaryPhone2,
       },
       secondary: {
         secondaryName,
         secondaryRelationship,
         secondaryPhone1,
         secondaryPhone2,
       },
     };
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
      image,
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
      emergencyContact,
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
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#ddd",
      height: "50px",
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

  const imageOnChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setImage(base64Image);
      //  setImage(URL.createObjectURL(event.target.files[0]));
    };
  };

  return (
    <>
      {/* Add Employee Modal */}
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer
            top={true}
            className="custom-modal"
            role="dialog"
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedUserAccount[indexToEdit]?.id
                      ? "Edit Employee"
                      : "Add Employee"}
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
                      <div className="col-sm-12">
                        <div
                          style={{ borderRadius: "5px" }}
                          className="profile-img-wrap edit-img"
                        >
                          <img
                            style={{ borderRadius: "5px" }}
                            className="inline-block"
                            src={image}
                            alt="user"
                          />
                          <div className="fileupload btn">
                            <span className="btn-text">edit</span>
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
                            value={firstName}
                            onChange={(event) =>
                              setFirstName(event.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="First Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Last Name</label>
                          <input
                            value={lastName}
                            onChange={(event) =>
                              setLastName(event.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Last Name"
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
                            onChange={(event) =>
                              setUserName(event.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Username"
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
                            className="form-control floatng"
                            type="email"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Password</label>
                          <input
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            className="form-control floating"
                            type="password"
                            placeholder="Password"
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
                            className="form-control floating"
                            type="password"
                            placeholder="Confirm Password"
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
                            className="form-control floating"
                            placeholder="Employee ID"
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
                              placeholder="Joining Date"
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
                            className="form-control floating"
                            type="text"
                            placeholder="Phone"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
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
                      <div className="col-md-6">
                        <div className="form-group">
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
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
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
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {selectedUserAccount[indexToEdit]?.id
                          ? "Update"
                          : "Save"}
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