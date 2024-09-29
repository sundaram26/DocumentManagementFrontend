import React, { useState } from 'react'
import { FiTag } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { RiTimeLine } from "react-icons/ri";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { PiCloudX } from "react-icons/pi";
// import DOMPurify from 'dompurify';
import { useSwipeable } from 'react-swipeable';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { CiBadgeDollar } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import { PiCoinsThin } from "react-icons/pi";
import { FaArrowTrendDown } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { TbUsersGroup } from "react-icons/tb";
import ProgressBar from '../../components/common/ProgressBar.jsx';
import LinkPopup from '../../components/common/LinkPopup.jsx'
// import { graphUp } from '../../assets/index.js';

const RotaractMeetingView = ({onClose, reports}) => {

    // const meetingSummary = DOMPurify.sanitize(reports.meetingSummary);
    const supportDocuments = {
        'Cover Image': reports.coverImageUrl,
        'Attendance': reports.attendanceImageUrl,
        'Support Document': reports.supportDocumentUrl,
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    // const [isOpening, setIsOpening] = useState(false);


    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };


  return (
        <div className="w-full bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden">
            
            {/* Project Name, Faculty Name, ProjectId, Status */}
            <div className='w-full p-4 pb-1 border-b-2'>
                <p className='text-xl font-semibold'>{reports.meetingType}</p>
                <p className='text-lg font-semibold text-gray-400'>{`Conducted by ${reports.facultyName}`}</p>
                <div className='flex items-center gap-4'>
                    <div className='px-4 py-[2px] my-2 border-[2px] border-blue-200 bg-blue-200 text-blue-500 flex items-center gap-2 rounded-full'>
                        <FiTag />
                        {reports.meetingId}
                    </div>
                    <div className='px-4 py-[2px] my-2 capitalize border-[2px] border-gray-300 text-gray-600 flex justify-center items-center gap-2 rounded-full'>
                        <FiTag />
                        {reports.status}
                    </div>
                </div>
            </div>

            {/* Venue, Start Date & Time, End Date & Time, Primary Avenue, Secondary Avenue, Project mode */}
            <div className='w-full p-4 grid grid-cols-3 gap-4'>
                <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex items-center rounded-lg'>
                    <div className='p-2 bg-red-200 text-red-600 text-4xl rounded-md'>
                        <GrLocation />
                    </div>
                    <div className='p-2'>
                        <p className='font-semibold'>{reports.venue}</p>
                        <p className='text-sm font-semibold text-gray-400'>Venue</p>
                    </div>
                </div>
                <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex items-center rounded-lg'>
                    <div className='p-2 bg-blue-100 text-blue-500 text-4xl rounded-md'>
                        <RiTimeLine />
                    </div>
                    <div className='p-2'>
                        <p className='font-semibold'>
                            {new Date(reports.startDate).toLocaleString('en-US', 
                                {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                }
                            )}
                        </p>
                        <p className='text-sm font-semibold text-gray-400'>Start Date & Time</p>
                    </div>
                </div>
                <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex items-center rounded-lg'>
                    <div className='p-2 bg-yellow-100 text-yellow-500 text-4xl rounded-md'>
                        <RiTimeLine />
                    </div>
                    <div className='p-2'>
                        <p className='font-semibold'>
                            {new Date(reports.endDate).toLocaleString('en-US', 
                                {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true
                                }
                            )}
                        </p>
                        <p className='text-sm font-semibold text-gray-400'>Start Date & Time</p>
                    </div>
                </div>               
            </div>

            {/* Project Details */}
            <div className='w-full p-4'>
                <p className='text-2xl font-semibold'>Minutes of Meeting</p>
                <div className='pt-4 pb-8 border-b-2 border-gray-200'>
                    <div className='w-full h-[25vh] p-4 border-[1px] border-gray-200 rounded-lg overflow-y-auto'>
                        <div dangerouslySetInnerHTML={{ __html: reports.meetingSummary }} />
                    </div>
                </div>
            </div>


            {/* Support Document Url  */}
            <div className='w-full px-4 flex items-center gap-2'>
                <p className='text-xl'>To View the</p>
                <button onClick={openPopup} className="cursor-pointer text-purple-600 text-xl font-semibold flex items-center gap-2">
                    Supporting Documents <FiExternalLink />
                </button>
                {/* Render Popup */}
                {isPopupOpen && <LinkPopup links={supportDocuments} onClose={closePopup} />}
            </div>

            {/* Project Finance  */}
            <div className='w-full p-4 mt-4'>
                <p className='text-xl mb-2'>Project Finances</p>
                <div className='w-full grid grid-cols-4 gap-4'>
                    <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex items-center rounded-lg bg-blue-300'>
                        <div className='p-2 bg-white text-blue-300 text-4xl rounded-md'>
                            <CiBadgeDollar />
                        </div>
                        <div className='p-2'>
                            <p className='font-semibold text-blue-600 text-xl'>&#8377; {reports.income}</p>
                            <p className='text-sm font-semibold text-blue-500'>Income</p>
                        </div>
                    </div>
                    <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex items-center rounded-lg bg-purple-300'>
                        <div className='p-2 bg-white text-purple-300 text-4xl rounded-md'>
                            <CiWallet />
                        </div>
                        <div className='p-2'>
                            <p className='font-semibold text-purple-600 text-xl'>&#8377; {reports.expense}</p>
                            <p className='text-sm font-semibold text-purple-500'>Income</p>
                        </div>
                    </div>
                    <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex items-center rounded-lg bg-orange-300'>
                        <div className='p-2 bg-white text-orange-300 text-4xl rounded-md'>
                            <PiCoinsThin />
                        </div>
                        <div className='p-2'>
                            <p className='font-semibold text-orange-600 text-xl'>&#8377; {reports.profit}</p>
                            <p className='text-sm font-semibold text-orange-500'>Income</p>
                        </div>
                    </div>
                    <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex items-center rounded-lg bg-red-300'>
                        <div className='p-2 bg-white text-red-300 text-4xl rounded-md'>
                            <FaArrowTrendDown />
                        </div>
                        <div className='p-2'>
                            <p className='font-semibold text-red-600 text-xl'>&#8377; {reports.loss}</p>
                            <p className='text-sm font-semibold text-red-500'>Loss</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance  */}
            <div className='w-full p-4'>
                <p className='text-2xl font-semibold mb-4'>Attendance</p>
                <div className='w-full mt-6 grid grid-cols-4 gap-4'>
                    <div className='w-full p-3 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-xl'>
                        <div className='text-3xl text-gray-300 flex justify-end'>
                            <TbUsersGroup />
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{reports.rotarians}</p>
                            <p className='text-gray-400'>Rotarians</p>
                        </div>
                        <ProgressBar current={reports.rotarians} total={reports.totalMembers}/>
                    </div>
                    <div className='w-full p-3 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-xl'>
                        <div className='text-3xl text-gray-300 flex justify-end'>
                            <TbUsersGroup />
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{reports.otherGuests}</p>
                            <p className='text-gray-400'>Other Guests</p>
                        </div>
                        <ProgressBar current={reports.otherGuests} total={reports.totalMembers}/>
                    </div>
                    <div className='w-full p-3 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-xl'>
                        <div className='text-3xl text-gray-300 flex justify-end'>
                            <TbUsersGroup />
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{reports.alumnus}</p>
                            <p className='text-gray-400'>Alumnus</p>
                        </div>
                        <ProgressBar current={reports.alumnus} total={reports.totalMembers}/>
                    </div>
                    <div className='w-full p-3 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-xl'>
                        <div className='text-3xl text-gray-300 flex justify-end'>
                            <TbUsersGroup />
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{reports.otherClubMembers}</p>
                            <p className='text-gray-400'>Other Club Members</p>
                        </div>
                        <ProgressBar current={reports.otherClubMembers} total={reports.totalMembers}/>
                    </div>
                    <div className='w-full p-3 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-xl'>
                        <div className='text-3xl text-gray-300 flex justify-end'>
                            <TbUsersGroup />
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{reports.otherPis}</p>
                            <p className='text-gray-400'>Other PIS</p>
                        </div>
                        <ProgressBar current={reports.otherPis} total={reports.totalMembers}/>
                    </div>
                    <div className='w-full p-3 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-xl'>
                        <div className='text-3xl text-gray-300 flex justify-end'>
                            <TbUsersGroup />
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{reports.otherDistrictRotaractors}</p>
                            <p className='text-gray-400'>Other District Rotaractors</p>
                        </div>
                        <ProgressBar current={reports.otherDistrictRotaractors} total={reports.totalMembers}/>
                    </div>
                    <div className='w-full p-3 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-xl'>
                        <div className='text-3xl text-gray-300 flex justify-end'>
                            <TbUsersGroup />
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{reports.interactors}</p>
                            <p className='text-gray-400'>Interactors</p>
                        </div>
                        <ProgressBar current={reports.interactors} total={reports.totalMembers}/>
                    </div>
                    <div className='w-full p-3 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-xl'>
                        <div className='text-3xl text-gray-300 flex justify-end'>
                            <TbUsersGroup />
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{reports.totalMembers}</p>
                            <p className='text-gray-400'>Total</p>
                        </div>
                        <ProgressBar current={reports.totalMembers} total={reports.totalMembers}/>
                    </div>
                </div>
            </div>

            {/* Close the modal */}
            <div className='p-4 flex justify-end items-end'>
                <button 
                    onClick={onClose}
                    className="p-1 px-4 bg-white hover:text-white hover:bg-red-500 text-lg text-center text-red-500 border-[1px] border-red-500 rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default RotaractMeetingView