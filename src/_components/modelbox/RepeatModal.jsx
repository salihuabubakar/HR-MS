import React, { useState } from "react";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import {
  PopupWrapper,
  PopupOverlay,
  PopupContainer,
} from "./Addemployee.style";
import { useDateMonthlyCalendarCounter } from "../../utils/calendarCustomeHook";
import { RepeatModalContainer } from "../../MainPage/Employees/Employees/styles";
import moment from "moment";
import { CheckBox } from "./styles";
import { isMobile } from "../../utils/mediaQuery";
import { useEmployeeShiftFetching } from "../../utils/employeeCustomFetchHook";

const RepeatModal = ({ 
  event, 
  dispatchSchedule, 
  date: selectedDate,
  employeeId,
  houseId
}) => {

  const { employeeshiftData } = useEmployeeShiftFetching();

  const {
    handleNavigation,
    dateCounter,
    dayNames,
    currentMonthName,
    currentYear,
    tableData,
  } = useDateMonthlyCalendarCounter();


  /* The code is filtering the `employeeshiftData` array to find the shifts associated with a specific
  employee and house. It uses the `employeeId` and `houseId` variables to filter the data. */
  const shiftDateAssociatedWithEmployee = employeeshiftData?.filter(data => {
    return data.employee === employeeId && data.house === houseId
  });

  const getEmployeeAlreadyExistingShift = shiftDateAssociatedWithEmployee?.map(data => data.date);

  const [date, setDate] = useState([]);

  const customFontWidth = isMobile() && 10 

  /**
   * The function `handleCheckboxChange` updates an array of selected days based on the checkbox value
   * and checked status.
   */
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

  /**
   * The handleRepeat function takes an event object, creates new shifts for each selected date,
   * formats the dates, adds the new shifts to the schedule, and updates the global state.
   */
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
      date: moment(shift.date, "ddd DD MMM YYYY").format("YYYY-MM-DD"),
      house: shift.house,
    }));
    dispatchSchedule({ type: "add", payload: newShiftEvent });
    setGlobalState("repeatModal", false);
    setGlobalState("showAddSchedul", false);
  };

  const [isDarkMode] = useGlobalState("isDarkMode");

  return (
    <>
      <PopupWrapper>
        <PopupOverlay>
          <PopupContainer isDarkMode={isDarkMode} className="custom-modal" role="dialog">
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
                      <h3>Copy Shift</h3>
                      <p style={{ fontSize: "0.7rem" }}>
                        current Date: <span style={{ color: '#000' }}>{selectedDate}</span>
                      </p>
                      <p style={{ fontSize: "0.8rem" }}>
                        Select day(s) to copy shift to:{" "}
                        {date.length > 0 && <span style={{ color: '#000' }}>{date.join(", ")}</span>}
                      </p>
                    </div>
                    <div className="row">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div>
                          {currentMonthName} {currentYear}
                        </div>
                        <div className=" nav-btn">
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
                      </div>
                      <table className="table table-striped custom-table">
                        <thead>
                          <tr>
                            {dayNames?.map((data, index) => {
                              return (
                                <th style={{ borderRight: `${index !== 6 ? '1px solid grey' : ''}`, fontSize: `${customFontWidth}px` }} key={index}>
                                  {data}
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((week, weekIndex) => {
                            return (
                              <tr style={{cursor: "default"}} key={weekIndex}>
                                {week.map((day, dayIndex) => {
                                  const {
                                    isCurrentMonth,
                                    dayName,
                                    dayFigure,
                                    month,
                                    year,
                                    isCurrentDateTrue,
                                  } = day;
                                  const checkboxId = `day-${weekIndex}-${dayIndex}`;
                                  const currentDate = new Date(`${dayName} ${dayFigure} ${month} ${year}`);
                                  const selected = new Date(selectedDate);
                                  return (
                                    <td key={dayIndex}>
                                      <div className="form-group">
                                        <CheckBox
                                          style={{
                                          display: 
                                            (
                                              currentDate <= selected || 
                                              !isCurrentMonth || 
                                              getEmployeeAlreadyExistingShift.includes(`${dayName} ${dayFigure} ${month} ${year}`) 
                                          ) && "none",
                                          fontSize: `${customFontWidth}px`,
                                          backgroundColor:
                                            isCurrentDateTrue && "#9BA4B5",
                                          borderRadius: '2px'
                                        }}
                                        >
                                          <input
                                            type="checkbox"
                                            id={checkboxId}
                                            value={`${dayName} ${dayFigure} ${month} ${year}`}
                                            onChange={handleCheckboxChange}
                                            checked={date.includes(`${dayName} ${dayFigure} ${month} ${year}`)}
                                          />
                                          <label htmlFor={checkboxId}>
                                            <span>{dayFigure}</span>
                                          </label>
                                        </CheckBox>
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="submit-section">
                      <button
                        onClick={handleRepeat}
                        className="btn btn-primary repeat-btn"
                      >
                        Copy Shift
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
