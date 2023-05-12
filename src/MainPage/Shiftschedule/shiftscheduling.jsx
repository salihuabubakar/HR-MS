import React, { useEffect, useState, useReducer, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from 'react-router-dom';
import  AddShift from "../../_components/modelbox/AddShift"
import AddSchedule from "../../_components/modelbox/Addschedule";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import Smile from "../../assets/img/smile.png";
import DefaultImage from "../../assets/img/placeholder.jpg";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { Body, DesignationDiv } from "../Employees/Employees/styles";
import {
  initDept,
  savedDeptReducer,
  initUserAccount,
  savedUserAccountReducer,
  initShiftList,
  savedShiftListReducer,
  initHouse,
  savedHouseReducer,
  initScheduleEvent,
  savedScheduleEventReducer,
} from "../../utils/localStorage";
import "regenerator-runtime/runtime";
import { daysInWeek } from "date-fns";


const ShiftScheduling = () => {
  const location = useLocation();
  const houseId = location?.state?.id;

  const [menu, setMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const [showModal] = useGlobalState("showModal");
  const [showAddSchedul] = useGlobalState("showAddSchedul");
  const [selectedShiftList] = useGlobalState("selectedShiftList");

  const [schedule, dispatchSchedule] = useReducer(
    savedScheduleEventReducer,
    [],
    initScheduleEvent
  );
  useEffect(() => {
    localStorage.setItem("scheduleEvent", JSON.stringify(schedule));
  }, [schedule]);
  useEffect(() => {
    if (!showAddSchedul) {
      setGlobalState("selectedScheduleEvent", "");
    }
  }, [showAddSchedul]);

  const [shift, dispatchShift] = useReducer(
    savedShiftListReducer,
    [],
    initShiftList
  );
  useEffect(() => {
    localStorage.setItem("shiftList", JSON.stringify(shift));
  }, [shift]);
  useEffect(() => {
    if (!showModal) {
      setGlobalState("selectedShiftList", "");
    }
  }, [showModal]);

  const [shiftList, setShiftList] = useState();
  useEffect(() => {
    setShiftList(shift);
  }, [shift]);

  const [scheduleEvent, setScheduleEvent] = useState();
  useEffect(() => {
    setScheduleEvent(schedule);
  }, [schedule]);

  const [house] = useReducer(savedHouseReducer, [], initHouse);
  const [houseList, setHouseList] = useState();
  useEffect(() => {
    setHouseList(house);
  }, [house]);

  const [depts] = useReducer(savedDeptReducer, [], initDept);
  const [deptList, setDeptList] = useState();
  useEffect(() => {
    setDeptList(depts);
  }, [depts]);

  const selectedHouse = houseList?.find((house) => house.id === houseId);
  const houseName = selectedHouse?.houseName;

  const handleDeptChange = (event) => {
    // console.log(event);
  };

  const customSelectStyles = {
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: state.isSelected && "#FF9B44",
      color: state.isSelected && "#262626",
      "&:hover": {
        backgroundColor: "#FF9B44",
        color: "#262626",
      },
    }),
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#ddd",
      height: "48px",
    }),
  };
  const departments = [];
  deptList?.map((dept) => {
    departments.push({ value: dept.id, label: dept.deptName });
  });

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const [dateCounter, setDateCounter] = useState(0);
  let recentDates = [];
  let dayIndex = [];
  let isCurrentDateTrue;
  let activeCurrentDate = [];

  let today = new Date();

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
    // Check if the current date matches today's date
    if (
      dates[i].getDate() === today.getDate() &&
      dates[i].getMonth() === today.getMonth() &&
      dates[i].getFullYear() === today.getFullYear()
    ) {
      // Set isCurrentDateTrue to true if the current date matches today's date
      isCurrentDateTrue = true;
      // Add the index of the current date to the activeCurrentDate array
      activeCurrentDate.push(i);
    }
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

  const [employeeId, setEmployeeId] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedDayIndex2, setSelectedDayIndex2] = useState(null);
  const [event, setEvent] = useState();

  const handleMondayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(recentDates[0]);
    setGlobalState("showAddSchedul", true);
  };

  const handleMondayShiftIndex = (
    shifts,
    employeeId,
    houseId,
    index,
    indexID2
  ) => {
    setSelectedDayIndex(index);
    setSelectedDayIndex2(indexID2);
    setEvent({ shifts, employeeId, houseId });
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  };

  const handleTuesDayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(recentDates[1]);
    setGlobalState("showAddSchedul", true);
  };

  const handleTuesdayShiftIndex = (
    shifts,
    employeeId,
    houseId,
    index,
    indexID2
  ) => {
    setSelectedDayIndex(index);
    setSelectedDayIndex2(indexID2);
    setEvent({ shifts, employeeId, houseId });
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  };

  const handleWednesdayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(recentDates[2]);
    setGlobalState("showAddSchedul", true);
  };

  const handleWednesdayShiftIndex = (
    shifts,
    employeeId,
    houseId,
    index,
    indexID2
  ) => {
    setSelectedDayIndex(index);
    setSelectedDayIndex2(indexID2);
    setEvent({ shifts, employeeId, houseId });
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  };

  const handleThursdayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(recentDates[3]);
    setGlobalState("showAddSchedul", true);
  };

  const handleThursdayShiftIndex = (
    shifts,
    employeeId,
    houseId,
    index,
    indexID2
  ) => {
    setSelectedDayIndex(index);
    setSelectedDayIndex2(indexID2);
    setEvent({ shifts, employeeId, houseId });
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  };

  const handleFridayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(recentDates[4]);
    setGlobalState("showAddSchedul", true);
  };

  const handleFridayShiftIndex = (
    shifts,
    employeeId,
    houseId,
    index,
    indexID2
  ) => {
    setSelectedDayIndex(index);
    setSelectedDayIndex2(indexID2);
    setEvent({ shifts, employeeId, houseId });
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  };

  const handlSaturdayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(recentDates[5]);
    setGlobalState("showAddSchedul", true);
  };

  const handleSaturdayShiftIndex = (
    shifts,
    employeeId,
    houseId,
    index,
    indexID2
  ) => {
    setSelectedDayIndex(index);
    setSelectedDayIndex2(indexID2);
    setEvent({ shifts, employeeId, houseId });
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  };

  const handleSundayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(recentDates[6]);
    setGlobalState("showAddSchedul", true);
  };

  const handleSundayShiftIndex = (
    shifts,
    employeeId,
    houseId,
    index,
    indexID2
  ) => {
    setSelectedDayIndex(index);
    setSelectedDayIndex2(indexID2);
    setEvent({ shifts, employeeId, houseId });
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  };

  const Shifts = ({
    label,
    id,
    employeeId,
    houseId,
    shifts,
    handleDayShiftIndex,
    indexID,
    indexID2,
  }) => {
    return (
      <div
        onClick={() =>
          handleDayShiftIndex(shifts, employeeId, houseId, indexID, indexID2)
        }
        key={id}
        className="user-add-shedule-list"
      >
        <h2>
          <a
            style={{
              border: "2px dashed #1eb53a",
            }}
          >
            <span>{shifts.label}</span>
            <span className="userrole-info">Web Designer - {label}</span>
          </a>
        </h2>
      </div>
    );
  };

  return (
    <>
      {/* Page Wrapper */}
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={() => toggleMobileMenu()} />
        <Sidebar />
        <Body className="page-wrapper">
          <Helmet>
            <title>Shift &amp; Schedule - Peepal Tree</title>
            <meta name="description" content="Login page" />
          </Helmet>
          {/* Page Content */}
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Daily Scheduling</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/shiftschedule/house">House</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Shift Scheduling : {houseName}
                    </li>
                  </ul>
                </div>
                <div className="col-auto float-end ml-auto">
                  <Link
                    to="/app/shiftschedule/shift-list"
                    className="btn add-btn m-r-5"
                  >
                    Shifts
                  </Link>
                  <a
                    className="btn add-btn m-r-5"
                    onClick={() => setGlobalState("showModal", true)}
                  >
                    {" "}
                    Add Shifts
                  </a>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            {/* Content Starts */}
            {/* Search Filter */}
            <div className="row filter-row">
              <div className="col-sm-6 col-md-3">
                <div className="form-group form-focus">
                  <input type="text" className="form-control floating" />
                  <label className="focus-label">Employee</label>
                </div>
              </div>
              <DesignationDiv className="col-sm-6 col-md-3">
                <div className="field">
                  <Select
                    onChange={handleDeptChange}
                    options={departments}
                    styles={customSelectStyles}
                    placeholder="Select Department"
                  />
                </div>
              </DesignationDiv>
              <div className="col-sm-6 col-md-2">
                <div className="form-group form-focus focused">
                  <div>
                    <input
                      className="form-control floating datetimepicker"
                      type="date"
                    />
                  </div>
                  <label className="focus-label">From</label>
                </div>
              </div>
              <div className="col-sm-6 col-md-2">
                <div className="form-group form-focus focused">
                  <div>
                    <input
                      className="form-control floating datetimepicker"
                      type="date"
                    />
                  </div>
                  <label className="focus-label">To</label>
                </div>
              </div>
              <div className="col-sm-6 col-md-2">
                <a href="#" className="btn btn-success btn-block w-100">
                  {" "}
                  Search{" "}
                </a>
              </div>
            </div>
            {/* Search Filter */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "5px",
              }}
            >
              <button
                onClick={() => handleNavigation("prev")}
                style={{ border: "none", marginRight: "10px" }}
                className="btn btn-success btn-block w-10"
              >
                Prev Week
              </button>
              <button
                onClick={() => handleNavigation("current")}
                className="btn btn-success btn-block w-10"
                style={{
                  border: "none",
                  opacity: dateCounter === 0 ? "0.3" : "1",
                  cursor: dateCounter === 0 ? "not-allowed" : "pointer",
                  color: dateCounter === 0 ? "black" : "white",
                }}
              >
                Current Week
              </button>
              <button
                onClick={() => handleNavigation("next")}
                style={{ border: "none", marginLeft: "10px" }}
                className="btn btn-success btn-block w-10"
              >
                Next Week
              </button>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th style={{ borderRight: "1px solid grey" }}>
                          Scheduled Shift
                        </th>
                        {recentDates?.map((data, index) => {
                          return (
                            <th
                              style={{
                                borderRight: "1px solid grey",
                                backgroundColor:
                                  data === recentDates[activeCurrentDate] && "#ddd",
                              }}
                              key={index}
                            >
                              {data}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedHouse?.employee
                        ? selectedHouse?.employee.map((staff, index) => {
                            const { value, label, image } = staff;
                            return (
                              <Fragment key={index}>
                                <tr>
                                  <td>
                                    <h2 className="table-avatar">
                                      <a className="avatar">
                                        <img
                                          style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50px",
                                            backgroundColor: "#00000000",
                                          }}
                                          src={image ? image : DefaultImage}
                                        />
                                      </a>
                                      <a style={{ color: "#ff9b44" }}>
                                        {label}
                                        <span>Web Designer</span>
                                      </a>
                                    </h2>
                                  </td>
                                  <td
                                    className="tool-tip"
                                    onClick={() => handleMondayShift(value)}
                                  >
                                    <span className="tool-tip-text">
                                      <a>
                                        <span>
                                          <i className="fa fa-plus" />
                                        </span>
                                      </a>
                                    </span>
                                    {scheduleEvent?.map((events, indexID) => {
                                      if (Array.isArray(events)) {
                                        return events.map(
                                          (nestedEvents, indexID2) => {
                                            const {
                                              id,
                                              employeeId,
                                              houseId,
                                              selectedDay,
                                              shifts,
                                            } = nestedEvents;
                                            if (
                                              houseId == houseId &&
                                              value === employeeId &&
                                              selectedDay === recentDates[0]
                                            ) {
                                              return (
                                                <>
                                                  <Shifts
                                                    id={id}
                                                    employeeId={employeeId}
                                                    houseId={houseId}
                                                    shifts={shifts}
                                                    handleDayShiftIndex={
                                                      handleMondayShiftIndex
                                                    }
                                                    indexID={indexID}
                                                    indexID2={indexID2}
                                                    label={label}
                                                  />
                                                </>
                                              );
                                            }
                                          }
                                        );
                                      } else {
                                        const {
                                          id,
                                          employeeId,
                                          houseId,
                                          selectedDay,
                                          shifts,
                                        } = events;
                                        if (
                                          houseId == houseId &&
                                          value === employeeId &&
                                          selectedDay === recentDates[0]
                                        ) {
                                          return (
                                            <Shifts
                                              id={id}
                                              employeeId={employeeId}
                                              houseId={houseId}
                                              shifts={shifts}
                                              handleDayShiftIndex={
                                                handleMondayShiftIndex
                                              }
                                              indexID={indexID}
                                              label={label}
                                            />
                                          );
                                        }
                                      }
                                    })}
                                  </td>
                                  <td
                                    className="tool-tip"
                                    onClick={() => handleTuesDayShift(value)}
                                  >
                                    <span className="tool-tip-text">
                                      <a>
                                        <span>
                                          <i className="fa fa-plus" />
                                        </span>
                                      </a>
                                    </span>
                                    {scheduleEvent?.map((events, indexID) => {
                                      if (Array.isArray(events)) {
                                        return events.map(
                                          (nestedEvents, indexID2) => {
                                            const {
                                              id,
                                              employeeId,
                                              houseId,
                                              selectedDay,
                                              shifts,
                                            } = nestedEvents;
                                            if (
                                              houseId == houseId &&
                                              value === employeeId &&
                                              selectedDay === recentDates[1]
                                            ) {
                                              return (
                                                <>
                                                  <Shifts
                                                    id={id}
                                                    employeeId={employeeId}
                                                    houseId={houseId}
                                                    shifts={shifts}
                                                    handleDayShiftIndex={
                                                      handleTuesdayShiftIndex
                                                    }
                                                    indexID={indexID}
                                                    indexID2={indexID2}
                                                    label={label}
                                                  />
                                                </>
                                              );
                                            }
                                          }
                                        );
                                      } else {
                                        const {
                                          id,
                                          employeeId,
                                          houseId,
                                          selectedDay,
                                          shifts,
                                        } = events;
                                        if (
                                          houseId == houseId &&
                                          value === employeeId &&
                                          selectedDay === recentDates[1]
                                        ) {
                                          return (
                                            <Shifts
                                              id={id}
                                              employeeId={employeeId}
                                              houseId={houseId}
                                              shifts={shifts}
                                              handleDayShiftIndex={
                                                handleTuesdayShiftIndex
                                              }
                                              indexID={indexID}
                                              label={label}
                                            />
                                          );
                                        }
                                      }
                                    })}
                                  </td>
                                  <td
                                    className="tool-tip"
                                    onClick={() => handleWednesdayShift(value)}
                                  >
                                    <span className="tool-tip-text">
                                      <a>
                                        <span>
                                          <i className="fa fa-plus" />
                                        </span>
                                      </a>
                                    </span>
                                    {scheduleEvent?.map((events, indexID) => {
                                      if (Array.isArray(events)) {
                                        return events.map(
                                          (nestedEvents, indexID2) => {
                                            const {
                                              id,
                                              employeeId,
                                              houseId,
                                              selectedDay,
                                              shifts,
                                            } = nestedEvents;
                                            if (
                                              houseId == houseId &&
                                              value === employeeId &&
                                              selectedDay === recentDates[2]
                                            ) {
                                              return (
                                                <>
                                                  <Shifts
                                                    id={id}
                                                    employeeId={employeeId}
                                                    houseId={houseId}
                                                    shifts={shifts}
                                                    handleDayShiftIndex={
                                                      handleWednesdayShiftIndex
                                                    }
                                                    indexID={indexID}
                                                    indexID2={indexID2}
                                                    label={label}
                                                  />
                                                </>
                                              );
                                            }
                                          }
                                        );
                                      } else {
                                        const {
                                          id,
                                          employeeId,
                                          houseId,
                                          selectedDay,
                                          shifts,
                                        } = events;
                                        if (
                                          houseId == houseId &&
                                          value === employeeId &&
                                          selectedDay === recentDates[2]
                                        ) {
                                          return (
                                            <Shifts
                                              id={id}
                                              employeeId={employeeId}
                                              houseId={houseId}
                                              shifts={shifts}
                                              handleDayShiftIndex={
                                                handleWednesdayShiftIndex
                                              }
                                              indexID={indexID}
                                              label={label}
                                            />
                                          );
                                        }
                                      }
                                    })}
                                  </td>
                                  <td
                                    className="tool-tip"
                                    onClick={() => handleThursdayShift(value)}
                                  >
                                    <span className="tool-tip-text">
                                      <a>
                                        <span>
                                          <i className="fa fa-plus" />
                                        </span>
                                      </a>
                                    </span>
                                    {scheduleEvent?.map((events, indexID) => {
                                      if (Array.isArray(events)) {
                                        return events.map(
                                          (nestedEvents, indexID2) => {
                                            const {
                                              id,
                                              employeeId,
                                              houseId,
                                              selectedDay,
                                              shifts,
                                            } = nestedEvents;
                                            if (
                                              houseId == houseId &&
                                              value === employeeId &&
                                              selectedDay === recentDates[3]
                                            ) {
                                              return (
                                                <>
                                                  <Shifts
                                                    id={id}
                                                    employeeId={employeeId}
                                                    houseId={houseId}
                                                    shifts={shifts}
                                                    handleDayShiftIndex={
                                                      handleThursdayShiftIndex
                                                    }
                                                    indexID={indexID}
                                                    indexID2={indexID2}
                                                    label={label}
                                                  />
                                                </>
                                              );
                                            }
                                          }
                                        );
                                      } else {
                                        const {
                                          id,
                                          employeeId,
                                          houseId,
                                          selectedDay,
                                          shifts,
                                        } = events;
                                        if (
                                          houseId == houseId &&
                                          value === employeeId &&
                                          selectedDay === recentDates[3]
                                        ) {
                                          return (
                                            <Shifts
                                              id={id}
                                              employeeId={employeeId}
                                              houseId={houseId}
                                              shifts={shifts}
                                              handleDayShiftIndex={
                                                handleThursdayShiftIndex
                                              }
                                              indexID={indexID}
                                              label={label}
                                            />
                                          );
                                        }
                                      }
                                    })}
                                  </td>
                                  <td
                                    className="tool-tip"
                                    onClick={() => handleFridayShift(value)}
                                  >
                                    <span className="tool-tip-text">
                                      <a>
                                        <span>
                                          <i className="fa fa-plus" />
                                        </span>
                                      </a>
                                    </span>
                                    {scheduleEvent?.map((events, indexID) => {
                                      if (Array.isArray(events)) {
                                        return events.map(
                                          (nestedEvents, indexID2) => {
                                            const {
                                              id,
                                              employeeId,
                                              houseId,
                                              selectedDay,
                                              shifts,
                                            } = nestedEvents;
                                            if (
                                              houseId == houseId &&
                                              value === employeeId &&
                                              selectedDay === recentDates[4]
                                            ) {
                                              return (
                                                <>
                                                  <Shifts
                                                    id={id}
                                                    employeeId={employeeId}
                                                    houseId={houseId}
                                                    shifts={shifts}
                                                    handleDayShiftIndex={
                                                      handleFridayShiftIndex
                                                    }
                                                    indexID={indexID}
                                                    indexID2={indexID2}
                                                    label={label}
                                                  />
                                                </>
                                              );
                                            }
                                          }
                                        );
                                      } else {
                                        const {
                                          id,
                                          employeeId,
                                          houseId,
                                          selectedDay,
                                          shifts,
                                        } = events;
                                        if (
                                          houseId == houseId &&
                                          value === employeeId &&
                                          selectedDay === recentDates[4]
                                        ) {
                                          return (
                                            <Shifts
                                              id={id}
                                              employeeId={employeeId}
                                              houseId={houseId}
                                              shifts={shifts}
                                              handleDayShiftIndex={
                                                handleFridayShiftIndex
                                              }
                                              indexID={indexID}
                                              label={label}
                                            />
                                          );
                                        }
                                      }
                                    })}
                                  </td>
                                  <td
                                    className="tool-tip"
                                    onClick={() => handlSaturdayShift(value)}
                                  >
                                    <span className="tool-tip-text">
                                      <a>
                                        <span>
                                          <i className="fa fa-plus" />
                                        </span>
                                      </a>
                                    </span>
                                    {scheduleEvent?.map((events, indexID) => {
                                      if (Array.isArray(events)) {
                                        return events.map(
                                          (nestedEvents, indexID2) => {
                                            const {
                                              id,
                                              employeeId,
                                              houseId,
                                              selectedDay,
                                              shifts,
                                            } = nestedEvents;
                                            if (
                                              houseId == houseId &&
                                              value === employeeId &&
                                              selectedDay === recentDates[5]
                                            ) {
                                              return (
                                                <>
                                                  <Shifts
                                                    id={id}
                                                    employeeId={employeeId}
                                                    houseId={houseId}
                                                    shifts={shifts}
                                                    handleDayShiftIndex={
                                                      handleSaturdayShiftIndex
                                                    }
                                                    indexID={indexID}
                                                    indexID2={indexID2}
                                                    label={label}
                                                  />
                                                </>
                                              );
                                            }
                                          }
                                        );
                                      } else {
                                        const {
                                          id,
                                          employeeId,
                                          houseId,
                                          selectedDay,
                                          shifts,
                                        } = events;
                                        if (
                                          houseId == houseId &&
                                          value === employeeId &&
                                          selectedDay === recentDates[5]
                                        ) {
                                          return (
                                            <Shifts
                                              id={id}
                                              employeeId={employeeId}
                                              houseId={houseId}
                                              shifts={shifts}
                                              handleDayShiftIndex={
                                                handleSaturdayShiftIndex
                                              }
                                              indexID={indexID}
                                              label={label}
                                            />
                                          );
                                        }
                                      }
                                    })}
                                  </td>
                                  <td
                                    className="tool-tip"
                                    onClick={() => handleSundayShift(value)}
                                  >
                                    <span className="tool-tip-text">
                                      <a>
                                        <span>
                                          <i className="fa fa-plus" />
                                        </span>
                                      </a>
                                    </span>
                                    {scheduleEvent?.map((events, indexID) => {
                                      if (Array.isArray(events)) {
                                        return events.map(
                                          (nestedEvents, indexID2) => {
                                            const {
                                              id,
                                              employeeId,
                                              houseId,
                                              selectedDay,
                                              shifts,
                                            } = nestedEvents;
                                            if (
                                              houseId == houseId &&
                                              value === employeeId &&
                                              selectedDay === recentDates[6]
                                            ) {
                                              return (
                                                <>
                                                  <Shifts
                                                    id={id}
                                                    employeeId={employeeId}
                                                    houseId={houseId}
                                                    shifts={shifts}
                                                    handleDayShiftIndex={
                                                      handleSundayShiftIndex
                                                    }
                                                    indexID={indexID}
                                                    indexID2={indexID2}
                                                    label={label}
                                                  />
                                                </>
                                              );
                                            }
                                          }
                                        );
                                      } else {
                                        const {
                                          id,
                                          employeeId,
                                          houseId,
                                          selectedDay,
                                          shifts,
                                        } = events;
                                        if (
                                          houseId == houseId &&
                                          value === employeeId &&
                                          selectedDay === recentDates[6]
                                        ) {
                                          return (
                                            <Shifts
                                              id={id}
                                              employeeId={employeeId}
                                              houseId={houseId}
                                              shifts={shifts}
                                              handleDayShiftIndex={
                                                handleSundayShiftIndex
                                              }
                                              indexID={indexID}
                                              label={label}
                                            />
                                          );
                                        }
                                      }
                                    })}
                                  </td>
                                  {/* )} */}
                                </tr>
                              </Fragment>
                            );
                          })
                        : "Ops! No employees in this house."}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* /Content End */}
          </div>
          {/* /Page Content */}
        </Body>
      </div>
      {/* /Page Wrapper */}
      {/* Add Schedule Modal */}
      {showModal && <AddShift dispatchShift={dispatchShift} />}
      {showAddSchedul && (
        <AddSchedule
          employeeId={employeeId}
          dispatchSchedule={dispatchSchedule}
          selectedDay={selectedDay}
          selectedDayIndex={selectedDayIndex}
          shiftList={shiftList}
          event={event}
          schedule={schedule}
          houseId={houseId}
          selectedDayIndex2={selectedDayIndex2}
        />
      )}
    </>
  );
}

export default ShiftScheduling;
