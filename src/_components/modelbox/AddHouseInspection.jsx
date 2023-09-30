import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import "./style.css";
import {
  useHouseDocumentFetching,
  useHouseItemsFetching
} from "../../utils/employeeCustomFetchHook";
import Select from "react-select";
import { isMobile } from "../../utils/mediaQuery";

const AddHouseInspection = ({ dispatchInspection, inspectionIndexToEdit, house, id }) => {
  const { houseDocumentsData } = useHouseDocumentFetching();
  const { houseItemData } = useHouseItemsFetching()
  const [selectedInspection] = useGlobalState("selectedInspection");

  const inspectionID = selectedInspection[inspectionIndexToEdit]?.id;

  const [inspection_status, setInspectionStatus] = useState(
    selectedInspection[inspectionIndexToEdit]?.inspection_status || ""
  );

  const [house_item, setHouseItem] = useState(
    selectedInspection[inspectionIndexToEdit]?.house_item || ""
  );


  const [inspection_date, setInspectionDate] = useState(
    selectedInspection[inspectionIndexToEdit]?.inspection_date || null
  );

const [inspected_by, setInspectedBy] = useState(
  selectedInspection[inspectionIndexToEdit]?.inspected_by || ""
);

  const [documents, setDocuments] = useState(
    selectedInspection[inspectionIndexToEdit]?.documents || []
  );


  const [comments, setComments] = useState(
    selectedInspection[inspectionIndexToEdit]?.comments || ""
  );

  const [inspectionStatusError, setInspectionStatusError] = useState("");
  const [documentsError, setDocumentsError] = useState("");

  // const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inspection_status === "") {
      setInspectionStatusError("Inspection Status is required.");
      return;
    }
    if (documents?.length === 0) {
      setDocumentsError("Document is required.");
      return;
    }

    // Clear any existing error messages
    setInspectionStatusError("");
    setDocumentsError("");

    const fields = {
      id,
      house,
      inspection_status,
      inspected_by,
      inspection_date,
      house_item,
      documents,
      comments,
    };

    if (inspectionID && inspectionID) {
      dispatchInspection({ type: "update", payload: fields });
    } else {
      dispatchInspection({ type: "add", payload: fields });
    }
    setGlobalState("showInspectionModal", false);
  };

  const customSelectStyles = {
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: state.isSelected && "#FF9B44",
      color: state.isSelected && "#262626",
      "&:hover": {
        backgroundColor: "#FF9B44",
        color: "#262626",
      },
    }),
  };

  const handleStatusChange = (e) => {
    setInspectionStatus(e.target.value);
    setInspectionStatusError("");
  };

  const handleCommentChange = (e) => {
    setComments(e.target.value);
  };

  const document = [];
  houseDocumentsData?.map((doc) => {
    document.push({
      title: doc.title,
      id: doc.id,
    });
  });

  const handleHouseDocuments = (event) => {
    const mappedID = event?.map((resID) => resID.id);
    setDocuments(mappedID);
    setDocumentsError("");
  };

  const getHouseDocumentDefaultValues = () => {
    const val = selectedInspection[inspectionIndexToEdit]?.documents;
    if (!selectedInspection || !val) {
      return [];
    }
    return houseDocumentsData
      .filter((document) => val.includes(document.id))
      .map((document) => ({
        id: document.id,
        title: document.title,
      }));
  };

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer top={ isMobile() && true} className="custom-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedInspection[inspectionIndexToEdit]?.id
                      ? "Edit Inspection"
                      : "Add Inspection"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showInspectionModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Inspection Status <span className="text-danger">*</span>
                          </label>
                          <select
                            value={inspection_status}
                            onChange={handleStatusChange}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              Select Inspection Status
                            </option>
                            <option value="Good">Good</option>
                            <option value="Bad">Bad</option>
                            <option value="Needs Repaire">Needs Repaire</option>
                            <option value="Needs Replacement">Needs Replacement</option>
                          </select>
                          {inspectionStatusError && (
                            <p className="error-message">{inspectionStatusError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">House Item</label>
                          <select
                            value={house_item}
                            onChange={(e) => setHouseItem(e.target.value)}
                            className="form-control floating"
                          >
                            <option disabled value="">
                              House Item
                            </option>
                            {houseItemData?.map((item) => (
                              <option key={item.id} value={item.id}>
                                {`${item.name}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Inspected By</label>
                          <input
                            value={inspected_by}
                            onChange={(e) => setInspectedBy(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Inspected By"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Inspection Date</label>
                          <input
                            value={inspection_date}
                            onChange={(e) => setInspectionDate(e.target.value)}
                            className="form-control floating"
                            type="date"
                            placeholder="Inspection Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Select Document <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={getHouseDocumentDefaultValues()}
                            onChange={handleHouseDocuments}
                            isMulti
                            closeMenuOnSelect={false}
                            options={document}
                            styles={customSelectStyles}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) => option.title}
                            placeholder="Select Multiple Document"
                          />
                          {documentsError && <p className="error-message">{documentsError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">Comment</label>
                          <textarea
                            className="form-control floating"
                            name="comment"
                            placeholder="Comment"
                            value={comments}
                            onChange={handleCommentChange}
                            style={{ height: "70px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button type="submit" className="btn btn-primary submit-btn">
                        {selectedInspection[inspectionIndexToEdit]?.id ? "Update" : "Save"}
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

export default AddHouseInspection;
