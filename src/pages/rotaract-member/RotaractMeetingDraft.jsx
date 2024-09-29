import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteProjectDraft, deleteRotaractMeetingDraft, getProjectDrafts, getRotaractMeetingDrafts } from '../../store/rotaractMemberSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const user = JSON.parse(localStorage.getItem("user"));
const RotaractMeetingDraft = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { rotaractMeetingDraftByUser, isLoading } = useSelector((state) => { 
    // console.log("data comming from rotaractMemberSlice: ",state.rotaract)
    return (
      (state.rotaract)
    )
  });

  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  //get draft report
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
        setFilteredReports(rotaractMeetingDraftByUser.data);
    } else {
        setFilteredReports([]);
    }
  }, [rotaractMeetingDraftByUser]);

  const handleView = (report) => {
    setSelectedReport(report);
    navigate('/member/rotaract-member/meetings/meeting-report', { state: { draftData: report } });
  };

  //delete draft
  // console.log("draft Id of delete: ", reports.draftId)


  const handleDelete = async (draftId) => {
    // console.log("draftId from delete: ", draftId)
    try {
        toast.success("Draft Project has been deleted successfully...")
        await dispatch(deleteRotaractMeetingDraft(draftId));
        window.location.reload()
    } catch (err) {
        toast.error("Failed to delete draft", err);
    }
  };


  // console.log("filter report: ", projectDraftByUser);

  return (
    <div className='w-full p-4'>
      <p className='text-2xl font-semibold'>Draft Meetings</p>
      <div className='p-4 m-4 bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-lg overflow-hidden'>
        <div className='w-full text-md font-semibold flex justify-between items-center bg-gray-100 p-2 my-2 rounded-xl'>
          <div className='w-[20%] uppercase'>Draft ID</div>
          <div className='w-[20%] uppercase'>Meeting Type</div>
          <div className='w-[20%] uppercase'>Saving Date</div>
          <div className='w-[20%] uppercase'>Exipiry Date</div>
          <div className='w-[20%] uppercase'>Actions</div>
        </div>
        <div>
            {filteredReports.length > 0 
                ? (filteredReports.map((report, index) => (
                    <div key={report.meetingId} className='w-full text-lg flex justify-between items-center p-2 my-1 rounded-xl'>
                        <div className='w-[20%]'>{report.draftId}</div>
                        <div className='w-[20%]'>{report.meetingType}</div>
                        <div className='w-[20%]'>
                          {
                            new Date(report.createdAt)
                              .toLocaleDateString(
                                'en-US', 
                                { 
                                  year: 'numeric', 
                                  month: 'numeric', 
                                  day: 'numeric' 
                                }
                              )
                          }
                        </div>
                        <div className='w-[20%]'>
                          {
                            new Date(rotaractMeetingDraftByUser.expiryDates[index]).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                              }
                            )
                          }
                        </div>
                        <div className='w-[20%] flex gap-2'>
                            <button onClick={() => handleView(report)} className='text-blue-500'><FaEye /></button>
                            <button onClick={() => handleDelete(report.draftId)} className='text-pink-500'><MdDelete /></button>
                        </div>
                    </div>
                ))) 
                : (
                    <div className='text-center text-2xl text-gray-500 font-semibold'>
                        No draft available.
                    </div>
                )}
        </div>
      </div>
      <div className='w-full p-4'>
        <Link to='/member/rotaract-member/meetings'>
          <button className='px-4 py-1 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md'>
            Back
          </button>
        </Link>
      </div>
    </div>
  )
}

export default RotaractMeetingDraft