import React, {useState} from 'react';
import { PopupContainer, PopupOverlay, PopupWrapper, Card } from './Addemployee.style';
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
                    onClick={() => setGlobalState("showModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            Department Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={deptName}
                            onChange={(e) => setDeptName(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Department Name"
                          />
                        </div>
                      </div>
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
        </PopupOverlay>
      </PopupWrapper>
    </>
  );
};

export default AddDepartment;
