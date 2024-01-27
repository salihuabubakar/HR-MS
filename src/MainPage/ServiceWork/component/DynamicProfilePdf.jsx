import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
// Download and import font file
import Montserrat from '../../../_components/Fonts/Montserrat.ttf';
import MontserratSubBold from '../../../_components/Fonts/MontserratSubrayada-Bold.ttf';
import RobotoLight from '../../../_components/Fonts/Roboto-Light.ttf';
import RobotoBold from '../../../_components/Fonts/Roboto-Bold.ttf';
import Afacad from '../../../_components/Fonts/Afacad-Regular.ttf';


/**
 * Font Registration
 *
 * Registers custom fonts for use in the application using the 'Font' object from a font library
 * (e.g., PDFKit). Each font family is associated with its corresponding font file.
 *
 * @import {Font} - Imported from a font library (e.g., PDFKit).
 * @constant {string} Montserrat - Path to the Montserrat font file.
 * @constant {string} MontserratSubBold - Path to the Montserrat Subrayada Bold font file.
 * @constant {string} RobotoLight - Path to the Roboto Light font file.
 * @constant {string} RobotoBold - Path to the Roboto Bold font file.
 * @constant {string} Afacad - Path to the Afacad Regular font file.
 *
 * Font Registration:
 * - 'Roboto' font family with 'RobotoBold' font file.
 * - 'RobotoLight' font family with 'RobotoLight' font file.
 * - 'Montserrat' font family with 'Montserrat' font file.
 * - 'MontserratUnderline' font family with 'MontserratSubBold' font file.
 * - 'Afacad' font family with 'Afacad' font file.
 */

// Register font families with their respective font files
Font.register({ family: 'Roboto', fonts: [{ src: RobotoBold }] });
Font.register({ family: 'RobotoLight', fonts: [{ src: RobotoLight }] });
Font.register({ family: 'Montserrat', fonts: [{ src: Montserrat }] });
Font.register({ family: 'MontserratUnderline', fonts: [{ src: MontserratSubBold }] });
Font.register({ family: 'Afacad', fonts: [{ src: Afacad }] });

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

  pictureContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  imageContainer: {
    borderRadius: 50, 
    border: '1pt solid #ccc',
  },

  logo: { 
    width: 100, 
    height: 100, 
    borderRadius: 50 
  },

  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15
  },

  title: {
    fontFamily: 'Montserrat',
    fontSize: 40,
    fontWeight: 700,
  },

  smallText: {
    fontFamily: 'Afacad',
    fontSize: 12,
  },

  hr: {
    width: '550pt',
    borderBottom: '1pt solid #ccc',
    margin: '15pt 0'
  },

  body: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5
  },

  card: {
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    padding: 5,
    flex: 1,
    minWidth: 200
  },

  cardlTitle: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#38393C'
  },

  cardTitleValue: {
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#38393C'
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
  }) => {
    const convertPhotoPathToSecureLayer = getSelectedData?.photo?.replace('http://', 'https://');
    return (
      <>
      <View style={styles.labelTitle}>
          <Text style={styles.lTitle}>YOUNG PERSON DETAILS</Text>
      </View>

      <View style={styles.pictureContainer}>
        <View style={styles.imageContainer}>
            <Image style={styles.logo} src={convertPhotoPathToSecureLayer} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.lTitle}>{`${getSelectedData?.first_name} ${getSelectedData?.middle_name} ${getSelectedData?.last_name}`}</Text>
          <Text style={styles.smallText}>{`Email: ${getSelectedData?.email}`}</Text>
        </View>
      </View>

      <View style={styles.hr}></View>

      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.cardlTitle}>Personal Info</Text>
          <Text style={styles.smallText}>Ethnic Origin/Ethnic Appearance: <Text style={styles.cardTitleValue}>{getSelectedData?.nationality}</Text></Text>
          <Text style={styles.smallText}>Date of birth: <Text style={styles.cardTitleValue}>{getSelectedData?.date_of_birth}</Text></Text>
          <Text style={styles.smallText}>Gender: <Text style={styles.cardTitleValue}>{getSelectedData?.gender}</Text></Text>
          <Text style={styles.smallText}>Height & build: <Text style={styles.cardTitleValue}>{getSelectedData?.height}</Text></Text>
          <Text style={styles.smallText}>Eye colour, hair colour, glasses, tattoos, piercings: <Text style={styles.cardTitleValue}>{`${getSelectedData?.eye_colour}, ${getSelectedData?.hair_colour}, ${getSelectedData?.glasses}, ${getSelectedData?.tattoos}, ${getSelectedData?.piercings}`}</Text></Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardlTitle}>Contacts</Text>
          <Text style={styles.smallText}>Mobile No: <Text style={styles.cardTitleValue}>{getSelectedData?.phone_number}</Text></Text>
          <Text style={styles.smallText}>Placement Address: <Text style={styles.cardTitleValue}>{getSelectedData?.address}</Text></Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardlTitle}>Education</Text>
            {residentEducationData?.map(edu => {
              if (edu.resident === selectedResidentId)
                return (
                  <View> 
                    <Text style={styles.smallText}> 
                      School: <Text style={styles.cardTitleValue}> {edu.institute_name}, </Text>  
                      Qualification: <Text style={styles.cardTitleValue}> {edu.qualification_name}</Text>
                    </Text>
                  </View>
                );
            })}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardlTitle}>Home Borough</Text>
            {residentBoroughData?.map(b => {
              if (b.id === getSelectedData?.borough)
                return (
                  <View> 
                    <Text style={styles.smallText}> 
                      Name: <Text style={styles.cardTitleValue}> {b.borough_name}</Text>
                    </Text>
                    <Text style={styles.smallText}>
                      Out of Hours Emergency Duty: <Text style={styles.cardTitleValue}> {b.Out_of_hours_number}</Text>
                    </Text>
                  </View>
                );
            })}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardlTitle}>Additional Info</Text>
          <Text style={styles.smallText}>Subject to Child Protection Plan: <Text style={styles.cardTitleValue}>{getSelectedData?.Subject_child_protection ? 'Yes' : 'No'}</Text></Text>
          <Text style={styles.smallText}>
            Legal Status (e.g. Section 20, Section 31): <Text style={styles.cardTitleValue}>{getSelectedData?.legal_status}</Text>
          </Text>
          <Text style={styles.smallText}> 
            Social worker:
            {rSocialWorkerData?.map(s => {
              if (s.resident === selectedResidentId && s.status === "Active")
                return (
                  <>
                    {socialWorkerData?.map((rSw) => {
                      if (rSw.id === s.social_worker)
                        return (
                          <Text style={styles.cardTitleValue}> {`${rSw.first_name} ${rSw.middle_name} ${rSw.last_name}, `}</Text>
                        )
                    })}
                  </>
                );
            })}
          </Text>
          <Text style={styles.smallText}> 
          Key worker:
            {getSelectedData?.key_worker?.map(s => {
              return (
                <>
                  {allEmployee?.map((emp) => {
                    if (emp.id === s)
                      return (
                        <Text style={styles.cardTitleValue}> {`${emp.first_name} ${emp.middle_name} ${emp.last_name}, `}</Text>
                      )
                  })}
                </>
              );
            })}
          </Text>
        </View>
      </View>
    </>
    )
  };


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