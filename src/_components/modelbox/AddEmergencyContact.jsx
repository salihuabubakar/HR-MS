import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
  Card,
} from "../../_components/modelbox/Addemployee.style";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import Select from "react-select";
const AddEmergencyContact = ({ dispatchUserAcct, userAcct, emIndex }) => {
  const [selectedUserAccount] = useGlobalState("selectedUserAccount");

  const [primaryName, setPrimaryName] = useState(
    selectedUserAccount[emIndex]?.primaryName
      ? selectedUserAccount[emIndex]?.primaryName
      : ""
  );
  const [primaryRelationship, setPrimaryRelationship] = useState(
    selectedUserAccount[emIndex]?.primaryRelationship
      ? selectedUserAccount[emIndex]?.primaryRelationship
      : ""
  );
  const [primaryPhone1, setPrimaryPhone1] = useState(
    selectedUserAccount[emIndex]?.primaryPhone1
      ? selectedUserAccount[emIndex]?.primaryPhone1
      : ""
  );
  const [primaryPhone2, setPrimaryPhone2] = useState(
    selectedUserAccount[emIndex]?.primaryPhone2
      ? selectedUserAccount[emIndex]?.primaryPhone2
      : ""
  );
    const [secondaryName, setSecondaryName] = useState(
      selectedUserAccount[emIndex]?.secondaryName
        ? selectedUserAccount[emIndex]?.secondaryName
        : ""
    );
  const [secondaryRelationship, setSecondaryRelationship] = useState(
    selectedUserAccount[emIndex]?.secondaryRelationship
      ? selectedUserAccount[emIndex]?.secondaryRelationship
      : ""
  );
  const [secondaryPhone1, setSecondaryPhone1] = useState(
    selectedUserAccount[emIndex]?.secondaryPhone1
      ? selectedUserAccount[emIndex]?.secondaryPhone1
      : ""
  );
  const [secondaryPhone2, setSecondaryPhone2] = useState(
    selectedUserAccount[emIndex]?.secondaryPhone2
      ? selectedUserAccount[emIndex]?.secondaryPhone2
      : ""
  );


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
  const [country] = useState(
    selectedUserAccount[emIndex]?.profileInfo?.country
      ? selectedUserAccount[emIndex]?.profileInfo?.country
      : ""
  );
  const [pinCode] = useState(
    selectedUserAccount[emIndex]?.profileInfo?.pinCode
      ? selectedUserAccount[emIndex]?.profileInfo?.pinCode
      : ""
  );
  const [phoneNo] = useState(
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const emergencyContact = {
      primary: {
        primaryName,
        primaryRelationship,
        primaryPhone1,
        primaryPhone2
      },
      secondary: {
        secondaryName,
        secondaryRelationship,
        secondaryPhone1,
        secondaryPhone2
      }
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
    setGlobalState("showEmergencyContactModal", false);
    // if (selectedProfileInfo[indexToEdit]?.id) {
    //   dispatchUserAcct({ type: "update", payload: profileInfo });
    // }
    // setGlobalState("showModal", false);
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
                onClick={() =>
                  setGlobalState("showEmergencyContactModal", false)
                }
              >
                <span>×</span>
              </button>
            </div>
          </div>
          <div className="card-body">
            <form>
              <div className="row-">
                <div className="Primary">
                  <h3>Primary</h3>
                  <div className="col-sm">
                    <div className="right">
                      <label className="label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={primaryName}
                        onChange={(event) => setPrimaryName(event.target.value)}
                      />
                    </div>

                    <div className="">
                      <label className="label">Relationship</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Relationship"
                        value={primaryRelationship}
                        onChange={(event) =>
                          setPrimaryRelationship(event.target.value)
                        }
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
                        value={primaryPhone1}
                        onChange={(event) =>
                          setPrimaryPhone1(event.target.value)
                        }
                      />
                    </div>
                    <div className="">
                      <label className="label">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Phone Number"
                        value={primaryPhone2}
                        onChange={(event) =>
                          setPrimaryPhone2(event.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="Secondary">
                  <h3>Secondary</h3>
                  <div className="col-sm">
                    <div className="right">
                      <label className="label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={secondaryName}
                        onChange={(event) =>
                          setSecondaryName(event.target.value)
                        }
                      />
                    </div>

                    <div className="">
                      <label className="label">Relationship</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Relationship"
                        value={secondaryRelationship}
                        onChange={(event) =>
                          setSecondaryRelationship(event.target.value)
                        }
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
                        value={secondaryPhone1}
                        onChange={(event) =>
                          setSecondaryPhone1(event.target.value)
                        }
                      />
                    </div>
                    <div className="">
                      <label className="label">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Phone Number"
                        value={secondaryPhone2}
                        onChange={(event) =>
                          setSecondaryPhone2(event.target.value)
                        }
                      />
                    </div>
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

export default AddEmergencyContact;
