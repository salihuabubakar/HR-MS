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
  useHouseResidentFetching,
  useResidentFetching
} from "../../utils/employeeCustomFetchHook";
import Select from "react-select";
import { isMobile } from "../../utils/mediaQuery";

const AddHouseNotice = ({ dispatchNotice, noticeIndexToEdit, house, id }) => {
  const { houseDocumentsData } = useHouseDocumentFetching();
  const { houseResidentData } = useHouseResidentFetching();
  const { residentData } = useResidentFetching()
  const [selectedNotice] = useGlobalState("selectedNotice");

  const [title, setTitle] = useState(
    selectedNotice[noticeIndexToEdit]?.title || ""
  );

  const [notice_date, setNoticeDate] = useState(
    selectedNotice[noticeIndexToEdit]?.notice_date || null
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
      notice_date,
      title,
      residents_applicable,
      documents,
      description,
    };

    if (selectedNotice[noticeIndexToEdit]?.id) {
      dispatchNotice({ type: "update", payload: fields });
    } else {
      dispatchNotice({ type: "add", payload: fields });
    }
    setGlobalState("showNoticeModal", false);
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

  const handleResidentChange = (event) => {
    const mappedID = event?.map((resID) => resID.id);
    setResidentApplicable(mappedID);
    setResidentApplicableError("");
  };

  const getHouseResidentDefaultValues = () => {
    const val = selectedNotice[noticeIndexToEdit]?.residents_applicable;
    if (!selectedNotice || !val) {
      return [];
    }
    return residentData
      .filter((resident) => val.includes(resident.id))
      .map((resident) => ({
        id: resident.id,
        first_name: resident.first_name,
        middle_name: resident.middle_name,
        last_name: resident.last_name,
      }));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
    const val = selectedNotice[noticeIndexToEdit]?.documents;
    if (!selectedNotice || !val) {
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
                    {selectedNotice[noticeIndexToEdit]?.id ? "Edit Notice" : "Add Notice"}
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
                          <label className="col-form-label">
                            Title <span className="text-danger">*</span>
                          </label>
                          <input
                            value={title}
                            onChange={handleTitleChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Title"
                          />
                          {titleError && <p className="error-message">{titleError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Notice Date</label>
                          <input
                            value={notice_date}
                            onChange={handleDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Notice Date"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Resident Applicable <span className="text-danger">*</span>
                          </label>
                          <Select
                            defaultValue={getHouseResidentDefaultValues()}
                            onChange={handleResidentChange}
                            isMulti
                            closeMenuOnSelect={false}
                            options={resident}
                            styles={customSelectStyles}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) =>
                              option.first_name + " " + option.middle_name + " " + option.last_name
                            }
                            placeholder="Select Multiple Resident"
                          />
                          {residentsApplicableError && (
                            <p className="error-message">{residentsApplicableError}</p>
                          )}
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
                          <label className="col-form-label">Description</label>
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
                      <button type="submit" className="btn btn-primary submit-btn">
                        {selectedNotice[noticeIndexToEdit]?.id ? "Update" : "Save"}
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
