import React, { useEffect, useState, useReducer, Fragment, useRef } from "react";
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
import {
  Body,
  DesignationDiv,
  NavContainer,
  NavButton,
} from "../Employees/Employees/styles";
import {
  initDept,
  savedDeptReducer,
  initShiftList,
  savedShiftListReducer,
  initHouse,
  savedHouseReducer,
  initScheduleEvent,
  savedScheduleEventReducer,
  initUserAccount,
  savedUserAccountReducer,
} from "../../utils/localStorage";
import {
  useHouseFetching,
  useDataFetching,
  useHouseEmployeeFetching,
} from "../../utils/employeeCustomFetchHook";
import { BaseUrl } from "../../utils/baseUrl";
import axios from "axios";
import "regenerator-runtime/runtime";
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

  const { houseData, isHouseDataLoading, houseError } = useHouseFetching();
  const { data: allEmployee } = useDataFetching();
  const { houseEmployeeData } = useHouseEmployeeFetching();

  const selecetedHome = houseData?.find((house) => house.id === houseId);
  const houseName = selecetedHome?.name;
  
  // const selectedHouseEmployee = 


  // const [isSelectedLoading, setIsSelectedLoading] = useState(false);
  // const [getSelectedData, setGetSelectedData] = useState();
  // console.log("🚀 ~ file: shiftscheduling.jsx:128 ~ ShiftScheduling ~ getSelectedData:", getSelectedData)

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchHouseSelectedData = async () => {
  //     try {
  //       setIsSelectedLoading(true);
  //       const response = await axios.get(
  //         `${BaseUrl}/house/details/${houseId}/?format=json`
  //       );
  //       if (isMounted) {
  //         setGetSelectedData(response.data);
  //         setIsSelectedLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       setIsSelectedLoading(false);
  //     }
  //   };
  //   houseId != null ? fetchHouseSelectedData() : null;

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [houseId]);


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

  const [userAcct] = useReducer(
    savedUserAccountReducer,
    [],
    initUserAccount
  );

  useEffect(() => {
    localStorage.setItem("userAccount", JSON.stringify(userAcct));
  }, [userAcct])

  const [employeeAccts, setEmployeeAccts] = useState();
  useEffect(() => {
    setEmployeeAccts(userAcct);
  }, [userAcct]);

  const [employeeId, setEmployeeId] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
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
  ) => {
    setSelectedDayIndex(index);
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
  ) => {
    setSelectedDayIndex(index);
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
  ) => {
    setSelectedDayIndex(index);
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
  ) => {
    setSelectedDayIndex(index);
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
  ) => {
    setSelectedDayIndex(index);
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
  ) => {
    setSelectedDayIndex(index);
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
  ) => {
    setSelectedDayIndex(index);
    setEvent({ shifts, employeeId, houseId });
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  };

  const componentRef = useRef();
  const handleWeeklyCalendarPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const monthlyCalendarComponentRef = useRef();
  const handleMonthlyCalendarPrint = useReactToPrint({
    content: () => monthlyCalendarComponentRef.current,
  });

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
            <NavContainer>
              <div className="print-btn-div">
                <NavButton
                  onClick={
                    views === "weeklyView"
                      ? handleWeeklyCalendarPrint
                      : handleMonthlyCalendarPrint
                  }
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
            {views === "weeklyView" && (
              <WeeklyComponent
                activeCurrentDate={activeCurrentDate}
                recentDates={recentDates}
                ref={componentRef}
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
                scheduleEvent={scheduleEvent}
                DefaultImage={DefaultImage}
                allEmployee={allEmployee}
                houseEmployeeData={houseEmployeeData}
              />
            )}
            {views === "monthlyView" && (
              <MonthlyComponent
                dayNames={dayNames}
                currentMonthName={currentMonthName}
                currentYear={currentYear}
                DefaultImage={DefaultImage}
                tableData={tableData}
                selectedHouse={selectedHouse}
                houseId={houseId}
                scheduleEvent={scheduleEvent}
                employeeAccts={employeeAccts}
                ref={monthlyCalendarComponentRef}
              />
            )}
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
        />
      )}
    </>
  );
}

export default ShiftScheduling;
