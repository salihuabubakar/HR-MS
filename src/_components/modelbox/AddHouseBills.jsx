import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
} from "./Addemployee.style";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import "./style.css";
import Dropzone from "react-dropzone";
import { useHouseDocumentFetching } from "../../utils/employeeCustomFetchHook";
import { MenuItem, Autocomplete, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const AddHouseBills = ({ dispatchBill, billIndexToEdit, house, id }) => {
  const { houseDocumentsData } = useHouseDocumentFetching();
  const [selectedBill] = useGlobalState("selectedBill");

  const [title, setTitle] = useState(
    selectedBill[billIndexToEdit]?.title
      ? selectedBill[billIndexToEdit]?.title
      : ""
  );

  const [amount, setAmount] = useState(
    selectedBill[billIndexToEdit]?.amount
      ? selectedBill[billIndexToEdit]?.amount
      : ""
  );

  const [paid, setPaid] = useState(
    selectedBill[billIndexToEdit]?.paid
      ? selectedBill[billIndexToEdit]?.paid
      : false
  );

  const [date, setDate] = useState(
    selectedBill[billIndexToEdit]?.date
      ? selectedBill[billIndexToEdit]?.date
      : ""
  );

  const [documents, setDocuments] = useState(
    selectedBill[billIndexToEdit]?.documents
      ? selectedBill[billIndexToEdit]?.documents
      : []
  );

  useEffect(() => {
    console.log("room_photos", documents);
  }, []);

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
      return document.map((doc) => ({
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
                    {selectedBill[billIndexToEdit]?.id
                      ? "Edit Bill"
                      : "Add Bill"}
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
                          {titleError && (
                            <p className="error-message">{titleError}</p>
                          )}
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
                          {amountError && (
                            <p className="error-message">{amountError}</p>
                          )}
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
                          {dateError && (
                            <p className="error-message">{dateError}</p>
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
                              selectedBill[billIndexToEdit]?.documents
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
                                label="Select Multiple Names"
                                placeholder="Photo Names"
                              />
                            )}
                          />
                          {documentsError && (
                            <p className="error-message">{documentsError}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">Paid</label>
                          <input
                            checked={paid}
                            onChange={(e) => setPaid(e.target.checked)}
                            // className="form-control floating"
                            type="checkbox"
                            placeholder="Paid"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
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
