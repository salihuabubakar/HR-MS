import React, { Fragment } from 'react';
import moment from "moment";
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
// Download and import font file
import RobotoBold from '../../../_components/Fonts/Roboto-Bold.ttf';
import RobotoLight from '../../../_components/Fonts/Roboto-Light.ttf';

// Register font
Font.register({ family: 'Roboto', fonts: [
  { src: RobotoBold },
]});
Font.register({ family: 'RobotoLight', fonts: [
  { src: RobotoLight },
]});

// Create styles
const styles = StyleSheet.create({

  page: {
    fontSize: 11, 
    paddingTop: 20, 
    paddingLeft: 20, 
    paddingRight: 20, 
    lineHeight: 1.5, 
    flexDirection: 'column' 
  },

  labelTitle: {
    display: 'flex',
    justifyContent:'center', 
    alignItems: 'center', 
    width: '100%',
    marginBottom: 15
  },

  lTitle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#38393C'
  },

  theader: { 
    marginTop: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#38393C',
    fontSize: 10,
    paddingTop: 4 ,
    paddingLeft: 7 ,
    flex: 1,
    height: 20,
    backgroundColor: '#DEDEDE',
    borderColor: 'whitesmoke',
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  theader2: { 
    flex: 2, 
    borderRightWidth: 0, 
    borderBottomWidth: 1
  },

  tbody:{ 
    fontSize: 9, 
    paddingTop: 4 , 
    paddingLeft: 7 , 
    flex: 1, 
    borderColor: 'whitesmoke', 
    borderRightWidth: 1, 
    borderBottomWidth:1 
  },

  tbody2:{ 
    flex: 2, 
    borderRightWidth: 1,
    borderLeftWidth: 1,
    fontSize: '10px'
  }
  
});


const Table = ({
  houseEmployeeData,
  accomodationId,
  roleData,
  allEmployee,
  employeeshiftData,
  dayMonthYear,
  shiftData,
  recentDates
  }) => {
    
    return (
      <>
      <View style={styles.labelTitle}>
          <Text style={styles.lTitle}>WEEKLY SCHEDULE</Text>
      </View>

      {/* Head */}
      <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
        <View style={[styles.theader, styles.theader2]}>
            <Text>Scheduled Shift</Text>   
        </View>
        {recentDates?.map(data => {
            return (
              <View style={styles.theader}>
                <Text>{data}</Text> 
              </View>
            );
          })
        }
      </View>

      {/* Body */}
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
                  const convertPhotoPathToSecureLayer = photo?.replace('http://', 'https://');
                  return (
                    <View style={{ width:'100%', flexDirection :'row'}} key={empIndex}>
                      <View style={[styles.tbody, styles.tbody2]}>
                        <View style={{ flexDirection: 'column'}}>
                          <Image
                            style={{
                              width: "30pt",
                              height: "30pt",
                              borderRadius: "50pt",
                              backgroundColor: "#00000000",
                            }}
                            src={convertPhotoPathToSecureLayer && convertPhotoPathToSecureLayer}
                          />
                          <View style={{ flexDirection: 'column', marginTop: 3}}>
                            <Text style={{ color: "#ff9b44" }}>
                              {`${first_name} ${middle_name} ${last_name}`}
                            </Text>
                            <Text>
                              {roleData?.map((r) => {
                                if (r.id === role)
                                  return r.role_name;
                              })}
                              {!role && "---"}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View style={styles.tbody}>
                        {employeeshiftData?.map(
                          (events, indexID) => {
                            const { employee, house, date, shift } = events;
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
                                        <View key={i}>
                                          <Text>
                                            <Text>
                                              {`${shifts.name} 
                                                ${moment(shifts.start_time, "HH:mm").format("hh:mm A")} - ${moment(shifts.end_time, "HH:mm").format("hh:mm A")}
                                              `}
                                            </Text>
                                          </Text>
                                        </View>
                                      );
                                    }
                                  })}
                                </React.Fragment>
                              );
                            }
                          }
                        )}
                      </View>

                      <View style={styles.tbody}>
                        {employeeshiftData?.map(
                          (events, indexID) => {
                            const { employee, house, date, shift } = events;
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
                                        <View key={i}>
                                          <Text>
                                            <Text>
                                              {`${shifts.name} 
                                                ${moment(shifts.start_time, "HH:mm").format("hh:mm A")} - ${moment(shifts.end_time, "HH:mm").format("hh:mm A")}
                                              `}
                                            </Text>
                                          </Text>
                                        </View>
                                      );
                                    }
                                  })}
                                </React.Fragment>
                              );
                            }
                          }
                        )}
                      </View>

                      <View style={styles.tbody}>
                        {employeeshiftData?.map(
                          (events, indexID) => {
                            const { employee, house, date, shift } = events;
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
                                        <View key={i}>
                                          <Text>
                                            <Text>
                                              {`${shifts.name} 
                                                ${moment(shifts.start_time, "HH:mm").format("hh:mm A")} - ${moment(shifts.end_time, "HH:mm").format("hh:mm A")}
                                              `}
                                            </Text>
                                          </Text>
                                        </View>
                                      );
                                    }
                                  })}
                                </React.Fragment>
                              );
                            }
                          }
                        )}
                      </View>

                      <View style={styles.tbody}>
                        {employeeshiftData?.map(
                          (events, indexID) => {
                            const { employee, house, date, shift } = events;
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
                                        <View key={i}>
                                          <Text>
                                            <Text>
                                              {`${shifts.name} 
                                                ${moment(shifts.start_time, "HH:mm").format("hh:mm A")} - ${moment(shifts.end_time, "HH:mm").format("hh:mm A")}
                                              `}
                                            </Text>
                                          </Text>
                                        </View>
                                      );
                                    }
                                  })}
                                </React.Fragment>
                              );
                            }
                          }
                        )}
                      </View>

                      <View style={styles.tbody}>
                        {employeeshiftData?.map(
                          (events, indexID) => {
                            const { employee, house, date, shift } = events;
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
                                        <View key={i}>
                                          <Text>
                                            <Text>
                                              {`${shifts.name} 
                                                ${moment(shifts.start_time, "HH:mm").format("hh:mm A")} - ${moment(shifts.end_time, "HH:mm").format("hh:mm A")}
                                              `}
                                            </Text>
                                          </Text>
                                        </View>
                                      );
                                    }
                                  })}
                                </React.Fragment>
                              );
                            }
                          }
                        )}
                      </View>

                      <View style={styles.tbody}>
                        {employeeshiftData?.map(
                          (events, indexID) => {
                            const { employee, house, date, shift } = events;
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
                                        <View key={i}>
                                          <Text>
                                            <Text>
                                              {`${shifts.name} 
                                                ${moment(shifts.start_time, "HH:mm").format("hh:mm A")} - ${moment(shifts.end_time, "HH:mm").format("hh:mm A")}
                                              `}
                                            </Text>
                                          </Text>
                                        </View>
                                      );
                                    }
                                  })}
                                </React.Fragment>
                              );
                            }
                          }
                        )}
                      </View>

                      <View style={styles.tbody}>
                        {employeeshiftData?.map(
                          (events, indexID) => {
                            const { employee, house, date, shift } = events;
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
                                        <View key={i}>
                                          <Text>
                                            <Text>
                                              {`${shifts.name} 
                                                ${moment(shifts.start_time, "HH:mm").format("hh:mm A")} - ${moment(shifts.end_time, "HH:mm").format("hh:mm A")}
                                              `}
                                            </Text>
                                          </Text>
                                        </View>
                                      );
                                    }
                                  })}
                                </React.Fragment>
                              );
                            }
                          }
                        )}
                      </View>
                      
                    </View>
                  );
                }
              })}
            </Fragment>
          );
        }
      })}
      
    </>
    )
  };


const DynamicWeekSchedulePdf = ({
  houseEmployeeData,
  accomodationId,
  roleData,
  allEmployee,
  employeeshiftData,
  dayMonthYear,
  shiftData,
  checkPrint,
  recentDates
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Table 
          houseEmployeeData={houseEmployeeData}
          accomodationId={accomodationId}
          roleData={roleData}
          allEmployee={allEmployee}
          employeeshiftData={employeeshiftData}
          dayMonthYear={dayMonthYear}
          shiftData={shiftData}
          checkPrint={checkPrint}
          recentDates={recentDates}
        />
      </Page>
    </Document>
  )
}
export default DynamicWeekSchedulePdf;