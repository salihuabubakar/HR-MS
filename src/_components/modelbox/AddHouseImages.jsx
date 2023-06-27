import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import "./style.css";
import { toast } from "react-toastify";

const AddHouseImages = ({
  house,
  id,
  dispatchHouseImages,
  houseImagesIndexToEdit,
}) => {
  const [selectedHouseImages] = useGlobalState("selectedHouseImages");
  const imageUrlFromServer = selectedHouseImages[houseImagesIndexToEdit]?.image;


  const [name, setName] = useState(
    selectedHouseImages[houseImagesIndexToEdit]?.name || ""
  );

  const [image, setImage] = useState("");

  const [description, setDescription] = useState(
    selectedHouseImages[houseImagesIndexToEdit]?.description || ""
  );

  const [cover_image, setCoverImage] = useState(
    selectedHouseImages[houseImagesIndexToEdit]?.cover_image || false
  );

  const [nameError, setNameError] = useState("");
  const [imageError, setImageError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  let formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image == "") {
      setImageError("Image is required.");
      return;
    }

    if (name === "") {
      setNameError("Name is required.");
      return;
    }
    if (description === "") {
      setDescriptionError("Description is required.");
      return;
    }

    // Clear any existing error messages
    setNameError("");
    setImageError("");
    setDescriptionError("");

    const houseImage = {
      id: id,
      house: house,
      name: name,
      image: image,
      cover_image: cover_image,
      description: description,
    };

    Object.entries(houseImage).forEach(([fieldName, fieldValue]) => {
      formData.append(fieldName, fieldValue);
    });

    if (selectedHouseImages[houseImagesIndexToEdit]?.id) {
      dispatchHouseImages({ type: "update", payload: { id, formData } });
      toast.success("House Document Updated", {
        autoClose: 7000,
      });
    } else {
      dispatchHouseImages({ type: "add", payload: formData });
      toast.success("House Document Added", {
        autoClose: 7000,
      });
    }
    setGlobalState("showHouseImagesModal", false);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError("");
  };

  const imageOnChange = (e) => {
    setImage(e.target.files[0]);
    setImageError("");
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
                    {selectedHouseImages[houseImagesIndexToEdit]?.id
                      ? "Edit House Image"
                      : "Add House Image"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showHouseImagesModal", false)
                    }
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-12">
                        <div
                          style={{ borderRadius: "5px" }}
                          className="profile-img-wrap edit-img"
                        >
                          <img
                            style={{ borderRadius: "5px" }}
                            className="inline-block"
                            src={
                              image
                                ? URL.createObjectURL(image)
                                : imageUrlFromServer
                            }
                            alt=""
                          />
                          <div className="fileupload btn">
                            {imageError && (
                              <p className="error-message">{imageError}</p>
                            )}
                            <span className="btn-text">
                              {selectedHouseImages[houseImagesIndexToEdit]?.id
                                ? "Update"
                                : "Upload"}
                            </span>
                            <input
                              className="upload"
                              type="file"
                              accept="image/*"
                              onChange={imageOnChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            Name <span className="text-danger">*</span>
                          </label>
                          <input
                            value={name}
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
                      {/* {selectedHouseImages[houseImagesIndexToEdit]
                        ?.id ? null : (
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Image <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control floating"
                              type="file"
                              accept="image/*"
                              onChange={imageOnChange}
                            />
                          </div>
                        </div>
                      )} */}
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Cover Image</label>
                          <input
                            checked={cover_image}
                            onChange={(e) => setCoverImage(e.target.checked)}
                            // className="form-control floating"
                            type="checkbox"
                            placeholder="Cover Image"
                          />
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
                        {selectedHouseImages[houseImagesIndexToEdit]?.id
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

export default AddHouseImages;
