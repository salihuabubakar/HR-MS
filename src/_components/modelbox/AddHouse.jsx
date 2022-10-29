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
    users.push({ value: user.id, label: user.firstName + " " + user.lastName });
  });


  return (
    <PopupWrapper>
      <PopupOverlay />
      <PopupContainer className=" custom-modal" role="dialog">
        <Card className="" role="document">
          <div className="card-content">
            <div className="card-header">
              <h5 className="card-title">
                {selectedHouse[indexToEdit]?.id ? "Edit House" : "Add House"}
              </h5>
              <div className="btn-container">
                <button
                  type="button"
                  className="closeX"
                  onClick={() => setGlobalState("showModal", false)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="card-body">
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
                    placeholder="House Name"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Manager <span className="text-danger">*</span>
                  </label>
                  <input
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Manager"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Staffs <span className="text-danger">*</span>
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
                <div className="submit-btn">
                  <button onClick={handleSubmit} className="submit-Btn">
                    {selectedHouse[indexToEdit]?.id ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </PopupContainer>
    </PopupWrapper>
  );
};

export default AddDepartment;
