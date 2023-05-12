import React, { useState, useEffect } from "react";
import { setGlobalState } from "../../context/GlobalState";
import {
  PopupWrapper,
  PopupOverlay,
  PopupContainer,
} from "./Addemployee.style";
import { Checkbox } from "antd";

const RepeatModal = ({ event, dispatchSchedule }) => {

  const [selectedDays, setSelectedDays] = useState([]);
  const [dayInWeeks, setDayInWeeks] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedDays((prevSelectedDays) => [...prevSelectedDays, value]);
      setDayInWeeks((prevSelectedDays) => [...prevSelectedDays, value]);
    } else {
      setSelectedDays((prevSelectedDays) =>
        prevSelectedDays.filter((day) => day !== value)
      );
      setDayInWeeks((prevSelectedDays) =>
        prevSelectedDays.filter((day) => day !== value)
      );
    }
  };
  
  const handleRepeat = (e) => {
    e.preventDefault();
    const newShifts = [];
    const repeatDays = selectedDays.join(",");
    repeatDays.split(",").forEach((day) => {
      const newShift = { ...event, selectedDay: day, id: Date.now() };
      newShifts.push(newShift);
    });
    dispatchSchedule({ type: "push", payload: newShifts });
    setGlobalState("repeatModal", false);
  };

  const [dateCounter, setDateCounter] = useState(0);
  let recentDates = [];
  let dayIndex = [];


  let currentDate = new Date();
  currentDate.setDate(
    dateCounter === 0
      ? currentDate.getDate()
      : currentDate.getDate() + dateCounter * 7
  );

  let firstDayOfWeek = 1;

  let currentDayOfWeek = currentDate.getDay();

  let daysToBackUp = (currentDayOfWeek + 7 - firstDayOfWeek) % 7;

  let firstDateOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - daysToBackUp
  );

  let dates = [firstDateOfWeek];
  for (var i = 1; i < 7; i++) {
    var nextDate = new Date(
      firstDateOfWeek.getFullYear(),
      firstDateOfWeek.getMonth(),
      firstDateOfWeek.getDate() + i
    );
    dates.push(nextDate);
  }

  for (var i = 0; i < dates.length; i++) {
    let dayName = dates[i].toString().slice(0, 3);
    let dayFigure = dates[i].toString().slice(8, 10);
    let month = dates[i].toString().slice(4, 7);
    recentDates.push(dayName + " " + dayFigure + " " + month);
  }

  for (let i = 0; i < recentDates.length; i++) {
    dayIndex.push(i);
  }

  const handleNavigation = (direction) => {
    if (direction === "prev") {
      setDateCounter((prevCounter) => prevCounter - 1);
    } else if (direction === "next") {
      setDateCounter((prevCounter) => prevCounter + 1);
    } else {
      setDateCounter(0);
    }
  };

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer className="custom-modal" role="dialog">
            <div className="custom-modal" role="dialog">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      onClick={() => setGlobalState("repeatModal", false)}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-header">
                      <h3>Repeat Shift</h3>
                      <p>
                        Select day(s) to repeat shift:{" "}
                        {dayInWeeks.length > 0 && (<span>{dayInWeeks.join(", ")}</span>)}
                      </p>
                    </div>
                    <div className="row">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="col-sm-12"
                      >
                        <button
                          onClick={() => handleNavigation("prev")}
                          style={{ border: "none", marginRight: "10px" }}
                          className="btn btn-success btn-block w-10"
                        >
                          {"<"}
                        </button>
                        <button
                          onClick={() => handleNavigation("current")}
                          className="btn btn-success btn-block w-10"
                          style={{
                            border: "none",
                            opacity: dateCounter === 0 ? "0.3" : "1",
                            cursor:
                              dateCounter === 0 ? "not-allowed" : "pointer",
                            color: dateCounter === 0 ? "black" : "white",
                          }}
                        >
                          {"#"}
                        </button>
                        <button
                          onClick={() => handleNavigation("next")}
                          style={{ border: "none", marginLeft: "10px" }}
                          className="btn btn-success btn-block w-10"
                        >
                          {">"}
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                        className="col-sm-12"
                      >
                        {recentDates?.map((data, index) => {
                          return (
                            <Checkbox
                              key={index}
                              value={data}
                              onChange={handleCheckboxChange}
                              checked={selectedDays.includes(data)}
                            >
                              {data}
                            </Checkbox>
                          );
                        })}
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleRepeat}
                        className="btn btn-primary repeat-btn"
                      >
                        Add Repeat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PopupContainer>
        </PopupOverlay>
      </PopupWrapper>
    </>
  );
};

export default RepeatModal;
