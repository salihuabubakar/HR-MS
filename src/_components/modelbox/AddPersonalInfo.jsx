import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
  Card,
} from "../../_components/modelbox/Addemployee.style";
import {
  setGlobalState,
  useGlobalState,
} from "../../context/GlobalState";
import Select from "react-select";
const AddPersonalInfo = ({ dispatchUserAcct, userAcct, emIndex }) => {
  const [selectedUserAccount] = useGlobalState("selectedUserAccount");

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
  const [company] = useState(
    selectedUserAccount[emIndex]?.company
      ? selectedUserAccount[emIndex]?.company
      : ""
  );
  const [dept] = useState(
    selectedUserAccount[emIndex]?.dept ? selectedUserAccount[emIndex]?.dept : ""
  );
  const [designation] = useState(
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
    selectedUserAccount[emIndex]?.profileInfo?.image
      ? selectedUserAccount[emIndex]?.profileInfo?.image
      : ""
  );

  const [firstName] = useState(
    selectedUserAccount[emIndex]?.firstName
      ? selectedUserAccount[emIndex]?.firstName
      : ""
  );
  const [lastName] = useState(
    selectedUserAccount[emIndex]?.lastName
      ? selectedUserAccount[emIndex]?.lastName
      : ""
  );
  const [address] = useState(
    selectedUserAccount[emIndex]?.profileInfo?.address
      ? selectedUserAccount[emIndex]?.profileInfo?.address
      : ""
  );
  const [state] = useState(
    selectedUserAccount[emIndex]?.profileInfo?.state
      ? selectedUserAccount[emIndex]?.profileInfo?.state
      : ""
  );
  const [country, setCountry] = useState(
    selectedUserAccount[emIndex]?.profileInfo?.country
      ? selectedUserAccount[emIndex]?.profileInfo?.country
      : ""
  );
  const [pinCode] = useState(
    selectedUserAccount[emIndex]?.profileInfo?.pinCode
      ? selectedUserAccount[emIndex]?.profileInfo?.pinCode
      : ""
  );
  const [phoneNo, setPhoneNo] = useState(
    selectedUserAccount[emIndex]?.phoneNo
      ? selectedUserAccount[emIndex]?.phoneNo
      : ""
  );
  const [dOB] = useState(
    selectedUserAccount[emIndex]?.profileInfo?.dOB
      ? selectedUserAccount[emIndex]?.profileInfo?.dOB
      : ""
  );

  const [id] = useState(
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
      emergencyContact,
    };
    if (selectedUserAccount[emIndex]?.id) {
      dispatchUserAcct({ type: "update", payload: userAccount });
    } else {
      dispatchUserAcct({ type: "push", payload: userAccount });
    }
    setGlobalState("showPersonalInfoModal", false);
    // if (selectedProfileInfo[indexToEdit]?.id) {
    //   dispatchUserAcct({ type: "update", payload: profileInfo });
    // }
    // setGlobalState("showModal", false);
  };

  const handlePassExpire = (event) => {
    const d = event.target.value;
    console.log("date: ", d);
    setPassportExpiryDate(d);
  };
  return (
    <PopupWrapper className=" custom-modal" role="dialog">
      <PopupOverlay />
      <PopupContainer className="" role="document">
        <Card className="card-content">
          <div className="card-header">
            <h5 className="card-title">Personal Information</h5>
            <div className="btn-container">
              <button
                className="closeX"
                type="button"
                onClick={() => setGlobalState("showPersonalInfoModal", false)}
              >
                <span>×</span>
              </button>
            </div>
          </div>
          <div className="card-body">
            <form>
              <div className="row-">
                <div className="col-sm">
                  <div className="right">
                    <label className="label">Passport No</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Passport No"
                      value={passPortNo}
                      onChange={(event) => setPassportNo(event.target.value)}
                    />
                  </div>

                  <div className="">
                    <label className="label">Passport Expiry Date</label>
                    <input
                      type="date"
                      className="form-control datetimepicker"
                      placeholder="Passport Expiry Date"
                      value={passportExpiryDate}
                      onChange={handlePassExpire}
                    />
                  </div>
                </div>

                <div className="col-sm">
                  <div className="right">
                    <label className="label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="phone Number"
                      value={phoneNo}
                      onChange={(event) => setPhoneNo(event.target.value)}
                    />
                  </div>

                  <div className="">
                    <label className="label">
                      Nationality <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nationality"
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                    />
                  </div>
                </div>

                <div className="col-sm">
                  <div className="right">
                    <label className="label">Religion</label>
                    <div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Religion"
                        value={religion}
                        onChange={(event) => setReligion(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="">
                    <label className="label">
                      Marital status <span className="text-danger">*</span>
                    </label>
                    <select
                      defaultValue="Select Status"
                      className="select form-control"
                    >
                      <option>Single</option>
                      <option>Married</option>
                    </select>
                  </div>
                </div>

                <div className="col-sm">
                  <div className="right">
                    <label className="label">Employment of spouse</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Employment of spouse"
                      value={emSpouse}
                      onChange={(event) => setEmSpouse(event.target.value)}
                    />
                  </div>

                  <div className="">
                    <label>No. of children </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="No. of children"
                      value={noChildren}
                      onChange={(event) => setNoChildren(event.target.value)}
                    />
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

export default AddPersonalInfo;
