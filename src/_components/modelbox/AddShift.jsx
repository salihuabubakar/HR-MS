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
    //  const hours = newValue;
    //  let date = new Date(hours).toLocaleString();
    //  date = date.split(" ").splice(1).join(" ");
    //  console.log("date", date);
    //  const minutes = newValue.toString().padStart(2, "0");
    //  const textValue = hours + ":" + minutes;
    //  console.log("dateString", textValue);
    setStartTime(newValue.$d);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue.$d);
  };

  const handleSelectedDateChange = (newValue) => {
    setSelectedDate(newValue.$d);
  };

  return (
    <>
      <PopupWrapper>
        <PopupOverlay />
        <PopupContainer className="custom-modal" role="dialog">
          <Card className="" role="document">
            <div className="card-content">
              <div className="card-header">
                <h5 className="card-title">
                  {selectedShiftList[indexToEdit]?.id
                    ? "Edit Shift"
                    : "Add shift"}
                </h5>
                <div className="btn-container">
                  <button
                    className="closeX"
                    type="button"
                    onClick={() => setGlobalState("showModal", false)}
                  >
                    <span>??</span>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <form>
                  <div className="row-">
                    {/* <div className="col-sm">
                      <div className="">
                        <label className="">
                          Department <span className="">*</span>
                        </label>
                        <select className="">
                          <option value>Select </option>
                          <option value={1}>10'o clock Shift</option>
                          <option value={2}>10:30 shift</option>
                          <option value={3}>Daily Shift </option>
                          <option value={4}>New Shift</option>
                        </select>
                      </div>
                    </div> */}
                    {/* <div className="col-sm">
                      <div className="">
                        <label className="">
                          Employee Name <span className="text-danger">*</span>
                        </label>
                        <select className="">
                          <option value>Select </option>
                          <option value={1}>Richard Miles </option>
                          <option value={2}>John Smith</option>
                          <option value={3}>Mike Litorus </option>
                          <option value={4}>Wilmer Deluna</option>
                        </select>
                      </div>
                    </div> */}
                    {/* <div className="col-sm">
                      <div className="">
                        <label className="">Date</label>
                        <div>
                          <input className="" type="date" />
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="col-sm">
                      <div className="">
                        <label className="">
                          Shifts <span className="">*</span>
                        </label>
                        <select className="">
                          <option value>Select </option>
                          <option value={1}>10'o clock Shift</option>
                          <option value={2}>10:30 shift</option>
                          <option value={3}>Daily Shift </option>
                          <option value={4}>New Shift</option>
                        </select>
                      </div>
                    </div> */}

                    <div className="col-sm space-between">
                      <div className="form-group inputText right">
                        <label className="label">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title"
                          value={title}
                          onChange={(event) => setTitle(event.target.value)}
                        />
                      </div>
                      <div className="form-group inputText">
                        <label className="label">Note</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          value={note}
                          onChange={(event) => setNote(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-sm">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="right">
                          <TimePicker
                            label="Start Time"
                            value={startTime}
                            onChange={handleStartTimeChange}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </div>
                        <div>
                          <TimePicker
                            label="End Time"
                            value={endTime}
                            onChange={handleEndTimeChange}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </div>
                      </LocalizationProvider>
                    </div>

                    {/* <div className="col-sm">
                      <div className="">
                        <label className="">
                          Break Time <span className="text-danger">*</span>
                        </label>
                        <div className="">
                          <input type="time" className="" />
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="col-sm-12">
                      <div className="form-group">
                        <label className="col-form-label">
                          Accept Extra Hours{" "}
                        </label>
                        <div className="custom-control custom-switch">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitch1"
                            defaultChecked
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch1"
                          />
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="col-sm-12">
                      <div className="form-group">
                        <label className="col-form-label">Publish </label>
                        <div className="custom-control custom-switch">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitch2"
                            defaultChecked
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch2"
                          />
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="submit-btn" onClick={handleSubmit}>
                    <button className="submit-Btn">
                      {selectedShiftList[indexToEdit]?.id ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </PopupContainer>
      </PopupWrapper>
    </>
  );
};

export default AddShift;
