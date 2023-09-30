import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddRole = ({
  dispatchRole,
  indexToEdit,
  roleIdToEdit,
  departmentData,
}) => {
  const [selectedRole] = useGlobalState("selectedRole");

  let id = roleIdToEdit;

  const [role_name, setDesigName] = useState(
    selectedRole[indexToEdit]?.role_name || ""
  );

  const [description, setDescription] = useState(
    selectedRole[indexToEdit]?.description || ""
  );

  const [department, setDepartment] = useState(
    selectedRole[indexToEdit]?.department || ""
  );

  const [roleError, setRoleError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role_name === "") {
      setRoleError("Role is required.");
      return;
    }

    // Clear any existing error messages
    setRoleError("");
    const role = {
      id,
      role_name,
      department,
      description,
    };
    if (selectedRole[indexToEdit]?.id) {
      dispatchRole({ type: "update", payload: role });
    } else {
      dispatchRole({ type: "add", payload: role });
    }
    setGlobalState("showRoleModal", false);
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

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
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
                    {selectedRole[indexToEdit]?.id ? "Edit Role" : "Add Role"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showRoleModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Role <span className="text-danger">*</span>
                          </label>
                          <input
                            value={role_name}
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
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Department</label>
                          <select
                            value={department}
                            onChange={handleDepartmentChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select
                            </option>
                            {departmentData.map((department) => (
                              <option key={department.id} value={department.id}>
                                {department.department_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">Description</label>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ height: "70px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedRole[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddRole;
