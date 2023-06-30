import React, {Fragment} from "react";
import moment from "moment";

class WeeklyComponent extends React.Component {
  render() {
    const {
      allEmployee,
      houseEmployeeData,
      recentDates,
      activeCurrentDate,
      shiftData,
      houseId: accomodationId,
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
      employeeshiftData,
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
      }) => {
        return (
          <div
            onClick={() =>
              handleDayShiftIndex(shifts, employeeId, houseId, indexID, id)
            }
            className="user-add-shedule-list"
          >
            <h2>
              <a
                style={{
                  border: "2px dashed #1eb53a",
                }}
              >
                {shiftData?.map((shift, i) => {
                  if (shift.id === shifts) {
                    return (
                      <span key={i}>{`${shift.name} ${moment(
                        shift.start_time,
                        "HH:mm"
                      ).format("hh:mm A")} - ${moment(
                        shift.end_time,
                        "HH:mm"
                      ).format("hh:mm A")}`}</span>
                    );
                  }
                })}
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
                {houseEmployeeData?.map((staff, index) => {
                  const { id: value, employee, house } = staff;
                    if (house === accomodationId) {
                      return (
                        <Fragment key={index}>
                          {allEmployee?.map((emp, empIndex) => {
                            const {
                              id: empId,
                              photo,
                              first_name,
                              middle_name,
                              last_name,
                            } = emp;
                            if (empId === employee) {
                              return (
                                <>
                                  <tr key={empIndex}>
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
                                            src={photo ? photo : DefaultImage}
                                          />
                                        </a>
                                        <a style={{ color: "#ff9b44" }}>
                                          {`${first_name} ${middle_name} ${last_name}`}
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
                                      {employeeshiftData?.map((events, indexID) => {
                                        const {
                                          id,
                                          employee,
                                          house,
                                          date,
                                          shift,
                                        } = events;
                                        if (
                                          house == accomodationId &&
                                          value === employee &&
                                          date.includes(recentDates[0])
                                        ) {
                                          return (
                                            <Shifts
                                              key={indexID}
                                              id={id}
                                              employeeId={employee}
                                              houseId={house}
                                              shifts={shift}
                                              handleDayShiftIndex={
                                                handleMondayShiftIndex
                                              }
                                              indexID={indexID}
                                              label={`${first_name} ${middle_name} ${last_name}`}
                                            />
                                          );
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
                                      {employeeshiftData?.map((events, indexID) => {
                                        const {
                                          id,
                                          employee,
                                          house,
                                          date,
                                          shift,
                                        } = events;
                                        if (
                                          house == accomodationId &&
                                          value === employee &&
                                          date.includes(recentDates[1])
                                        ) {
                                          return (
                                            <Shifts
                                              key={indexID}
                                              id={id}
                                              employeeId={employee}
                                              houseId={house}
                                              shifts={shift}
                                              handleDayShiftIndex={
                                                handleTuesdayShiftIndex
                                              }
                                              indexID={indexID}
                                              label={`${first_name} ${middle_name} ${last_name}`}
                                            />
                                          );
                                        }
                                      })}
                                    </td>
                                    <td
                                      className="tool-tip"
                                      onClick={() =>
                                        handleWednesdayShift(value)
                                      }
                                    >
                                      <span className="tool-tip-text">
                                        <a>
                                          <span>
                                            <i className="fa fa-plus" />
                                          </span>
                                        </a>
                                      </span>
                                      {employeeshiftData?.map((events, indexID) => {
                                        const {
                                          id,
                                          employee,
                                          house,
                                          date,
                                          shift,
                                        } = events;
                                        if (
                                          house == accomodationId &&
                                          value === employee &&
                                          date.includes(recentDates[2])
                                        ) {
                                          return (
                                            <Shifts
                                              key={indexID}
                                              id={id}
                                              employeeId={employee}
                                              houseId={house}
                                              shifts={shift}
                                              handleDayShiftIndex={
                                                handleWednesdayShiftIndex
                                              }
                                              indexID={indexID}
                                              label={`${first_name} ${middle_name} ${last_name}`}
                                            />
                                          );
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
                                      {employeeshiftData?.map((events, indexID) => {
                                        const {
                                          id,
                                          employee,
                                          house,
                                          date,
                                          shift,
                                        } = events;
                                        if (
                                          house == accomodationId &&
                                          value === employee &&
                                          date.includes(recentDates[3])
                                        ) {
                                          return (
                                            <Shifts
                                              key={indexID}
                                              id={id}
                                              employeeId={employee}
                                              houseId={house}
                                              shifts={shift}
                                              handleDayShiftIndex={
                                                handleThursdayShiftIndex
                                              }
                                              indexID={indexID}
                                              label={`${first_name} ${middle_name} ${last_name}`}
                                            />
                                          );
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
                                      {employeeshiftData?.map((events, indexID) => {
                                        const {
                                          id,
                                          employee,
                                          house,
                                          date,
                                          shift,
                                        } = events;
                                        if (
                                          house == accomodationId &&
                                          value === employee &&
                                          date.includes(recentDates[4])
                                        ) {
                                          return (
                                            <Shifts
                                              key={indexID}
                                              id={id}
                                              employeeId={employee}
                                              houseId={house}
                                              shifts={shift}
                                              handleDayShiftIndex={
                                                handleFridayShiftIndex
                                              }
                                              indexID={indexID}
                                              label={`${first_name} ${middle_name} ${last_name}`}
                                            />
                                          );
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
                                      {employeeshiftData?.map((events, indexID) => {
                                        const {
                                          id,
                                          employee,
                                          house,
                                          date,
                                          shift,
                                        } = events;
                                        if (
                                          house == accomodationId &&
                                          value === employee &&
                                          date.includes(recentDates[5])
                                        ) {
                                          return (
                                            <Shifts
                                              key={indexID}
                                              id={id}
                                              employeeId={employee}
                                              houseId={house}
                                              shifts={shift}
                                              handleDayShiftIndex={
                                                handleSaturdayShiftIndex
                                              }
                                              indexID={indexID}
                                              label={`${first_name} ${middle_name} ${last_name}`}
                                            />
                                          );
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
                                      {employeeshiftData?.map((events, indexID) => {
                                        const {
                                          id,
                                          employee,
                                          house,
                                          date,
                                          shift,
                                        } = events;
                                        if (
                                          house == accomodationId &&
                                          value === employee &&
                                          date.includes(recentDates[6])
                                        ) {
                                          return (
                                            <Shifts
                                              key={indexID}
                                              id={id}
                                              employeeId={employee}
                                              houseId={house}
                                              shifts={shift}
                                              handleDayShiftIndex={
                                                handleSundayShiftIndex
                                              }
                                              indexID={indexID}
                                              label={`${first_name} ${middle_name} ${last_name}`}
                                            />
                                          );
                                        }
                                      })}
                                    </td>
                                  </tr>
                                </>
                              );
                            }
                          })}
                        </Fragment>
                      );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default WeeklyComponent;
