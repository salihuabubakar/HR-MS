import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { toast } from "react-toastify";

const AddResidentReferralModal = ({
  residentReferralIndexToEdit,
  id,
  dispatchResidentReferral,
  resident,
}) => {

  const [selectedResidentReferral] = useGlobalState("selectedResidentReferral");

  const [referral_name, setReferralName] = useState(
    selectedResidentReferral[residentReferralIndexToEdit]
      ?.referral_name || ""
  );

  const [referral_date, setReferralDate] = useState(
    selectedResidentReferral[residentReferralIndexToEdit]
      ?.referral_date || ""
  );

  const [referral_document, setReferralDocument] = useState(
    selectedResidentReferral[residentReferralIndexToEdit]
      ?.referral_document || ""
  );

  const [referral_description, setReferralDescription] = useState(
    selectedResidentReferral[residentReferralIndexToEdit]
      ?.referral_description || ""
  );


  const [referralNameError, setReferralNameError] = useState("");
  const [referralDateError, setReferralDateError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (referral_name === "") {
      setReferralNameError("Referral Name is required");
      return;
    }
    if (referral_date === "") {
      setReferralDateError("Referral Date is required");
      return;
    }

    setReferralNameError("");
    setReferralDateError("");

    const appObj = {
      id,
      resident,
      referral_name,
      referral_date,
      referral_description,
      referral_document,
    };


    if (
      selectedResidentReferral[residentReferralIndexToEdit]?.id
    ) {
      dispatchResidentReferral({
        type: "update",
        payload: appObj,
      });
      toast.success("Resident Referral Updated", {
        autoClose: 1500,
      });
    } else {
      dispatchResidentReferral({ type: "add", payload: appObj });
      toast.success("Resident Referral Added", {
        autoClose: 1500,
      });
    }
    setGlobalState("showResidentReferralModal", false);
  };

  const handleReferralNameChange = (e) => {
    setReferralName(e.target.value);
    setReferralNameError("");
  };

  const handleReferralDateChange = (e) => {
    setReferralDate(e.target.value);
    setReferralDateError("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.size <= 5 * 1024 * 1024) {
      // 5MB in bytes
      setReferralDocument(file);
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
                    {selectedResidentReferral[
                      residentReferralIndexToEdit
                    ]?.id
                      ? "Edit Resident Referral"
                      : "Add Resident Referral"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showResidentReferralModal", false)
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
                            Referral Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={referral_name}
                            onChange={handleReferralNameChange}
                            className="form-control floating"
                            placeholder="Referral Name"
                            type="text"
                          />
                          {referralNameError && (
                            <p className="error-message">{referralNameError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Referral Date <span className="text-danger">*</span>
                          </label>
                          <input
                            value={referral_date}
                            onChange={handleReferralDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Referral Date"
                          />
                          {referralDateError && (
                            <p className="error-message">{referralDateError}</p>
                          )}
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
                            value={referral_description}
                            onChange={(e) =>
                              setReferralDescription(e.target.value)
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
                        {selectedResidentReferral[
                          residentReferralIndexToEdit
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

export default AddResidentReferralModal;
