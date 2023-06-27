import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import "./style.css";
import Dropzone from "react-dropzone";
import {
  useHouseDocumentFetching,
  useHouseResidentFetching,
  useResidentFetching
} from "../../utils/employeeCustomFetchHook";
import { MenuItem, Autocomplete, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";

const AddHouseNotice = ({ dispatchNotice, noticeIndexToEdit, house, id }) => {
  const { houseDocumentsData } = useHouseDocumentFetching();
  const { houseResidentData } = useHouseResidentFetching();
  const { residentData } = useResidentFetching()
  const [selectedNotice] = useGlobalState("selectedNotice");

  const [title, setTitle] = useState(
    selectedNotice[noticeIndexToEdit]?.title || ""
  );

  const [noticeDate, setNoticeDate] = useState(
    selectedNotice[noticeIndexToEdit]?.noticeDate || ""
  );

  const [residents_applicable, setResidentApplicable] = useState(
    selectedNotice[noticeIndexToEdit]?.residents_applicable || []
  );


  const [documents, setDocuments] = useState(
    selectedNotice[noticeIndexToEdit]?.documents || []
  );


  const [description, setDescription] = useState(
    selectedNotice[noticeIndexToEdit]?.description || ""
  );

  const [titleError, setTitleError] = useState("");
  const [residentsApplicableError, setResidentApplicableError] = useState("");
  const [documentsError, setDocumentsError] = useState("");

  // const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      setTitleError("Title is required.");
      return;
    }
    if (residents_applicable?.length === 0) {
      setResidentApplicableError("Resident is required.");
      return;
    }
    if (documents?.length === 0) {
      setDocumentsError("Document is required.");
      return;
    }

    // Clear any existing error messages
    setTitleError("");
    setResidentApplicableError("");
    setDocumentsError("");

    const fields = {
      id,
      house,
      noticeDate,
      title,
      residents_applicable,
      documents,
      description,
    };

    if (selectedNotice[noticeIndexToEdit]?.id) {
      dispatchNotice({ type: "update", payload: fields });
      toast.success("House Notice Updated", {
        autoClose: 1500,
      });
    } else {
      dispatchNotice({ type: "add", payload: fields });
      toast.success("House Notice Updated", {
        autoClose: 1500,
      });
    }
    setGlobalState("showNoticeModal", false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleError("");
  };

  const handleDateChange = (e) => {
    setNoticeDate(e.target.value);
  };

  const resident = [];
  residentData?.map((res) => {
    resident.push({
      id: res.id,
      first_name: res.first_name,
      middle_name: res.middle_name,
      last_name: res.last_name
    });
  });

  const handleBeforeImageChange = (e, value) => {
    const list = value?.map((v) => v.id);
    setResidentApplicable(list);
    setResidentApplicableError("");
  };

  const getHouseResidentDefaultValues = (res) => {
    if (Array.isArray(res)) {
      return res?.map((res) => ({
        id: res.id,
      }));
    }
    return [];
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
                    {selectedNotice[noticeIndexToEdit]?.id
                      ? "Edit Notice"
                      : "Add Notice"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showNoticeModal", false)}
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
                            Title <span className="text-danger">*</span>
                          </label>
                          <input
                            value={title}
                            onChange={handleTitleChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Title"
                          />
                          {titleError && (
                            <p className="error-message">{titleError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Notice Date</label>
                          <input
                            value={noticeDate}
                            onChange={handleDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Notice Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Resident Applicable</label>{" "}
                          {""}
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
                            options={resident}
                            getOptionLabel={(option) =>
                              `${option.first_name} ${option.middle_name} ${option.last_name}`
                            }
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            defaultValue={getHouseResidentDefaultValues(
                              selectedNotice[noticeIndexToEdit]
                                ?.residents_applicable
                            )}
                            onChange={(event, value) =>
                              handleBeforeImageChange(event, value)
                            }
                            disableCloseOnSelect
                            renderOption={(props, option, { selected }) => (
                              <MenuItem
                                key={option.id}
                                value={option.id}
                                sx={{ justifyContent: "space-between" }}
                                {...props}
                              >
                                {`${option.first_name} ${option.middle_name} ${option.last_name}`}
                                {selected ? <CheckIcon color="info" /> : null}
                              </MenuItem>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Select Multiple Resident"
                                placeholder="Resident Applicable"
                              />
                            )}
                          />
                          {residentsApplicableError && (
                            <p className="error-message">
                              {residentsApplicableError}
                            </p>
                          )}
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
                              selectedNotice[noticeIndexToEdit]?.documents
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
                          <label className="label">Description</label>
                          <textarea
                            className="form-control floating"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={handleDescriptionChange}
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
                        {selectedNotice[noticeIndexToEdit]?.id
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

export default AddHouseNotice;
