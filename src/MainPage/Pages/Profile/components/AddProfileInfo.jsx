import React, { useState, useEffect, useReducer } from 'react';
import { PopupWrapper, PopupContainer, PopupOverlay } from '../../../../_components/modelbox/Addemployee.style';
import { setGlobalState, useGlobalState } from '../../../../context/GlobalState';
import Select from "react-select";
import {
  initDept,
  savedDeptReducer,
  initDesignation,
  savedDesignationReducer,
} from "../../../../utils/localStorage";
import { HtmlDateInput } from "./styles";



const AddProfileInfo = ({ dispatchUserAcct, userAcct, emIndex }) => {
  const [selectedUserAccount] = useGlobalState("selectedUserAccount");
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


  const [userName] = useState(
    selectedUserAccount[emIndex]?.userName
      ? selectedUserAccount[emIndex]?.userName
      : ""
  );
  const [email] = useState(
    selectedUserAccount[emIndex]?.email
      ? selectedUserAccount[emIndex]?.email
      : ""
  );
  const [password] = useState(
    selectedUserAccount[emIndex]?.password
      ? selectedUserAccount[emIndex]?.password
      : ""
  );
  const [confirmPassword] = useState(
    selectedUserAccount[emIndex]?.confirmPassword
      ? selectedUserAccount[emIndex]?.confirmPassword
      : ""
  );
    const [company, setCompany] = useState(
      selectedUserAccount[emIndex]?.company
        ? selectedUserAccount[emIndex]?.company
        : ""
    );
    const [dept, setDept] = useState(
      selectedUserAccount[emIndex]?.dept
        ? selectedUserAccount[emIndex]?.dept
        : ""
    );
    const [designation, setDesignation] = useState(
      selectedUserAccount[emIndex]?.designation
        ? selectedUserAccount[emIndex]?.designation
        : ""
    );
    const [employeeId] = useState(
      selectedUserAccount[emIndex]?.employeeId
        ? selectedUserAccount[emIndex]?.employeeId
        : ""
    );
    const [joinDate] = useState(
      selectedUserAccount[emIndex]?.joinDate
        ? selectedUserAccount[emIndex]?.joinDate
        : ""
    );

    const [image] = useState(
      selectedUserAccount[emIndex]?.image
        ? selectedUserAccount[emIndex]?.image
        : ""
    );


  const [firstName, setFirstName] = useState(
    selectedUserAccount[emIndex]?.firstName
      ? selectedUserAccount[emIndex]?.firstName
      : ""
  );
  const [lastName, setLastName] = useState(
    selectedUserAccount[emIndex]?.lastName
      ? selectedUserAccount[emIndex]?.lastName
      : ""
  );
  const [address, setAddress] = useState(
    selectedUserAccount[emIndex]?.profileInfo?.address
      ? selectedUserAccount[emIndex]?.profileInfo?.address
      : ""
  );
  const [state, setState] = useState(
    selectedUserAccount[emIndex]?.profileInfo?.state
      ? selectedUserAccount[emIndex]?.profileInfo?.state
      : ""
  );
  const [country, setCountry] = useState(
    selectedUserAccount[emIndex]?.profileInfo?.country
      ? selectedUserAccount[emIndex]?.profileInfo?.country
      : ""
  );
  const [pinCode, setPinCode] = useState(
    selectedUserAccount[emIndex]?.profileInfo?.pinCode
      ? selectedUserAccount[emIndex]?.profileInfo?.pinCode
      : ""
  );
  const [phoneNo, setPhoneNo] = useState(
    selectedUserAccount[emIndex]?.phoneNo
      ? selectedUserAccount[emIndex]?.phoneNo
      : ""
  );
  const [dOB, setDOB] = useState(
    selectedUserAccount[emIndex]?.profileInfo?.dOB
      ? selectedUserAccount[emIndex]?.profileInfo?.dOB
      : ""
  );

  const [id] = useState(
    selectedUserAccount[emIndex]?.id
      ? selectedUserAccount[emIndex]?.id
      : Date.now()
  );

  const [passPortNo] = useState(
    selectedUserAccount[emIndex]?.personalInfo?.passPortNo
      ? selectedUserAccount[emIndex]?.personalInfo?.passPortNo
      : ""
  );

  const [passportExpiryDate] = useState(
    selectedUserAccount[emIndex]?.personalInfo?.passportExpiryDate
      ? selectedUserAccount[emIndex]?.personalInfo?.passportExpiryDate
      : ""
  );

  const [religion] = useState(
    selectedUserAccount[emIndex]?.personalInfo?.religion
      ? selectedUserAccount[emIndex]?.personalInfo?.religion
      : ""
  );

  const [emSpouse] = useState(
    selectedUserAccount[emIndex]?.personalInfo?.emSpouse
      ? selectedUserAccount[emIndex]?.personalInfo?.emSpouse
      : ""
  );

  const [noChildren] = useState(
    selectedUserAccount[emIndex]?.personalInfo?.noChildren
      ? selectedUserAccount[emIndex]?.personalInfo?.noChildren
      : ""
  );

      const [primaryName] = useState(
      selectedUserAccount[emIndex]?.emergencyContact?.primary?.primaryName
        ? selectedUserAccount[emIndex]?.emergencyContact?.primary?.primaryName
        : ""
    );
  const [primaryRelationship] = useState(
    selectedUserAccount[emIndex]?.emergencyContact?.primary?.primaryRelationship
      ? selectedUserAccount[emIndex]?.emergencyContact?.primary?.primaryRelationship
      : ""
  );
  const [primaryPhone1] = useState(
    selectedUserAccount[emIndex]?.emergencyContact?.primary?.primaryPhone1
      ? selectedUserAccount[emIndex]?.emergencyContact?.primary?.primaryPhone1
      : ""
  );
  const [primaryPhone2] = useState(
    selectedUserAccount[emIndex]?.emergencyContact?.primary?.primaryPhone2
      ? selectedUserAccount[emIndex]?.emergencyContact?.primary?.primaryPhone2
      : ""
  );
    const [secondaryName] = useState(
      selectedUserAccount[emIndex]?.emergencyContact?.secondary?.secondaryName
        ? selectedUserAccount[emIndex]?.emergencyContact?.secondary?.secondaryName
        : ""
    );
  const [secondaryRelationship] = useState(
    selectedUserAccount[emIndex]?.emergencyContact?.secondary?.secondaryRelationship
      ? selectedUserAccount[emIndex]?.emergencyContact?.secondary?.secondaryRelationship
      : ""
  );
  const [secondaryPhone1] = useState(
    selectedUserAccount[emIndex]?.emergencyContact?.secondary?.secondaryPhone1
      ? selectedUserAccount[emIndex]?.emergencyContact?.secondary?.secondaryPhone1
      : ""
  );
  const [secondaryPhone2] = useState(
    selectedUserAccount[emIndex]?.emergencyContact?.secondary?.secondaryPhone2
      ? selectedUserAccount[emIndex]?.emergencyContact?.secondary?.secondaryPhone2
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
    const profileInfo = {
      address,
      state,
      country,
      dOB,
      pinCode,
    };
    const personalInfo = {
      passPortNo,
      passportExpiryDate,
      religion,
      emSpouse,
      noChildren,
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
    if (selectedUserAccount[emIndex]?.id) {
      dispatchUserAcct({ type: "update", payload: userAccount });
     } else {
      dispatchUserAcct({ type: "push", payload: userAccount });
    }
    setGlobalState("showProfileModal", false);
    // if (selectedProfileInfo[indexToEdit]?.id) {
    //   dispatchUserAcct({ type: "update", payload: profileInfo });
    // }
    // setGlobalState("showModal", false);
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
       height: "45px",
      //  width: "190px"
     }),
    };

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


  const handleDateOfBirth = (event) => {
    const d = event.target.value;
    console.log("date: ", d);
    setDOB(d);
  };
  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer
            bigForm="lessBigForm"
            className="custom-modal"
            role="dialog"
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">Profile Information</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showProfileModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      {/* <div className="col-sm-12">
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
                      </div> */}
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="focus-label">First Name</label>
                          <input
                            type="text"
                            className="form-control floating"
                            value={firstName}
                            onChange={(event) =>
                              setFirstName(event.target.value)
                            }
                            placeholder="First Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="focus-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control floating"
                            value={lastName}
                            onChange={(event) =>
                              setLastName(event.target.value)
                            }
                            placeholder="last Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Birth of Date
                          </label>
                          <div>
                            <input
                              className="form-control datetimepicker"
                              type="date"
                              value={dOB}
                              onChange={handleDateOfBirth}
                              placeholder="Date of Birth"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Gender</label>
                          <select className="select">
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Address <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control floating"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            placeholder="Address"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            State <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control floating"
                            value={state}
                            onChange={(event) => setState(event.target.value)}
                            placeholder="state"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Country</label>
                          <input
                            type="text"
                            className="form-control floating"
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                            placeholder="country"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Pin code</label>
                          <input
                            type="text"
                            className="form-control floating"
                            value={pinCode}
                            onChange={(event) => setPinCode(event.target.value)}
                            placeholder="Pin Code"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Phone Number</label>
                          <input
                            type="text"
                            className="form-control floating"
                            value={phoneNo}
                            onChange={(event) => setPhoneNo(event.target.value)}
                            placeholder="phone Number"
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
                              selectedUserAccount[emIndex]?.dept
                                ? {
                                    value: userAcct[emIndex].dept.value,
                                    label: userAcct[emIndex].dept.label,
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
                              selectedUserAccount[emIndex]?.designation
                                ? {
                                    value: userAcct[emIndex].designation.value,
                                    label: userAcct[emIndex].designation.label,
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
                        {selectedUserAccount[emIndex]?.id ? "Update" : "Save"}
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

export default AddProfileInfo;