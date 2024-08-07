import React, { useState } from 'react';
import { PopupContainer, PopupOverlay, PopupWrapper } from './Addemployee.style';
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import "./style.css";

const EditProfile = ({ id, img_url, dispatchProfileImage }) => {
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(img_url || "");

  const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();


    // if (id) {
    //   dispatchProfileImage({ type: "update", payload: formData });
    // } else {
      dispatchProfileImage({ type: "add", payload: formData.append('photo', photo) });
    // }

    setGlobalState("showModal", false);
  };

  const imageOnChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const [isDarkMode] = useGlobalState("isDarkMode");

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer isDarkMode={isDarkMode} className="custom-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content p-5">
                <div className="modal-header">
                  <h5 className="card-title">
                  { id ? 'Edit Profile' : 'Add Profile'}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className='row'>
                      <div className="col-sm-12">
                        <div style={{ borderRadius: "5px" }} className="profile-img-wrap edit-img">
                          {previewUrl ? (
                            <img
                              style={{ borderRadius: "5px" }}
                              className="inline-block"
                              src={previewUrl}
                              alt="profile_preview"
                            />
                          ) : (
                            <div className="no-image">No Image Selected</div>
                          )}
                          <div className="fileupload btn">
                            <span className="btn-text">
                              { id ? 'Update' : 'Upload' }
                            </span>
                            <input
                              className="upload"
                              type="file"
                              accept="image/*"
                              onChange={imageOnChange}
                              name='photo'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        { id ? 'Update' : 'Save'}
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

export default EditProfile;
