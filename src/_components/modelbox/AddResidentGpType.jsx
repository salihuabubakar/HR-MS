import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddResidentGpType = ({
  indexToEdit,
  id,
  dispatchResidentGpType,
}) => {
  const [selectedResidentGpType] = useGlobalState("selectedResidentGpType");

  const [gp_type_name, setGpTypeName] = useState(
    selectedResidentGpType[indexToEdit]?.gp_type_name || ""
  );

  const [gp_type_description, setGpTypeDescription] = useState(
    selectedResidentGpType[indexToEdit]?.gp_type_description || ""
  );

 
  const [gpTypeError, setGpTypeError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    if(gp_type_name === "") {
      setGpTypeError("Gp type is required");
      return;
    }

    setGpTypeError("");

    const gpTypeObject = {
      id,
      gp_type_name,
      gp_type_description,
    };


    if (selectedResidentGpType[indexToEdit]?.id) {
      dispatchResidentGpType({
        type: "update",
        payload: gpTypeObject,
      });
    } else {
      dispatchResidentGpType({ type: "add", payload: gpTypeObject });
    }
    setGlobalState("showResidentGpTypeModal", false);
  };

  const handleDocTypeChange = (e) => {
    setGpTypeName(e.target.value);
    setGpTypeError("");
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
                    {selectedResidentGpType[indexToEdit]?.id
                      ? "Edit Gp Type"
                      : "Add Gp Type"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showResidentGpTypeModal", false)
                    }
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            Gp Type
                          </label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={gp_type_name}
                            onChange={handleDocTypeChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Gp Type"
                          />
                          {gpTypeError && (
                            <p className="error-message">{gpTypeError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Description</label>
                          <textarea
                            value={gp_type_description}
                            onChange={(e) => setGpTypeDescription(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Description"
                            style={{ height: "90px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedResidentGpType[indexToEdit]?.id
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

export default AddResidentGpType;
