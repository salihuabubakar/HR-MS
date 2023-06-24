import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { toast } from "react-toastify";

const AddResidentSolicitorModal = ({
  residentSolicitorIndexToEdit,
  id,
  dispatchResidentSolicitor,
  resident,
}) => {
  const [selectedResidentSolicitor] = useGlobalState(
    "selectedResidentSolicitor"
  );

  const [solicitor_name, setSolicitorName] = useState(
    selectedResidentSolicitor[residentSolicitorIndexToEdit]?.solicitor_name ||
      ""
  );

  const [solicitor_address, setSolicitorAddress] = useState(
    selectedResidentSolicitor[residentSolicitorIndexToEdit]
      ?.solicitor_address || ""
  );

  const [solicitor_postcode, setSolicitorPostCode] = useState(
    selectedResidentSolicitor[residentSolicitorIndexToEdit]
      ?.solicitor_postcode || ""
  );

  const [solicitor_phone_number, setSolicitorNumber] = useState(
    selectedResidentSolicitor[residentSolicitorIndexToEdit]
      ?.solicitor_phone_number || ""
  );

  const [solicitor_email, setSolicitorEmail] = useState(
    selectedResidentSolicitor[residentSolicitorIndexToEdit]?.solicitor_email ||
      ""
  );

  const [solicitor_website, setSolicitorWebsite] = useState(
    selectedResidentSolicitor[residentSolicitorIndexToEdit]
      ?.solicitor_website || ""
  );

  const [solicitor_status, setSolicitorStatus] = useState(
    selectedResidentSolicitor[residentSolicitorIndexToEdit]?.solicitor_status ||
      ""
  );

  const [solicitor_description, setSolicitorDescription] = useState(
    selectedResidentSolicitor[residentSolicitorIndexToEdit]
      ?.solicitor_description || ""
  );

  const [nameError, setNameError] = useState("");
  const [statusError, setStatusError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (solicitor_name === "") {
      setNameError("Name is required.");
      return;
    }
    if (solicitor_status === "") {
      setStatusError("Status is required");
      return;
    }

    // Clear any existing error messages
    setNameError("");
    setStatusError("");
    const solicitor = {
      id,
      resident,
      solicitor_name,
      solicitor_address,
      solicitor_postcode,
      solicitor_phone_number,
      solicitor_email,
      solicitor_website,
      solicitor_description,
      solicitor_status,
    };
    if (selectedResidentSolicitor[residentSolicitorIndexToEdit]?.id) {
      dispatchResidentSolicitor({ type: "update", payload: solicitor });
      toast.success("Resident Solicitor Updated", {
        autoClose: 1500,
      });
    } else {
      dispatchResidentSolicitor({ type: "add", payload: solicitor });
      toast.success("Resident Solicitor Added", {
        autoClose: 1500,
      });
    }
    setGlobalState("showResidentSolicitorModal", false);
  };

  const handleNameChange = (event) => {
    setSolicitorName(event.target.value);
    setNameError("");
  };

  const handleStatusChange = (e) => {
    setSolicitorStatus(e.target.value);
    setStatusError("");
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
                    {selectedResidentSolicitor[residentSolicitorIndexToEdit]?.id
                      ? "Edit Resident Solicitor"
                      : "Add Resident Solicitor"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showResidentSolicitorModal", false)
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
                            onChange={(e) => setSolicitorNumber(e.target.value)}
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
                          <label className="label">Status</label>{" "}
                          <span className="text-danger">*</span>
                          <select
                            value={solicitor_status}
                            onChange={handleStatusChange}
                            className="form-control floating"
                          >
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                          {statusError && (
                            <p className="error-message">{statusError}</p>
                          )}
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
                            onChange={(e) =>
                              setSolicitorDescription(e.target.value)
                            }
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
                        {selectedResidentSolicitor[residentSolicitorIndexToEdit]
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

export default AddResidentSolicitorModal;
