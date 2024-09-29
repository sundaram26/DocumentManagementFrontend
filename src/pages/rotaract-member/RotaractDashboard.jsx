import React, { useEffect, useState } from 'react'
import Chart from '../../components/common/Chart'
import { fetchProjectReportsByUser, getProjectDrafts, getRotaractMeetingByUser, getRotaractMeetingDrafts } from '../../store/rotaractMemberSlice';
import { useDispatch, useSelector } from 'react-redux';

const user = JSON.parse(localStorage.getItem('user'));
const RotaractDashboard = () => {

  const [filteredReports, setFilteredReports] = useState([])
  const [statusCounts, setStatusCounts] = useState({ early: 0, onTime: 0, late: 0 });
  const [filteredDrafts, setFilteredDrafts] = useState(0)

  const [filteredMeetings, setFilteredMeetings] = useState([])
  const [meetingStatusCounts, setMeetingStatusCounts] = useState({early: 0, onTime: 0, late: 0})
  const [filteredMeeetingDrafts, setFilteredMeetingDrafts] = useState(0)

  const { projectReportsByUser, isLoading, projectDraftByUser, rotaractMeetingByUser, rotaractMeetingDraftByUser } = useSelector((state) => { 
    // console.log("data comming from rotaractMemberSlice: ",state.rotaract)
    return (
        (state.rotaract)
    )
  });


  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReports = async () => {
      if (user && user._id) {
        try {
          // Pass the correct userId
          await dispatch(fetchProjectReportsByUser({ userId: user._id }));
        } catch (err) {
          console.error('Failed to fetch reports', err);
        }
      }
    };

    fetchReports();
  }, [dispatch]);

  useEffect(() => {
    if (projectReportsByUser && projectReportsByUser.data) {
        setFilteredReports(projectReportsByUser.data);
    } else {
        setFilteredReports([]);
    }
  }, [projectReportsByUser]);

  // console.log("filtered reports: ", filteredReports)

  useEffect(() => {
    // Count the status types when filteredReports updates
    const counts = { early: 0, onTime: 0, late: 0 };

    filteredReports.forEach(report => {
      if (report.status === 'early') {
        counts.early += 1;
      } else if (report.status === 'on-time') {
        counts.onTime += 1;
      } else if (report.status === 'late') {
        counts.late += 1;
      }
    });

    setStatusCounts(counts);
  }, [filteredReports]);

  // console.log("Filtered reports: ", filteredReports);
  // console.log("Status counts: ", statusCounts);

  useEffect(() => {
    const fetchReports = async () => {
        try {
            await dispatch(getProjectDrafts({ userId: user._id }));
        } catch (err) {
          console.error("Failed to fetch reports");
        }
    };
    fetchReports();
  }, [dispatch]);

  useEffect(() => {
    if (projectDraftByUser && projectDraftByUser.data) {
        setFilteredDrafts(projectDraftByUser.data);
    } else {
        setFilteredDrafts([]);
    }
  }, [projectDraftByUser]);

  const draft = filteredDrafts.length;

  // meeting chart
  useEffect(() => {
    const fetchReports = async () => {
      if (user && user._id) {
        try {
          // Pass the correct userId
          await dispatch(getRotaractMeetingByUser({ userId: user._id }));
        } catch (err) {
          console.error('Failed to fetch reports', err);
        }
      }
    };

    fetchReports();
  }, [dispatch]);

  useEffect(() => {
    if (rotaractMeetingByUser && rotaractMeetingByUser.data) {
        setFilteredMeetings(rotaractMeetingByUser.data);
    } else {
        setFilteredMeetings([]);
    }
  }, [rotaractMeetingByUser]);

  useEffect(() => {
    // Count the status types when filteredReports updates
    const counts = { early: 0, onTime: 0, late: 0 };

    filteredMeetings.forEach(report => {
      if (report.status === 'early') {
        counts.early += 1;
      } else if (report.status === 'on-time') {
        counts.onTime += 1;
      } else if (report.status === 'late') {
        counts.late += 1;
      }
    });

    setMeetingStatusCounts(counts);
  }, [filteredMeetings]);

  // console.log("Status counts: ", meetingStatusCounts);

  useEffect(() => {
    const fetchReports = async () => {
        try {
            await dispatch(getRotaractMeetingDrafts({ userId: user._id }));
        } catch (err) {
          console.error("Failed to fetch reports");
        }
    };
    fetchReports();
  }, [dispatch]);

  useEffect(() => {
    if (rotaractMeetingDraftByUser && rotaractMeetingDraftByUser.data) {
        setFilteredMeetingDrafts(rotaractMeetingDraftByUser.data);
    } else {
        setFilteredMeetingDrafts([]);
    }
  }, [rotaractMeetingDraftByUser]);

  const meetingDraft = filteredMeeetingDrafts.length;



  return (
    <div className='w-full min-h-[calc(100vh-99px)] px-4 flex justify-around items-center'>
        <div className='h-[60vh] w-[30%] p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-lg flex flex-col justify-between items-center'>
            <p className='text-3xl font-semibold'>Project Status</p>
            {filteredReports.length > 0 || draft > 0 ? (
              <Chart early={statusCounts.early} onTime={statusCounts.onTime} late={statusCounts.late} draft={draft} />
            ) : (
              <p className='text-xl text-gray-500 mt-4'>No data available</p>
            )}
        </div>
        <div className='h-[60vh] w-[30%] p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-lg flex flex-col justify-between items-center'>
            <p className='text-3xl font-semibold'>Meeting Status</p>
            {filteredMeetings.length > 0 || meetingDraft > 0 ? (
              <Chart early={meetingStatusCounts.early} onTime={meetingStatusCounts.onTime} late={meetingStatusCounts.late} draft={meetingDraft} />
            ) : (
              <p className='text-xl text-gray-500 mt-4'>No data available</p>
            )}
        </div>
        <div className='h-[60vh] w-[30%] p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-lg flex flex-col items-center'>
            <p className='text-3xl font-semibold'>Total Meetings</p>
            {filteredMeetings.length > 0 ? (
              <p className='text-9xl font-extrabold mt-28'>{filteredMeetings.length}</p>
            ) : (
              <p className='text-xl text-gray-500 mt-28'>No meetings available</p>
            )}
        </div>
    </div>
  )
}

export default RotaractDashboard