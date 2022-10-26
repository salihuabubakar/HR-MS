import React, { useState, useEffect, useReducer } from "react";
import {
  PopupContainer,
  PopupOverlay,
  PopupWrapper,
  Card,
} from "./Addemployee.style";
import Select from "react-select";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { DatePicker } from "antd";

const Addschedule = ({
  employeeId,
  employeeSelectedIndex,
  dispatchShift,
  selecteDay,
  selecteDayIndex,
}) => {
  const [selectedShiftEvent] = useGlobalState("selectedShiftEvent");

  console.log("selectedShiftEvent: ", selectedShiftEvent);

  const [am, setAm] = useState(
    selectedShiftEvent[selecteDayIndex]?.am
      ? selectedShiftEvent[selecteDayIndex]?.am
      : ""
  );
  const [pm, setPm] = useState(
    selectedShiftEvent[selecteDayIndex]?.pm
      ? selectedShiftEvent[selecteDayIndex]?.pm
      : ""
  );

  const [startTime, setStartTime] = useState(
    selectedShiftEvent[selecteDayIndex]?.startTime
      ? selectedShiftEvent[selecteDayIndex]?.startTime
      : ""
  );
  const [endTime, setEndTime] = useState(
    selectedShiftEvent[selecteDayIndex]?.endTime
      ? selectedShiftEvent[selecteDayIndex]?.endTime
      : ""
  );

  const [id, setId] = useState(
    selectedShiftEvent[selecteDayIndex]?.id
      ? selectedShiftEvent[selecteDayIndex]?.id
      : Date.now()
  );

  const handlep = (event) => {
    console.log(event.target.value);
    setPm(event.target.value);
  };

  const handlea = (event) => {
    console.log(event.target.value);
    setAm(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const shift = {
      startTime: startTime + " " + am,
      endTime: endTime + " " + pm,
      employeeId,
      employeeSelectedIndex,
      selecteDay,
      id,
    };
    if (selectedShiftEvent[selecteDayIndex]?.id) {
      dispatchShift({ type: "update", payload: shift });
    } else {
      dispatchShift({ type: "push", payload: shift });
    }
    setGlobalState("showModal", false);
  };

  const handleDeleteEvent = () => {
    dispatchShift({
      type: "delete",
      payload: selectedShiftEvent[selecteDayIndex],
    });
    setGlobalState("showModal", false);
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
                  {selectedShiftEvent[selecteDayIndex]?.id
                    ? "Edit Schedule"
                    : "Add Schedule"
                  }
                </h5>
                <div>
                  {selectedShiftEvent[selecteDayIndex]?.id && (
                    <button type="submit" onClick={handleDeleteEvent}>
                      Delete
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setGlobalState("showModal", false)}
                  >
                    <span>×</span>
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
                    <div className="col-sm">
                      <div className="">
                        <label className="">Start Time</label>
                        <div className="">
                          <input
                            value={startTime}
                            onChange={(event) =>
                              setStartTime(event.target.value)
                            }
                            type="time"
                            className=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="">
                        <label className="">AM/PM</label>
                        <select onChange={handlea} className="">
                          <option value>Select </option>
                          <option value={"am"}>am</option>
                          <option value={"pm"}>pm</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="">
                        <label className="">
                          End Time <span className="text-danger">*</span>
                        </label>
                        <div className="">
                          <input
                            value={endTime}
                            onChange={(event) => setEndTime(event.target.value)}
                            type="time"
                            className=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="">
                        <label className="">AM/PM</label>
                        <select onChange={handlep} className="">
                          <option value>Select </option>
                          <option value={"am"}>am</option>
                          <option value={"pm"}>pm</option>
                        </select>
                      </div>
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
                    <button className="btn btn-primary submit-btn">
                      Submit
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

export default Addschedule;
