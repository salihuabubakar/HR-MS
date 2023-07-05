import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

class MonthlyComponent extends React.Component {
  render() {
    const {
      houseId: accomodationId,
      dayNames,
      currentMonthName,
      currentYear,
      tableData,
      DefaultImage,
      allEmployee,
      houseEmployeeData,
      shiftData,
      employeeshiftData,
      handleMonthShiftEdit,
    } = this.props;

    // const handleDayShiftIndex = (
    //   shifts,
    //   employeeId,
    //   houseId,
    //   shiftIndex,
    //   weekIndex,
    //   dayIndex,
    //   dayFigure
    // ) => {
    //   const eve = {
    //     shifts,
    //     employeeId,
    //     houseId,
    //     shiftIndex,
    //     weekIndex,
    //     dayIndex,
    //     dayFigure,
    //   };
    //   console.log("eve..", eve);
    // };

    // const handleDayEvent = (weekIndex, dayIndex, dayFigure) => {
    //   const evt = {
    //     weekIndex,
    //     dayIndex,
    //     dayFigure,
    //   };
    //   console.log("daysInMonth..", evt);
    // };


    const Shifts = ({
      label,
      photo,
      id,
      employeeId,
      houseId,
      shifts,
      handleDayShiftIndex,
      shiftIndex
    }) => {
      return (
        <>
          <div
            onClick={() =>
              handleDayShiftIndex(
                shifts,
                employeeId,
                houseId,
                shiftIndex,
                id
              )
            }
            style={{ margin: "3px 0" }}
            key={id}
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
                <span className="userrole-info">
                  <img
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50px",
                      backgroundColor: "#00000000",
                    }}
                    src={photo ? photo : DefaultImage}
                  />{" "}
                  {label}
                </span>
              </a>
            </h2>
          </div>
        </>
      );
    };

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <div>
              <p>
                Scheduled Shift for{" "}
                <span style={{ fontWeight: "bolder" }}>
                  {currentMonthName} {currentYear}
                </span>
              </p>
            </div>
            {/*  */}
            <table className="table table-striped custom-table">
              <thead>
                <tr>
                  {dayNames?.map((data, index) => {
                    return (
                      <th
                        style={{
                          borderRight: "1px solid grey",
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
                          return (
                            <td style={{ cursor: "default" }} key={dayIndex}>
                              <span
                                // onClick={() =>
                                //   handleDayEvent(
                                //     weekIndex,
                                //     dayIndex,
                                //     dayFigure
                                //   )
                                // }
                                style={{
                                  backgroundColor:
                                    isCurrentDateTrue && "#9BA4B5",
                                  borderRadius: isCurrentDateTrue && "50px",
                                  padding: isCurrentDateTrue && "3px",
                                  opacity: !isCurrentMonth && "0.7",
                                }}
                              >
                                {dayFigure}
                              </span>
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
                                            <Fragment key={empIndex}>
                                              {employeeshiftData?.map(
                                                (event, shiftIndex) => {
                                                  const {
                                                    id,
                                                    employee,
                                                    house,
                                                    date,
                                                    shift,
                                                  } = event;
                                                  if (
                                                    date ===
                                                      `${dayName} ${dayFigure} ${month} ${year}` &&
                                                    value === employee &&
                                                    house === accomodationId
                                                  ) {
                                                    return (
                                                      <Fragment
                                                        key={shiftIndex}
                                                      >
                                                        {shiftData?.map(
                                                          (shifts, i) => {
                                                            if (
                                                              shifts.id ===
                                                              shift
                                                            ) {
                                                              return (
                                                                <div
                                                                  style={{
                                                                    margin:
                                                                      "3px 0",
                                                                  }}
                                                                  key={i}
                                                                  className="user-add-shedule-list"
                                                                >
                                                                  <h2>
                                                                    <a
                                                                      style={{
                                                                        border:
                                                                          "2px dashed #1eb53a",
                                                                        cursor:
                                                                          "default",
                                                                      }}
                                                                    >
                                                                      <span>{`${
                                                                        shifts.name
                                                                      } ${moment(
                                                                        shifts.start_time,
                                                                        "HH:mm"
                                                                      ).format(
                                                                        "hh:mm A"
                                                                      )} - ${moment(
                                                                        shifts.end_time,
                                                                        "HH:mm"
                                                                      ).format(
                                                                        "hh:mm A"
                                                                      )}`}</span>
                                                                      <span className="userrole-info">
                                                                        <img
                                                                          style={{
                                                                            width:
                                                                              "20px",
                                                                            height:
                                                                              "20px",
                                                                            borderRadius:
                                                                              "50px",
                                                                            backgroundColor:
                                                                              "#00000000",
                                                                          }}
                                                                          src={
                                                                            photo
                                                                              ? photo
                                                                              : DefaultImage
                                                                          }
                                                                        />{" "}
                                                                        {`${first_name} ${middle_name} ${last_name}`}
                                                                      </span>
                                                                    </a>
                                                                  </h2>
                                                                </div>
                                                              );
                                                            }
                                                          }
                                                        )}
                                                      </Fragment>
                                                    );
                                                  }
                                                }
                                              )}
                                            </Fragment>
                                          );
                                        }
                                      })}
                                    </Fragment>
                                  );
                                }
                              })}
                            </td>
                          );
                        })}
                      </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MonthlyComponent;
