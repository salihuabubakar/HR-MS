import React, {useState, useEffect, useReducer} from 'react';
import { PopupContainer, PopupOverlay, PopupWrapper, Card } from './Addemployee.style';
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import {
  initUserAccount,
  savedUserAccountReducer,
  initResident,
  savedResidentReducer,
} from "../../utils/localStorage";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import "./style.css";

const AddDepartment = ({
  dispatchHouse,
  indexToEdit,
  // houseIdToEdit,
  house
}) => {
  const [selectedHouse] = useGlobalState("selectedHouse");
  const uniqueId = uuidv4();
     
 const [userAcct, dispatchUserAcct] = useReducer(
   savedUserAccountReducer,
   [],
   initUserAccount
 );
 const [employeeAccts, setEmployeeAccts] = useState();
 useEffect(() => {
   setEmployeeAccts(userAcct);
 }, [userAcct]);

 const [residentAcct] = useReducer(savedResidentReducer, [], initResident);
 const [residentAccts, setResidentAccts] = useState();
 useEffect(() => {
   setResidentAccts(residentAcct);
 }, [residentAcct]);

 const [image, setImage] = useState(
   selectedHouse[indexToEdit]?.image ? selectedHouse[indexToEdit]?.image : ""
 );

  const [houseName, setHouseName] = useState(
    selectedHouse[indexToEdit]?.houseName
      ? selectedHouse[indexToEdit]?.houseName
      : ""
  );

  const [managerName, setManagerName] = useState(
    selectedHouse[indexToEdit]?.managerName
      ? selectedHouse[indexToEdit]?.managerName
      : ""
  );

  const [employee, setEmployee] = useState(
    selectedHouse[indexToEdit]?.employee
      ? selectedHouse[indexToEdit]?.employee
      : ""
  );

  const [resident, setResident] = useState(
    selectedHouse[indexToEdit]?.resident
      ? selectedHouse[indexToEdit]?.resident
      : ""
  );

  const [id] = useState(
    selectedHouse[indexToEdit]?.id ? selectedHouse[indexToEdit]?.id : uniqueId
  );

  //  const isEdit = () => !!(deptIdToEdit && depts[indexToEdit]);
  const [houseNameError, setHouseNameError] = useState("");
  const [managerNameError, setManagerNameError] = useState("");
  const [employeeError, setEmployeeError] = useState("");
  const [residentError, setResidentError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (houseName === "") {
      setHouseNameError("House Name is required.");
      return;
    }
    if (managerName === "") {
      setManagerNameError("Manager Name is required.");
      return;
    }
    if (employee === "") {
      setEmployeeError("Employee is required.");
      return;
    }
    if (resident === "") {
      setResidentError("Resident is required.");
      return;
    }

    // Clear any existing error messages
    setHouseNameError("");
    setManagerNameError("");
    setEmployeeError("");
    setResidentError("");
    const house = {
      image,
      houseName,
      employee,
      resident,
      managerName,
      id,
    };
    if (selectedHouse[indexToEdit]?.id) {
      dispatchHouse({ type: "update", payload: house });
    } else {
      dispatchHouse({ type: "push", payload: house });
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

  const users = [];
  employeeAccts?.map((user) => {
    users.push({
      value: user.id,
      label: user.firstName + " " + user.lastName,
      image: user.photo,
    });
  });

  const imageOnChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setImage(base64Image);
    };
  };

    

  const residents = [];
  residentAccts?.map((resident) => {
    residents.push({
      value: resident.id,
      label: resident.residentName,
      image: resident.image,
    });
  });

  const handleHouseNameChange = (e) => {
    setHouseName(e.target.value);
    setHouseNameError("");
  };
  const handleManagerNameChange = (e) => {
    setManagerName(e.target.value);
    setManagerNameError("");
  };
  const handleEmployeeChange = (event) => {
    setEmployee(event);
    setEmployeeError("")
  };
  const handleResidentChange = (event) => {
    setResident(event);
    setResidentError("")
  };


const getEmployeeDefaultValues = (employeeData) => {
  if (Array.isArray(employeeData)) {
    return employeeData.map((employee) => ({
      value: employee.value,
      label: employee.label,
      image: employee.photo,
      role: employee.role,
    }));
  }
  return [];
}

const getResidentefaultValues = (residentData) => {
  if (Array.isArray(residentData)) {
    return residentData.map((resident) => ({
      value: resident.value,
      label: resident.label,
      image: resident.image,
    }));
  }
  return [];
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
                    {selectedHouse[indexToEdit]?.id
                      ? "Edit House"
                      : "Add House"}
                  </h5>
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
                      <div className="col-sm-12">
                        <div
                          style={{ borderRadius: "5px" }}
                          className="profile-img-wrap edit-img"
                        >
                          <img
                            style={{ borderRadius: "5px" }}
                            className="inline-block"
                            src={image}
                            alt="image"
                          />
                          <div className="fileupload btn">
                            <span className="btn-text">Upload</span>
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
                          <label className="label">
                            House Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={houseName}
                            onChange={handleHouseNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="House Name"
                          />
                          {houseNameError && (
                            <p className="error-message">{houseNameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Manager <span className="text-danger">*</span>
                          </label>
                          <input
                            value={managerName}
                            onChange={handleManagerNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Manager"
                          />
                          {managerNameError && (
                            <p className="error-message">{managerNameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select Employee{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={getEmployeeDefaultValues(
                              selectedHouse[indexToEdit]?.employee
                            )}
                            onChange={handleEmployeeChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={users}
                            styles={customSelectStyles}
                            placeholder="Select Staff"
                          />
                          {employeeError && (
                            <p className="error-message">{employeeError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Residents <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={getResidentefaultValues(
                              selectedHouse[indexToEdit]?.resident
                            )}
                            onChange={handleResidentChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={residents}
                            styles={customSelectStyles}
                            placeholder="Select Resident"
                          />
                          {residentError && (
                            <p className="error-message">{residentError}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {selectedHouse[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddDepartment;
