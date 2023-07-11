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
import { MenuItem, Autocomplete, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const AddHouseInspection = ({ dispatchInspection, inspectionIndexToEdit, house, id }) => {
  const { houseDocumentsData } = useHouseDocumentFetching();
  const { houseItemData } = useHouseItemsFetching()
  const [selectedInspection] = useGlobalState("selectedInspection");

  const [inspection_status, setInspectionStatus] = useState(
    selectedInspection[inspectionIndexToEdit]?.inspection_status || ""
  );

  const [house_item, setHouseItem] = useState(
    selectedInspection[inspectionIndexToEdit]?.house_item || ""
  );


  const [inspection_date, setInspectionDate] = useState(
    selectedInspection[inspectionIndexToEdit]?.inspection_date || ""
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

    if (selectedInspection[inspectionIndexToEdit]?.id) {
      dispatchInspection({ type: "update", payload: fields });
    } else {
      dispatchInspection({ type: "add", payload: fields });
    }
    setGlobalState("showInspectionModal", false);
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
      name: doc.title,
      id: doc.id,
    });
  });

  const handleHouseDocuments = (event, value) => {
    const list = value?.map((v) => v.id);
    setDocuments(list);
    setDocumentsError("");
  };

  const getHouseDocumentDefaultValues = (document) => {
    if (Array.isArray(document)) {
      return document?.map((doc) => ({
        id: doc.id,
      }));
    }
    return [];
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
                          <label className="label">
                            Inspection Status{" "}
                            <span className="text-danger">*</span>
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
                            <option value="Needs Replacement">
                              Needs Replacement
                            </option>
                          </select>
                          {inspectionStatusError && (
                            <p className="error-message">
                              {inspectionStatusError}
                            </p>
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
                          <label className="label">Inspected By</label>
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
                          <label className="col-form-label">
                            Inspection Date
                          </label>
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
                          <label className="label">Document</label> {""}
                          <span className="text-danger">*</span>
                          <Autocomplete
                            sx={{
                              m: 1,
                              width: 350,
                              // "& .MuiInputBase-root": {
                              //   height: "45px", // Adjust the height here
                              // },
                            }}
                            multiple
                            id="tags-standard"
                            options={document}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            defaultValue={getHouseDocumentDefaultValues(
                              selectedInspection[inspectionIndexToEdit]
                                ?.documents
                            )}
                            onChange={(event, value) =>
                              handleHouseDocuments(event, value)
                            }
                            disableCloseOnSelect
                            renderOption={(props, option, { selected }) => (
                              <MenuItem
                                key={option.id}
                                value={option.id}
                                sx={{ justifyContent: "space-between" }}
                                {...props}
                              >
                                {option.name}
                                {selected ? <CheckIcon color="info" /> : null}
                              </MenuItem>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Select Multiple Document"
                                placeholder="Photo Names"
                              />
                            )}
                          />
                          {documentsError && (
                            <p className="error-message">{documentsError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="label">Comment</label>
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
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        {selectedInspection[inspectionIndexToEdit]?.id
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

export default AddHouseInspection;
