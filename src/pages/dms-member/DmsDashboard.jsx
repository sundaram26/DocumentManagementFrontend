import React, { useEffect, useState } from 'react'
import Chart from '../../components/common/Chart'
import { fetchActivityReportsByUser, getActivityDrafts, getDmsMeetingByUser, getDmsMeetingDrafts } from '../../store/dmsMemberSlice';
import { useDispatch, useSelector } from 'react-redux';

const user = JSON.parse(localStorage.getItem('user'));
const DmsDashboard = () => {

  const [filteredReports, setFilteredReports] = useState([])
  const [statusCounts, setStatusCounts] = useState({ early: 0, onTime: 0, late: 0 });
  const [filteredDrafts, setFilteredDrafts] = useState(0)

  const [filteredMeetings, setFilteredMeetings] = useState([])
  const [meetingStatusCounts, setMeetingStatusCounts] = useState({early: 0, onTime: 0, late: 0})
  const [filteredMeeetingDrafts, setFilteredMeetingDrafts] = useState(0)

  const { activityReportsByUser, isLoading, activityDraftByUser, dmsMeetingByUser, dmsMeetingDraftByUser } = useSelector((state) => { 
    // console.log("data comming from dmsMemberSlice: ",state.dms)
    return (
        (state.dms)
    )
  });


  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReports = async () => {
      if (user && user._id) {
        try {
          // Pass the correct userId
          await dispatch(fetchActivityReportsByUser({ userId: user._id }));
        } catch (err) {
          console.error('Failed to fetch reports', err);
        }
      }
    };

    fetchReports();
  }, [dispatch]);

  useEffect(() => {
    if (activityReportsByUser && activityReportsByUser.data) {
        setFilteredReports(activityReportsByUser.data);
    } else {
        setFilteredReports([]);
    }
  }, [activityReportsByUser]);

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
            await dispatch(getActivityDrafts({ userId: user._id }));
        } catch (err) {
          console.error("Failed to fetch reports");
        }
    };
    fetchReports();
  }, [dispatch]);

  useEffect(() => {
    if (activityDraftByUser && activityDraftByUser.data) {
        setFilteredDrafts(activityDraftByUser.data);
    } else {
        setFilteredDrafts([]);
    }
  }, [activityDraftByUser]);

  const draft = filteredDrafts.length;

  // meeting chart
  useEffect(() => {
    const fetchReports = async () => {
      if (user && user._id) {
        try {
          // Pass the correct userId
          await dispatch(getDmsMeetingByUser({ userId: user._id }));
        } catch (err) {
          console.error('Failed to fetch reports', err);
        }
      }
    };

    fetchReports();
  }, [dispatch]);

  useEffect(() => {
    if (dmsMeetingByUser && dmsMeetingByUser.data) {
        setFilteredMeetings(dmsMeetingByUser.data);
    } else {
        setFilteredMeetings([]);
    }
  }, [dmsMeetingByUser]);

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
            await dispatch(getDmsMeetingDrafts({ userId: user._id }));
        } catch (err) {
          console.error("Failed to fetch reports");
        }
    };
    fetchReports();
  }, [dispatch]);

  useEffect(() => {
    if (dmsMeetingDraftByUser && dmsMeetingDraftByUser.data) {
        setFilteredMeetingDrafts(dmsMeetingDraftByUser.data);
    } else {
        setFilteredMeetingDrafts([]);
    }
  }, [dmsMeetingDraftByUser]);

  const meetingDraft = filteredMeeetingDrafts.length;



  return (
    <div className='w-full min-h-[calc(100vh-99px)] px-4 flex justify-around items-center'>
        <div className='h-[60vh] w-[30%] p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-lg flex flex-col justify-between items-center'>
            <p className='text-3xl font-semibold'>Activity Status</p>
            {filteredReports.length > 0 ? (
              <Chart early={statusCounts.early} onTime={statusCounts.onTime} late={statusCounts.late} draft={draft} />
            ) : (
              <p className='text-xl text-gray-500 mt-28'>No Data Available</p>
            )}
        </div>
        <div className='h-[60vh] w-[30%] p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-lg flex flex-col justify-between items-center'>
            <p className='text-3xl font-semibold'>Meeting Status</p>
            {filteredMeetings.length > 0 ? (
              <Chart early={meetingStatusCounts.early} onTime={meetingStatusCounts.onTime} late={meetingStatusCounts.late} draft={meetingDraft} />
            ) : (
              <p className='text-xl text-gray-500 mt-28'>No Data Available</p>
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

export default DmsDashboard