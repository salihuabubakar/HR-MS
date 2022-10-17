import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import Select from "react-select";
import { initDept, savedDeptReducer } from "../../utils/localStorage";


const AddDepartment = ({
  dispatchDesignation,
  indexToEdit,
  // houseIdToEdit,
  desig,
}) => {
  const [selectedDesignation] = useGlobalState("selectedDesignation");
   const [depts, dispatchDepts] = useReducer(savedDeptReducer, [], initDept);
   const [deptList, setDeptList] = useState();
   useEffect(() => {
     setDeptList(depts);
   }, [depts]);

  const [desigName, setDesigName] = useState(
    selectedDesignation[indexToEdit]?.desigName
      ? selectedDesignation[indexToEdit]?.desigName
      : ""
  );

  const [id, setId] = useState(
    selectedDesignation[indexToEdit]?.id
      ? selectedDesignation[indexToEdit]?.id
      : Date.now()
  );

  const [dept, setDept] = useState(
    selectedDesignation[indexToEdit]?.dept
      ? selectedDesignation[indexToEdit]?.dept
      : ""
  );

  //  const isEdit = () => !!(deptIdToEdit && depts[indexToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const house = {
      desigName,
      id,
      dept,
    };
    if (selectedDesignation[indexToEdit]?.id) {
      dispatchDesignation({ type: "update", payload: house });
    } else {
      dispatchDesignation({ type: "push", payload: house });
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

  const departments = [];
  deptList?.map((dept) => {
    departments.push({ value: dept.id, label: dept.deptName });
  });

  const handleDeptChange = (event) => {
    setDept(event);
  };

  return (
    <PopupWrapper>
      <PopupOverlay />
      <PopupContainer className=" custom-modal" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Designation</h5>
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
                    Designation Name <span className="text-danger">*</span>
                  </label>
                  <input
                    value={desigName}
                    onChange={(e) => setDesigName(e.target.value)}
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Department <span className="text-danger">*</span>
                  </label>
                  <Select
                    defaultValue={
                      selectedDesignation[indexToEdit]?.dept
                        ? {
                            value: desig[indexToEdit].dept.value,
                            label: desig[indexToEdit].dept.label,
                          }
                        : "Select Department"
                    }
                    onChange={handleDeptChange}
                    options={departments}
                    styles={customSelectStyles}
                    placeholder="Select Department"
                  />
                </div>
                <div className="submit-section">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary submit-btn"
                  >
                    {selectedDesignation[indexToEdit]?.id ? "Update" : "Save"}
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
