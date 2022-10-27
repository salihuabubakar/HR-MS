import React, { useEffect, useState, useReducer, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from 'react-router-dom';
import  Addschedule from "../../../_components/modelbox/Addschedule"
import { useLocation } from "react-router-dom";
import { initHouse, savedHouseReducer, initShiftEvent, savedShiftEventReducer } from '../../../utils/localStorage';
import Select from "react-select";
import { useGlobalState, setGlobalState } from "../../../context/GlobalState";
import Smile from "../../../assets/img/smile.png";
import { Body } from "./styles.js";
import { 
  initDept, 
  savedDeptReducer,
  initUserAccount,
  savedUserAccountReducer, 
} from "../../../utils/localStorage";
import "./styles.js"

const ShiftScheduling = () => {
  const location = useLocation();
  const { id: houseId } = location?.state;

  console.log("houseId", houseId);

  const [showModal] = useGlobalState("showModal");
  const [selectedShiftEvent] = useGlobalState("selectedShiftEvent");

  const [shift, dispatchShift] = useReducer(savedShiftEventReducer, [], initShiftEvent)
  useEffect(() => {
    localStorage.setItem("shiftEvent", JSON.stringify(shift));
  }, [shift]);
  useEffect(() => {
    if (!showModal) {
      setGlobalState("selectedShiftEvent", "");
    }
  }, [showModal]);


  const [shiftEvents, setShiftEvents] = useState();
  useEffect(() => {
    setShiftEvents(shift);
  }, [shift]);

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

  console.log("selectedHouse", selectedHouse);

  const handleDeptChange = (event) => {
    console.log(event);
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

  const {log} = console;

  const [employeeId, setEmployeeId] = useState();
  const [employeeSelectedIndex, setEmployeeSelectedIndex] = useState();
  const [selecteDay, setSelectedDay] = useState();
  const [selecteDayIndex, setSelectedDayIndex] = useState();

  const handleMondayShift = (index, value) => {
    log("SelectedEvent: Monday", index);
    setEmployeeId(value);
    setEmployeeSelectedIndex(index);
    setSelectedDay("Monday");
    setGlobalState("showModal", true);
  };

  const handleMondayShiftIndex = (index) => {
    console.log("handleMondayShiftIndex: ", index);
    setSelectedDayIndex(index);
    setGlobalState("selectedShiftEvent", shiftEvents);
  }

  const handleTuesDayShift = (index, value) => {
    log("SelectedEvent: Tuesday", index);
    setEmployeeId(value);
    setEmployeeSelectedIndex(index);
    setSelectedDay("Tuesday");
    setGlobalState("showModal", true);
  };

  const handleTuesdayShiftIndex = (index) => {
    console.log("handleTuesdayShiftIndex: ", index);
    setSelectedDayIndex(index);
    setGlobalState("selectedShiftEvent", shiftEvents);
  };

  const handleWednesdayShift = (index, value) => {
    log("SelectedEvent: Wednesday", index);
    setEmployeeId(value);
    setEmployeeSelectedIndex(index);
    setSelectedDay("Wednesday");
    setGlobalState("showModal", true);
  };

  const handleWednesdayShiftIndex = (index) => {
    console.log("handleWednesdayShiftIndex: ", index);
    setGlobalState("selectedShiftEvent", shiftEvents);
    setSelectedDayIndex(index);
  };

  const handleThursdayShift = (index, value) => {
    log("SelectedEvent: Thursday", index);
    setEmployeeId(value);
    setEmployeeSelectedIndex(index);
    setSelectedDay("Thursday");
    setGlobalState("showModal", true);
  };

  const handleThursdayShiftIndex = (index) => {
    console.log("handleThursdayShiftIndex: ", index);
    setGlobalState("selectedShiftEvent", shiftEvents);
    setSelectedDayIndex(index);
  };

  const handleFridayShift = (index, value) => {
    log("SelectedEvent: Friday", index);   
    setEmployeeId(value);
    setEmployeeSelectedIndex(index);
    setSelectedDay("Friday");
    setGlobalState("showModal", true);
  };

  const handleFridayShiftIndex = (index) => {
    console.log("handleFridayShiftIndex: ", index);
    setGlobalState("selectedShiftEvent", shiftEvents);
    setSelectedDayIndex(index);
  };

  const handlSaturdayShift = (index, value) => {
    log("SelectedEvent: Saturday", index);
    setEmployeeId(value);
    setEmployeeSelectedIndex(index);
    setSelectedDay("Saturday");
    setGlobalState("showModal", true);
  };

  const handleSaturdayShiftIndex = (index) => {
    console.log("handleSaturdayShiftIndex: ", index);
    setGlobalState("selectedShiftEvent", shiftEvents);
    setSelectedDayIndex(index);
  };

  const handleSundayShift = (index, value) => {
    log("SelectedEvent: Sunday", index);
    setEmployeeId(value);
    setEmployeeSelectedIndex(index);
    setSelectedDay("Sunday");
    setGlobalState("showModal", true);
  };

  const handleSundayShiftIndex = (index) => {
    console.log("handleSundayShiftIndex: ", index);
    setGlobalState("selectedShiftEvent", shiftEvents);
    setSelectedDayIndex(index);
  };

  console.log("selecteDay: ", selecteDay);
  console.log("selecteDayIndex: ", selecteDayIndex);
  console.log("employeeSelectedIndex: ", employeeSelectedIndex);
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
              {/* <div className="col-auto float-end ml-auto">
                <Link
                  to="/app/employee/shift-list"
                  className="btn add-btn m-r-5"
                >
                  Shifts
                </Link>
                <a
                  href="#"
                  className="btn add-btn m-r-5"
                  data-bs-toggle="modal"
                  data-bs-target="#add_schedule"
                >
                  {" "}
                  Assign Shifts
                </a>
              </div> */}
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
              <div className="form-group form-focus select-focus">
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
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-striped custom-table">
                  <thead>
                    <tr>
                      <th style={{ borderRight: "1px solid grey" }}>
                        Scheduled Shift
                      </th>
                      <th style={{ borderRight: "1px solid grey" }}>Mon</th>
                      <th style={{ borderRight: "1px solid grey" }}>Tue</th>
                      <th style={{ borderRight: "1px solid grey" }}>Wed</th>
                      <th style={{ borderRight: "1px solid grey" }}>Thu</th>
                      <th style={{ borderRight: "1px solid grey" }}>Fri</th>
                      <th style={{ borderRight: "1px solid grey" }}>Sat</th>
                      <th>Sun</th>
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
                              {shiftEvents?.map((events, indexID) => {
                                const {
                                  id,
                                  startTime,
                                  endTime,
                                  selecteDay,
                                  employeeId: eId,
                                  employeeSelectedIndex: indexId,
                                } = events;
                                if (
                                  value === eId &&
                                  index === indexId &&
                                  selecteDay === "Monday"
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
                                          <span className="username-info m-b-10">
                                            {startTime} - {endTime}
                                          </span>
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
                              {shiftEvents?.map((events, indexID) => {
                                const {
                                  id,
                                  startTime,
                                  endTime,
                                  selecteDay,
                                  employeeId: eId,
                                  employeeSelectedIndex: indexId,
                                } = events;
                                if (
                                  value === eId &&
                                  index === indexId &&
                                  selecteDay === "Tuesday"
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
                                          <span className="username-info m-b-10">
                                            {startTime} - {endTime}
                                          </span>
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
                              {shiftEvents?.map((events, indexID) => {
                                const {
                                  id,
                                  startTime,
                                  endTime,
                                  selecteDay,
                                  employeeId: eId,
                                  employeeSelectedIndex: indexId,
                                } = events;
                                if (
                                  value === eId &&
                                  index === indexId &&
                                  selecteDay === "Wednesday"
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
                                          <span className="username-info m-b-10">
                                            {startTime} - {endTime}
                                          </span>
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
                              {shiftEvents?.map((events, indexID) => {
                                const {
                                  id,
                                  startTime,
                                  endTime,
                                  selecteDay,
                                  employeeId: eId,
                                  employeeSelectedIndex: indexId,
                                } = events;
                                if (
                                  value === eId &&
                                  index === indexId &&
                                  selecteDay === "Thursday"
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
                                          <span className="username-info m-b-10">
                                            {startTime} - {endTime}
                                          </span>
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
                              {shiftEvents?.map((events, indexID) => {
                                const {
                                  id,
                                  startTime,
                                  endTime,
                                  selecteDay,
                                  employeeId: eId,
                                  employeeSelectedIndex: indexId,
                                } = events;
                                if (
                                  value === eId &&
                                  index === indexId &&
                                  selecteDay === "Friday"
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
                                          <span className="username-info m-b-10">
                                            {startTime} - {endTime}
                                          </span>
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
                              {shiftEvents?.map((events, indexID) => {
                                const {
                                  id,
                                  startTime,
                                  endTime,
                                  selecteDay,
                                  employeeId: eId,
                                  employeeSelectedIndex: indexId,
                                } = events;
                                if (
                                  value === eId &&
                                  index === indexId &&
                                  selecteDay === "Saturday"
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
                                          <span className="username-info m-b-10">
                                            {startTime} - {endTime}
                                          </span>
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
                              {shiftEvents?.map((events, indexID) => {
                                const {
                                  id,
                                  startTime,
                                  endTime,
                                  selecteDay,
                                  employeeId: eId,
                                  employeeSelectedIndex: indexId,
                                } = events;
                                if (
                                  value === eId &&
                                  index === indexId &&
                                  selecteDay === "Sunday"
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
                                          <span className="username-info m-b-10">
                                            {startTime} - {endTime}
                                          </span>
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
      {showModal && (
        <Addschedule
          employeeId={employeeId}
          employeeSelectedIndex={employeeSelectedIndex}
          dispatchShift={dispatchShift}
          selecteDay={selecteDay}
          selecteDayIndex={selecteDayIndex}
        />
      )}
    </>
  );
}

export default ShiftScheduling;
