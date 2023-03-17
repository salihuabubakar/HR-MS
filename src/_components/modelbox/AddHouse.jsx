import React, {useState, useEffect, useReducer} from 'react';
import { PopupContainer, PopupOverlay, PopupWrapper, Card } from './Addemployee.style';
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import {
  initUserAccount,
  savedUserAccountReducer,
} from "../../utils/localStorage";
import Select from "react-select";

const AddDepartment = ({
  dispatchHouse,
  indexToEdit,
  // houseIdToEdit,
  house
}) => {
  const [selectedHouse] = useGlobalState("selectedHouse");

     
 const [userAcct, dispatchUserAcct] = useReducer(
   savedUserAccountReducer,
   [],
   initUserAccount
 );
 const [employeeAccts, setEmployeeAccts] = useState();
 useEffect(() => {
   setEmployeeAccts(userAcct);
 }, [userAcct]);

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

  const [id, setId] = useState(
    selectedHouse[indexToEdit]?.id ? selectedHouse[indexToEdit]?.id : Date.now()
  );

  //  const isEdit = () => !!(deptIdToEdit && depts[indexToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const house = {
      image,
      houseName,
      employee,
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

    const handleEmployeeChange = (event) => {
      setEmployee(event);
    };

  const users = [];
  employeeAccts?.map((user) => {
    users.push({
      value: user.id,
      label: user.firstName + " " + user.lastName,
      image: user.image,
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



  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer className="custom-modal" role="dialog">
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
                            onChange={(e) => setHouseName(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="House Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Manager <span className="text-danger">*</span>
                          </label>
                          <input
                            value={managerName}
                            onChange={(e) => setManagerName(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Manager"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Select Department{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={[
                              selectedHouse[indexToEdit]?.employee[0],
                              selectedHouse[indexToEdit]?.employee[1],
                              selectedHouse[indexToEdit]?.employee[2],
                              selectedHouse[indexToEdit]?.employee[3],
                              selectedHouse[indexToEdit]?.employee[4],
                              selectedHouse[indexToEdit]?.employee[5],
                              selectedHouse[indexToEdit]?.employee[6],
                              selectedHouse[indexToEdit]?.employee[7],
                              selectedHouse[indexToEdit]?.employee[8],
                              selectedHouse[indexToEdit]?.employee[9],
                              selectedHouse[indexToEdit]?.employee[10],
                            ]}
                            // defaultValue={
                            //   selectedHouse[indexToEdit]?.employee
                            //     ? {
                            //         value: house[indexToEdit].employee?.map(value => value.value),
                            //         label: house[indexToEdit].employee?.map(label => label.label),
                            //       }
                            //     : "Select Staff"
                            // }
                            onChange={handleEmployeeChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={users}
                            styles={customSelectStyles}
                            placeholder="Select Staff"
                          />
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
