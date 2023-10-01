import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import "./style.css";

const AddHouseDocuments = ({
  house,
  id,
  dispatchHouseDocuments,
  houseDocumentsIndexToEdit,
}) => {
  const [selectedHouseDocuments] = useGlobalState("selectedHouseDocuments");

  const [title, setTitle] = useState(
    selectedHouseDocuments[houseDocumentsIndexToEdit]?.title || ""
  );

  const [file, setFile] = useState(
    selectedHouseDocuments[houseDocumentsIndexToEdit]?.file || ""
  );

  const [description, setDescription] = useState(
    selectedHouseDocuments[houseDocumentsIndexToEdit]?.description || ""
  );

  const [status, setStatus] = useState(
    selectedHouseDocuments[houseDocumentsIndexToEdit]?.status || ""
  );

  const [valid_from, setValidFrom] = useState(
    selectedHouseDocuments[houseDocumentsIndexToEdit]?.valid_from || ""
  );

  const [expiry_date, setExpiryDate] = useState(
    selectedHouseDocuments[houseDocumentsIndexToEdit]?.expiry_date || ""
  );

  const [titleError, setTitleError] = useState("");
  const [fileError, setFileError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  let formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      setTitleError("Title is required.");
      return;
    }
    if (file == "") {
      setFileError("File is required.");
      return;
    }
    if (description === "") {
      setDescriptionError("Description is required.");
      return;
    }

    // Clear any existing error messages
    setTitleError("");
    setFileError("");
    setDescriptionError("");

    const houseDocument = {
      id: id,
      house: house,
      title: title,
      file: file,
      status: status,
      description: description,
      valid_from: valid_from,
      expiry_date: expiry_date,
    };

    Object.entries(houseDocument).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (selectedHouseDocuments[houseDocumentsIndexToEdit]?.id) {
      dispatchHouseDocuments({ type: "update", payload: { id, formData } });
    } else {
      dispatchHouseDocuments({ type: "add", payload: formData });
    }
    setGlobalState("showHouseDocumentsModal", false);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };

  const handleNameChange = (e) => {
    setTitle(e.target.value);
    setTitleError("");
  };

  const handleFileOnChange = (e) => {
    setFile(e.target.files[0]);
    setFileError("");
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
                    {selectedHouseDocuments[houseDocumentsIndexToEdit]?.id
                      ? "Edit House Document"
                      : "Add House Document"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showHouseDocumentsModal", false)
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
                          <label className="col-form-label">
                            Title <span className="text-danger">*</span>
                          </label>
                          <input
                            value={title}
                            onChange={handleNameChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Title"
                          />
                          {titleError && (
                            <p className="error-message">{titleError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            File <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control floating"
                            type="file"
                            accept=".pdf, .doc, .docx, .txt, .xls, .xlsx, .csv, .png, .jpeg, .webp, .PNG, .JPEG,"
                            onChange={handleFileOnChange}
                          />
                          {fileError && (
                            <p className="error-message">{fileError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Valid From</label>
                          <input
                            value={valid_from}
                            onChange={(event) =>
                              setValidFrom(event.target.value)
                            }
                            className="form-control floating"
                            type="date"
                            placeholder="Valid from"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Expiry Date</label>
                          <input
                            value={expiry_date}
                            onChange={(event) =>
                              setExpiryDate(event.target.value)
                            }
                            className="form-control floating"
                            type="date"
                            placeholder="Expiry Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">Status</label>
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select
                            </option>
                            <option value="Active">Active</option>
                            <option value="Expired">Expired</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Description</label>{" "}
                          <span className="text-danger">*</span>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                            style={{ height: "70px" }}
                          />
                          {descriptionError && (
                            <p className="error-message">{descriptionError}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedHouseDocuments[houseDocumentsIndexToEdit]?.id
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

export default AddHouseDocuments;
