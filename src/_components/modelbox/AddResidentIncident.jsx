import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import {
  useResidentFetching,
  useHouseFetching,
  useResidentDocumentFetching,
} from "../../utils/employeeCustomFetchHook";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import Select from "react-select";
import { customSelectStyles } from "../../utils/reactSelectCustomeStyle";

const AddResidentIncident = ({
  indexToEdit,
  id,
  dispatchResidentIncident,
}) => {
  const [selectedResidentIncident] = useGlobalState("selectedResidentIncident");
  const { residentData } = useResidentFetching();
  const { houseData } = useHouseFetching();
  const { residentDocumentData, isResidentDocumentLoading } = useResidentDocumentFetching();


  const [date_time, setDateTime] = useState(
    selectedResidentIncident[indexToEdit]?.date_time || ""
  );

  const [description, setDescription] = useState(
    selectedResidentIncident[indexToEdit]?.description || ""
  );


  const [house, setHouse] = useState(
    selectedResidentIncident[indexToEdit]?.house || ""
  );

  const [resident, setResident] = useState(
    selectedResidentIncident[indexToEdit]?.resident || ""
  );

  const [documents, setDocument] = useState(
    selectedResidentIncident[indexToEdit]?.documents || []
  );

  const [dateTimeError, setDateTimeError] = useState("");
  const [descriptionError, setDescriptionError] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
    if(date_time === "") {
      setDateTimeError("Date & Time is required");
      return;
    }
    if(description === "") {
      setDescriptionError("Description is required");
      return;
    }

    setDateTimeError("");
    setDescriptionError("");

    const visitorObject = {
      id: id,
      date_time,
      description,
      documents,
      house,
      resident
    };


    if (selectedResidentIncident[indexToEdit]?.id) {
      dispatchResidentIncident({
        type: "update",
        payload: visitorObject,
      });
    } else {
      dispatchResidentIncident({ type: "add", payload: visitorObject });
    }
    setGlobalState("showResidentIncidentModal", false);
  };

  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
    setDateTimeError("");
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
    const val = selectedResidentIncident[indexToEdit]?.documents;
    if (!selectedResidentIncident || !val) {
      return [];
    }
    return residentDocumentData
      .filter((document) => val.includes(document.id))
      .map((document) => ({
        id: document.id,
        document_name: document.document_name,
      }));
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
                    {selectedResidentIncident[indexToEdit]?.id ? "Edit Incident" : "Add Incident"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showResidentIncidentModal", false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Date & Time</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            value={date_time}
                            onChange={handleDateTimeChange}
                            className="form-control floating"
                            type="datetime-local"
                            placeholder="Visit Date"
                          />
                          {dateTimeError && <p className="error-message">{dateTimeError}</p>}
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
                            value={resident}
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
                            isLoading={isResidentDocumentLoading}
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
                          {descriptionError && <p className="error-message">{descriptionError}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button type="submit" className="btn btn-primary submit-btn">
                        {selectedResidentIncident[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddResidentIncident;
