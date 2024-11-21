import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { logo2 } from '../../assets';
import { convert } from 'html-to-text'

const styles = StyleSheet.create({
  page: {
    padding: 30,
    paddingBottom: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  mainHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
  },
  headerLogo: {
    width:'20%', 
  },
  headerName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'end',
    marginLeft: 12
  },
  headerYear: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'end',
    marginLeft: 12
  },
  table: {
    display: 'table',
    width: '100%',
    border: '1 solid #ccc',
    marginTop: 2
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1 solid #ccc',
    // paddingVertical: 4,
  },
  tableHeading: {
    backgroundColor: '#c5c6c7',
    paddingHorizontal: 2,
    paddingVertical: 4,
    marginTop: 16,
    marginBottom: 2
  },
  tableHeadingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cell: {
    width: '70%',
    padding: 5,
    // flex: 1,
  },
  cellHeader: {
    width: '30%',
    backgroundColor: '#f2f2f2',
    padding: 5,
    // flex: 1,
  },
  activityDetailRow: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1 solid #ccc',
  },
  activityDetailcell: {
    width: '100%',
    padding: 5,
    // flex: 1,
  },
  activityDetailcellHeader: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    padding: 5,
    // flex: 1,
  },
  
  cellHeaderText: {
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'capitalize'
  },
  cellText: {
    fontSize: 12,
    fontWeight: 'normal',
    textTransform: 'capitalize'
  },
//   sectionTitle: {
//     marginTop: 20,
//     fontWeight: 'bold',
//     textDecoration: 'underline',
//   },
  supportDocText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#1E90FF',
  },
});


const d = new Date();
let year = d.getFullYear();


const ActivityDownload = ({report}) => (
    <Document>
        <Page size="A4" style={styles.page}>
        {/* Header Section */}
            <View style={styles.mainHeader}>
                <View style={styles.headerLogo}>
                    <Image 
                        style={styles.logoImage} 
                        src={logo2}
                    />    
                </View>
                <View style={styles.headerTitle}>
                    <Text style={styles.headerName}>DMS of B. K. Birla College</Text>
                    <Text style={styles.headerYear}>{year} - {year + 1}</Text>
                </View>
            </View>

            {/* activity Information */}
            <View style={[styles.row, styles.tableHeading]}>
                <Text style={styles.tableHeadingText}>Activity Information</Text>
            </View>
            <View style={[styles.table, styles.activityInformation]}>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Activity Name</Text>
                    <Text style={[styles.cell, styles.cellText]}>{report.activityName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Faculty Name</Text>
                    <Text style={[styles.cell, styles.cellText]}>{report.facultyName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Aim</Text>
                    <Text style={[styles.cell, styles.cellText]}>{convert(report.activityAim)}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Start Date And Time</Text>
                    <Text style={[styles.cell, styles.cellText]}>
                    {new Date(report.startDate)
                        .toLocaleString('en-US', 
                            {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            }
                        )
                    }
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>End Date And Time</Text>
                    <Text style={[styles.cell, styles.cellText]}>
                    {new Date(report.endDate)
                        .toLocaleString('en-US', 
                            {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            }
                        )
                    }
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Venue</Text>
                    <Text style={[styles.cell, styles.cellText]}>{report.venue}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>activity Mode</Text>
                    <Text style={[styles.cell, styles.cellText]}>{report.activityMode}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>activity Status</Text>
                    <Text style={[styles.cell, styles.cellText]}>{report.status}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Is it a Joint activity?</Text>
                    <Text style={[styles.cell, styles.cellText]}>
                        {report.isJointactivity ? 'Yes' : 'No'}
                    </Text>
                </View>
                {report.isJointactivity &&
                    <View style={styles.row}>
                        <Text style={[styles.cellHeader, styles.cellHeaderText]}>Joint Club Name</Text>
                        <Text style={[styles.cell, styles.cellText]}>{report.jointactivityPartner}</Text>
                    </View>
                }
            </View>

            {/* activity Details */}
            <View style={[styles.row, styles.tableHeading]}>
                <Text style={styles.tableHeadingText}>Activity Details</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.activityRow}>
                    <View style={styles.activityDetailcellHeader}>
                        <Text style={styles.cellHeaderText}>Ground Work</Text>
                    </View>
                    <View style={styles.activityDetailcell}>
                        <Text style={styles.cellText}>{convert(report.activityGroundwork)}</Text>
                    </View>
                </View>
            </View>

            {/* Finance Section */}
            <View style={[styles.row, styles.tableHeading]}>
                <Text style={styles.tableHeadingText}>Finance</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.row}>
                    <View style={styles.cellHeader}>
                        <Text style={styles.cellHeaderText}>Expense</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.cellText}>{report.expense}</Text>
                    </View>
                </View>
            </View>



            {/* support document */}
            <View style={[styles.row, styles.tableHeading]}>
                <Text style={styles.tableHeadingText}>Support Documents</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Cover Image</Text>
                    <Link src={report.coverImageUrl} style={[styles.cell, styles.supportDocText]}>
                        {report.coverImageUrl}
                    </Link>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Attendance</Text>
                    <Link src={report.attendanceImageUrl} style={[styles.cell, styles.supportDocText]}>
                        {report.attendanceImageUrl}
                    </Link>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Support Document</Text>
                    <Link src={report.supportDocumentUrl} style={[styles.cell, styles.supportDocText]}>
                        {report.supportDocumentUrl}
                    </Link>
                </View>
            </View>
        </Page>
  </Document>
);

export default ActivityDownload;
