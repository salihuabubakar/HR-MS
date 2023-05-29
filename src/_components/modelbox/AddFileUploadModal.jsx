import React, { useState, useEffect, useReducer } from "react";
import {
  PopupWrapper,
  PopupContainer,
  PopupOverlay,
  Card,
} from "../../_components/modelbox/Addemployee.style";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "./DeleteModal";
import Dropzone from "react-dropzone";
import fileSize from "file-size";
import "../style.css"
import { v4 as uuidv4 } from "uuid";

const AddFileUploadModal = ({
  dispatchFiles,
  fileUploadIndex,
  uniqueID,
  fileUploadfieldIndex,
  selectedTaskId,
}) => {
  const uniqueId = uuidv4();
  const [selectedFileUpload] = useGlobalState("selectedFileUpload");
  const [deleteModal] = useGlobalState("deleteModal");
  // const [fileDetails, setFileDetails] = useState(null);
  const idIsTrue = selectedFileUpload[fileUploadIndex]?.id;

  const [inputFields, setInputFields] = useState([
    {
      documentName: selectedFileUpload[fileUploadIndex]?.inputFields[
        fileUploadfieldIndex
      ]?.documentName
        ? selectedFileUpload[fileUploadIndex]?.inputFields[fileUploadfieldIndex]
            ?.documentName
        : "",
      documentType: selectedFileUpload[fileUploadIndex]?.inputFields[
        fileUploadfieldIndex
      ]?.documentType
        ? selectedFileUpload[fileUploadIndex]?.inputFields[fileUploadfieldIndex]
            ?.documentType
        : "",
      documentNumber: selectedFileUpload[fileUploadIndex]?.inputFields[
        fileUploadfieldIndex
      ]?.documentNumber
        ? selectedFileUpload[fileUploadIndex]?.inputFields[fileUploadfieldIndex]
            ?.documentNumber
        : "",
      issueDate: selectedFileUpload[fileUploadIndex]?.inputFields[
        fileUploadfieldIndex
      ]?.issueDate
        ? selectedFileUpload[fileUploadIndex]?.inputFields[fileUploadfieldIndex]
            ?.issueDate
        : "",
      expiryDate: selectedFileUpload[fileUploadIndex]?.inputFields[
        fileUploadfieldIndex
      ]?.expiryDate
        ? selectedFileUpload[fileUploadIndex]?.inputFields[fileUploadfieldIndex]
            ?.expiryDate
        : "",
      documentDescription: selectedFileUpload[fileUploadIndex]?.inputFields[
        fileUploadfieldIndex
      ]?.documentDescription
        ? selectedFileUpload[fileUploadIndex]?.inputFields[fileUploadfieldIndex]
            ?.documentDescription
        : "",
      fileDetails: selectedFileUpload[fileUploadIndex]?.inputFields[
        fileUploadfieldIndex
      ]?.fileDetails
        ? selectedFileUpload[fileUploadIndex]?.inputFields[fileUploadfieldIndex]
            ?.fileDetails
        : "",
      documentNameError: "",
      documentTypeError: "",
      documentDescriptionError: "",
    },
  ]);

  const handleFileDrop = async (index, acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    // const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    const maxSize = 1048576; // 1MB in bytes
    if (selectedFile) {
      if (selectedFile.size <= maxSize) {
        const fileData = await readFileAsBlob(selectedFile);
        const updatedInputFields = [...inputFields]; // Create a copy of inputFields array
        updatedInputFields[index].fileDetails = {
          name: selectedFile.name,
          type: selectedFile.type,
          data: fileData,
        };
        setInputFields(updatedInputFields);
      } else {
        alert(
          `File '${selectedFile.name}' size exceeds 1MB limit and won't be displayed.`
        );
      }
    }
  };

  const handleFileRemove = (index) => {
    const updatedInputFields = [...inputFields]; // Create a copy of inputFields array
    updatedInputFields[index].fileDetails = null; // Clear the file details
    updatedInputFields[index].selectedFile = null; // Clear the selected file
    setInputFields(updatedInputFields);
  };

  const readFileAsBlob = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const [id] = useState(idIsTrue ? idIsTrue : Date.now());

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for empty fields
    if(selectedTaskId != uniqueID) {
      const isAnyFieldEmpty = inputFields.some(
        (field) =>
          field.documentName.trim() === "" || field.documentType.trim() === ""
      );
      if (isAnyFieldEmpty) {
        // Set error for empty fields
        setInputFields((prevInputFields) =>
          prevInputFields.map((field) => {
            const updatedField = { ...field };

            if (field.documentName.trim() === "") {
              updatedField.documentNameError = "Document Name is required";
            }

            if (field.documentType.trim() === "") {
              updatedField.documentTypeError = "Document Type is required";
            }

            return updatedField;
          })
        );

        return;
      }
    };
    
    if(selectedTaskId == uniqueID) {
      const isAnyFieldEmpty = inputFields.some(
        (field) => field.documentDescription.trim() === ""
      );
      if (isAnyFieldEmpty) {
        // Set error for empty fields
        setInputFields((prevInputFields) =>
          prevInputFields.map((field) => {
            const updatedField = { ...field };

            if (field.documentDescription.trim() === "") {
              updatedField.documentDescriptionError = "Description is required";
            }

            return updatedField;
          })
        );

        return;
      }
    }
    //Proceed with form submission
    inputFields.forEach((field, i) => {
      const fileDetail = {
        id: idIsTrue ? id : uniqueId + i,
        uniqueID,
        inputFields: [field],
      };

      if (idIsTrue) {
        dispatchFiles({ type: "update", payload: fileDetail });
      } else {
        dispatchFiles({ type: "push", payload: fileDetail });
      }
    });
    setGlobalState("showFileUploadModal", false);
  };

  const handleDelete = () => {
    setGlobalState("deleteModal", true);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setInputFields((prevInputFields) => {
      const updatedFields = [...prevInputFields];
      const field = updatedFields[index];
      // Update field value
      field[name] = value;
      // Clear corresponding error
      field[`${name}Error`] = "";
      return updatedFields;
    });
  };

  const addFields = () => {
    let newfield = {
      documentName: "",
      documentType: "",
      documentNumber: "",
      issueDate: "",
      expiryDate: "",
      documentDescription: "",
      fileDetails: null,
    };

    setInputFields([...inputFields, newfield]);
  };

  const removeFields = (index) => {
    const updatedFields = inputFields.filter((_, i) => i !== index);
    setInputFields(updatedFields);
  };

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer top={true} className="custom-modal" role="dialog">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {idIsTrue ? "Edit Uploaded File" : "Add File"}
                  </h5>
                  {idIsTrue && (
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        marginBottom: "15px",
                      }}
                      className="delete-icon"
                      type="button"
                      onClick={handleDelete}
                    >
                      <i className="fa fa-trash-o" />
                    </button>
                  )}
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showFileUploadModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      {inputFields.map((value, index) => {
                        return (
                          <div key={index} className="row Primary">
                            <h5 className="section-title">
                              File Upload
                              {idIsTrue ? (
                                ""
                              ) : (
                                <span>
                                  {index != 0 && (
                                    <a
                                      className="delete-icon"
                                      onClick={() => removeFields(index)}
                                    >
                                      <i className="fa fa-trash-o" />
                                    </a>
                                  )}
                                </span>
                              )}
                            </h5>
                            {selectedTaskId != uniqueID ? (
                              <>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="focus-label">
                                      Document Name{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control floating"
                                      placeholder="Document Name"
                                      name="documentName"
                                      value={value?.documentName}
                                      onChange={(event) => {
                                        handleInputChange(index, event);
                                      }}
                                    />
                                    {value?.documentNameError && (
                                      <span className="error-message">
                                        {value?.documentNameError}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="focus-label">
                                      Document Type{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control floating"
                                      placeholder="e.g passport, drivers license"
                                      name="documentType"
                                      value={value?.documentType}
                                      onChange={(event) => {
                                        handleInputChange(index, event);
                                      }}
                                    />
                                    {value?.documentTypeError && (
                                      <span className="error-message">
                                        {value?.documentTypeError}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">
                                      Issue Date
                                    </label>
                                    <div>
                                      <input
                                        className="form-control floating datetimepicker"
                                        type="date"
                                        placeholder="Issue Date"
                                        name="issueDate"
                                        value={value?.issueDate}
                                        onChange={(event) => {
                                          handleInputChange(index, event);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">
                                      Expiry Date
                                    </label>
                                    <div>
                                      <input
                                        className="form-control floating datetimepicker"
                                        type="date"
                                        placeholder="Expiry Date"
                                        name="expiryDate"
                                        value={value?.expiryDate}
                                        onChange={(event) => {
                                          handleInputChange(index, event);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="focus-label">
                                      Document Number
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control floating"
                                      placeholder="Document Number"
                                      name="documentNumber"
                                      value={value?.documentNumber}
                                      onChange={(event) => {
                                        handleInputChange(index, event);
                                      }}
                                    />
                                  </div>
                                </div>
                              </>
                            ) : null}

                            <div
                              className={
                                selectedTaskId != uniqueID
                                  ? "col-sm-6"
                                  : "col-sm-12"
                              }
                            >
                              <div className="form-group">
                                <label className="label">Description </label>
                                <textarea
                                  className="form-control floating"
                                  name="documentDescription"
                                  placeholder="Description"
                                  value={value?.documentDescription}
                                  onChange={(event) => {
                                    handleInputChange(index, event);
                                  }}
                                  style={{
                                    height:
                                      selectedTaskId == uniqueID
                                        ? "120px"
                                        : null,
                                  }}
                                />
                                {selectedTaskId == uniqueID ? (
                                  value?.documentDescriptionError && (
                                  <span className="error-message">
                                    {value?.documentDescriptionError}
                                  </span>
                                )
                                ) : null}
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="form-group">
                                <label className="col-form-label">File</label>
                                <div>
                                  <Dropzone
                                    onDrop={(files) =>
                                      handleFileDrop(index, files)
                                    } // Pass the index to the handleFileDrop function
                                    accept={["image/*", ".pdf"]}
                                    multiple={false}
                                  >
                                    {({ getRootProps, getInputProps }) => (
                                      <div
                                        {...getRootProps()}
                                        className="dropzone"
                                      >
                                        <input {...getInputProps()} />
                                        <p>
                                          Drag and drop an image or PDF file
                                          here, or click to select a file.
                                        </p>
                                      </div>
                                    )}
                                  </Dropzone>
                                  {value.fileDetails && (
                                    <div className="file-preview">
                                      {value.fileDetails.type &&
                                      value.fileDetails.type.startsWith(
                                        "image/"
                                      ) ? (
                                        <img
                                          className="img-preview"
                                          src={value.fileDetails.data}
                                          alt="Preview"
                                        />
                                      ) : (
                                        <>
                                          <div className="file-type">
                                            <span className="files-icon">
                                              <i className="fa fa-file-pdf-o" />
                                            </span>
                                          </div>
                                        </>
                                      )}
                                      <div className="files-info">
                                        <span className="file-name text-ellipsis">
                                          <a
                                            href="#"
                                            onClick={(event) =>
                                              event.preventDefault()
                                            }
                                          >
                                            {value.fileDetails.name}
                                          </a>
                                        </span>
                                        {/* <div className="file-size">
                                          Size:{" "}
                                          {fileSize(
                                            value.fileDetails.size
                                          ).human("si")}
                                        </div> */}
                                        {/* <div className="file-size">
                                          Type: {value.fileDetails.type}
                                        </div> */}
                                        {idIsTrue ? null : (
                                          <button
                                            className="removeBtn"
                                            onClick={() =>
                                              handleFileRemove(index)
                                            }
                                          >
                                            Remove
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {!idIsTrue ? (
                      <div className="add-more" onClick={addFields}>
                        <a>
                          <i className="fa fa-plus-circle" /> Add More Field
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {idIsTrue ? "Update" : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </PopupContainer>
        </PopupOverlay>
      </PopupWrapper>
      {deleteModal && (
        <DeleteModal
          deleteAction={dispatchFiles}
          indexToDelete={fileUploadIndex}
          dispatch={selectedFileUpload}
          modalTitle={"File"}
        />
      )}
    </>
  );
};
export default AddFileUploadModal;
