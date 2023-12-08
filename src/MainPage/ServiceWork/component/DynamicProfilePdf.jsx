import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
// Download and import font file
import Montserrat from './Fonts/Montserrat.ttf';
import MontserratSubBold from './Fonts/MontserratSubrayada-Bold.ttf';
import RobotoBold from './Fonts/Roboto-Bold.ttf';
import RobotoLight from './Fonts/Roboto-Light.ttf';

// Register font
Font.register({ family: 'Roboto', fonts: [
  { src: RobotoBold },
  { src: RobotoLight},
]});
Font.register({ family: 'Montserrat', fonts: [
  { src: Montserrat },
]});
Font.register({ family: 'MontserratUnderline', fonts: [
  { src: MontserratSubBold },
]});

// Create styles
const styles = StyleSheet.create({
  page: {fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column' },

  center : {border: '2px solid grey' },

  titleContainer: {display: 'flex', marginTop: 24, justifyContent:'center', alignItems: 'center', width: '100%'},

  title: {
    fontFamily: 'MontserratUnderline',
    fontSize: 40,
    fontWeight: 700,
  },
  
  logo: { width: 100, height: 100 },

  reportTitle: {  fontSize: 16,  textAlign: 'center' },

  addressTitle : {fontSize: 11,fontStyle: 'bold'}, 
  
  invoice : {fontWeight: 'bold',fontSize: 20},
  
  invoiceNumber : {fontSize: 11,fontWeight: 'bold'}, 
  
  address : { fontWeight: 400, fontSize: 10},
  
  theader : {marginTop : 5,fontSize : 10,fontStyle: 'bold', paddingLeft: 7 ,height:20, borderBottom: '1pt solid grey' },

  theader2 : { borderRight: '1pt solid black'},
  
  group: { flexDirection: 'row', marginTop : 5,fontSize : 10,fontStyle: 'bold', paddingLeft: 7 ,height:20, borderBottom: '1pt solid grey', justifyContent: 'space-around'},

  separator: { borderLeft: '1pt solid grey'},

  tbody:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},

  total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},

  tbody2:{ flex:2, borderRightWidth:1, },

  table: {
    display: 'table',
    width: '100%',
    border: '2pt solid grey',
    marginTop:10
  },
  row: {
    display: 'table-row',
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row', // Add background color for header
  },
  headerCell: {
    display: 'table-cell',
    padding: 5,
    fontFamily: 'Roboto',
    border: '1pt solid grey',
    flex: 1,
  },
  label: {
    fontWeight:700,
    fontFamily: 'Roboto'
  },
  cell: {
    display: 'table-cell',
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  
});

const Table = ({
  getSelectedData,
  rSocialWorkerData,
  selectedResidentId,
  socialWorkerData,
  allEmployee,
  residentBoroughData,
  residentEducationData
  }) => (
    <>
      <View style={styles.titleContainer}>
          <Text style={styles.title}>YOUNG PERSON DETAILS</Text>
          <View style={styles.center}>
            <Image style={styles.logo} src={getSelectedData?.photo} />
          </View>
      </View>
      <View style={styles.table}>
          <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.label]}>Name: </Text>
              <Text style={styles.headerCell}>{`${getSelectedData?.first_name} ${getSelectedData?.middle_name} ${getSelectedData?.last_name}`}</Text>
              <Text style={[styles.headerCell, styles.label]}>Date of birth: </Text>
              <Text style={styles.headerCell}>{getSelectedData?.date_of_birth}</Text>
          </View>
          <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.label]}>Gender: </Text>
              <Text style={styles.headerCell}>{getSelectedData?.gender}</Text>
              <Text style={[styles.headerCell, styles.label]}>Height & build: </Text>
              <Text style={styles.headerCell}>{getSelectedData?.height}</Text>
          </View>
          <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.label]}>Eye colour, hair colour, glasses, tattoos, piercings: </Text>
              <Text style={styles.headerCell}>
                {`${getSelectedData?.eye_colour},${getSelectedData?.hair_colour},${getSelectedData?.glasses},${getSelectedData?.tattoos},${getSelectedData?.piercings}`}
              </Text>
          </View>
          <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.label]}>Mobile No: </Text>
              <Text style={styles.headerCell}>{getSelectedData?.phone_number}</Text>
              <Text style={[styles.headerCell, styles.label]}>Ethnic Origin/Ethnic Appearance: </Text>
              <Text style={styles.headerCell}>{getSelectedData?.nationality}</Text>
          </View>
          <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.label]}>Email Address: </Text>
              <Text style={styles.headerCell}>{getSelectedData?.email}</Text>
          </View>
          <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.label]}>Placement Address: </Text>
              <Text style={styles.headerCell}>{getSelectedData?.address}</Text>
          </View>
          <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.label]}>Social worker: </Text>
              <Text style={styles.headerCell}>
                {rSocialWorkerData && rSocialWorkerData?.map((s, i) => {
                  if(s.resident === selectedResidentId && s.status === "Active") {
                    return (
                      <>
                        {socialWorkerData?.map((rSw) => {
                          if (rSw.id === s.social_worker)
                            return `${rSw.first_name} ${rSw.middle_name} ${rSw.last_name}, `;
                        })}
                      </>
                    )
                  }
                })}
              </Text>
          </View>
          <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.label]}>Key worker: </Text>
              <Text style={styles.headerCell}>
                {getSelectedData?.key_worker?.map(s => {
                    return (
                      <>
                        {allEmployee?.map((emp) => {
                          if (emp.id === s)
                            return `${emp.first_name} ${emp.middle_name} ${emp.last_name}, `;
                        })}
                      </>
                    )
                })}
              </Text>
          </View>
          <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.label]}>Subject to Child Protection Plan: </Text>
              <Text style={styles.headerCell}>{getSelectedData?.Subject_child_protection ? 'Yes' : 'No'}</Text>
              <Text style={[styles.headerCell, styles.label]}>
                {` Legal Status:
                    e.g. Section 20, Section 31
                `}
               </Text>
              <Text style={styles.headerCell}>{getSelectedData?.legal_status}</Text>
          </View>
          <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.label]}>Home Borough: </Text>
              <Text style={styles.headerCell}>
                {residentBoroughData?.map(b => {
                  if (b.id === getSelectedData?.borough)
                    return (
                      `${b.borough_name}
                        Out of Hours Emergency Duty: ${b.Out_of_hours_number}
                      `
                    );
                })}
              </Text>
          </View>
          <View style={styles.headerRow}>
              <Text style={[styles.headerCell, styles.label]}>Education or school attended: </Text>
              <Text style={styles.headerCell}>
                {residentEducationData?.map(edu => {
                  if (edu.resident === selectedResidentId)
                    return (
                      `${edu.institute_name}
                        Qualification: ${edu.qualification_name}
                      `
                    );
                })}
              </Text>
          </View>
      </View>
    </>
  );


const DynamicProfilePdf = ({
  getSelectedData,
  rSocialWorkerData,
  selectedResidentId,
  socialWorkerData,
  allEmployee,
  residentBoroughData,
  residentEducationData,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Table 
          getSelectedData={getSelectedData}
          rSocialWorkerData={rSocialWorkerData}
          selectedResidentId={selectedResidentId}
          socialWorkerData={socialWorkerData}
          allEmployee={allEmployee}
          residentBoroughData={residentBoroughData}
          residentEducationData={residentEducationData}
        />
      </Page>
    </Document>
  )
}
export default DynamicProfilePdf;