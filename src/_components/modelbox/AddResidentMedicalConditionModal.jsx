import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddResidentMedicalConditionModal = ({
  residentMedicalConditionIndexToEdit,
  id,
  dispatchResidentMedicalCondition,
  resident,
}) => {

  const [selectedResidentMedicalCondition] = useGlobalState(
    "selectedResidentMedicalCondition"
  );

  const [medical_condition_name, setMedicalConditionName] = useState(
    selectedResidentMedicalCondition[residentMedicalConditionIndexToEdit]
      ?.medical_condition_name || ""
  );

  const [medical_condition_state, setMedicalConditionState] = useState(
    selectedResidentMedicalCondition[residentMedicalConditionIndexToEdit]
      ?.medical_condition_state || ""
  );

  const [medical_condition_start_date, setMedicalConditionStartDate] = useState(
    selectedResidentMedicalCondition[residentMedicalConditionIndexToEdit]
      ?.medical_condition_start_date || ""
  );

  const [medical_condition_end_date, setMedicalConditionEndDate] = useState(
    selectedResidentMedicalCondition[residentMedicalConditionIndexToEdit]
      ?.medical_condition_end_date || ""
  );

  const [medical_condition_description, setMedicalConditionDescription] = useState(
    selectedResidentMedicalCondition[residentMedicalConditionIndexToEdit]
      ?.medical_condition_description || ""
  );

  const [medical_condition_document, setMedicalConditionDocument] = useState(
    selectedResidentMedicalCondition[residentMedicalConditionIndexToEdit]
      ?.medical_condition_document || ""
  );

  const [medicalConditionNameError, setMedicalConditionNameError] = useState("");
  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(medical_condition_name === "") {
      setMedicalConditionNameError("Medical condition name is required");
      return;
    }

    setMedicalConditionNameError("");

    const medicalobj = {
      id: id,
      resident: resident,
      medical_condition_name: medical_condition_name,
      medical_condition_state: medical_condition_state,
      medical_condition_start_date: medical_condition_start_date,
      medical_condition_end_date: medical_condition_end_date,
      medical_condition_description: medical_condition_description,
      medical_condition_document: medical_condition_document,
    };
    
    Object.entries(medicalobj).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (selectedResidentMedicalCondition[residentMedicalConditionIndexToEdit]?.id) {
      dispatchResidentMedicalCondition({
        type: "update",
        payload: { id, formData },
      });
    } else {
      dispatchResidentMedicalCondition({ type: "add", payload: formData });
    }
    setGlobalState("showResidentMedicalConditionModal", false);
  };

  
  const handleMedicalConditionNameChange = (e) => {
      setMedicalConditionName(e.target.value);
    setMedicalConditionNameError("");
  }

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file.size <= 5 * 1024 * 1024) {
        // 5MB in bytes
        setMedicalConditionDocument(file);
      } else {
        alert(`File '${file.name}' is larger than 5MB`);
      }
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
                  <h5 className="modal-title">
                    {selectedResidentMedicalCondition[
                      residentMedicalConditionIndexToEdit
                    ]?.id
                      ? "Edit Resident Medical Condition"
                      : "Add Resident Medical Condition"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showResidentMedicalConditionModal", false)
                    }
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Medical Condition Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={medical_condition_name}
                            onChange={handleMedicalConditionNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Medical Condition Name"
                          />
                          {medicalConditionNameError && (
                            <p className="error-message">
                              {medicalConditionNameError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Medical Condition State
                          </label>
                          <select
                            value={medical_condition_state}
                            onChange={(e) => setMedicalConditionState}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select State
                            </option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Start Date</label>
                          <input
                            value={medical_condition_start_date}
                            onChange={(e) =>
                              setMedicalConditionStartDate(e.target.value)
                            }
                            className="form-control floating"
                            type="date"
                            placeholder="Start Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">End Date</label>
                          <input
                            value={medical_condition_end_date}
                            onChange={(e) =>
                              setMedicalConditionEndDate(e.target.value)
                            }
                            className="form-control floating"
                            type="date"
                            placeholder="End Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Document File Upload</label>
                          <input
                            onChange={handleFileUpload}
                            className="form-control floating"
                            type="file"
                            accept=".png, .jpg, .pdf, .doc, .docx, .xls, .xlsx, .txt, .webp"
                            placeholder="Document File Upload"
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
                            value={medical_condition_description}
                            onChange={(e) =>
                              setMedicalConditionDescription(e.target.value)
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
                        {selectedResidentMedicalCondition[
                          residentMedicalConditionIndexToEdit
                        ]?.id
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

export default AddResidentMedicalConditionModal;
