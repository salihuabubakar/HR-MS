import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddSolicitor = ({
  indexToEdit,
  id,
  dispatchSolicitor
}) => {
  const [selectedSolicitor] = useGlobalState("selectedSolicitor");

  const [solicitor_name, setSolicitorName] = useState(
    selectedSolicitor[indexToEdit]?.solicitor_name || ""
  );

  const [solicitor_address, setSolicitorAddress] = useState(
    selectedSolicitor[indexToEdit]?.solicitor_address || ""
  );

  const [solicitor_postcode, setSolicitorPostCode] = useState(
    selectedSolicitor[indexToEdit]?.solicitor_postcode || ""
  );

  const [solicitor_phone_number, setSolicitorNumber] = useState(
    selectedSolicitor[indexToEdit]?.solicitor_phone_number || ""
  );

  const [solicitor_email, setSolicitorEmail] = useState(
    selectedSolicitor[indexToEdit]?.solicitor_email || ""
  );

  const [solicitor_website, setSolicitorWebsite] = useState(
    selectedSolicitor[indexToEdit]?.solicitor_website || ""
  );

  const [solicitor_description, setSolicitorDescription] = useState(
    selectedSolicitor[indexToEdit]?.solicitor_description || ""
  );

  const [nameError, setNameError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (solicitor_name === "") {
      setNameError("Name is required.");
      return;
    }

    // Clear any existing error messages
    setNameError("");
    const solicitor = {
      id,
      solicitor_name,
      solicitor_address,
      solicitor_postcode,
      solicitor_phone_number,
      solicitor_email,
      solicitor_website,
      solicitor_description
    };
    if (selectedSolicitor[indexToEdit]?.id) {
      dispatchSolicitor({ type: "update", payload: solicitor });
    } else {
      dispatchSolicitor({ type: "add", payload: solicitor });
    }
    setGlobalState("showSolicitorModal", false);
  };

  const handleNameChange = (event) => {
    setSolicitorName(event.target.value);
    setNameError("");
  };

  const [isDarkMode] = useGlobalState("isDarkMode");

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer isDarkMode={isDarkMode} className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedSolicitor[indexToEdit]?.id
                      ? "Edit Solicitor"
                      : "Add Solicitor"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showSolicitorModal", false)}
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
                            value={solicitor_name}
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
                          <label className="label">Phone Number</label>
                          <input
                            value={solicitor_phone_number}
                            onChange={(e) =>
                              setSolicitorNumber(e.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Address</label>
                          <input
                            value={solicitor_address}
                            onChange={(e) =>
                              setSolicitorAddress(e.target.value)
                            }
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
                            value={solicitor_email}
                            onChange={(e) => setSolicitorEmail(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Website</label>
                          <input
                            value={solicitor_website}
                            onChange={(e) =>
                              setSolicitorWebsite(e.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Website"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Post Code</label>
                          <input
                            value={solicitor_postcode}
                            onChange={(e) =>
                              setSolicitorPostCode(e.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Post Code"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Description</label>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="Description"
                            value={solicitor_description}
                            onChange={(e) => setSolicitorDescription(e.target.value)}
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
                        {selectedSolicitor[indexToEdit]?.id
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

export default AddSolicitor;