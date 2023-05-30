import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import Select from "react-select";
import { initDept, savedDeptReducer } from "../../utils/localStorage";
import { v4 as uuidv4 } from "uuid";

const AddDepartment = ({
  dispatchDesignation,
  indexToEdit,
  // houseIdToEdit,
}) => {
  const [selectedDesignation] = useGlobalState("selectedDesignation");
  const uniqueId = uuidv4();
   const [depts] = useReducer(savedDeptReducer, [], initDept);
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
      : uniqueId
  );

  const [dept, setDept] = useState(
    selectedDesignation[indexToEdit]?.dept
      ? selectedDesignation[indexToEdit]?.dept
      : ""
  );

  //  const isEdit = () => !!(deptIdToEdit && depts[indexToEdit]);
  const [deptNameError, setDeptNameError] = useState("");
  const [roleError, setRoleError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (desigName === "") {
      setRoleError("Role is required.");
      return;
    }
    if (dept === "") {
      setDeptNameError("Department is required.");
      return;
    }

    // Clear any existing error messages
    setRoleError("");
    setDeptNameError("");
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
    setGlobalState("showDesignationModal", false);
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
    setDeptNameError("");
  };

  const handleRoleChange = (event) => {
    setDesigName(event.target.value);
    setRoleError("");
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
                    {selectedDesignation[indexToEdit]?.id
                      ? "Edit Role"
                      : "Add Role"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showDesignationModal", false)
                    }
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">
                            Role <span className="text-danger">*</span>
                          </label>
                          <input
                            value={desigName}
                            onChange={handleRoleChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Role"
                          />
                          {roleError && (
                            <p className="error-message">{roleError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">
                            Select Department{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={
                              selectedDesignation[indexToEdit]?.dept
                                ? {
                                    value:
                                      selectedDesignation[indexToEdit].dept
                                        .value,
                                    label:
                                      selectedDesignation[indexToEdit].dept
                                        .label,
                                  }
                                : "Select Department"
                            }
                            onChange={handleDeptChange}
                            options={departments}
                            styles={customSelectStyles}
                            placeholder="Select Department"
                          />
                          {deptNameError && (
                            <p className="error-message">{deptNameError}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {selectedDesignation[indexToEdit]?.id
                          ? "Update"
                          : "Save"}
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
