import React, {useState} from 'react';
import { PopupContainer, PopupOverlay, PopupWrapper, Card } from './Addemployee.style';
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { toast } from "react-toastify";

const AddDepartment = ({
  dispatchDept,
  indexToEdit,
  deptIdToEdit,
}) => {
  const [selectedDept] = useGlobalState("selectedDept");
  let id = deptIdToEdit;

  const [department_name, setDeptName] = useState(
    selectedDept[indexToEdit]?.department_name || ""
  );

  const [description, setDescription] = useState(
    selectedDept[indexToEdit]?.description || ""
  );

  const [deptNameError, setDeptNameError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (department_name === "") {
      setDeptNameError("Department is required.");
      return;
    }

    // Clear any existing error messages
    setDeptNameError("");
    const department = {
      id,
      department_name,
      description,
    };
    if (selectedDept[indexToEdit]?.id) {
      dispatchDept({ type: "update", payload: department });
      toast.success("Department Updated", {
        autoClose: 1500,
      });
    } else {
      dispatchDept({ type: "add", payload: department });
      toast.success("Department Updated", {
        autoClose: 1500,
      });
    }
    setGlobalState("showDeptModal", false);
  };

  const handleDeptNameChange = (event) => {
    setDeptName(event.target.value);
    setDeptNameError("");
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
                    {selectedDept[indexToEdit]?.id
                      ? "Edit Department"
                      : "Add Department"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showDeptModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">
                            Department Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={department_name}
                            onChange={handleDeptNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Department Name"
                          />
                          {deptNameError && (
                            <p className="error-message">{deptNameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">
                            Description
                          </label>
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
                        {selectedDept[indexToEdit]?.id ? "Update" : "Save"}
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
