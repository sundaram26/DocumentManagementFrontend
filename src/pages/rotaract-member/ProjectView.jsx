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
import { LuHeartHandshake } from "react-icons/lu";
import { AiOutlineCrown } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { PiCoinsThin } from "react-icons/pi";
import { FaArrowTrendDown } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { TbUsersGroup } from "react-icons/tb";
import ProgressBar from '../../components/common/ProgressBar.jsx';
import LinkPopup from '../../components/common/LinkPopup.jsx'
// import { graphUp } from '../../assets/index.js';

const ProjectView = ({onClose, reports}) => {

    // const projectAim = DOMPurify.sanitize(reports.projectAim);
    // const projectGroundwork = DOMPurify.sanitize(reports.projectGroundwork);
    const feedbacks = reports.feedbackList
    const supportDocuments = {
        'Cover Image': reports.coverImageUrl,
        'Attendance': reports.attendanceImageUrl,
        'Support Document': reports.supportDocumentUrl,
    };

    const financeExcelSheet = {
        'Project Finance ExcelSheet': reports.financeExcelSheet
    }

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

    const [isPopupOpenSupportDoc, setIsPopupOpenSupportDoc] = useState(false);
    const openPopupSupportDoc = () => {
        setIsPopupOpenSupportDoc(true);
    };
    const closePopupSupportDoc = () => {
        setIsPopupOpenSupportDoc(false);
    };
    
    const [isPopupOpenProjectFinance, setIsPopupOpenProjectFinance] = useState(false);
    const openPopupProjectFinance = () => {
        setIsPopupOpenProjectFinance(true);
    };
    const closePopupProjectFinance = () => {
        setIsPopupOpenProjectFinance(false);
    };


  return (
        <div className="w-full bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden">
            
            {/* Project Name, Faculty Name, ProjectId, Status */}
            <div className='w-full p-4 pb-1 border-b-2'>
                <p className='text-xl font-semibold'>{reports.projectName}</p>
                {/* <p className='text-lg font-semibold text-gray-400'>{`Conducted by ${reports.facultyName}`}</p> */}
                <div className='flex items-center gap-4'>
                    <div className='px-4 py-[2px] my-2 border-[2px] border-blue-200 bg-blue-200 text-blue-500 flex items-center gap-2 rounded-full'>
                        <FiTag />
                        {reports.projectId}
                    </div>
                    <div className='px-4 py-[2px] my-2 capitalize border-[2px] border-purple-300 text-purple-600 flex justify-center items-center gap-2 rounded-full'>
                        <FiTag />
                        {reports.status}
                    </div>
                    {reports.isJointProject && 
                    <div className='px-4 py-[2px] my-2 capitalize border-[2px] border-pink-500 text-pink-500 flex justify-center items-center gap-2 rounded-full'>
                        <LuHeartHandshake />
                        {reports.isJointProject}
                        {reports.jointProjectPartner}
                    </div>}
                    {reports.isAnInstallation && 
                    <div className='px-4 py-[2px] my-2 capitalize border-[2px] border-gray-300 text-gray-600 flex justify-center items-center gap-2 rounded-full'>
                        <CiSettings />
                        {reports.isAnInstallation}
                    </div>}
                    {reports.isFlagship && 
                    <div className='px-4 py-[2px] my-2 capitalize border-[2px] border-yellow-500 text-yellow-500 flex justify-center items-center gap-2 rounded-full'>
                        <AiOutlineCrown />
                        {reports.isFlagship}
                    </div>}
                </div>
            </div>

            {/* Venue, Start Date & Time, End Date & Time, Primary Avenue, Secondary Avenue, Project mode */}
            <div className='w-full p-4 grid grid-cols-3 gap-4'>
                <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] capitalize flex items-center rounded-lg'>
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
                <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex items-center rounded-lg'>
                    <div className='p-2 bg-green-200 text-green-600 text-4xl rounded-md'>
                        <HiOutlineSquares2X2 />
                    </div>
                    <div className='p-2'>
                        <p className='font-semibold'>{reports.avenue1}</p>
                        <p className='text-sm font-semibold text-gray-400'>Primary Avenue</p>
                    </div>
                </div>
                <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex items-center rounded-lg'>
                    <div className='p-2 bg-purple-200 text-purple-600 text-4xl rounded-md'>
                        <HiOutlineSquares2X2 />
                    </div>
                    <div className='p-2'>
                        <p className='font-semibold'>{reports.avenue2}</p>
                        <p className='text-sm font-semibold text-gray-400'>Secondary Avenue</p>
                    </div>
                </div>
                <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] capitalize flex items-center rounded-lg'>
                    <div className='p-2 bg-orange-200 text-orange-600 text-4xl rounded-md'>
                        <PiCloudX />
                    </div>
                    <div className='p-2'>
                        <p className='font-semibold'>{reports.projectMode}</p>
                        <p className='text-sm font-semibold text-gray-400'>Project Mode</p>
                    </div>
                </div>
            </div>

            {/* Project Details */}
            <div className='w-full p-4'>
                <p className='text-2xl font-semibold'>Project Details</p>
                <div className='pt-4 pb-8 border-b-2 border-gray-200'>
                    <p className='text-xl mb-1 text-gray-600 font-semibold'>Aim:</p>
                    <div className='w-full h-[25vh] p-4 border-[1px] border-gray-200 rounded-lg overflow-y-auto'>
                        <div dangerouslySetInnerHTML={{ __html: reports.projectAim }} />
                    </div>
                </div>
                <div className='pt-4 pb-8 border-b-2 border-gray-200'>
                    <p className='text-xl mb-1 text-gray-600 font-semibold'>Project Groundwork:</p>
                    <div className='w-full h-[25vh] p-4 border-[1px] border-gray-200 rounded-lg overflow-y-auto'>
                        <div dangerouslySetInnerHTML={{ __html: reports.projectGroundwork }} />
                    </div>
                </div>
                <div className='pt-4 pb-8 border-b-2 border-gray-200'>
                    <p className='text-xl mb-1 text-gray-600 font-semibold'>Project Summary:</p>
                    <div className='w-full h-[25vh] p-4 border-[1px] border-gray-200 rounded-lg overflow-y-auto'>
                        <div dangerouslySetInnerHTML={{ __html: reports.projectSummary }} />
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
            {/* <div className='w-full p-4 flex items-center gap-2'>
                <p className='text-xl'>To View the</p>
                <button onClick={openAllUrls} disabled={isOpening} className="cursor-pointer text-purple-600 font-semibold flex items-center gap-2">
                    Supporting Documents <FiExternalLink />
                </button>
            </div> */}

            {/* Support Document Url  */}
            <div className='w-full px-4 flex items-center gap-2'>
                <p className='text-xl'>To View the</p>
                <button onClick={openPopupSupportDoc} className="cursor-pointer text-purple-600 text-xl font-semibold flex items-center gap-2">
                    Supporting Documents <FiExternalLink />
                </button>
                {/* Render Popup */}
                {isPopupOpenSupportDoc && <LinkPopup links={supportDocuments} onClose={closePopupSupportDoc} />}
            </div>

            {/* Project Finance  */}
            <div className='w-full p-4 mt-4'>
                <p className='text-2xl mb-2 font-semibold'>Project Finances</p>
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
                            <p className='text-sm font-semibold text-purple-500'>Expense</p>
                        </div>
                    </div>
                    <div className='p-2 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex items-center rounded-lg bg-orange-300'>
                        <div className='p-2 bg-white text-orange-300 text-4xl rounded-md'>
                            <PiCoinsThin />
                        </div>
                        <div className='p-2'>
                            <p className='font-semibold text-orange-600 text-xl'>&#8377; {reports.profit}</p>
                            <p className='text-sm font-semibold text-orange-500'>Profit</p>
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
                <div className='w-full mt-4 flex items-center gap-2'>
                    <p className='text-xl'>To View the</p>
                    <button onClick={openPopupProjectFinance} className="cursor-pointer text-purple-600 text-xl font-semibold flex items-center gap-2">
                        Project Finance <FiExternalLink />
                    </button>
                    {/* Render Popup */}
                    {isPopupOpenProjectFinance && <LinkPopup links={financeExcelSheet} onClose={closePopupProjectFinance} />}
                </div>
            </div>

            {/* Attendance  */}
            <div className='w-full p-4'>
                <p className='text-2xl font-semibold mb-4'>Attendance</p>
                <div className='w-full'>
                    <div className='w-full min-h-20 p-3 pt-10 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-xl'>
                        <div className='flex items-center flex-wrap gap-2'>
                            {reports.chairPersons.map((person) => (
                                <div className='p-1 pr-4 border-[1px] border-gray-200 rounded-full flex items-center gap-2'>
                                    <div className='h-6 w-6 bg-gray-300 flex justify-center items-center rounded-full text-gray-600'>
                                        <IoPerson />
                                    </div>
                                    {person}
                                </div>
                            ))}
                        </div>
                        <p className='mt-2 text-gray-400'>Project Chair Persons</p>
                        <ProgressBar current={reports.chairPersons.length} total={24}/>
                    </div>
                </div>
                <div className="w-full">
                    <div className='w-full mt-6 p-3 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-xl'>
                        <div className='text-3xl text-gray-300 flex justify-end'>
                            <TbUsersGroup />
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{reports.activeHomeClubMembers}</p>
                            <p className='text-gray-400'>Active Home Club Members</p>
                        </div>
                        <ProgressBar current={reports.activeHomeClubMembers} total={reports.totalMembers}/>
                    </div>
                    <div className='w-full mt-6 p-3 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-xl'>
                        <div className='text-3xl text-gray-300 flex justify-end'>
                            <TbUsersGroup />
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{reports.guestHomeClubMembers}</p>
                            <p className='text-gray-400'>Guest Home Club Members</p>
                        </div>
                        <ProgressBar current={reports.guestHomeClubMembers} total={reports.totalMembers}/>
                    </div>
                    <div className='w-full mt-6 p-3 shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-xl'>
                        <div className='text-3xl text-gray-300 flex justify-end'>
                            <TbUsersGroup />
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{reports.districtCouncilMembers}</p>
                            <p className='text-gray-400'>District Council Members</p>
                        </div>
                        <ProgressBar current={reports.districtCouncilMembers} total={reports.totalMembers}/>
                    </div>
                </div>
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

export default ProjectView