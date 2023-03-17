import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import Select from "react-select";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const AddShift = ({
  dispatchShift,
  indexToEdit,
}) => {
  const [selectedShiftList] = useGlobalState("selectedShiftList");

  const [title, setTitle] = useState(
    selectedShiftList[indexToEdit]?.title
      ? selectedShiftList[indexToEdit]?.title
      : ""
  );

  const [note, setNote] = useState(
    selectedShiftList[indexToEdit]?.note
      ? selectedShiftList[indexToEdit]?.note
      : ""
  );

  const [startTime, setStartTime] = useState(
    selectedShiftList[indexToEdit]?.startTime
      ? selectedShiftList[indexToEdit]?.startTime
      : dayjs()
  );
  const [endTime, setEndTime] = useState(
    selectedShiftList[indexToEdit]?.endTime
      ? selectedShiftList[indexToEdit]?.endTime
      : dayjs()
  );

  const [id, setId] = useState(
    selectedShiftList[indexToEdit]?.id
      ? selectedShiftList[indexToEdit]?.id
      : Date.now()
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const shiftList = {
      title,
      note,
      startTime,
      endTime,
      id,
    };
    if (selectedShiftList[indexToEdit]?.id) {
      dispatchShift({ type: "update", payload: shiftList });
    } else {
      dispatchShift({ type: "push", payload: shiftList });
    }
    setGlobalState("showModal", false);
  };

  const handleStartTimeChange = (newValue) => {
    let newTime;
    //  const hours = newValue;
    //  let date = new Date(hours).toLocaleString();
    //  date = date.split(" ").splice(1).join(" ");
    //  console.log("date", date);
    //  const minutes = newValue.toString().padStart(2, "0");
    //  const textValue = hours + ":" + minutes;
    //  console.log("dateString", textValue);
    newTime= newValue.$d;
    setStartTime(
      newTime.toString().slice(0, 21) + newTime.toString().slice(24)
    );
  };

  const handleEndTimeChange = (newValue) => {
    let newTime;
    newTime = newValue.$d;
    setEndTime(newTime.toString().slice(0, 21) + newTime.toString().slice(24));
  };

  const handleSelectedDateChange = (newValue) => {
    setSelectedDate(newValue.$d);
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
                  <h5 className="card-title">
                    {selectedShiftList[indexToEdit]?.id
                      ? "Edit Shift"
                      : "Add shift"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setGlobalState("showModal", false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Title <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="label">
                            Note <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            value={note}
                            onChange={(event) => setNote(event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                              label="Start Time"
                              value={startTime}
                              className="time-picker"
                              // value={setSeconds(value, 0)}
                              onChange={handleStartTimeChange}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                              className="time-picker"
                              label="End Time"
                              value={endTime}
                              onChange={handleEndTimeChange}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary submit-btn"
                      >
                        {selectedShiftList[indexToEdit]?.id ? "Update" : "Save"}
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

export default AddShift;
