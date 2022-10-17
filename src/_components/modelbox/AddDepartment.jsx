import React, {useState} from 'react';
import { PopupContainer, PopupOverlay, PopupWrapper } from './Addemployee.style';
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddDepartment = ({ 
  dispatchDepts, 
  indexToEdit, 
  // deptIdToEdit, 
  // depts 
}) => {
  const [selectedDept] = useGlobalState("selectedDept");

  const [deptName, setDeptName] = useState(
    selectedDept[indexToEdit]?.deptName
      ? selectedDept[indexToEdit]?.deptName
      : ""
  );

  const [id, setId] = useState(
    selectedDept[indexToEdit]?.id ? selectedDept[indexToEdit]?.id : Date.now()
  );

  //  const isEdit = () => !!(deptIdToEdit && depts[indexToEdit]);

   const handleSubmit = (e) => {
     e.preventDefault();
     const department = {
       deptName,
       id,
     };
     if (selectedDept[indexToEdit]?.id) {
       dispatchDepts({ type: "update", payload: department });
     } else {
       dispatchDepts({ type: "push", payload: department });
     }
     setGlobalState("showModal", false);
   };
  return (
    <PopupWrapper>
      <PopupOverlay />
      <PopupContainer className=" custom-modal" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Department</h5>
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
                    Department Name <span className="text-danger">*</span>
                  </label>
                  <input
                    value={deptName}
                    onChange={(e) => setDeptName(e.target.value)}
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="submit-section">
                  <button
                    onClick={handleSubmit}
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
    </PopupWrapper>
  );
};

export default AddDepartment;
