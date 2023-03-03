import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddResident = ({
  dispatchResidents,
  indexToEdit,
}) => {
  const [selectedResident] = useGlobalState("selectedResident");

  const [residentName, setResidentName] = useState(
    selectedResident[indexToEdit]?.residentName
      ? selectedResident[indexToEdit]?.residentName
      : ""
  );

  const [id, setId] = useState(
    selectedResident[indexToEdit]?.id ? selectedResident[indexToEdit]?.id : Date.now()
  );

  const [image, setImage] = useState(
    selectedResident[indexToEdit]?.image
      ? selectedResident[indexToEdit]?.image
      : ""
  );
  const imageOnChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setImage(base64Image);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const residents = {
      residentName,
      image,
      id,
    };
    if (selectedResident[indexToEdit]?.id) {
      dispatchResidents({ type: "update", payload: residents });
    } else {
      dispatchResidents({ type: "push", payload: residents });
    }
    setGlobalState("showModal", false);
  };
  return (
    <PopupWrapper>
      <PopupOverlay />
      <PopupContainer className=" custom-modal" role="dialog">
        <Card className="" role="document">
          <div className="card-content">
            <div className="card-header">
              <h5 className="card-title">
                {selectedResident[indexToEdit]?.id
                  ? "Edit Resident"
                  : "Add Resident"}
              </h5>
              <div className="btn-container">
                <button
                  type="button"
                  className="closeX"
                  onClick={() => setGlobalState("showModal", false)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="card-body">
              <form>
                <div className="col-sm">
                  <div
                    style={{ borderRadius: "5px" }}
                    className="profile-img-wrap edit-img"
                  >
                    <img
                      style={{ borderRadius: "5px" }}
                      className="inline-block"
                      src={image}
                      alt="image"
                    />
                    <div className="fileupload btn">
                      <span className="btn-text">Upload</span>
                      <input
                        className="upload"
                        type="file"
                        accept="image/*"
                        onChange={imageOnChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group form-focus focused">
                  <label className="focus-label">
                    Resident Name <span className="text-danger">*</span>
                  </label>
                  <input
                    value={residentName}
                    onChange={(e) => setResidentName(e.target.value)}
                    className="form-control floating"
                    type="text"
                    placeholder="Resident Name"
                  />
                </div>
                <div className="submit-btn">
                  <button onClick={handleSubmit} className="submit-Btn">
                    {selectedResident[indexToEdit]?.id ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </PopupContainer>
    </PopupWrapper>
  );
};

export default AddResident;
