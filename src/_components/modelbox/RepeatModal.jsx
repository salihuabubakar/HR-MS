import React, { useState, useEffect } from "react";
import { setGlobalState } from "../../context/GlobalState";
import {
  PopupWrapper,
  PopupOverlay,
  PopupContainer,
} from "./Addemployee.style";
import { Checkbox } from "antd";
import { useDateWeeklyCalendarCounter } from "../../utils/calendarCustomeHook";
import { RepeatModalContainer } from "../../MainPage/Employees/Employees/styles";

const RepeatModal = ({ event, dispatchSchedule }) => {

  const {
    dateCounter,
    recentDates,
    activeCurrentDate,
    dayMonthYear,
    handleNavigation,
  } = useDateWeeklyCalendarCounter();

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
    repeatDays.split(",").forEach((day, index) => {
      const newShift = { ...event, selectedDay: day, id: Date.now() + index };
      newShifts.push(newShift);
    });
    const newShiftEvent = newShifts.map((shift) => ({
      shifts: shift.shifts,
      employeeId: shift.employeeId,
      selectedDay: shift.selectedDay,
      houseId: shift.houseId,
      id: shift.id,
    }));
    dispatchSchedule({ type: "push", payload: newShiftEvent });
    setGlobalState("repeatModal", false);
  };

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer className="custom-modal" role="dialog">
            <RepeatModalContainer className="custom-modal" role="dialog">
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
                    <div className="form-header"
                    >
                      <h3>Repeat Shift</h3>
                      <p>
                        Select day(s) to repeat shift:{" "}
                        {selectedDays.length > 0 && (
                          <span>{selectedDays.join(", ")}</span>
                        )}
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 nav-btn"
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
                      <div className="col-sm-12 check-box-div"
                      >
                        {recentDates?.map((data, index) => {
                          return (
                            <Checkbox
                              style={{
                                width: "50%",
                                marginLeft: index === 0 && "8px",
                              }}
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
            </RepeatModalContainer>
          </PopupContainer>
        </PopupOverlay>
      </PopupWrapper>
    </>
  );
};

export default RepeatModal;
