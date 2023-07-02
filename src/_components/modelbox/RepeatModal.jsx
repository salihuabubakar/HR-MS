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
import { toast } from "react-toastify";

const RepeatModal = ({ event, dispatchSchedule }) => {

  const {
    dateCounter,
    dayMonthYear,
    activeCurrentDate,
    handleNavigation,
  } = useDateWeeklyCalendarCounter();

  const [date, setDate] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setDate((prevSelectedDays) => [...prevSelectedDays, value]);
    } else {
      setDate((prevSelectedDays) =>
        prevSelectedDays.filter((day) => day !== value)
      );
    }
  };
  
  const handleRepeat = (e) => {
    e.preventDefault();
    const newShifts = [];
    const repeatDays = date.join(",");
    repeatDays.split(",").forEach((day) => {
      const newShift = { ...event, date: day };
      newShifts.push(newShift);
    });
    const newShiftEvent = newShifts.map((shift) => ({
      shift: shift.shift,
      employee: shift.employee,
      date: shift.date,
      house: shift.house,
    }));
    dispatchSchedule({ type: "add", payload: newShiftEvent });
    toast.success("Shift Repeated", {
      autoClose: 1500,
    });
    setGlobalState("repeatModal", false);
    setGlobalState("showAddSchedul", false);
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
                    <div className="form-header">
                      <h3>Repeat Shift</h3>
                      <p>
                        Select day(s) to repeat shift:{" "}
                        {date.length > 0 && <span>{date.join(", ")}</span>}
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 nav-btn">
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
                      <div className="col-sm-12 check-box-div">
                        {dayMonthYear?.map((data, index) => {
                          const truncatedData = data.slice(0, -5); // Remove the last 5 characters
                          return (
                            <Checkbox
                              style={{
                                width: "50%",
                                marginLeft: index === 0 && "8px",
                              }}
                              key={index}
                              value={data}
                              onChange={handleCheckboxChange}
                              checked={date.includes(data)}
                            >
                              {truncatedData}
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
