import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { useSocialWorkerFetching } from "../../utils/employeeCustomFetchHook";

const AddResidentSocialWorkerModal = ({
  residentSocialWorkerIndexToEdit,
  id,
  dispatchResidentSocialWorker,
  resident,
}) => {

  const { socialWorkerData } = useSocialWorkerFetching();

  const [selectedResidentSocialWorker] = useGlobalState(
    "selectedResidentSocialWorker"
  );

  const [social_worker, setSocialWorker] = useState(
    selectedResidentSocialWorker[residentSocialWorkerIndexToEdit]
      ?.social_worker || ""
  );

  const [start_date, setStartDate] = useState(
    selectedResidentSocialWorker[residentSocialWorkerIndexToEdit]?.start_date ||
      ""
  );

  const [end_date, setEndDate] = useState(
    selectedResidentSocialWorker[residentSocialWorkerIndexToEdit]?.end_date ||
      ""
  );

  const [status, setStatus] = useState(
    selectedResidentSocialWorker[residentSocialWorkerIndexToEdit]?.status || ""
  );

  const [description, setDescription] = useState(
    selectedResidentSocialWorker[residentSocialWorkerIndexToEdit]
      ?.description || ""
  );


  const [socialWorkerError, setSocialWorkerError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (social_worker === "") {
      setSocialWorkerError("Social worker is required");
      return;
    }

    setSocialWorkerError("");

    const appObj = {
      id,
      resident,
      social_worker,
      status,
      start_date,
      end_date,
      description,
    };


    if (
      selectedResidentSocialWorker[residentSocialWorkerIndexToEdit]?.id
    ) {
      dispatchResidentSocialWorker({
        type: "update",
        payload: appObj,
      });
    } else {
      dispatchResidentSocialWorker({ type: "add", payload: appObj });
    }
    setGlobalState("showResidentSocialWorkerModal", false);
  };

  const handleSocialWOrkerChange = (e) => {
    setSocialWorker(e.target.value);
    setSocialWorkerError("");
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
                  <h5 className="modal-title">
                    {selectedResidentSocialWorker[
                      residentSocialWorkerIndexToEdit
                    ]?.id
                      ? "Edit Resident Social worker"
                      : "Add Resident Social worker"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() =>
                      setGlobalState("showResidentSocialWorkerModal", false)
                    }
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Social Worker <span className="text-danger">*</span>
                          </label>
                          <select
                            value={social_worker}
                            onChange={handleSocialWOrkerChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Social Worker
                            </option>
                            {socialWorkerData?.map((org) => (
                              <option key={org.id} value={org.id}>
                                {`${org.first_name} ${org.middle_name} ${org.last_name}`}
                              </option>
                            ))}
                          </select>
                          {socialWorkerError && (
                            <p className="error-message">{socialWorkerError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Status</label>
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Status
                            </option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Start Date</label>
                          <input
                            value={start_date}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="form-control floating"
                            type="date"
                            placeholder="Start Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">End Date</label>
                          <input
                            value={end_date}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="form-control floating"
                            type="date"
                            placeholder="End Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Description</label>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ height: "70px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedResidentSocialWorker[
                          residentSocialWorkerIndexToEdit
                        ]?.id
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

export default AddResidentSocialWorkerModal;
