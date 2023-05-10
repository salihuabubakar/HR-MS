import React, {Fragment} from "react";
import { Link } from "react-router-dom";

class WeeklyComponent extends React.Component {
  render() {
    const {
      recentDates,
      activeCurrentDate,
      selectedHouse,
      houseId,
      employeeId,
      handleMondayShift,
      handleMondayShiftIndex,
      handleTuesDayShift,
      handleTuesdayShiftIndex,
      handleWednesdayShift,
      handleWednesdayShiftIndex,
      handleThursdayShift,
      handleThursdayShiftIndex,
      handleFridayShift,
      handleFridayShiftIndex,
      handlSaturdayShift,
      handleSaturdayShiftIndex,
      handleSundayShift,
      handleSundayShiftIndex,
      scheduleEvent,
      DefaultImage,
    } = this.props;


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
              handleDayShiftIndex(
                shifts,
                employeeId,
                houseId,
                indexID,
                indexID2
              )
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
    );
  }
}

export default WeeklyComponent;
