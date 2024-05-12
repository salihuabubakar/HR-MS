import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import "./style.css";
import { useHouseDocumentFetching } from "../../utils/employeeCustomFetchHook";
import { RadioBtn } from "./styles";
import { customSelectStyles } from "../../utils/reactSelectCustomeStyle";
import Select from "react-select";

const AddHouseBills = ({ dispatchBill, billIndexToEdit, house, id }) => {
  const { houseDocumentsData, isHouseDocumentsLoading } = useHouseDocumentFetching();
  const [selectedBill] = useGlobalState("selectedBill");

  const [title, setTitle] = useState(
    selectedBill[billIndexToEdit]?.title || ""
  );

  const [amount, setAmount] = useState(
    selectedBill[billIndexToEdit]?.amount || ""
  );

  const [paid, setPaid] = useState(
    selectedBill[billIndexToEdit]?.paid || false
  );

  const [date, setDate] = useState(
    selectedBill[billIndexToEdit]?.date || ""
  );

  const [documents, setDocuments] = useState(
    selectedBill[billIndexToEdit]?.documents || []
  );

  const [titleError, setTitleError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [dateError, setDateError] = useState("");
  const [documentsError, setDocumentsError] = useState("");

  // const formData = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      setTitleError("Title is required.");
      return;
    }
    if (amount === "") {
      setAmountError("Amount is required.");
      return;
    }
    if (date === "") {
      setDateError("Date is required.");
      return;
    }
    if (documents?.length === 0) {
      setDocumentsError("Document is required.");
      return;
    }

    // Clear any existing error messages
    setTitleError("");
    setAmountError("");
    setDateError("");
    setDocumentsError("");

    const fields = {
      id,
      title,
      house,
      date,
      amount,
      paid,
      documents,
    };

    if (selectedBill[billIndexToEdit]?.id) {
      dispatchBill({ type: "update", payload: fields });
    } else {
      dispatchBill({ type: "add", payload: fields });
    }
    setGlobalState("showBillModal", false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleError("");
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountError("");
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setDateError("");
  };

  /* The code is creating an array called `document` and populating it with objects that have `title`
  and `id` properties. It is iterating over the `houseDocumentsData` array using the `map` function
  and for each element, it pushes an object with the `title` and `id` properties into the `document`
  array. */
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
    // Returns a list of documents that should be analyzed for the given bill. This is a helper function to make it easier to check if there is at least one bill selected
    const val = selectedBill[billIndexToEdit]?.documents;
    if (!selectedBill || !val) {
      return [];
    }
    // Returns the data for house documents that should be included in the response. House documents are identified by their ID
    return houseDocumentsData
      .filter((document) => val.includes(document.id))
      .map((document) => ({
        id: document.id,
        title: document.title,
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
                    {selectedBill[billIndexToEdit]?.id ? "Edit Bill" : "Add Bill"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showBillModal", false)}
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
                          {titleError && <p className="error-message">{titleError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            value={amount}
                            onChange={handleAmountChange}
                            className="form-control floating"
                            type="text"
                            placeholder="Amount"
                          />
                          {amountError && <p className="error-message">{amountError}</p>}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            Date <span className="text-danger">*</span>
                          </label>
                          <input
                            value={date}
                            onChange={handleDateChange}
                            className="form-control floating"
                            type="date"
                            placeholder="Date"
                          />
                          {dateError && <p className="error-message">{dateError}</p>}
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
                            isLoading={isHouseDocumentsLoading}
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
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="col-form-label">Paid</label>
                          <RadioBtn>
                            <input
                              type="checkbox"
                              name="paid"
                              checked={paid}
                              id="paid"
                              placeholder="Paid"
                              onChange={(e) => setPaid(e.target.checked)}
                            />
                            <label htmlFor="paid">
                              <span>Paid</span>
                            </label>
                          </RadioBtn>
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button type="submit" className="btn btn-primary submit-btn">
                        {selectedBill[billIndexToEdit]?.id ? "Update" : "Save"}
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

export default AddHouseBills;
