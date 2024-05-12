import React, { useState } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import {
  useHouseFetching,
  useResidentDocumentFetching
} from "../../utils/employeeCustomFetchHook";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import Select from "react-select";
import { customSelectStyles } from "../../utils/reactSelectCustomeStyle";

const AddComplaint = ({
  indexToEdit,
  id,
  dispatchComplaint,
}) => {
  const [selectedComplaint] = useGlobalState("selectedComplaint");
  const { residentDocumentData, isResidentDocumentLoading } = useResidentDocumentFetching();
  const { houseData } = useHouseFetching();

  const [title, setTitle] = useState(
    selectedComplaint[indexToEdit]?.title || ""
  );


  const [status, setStatus] = useState(
    selectedComplaint[indexToEdit]?.status || ""
  );

  const [complaint_date, setComplaintDate] = useState(
    selectedComplaint[indexToEdit]?.complaint_date || null
  );

  const [resolved_date, setResolvedDate] = useState(
    selectedComplaint[indexToEdit]?.resolved_date || null
  );

  const [resolved_comment, setResolvedComment] = useState(
    selectedComplaint[indexToEdit]?.resolved_comment || ""
  );
  const [resolved_by, setResolvedBy] = useState(
    selectedComplaint[indexToEdit]?.resolved_by || ""
  );

  const [house, setHouse] = useState(
    selectedComplaint[indexToEdit]?.house || ""
  );

  const [documents, setDocument] = useState(
    selectedComplaint[indexToEdit]?.documents || []
  );

  const [description, setDescription] = useState(
    selectedComplaint[indexToEdit]?.description || ""
  );


  const [titleError, setTitleError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [documentError, setDocumentError] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();

    if(title === "") {
      setTitleError("Title is required");
      return;
    }

    if (status == "") {
      setStatusError("Status is required");
      return;
    }

    if(documents?.length === 0) {
      setDocumentError("Document is required");
      return;
    }

    setTitleError("");
    setStatusError("");
    setDocumentError("");


    const complaintObject = {
      id,
      title,
      resolved_date,
      complaint_date,
      resolved_comment,
      status,
      documents,
      house,
      description
    };


    if (selectedComplaint[indexToEdit]?.id) {
      dispatchComplaint({
        type: "update",
        payload: complaintObject,
      });
    } else {
      dispatchComplaint({ type: "add", payload: complaintObject });
    }
    setGlobalState("showComplaintModal", false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleError("");
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setStatusError("");
  }

  /* The code is creating an array called `document` and populating it with objects that have two
  properties: `document_name` and `id`. It is using the `map` function to iterate over the
  `residentDocumentData` array and for each element, it is pushing a new object with the
  `document_name` and `id` properties into the `document` array. */
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
    setDocumentError("");
  };

  /**
   * The function `getDocumentDefaultValues` returns an array of document objects based on the selected
   * complaint and its associated documents.
   * @returns The function `getDocumentDefaultValues` returns an array of objects with properties `id`
   * and `document_name`.
   */
  const getDocumentDefaultValues = () => {
    /* The below code is checking if the `selectedComplaint` object exists and if the `documents`
    property at the specified `indexToEdit` exists within the `selectedComplaint` object. If either
    of these conditions is not met, it returns an empty array. */
    const val = selectedComplaint[indexToEdit]?.documents;
    if (!selectedComplaint || !val) {
      return [];
    }
    /* The below code is filtering an array of `residentDocumentData` objects based on whether their
    `id` property is included in the `val` array. It then maps the filtered objects to a new array
    of objects with only the `id` and `document_name` properties. */
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
                    {selectedComplaint[indexToEdit]?.id ? "Edit Complaint" : "Add Complaint"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showComplaintModal", false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Title</label>{" "}
                          <span className="text-danger">*</span>
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
                          <label className="col-form-label">
                            Complaint Date
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={complaint_date}
                            onChange={(e) => setComplaintDate(e.target.value)}
                            className="form-control floating"
                            type="date"
                            placeholder="Complaint"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Resolved Date
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            value={resolved_date}
                            onChange={(e) => setResolvedDate(e.target.value)}
                            className="form-control floating"
                            type="date"
                            placeholder="Resolved Date"
                          />
                        </div>
                      </div>
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
                            <option value="Pending">Pending</option>
                            <option value="Resolved">Resolved</option>
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
                          {documentError && <p className="error-message">{documentError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">Resolved Comment</label>
                          <textarea
                            value={resolved_comment}
                            onChange={(e) => setResolvedComment(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Resolved Comment"
                            style={{ height: "90px" }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="col-form-label">Description</label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control floating"
                            type="text"
                            placeholder="Description"
                            style={{ height: "90px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button type="submit" className="btn btn-primary submit-btn">
                        {selectedComplaint[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddComplaint;
