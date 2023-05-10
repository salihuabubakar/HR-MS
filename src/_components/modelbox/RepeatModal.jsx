import React, { useState, useEffect } from "react";
import { setGlobalState } from "../../context/GlobalState";
import {
  PopupWrapper,
  PopupOverlay,
  PopupContainer,
} from "./Addemployee.style";
import { Checkbox } from "antd";

const RepeatModal = ({ event, setDayInWeeks, dispatchSchedule }) => {

  const [selectedDays, setSelectedDays] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedDays((prevSelectedDays) => [...prevSelectedDays, value]);
    } else {
      setSelectedDays((prevSelectedDays) =>
        prevSelectedDays.filter((day) => day !== value)
      );
    }
  };
  
  const handleRepeat = (e) => {
    e.preventDefault();
    const newShifts = [];
    const repeatDays = selectedDays.join(",");
    setDayInWeeks(selectedDays);
    repeatDays.split(",").forEach((day) => {
      const newShift = { ...event, selectedDay: day, id: Date.now() };
      newShifts.push(newShift);
    });
    dispatchSchedule({ type: "push", payload: newShifts });
    setGlobalState("repeatModal", false);
  };

  const [dateCounter, setDateCounter] = useState(0);
  const [activeCurrentDate, setActiveCurrentDate] = useState([]);
  let recentDates = [];
  let dayIndex = [];

  let isCurrentDateTrue;

  // Create a new date object and set it to the current date
  let currentDate = new Date();
  currentDate.setDate(
    dateCounter === 0
      ? currentDate.getDate()
      : currentDate.getDate() + dateCounter * 7
  );

  // Set the first day of the week (0 = Sunday, 1 = Monday, etc.)
  let firstDayOfWeek = 1;

  // Calculate the day of the week for the current date
  let currentDayOfWeek = currentDate.getDay();

  // Calculate the number of days to back up to the first day of the week
  let daysToBackUp = (currentDayOfWeek + 7 - firstDayOfWeek) % 7;

  // Back up to the first day of the week
  let firstDateOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - daysToBackUp
  );

  // Create an array of date objects for the current week
  let dates = [firstDateOfWeek];
  for (var i = 1; i < 7; i++) {
    var nextDate = new Date(
      firstDateOfWeek.getFullYear(),
      firstDateOfWeek.getMonth(),
      firstDateOfWeek.getDate() + i
    );
    dates.push(nextDate);
  }

  // Create a week calendar using the date objects
  for (var i = 0; i < dates.length; i++) {
    let dayName = dates[i].toString().slice(0, 3);
    let dayFigure = dates[i].toString().slice(8, 10);
    let month = dates[i].toString().slice(4, 7);
    recentDates.push(dayName + " " + dayFigure + " " + month);
  }

  for (let i = 0; i < recentDates.length; i++) {
    dayIndex.push(i);
  }

  // Function to handle the navigation buttons
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
                      <p>Select day(s) to repeat shift</p>
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
