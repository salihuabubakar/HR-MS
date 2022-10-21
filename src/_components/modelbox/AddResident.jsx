import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddResident = ({
  dispatchResidents,
  indexToEdit,
}) => {
  const [selectedResident] = useGlobalState("selectedResident");

  const [residentName, setResidentName] = useState(
    selectedResident[indexToEdit]?.residentName
      ? selectedResident[indexToEdit]?.residentName
      : ""
  );

  const [id, setId] = useState(
    selectedResident[indexToEdit]?.id ? selectedResident[indexToEdit]?.id : Date.now()
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const residents = {
      residentName,
      id,
    };
    if (selectedResident[indexToEdit]?.id) {
      dispatchResidents({ type: "update", payload: residents });
    } else {
      dispatchResidents({ type: "push", payload: residents });
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
              <h5 className="modal-title">Add Resident</h5>
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
                    Resident Name <span className="text-danger">*</span>
                  </label>
                  <input
                    value={residentName}
                    onChange={(e) => setResidentName(e.target.value)}
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="submit-section">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary submit-btn"
                  >
                    {selectedResident[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddResident;
