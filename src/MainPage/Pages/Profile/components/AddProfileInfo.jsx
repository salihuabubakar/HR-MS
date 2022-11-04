import React, { useState, useEffect } from 'react';
import { PopupWrapper, PopupContainer, PopupOverlay, Card } from '../../../../_components/modelbox/Addemployee.style';
import { setGlobalState, useGlobalState } from '../../../../context/GlobalState';
const AddProfileInfo = ({ indexToEdit, dispatchEmployeeProfilInfo }) => {
  const [selectedProfileInfo] = useGlobalState("selectedProfileInfo");

  const [image, setImage] = useState(
    selectedProfileInfo[indexToEdit]?.image
      ? selectedProfileInfo[indexToEdit]?.image
      : ""
  );

  const [firstName, setFirstName] = useState(
    selectedProfileInfo[indexToEdit]?.firstName
      ? selectedProfileInfo[indexToEdit]?.firstName
      : ""
  );
  const [lastName, setLastName] = useState(
    selectedProfileInfo[indexToEdit]?.lastName
      ? selectedProfileInfo[indexToEdit]?.lastName
      : ""
  );
  const [address, setAddress] = useState(
    selectedProfileInfo[indexToEdit]?.address
      ? selectedProfileInfo[indexToEdit]?.address
      : ""
  );
  const [state, setState] = useState(
    selectedProfileInfo[indexToEdit]?.state
      ? selectedProfileInfo[indexToEdit]?.state
      : ""
  );
  const [country, setCountry] = useState(
    selectedProfileInfo[indexToEdit]?.contry
      ? selectedProfileInfo[indexToEdit]?.contry
      : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    selectedProfileInfo[indexToEdit]?.phoneNumber
      ? selectedProfileInfo[indexToEdit]?.phoneNumber
      : ""
  );
  const [dOB, setDOB] = useState(
    selectedProfileInfo[indexToEdit]?.dOB
      ? selectedProfileInfo[indexToEdit]?.dOB
      : ""
  );

  const [id, setId] = useState(
    selectedProfileInfo[indexToEdit]?.id
      ? selectedProfileInfo[indexToEdit]?.id
      : Date.now()
  );
  const imageOnChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const profileInfo = {
      image,
      firstName,
      lastName,
      address,
      state,
      country,
      phoneNumber,
      dOB,
      indexToEdit,
      id,
    };
    if (selectedProfileInfo[indexToEdit]?.id) {
      dispatchEmployeeProfilInfo({ type: "update", payload: profileInfo });
    } else {
      dispatchEmployeeProfilInfo({ type: "push", payload: profileInfo });
    }
    setGlobalState("showModal", false);
  };

  const handleDateOfBirth = (event) => {
    const d = event.target.value;
    console.log("date: ", d);
    setDOB(d)
  }
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
                onClick={() => setGlobalState("showModal", false)}
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
                      defaultValue={10523}
                    />
                  </div>
                </div>

                <div className="col-sm">
                  <div className="right">
                    <label className="label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      placeholder="phone Number"
                    />
                  </div>

                  <div className="">
                    <label className="label">
                      Department <span className="text-danger">*</span>
                    </label>
                    <select className="select">
                      <option>Select Department</option>
                      <option>Web Development</option>
                      <option>IT Management</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                </div>

                <div className="col-sm">
                  <div className="right">
                    <label className="label">
                      Designation <span className="text-danger">*</span>
                    </label>
                    <select className="select">
                      <option>Select Designation</option>
                      <option>Web Designer</option>
                      <option>Web Developer</option>
                      <option>Android Developer</option>
                    </select>
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
                  {selectedProfileInfo[indexToEdit]?.id
                    ? "Update"
                    : "Save"
                  }
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