import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { useGpTypeFetching } from "../../utils/employeeCustomFetchHook";

const AddGpractice = ({
  indexToEdit,
  id,
  dispatchGpractice
}) => {
  const [selectedGpractice] = useGlobalState("selectedGpractice");
  const { gpTypeData } = useGpTypeFetching();

  const [gp_practice_name, setGpPracticeName] = useState(
    selectedGpractice[indexToEdit]?.gp_practice_name || ""
  );

  const [gp_practice_type, setGpPracticeType] = useState(
    selectedGpractice[indexToEdit]?.gp_practice_type || ""
  );

  const [gp_practice_address, setGpPracticeAddress] = useState(
    selectedGpractice[indexToEdit]?.gp_practice_address || ""
  );

  const [gp_practice_postcode, setGpPracticePostCode] = useState(
    selectedGpractice[indexToEdit]?.gp_practice_postcode || ""
  );

  const [gp_practice_phone_number, setGpPracticeNumber] = useState(
    selectedGpractice[indexToEdit]?.gp_practice_phone_number || ""
  );

  const [gp_practice_email, setGpPracticeEmail] = useState(
    selectedGpractice[indexToEdit]?.gp_practice_email || ""
  );

  const [gp_practice_website, setGpPracticeWebsite] = useState(
    selectedGpractice[indexToEdit]?.gp_practice_website || ""
  );

  const [gp_practice_description, setGpPracticeDescription] = useState(
    selectedGpractice[indexToEdit]?.gp_practice_description || ""
  );

  const [nameError, setNameError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gp_practice_name === "") {
      setNameError("Name is required.");
      return;
    }

    // Clear any existing error messages
    setNameError("");
    const gpPractice = {
      id,
      gp_practice_name,
      gp_practice_address,
      gp_practice_postcode,
      gp_practice_phone_number,
      gp_practice_email,
      gp_practice_website,
      gp_practice_description,
      gp_practice_type,
    };
    if (selectedGpractice[indexToEdit]?.id) {
      dispatchGpractice({ type: "update", payload: gpPractice });
    } else {
      dispatchGpractice({ type: "add", payload: gpPractice });
    }
    setGlobalState("showGpracticeModal", false);
  };

  const handleNameChange = (event) => {
    setGpPracticeName(event.target.value);
    setNameError("");
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
                    {selectedGpractice[indexToEdit]?.id
                      ? "Edit Gpractice"
                      : "Add Gpractice"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showGpracticeModal", false)}
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
                            value={gp_practice_name}
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
                          <label className="label">Gp practice type</label>
                          <select
                            value={gp_practice_type}
                            onChange={(e) => setGpPracticeType(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select
                            </option>
                            {gpTypeData?.map((gp) => (
                              <option key={gp.id} value={gp.id}>
                                {`${gp.gp_type_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Phone Number</label>
                          <input
                            value={gp_practice_phone_number}
                            onChange={(e) =>
                              setGpPracticeNumber(e.target.value)
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
                            value={gp_practice_address}
                            onChange={(e) =>
                              setGpPracticeAddress(e.target.value)
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
                            value={gp_practice_email}
                            onChange={(e) => setGpPracticeEmail(e.target.value)}
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
                            value={gp_practice_website}
                            onChange={(e) =>
                              setGpPracticeWebsite(e.target.value)
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
                            value={gp_practice_postcode}
                            onChange={(e) =>
                              setGpPracticePostCode(e.target.value)
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
                            value={gp_practice_description}
                            onChange={(e) => setGpPracticeDescription(e.target.value)}
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
                        {selectedGpractice[indexToEdit]?.id
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

export default AddGpractice;