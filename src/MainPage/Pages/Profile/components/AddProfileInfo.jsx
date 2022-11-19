import React, { useState, useEffect, useReducer } from 'react';
import { PopupWrapper, PopupContainer, PopupOverlay, Card } from '../../../../_components/modelbox/Addemployee.style';
import { setGlobalState, useGlobalState } from '../../../../context/GlobalState';
import Select from "react-select";
import {
  initDept,
  savedDeptReducer,
  initDesignation,
  savedDesignationReducer,
  initHouse,
  savedHouseReducer,
} from "../../../../utils/localStorage";
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


  const [userName, setUserName] = useState(
    selectedUserAccount[emIndex]?.userName
      ? selectedUserAccount[emIndex]?.userName
      : ""
  );
  const [email, setEmail] = useState(
    selectedUserAccount[emIndex]?.email
      ? selectedUserAccount[emIndex]?.email
      : ""
  );
  const [password, setPassword] = useState(
    selectedUserAccount[emIndex]?.password
      ? selectedUserAccount[emIndex]?.password
      : ""
  );
  const [confirmPassword, setConfirmPassword] = useState(
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
    const [employeeId, setEmployeeId] = useState(
      selectedUserAccount[emIndex]?.employeeId
        ? selectedUserAccount[emIndex]?.employeeId
        : ""
    );
    const [joinDate, setJoinDate] = useState(
      selectedUserAccount[emIndex]?.joinDate
        ? selectedUserAccount[emIndex]?.joinDate
        : ""
    );





  const [image, setImage] = useState(
    selectedUserAccount[emIndex]?.profileInfo?.image
      ? selectedUserAccount[emIndex]?.profileInfo?.image
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

  const [id, setId] = useState(
    selectedUserAccount[emIndex]?.id
      ? selectedUserAccount[emIndex]?.id
      : Date.now()
  );

  const [passPortNo, setPassportNo] = useState(
    selectedUserAccount[emIndex]?.personalInfo?.passPortNo
      ? selectedUserAccount[emIndex]?.personalInfo?.passPortNo
      : ""
  );

  const [passportExpiryDate, setPassportExpiryDate] = useState(
    selectedUserAccount[emIndex]?.personalInfo?.passportExpiryDate
      ? selectedUserAccount[emIndex]?.personalInfo?.passportExpiryDate
      : ""
  );

  const [religion, setReligion] = useState(
    selectedUserAccount[emIndex]?.personalInfo?.religion
      ? selectedUserAccount[emIndex]?.personalInfo?.religion
      : ""
  );

  const [emSpouse, setEmSpouse] = useState(
    selectedUserAccount[emIndex]?.personalInfo?.emSpouse
      ? selectedUserAccount[emIndex]?.personalInfo?.emSpouse
      : ""
  );

  const [noChildren, setNoChildren] = useState(
    selectedUserAccount[emIndex]?.personalInfo?.noChildren
      ? selectedUserAccount[emIndex]?.personalInfo?.noChildren
      : ""
  );
  const imageOnChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const profileInfo = {
      image,
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
    <PopupWrapper className=" custom-modal" role="dialog">
      <PopupOverlay />
      <PopupContainer className="" role="document">
        <Card className="card-content">
          <div className="card-header">
            <h5 className="card-title">Profile Information</h5>
            <div className="btn-container">
              <button
                className="closeX"
                type="button"
                onClick={() => setGlobalState("showProfileModal", false)}
              >
                <span>×</span>
              </button>
            </div>
          </div>
          <div className="card-body">
            <form>
              <div className="row-">
                <div className="col-sm">
                  <div className="profile-img-wrap edit-img">
                    <img className="inline-block" src={image} alt="user" />
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

                <div className="col-sm">
                  <div className="right">
                    <label className="label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder="First Name"
                    />
                  </div>

                  <div className="">
                    <label className="label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder="last Name"
                    />
                  </div>
                </div>

                <div className="col-sm">
                  <div className="right">
                    <label className="label">Birth Date</label>
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

                  <div className="">
                    <label className="label">Gender</label>
                    <select className="select form-control">
                      <option value="male selected">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="col-sm">
                  <div className="right">
                    <label className="label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      placeholder="Address"
                    />
                  </div>

                  <div className="">
                    <label className="label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      value={state}
                      onChange={(event) => setState(event.target.value)}
                      placeholder="state"
                    />
                  </div>
                </div>

                <div className="col-sm">
                  <div className="right">
                    <label className="label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                      placeholder="country"
                    />
                  </div>

                  <div className="">
                    <label className="label">Pin Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={pinCode}
                      onChange={(event) => setPinCode(event.target.value)}
                      placeholder="Pin Code"
                    />
                  </div>
                </div>

                <div className="col-sm">
                  <div className="right">
                    <label className="label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={phoneNo}
                      onChange={(event) => setPhoneNo(event.target.value)}
                      placeholder="phone Number"
                    />
                  </div>

                  <div className="">
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

                <div className="col-sm">
                  <div className="right">
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

                  <div className="">
                    <label className="label">
                      Reports To <span className="text-danger">*</span>
                    </label>
                    <select className="select">
                      <option>-</option>
                      <option>Wilmer Deluna</option>
                      <option>Lesley Grauer</option>
                      <option>Jeffery Lalor</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="submit-btn">
                <button onClick={handleSubmit} className="submit-Btn">
                  {selectedUserAccount[emIndex]?.id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </Card>
      </PopupContainer>
    </PopupWrapper>
  );
};

export default AddProfileInfo;