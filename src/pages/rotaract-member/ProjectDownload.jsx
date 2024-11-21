import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { mainLogo } from '../../assets';
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
    justifyContent: 'space-between',
  },
  headerLogo: {
    width:'30%', 
  },
  headerName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'end'
  },
  headerYear: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'end'
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
  projectDetailRow: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1 solid #ccc',
  },
  projectDetailcell: {
    width: '100%',
    padding: 5,
    // flex: 1,
  },
  projectDetailcellHeader: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    padding: 5,
    // flex: 1,
  },
  financeRow: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
  },
  financeCell: {
    width: '100%',
    padding: 5,
    // flex: 1,
  },
  financeCellHeader: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    padding: 5,
    // flex: 1,
  },
  feedbackCell: {
    width: '95%',
    padding: 5,
    // flex: 1,
  },
  feedbackCellHeader: {
    width: '5%',
    backgroundColor: '#f2f2f2',
    padding: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    // flex: 1,
  },
  attendanceCell: {
    width: '30%',
    padding: 5,
    // flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceCellHeader: {
    width: '70%',
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


const ProjectDownload = ({report}) => (
    <Document>
        <Page size="A4" style={styles.page}>
        {/* Header Section */}
            <View style={styles.mainHeader}>
                <View style={styles.headerLogo}>
                    <Image 
                        style={styles.logoImage} 
                        src={mainLogo}
                    />    
                </View>
                <View style={styles.headerTitle}>
                    <Text style={styles.headerName}>Rotaract Club of B. K. Birla College</Text>
                    <Text style={styles.headerYear}>{year} - {year + 1}</Text>
                </View>
            </View>

            {/* Project Information */}
            <View style={[styles.row, styles.tableHeading]}>
                <Text style={styles.tableHeadingText}>Project Information</Text>
            </View>
            <View style={[styles.table, styles.projectInformation]}>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Project Name</Text>
                    <Text style={[styles.cell, styles.cellText]}>{report.projectName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Aim</Text>
                    <Text style={[styles.cell, styles.cellText]}>{convert(report.projectAim)}</Text>
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
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Project Mode</Text>
                    <Text style={[styles.cell, styles.cellText]}>{report.projectMode}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Avenue</Text>
                    <Text style={[styles.cell, styles.cellText]}>{report.avenue1}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Secondary Avenue</Text>
                    <Text style={[styles.cell, styles.cellText]}>{report.avenue2}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Project Status</Text>
                    <Text style={[styles.cell, styles.cellText]}>{report.status}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Is it a Joint Project?</Text>
                    <Text style={[styles.cell, styles.cellText]}>
                        {report.isJointProject ? 'Yes' : 'No'}
                    </Text>
                </View>
                {report.isJointProject &&
                    <View style={styles.row}>
                        <Text style={[styles.cellHeader, styles.cellHeaderText]}>Joint Club Name</Text>
                        <Text style={[styles.cell, styles.cellText]}>{report.jointProjectPartner}</Text>
                    </View>
                }
                <View style={styles.row}>
                    <Text style={[styles.cellHeader, styles.cellHeaderText]}>Chairperson</Text>
                    <Text style={[styles.cell, styles.cellText]}>
                        {report.chairPersons
                            .map((person, index) =>
                                index < report.chairPersons.length - 1 ? `${person}, ` : person
                            )
                            .join('')}
                    </Text>
                </View>
            </View>

            {/* Project Details */}
            <View style={[styles.row, styles.tableHeading]}>
                <Text style={styles.tableHeadingText}>Project Details</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.projectRow}>
                    <View style={styles.projectDetailcellHeader}>
                        <Text style={styles.cellHeaderText}>Ground Work</Text>
                    </View>
                    <View style={styles.projectDetailcell}>
                        <Text style={styles.cellText}>{convert(report.projectGroundwork)}</Text>
                    </View>
                </View>
                <View style={styles.projectRow}>
                    <View style={styles.projectDetailcellHeader}>
                        <Text style={styles.cellHeaderText}>Summary</Text>
                    </View>
                    <View style={styles.projectDetailcell}>
                        <Text style={styles.cellText}>{convert(report.projectSummary)}</Text>
                    </View>
                </View>
            </View>

            {/* Finance Section */}
            <View style={[styles.row, styles.tableHeading]}>
                <Text style={styles.tableHeadingText}>Finance</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.row}>
                    <View style={styles.financeRow}>
                        <View style={styles.financeCellHeader}>
                            <Text style={styles.cellHeaderText}>Income</Text>
                        </View>
                        <View style={styles.financeCell}>
                            <Text style={styles.cellText}>{report.income}</Text>
                        </View>
                    </View>
                    <View style={styles.financeRow}>
                        <View style={styles.financeCellHeader}>
                            <Text style={styles.cellHeaderText}>Expense</Text>
                        </View>
                        <View style={styles.financeCell}>
                            <Text style={styles.cellText}>{report.expense}</Text>
                        </View>
                    </View>
                    <View style={styles.financeRow}>
                        <View style={styles.financeCellHeader}>
                            <Text style={styles.cellHeaderText}>Profit</Text>
                        </View>
                        <View style={styles.financeCell}>
                            <Text style={styles.cellText}>{report.profit}</Text>
                        </View>
                    </View>
                    <View style={styles.financeRow}>
                        <View style={styles.financeCellHeader}>
                            <Text style={styles.cellHeaderText}>Loss</Text>
                        </View>
                        <View style={styles.financeCell}>
                            <Text style={styles.cellText}>{report.loss}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Feedback */}
            {report.feedbackList && report.feedbackList.length > 0 && 
                report.feedbackList.some(fb => fb.feedbackMessage.trim() !== '') && (
                    <View>
                        <View style={[styles.row, styles.tableHeading]}>
                            <Text style={styles.tableHeadingText}>Feedback</Text>
                        </View>
                        <View style={styles.table}>
                            {report.feedbackList.map((fb, index) => (
                                fb.feedbackMessage.trim() !== '' && (
                                    <View key={index} style={styles.row}>
                                        <View style={styles.feedbackCellHeader}>
                                            <Text style={styles.cellHeaderText}>{index + 1}</Text>
                                        </View>
                                        <View style={styles.feedbackCell}>
                                            <Text style={styles.cellText}>{fb.feedbackMessage}</Text>
                                        </View>   
                                    </View>
                                )
                            ))}
                        </View>
                    </View>
                )
            }

            {/** Attendance */ }
            <View style={[styles.row, styles.tableHeading]}>
                <Text style={styles.tableHeadingText}>Attendance</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={[styles.attendanceCellHeader, styles.cellHeaderText]}>Active Home Club Members</Text>
                    <View style={styles.attendanceCell}>
                        <Text style={styles.cellText}>{report.activeHomeClubMembers}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.attendanceCellHeader, styles.cellHeaderText]}>Guest Home Club Members</Text>
                    <View style={styles.attendanceCell}>
                        <Text style={styles.cellText}>{report.guestHomeClubMembers}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.attendanceCellHeader, styles.cellHeaderText]}>District Council Members</Text>
                    <View style={styles.attendanceCell}>
                        <Text style={styles.cellText}>{report.districtCouncilMembers}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.attendanceCellHeader, styles.cellHeaderText]}>Rotarians</Text>
                    <View style={styles.attendanceCell}>
                        <Text style={styles.cellText}>{report.rotarians}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.attendanceCellHeader, styles.cellHeaderText]}>Other Guests</Text>
                    <View style={styles.attendanceCell}>
                        <Text style={styles.cellText}>{report.otherGuests}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.attendanceCellHeader, styles.cellHeaderText]}>Alumnus</Text>
                    <View style={styles.attendanceCell}>
                        <Text style={styles.cellText}>{report.alumnus}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.attendanceCellHeader, styles.cellHeaderText]}>Other Club Members</Text>
                    <View style={styles.attendanceCell}>
                        <Text style={styles.cellText}>{report.otherClubMembers}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.attendanceCellHeader, styles.cellHeaderText]}>Other PIS</Text>
                    <View style={styles.attendanceCell}>
                        <Text style={styles.cellText}>{report.otherPis}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.attendanceCellHeader, styles.cellHeaderText]}>Other District Rotaractors</Text>
                    <View style={styles.attendanceCell}>
                        <Text style={styles.cellText}>{report.otherDistrictRotaractors}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.attendanceCellHeader, styles.cellHeaderText]}>Interactors</Text>
                    <View style={styles.attendanceCell}>
                        <Text style={styles.cellText}>{report.interactors}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.attendanceCellHeader, styles.cellHeaderText]}>Total Members</Text>
                    <View style={styles.attendanceCell}>
                        <Text style={styles.cellText}>{report.totalMembers}</Text>
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

export default ProjectDownload;
