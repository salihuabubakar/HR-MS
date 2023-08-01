import React, { useState, useEffect, useReducer } from "react";
import Select from "react-select";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import {
  PopupWrapper,
  PopupOverlay,
  PopupContainer,
  Card,
} from "./Addemployee.style";
import "./style.css";
import { RadioBtn } from "./styles";
import { 
  useOrganisationFetching, 
  useRoleFetching, 
  useDepartmentFetching,
  useResidentBoroughFetching,
  useDataFetching,
  useResidentLegalStatusTypeFetching 
} from "../../utils/employeeCustomFetchHook";
import { customSelectStyles } from "../../utils/reactSelectCustomeStyle";

const AddResident = ({
  dispatchResident,
  indexToEdit,
  getResidentId,
}) => {

  const { organisationData } = useOrganisationFetching();
  const { roleData } = useRoleFetching();
  const { data: allEmployee, isLoading: allEmployeeLoading } =
    useDataFetching();
  const { residentLegalStatusTypeData } = useResidentLegalStatusTypeFetching();
  const { departmentData } = useDepartmentFetching();
  const { residentBoroughData, isResidentBoroughLoading } = useResidentBoroughFetching();

  const [selectedResidentAccount] = useGlobalState("selectedResidentAccount");
  const imageUrlFromServer = selectedResidentAccount[indexToEdit]?.photo;
  const [photo, setPhoto] = useState("");

  let id = getResidentId;

  let isIdExist;

  let formData = new FormData();

  if (selectedResidentAccount && indexToEdit !== undefined) {
    isIdExist = selectedResidentAccount[indexToEdit]?.id;
  } else {
    isIdExist = "";
  }


  const [first_name, setFirstName] = useState(
    selectedResidentAccount[indexToEdit]?.first_name || ""
  );
  const [middle_name, setMiddleName] = useState(
    selectedResidentAccount[indexToEdit]?.middle_name || ""
  );
  const [last_name, setLastName] = useState(
    selectedResidentAccount[indexToEdit]?.last_name || ""
  );
  const [date_of_birth, setDateOfBirth] = useState(
    selectedResidentAccount[indexToEdit]?.date_of_birth || ""
  );
  const [gender, setGender] = useState(
    selectedResidentAccount[indexToEdit]?.gender || ""
  );

  const [nationality, setNationality] = useState(
    selectedResidentAccount[indexToEdit]?.nationality || ""
  );
  const [key_worker, setKeyWorker] = useState(
    selectedResidentAccount[indexToEdit]?.key_worker || []
  );
  const [phone_number, setPhoneNumber] = useState(
    selectedResidentAccount[indexToEdit]?.phone_number || ""
  );
  const [email, setEmail] = useState(
    selectedResidentAccount[indexToEdit]?.email || ""
  );
  const [address, setAddress] = useState(
    selectedResidentAccount[indexToEdit]?.address || ""
  );
  const [eye_colour, setEyeColour] = useState(
    selectedResidentAccount[indexToEdit]?.eye_colour || ""
  );
  const [hair_colour, setHairColour] = useState(
    selectedResidentAccount[indexToEdit]?.hair_colour || ""
  );
  const [height, setHeight] = useState(
    selectedResidentAccount[indexToEdit]?.height || ""
  );
  const [weight, setWeight] = useState(
    selectedResidentAccount[indexToEdit]?.weight || ""
  );
  const [glasses, setGlasses] = useState(
    selectedResidentAccount[indexToEdit]?.glasses || ""
  );
  const [tattoos, setTattoos] = useState(
    selectedResidentAccount[indexToEdit]?.tattoos || ""
  );
  const [piercings, setPiercing] = useState(
    selectedResidentAccount[indexToEdit]?.piercings || ""
  );
  const [Subject_child_protection, setSubjectChildProtection] = useState(
    selectedResidentAccount[indexToEdit]?.Subject_child_protection || ""
  );
  const [borough, setBorough] = useState(
    selectedResidentAccount[indexToEdit]?.borough || ""
  );
  const [legal_status, setLegalStatus] = useState(
    selectedResidentAccount[indexToEdit]?.legal_status || ""
  );
  const [Any_comment, setAnyComment] = useState(
    selectedResidentAccount[indexToEdit]?.Any_comment || ""
  );

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [nationalityError, setNationalityError] = useState("");
  const [keyWorkerError, setKeyWorkerError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate first name and last name
    if (first_name === "") {
      setFirstNameError("First name is required.");
      return;
    }
    if (last_name === "") {
      setLastNameError("Last name is required.");
      return;
    }
    if (gender === "") {
      setGenderError("Gender is required.");
      return;
    }
    if (nationality === "") {
      setNationalityError("Nationality is required.");
      return;
    }
    if (key_worker.length === 0) {
      setKeyWorkerError("Key worker is required.");
      return;
    }

    // // Clear any existing error messages
    setFirstNameError("");
    setLastNameError("");
    setGenderError("");
    setNationalityError("");
    setKeyWorkerError("");

    const fields = {
      id: id,
      first_name: first_name,
      last_name: last_name,
      middle_name: middle_name,
      date_of_birth: date_of_birth,
      gender: gender,
      nationality: nationality,
      email: email,
      phone_number: phone_number,
      address: address,
      eye_colour: eye_colour,
      hair_colour: hair_colour,
      height: height,
      weight: weight,
      glasses: glasses,
      tattoos: tattoos,
      piercings: piercings,
      Subject_child_protection: Subject_child_protection,
      borough: borough,
      legal_status: legal_status,
      Any_comment: Any_comment,
      key_worker: key_worker,
      photo: photo,
    };

    Object.entries(fields).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });
    if (isIdExist) {
      dispatchResident({ type: "update", payload: {id, formData} });
    } else {
      dispatchResident({
        type: "add",
        payload: formData,
      });
    }
    setGlobalState("showModal", false);
  };

  const boroughData = [];
  residentBoroughData?.map((b) => {
    boroughData.push({
      id: b.id,
      borough_name: b.borough_name,
    });
  });

  const handleBoroughChange = (event) => {
    const { id } = event;
    setBorough(id)
  }

  const getBoroughDefaultValues = () => {
    const val = selectedResidentAccount[indexToEdit]?.borough;
    if (!selectedResidentAccount || !val) {
      return null;
    }
    const boroughValue = residentBoroughData?.find((b) => b.id === val);
    if(boroughValue) {
      return {
        id: boroughValue?.id,
        borough_name: boroughValue?.borough_name
      }
    }
  };

  const employeesData = [];
  allEmployee?.map((employee) => {
    employeesData.push({
      id: employee.id,
      first_name: employee.first_name,
      middle_name: employee.middle_name,
      last_name: employee.last_name,
    });
  });
  
  const getEmployeeDefaultValues = () => {
    const val = selectedResidentAccount[indexToEdit]?.key_worker;
    if (!selectedResidentAccount || !val) {
      return [];
    }
    return allEmployee
      .filter((employee) => val.includes(employee.id))
      .map((employee) => ({
        id: employee.id,
        first_name: employee.first_name,
        middle_name: employee.middle_name,
        last_name: employee.last_name,
      }));
  };

  const handleKeyworkerChange = (event) => {
    const mappedID = event?.map((kw) => kw.id);
    console.log("🚀 ~ file: AddResident.jsx:249 ~ handleKeyworkerChange ~ mappedID:", mappedID)
    setKeyWorker(parseInt(mappedID));
    setKeyWorkerError("");
  };
  

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setLastNameError("");
  };

  const handleNationalityChange = (e) => {
    setNationality(e.target.value);
    setNationalityError("");
  }

  const handleGenderChange = (event) => {
    const data = event.target.value;
    setGender(data);
    setGenderError("")
  };

  const imageOnChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };


  const handleLegalStatusChange = (event) => {
    const data = event.target.value;
    setLegalStatus(data);
  };

  return (
    <>
      {/* Add Employee Modal */}
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer top={true} className="custom-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">{isIdExist ? "Edit Resident" : "Add Resident"}</h5>
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
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-12">
                        <div style={{ borderRadius: "5px" }} className="profile-img-wrap edit-img">
                          <img
                            style={{ borderRadius: "5px" }}
                            className="inline-block"
                            src={photo ? URL.createObjectURL(photo) : imageUrlFromServer}
                            alt="resident_image"
                          />
                          <div className="fileupload btn">
                            <span className="btn-text">{isIdExist ? "Update" : "Upload"}</span>
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
                            value={first_name}
                            onChange={handleFirstNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="First Name"
                          />
                          {firstNameError && <p className="error-message">{firstNameError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Last Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={last_name}
                            onChange={handleLastNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Last Name"
                          />
                          {lastNameError && <p className="error-message">{lastNameError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Middle Name</label>
                          <input
                            value={middle_name}
                            onChange={(event) => setMiddleName(event.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Middle Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Gender</label>{" "}
                          <span className="text-danger">*</span>
                          <select
                            value={gender}
                            onChange={handleGenderChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          {genderError && <p className="error-message">{genderError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Address</label>
                          <input
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Address"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Email</label>
                          <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="form-control floating"
                            type="email"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Date of Birth</label>
                          <input
                            value={date_of_birth}
                            onChange={(event) => setDateOfBirth(event.target.value)}
                            className="form-control floating"
                            type="date"
                            placeholder="Date of Birth"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Eye Colour</label>
                          <input
                            value={eye_colour}
                            onChange={(event) => setEyeColour(event.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Eye Colour"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Hair Colour</label>
                          <input
                            value={hair_colour}
                            onChange={(event) => setHairColour(event.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Hair Colour"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Height</label>
                          <input
                            value={height}
                            onChange={(event) => setHeight(event.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="e.g 170cm"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Weight</label>
                          <input
                            value={weight}
                            onChange={(event) => setWeight(event.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="e.g 93 kg"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Glasses</label>
                          <select
                            value={glasses}
                            onChange={(e) => setGlasses(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Yes/No
                            </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Tattoos</label>
                          <select
                            value={tattoos}
                            onChange={(e) => setTattoos(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Yes/No
                            </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Piercings</label>
                          <select
                            value={piercings}
                            onChange={(e) => setPiercing(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Yes/No
                            </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Legal Status</label>
                          <select
                            value={legal_status}
                            onChange={handleLegalStatusChange}
                            className="form-control floating"
                          >
                            <option disabled value="">Select Legal Status</option>
                            {residentLegalStatusTypeData?.map(lgs => {
                              return (
                                <option key={lgs.id} value={lgs.id}>{lgs.legal_status_name}</option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Nationality</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={nationality}
                            onChange={handleNationalityChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Nationality"
                          />
                          {nationalityError && <p className="error-message">{nationalityError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Phone Number</label>
                          <input
                            value={phone_number}
                            onChange={(event) => setPhoneNumber(event.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Select Key Worker
                          </label> <span className="text-danger">*</span>
                          <Select
                            defaultValue={getEmployeeDefaultValues()}
                            onChange={handleKeyworkerChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={employeesData}
                            isLoading={allEmployeeLoading}
                            styles={customSelectStyles}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) =>
                              option.first_name +
                              " " +
                              option.middle_name +
                              " " +
                              option.last_name
                            }
                            placeholder="Select Key Worker"
                          />
                          {keyWorkerError && <p className="error-message">{keyWorkerError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Subject Child Protection</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="Subject_child_protection"
                              checked={Subject_child_protection}
                              id="Subject_child_protection"
                              placeholder="Subject Child Protection"
                              onChange={(e) => setSubjectChildProtection(e.target.checked)}
                            />
                            <label htmlFor="Subject_child_protection">
                              <span>Subject Child Protection</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Select Borough
                          </label>
                          <Select
                            defaultValue={getBoroughDefaultValues()}
                            onChange={handleBoroughChange}
                            options={boroughData}
                            isLoading={isResidentBoroughLoading}
                            styles={customSelectStyles}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) =>option.borough_name}
                            placeholder="Select Borough"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Comment</label>
                          <textarea
                            className="form-control floating"
                            name="comment"
                            placeholder="Comment"
                            value={Any_comment}
                            onChange={(e) => setAnyComment(e.target.value)}
                            style={{ height: "70px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button type="submit" className="btn btn-primary submit-btn">
                        {isIdExist ? "Update" : "Save"}
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

export default AddResident;
