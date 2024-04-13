import React, { useEffect, useState, useReducer, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from 'react-router-dom';
import  AddShift from "../../_components/modelbox/AddShift"
import AddSchedule from "../../_components/modelbox/Addschedule";
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
import { Popup, Segment  } from "semantic-ui-react";
import moment from "moment";
import { SmallSingleLineLoader } from "../../_components/Loader";
import SearchComponent from "../../_components/searchComponent";

const ShiftScheduling = () => {
  const { id } = useParams();
  const houseId = parseInt(id, 10);
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

  const [isDarkMode] = useGlobalState("isDarkMode");

  useEffect(() => {
    if (!showAddSchedul) {
      setGlobalState("selectedScheduleEvent", "");
    }
  }, [showAddSchedul]);

/* The below code is using the `useReducer` hook in React to manage the state of a shift schedule for
employees. It is initializing the state with an empty array `[]` and creating a dispatch function
`dispatchSchedule` to update the state based on actions performed on the shift schedule. The
`add_update_delete_employee_shift` function is the reducer function that will handle the state
updates based on the actions dispatched. */
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

  /* The below code is using optional chaining (`?.`) to find a specific house object in an array
  called `houseData`. It is checking if the `houseData` array exists and if it does, it will find
  the house object that has an `id` property matching the `houseId` variable. The result of this
  operation is stored in the `selectedHouse` variable. */
  const selectedHouse = houseData?.find((house) => house.id === houseId);
  const houseName = selectedHouse?.name;

  const [employeeId, setEmployeeId] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [event, setEvent] = useState();
  const [shiftScheduleId, setShiftScheduleId] = useState(null)
  const [isPrint, setIsPrint] = useState(false);


  /**
   * The function `handleMondayShift` sets the employee ID, selected day, and global state to show the
   * add schedule component.
   */
  const handleMondayShift = (value) => {
    setEmployeeId(value);
    setSelectedDay(dayMonthYear[0]);
    setGlobalState("showAddSchedul", true);
  };

  /**
   * The function handles the selection of a shift on a specific day and updates the state with the
   * selected shift, employee, and house.
   */
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


  //The below code is a snipet of reactToPrintToPDF code, that allows the printing of a page into pdf
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
                  <h3 className="text-4xl text-orange-500">Daily Scheduling</h3>
                  <ul className="breadcrumb breadcrumb-nav">
                    <li className="breadcrumb-item">
                      <Link style={{color: `${isDarkMode ? '#6C757D' : '#625F5C'}`}} to="/app/shiftschedule/house">
                        Houses
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <span className="text-orange-400">
                        {isHouseDataLoading ? (
                          <SmallSingleLineLoader />
                        ) : (
                          houseName
                        )}
                      </span>
                    </li>
                    <li style={{color: `${isDarkMode ? '#625F5C' : '#6C757D'}`}} className="breadcrumb-item active">Shift Scheduling</li>
                  </ul>
                </div>
                <div className="col-auto col-sm-12 float-end ml-auto">
                  <Popup
                    style={{ backgroundColor: 'transparent' }}
                    inline
                    hoverable
                    position="bottom left"
                    delay={{
                      show: 300,
                      hide: 800,
                    }}
                    content={
                      <Segment.Group>
                        {shiftData?.map(shft => {
                          const { id, name, start_time, end_time, hours, status } = shft;
                          return (
                            <Segment className="border" style={{ width: "250px", backgroundColor: `${isDarkMode ? '#110C08' : 'white'}` }}>
                              <div className="ui column relaxed divided grid">
                                <div key={id} className="column">
                                  <h4 style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}}>{name}</h4>
                                  <div className="ui link list">
                                    <a  style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className="item">{`TIME: ${moment(start_time, "HH:mm").format("hh:mm A")} - ${moment(end_time, "HH:mm").format("hh:mm A")}`}</a>
                                    <a  style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className="item">{`HOURS: ${hours}`}</a>
                                    <a  style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}} className="item">{`STATUS: ${status}`}</a>
                                  </div>
                                </div>
                              </div>
                            </Segment>
                          )
                        })}
                      </Segment.Group>
                    }
                    trigger={
                      <a style={{color: 'white'}} className="browse item btn add-btn m-r-5">
                        Shifts<i className="dropdown icon"></i>
                      </a>
                    }
                  />
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
              <SearchComponent 
                searchType="Employee"
                searchQuery=""
                setSearchQuery={""}
              />
              <NavContainer>
                {/* <div className="print-btn-div">
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
                </div> */}
                <div className="nav-btn-div">
                  <NavButton
                    onClick={() =>
                      views === "weeklyView"
                        ? handleNavigation("prev")
                        : monthlyNavigation("prev")
                    }
                    className="btn add-btn m-r-5"
                  >
                    Prev {views === "weeklyView" ? "Week" : "Month"}
                  </NavButton>
                  <NavButton
                    onClick={() =>
                      views === "weeklyView"
                        ? handleNavigation("current")
                        : monthlyNavigation("current")
                    }
                    className="btn add-btn m-r-5"
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
                    className="btn add-btn m-r-5"
                  >
                    Next {views === "weeklyView" ? "Week" : "Month"}
                  </NavButton>
                </div>
              </NavContainer>
            {/* Search Filter */}
            <span style={{ color: `${isDarkMode ? '#EE6A0B' : 'red'}`, fontSize: `${isDarkMode ? '0.9rem' : '0.7rem'}` }}>
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
                    <svg width="13" height="15" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.1667 0.999756L14.7646 2.11753C15.1689 2.87322 15.371 3.25107 15.2374 3.41289C15.1037 3.57471 14.6635 3.44402 13.7831 3.18264C12.9029 2.92131 11.9684 2.78071 11 2.78071C5.75329 2.78071 1.5 6.90822 1.5 11.9998C1.5 13.6789 1.96262 15.2533 2.77093 16.6093M7.83333 22.9998L7.23536 21.882C6.83108 21.1263 6.62894 20.7484 6.7626 20.5866C6.89627 20.4248 7.33649 20.5555 8.21689 20.8169C9.0971 21.0782 10.0316 21.2188 11 21.2188C16.2467 21.2188 20.5 17.0913 20.5 11.9998C20.5 10.3206 20.0374 8.74623 19.2291 7.39023" stroke={`${isDarkMode ? '#EE6A0B' : 'red' }`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </>
              )}
            </span>
            {views === "weeklyView" && (
              <>
                {
                  isHouseEmployeeLoading ||
                  isHouseDataLoading || 
                  isLoading || 
                  isShiftLoading ? (
                    <div class="spinner">
                      <div class="loader"></div>
                    </div>
                  ) : (
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
                      isDarkMode={isDarkMode}
                    />
                  )
                }
              </>
              
            )}
            {views === "monthlyView" && (
              <>
                {
                  isHouseEmployeeLoading ||
                  isHouseDataLoading || 
                  isLoading || 
                  isShiftLoading  ? (
                    <div class="spinner">
                      <div class="loader"></div>
                    </div>
                  ) : (
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
                      isDarkMode={isDarkMode}
                    />
                  )
                }
              </>
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
