import React, {useState} from 'react';
import { PopupContainer, PopupOverlay, PopupWrapper, Card } from './Addemployee.style';
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddEmployeeEmergency = ({
  employeeEmergencyIndexToEdit,
  id,
  dispatchEmployeeEmergency,
  employee,
}) => {
  const [selectedEmployeeEmergency] = useGlobalState(
    "selectedEmployeeEmergency"
  );

  const [name, setName] = useState(
    selectedEmployeeEmergency[employeeEmergencyIndexToEdit]?.name || ""
  );

  const [relationship, setRelationship] = useState(
    selectedEmployeeEmergency[employeeEmergencyIndexToEdit]?.relationship || ""
  );

  const [phone_number, setPhoneNumber] = useState(
    selectedEmployeeEmergency[employeeEmergencyIndexToEdit]?.phone_number || ""
  );

  const [email, setEmail] = useState(
    selectedEmployeeEmergency[employeeEmergencyIndexToEdit]?.email || ""
  );

  const [address, setAddress] = useState(
    selectedEmployeeEmergency[employeeEmergencyIndexToEdit]?.address || ""
  );

  const [post_code, setPostCode] = useState(
    selectedEmployeeEmergency[employeeEmergencyIndexToEdit]?.post_code || ""
  );


  const [nameError, setNameError] = useState("");
  const [relationshipError, setRelationshipError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setNameError("Name is required.");
      return;
    }
    if (relationship === "") {
      setRelationshipError("Relationship is required.");
      return;
    }
    if (phone_number === "") {
      setPhoneError("Phone is required.");
      return;
    }

    // Clear any existing error messages
    setNameError("");
    setRelationship("");
    setPhoneError("");
    const emergency = {
      id,
      employee,
      name,
      relationship,
      phone_number,
      address,
      email,
      post_code
    };
    if (selectedEmployeeEmergency[employeeEmergencyIndexToEdit]?.id) {
      dispatchEmployeeEmergency({ type: "update", payload: emergency });
    } else {
      dispatchEmployeeEmergency({ type: "add", payload: emergency });
    }
    setGlobalState("showEmployeeEmergencyModal", false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError("");
  };
  const handleRelationshipChange = (event) => {
    setRelationship(event.target.value);
    setRelationshipError("");
  };
  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
    setPhoneError("");
  };

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer  className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedEmployeeEmergency[employeeEmergencyIndexToEdit]?.id
                      ? "Edit Emergency Contact"
                      : "Add Emergency Contact"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showEmployeeEmergencyModal", false)
                    }
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={name}
                            onChange={handleNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Name"
                          />
                          {nameError && (
                            <p className="error-message">{nameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Relationship</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={relationship}
                            onChange={handleRelationshipChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Relationship"
                          />
                          {relationshipError && (
                            <p className="error-message">{relationshipError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Phone Number</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={phone_number}
                            onChange={handlePhoneChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Phone Number"
                          />
                          {phoneError && (
                            <p className="error-message">{phoneError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Address</label>
                          <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Address"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Email</label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Post Code</label>
                          <input
                            value={post_code}
                            onChange={(e) => setPostCode(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Post Code"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedEmployeeEmergency[employeeEmergencyIndexToEdit]
                          ?.id
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

export default AddEmployeeEmergency;
