import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";

const AddSubTask = ({
  dispatchTaskImage,
  indexToEdit,
  taskId,
  selecetedTaskId,
}) => {
  const [selectedTaskImage] = useGlobalState("selectedTaskImage");

  const [image, setImage] = useState(
    selectedTaskImage[indexToEdit]?.image
      ? selectedTaskImage[indexToEdit]?.image
      : ""
  );

  const [imageName, setImageName] = useState(
    selectedTaskImage[indexToEdit]?.imageName
      ? selectedTaskImage[indexToEdit]?.imageName
      : ""
  );

  const [id, setId] = useState(
    selectedTaskImage[indexToEdit]?.id
      ? selectedTaskImage[indexToEdit]?.id
      : Date.now()
  );

  const imageOnChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setImage(base64Image);
    };
    setImageName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskImage = {
      id,
      taskId,
      selecetedTaskId,
      image,
      imageName,
    };
    if (selectedTaskImage[indexToEdit]?.id) {
      dispatchTaskImage({ type: "update", payload: taskImage });
    } else {
      dispatchTaskImage({ type: "push", payload: taskImage });
    }
    setGlobalState("showTaskImageModal", false);
  };

  return (
    <PopupWrapper>
      <PopupOverlay />
      <PopupContainer className=" custom-modal" role="dialog">
        <Card className="" role="document">
          <div className="card-content">
            <div className="card-header">
              <h5 className="card-title">
                {selectedTaskImage[indexToEdit]?.id
                  ? "Edit Image"
                  : "Add Image"}
              </h5>
              <div className="btn-container">
                <button
                  className="closeX"
                  type="button"
                  onClick={() => setGlobalState("showTaskImageModal", false)}
                >
                  <span>×</span>
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
                <div className="submit-btn">
                  <button onClick={handleSubmit} className="submit-Btn">
                    {selectedTaskImage[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddSubTask;
