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
    <PopupWrapper>
      <PopupOverlay />
      <PopupContainer className=" custom-modal" role="dialog">
        <Card className="" role="document">
          <div className="card-content">
            <div className="card-header">
              <h5 className="card-title">
                {selectedDept[indexToEdit]?.id
                  ? "Edit Department"
                  : "Add Department"}
              </h5>
              <div className="btn-container">
                <button
                  className="closeX"
                  type="button"
                  onClick={() => setGlobalState("showModal", false)}
                >
                  <span>×</span>
                </button>
              </div>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label className="label">
                    Department Name <span className="text-danger">*</span>
                  </label>
                  <input
                    value={deptName}
                    onChange={(e) => setDeptName(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Department Name"
                  />
                </div>
                <div className="submit-btn">
                  <button onClick={handleSubmit} className="submit-Btn">
                    {selectedDept[indexToEdit]?.id ? "Update" : "Save"}
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
