import React, { useState, useEffect, useReducer } from "react";
import Dropzone from "react-dropzone";
import fileSize from "file-size";
import "./style.css";

const FileUpload = ({ dispatchFiles, uniqueID }) => {
  const [fileDetails, setFileDetails] = useState([]);

  const handleFileDrop = async (acceptedFiles) => {
    const updatedFileDetails = [...fileDetails];
    for (let i = 0; i < acceptedFiles.length; i++) {
      const selectedFile = acceptedFiles[i];
      if (selectedFile.size <= 1048576) {
        // 1MB in bytes
        const fileData = await readFileAsBlob(selectedFile);
        updatedFileDetails.push({
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
          data: fileData,
          id: Date.now() + i,
          uniqueID: uniqueID,
        });
      } else {
        alert(
          `File '${selectedFile.name}' size exceeds 1MB limit and won't be displayed.`
        );
      }
    }
    setFileDetails(updatedFileDetails);
  };

  const handleFileCancel = (index) => {
    const updatedFileDetails = [...fileDetails];
    updatedFileDetails.splice(index, 1);
    setFileDetails(updatedFileDetails);
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

  const handleFilesUpload = () => {
    if (fileDetails && fileDetails.length > 0) {
      const filesToUpload = fileDetails.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        data: file.data,
        id: file.id,
        uniqueID: file.uniqueID,
      }));
      dispatchFiles({ type: "push", payload: filesToUpload });
      alert("All files uploaded successfully!");
      setFileDetails([]);
    } else {
      alert("No files to upload.");
    }
  };

  return (
    <div>
      <Dropzone onDrop={handleFileDrop} accept={["image/*", ".pdf"]}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>
              Drag and drop an image or PDF file here, or click to select a
              file.
            </p>
          </div>
        )}
      </Dropzone>
      {fileDetails.map((file, index) => (
        <div key={index} className="file-preview">
          {file.type && file.type.startsWith("image/") ? (
            <img className="img-preview" src={file.data} alt="Preview" />
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
              <a href="#" onClick={(event) => event.preventDefault()}>
                {file.name}
              </a>
            </span>
            <div className="file-size">
              Size: {fileSize(file.size).human("si")}
            </div>
            <div className="file-size">Type: {file.type}</div>
            <button
              className="removeBtn"
              onClick={() => handleFileCancel(index)}
            >
              Remove
            </button>
            {/* <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                marginBottom: "15px",
                color: "red",
              }}
              type="button"
              onClick={() => handleFileCancel(index)}
            >
              <i className="fa fa-trash-o" />
            </button> */}
          </div>
        </div>
      ))}
      <br />
      {fileDetails && fileDetails.length > 0 && (
        <>
          <button className="removeBtn" onClick={handleFilesUpload}>
            Save Document
          </button>
        </>
      )}
    </div>
  );
};

export default FileUpload;
