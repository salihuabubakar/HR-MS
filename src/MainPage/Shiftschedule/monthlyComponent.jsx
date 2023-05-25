import React, { Fragment } from "react";
import { Link } from "react-router-dom";

class MonthlyComponent extends React.Component {
  render() {
    const {
      selectedHouse: selectedAccomodation,
      houseId: accomodationId,
      scheduleEvent,
      dayNames,
      currentMonthName,
      currentYear,
      tableData,
      employeeAccts,
      DefaultImage,
    } = this.props;

    const handleDayShiftIndex = (
      shifts,
      employeeId,
      houseId,
      shiftIndex,
      weekIndex,
      dayIndex,
      dayFigure
    ) => {
      const eve = {
        shifts,
        employeeId,
        houseId,
        shiftIndex,
        weekIndex,
        dayIndex,
        dayFigure,
      };
      console.log("eve..", eve);
    };

    const handleDayEvent = (weekIndex, dayIndex, dayFigure) => {
      const evt = {
        weekIndex,
        dayIndex,
        dayFigure,
      };
      console.log("daysInMonth..", evt);
    };


    const Shifts = ({
      label,
      image,
      id,
      employeeId,
      houseId,
      shifts,
      handleDayShiftIndex,
      shiftIndex,
      weekIndex,
      dayIndex,
      dayFigure,
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
                weekIndex,
                dayIndex,
                dayFigure
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
                <span>{shifts.label}</span>
                <span className="userrole-info">
                  <img
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50px",
                      backgroundColor: "#00000000",
                    }}
                    src={image ? image : DefaultImage}
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
                    <>
                      <tr key={weekIndex}>
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
                            <>
                              <td key={dayIndex}>
                                <span
                                  onClick={() =>
                                    handleDayEvent(
                                      weekIndex,
                                      dayIndex,
                                      dayFigure
                                    )
                                  }
                                  style={{
                                    backgroundColor: isCurrentDateTrue && "#9BA4B5",
                                    borderRadius: isCurrentDateTrue && "50px",
                                    padding: isCurrentDateTrue && "3px",
                                    opacity: !isCurrentMonth && "0.7",
                                  }}
                                >
                                  {dayFigure}
                                </span>
                                {selectedAccomodation?.employee.map(
                                  (staff, index) => {
                                    const { value, label, image } = staff;
                                    return (
                                      <Fragment key={value}>
                                        {scheduleEvent?.map(
                                          (shift, shiftIndex) => {
                                              const {
                                                id,
                                                employeeId,
                                                houseId,
                                                selectedDay,
                                                shifts,
                                              } = shift;
                                              if (
                                                selectedDay ==
                                                  dayName +
                                                    " " +
                                                    dayFigure +
                                                    " " +
                                                    month &&
                                                value == employeeId &&
                                                houseId == accomodationId
                                              ) {
                                                return (
                                                  <Shifts
                                                    id={id}
                                                    employeeId={employeeId}
                                                    houseId={houseId}
                                                    shifts={shifts}
                                                    handleDayShiftIndex={
                                                      handleDayShiftIndex
                                                    }
                                                    shiftIndex={shiftIndex}
                                                    label={label}
                                                    image={image}
                                                    weekIndex={weekIndex}
                                                    dayIndex={dayIndex}
                                                    dayFigure={dayFigure}
                                                  />
                                                );
                                              }
                                          }
                                        )}
                                      </Fragment>
                                    );
                                  }
                                )}
                              </td>
                            </>
                          );
                        })}
                      </tr>
                    </>
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
