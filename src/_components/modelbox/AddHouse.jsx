import React, {useState, useEffect, useReducer} from 'react';
import { PopupContainer, PopupOverlay, PopupWrapper } from './Addemployee.style';
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

  const [houseName, setHouseName] = useState(
    selectedHouse[indexToEdit]?.houseName
      ? selectedHouse[indexToEdit]?.houseName
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
      houseName,
      employee,
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
    users.push({ value: user.id, label: user.firstName + " " + user.lastName });
  });


  return (
    <PopupWrapper>
      <PopupOverlay />
      <PopupContainer className=" custom-modal" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add House</h5>
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
                <div className="form-group">
                  <label>
                    House Name <span className="text-danger">*</span>
                  </label>
                  <input
                    value={houseName}
                    onChange={(e) => setHouseName(e.target.value)}
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Employees <span className="text-danger">*</span>
                  </label>
                  <Select
                    defaultValue={
                      selectedHouse[indexToEdit]?.employee
                        ? {
                            value: house[indexToEdit].employee.value,
                            label: house[indexToEdit].employee.label,
                          }
                        : "Select Employee"
                    }
                    onChange={handleEmployeeChange}
                    isMulti
                    closeMenuOnSelect={false}
                    options={users}
                    styles={customSelectStyles}
                    placeholder="Select Employee"
                  />
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
    </PopupWrapper>
  );
};

export default AddDepartment;