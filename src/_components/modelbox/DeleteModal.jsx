import React from "react";
import { setGlobalState } from "../../context/GlobalState";
import {
  PopupWrapper,
  PopupOverlay,
  PopupContainer,
} from "./Addemployee.style";

const DeleteModal = ({ deleteAction, indexToDelete, dispatch, modalTitle }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    deleteAction({
      type: "delete",
      payload: dispatch[indexToDelete],
    });

    setGlobalState("deleteModal", false);
    setGlobalState("showEducationInformationModal", false);
    setGlobalState("showFamilyMenberModal", false);
    setGlobalState("showExperienceModal", false);
    setGlobalState("showAddSchedul", false);
    setGlobalState("deleteFile", false)
  };

  const handleModalClose = () => {
    setGlobalState("deleteModal", false);
    setGlobalState("deleteFile", false);
  }

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer className="custom-modal" role="dialog">
            <div className="custom-modal" role="dialog">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="form-header">
                      <h3>Delete {modalTitle}</h3>
                      <p>Are you sure want to delete?</p>
                    </div>
                    <div className="modal-btn delete-action">
                      <div className="row">
                        <div className="col-6">
                          <button
                            href=""
                            onClick={handleSubmit}
                            className="btn btn-primary continue-btn"
                          >
                            Delete
                          </button>
                        </div>
                        <div className="col-6">
                          <button
                            href=""
                            onClick={handleModalClose}
                            className="btn btn-primary cancel-btn"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PopupContainer>
        </PopupOverlay>
      </PopupWrapper>
    </>
  );
};

export default DeleteModal;
