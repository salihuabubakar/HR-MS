import React, {Fragment} from "react";
import moment from "moment";
import DynamicWeekSchedulePdf from './component/DynamicWeekSchedulePdf';
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import { styles } from "../../utils/helperFucntions";
class WeeklyComponent extends React.Component {
  render() {
    const {
      allEmployee,
      houseEmployeeData,
      recentDates,
      dayMonthYear,
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
      checkPrint,
      isHouseEmployeeLoading,
      isHouseDataLoading,
      isLoading,
      isShiftLoading,
      roleData,
      isDarkMode
    } = this.props;

    return (
      <>
        <div className="col-md-12">
          <ul className="breadcrumb breadcrumb-nav">
            <li className="breadcrumb-item">
              <PDFDownloadLink 
                document={
                  <DynamicWeekSchedulePdf 
                    recentDates={recentDates}
                    houseEmployeeData={houseEmployeeData}
                    accomodationId={accomodationId}
                    roleData={roleData}
                    allEmployee={allEmployee}
                    employeeshiftData={employeeshiftData}
                    dayMonthYear={dayMonthYear}
                    shiftData={shiftData}
                    checkPrint={checkPrint}
                  />
                } fileName={`Weekly-Schedule.pdf`}>
                {
                  ({ blob, url, loading, error }) => (
                    <div style={styles.btn}>
                      {loading ? 'Loading document' : (
                        <span
                          style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}
                        >
                          <i className="fa fa-download m-r-5" /> Download Schedule
                        </span>
                      )}
                    </div>
                  )
                }
              </PDFDownloadLink>
            </li>
            <li className="breadcrumb-item">
              <BlobProvider 
                document={
                  <DynamicWeekSchedulePdf 
                    recentDates={recentDates}
                    houseEmployeeData={houseEmployeeData}
                    accomodationId={accomodationId}
                    roleData={roleData}
                    allEmployee={allEmployee}
                    employeeshiftData={employeeshiftData}
                    dayMonthYear={dayMonthYear}
                    shiftData={shiftData}
                    checkPrint={checkPrint}
                  />
                }>
                {
                  ({ blob, url, loading, error }) => (
                    <a href={url} target="_blank" style={styles.btn}>
                      {loading ? 'Loading document' : (
                        <span 
                          style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}
                        >
                          <i className="fa fa-print m-r-5" /> Print Schedule
                        </span>
                      )}
                    </a>
                  )
                }
              </BlobProvider>
            </li>
          </ul>
        </div>



        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table  className="table table-striped custom-table">
                <thead>
                  <tr>
                    <th className="border" style={{backgroundColor: `${isDarkMode ? '#110C08' : 'white'}`, color: `${isDarkMode ? '#898888' : '#333'}`}}>
                      Scheduled Shift
                    </th>
                    {recentDates?.map((data, index) => {
                      return (
                        <th
                          key={index}
                          className="border"
                          style={{
                            backgroundColor: 
                              (data === recentDates[activeCurrentDate]) ? '#ddd' : (isDarkMode ? '#110C08' : 'white'),
                            color:
                              (data === recentDates[activeCurrentDate]) ? '#000' : (isDarkMode ? '#898888' : '#333')
                          }}
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
                              role
                            } = emp;
                            if (empId === employee) {
                              return (
                                <tr className="border border-gray-300  shadow-md" style={{ backgroundColor: `${isDarkMode ? '#110C08' : 'white'}`}} key={empIndex}>
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
                                        <span>
                                          {roleData?.map((r) => {
                                            if (r.id === role)
                                              return r.role_name;
                                          })}
                                          {!role && "---"}
                                        </span>
                                      </a>
                                    </h2>
                                  </td>
                                  <td
                                    className="tool-tip"
                                    onClick={() => handleMondayShift(value)}
                                  >
                                    {checkPrint && checkPrint ? null : (
                                      <span className="tool-tip-text">
                                        <a>
                                          <span>
                                            <i className="fa fa-plus" />
                                          </span>
                                        </a>
                                      </span>
                                    )}
                                    {employeeshiftData?.map(
                                      (events, indexID) => {
                                        const {
                                          id,
                                          employee,
                                          house,
                                          date,
                                          shift,
                                        } = events;
                                        if (
                                          house === accomodationId &&
                                          value === employee &&
                                          date === dayMonthYear[0]
                                        ) {
                                          return (
                                            <React.Fragment key={indexID}>
                                              {shiftData?.map((shifts, i) => {
                                                if (shifts.id === shift) {
                                                  return (
                                                    <div
                                                      key={i}
                                                      onClick={() =>
                                                        handleMondayShiftIndex(
                                                          shift,
                                                          employee,
                                                          house,
                                                          indexID,
                                                          id
                                                        )
                                                      }
                                                      className="user-add-shedule-list"
                                                    >
                                                      <h2>
                                                        <a
                                                          style={{
                                                            border:
                                                              "2px dashed #EE6A0B",
                                                          }}
                                                        >
                                                          <span style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}>
                                                            {`${shifts.name} 
                                                              ${moment(
                                                                shifts.start_time,
                                                                "HH:mm"
                                                              ).format(
                                                                "hh:mm A"
                                                              )} 
                                                              - ${moment(
                                                                shifts.end_time,
                                                                "HH:mm"
                                                              ).format(
                                                                "hh:mm A"
                                                              )}`}
                                                          </span>
                                                          <span className="userrole-info" style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}>
                                                            {roleData?.map((r) => {
                                                              if (r.id === role)
                                                                return r.role_name;
                                                            })} -{" "}
                                                            {`${first_name} ${middle_name} ${last_name}`}
                                                          </span>
                                                        </a>
                                                      </h2>
                                                    </div>
                                                  );
                                                }
                                              })}
                                            </React.Fragment>
                                          );
                                        }
                                      }
                                    )}
                                  </td>
                                  <td
                                    className="tool-tip"
                                    onClick={() => handleTuesDayShift(value)}
                                  >
                                    {checkPrint && checkPrint ? null : (
                                      <span className="tool-tip-text">
                                        <a>
                                          <span>
                                            <i className="fa fa-plus" />
                                          </span>
                                        </a>
                                      </span>
                                    )}
                                    {employeeshiftData?.map(
                                      (events, indexID) => {
                                        const {
                                          id,
                                          employee,
                                          house,
                                          date,
                                          shift,
                                        } = events;
                                        if (
                                          house === accomodationId &&
                                          value === employee &&
                                          date === dayMonthYear[1]
                                        ) {
                                          return (
                                            <React.Fragment key={indexID}>
                                              {shiftData?.map((shifts, i) => {
                                                if (shifts.id === shift) {
                                                  return (
                                                    <div
                                                      key={i}
                                                      onClick={() =>
                                                        handleTuesdayShiftIndex(
                                                          shift,
                                                          employee,
                                                          house,
                                                          indexID,
                                                          id
                                                        )
                                                      }
                                                      className="user-add-shedule-list"
                                                    >
                                                      <h2>
                                                        <a
                                                          style={{
                                                            border:
                                                              "2px dashed #EE6A0B",
                                                          }}
                                                        >
                                                          <span style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}>
                                                            {`${shifts.name} 
                                                              ${moment(
                                                                shifts.start_time,
                                                                "HH:mm"
                                                              ).format(
                                                                "hh:mm A"
                                                              )} 
                                                              - ${moment(
                                                                shifts.end_time,
                                                                "HH:mm"
                                                              ).format(
                                                                "hh:mm A"
                                                              )}`}
                                                          </span>
                                                          <span className="userrole-info" style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}>
                                                            {roleData?.map((r) => {
                                                              if (r.id === role)
                                                                return r.role_name;
                                                            })} -{" "}
                                                            {`${first_name} ${middle_name} ${last_name}`}
                                                          </span>
                                                        </a>
                                                      </h2>
                                                    </div>
                                                  );
                                                }
                                              })}
                                            </React.Fragment>
                                          );
                                        }
                                      }
                                    )}
                                  </td>
                                  <td
                                    className="tool-tip"
                                    onClick={() =>
                                      handleWednesdayShift(value)
                                    }
                                  >
                                    {checkPrint && checkPrint ? null : (
                                      <span className="tool-tip-text">
                                        <a>
                                          <span>
                                            <i className="fa fa-plus" />
                                          </span>
                                        </a>
                                      </span>
                                    )}
                                    {employeeshiftData?.map(
                                      (events, indexID) => {
                                        const {
                                          id,
                                          employee,
                                          house,
                                          date,
                                          shift,
                                        } = events;
                                        if (
                                          house === accomodationId &&
                                          value === employee &&
                                          date === dayMonthYear[2]
                                        ) {
                                          return (
                                            <React.Fragment key={indexID}>
                                              {shiftData?.map((shifts, i) => {
                                                if (shifts.id === shift) {
                                                  return (
                                                    <div
                                                      key={i}
                                                      onClick={() =>
                                                        handleWednesdayShiftIndex(
                                                          shift,
                                                          employee,
                                                          house,
                                                          indexID,
                                                          id
                                                        )
                                                      }
                                                      className="user-add-shedule-list"
                                                    >
                                                      <h2>
                                                        <a
                                                          style={{
                                                            border:
                                                              "2px dashed #EE6A0B",
                                                          }}
                                                        >
                                                          <span style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}>
                                                            {`${shifts.name} 
                                                              ${moment(
                                                                shifts.start_time,
                                                                "HH:mm"
                                                              ).format(
                                                                "hh:mm A"
                                                              )} 
                                                              - ${moment(
                                                                shifts.end_time,
                                                                "HH:mm"
                                                              ).format(
                                                                "hh:mm A"
                                                              )}`}
                                                          </span>
                                                          <span className="userrole-info" style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}>
                                                            {roleData?.map((r) => {
                                                              if (r.id === role)
                                                                return r.role_name;
                                                            })} -{" "}
                                                            {`${first_name} ${middle_name} ${last_name}`}
                                                          </span>
                                                        </a>
                                                      </h2>
                                                    </div>
                                                  );
                                                }
                                              })}
                                            </React.Fragment>
                                          );
                                        }
                                      }
                                    )}
                                  </td>
                                  <td
                                    className="tool-tip"
                                    onClick={() => handleThursdayShift(value)}
                                  >
                                    {checkPrint && checkPrint ? null : (
                                      <span className="tool-tip-text">
                                        <a>
                                          <span>
                                            <i className="fa fa-plus" />
                                          </span>
                                        </a>
                                      </span>
                                    )}
                                    {employeeshiftData?.map(
                                      (events, indexID) => {
                                        const {
                                          id,
                                          employee,
                                          house,
                                          date,
                                          shift,
                                        } = events;
                                        if (
                                          house === accomodationId &&
                                          value === employee &&
                                          date === dayMonthYear[3]
                                        ) {
                                          return (
                                            <React.Fragment key={indexID}>
                                              {shiftData?.map((shifts, i) => {
                                                if (shifts.id === shift) {
                                                  return (
                                                    <div
                                                      key={i}
                                                      onClick={() =>
                                                        handleThursdayShiftIndex(
                                                          shift,
                                                          employee,
                                                          house,
                                                          indexID,
                                                          id
                                                        )
                                                      }
                                                      className="user-add-shedule-list"
                                                    >
                                                      <h2>
                                                        <a
                                                          style={{
                                                            border:
                                                              "2px dashed #EE6A0B",
                                                          }}
                                                        >
                                                          <span style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}>
                                                            {`${shifts.name} 
                                                              ${moment(
                                                                shifts.start_time,
                                                                "HH:mm"
                                                              ).format(
                                                                "hh:mm A"
                                                              )} 
                                                              - ${moment(
                                                                shifts.end_time,
                                                                "HH:mm"
                                                              ).format(
                                                                "hh:mm A"
                                                              )}`}
                                                          </span>
                                                          <span className="userrole-info" style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}>
                                                            {roleData?.map((r) => {
                                                              if (r.id === role)
                                                                return r.role_name;
                                                            })} -{" "}
                                                            {`${first_name} ${middle_name} ${last_name}`}
                                                          </span>
                                                        </a>
                                                      </h2>
                                                    </div>
                                                  );
                                                }
                                              })}
                                            </React.Fragment>
                                          );
                                        }
                                      }
                                    )}
                                  </td>
                                  <td
                                    className="tool-tip"
                                    onClick={() => handleFridayShift(value)}
                                  >
                                    {checkPrint && checkPrint ? null : (
                                      <span className="tool-tip-text">
                                        <a>
                                          <span>
                                            <i className="fa fa-plus" />
                                          </span>
                                        </a>
                                      </span>
                                    )}
                                    {employeeshiftData?.map(
                                      (events, indexID) => {
                                        const {
                                          id,
                                          employee,
                                          house,
                                          date,
                                          shift,
                                        } = events;
                                        if (
                                          house === accomodationId &&
                                          value === employee &&
                                          date === dayMonthYear[4]
                                        ) {
                                          return (
                                            <React.Fragment key={indexID}>
                                              {shiftData?.map((shifts, i) => {
                                                if (shifts.id === shift) {
                                                  return (
                                                    <div
                                                      key={i}
                                                      onClick={() =>
                                                        handleFridayShiftIndex(
                                                          shift,
                                                          employee,
                                                          house,
                                                          indexID,
                                                          id
                                                        )
                                                      }
                                                      className="user-add-shedule-list"
                                                    >
                                                      <h2>
                                                        <a
                                                          style={{
                                                            border:
                                                              "2px dashed #EE6A0B",
                                                          }}
                                                        >
                                                          <span style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}>
                                                            {`${shifts.name} 
                                                              ${moment(
                                                                shifts.start_time,
                                                                "HH:mm"
                                                              ).format(
                                                                "hh:mm A"
                                                              )} 
                                                              - ${moment(
                                                                shifts.end_time,
                                                                "HH:mm"
                                                              ).format(
                                                                "hh:mm A"
                                                              )}`}
                                                          </span>
                                                          <span className="userrole-info" style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}>
                                                            {roleData?.map((r) => {
                                                              if (r.id === role)
                                                                return r.role_name;
                                                            })} -{" "}
                                                            {`${first_name} ${middle_name} ${last_name}`}
                                                          </span>
                                                        </a>
                                                      </h2>
                                                    </div>
                                                  );
                                                }
                                              })}
                                            </React.Fragment>
                                          );
                                        }
                                      }
                                    )}
                                  </td>
                                  <td
                                    className="tool-tip"
                                    onClick={() => handlSaturdayShift(value)}
                                  >
                                    {checkPrint && checkPrint ? null : (
                                      <span className="tool-tip-text">
                                        <a>
                                          <span>
                                            <i className="fa fa-plus" />
                                          </span>
                                        </a>
                                      </span>
                                    )}
                                    {employeeshiftData?.map(
                                      (events, indexID) => {
                                        const {
                                          id,
                                          employee,
                                          house,
                                          date,
                                          shift,
                                        } = events;
                                        if (
                                          house === accomodationId &&
                                          value === employee &&
                                          date === dayMonthYear[5]
                                        ) {
                                          return (
                                            <React.Fragment key={indexID}>
                                              {shiftData?.map((shifts, i) => {
                                                if (shifts.id === shift) {
                                                  return (
                                                    <div
                                                      key={i}
                                                      onClick={() =>
                                                        handleSaturdayShiftIndex(
                                                          shift,
                                                          employee,
                                                          house,
                                                          indexID,
                                                          id
                                                        )
                                                      }
                                                      className="user-add-shedule-list"
                                                    >
                                                      <h2>
                                                        <a
                                                          style={{
                                                            border:
                                                              "2px dashed #EE6A0B",
                                                          }}
                                                        >
                                                          <span style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}>
                                                            {`${shifts.name} 
                                                              ${moment(
                                                                shifts.start_time,
                                                                "HH:mm"
                                                              ).format(
                                                                "hh:mm A"
                                                              )} 
                                                              - ${moment(
                                                                shifts.end_time,
                                                                "HH:mm"
                                                              ).format(
                                                                "hh:mm A"
                                                              )}`}
                                                          </span>
                                                          <span className="userrole-info" style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}>
                                                            {roleData?.map((r) => {
                                                              if (r.id === role)
                                                                return r.role_name;
                                                            })} -{" "}
                                                            {`${first_name} ${middle_name} ${last_name}`}
                                                          </span>
                                                        </a>
                                                      </h2>
                                                    </div>
                                                  );
                                                }
                                              })}
                                            </React.Fragment>
                                          );
                                        }
                                      }
                                    )}
                                  </td>
                                  <td
                                    className="tool-tip"
                                    onClick={() => handleSundayShift(value)}
                                  >
                                    {checkPrint && checkPrint ? null : (
                                      <span className="tool-tip-text">
                                        <a>
                                          <span>
                                            <i className="fa fa-plus" />
                                          </span>
                                        </a>
                                      </span>
                                    )}
                                    {employeeshiftData?.map(
                                      (events, indexID) => {
                                        const {
                                          id,
                                          employee,
                                          house,
                                          date,
                                          shift,
                                        } = events;
                                        if (
                                          house === accomodationId &&
                                          value === employee &&
                                          date === dayMonthYear[6]
                                        ) {
                                          return (
                                            <React.Fragment key={indexID}>
                                              {shiftData?.map((shifts, i) => {
                                                if (shifts.id === shift) {
                                                  return (
                                                    <div
                                                      key={i}
                                                      onClick={() =>
                                                        handleSundayShiftIndex(
                                                          shift,
                                                          employee,
                                                          house,
                                                          indexID,
                                                          id
                                                        )
                                                      }
                                                      className="user-add-shedule-list"
                                                    >
                                                      <h2>
                                                        <a
                                                          style={{
                                                            border:
                                                              "2px dashed #EE6A0B",
                                                          }}
                                                        >
                                                          <span style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}>
                                                            {`${shifts.name} 
                                                              ${moment(
                                                                shifts.start_time,
                                                                "HH:mm"
                                                              ).format(
                                                                "hh:mm A"
                                                              )} 
                                                              - ${moment(
                                                                shifts.end_time,
                                                                "HH:mm"
                                                              ).format(
                                                                "hh:mm A"
                                                              )}`}
                                                          </span>
                                                          <span className="userrole-info" style={{ color: `${isDarkMode ? '#898888' : '#333'}`}}>
                                                            {roleData?.map((r) => {
                                                              if (r.id === role)
                                                                return r.role_name;
                                                            })} -{" "}
                                                            {`${first_name} ${middle_name} ${last_name}`}
                                                          </span>
                                                        </a>
                                                      </h2>
                                                    </div>
                                                  );
                                                }
                                              })}
                                            </React.Fragment>
                                          );
                                        }
                                      }
                                    )}
                                  </td>
                                </tr>
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
      </>
    );
  }
}

export default WeeklyComponent;
