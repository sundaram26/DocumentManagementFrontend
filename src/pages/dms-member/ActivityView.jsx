import React, { useState } from 'react'
import { FiTag } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { RiTimeLine } from "react-icons/ri";
import { PiCloudX } from "react-icons/pi";
// import DOMPurify from 'dompurify';
import { useSwipeable } from 'react-swipeable';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { CiBadgeDollar } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import { LuHeartHandshake } from "react-icons/lu";
import { PiCoinsThin } from "react-icons/pi";
import { FaArrowTrendDown } from "react-icons/fa6";
import LinkPopup from '../../components/common/LinkPopup.jsx'

const ActivityView = ({onClose, reports}) => {

    // const activityAim = DOMPurify.sanitize(reports.activityAim);
    // const activityGroundwork = DOMPurify.sanitize(reports.activityGroundwork);
    const feedbacks = reports.feedbackList
    const supportDocuments = {
      'Cover Image': reports.coverImageUrl,
      'Attendance': reports.attendanceImageUrl,
      'Support Document': reports.supportDocumentUrl,
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    // const [isOpening, setIsOpening] = useState(false);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleNext(),
        onSwipedRight: () => handlePrevious(),
    });

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
    };


    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };


  return (
        <div className="w-full bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden">
            
            {/* Activity Name, Faculty Name, ActivityId, Status */}
            <div className='w-full p-4 pb-1 border-b-2'>
                <p className='text-xl capitalize font-semibold'>{reports.activityName}</p>
                <p className='text-lg font-semibold capitalize text-gray-400'>{`Conducted by ${reports.facultyName}`}</p>
                <div className='flex items-center gap-4'>
                    <div className='px-4 py-[2px] my-2 border-[2px] border-blue-200 bg-blue-200 text-blue-500 flex items-center gap-2 rounded-full'>
                        <FiTag />
                        {reports.activityId}
                    </div>
                    <div className='px-4 py-[2px] my-2 capitalize border-[2px] border-gray-300 text-gray-600 flex justify-center items-center gap-2 rounded-full'>
                        <FiTag />
                        {reports.status}
                    </div>
                    {reports.isJointActivity && 
                    <div className='px-4 py-[2px] my-2 capitalize border-[2px] border-pink-500 text-pink-500 flex justify-center items-center gap-2 rounded-full'>
                        <LuHeartHandshake />
                        {reports.isJointActivity}
                        {reports.jointActivityPartner}
                    </div>}
                </div>
            </div>

            {/* Venue, Start Date & Time, End Date & Time, Primary Avenue, Secondary Avenue, Activity mode */}
            <div className='w-full p-4 grid grid-cols-2 gap-4'>
                <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex items-center rounded-lg'>
                    <div className='p-2 bg-red-200 text-red-600 text-4xl rounded-md'>
                        <GrLocation />
                    </div>
                    <div className='p-2'>
                        <p className='font-semibold capitalize'>{reports.venue}</p>
                        <p className='text-sm font-semibold capitalize text-gray-400'>Venue</p>
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
                        <p className='text-sm font-semibold capitalize text-gray-400'>Start Date & Time</p>
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
                        <p className='text-sm font-semibold capitalize text-gray-400'>Start Date & Time</p>
                    </div>
                </div>               
                <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex items-center rounded-lg'>
                    <div className='p-2 bg-orange-200 text-orange-600 text-4xl rounded-md'>
                        <PiCloudX />
                    </div>
                    <div className='p-2'>
                        <p className='font-semibold capitalize'>{reports.activityMode}</p>
                        <p className='text-sm font-semibold capitalize text-gray-400'>Activity Mode</p>
                    </div>
                </div>
            </div>

            {/* Activity Details */}
            <div className='w-full p-4'>
                <p className='text-2xl font-semibold'>Activity Details</p>
                <div className='pt-4 pb-8 border-b-2 border-gray-200'>
                    <p className='text-xl mb-1 text-gray-600 font-semibold'>Aim:</p>
                    <div className='w-full h-[25vh] p-4 border-[1px] border-gray-200 rounded-lg overflow-y-auto'>
                        <div dangerouslySetInnerHTML={{ __html: reports.activityAim }} />
                    </div>
                </div>
                <div className='pt-4 pb-8 border-b-2 border-gray-200'>
                    <p className='text-xl mb-1 text-gray-600 font-semibold'>Activity Groundwork:</p>
                    <div className='w-full h-[25vh] p-4 border-[1px] border-gray-200 rounded-lg overflow-y-auto'>
                        <div dangerouslySetInnerHTML={{ __html: reports.activityGroundwork }} />
                    </div>
                </div>
            </div>

            {/* Feedbacks */}
            {feedbacks && feedbacks.length > 0 && feedbacks.some(feedback => feedback.feedbackMessage.trim() !== '') && (
                <div className='w-full p-4'>
                    <p className='text-xl mb-1 text-gray-600 font-semibold'>Feedbacks:</p>

                    <div className='w-full p-4'>
                        <div
                            {...swipeHandlers}
                            className="relative w-full p-4 rounded-lg bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex flex-col justify-center items-center"
                        >
                            <button
                                className="absolute bg-gray-200 left-2 p-2 rounded-full shadow-md hover:bg-gray-300"
                                onClick={handlePrevious}
                            >
                                <IoChevronBack />
                            </button>

                            {/* Render feedback content only if there's a valid feedback message */}
                            {feedbacks[currentIndex] && feedbacks[currentIndex].feedbackMessage.trim() !== '' && (
                                <div className="w-full text-center px-24">
                                    <p className="w-full text-lg flex flex-start mt-4">{feedbacks[currentIndex].feedbackMessage}</p>
                                    <p className="w-full text-xl text-gray-400 flex flex-start mt-4">{`~ ${feedbacks[currentIndex].feedbackGivenBy}`}</p>
                                </div>
                            )}

                            {/* Arrow for Next */}
                            <button
                                className="absolute right-2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
                                onClick={handleNext}
                            >
                                <IoChevronForward />
                            </button>

                            {/* Pagination Dots */}
                            <div className="flex mt-4">
                                {feedbacks.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 mx-1 mt-8 rounded-full ${
                                            index === currentIndex ? 'bg-purple-500' : 'bg-gray-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Support Document Url  */}
            <div className='w-full px-4 flex items-center gap-2'>
                <p className='text-xl'>To View the</p>
                <button onClick={openPopup} className="cursor-pointer text-purple-600 text-xl font-semibold flex items-center gap-2">
                    Supporting Documents <FiExternalLink />
                </button>
                {/* Render Popup */}
                {isPopupOpen && <LinkPopup links={supportDocuments} onClose={closePopup} />}
            </div>

            {/* Activity Finance  */}
            <div className='w-full p-4 mt-4'>
                <p className='text-xl mb-2'>Activity Finances</p>
                <div className='w-full grid grid-cols-4 gap-4'>
                    <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex items-center rounded-lg bg-purple-300'>
                        <div className='p-2 bg-white text-purple-300 text-4xl rounded-md'>
                            <CiWallet />
                        </div>
                        <div className='p-2'>
                            <p className='font-semibold text-purple-600 text-xl'>&#8377; {reports.expense}</p>
                            <p className='text-sm font-semibold text-purple-500'>Expense</p>
                        </div>
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

export default ActivityView