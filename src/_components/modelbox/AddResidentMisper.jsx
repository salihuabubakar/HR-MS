import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import {
  useHouseFetching,
  useResidentDocumentFetching,
  useResidentFetching
} from "../../utils/employeeCustomFetchHook";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import Select from "react-select";

const AddResidentMisper = ({
  indexToEdit,
  id,
  dispatchResidentMisper,
}) => {
  const [selectedResidentMisper] = useGlobalState("selectedResidentMisper");
  const { residentDocumentData } = useResidentDocumentFetching();
  const { houseData } = useHouseFetching();
  const { residentData } = useResidentFetching();

  const [date_last_seen, setDateLastSeen] = useState(
    selectedResidentMisper[indexToEdit]?.date_last_seen || ""
  );

  const [time_last_seen, setTimeLastSeen] = useState(
    selectedResidentMisper[indexToEdit]?.time_last_seen || ""
  );

  const [police_CAD, setPoliceCAD] = useState(
    selectedResidentMisper[indexToEdit]?.police_CAD || ""
  );

  const [police_CAD_closed, setPoliceCADclose] = useState(
    selectedResidentMisper[indexToEdit]?.police_CAD_closed || ""
  );

  const [edt_reference, setEdtRef] = useState(
    selectedResidentMisper[indexToEdit]?.edt_reference || ""
  );

  const [edt_reference_closed, setEdtRefClose] = useState(
    selectedResidentMisper[indexToEdit]?.edt_reference_closed || ""
  );

  const [date_returned, setDateReturned] = useState(
    selectedResidentMisper[indexToEdit]?.date_returned || ""
  );

  const [time_returned, setTimeReturned] = useState(
    selectedResidentMisper[indexToEdit]?.time_returned || ""
  );

  const [status, setStatus] = useState(
    selectedResidentMisper[indexToEdit]?.status || ""
  );


  const [house, setHouse] = useState(
    selectedResidentMisper[indexToEdit]?.house || ""
  );
  
  const [resident, setResident] = useState(
    selectedResidentMisper[indexToEdit]?.resident || ""
  );

  const [documents, setDocument] = useState(
    selectedResidentMisper[indexToEdit]?.documents || []
  );

  const [Reported_to, setReportTo] = useState(
    selectedResidentMisper[indexToEdit]?.Reported_to || []
  );

  const [description, setDescription] = useState(
    selectedResidentMisper[indexToEdit]?.description || ""
  );


  const [statusError, setStatusError] = useState("");
  const [descrptionError, setDescriptionError] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();

    if (status == "") {
      setStatusError("Status is required");
      return;
    }

    if(description === "") {
      setDescriptionError("Description is required");
      return;
    }

    setStatusError("");
    setDescriptionError("");


    const misperObject = {
      id,
      police_CAD,
      police_CAD_closed,
      time_last_seen,
      date_last_seen,
      status,
      documents,
      house,
      resident,
      description,
      Reported_to,
      edt_reference,
      edt_reference_closed,
      date_returned,
      time_returned,
    };


    if (selectedResidentMisper[indexToEdit]?.id) {
      dispatchResidentMisper({
        type: "update",
        payload: misperObject,
      });
    } else {
      dispatchResidentMisper({ type: "add", payload: misperObject });
    }
    setGlobalState("showResidentMisperModal", false);
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
    setStatus(e.target.value);
    setStatusError("");
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");
  }

  const document = [];
  residentDocumentData?.map((doc) => {
    document.push({
      document_name: doc.document_name,
      id: doc.id,
    });
  });

  const handleDocumentChange = (event) => {
    const mappedID = event?.map((resID) => resID.id);
    setDocument(mappedID);
  };

  const getDocumentDefaultValues = (document) => {
    const val = selectedResidentMisper[indexToEdit]?.documents;
    if (!selectedResidentMisper || !val) {
      return [];
    }
    return residentDocumentData
      .filter((document) => val.includes(document.id))
      .map((document) => ({
        id: document.id,
        document_name: document.document_name,
      }));
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const [isDarkMode] = useGlobalState("isDarkMode");

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer isDarkMode={isDarkMode} className="custom-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="card-title">
                    {selectedResidentMisper[indexToEdit]?.id ? "Edit Misper" : "Add Misper"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showResidentMisperModal", false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    {currentPage === 1 && (
                      <div className='row'>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Last seen Date</label>{" "}
                            <span className="text-danger">*</span>
                            <input
                              value={date_last_seen}
                              onChange={(e) => setDateLastSeen(e.target.value)}
                              className="form-control floating"
                              type="date"
                              placeholder="Last seen Date"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Time last Seen</label>{" "}
                            <span className="text-danger">*</span>
                            <input
                              value={time_last_seen}
                              onChange={(e) => setTimeLastSeen(e.target.value)}
                              className="form-control floating"
                              type="time"
                              placeholder="Time last Seen"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Police CAD</label>
                            <input
                              value={police_CAD}
                              onChange={(e) => setPoliceCAD(e.target.value)}
                              className="form-control floating"
                              type="text"
                              placeholder="Police CAD"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Police CAD Closed</label>
                            <input
                              value={police_CAD_closed}
                              onChange={(e) => setPoliceCADclose(e.target.value)}
                              className="form-control floating"
                              type="text"
                              placeholder="Police CAD Closed"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">EDT Reference</label>
                            <input
                              value={edt_reference}
                              onChange={(e) => setEdtRef(e.target.value)}
                              className="form-control floating"
                              type="text"
                              placeholder="EDT Reference"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">EDT Reference Closed</label>
                            <input
                              value={edt_reference_closed}
                              onChange={(e) => setEdtRefClose(e.target.value)}
                              className="form-control floating"
                              type="text"
                              placeholder="EDT Reference Closed"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Date Returned</label>{" "}
                            <span className="text-danger">*</span>
                            <input
                              value={date_returned}
                              onChange={(e) => setDateReturned(e.target.value)}
                              className="form-control floating"
                              type="date"
                              placeholder="Date Returned"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Time Returned</label>{" "}
                            <span className="text-danger">*</span>
                            <input
                              value={time_returned}
                              onChange={(e) => setTimeReturned(e.target.value)}
                              className="form-control floating"
                              type="time"
                              placeholder="Time Returned"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {currentPage === 2 && (
                      <div className='row'>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Status</label>{" "}
                            <span className="text-danger">*</span>
                            <select
                              value={status}
                              onChange={handleStatusChange}
                              className="form-control floating"
                            >
                              <option disabled value="">
                                Select
                              </option>
                              <option value="Open">Open</option>
                              <option value="Closed">Closed</option>
                            </select>
                            {statusError && <p className="error-message">{statusError}</p>}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">House</label>
                            <select
                              value={house}
                              onChange={(e) => setHouse(e.target.value)}
                              className="form-control floating"
                            >
                              <option disabled value="">
                                Select House
                              </option>
                              {houseData?.map((h) => (
                                <option key={h.id} value={h.id}>
                                  {`${h.name}`}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">Resident</label>
                            <select
                              value={house}
                              onChange={(e) => setResident(e.target.value)}
                              className="form-control floating"
                            >
                              <option disabled value="">
                                Select Resident
                              </option>
                              {residentData?.map((r) => (
                                <option key={r.id} value={r.id}>
                                  {`${r.first_name} ${r.middle_name} ${r.last_name}`}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Select Document <span className="text-danger">*</span>
                            </label>
                            <Select
                              defaultValue={getDocumentDefaultValues()}
                              onChange={handleDocumentChange}
                              isMulti
                              closeMenuOnSelect={false}
                              options={document}
                              styles={customSelectStyles}
                              getOptionValue={(option) => option.id}
                              getOptionLabel={(option) => option.document_name}
                              placeholder="Select Multiple Document"
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="col-form-label">Description</label>{" "}
                            <span className="text-danger">*</span>
                            <textarea
                              value={description}
                              onChange={handleDescriptionChange}
                              className="form-control floating"
                              type="text"
                              placeholder="Description"
                              style={{ height: "90px" }}
                            />
                            {descrptionError && <p className="error-message">{descrptionError}</p>}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="submit-section">
                      {/* Pagination controls */}
                      {currentPage > 1 && (
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handlePreviousPage}
                        >
                          Previous
                        </button>
                      )}
                      {currentPage < 2 && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleNextPage}
                        >
                          Next
                        </button>
                      )}
                      {currentPage === 2 && (
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          {selectedResidentMisper[indexToEdit]?.id ? "Update" : "Save"}
                        </button>
                      )}
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

export default AddResidentMisper;
