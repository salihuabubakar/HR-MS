import React, { useEffect, useState, useReducer, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from 'react-router-dom';
import  AddShift from "../../../_components/modelbox/AddShift"
import AddSchedule from "../../../_components/modelbox/Addschedule";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { useGlobalState, setGlobalState } from "../../../context/GlobalState";
import Smile from "../../../assets/img/smile.png";
import { Body } from "./styles.js";
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
} from "../../../utils/localStorage";
import "./styles.js"
import "regenerator-runtime/runtime";


const ShiftScheduling = () => {
  const location = useLocation();
  const houseId = location?.state?.id;

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

  const selectedHouse = houseList?.find((staff) =>  staff.id === houseId );

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
  const [activeCurrentDate, setActiveCurrentDate] = useState();


  let curr = new Date();

  new Date(curr.setDate(dateCounter == 0 ? curr.getDate() : dateCounter));
  let results = [];

  var isCurrentDateTrue;

  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    let month = day.split("").slice(5, 7).join("");
    switch (month) {
      case "01":
        month = "Jan";
        break;
      case "02":
        month = "Feb";
        break;
      case "03":
        month = "Mar";
        break;
      case "04":
        month = "Apr";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "Jun";
        break;
      case "07":
        month = "Jul";
        break;
      case "08":
        month = "Aug";
        break;
      case "09":
        month = "Sep";
        break;
      case "10":
        month = "Oct";
        break;
      case "11":
        month = "Nov";
        break;
      case "12":
        month = "Dec";
        break;
      default:
        console.log("Error, Month doesn't exist");
        break;
    }
    
    day = day.split("").slice(8).join("");
    results.push(day + " " + month);

    let currentActiveDate = new Date().toISOString().slice(9, 10);
    if(first.toString().includes(currentActiveDate)) {
      isCurrentDateTrue = true;
    }
  }

  console.log("isCurrentDateTrue", isCurrentDateTrue);

  const [employeeId, setEmployeeId] = useState();
  const [employeeSelectedIndex, setEmployeeSelectedIndex] = useState();
  const [selecteDay, setSelectedDay] = useState();
  const [selectedDayIndex, setSelectedDayIndex] = useState();

  const handleMondayShift = (index, value) => {
    setEmployeeId(value);
    setEmployeeSelectedIndex(index);
    setSelectedDay("Mon " + results[0]);
    setGlobalState("showAddSchedul", true);
  };

  const handleMondayShiftIndex = (index) => {
    console.log("handleMondayShiftIndex: ", index);
    
    setSelectedDayIndex(index);
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  }

  const handleTuesDayShift = (index, value) => {
    setEmployeeId(value);
    setEmployeeSelectedIndex(index);
    setSelectedDay("Tue " + results[1]);
    setGlobalState("showAddSchedul", true);
  };

  const handleTuesdayShiftIndex = (index) => {
    console.log("handleTuesdayShiftIndex: ", index);
    setSelectedDayIndex(index);
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  };

  const handleWednesdayShift = (index, value) => {
    setEmployeeId(value);
    setEmployeeSelectedIndex(index);
    setSelectedDay("Wed " + results[2]);
    setGlobalState("showAddSchedul", true);
  };

  const handleWednesdayShiftIndex = (index) => {
    console.log("handleWednesdayShiftIndex: ", index);
    setSelectedDayIndex(index);
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  };

  const handleThursdayShift = (index, value) => {
    setEmployeeId(value);
    setEmployeeSelectedIndex(index);
    setSelectedDay("Thu " + results[3]);
    setGlobalState("showAddSchedul", true);
  };

  const handleThursdayShiftIndex = (index) => {
    console.log("handleThursdayShiftIndex: ", index);
    setSelectedDayIndex(index);
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  };

  const handleFridayShift = (index, value) => { 
    setEmployeeId(value);
    setEmployeeSelectedIndex(index);
    setSelectedDay("Fri " + results[4]);
    setGlobalState("showAddSchedul", true);
  };

  const handleFridayShiftIndex = (index) => {
    setSelectedDayIndex(index);
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  };

  const handlSaturdayShift = (index, value) => {
    setEmployeeId(value);
    setEmployeeSelectedIndex(index);
    setSelectedDay("Sat " + results[5]);
    setGlobalState("showAddSchedul", true);
  };

  const handleSaturdayShiftIndex = (index) => {
    setSelectedDayIndex(index);
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  };

  const handleSundayShift = (index, value) => {
    setEmployeeId(value);
    setEmployeeSelectedIndex(index);
    setSelectedDay("Sun " + results[6]);
    setGlobalState("showAddSchedul", true);
  };

  const handleSundayShiftIndex = (index) => {
    setSelectedDayIndex(index);
    setGlobalState("selectedScheduleEvent", scheduleEvent);
  };

  return (
    <>
      {/* Page Wrapper */}
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
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/app/employee/house">House</Link>
                  </li>
                  <li className="breadcrumb-item active">Shift Scheduling</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <Link
                  to="/app/employee/shift-list"
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
            <div className="col-sm-6 col-md-3">
              <div className="field">
                <Select
                  onChange={handleDeptChange}
                  options={departments}
                  styles={customSelectStyles}
                  placeholder="Select Department"
                />
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
              onClick={() => setDateCounter((prev) => prev - 7)}
              style={{ border: "none", marginRight: "10px" }}
              className="btn btn-success btn-block w-10"
            >
              Prev Week
            </button>
            <button
              onClick={() => setDateCounter((prev) => prev * 0)}
              className="btn btn-success btn-block w-10"
              style={{ border: "none" }}
            >
              Current Week
            </button>
            <button
              onClick={() => setDateCounter((prev) => prev + 7)}
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
                      <th style={{ borderRight: "1px solid grey" }}>
                        Mon {results[0]}
                      </th>
                      <th style={{ borderRight: "1px solid grey" }}>
                        Tue {results[1]}
                      </th>
                      <th style={{ borderRight: "1px solid grey" }}>
                        Wed {results[2]}
                      </th>
                      <th style={{ borderRight: "1px solid grey" }}>
                        Thu {results[3]}
                      </th>
                      <th style={{ borderRight: "1px solid grey" }}>
                        Fri {results[4]}
                      </th>
                      <th style={{ borderRight: "1px solid grey" }}>
                        Sat {results[5]}
                      </th>
                      <th>Sun {results[6]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedHouse?.employee.map((staff, index) => {
                      const { value, label } = staff;
                      return (
                        <Fragment key={index}>
                          <tr>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/app/profile/employee-profile"
                                  className="avatar"
                                >
                                  <img src={Smile} />
                                </Link>
                                <Link to="/app/profile/employee-profile">
                                  {label}
                                  <span>Web Designer</span>
                                </Link>
                              </h2>
                            </td>

                            {/* {shiftEvents?.length === 0 ? ( */}
                            {/* <td
                                onClick={() => handleMondayShift(index, value)}
                              >
                                <div className="user-add-shedule-list">
                                  <a>
                                    <span>
                                      <i className="fa fa-plus" />
                                    </span>
                                  </a>
                                </div>
                              </td> */}
                            {/* ) : ( */}
                            <td
                              className="tool-tip"
                              onClick={() => handleMondayShift(index, value)}
                            >
                              <span className="tool-tip-text">
                                <a>
                                  <span>
                                    <i className="fa fa-plus" />
                                  </span>
                                </a>
                              </span>
                              {scheduleEvent?.map((events, indexID) => {
                                const {
                                  id,
                                  selecteDay,
                                  employeeId: eId,
                                  employeeSelectedIndex: indexId,
                                  shifts,
                                } = events;
                                if (
                                  value === eId &&
                                  index === indexId &&
                                  selecteDay === "Mon " + results[0]
                                ) {
                                  return (
                                    <div
                                      onClick={() =>
                                        handleMondayShiftIndex(indexID)
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
                                          <span className="userrole-info">
                                            Web Designer - {label}
                                          </span>
                                        </a>
                                      </h2>
                                    </div>
                                  );
                                }
                              })}
                            </td>
                            {/* )} */}

                            {/* {shiftEvents?.length === 0 ? (
                              <td
                                onClick={() => handleTuesDayShift(index, value)}
                              >
                                <div className="user-add-shedule-list">
                                  <a>
                                    <span>
                                      <i className="fa fa-plus" />
                                    </span>
                                  </a>
                                </div>
                              </td>
                            ) : ( */}
                            <td
                              className="tool-tip"
                              onClick={() => handleTuesDayShift(index, value)}
                            >
                              <span className="tool-tip-text">
                                <a>
                                  <span>
                                    <i className="fa fa-plus" />
                                  </span>
                                </a>
                              </span>
                              {scheduleEvent?.map((events, indexID) => {
                                const {
                                  id,
                                  selecteDay,
                                  employeeId: eId,
                                  employeeSelectedIndex: indexId,
                                  shifts,
                                } = events;
                                if (
                                  value === eId &&
                                  index === indexId &&
                                  selecteDay === "Tue " + results[1]
                                ) {
                                  return (
                                    <div
                                      onClick={() =>
                                        handleTuesdayShiftIndex(indexID)
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
                                          <span className="userrole-info">
                                            Web Designer - {label}
                                          </span>
                                        </a>
                                      </h2>
                                    </div>
                                  );
                                }
                              })}
                            </td>
                            {/* )} */}

                            {/* {shiftEvents?.length === 0 ? (
                              <td
                                onClick={() =>
                                  handleWednesdayShift(index, value)
                                }
                              >
                                <div className="user-add-shedule-list">
                                  <a>
                                    <span>
                                      <i className="fa fa-plus" />
                                    </span>
                                  </a>
                                </div>
                              </td>
                            ) : ( */}
                            <td
                              className="tool-tip"
                              onClick={() => handleWednesdayShift(index, value)}
                            >
                              <span className="tool-tip-text">
                                <a>
                                  <span>
                                    <i className="fa fa-plus" />
                                  </span>
                                </a>
                              </span>
                              {scheduleEvent?.map((events, indexID) => {
                                const {
                                  id,
                                  selecteDay,
                                  employeeId: eId,
                                  employeeSelectedIndex: indexId,
                                  shifts,
                                } = events;
                                if (
                                  value === eId &&
                                  index === indexId &&
                                  selecteDay === "Wed " + results[2]
                                ) {
                                  return (
                                    <div
                                      onClick={() =>
                                        handleWednesdayShiftIndex(indexID)
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
                                          <span className="userrole-info">
                                            Web Designer - {label}
                                          </span>
                                        </a>
                                      </h2>
                                    </div>
                                  );
                                }
                              })}
                            </td>
                            {/* )} */}

                            {/* {shiftEvents?.length === 0 ? (
                              <td
                                onClick={() =>
                                  handleThursdayShift(index, value)
                                }
                              >
                                <div className="user-add-shedule-list">
                                  <a>
                                    <span>
                                      <i className="fa fa-plus" />
                                    </span>
                                  </a>
                                </div>
                              </td>
                            ) : ( */}
                            <td
                              className="tool-tip"
                              onClick={() => handleThursdayShift(index, value)}
                            >
                              <span className="tool-tip-text">
                                <a>
                                  <span>
                                    <i className="fa fa-plus" />
                                  </span>
                                </a>
                              </span>
                              {scheduleEvent?.map((events, indexID) => {
                                const {
                                  id,
                                  selecteDay,
                                  employeeId: eId,
                                  employeeSelectedIndex: indexId,
                                  shifts,
                                } = events;
                                if (
                                  value === eId &&
                                  index === indexId &&
                                  selecteDay === "Thu " + results[3]
                                ) {
                                  return (
                                    <div
                                      onClick={() =>
                                        handleThursdayShiftIndex(indexID)
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
                                          <span className="userrole-info">
                                            Web Designer - {label}
                                          </span>
                                        </a>
                                      </h2>
                                    </div>
                                  );
                                }
                              })}
                            </td>
                            {/* )} */}

                            {/* {shiftEvents?.length === 0 ? (
                              <td
                                onClick={() => handleFridayShift(index, value)}
                              >
                                <div className="user-add-shedule-list">
                                  <a>
                                    <span>
                                      <i className="fa fa-plus" />
                                    </span>
                                  </a>
                                </div>
                              </td>
                            ) : ( */}
                            <td
                              className="tool-tip"
                              onClick={() => handleFridayShift(index, value)}
                            >
                              <span className="tool-tip-text">
                                <a>
                                  <span>
                                    <i className="fa fa-plus" />
                                  </span>
                                </a>
                              </span>
                              {scheduleEvent?.map((events, indexID) => {
                                const {
                                  id,
                                  selecteDay,
                                  employeeId: eId,
                                  employeeSelectedIndex: indexId,
                                  shifts,
                                } = events;
                                if (
                                  value === eId &&
                                  index === indexId &&
                                  selecteDay === "Fri " + results[4]
                                ) {
                                  return (
                                    <div
                                      onClick={() =>
                                        handleFridayShiftIndex(indexID)
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
                                          <span className="userrole-info">
                                            Web Designer - {label}
                                          </span>
                                        </a>
                                      </h2>
                                    </div>
                                  );
                                }
                              })}
                            </td>
                            {/* )} */}

                            {/* {shiftEvents?.length === 0 ? (
                              <td
                                onClick={() => handlSaturdayShift(index, value)}
                              >
                                <div className="user-add-shedule-list">
                                  <a>
                                    <span>
                                      <i className="fa fa-plus" />
                                    </span>
                                  </a>
                                </div>
                              </td>
                            ) : ( */}
                            <td
                              className="tool-tip"
                              onClick={() => handlSaturdayShift(index, value)}
                            >
                              <span className="tool-tip-text">
                                <a>
                                  <span>
                                    <i className="fa fa-plus" />
                                  </span>
                                </a>
                              </span>
                              {scheduleEvent?.map((events, indexID) => {
                                const {
                                  id,
                                  selecteDay,
                                  employeeId: eId,
                                  employeeSelectedIndex: indexId,
                                  shifts,
                                } = events;
                                if (
                                  value === eId &&
                                  index === indexId &&
                                  selecteDay === "Sat " + results[5]
                                ) {
                                  return (
                                    <div
                                      onClick={() =>
                                        handleSaturdayShiftIndex(indexID)
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
                                          <span className="userrole-info">
                                            Web Designer - {label}
                                          </span>
                                        </a>
                                      </h2>
                                    </div>
                                  );
                                }
                              })}
                            </td>
                            {/* )} */}

                            {/* {shiftEvents?.length === 0 ? (
                              <td
                                onClick={() => handleSundayShift(index, value)}
                              >
                                <div className="user-add-shedule-list">
                                  <a>
                                    <span>
                                      <i className="fa fa-plus" />
                                    </span>
                                  </a>
                                </div>
                              </td>
                            ) : ( */}
                            <td
                              className="tool-tip"
                              onClick={() => handleSundayShift(index, value)}
                            >
                              <span className="tool-tip-text">
                                <a>
                                  <span>
                                    <i className="fa fa-plus" />
                                  </span>
                                </a>
                              </span>
                              {scheduleEvent?.map((events, indexID) => {
                                const {
                                  id,
                                  selecteDay,
                                  employeeId: eId,
                                  employeeSelectedIndex: indexId,
                                  shifts,
                                } = events;
                                if (
                                  value === eId &&
                                  index === indexId &&
                                  selecteDay === "Sun " + results[6]
                                ) {
                                  return (
                                    <div
                                      onClick={() =>
                                        handleSundayShiftIndex(indexID)
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
                                          <span className="userrole-info">
                                            Web Designer - {label}
                                          </span>
                                        </a>
                                      </h2>
                                    </div>
                                  );
                                }
                              })}
                            </td>
                            {/* )} */}
                          </tr>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* /Content End */}
        </div>
        {/* /Page Content */}
      </Body>
      {/* /Page Wrapper */}
      {/* Add Schedule Modal */}
      {showModal && <AddShift dispatchShift={dispatchShift} />}
      {showAddSchedul && (
        <AddSchedule
          employeeId={employeeId}
          employeeSelectedIndex={employeeSelectedIndex}
          dispatchSchedule={dispatchSchedule}
          selecteDay={selecteDay}
          selectedDayIndex={selectedDayIndex}
          shiftList={shiftList}
          schedule={schedule}
        />
      )}
    </>
  );
}

export default ShiftScheduling;
