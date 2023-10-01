import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { isMobile } from "../../utils/mediaQuery";

const AddSchool = ({
  indexToEdit,
  id,
  dispatchSchool
}) => {
  const [selectedSchool] = useGlobalState("selectedSchool");

  const [school_name, setSchoolName] = useState(
    selectedSchool[indexToEdit]?.school_name || ""
  );

  const [city, setCity] = useState(
    selectedSchool[indexToEdit]?.city || ""
  );

  const [address, setAddress] = useState(
    selectedSchool[indexToEdit]?.address || ""
  );

  const [postcode, setPostCode] = useState(
    selectedSchool[indexToEdit]?.postcode || ""
  );

  const [telephone, setTelephone] = useState(
    selectedSchool[indexToEdit]?.telephone || ""
  );

  const [email, setEmail] = useState(
    selectedSchool[indexToEdit]?.email || ""
  );

  const [website, setWebsite] = useState(
    selectedSchool[indexToEdit]?.website || ""
  );

  const [comments, setComment] = useState(
    selectedSchool[indexToEdit]?.comments || ""
  );

  const [nameError, setNameError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (school_name === "") {
      setNameError("Name is required.");
      return;
    }

    // Clear any existing error messages
    setNameError("");
    const school = {
      id,
      school_name,
      city,
      address,
      postcode,
      telephone,
      email,
      website,
      comments
    };
    if (selectedSchool[indexToEdit]?.id) {
      dispatchSchool({ type: "update", payload: school });
    } else {
      dispatchSchool({ type: "add", payload: school });
    }
    setGlobalState("showSchoolModal", false);
  };

  const handleNameChange = (event) => {
    setSchoolName(event.target.value);
    setNameError("");
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
                    {selectedSchool[indexToEdit]?.id
                      ? "Edit School"
                      : "Add School"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showSchoolModal", false)}
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
                            value={school_name}
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
                            value={telephone}
                            onChange={(e) =>
                              setTelephone(e.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">City</label>
                          <input
                            value={city}
                            onChange={(e) =>
                              setCity(e.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="City"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Address</label>
                          <input
                            value={address}
                            onChange={(e) =>
                              setAddress(e.target.value)
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
                          <label className="label">Website</label>
                          <input
                            value={website}
                            onChange={(e) =>
                              setWebsite(e.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="www.example.com"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Post Code</label>
                          <input
                            value={postcode}
                            onChange={(e) =>
                              setPostCode(e.target.value)
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
                            value={comments}
                            onChange={(e) => setComment(e.target.value)}
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
                        {selectedSchool[indexToEdit]?.id
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

export default AddSchool;