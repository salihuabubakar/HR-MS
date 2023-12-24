import React, { Fragment } from 'react';
import moment from "moment";
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
// Download and import font file
import RobotoBold from '../../../_components/Fonts/Roboto-Bold.ttf';
import RobotoLight from '../../../_components/Fonts/Roboto-Light.ttf';
import Afacad from '../../../_components/Fonts/Afacad-Regular.ttf';

// Register font
Font.register({ family: 'Roboto', fonts: [
  { src: RobotoBold },
]});
Font.register({ family: 'RobotoLight', fonts: [
  { src: RobotoLight },
]});
Font.register({ family: 'Afacad', fonts: [
  { src: Afacad },
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
    flexDirection: 'column',
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

  smallText: {
    fontFamily: 'Afacad',
    fontSize: 12,
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
    borderBottomWidth: 1,
  },

  tbody:{ 
    fontSize: 9, 
    paddingTop: 4 , 
    paddingLeft: 7 , 
    flex: 1, 
    borderColor: 'whitesmoke', 
    borderRightWidth: 1,
    borderLeftWidth: 0.8, 
    borderBottomWidth:1 
  },
});


const Table = ({
  houseEmployeeData,
  accomodationId,
  allEmployee,
  employeeshiftData,
  shiftData,
  currentMonthAndYear,
  dayNames,
  tableData
  }) => {
    
    return (
      <>
      <View style={styles.labelTitle}>
          <Text style={styles.lTitle}>MONTHLY SCHEDULE</Text>
          <Text style={styles.smallText}>{`(${currentMonthAndYear})`}</Text>
      </View>

      {/* Head */}
      <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
        {dayNames?.map(data => {
            return (
              <View style={styles.theader}>
                <Text>{data}</Text> 
              </View>
            );
          })
        }
      </View>

      {/* Body */}
      {tableData.map((week, weekIndex) => {
        return (
          <View style={{ width:'100%', flexDirection: 'row', flex: '1' }} key={weekIndex}>
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
                <View style={styles.tbody} key={dayIndex}>
                  <Text>{dayFigure}</Text>
                  {houseEmployeeData?.map((staff, index) => {
                    const { id: value, employee, house } = staff;
                    if (house === accomodationId) {
                      return (
                        <Fragment key={index}>
                          {allEmployee?.map((emp, empIndex) => {
                            const { id: empId,  photo,  first_name,  middle_name,  last_name } = emp;
                            if (empId === employee) {
                              const convertPhotoPathToSecureLayer = photo?.replace('http://', 'https://');
                              return (
                                <Fragment key={empIndex}>
                                  {employeeshiftData?.map(
                                    (event, shiftIndex) => {
                                      const {  id, employee,  house,  date,  shift } = event;
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
                                                if (shifts.id ===  shift) {
                                                  return (
                                                    <View style={{ flexDirection: 'column'}} key={i}>
                                                      <Text>
                                                      {`${shifts.name} ${moment(shifts.start_time, "HH:mm").format("hh:mm A")} - ${moment(shifts.end_time, "HH:mm").format("hh:mm A")}`}
                                                      </Text>
                                                      <View style={{ flexDirection: 'column', marginTop: 3}}>
                                                        <Image
                                                          style={{ width: "20pt", height: "20pt", borderRadius: "50pt", backgroundColor: "#00000000" }}
                                                          src={convertPhotoPathToSecureLayer && convertPhotoPathToSecureLayer}
                                                        />
                                                        <Text>
                                                          {`${first_name} ${middle_name} ${last_name}`}
                                                        </Text>
                                                      </View>
                                                    </View>
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
                </View>
              );
            })}
          </View>
        );
      })}
    </>
    )
  };


const DynamicMonthSchedulePdf = ({
  houseEmployeeData,
  accomodationId,
  allEmployee,
  employeeshiftData,
  dayMonthYear,
  shiftData,
  currentMonthAndYear,
  dayNames,
  tableData
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Table 
          houseEmployeeData={houseEmployeeData}
          accomodationId={accomodationId}
          allEmployee={allEmployee}
          employeeshiftData={employeeshiftData}
          dayMonthYear={dayMonthYear}
          shiftData={shiftData}
          currentMonthAndYear={currentMonthAndYear}
          dayNames={dayNames}
          tableData={tableData}
        />
      </Page>
    </Document>
  )
}
export default DynamicMonthSchedulePdf;