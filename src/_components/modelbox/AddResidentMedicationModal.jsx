import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { toast } from "react-toastify";
import { useResidentGpFetching } from "../../utils/employeeCustomFetchHook";

const AddResidentMedicationModal = ({
  residentMedicationIndexToEdit,
  id,
  dispatchResidentMedication,
  resident,
}) => {

  const { residentGpData } = useResidentGpFetching();

  const [selectedResidentMedication] = useGlobalState(
    "selectedResidentMedication"
  );

  const [medication_name, setMedicationName] = useState(
    selectedResidentMedication[residentMedicationIndexToEdit]
      ?.medication_name || ""
  );

  const [medication_state, setMedicationState] = useState(
    selectedResidentMedication[residentMedicationIndexToEdit]
      ?.medication_state || ""
  );

  const [gp, setGp] = useState(
    selectedResidentMedication[residentMedicationIndexToEdit]?.gp || ""
  );

  const [medication_frequency, setMedicationFrequency] = useState(
    selectedResidentMedication[residentMedicationIndexToEdit]
      ?.medication_frequency || ""
  );

  const [medication_dosage, setMedicationDosage] = useState(
    selectedResidentMedication[residentMedicationIndexToEdit]
      ?.medication_dosage || ""
  );

  const [medication_prescription_date, setMedicationPrescriptionDate] =
    useState(
      selectedResidentMedication[residentMedicationIndexToEdit]
        ?.medication_prescription_date || ""
    );

  const [medication_start_date, setMedicationStartDate] = useState(
    selectedResidentMedication[residentMedicationIndexToEdit]
      ?.medication_start_date || ""
  );

  const [medication_end_date, setMedicationEndDate] = useState(
    selectedResidentMedication[residentMedicationIndexToEdit]
      ?.medication_end_date || ""
  );

  const [medication_description, setMedicationDescription] = useState(
    selectedResidentMedication[residentMedicationIndexToEdit]
      ?.medication_description || ""
  );


  const [medication_document, setMedicationDocument] = useState(
    selectedResidentMedication[residentMedicationIndexToEdit]
      ?.medication_document || ""
  );

  const [medicationNameError, setMedicationNameError] = useState("");
  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (medication_name === "") {
      setMedicationNameError("Medication name is required");
      return;
    }

    setMedicationNameError("");

    const medicationObj = {
      id: id,
      resident: resident,
      medication_name: medication_name,
      medication_state: medication_state,
      medication_start_date: medication_start_date,
      medication_end_date: medication_end_date,
      medication_description: medication_description,
      medication_document: medication_document,
      gp: gp,
      medication_frequency: medication_frequency,
      medication_dosage: medication_dosage,
      medication_prescription_date: medication_prescription_date,
    };

    Object.entries(medicationObj).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (
      selectedResidentMedication[residentMedicationIndexToEdit]?.id
    ) {
      dispatchResidentMedication({
        type: "update",
        payload: { id, formData },
      });
      toast.success("Resident Medication Updated", {
        autoClose: 7000,
      });
    } else {
      dispatchResidentMedication({ type: "add", payload: formData });
      toast.success("Resident Medication Added", {
        autoClose: 7000,
      });
    }
    setGlobalState("showResidentMedicationModal", false);
  };

  const handleMedicationNameChange = (e) => {
    setMedicationName(e.target.value);
    setMedicationNameError("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.size <= 5 * 1024 * 1024) {
      // 5MB in bytes
      setMedicationDocument(file);
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
                    {selectedResidentMedication[residentMedicationIndexToEdit]
                      ?.id
                      ? "Edit Resident Medication"
                      : "Add Resident Medication"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showResidentMedicationModal", false)
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
                            Medication Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={medication_name}
                            onChange={handleMedicationNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Medication Name"
                          />
                          {medicationNameError && (
                            <p className="error-message">
                              {medicationNameError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Gp</label>
                          <select
                            value={gp}
                            onChange={(e) => setGp(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Gp
                            </option>
                            {residentGpData?.map((rgp) => (
                              <option key={rgp.id} value={rgp.id}>
                                {`${rgp.gp_practice_name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Medication State
                          </label>
                          <select
                            value={medication_state}
                            onChange={(e) => setMedicationState}
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
                          <label className="col-form-label">
                            Medication Dosage
                          </label>
                          <input
                            value={medication_dosage}
                            onChange={(e) =>
                              setMedicationDosage(e.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Medication Dosage"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Medication Frequency
                          </label>
                          <input
                            value={medication_frequency}
                            onChange={(e) =>
                              setMedicationFrequency(e.target.value)
                            }
                            className="form-control floating"
                            type="text"
                            placeholder="Medication Frequency"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Prescription Date
                          </label>
                          <input
                            value={medication_prescription_date}
                            onChange={(e) =>
                              setMedicationPrescriptionDate(e.target.value)
                            }
                            className="form-control floating"
                            type="date"
                            placeholder="Prescription Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Start Date</label>
                          <input
                            value={medication_start_date}
                            onChange={(e) =>
                              setMedicationStartDate(e.target.value)
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
                            value={medication_end_date}
                            onChange={(e) =>
                              setMedicationEndDate(e.target.value)
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
                            value={medication_description}
                            onChange={(e) =>
                              setMedicationDescription(e.target.value)
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
                        {selectedResidentMedication[
                          residentMedicationIndexToEdit
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

export default AddResidentMedicationModal;
