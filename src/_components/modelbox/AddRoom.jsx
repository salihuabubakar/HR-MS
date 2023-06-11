import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import "./style.css";
import Dropzone from "react-dropzone";

const AddRoom = ({ dispatchRoom, roomIndexToEdit, house, id }) => {
  const [selectedRoom] = useGlobalState("selectedRoom");

  console.log("insideRoom",id);

  const [room_type, setRoomType] = useState(
    selectedRoom[roomIndexToEdit]?.room_type
      ? selectedRoom[roomIndexToEdit]?.room_type
      : ""
  );

  const [room_status, setRoomStatus] = useState(
    selectedRoom[roomIndexToEdit]?.room_status
      ? selectedRoom[roomIndexToEdit]?.room_status
      : ""
  );

  const [room_description, setDescription] = useState(
    selectedRoom[roomIndexToEdit]?.room_description
      ? selectedRoom[roomIndexToEdit]?.room_description
      : ""
  );

  const [room_photos, setRoomPhotos] = useState(
    selectedRoom[roomIndexToEdit]?.room_photos
      ? selectedRoom[roomIndexToEdit]?.room_photos
      : []
  );
 
  const [roomTypeError, setRoomTypeError] = useState("");
  const [roomPhotosError, setRoomPhotosError] = useState("");

  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (room_type === "") {
      setRoomTypeError("Room type is required.");
      return;
    }
    if (room_photos?.length === 0) {
      setRoomPhotosError("Please upload at least one photo.");
      return;
    }

    // Clear any existing error messages
    setRoomTypeError("");
    setRoomPhotosError("");

    const fields = {
      house: house,
      room_type: room_type,
      room_status: room_status,
      room_description: room_description,
      room_photos: room_photos,
    };

    Object.entries(fields).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (selectedRoom[roomIndexToEdit]?.id) {
      dispatchRoom({ type: "update", payload: {id, formData} });
    } else {
      dispatchRoom({ type: "add", payload: formData });
    }
    setGlobalState("showRoomModal", false);
  };

  const handleRoomType = (e) => {
    setRoomType(e.target.value);
    setRoomTypeError("");
  };

   const handleFileDrop = (acceptedFiles) => {
     const updatedFilePreviews = acceptedFiles.reduce((acc, file) => {
       if (file.size <= 5 * 1024 * 1024) {
         // 5MB in bytes
         return [
           ...acc,
           {
             room_photos: file,
           },
         ];
       } else {
         alert(`File '${file.name}' is larger than 5MB`);
         return acc;
       }
     }, []);

     setRoomPhotos((prevFilePreviews) => [
       ...prevFilePreviews,
       ...updatedFilePreviews,
     ]);
     setRoomPhotosError("");
   };

   const handleFileRemove = (previewIndex) => {
     setRoomPhotos((prevFilePreviews) =>
       prevFilePreviews.filter((_, index) => index !== previewIndex)
     );
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
                    {selectedRoom[roomIndexToEdit]?.id
                      ? "Edit Room"
                      : "Add Room"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showRoomModal", false)}
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
                            Room Type <span className="text-danger">*</span>
                          </label>
                          <select
                            value={room_type}
                            onChange={handleRoomType}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Room Type
                            </option>
                            <option value="bedroom">Bedroom</option>
                            <option value="bathroom">Bathroom</option>
                            <option value="kitchen">Kitchen</option>
                            <option value="living_room">Living Room</option>
                          </select>
                          {roomTypeError && (
                            <p className="error-message">{roomTypeError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Room Status</label>
                          <select
                            value={room_status}
                            onChange={(e) => setRoomStatus(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Room Status
                            </option>
                            <option value="vacant">Vacant</option>
                            <option value="occupied">Occupied</option>
                            <option value="under_maintenance">
                              Under Maintenance
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Description</label>
                          <textarea
                            value={room_description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Description"
                            style={{ height: "90px" }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">Room Photos</label>{" "}
                          <span className="text-danger">*</span>
                          <div>
                            <Dropzone
                              onDrop={handleFileDrop}
                              accept={"image/*"}
                              multiple={true}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} className="dropzone">
                                  <input {...getInputProps()} />
                                  <p>Drag and drop images</p>
                                </div>
                              )}
                            </Dropzone>
                            {room_photos?.map((file, previewIndex) => (
                              <div key={previewIndex} className="file-preview">
                                <div className="file-info">
                                  {file.room_photos.type &&
                                  file.room_photos.type.startsWith("image/") ? (
                                    <img
                                      className="img-preview"
                                      src={URL.createObjectURL(
                                        file.room_photos
                                      )}
                                      alt="Preview"
                                    />
                                  ) : (
                                    <div className="file-type">
                                      <span className="files-icon">
                                        <i className="fa fa-file-pdf-o" />
                                      </span>
                                    </div>
                                  )}
                                  <div className="files-info">
                                    <span className="file-name text-ellipsis">
                                      <a
                                        href="#"
                                        onClick={(event) =>
                                          event.preventDefault()
                                        }
                                      >
                                        {file.room_photos.name}
                                      </a>
                                    </span>
                                    <button
                                      className="removeBtn"
                                      onClick={() =>
                                        handleFileRemove(previewIndex)
                                      }
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {roomPhotosError && (
                              <p className="error-message">{roomPhotosError}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedRoom[roomIndexToEdit]?.id ? "Update" : "Save"}
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

export default AddRoom;
