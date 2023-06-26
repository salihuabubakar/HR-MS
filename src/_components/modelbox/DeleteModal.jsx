import React from "react";
import { setGlobalState } from "../../context/GlobalState";
import {
  PopupWrapper,
  PopupOverlay,
  PopupContainer,
} from "./Addemployee.style";
import { toast } from "react-toastify";

const DeleteModal = ({
  deleteAction,
  iDToDelete,
  modalTitle,
}) => {
  const handleSubmit = async () => {
    deleteAction({
      type: "delete",
      payload: {
        id: iDToDelete,
      },
    });
    toast(`${modalTitle} deleted`, { autoClose: 1500 });

    setGlobalState("deleteModal", false);
    setGlobalState("showAddSchedul", false);
    setGlobalState("deleteFile", false);
    setGlobalState("deleteSubTask", false);
    setGlobalState("deleteRoleModal", false);
    setGlobalState("showAddReviewModal", false);
    setGlobalState("deleteDeptModal", false);
    setGlobalState("deleteRoomModal", false);
    setGlobalState("deleteHouseEmployeeModal", false);
    setGlobalState("deleteHouseResidentModal", false);
    setGlobalState("deleteHouseImagesModal", false);
    setGlobalState("deleteHouseDocumentsModal", false);
    setGlobalState("deleteBillModal", false);
    setGlobalState("deleteMaintenanceModal", false);
    setGlobalState("deleteOrganisationModal", false);
    setGlobalState("deleteStatusModal", false);
    setGlobalState("deleteEmployeeAddressModal", false);
    setGlobalState("deleteEmployeeEmergencyModal", false);
    setGlobalState("deleteEmployeeQualificationModal", false);
    setGlobalState("deleteEmployeeExperienceModal", false);
    setGlobalState("deleteEmployeeDocumentModal", false);
    setGlobalState("deleteEmployeeBankModal", false);
    setGlobalState("deleteNoticeModal", false);
    setGlobalState("deleteItemModal", false);
    setGlobalState("deleteInspectionModal", false);
    setGlobalState("deleteResidentGpModal", false);
    setGlobalState("deleteResidentSolicitorModal", false);
    setGlobalState("deleteResidentDocumentModal", false);
    setGlobalState("deleteResidentSchoolModal", false);
    setGlobalState("deleteResidentEducationModal", false);
    setGlobalState("deleteResidentSchoolReportModal", false);
    setGlobalState("deleteResidentSchoolTimetableModal", false);
    setGlobalState("deleteResidentMedicalConditionModal", false);
    setGlobalState("deleteResidentMedicationModal", false);
    setGlobalState("deleteResidentAppointmentModal", false);
    setGlobalState("deleteResidentSocialWorkerModal", false);
    setGlobalState("deleteResidentReferralModal", false);
    setGlobalState("deleteBoroughModal", false);
    setGlobalState("deleteSocialWorkerModal", false);
    setGlobalState("deleteResidentVisitorModal", false);
    setGlobalState("deleteComplaintModal", false);
    setGlobalState("deleteResidentRequestModal", false);
    setGlobalState("deleteResidentIncidentModal", false);
    setGlobalState("deleteResidentMisperModal", false);
  };

  const handleModalClose = () => {
    setGlobalState("deleteModal", false);
    setGlobalState("deleteFile", false);
    setGlobalState("showAddSchedul", false);
    setGlobalState("deleteSubTask", false);
    setGlobalState("deleteRoleModal", false);
    setGlobalState("showAddReviewModal", false);
    setGlobalState("deleteDeptModal", false);
    setGlobalState("deleteRoomModal", false);
    setGlobalState("deleteHouseEmployeeModal", false);
    setGlobalState("deleteHouseResidentModal", false);
    setGlobalState("deleteHouseImagesModal", false);
    setGlobalState("deleteHouseDocumentsModal", false);
    setGlobalState("deleteBillModal", false);
    setGlobalState("deleteMaintenanceModal", false);
    setGlobalState("deleteOrganisationModal", false);
    setGlobalState("deleteStatusModal", false);
    setGlobalState("deleteEmployeeAddressModal", false);
    setGlobalState("deleteEmployeeEmergencyModal", false);
    setGlobalState("deleteEmployeeQualificationModal", false);
    setGlobalState("deleteEmployeeExperienceModal", false);
    setGlobalState("deleteEmployeeDocumentModal", false);
    setGlobalState("deleteEmployeeBankModal", false);
    setGlobalState("deleteNoticeModal", false);
    setGlobalState("deleteItemModal", false);
    setGlobalState("deleteInspectionModal", false);
    setGlobalState("deleteResidentGpModal", false);
    setGlobalState("deleteResidentSolicitorModal", false);
    setGlobalState("deleteResidentDocumentModal", false);
    setGlobalState("deleteResidentSchoolModal", false);
    setGlobalState("deleteResidentEducationModal", false);
    setGlobalState("deleteResidentSchoolReportModal", false);
    setGlobalState("deleteResidentSchoolTimetableModal", false);
    setGlobalState("deleteResidentMedicalConditionModal", false);
    setGlobalState("deleteResidentMedicationModal", false);
    setGlobalState("deleteResidentAppointmentModal", false);
    setGlobalState("deleteResidentSocialWorkerModal", false);
    setGlobalState("deleteResidentReferralModal", false);
    setGlobalState("deleteBoroughModal", false);
    setGlobalState("deleteSocialWorkerModal", false);
    setGlobalState("deleteResidentVisitorModal", false);
    setGlobalState("deleteComplaintModal", false);
    setGlobalState("deleteResidentRequestModal", false);
    setGlobalState("deleteResidentIncidentModal", false);
    setGlobalState("deleteResidentMisperModal", false);
  };

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
