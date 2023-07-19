import React, { useEffect, useState, useReducer, Fragment, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from 'react-router-dom';
import  AddShift from "../../_components/modelbox/AddShift"
import AddSchedule from "../../_components/modelbox/Addschedule";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import DefaultImage from "../../assets/img/placeholder.jpg";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import {
  Body,
  NavContainer,
  NavButton,
} from "../Employees/Employees/styles";
import {
  useHouseFetching,
  useDataFetching,
  useHouseEmployeeFetching,
  useShiftFetching,
  useEmployeeShiftFetching,
  useRoleFetching,
} from "../../utils/employeeCustomFetchHook";
import {
  add_update_delete_shift,
  add_update_delete_employee_shift,
} from "../../utils/sendToServer";
import { useReactToPrint } from "react-to-print";
import WeeklyComponent from "./weeklyComponent";
import MonthlyComponent from "./monthlyComponent";
import { useDateWeeklyCalendarCounter, useDateMonthlyCalendarCounter } from "../../utils/calendarCustomeHook";


const ShiftScheduling = () => {
  const location = useLocation();
  const houseId = location?.state?.id;
  const [menu, setMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const {
    dateCounter,
    recentDates,
    activeCurrentDate,
    handleNavigation,
    dayMonthYear,
  } = useDateWeeklyCalendarCounter();

  const {
    handleNavigation: monthlyNavigation,
    dateCounter: monthCounter,
    dayNames,
    currentMonthName,
    currentYear,
    tableData,
  } = useDateMonthlyCalendarCounter();

  const [views, setViews] = useState("weeklyView" || "monthlyView")

  const [showShiftModal] = useGlobalState("showShiftModal");
  const [showAddSchedul] = useGlobalState("showAddSchedul");
  const [selectedShiftList] = useGlobalState("selectedShiftList");
  useEffect(() => {
    if (!showAddSchedul) {
      setGlobalState("selectedScheduleEvent", "");
    }
  }, [showAddSchedul]);

const [shiftSchedule, dispatchSchedule] = useReducer(
  add_update_delete_employee_shift,
  []
);
const { employeeshiftData } = useEmployeeShiftFetching();
const { roleData } = useRoleFetching();
const [shiftState, dispatchShift] = useReducer(add_update_delete_shift, []); 
const { shiftData, isShiftLoading } = useShiftFetching();
  const { houseData, isHouseDataLoading, houseError } = useHouseFetching();
  const { data: allEmployee, isLoading } = useDataFetching();
  const { houseEmployeeData, isHouseEmployeeLoading } = useHouseEmployeeFetching();

  const selectedHouse = houseData?.find((house) => house.id === houseId);
  const houseName = selectedHouse?.name;

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const [employeeId, setEmployeeId] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [event, setEvent] = useState();
  const [shiftScheduleId, setShiftScheduleId] = useState(null)
  const [isPrint, setIsPrint] = useState(false);

  // const handleMonthShiftEdit = (shift, employee, house, shiftIndex, id) => {
  //   setShiftScheduleId(id);
  //   setSelectedDayIndex(shiftIndex);
  //   setEvent({ shift, employee, house });
  //   setGlobalState("selectedScheduleEvent", employeeshiftData);
  //   setGlobalState("showAddSchedul", true);
  // };

  const handleMondayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(dayMonthYear[0]);
    setGlobalState("showAddSchedul", true);
  };

  const handleMondayShiftIndex = (shift, employee, house, indexID, id) => {
    setShiftScheduleId(id);
    setSelectedDayIndex(indexID);
    setEvent({ shift, employee, house });
    setGlobalState("selectedScheduleEvent", employeeshiftData);
  };

  const handleTuesDayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(dayMonthYear[1]);
    setGlobalState("showAddSchedul", true);
  };

  const handleTuesdayShiftIndex = (shift, employee, house, indexID, id) => {
    setShiftScheduleId(id);
    setSelectedDayIndex(indexID);
    setEvent({ shift, employee, house });
    setGlobalState("selectedScheduleEvent", employeeshiftData);
  };

  const handleWednesdayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(dayMonthYear[2]);
    setGlobalState("showAddSchedul", true);
  };

  const handleWednesdayShiftIndex = (shift, employee, house, indexID, id) => {
    setShiftScheduleId(id);
    setSelectedDayIndex(indexID);
    setEvent({ shift, employee, house });
    setGlobalState("selectedScheduleEvent", employeeshiftData);
  };

  const handleThursdayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(dayMonthYear[3]);
    setGlobalState("showAddSchedul", true);
  };

  const handleThursdayShiftIndex = (shift, employee, house, indexID, id) => {
    setShiftScheduleId(id);
    setSelectedDayIndex(indexID);
    setEvent({ shift, employee, house });
    setGlobalState("selectedScheduleEvent", employeeshiftData);
  };

  const handleFridayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(dayMonthYear[4]);
    setGlobalState("showAddSchedul", true);
  };

  const handleFridayShiftIndex = (shift, employee, house, indexID, id) => {
    setShiftScheduleId(id);
    setSelectedDayIndex(indexID);
    setEvent({ shift, employee, house });
    setGlobalState("selectedScheduleEvent", employeeshiftData);
  };

  const handlSaturdayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(dayMonthYear[5]);
    setGlobalState("showAddSchedul", true);
  };

  const handleSaturdayShiftIndex = (shift, employee, house, indexID, id) => {
    setShiftScheduleId(id);
    setSelectedDayIndex(indexID);
    setEvent({ shift, employee, house });
    setGlobalState("selectedScheduleEvent", employeeshiftData);
  };

  const handleSundayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(dayMonthYear[6]);
    setGlobalState("showAddSchedul", true);
  };

  const handleSundayShiftIndex = (shift, employee, house, indexID, id) => {
    setShiftScheduleId(id);
    setSelectedDayIndex(indexID);
    setEvent({ shift, employee, house });
    setGlobalState("selectedScheduleEvent", employeeshiftData);
  };

  const componentRef = useRef();
  const handleWeeklyCalendarPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const monthlyCalendarComponentRef = useRef();
  const handleMonthlyCalendarPrint = useReactToPrint({
    content: () => monthlyCalendarComponentRef.current,
  });


  const [employeeShiftError] = useGlobalState("employeeShiftError");

  const clearErrorMessage = () => {
    setGlobalState("employeeShiftError", "");
  };

  return (
    <>
      {/* Page Wrapper */}
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={() => toggleMobileMenu()} />
        <Sidebar />
        <Body className="page-wrapper">
          <Helmet>
            <title>Shift &amp; Schedule - Peepal Tree HRMS</title>
            <meta name="description" content="Login page" />
          </Helmet>
          {/* Page Content */}
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Daily Scheduling</h3>
                  <ul className="breadcrumb breadcrumb-nav">
                    <li className="breadcrumb-item">
                      <Link to="/app/shiftschedule/house">
                        House: {""}
                        <span>
                          {isHouseDataLoading ? (
                            <span className="skeleton-container1">
                              <span className="skeleton-content1">
                                <div
                                  style={{ width: "70px" }}
                                  className="skeleton-line3"
                                ></div>
                              </span>
                            </span>
                          ) : (
                            houseName
                          )}
                        </span>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Shift Scheduling</li>
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
                    onClick={() => setGlobalState("showShiftModal", true)}
                  >
                    {" "}
                    Add Shifts
                  </a>
                  {views === "weeklyView" && (
                    <a
                      className="btn add-btn m-r-5"
                      onClick={() => setViews("monthlyView")}
                    >
                      {" "}
                      Monthly View
                    </a>
                  )}
                  {views === "monthlyView" && (
                    <a
                      className="btn add-btn m-r-5"
                      onClick={() => setViews("weeklyView")}
                    >
                      {" "}
                      Weekly View
                    </a>
                  )}
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
              <div className="col-sm-6 col-md-3">
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
              <div className="col-sm-6 col-md-3">
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
              <div className="col-sm-6 col-md-3">
                <a href="#" className="btn btn-success btn-block w-100">
                  {" "}
                  Search{" "}
                </a>
              </div>
            </div>
            {/* Search Filter */}
            <NavContainer>
              <div className="print-btn-div">
                <NavButton
                  onClick={
                    views === "weeklyView"
                      ? handleWeeklyCalendarPrint
                      : handleMonthlyCalendarPrint
                  }
                  onMouseEnter={() => setIsPrint(true)}
                  onMouseLeave={() => setIsPrint(false)}
                  className="btn btn-white print-btn"
                >
                  <i className="fa fa-print fa-lg" /> Print
                </NavButton>
              </div>
              <div className="nav-btn-div">
                <NavButton
                  onClick={() =>
                    views === "weeklyView"
                      ? handleNavigation("prev")
                      : monthlyNavigation("prev")
                  }
                  className="btn btn-success"
                >
                  Prev {views === "weeklyView" ? "Week" : "Month"}
                </NavButton>
                <NavButton
                  onClick={() =>
                    views === "weeklyView"
                      ? handleNavigation("current")
                      : monthlyNavigation("current")
                  }
                  className="btn btn-success"
                  style={{
                    opacity:
                      views === "weeklyView"
                        ? dateCounter === 0
                          ? "0.3"
                          : "1"
                        : monthCounter === 0
                        ? "0.3"
                        : "1",
                    cursor:
                      views === "weeklyView"
                        ? dateCounter === 0
                          ? "not-allowed"
                          : "pointer"
                        : monthCounter === 0
                        ? "not-allowed"
                        : "pointer",
                    color:
                      views === "weeklyView"
                        ? dateCounter === 0
                          ? "black"
                          : "white"
                        : monthCounter === 0
                        ? "black"
                        : "white",
                  }}
                >
                  Current {views === "weeklyView" ? "Week" : "Month"}
                </NavButton>
                <NavButton
                  onClick={() =>
                    views === "weeklyView"
                      ? handleNavigation("next")
                      : monthlyNavigation("next")
                  }
                  className="btn btn-success"
                >
                  Next {views === "weeklyView" ? "Week" : "Month"}
                </NavButton>
              </div>
            </NavContainer>
            <span style={{ color: "red", fontSize: "0.7rem" }}>
              {employeeShiftError?.length > 0 && (
                <>
                  Error: {employeeShiftError}
                  <button
                    onClick={clearErrorMessage}
                    style={{
                      marginLeft: "10px",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      color: "black",
                    }}
                  >
                    <i className="fa fa-times" />
                    Clear Error
                  </button>
                </>
              )}
            </span>
            {views === "weeklyView" && (
              <WeeklyComponent
                activeCurrentDate={activeCurrentDate}
                recentDates={recentDates}
                ref={componentRef}
                checkPrint={isPrint}
                selectedHouse={selectedHouse}
                houseId={houseId}
                handleMondayShift={handleMondayShift}
                handleMondayShiftIndex={handleMondayShiftIndex}
                handleTuesDayShift={handleTuesDayShift}
                handleTuesdayShiftIndex={handleTuesdayShiftIndex}
                handleWednesdayShift={handleWednesdayShift}
                handleWednesdayShiftIndex={handleWednesdayShiftIndex}
                handleThursdayShift={handleThursdayShift}
                handleThursdayShiftIndex={handleThursdayShiftIndex}
                handleFridayShift={handleFridayShift}
                handleFridayShiftIndex={handleFridayShiftIndex}
                handlSaturdayShift={handlSaturdayShift}
                handleSaturdayShiftIndex={handleSaturdayShiftIndex}
                handleSundayShift={handleSundayShift}
                handleSundayShiftIndex={handleSundayShiftIndex}
                employeeshiftData={employeeshiftData}
                DefaultImage={DefaultImage}
                allEmployee={allEmployee}
                houseEmployeeData={houseEmployeeData}
                shiftData={shiftData}
                dayMonthYear={dayMonthYear}
                isHouseEmployeeLoading={isHouseEmployeeLoading}
                isHouseDataLoading={isHouseDataLoading}
                isLoading={isLoading}
                isShiftLoading={isShiftLoading}
                roleData={roleData}
              />
            )}
            {views === "monthlyView" && (
              <MonthlyComponent
                dayNames={dayNames}
                currentMonthName={currentMonthName}
                currentYear={currentYear}
                DefaultImage={DefaultImage}
                tableData={tableData}
                houseEmployeeData={houseEmployeeData}
                houseId={houseId}
                employeeshiftData={employeeshiftData}
                ref={monthlyCalendarComponentRef}
                shiftData={shiftData}
                allEmployee={allEmployee}
              />
            )}
            {/* /Content End */}
          </div>
          {/* /Page Content */}
        </Body>
      </div>
      {/* /Page Wrapper */}
      {/* Add Schedule Modal */}
      {showShiftModal && <AddShift dispatchShift={dispatchShift} />}
      {showAddSchedul && (
        <AddSchedule
          employeeId={employeeId}
          dispatchSchedule={dispatchSchedule}
          selectedDay={selectedDay}
          selectedDayIndex={selectedDayIndex}
          shiftData={shiftData}
          event={event}
          houseId={houseId}
          shiftScheduleId={shiftScheduleId}
        />
      )}
    </>
  );
}

export default ShiftScheduling;
