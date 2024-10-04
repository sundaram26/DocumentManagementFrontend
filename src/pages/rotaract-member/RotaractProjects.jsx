import React, { useState, useEffect } from 'react'
import { FaPlus, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/common/Modal';
import { fetchProjectReportsByUser } from '../../store/rotaractMemberSlice';
import ProjectView from './ProjectView.jsx';


const PAGE_SIZE = 5;

const user = JSON.parse(localStorage.getItem("user"));
const RotaractProjects = () => {

    const dispatch = useDispatch();
    const { projectReportsByUser, isLoading } = useSelector((state) => { 
        // console.log("data comming from rotaractMemberSlice: ",state.rotaract)
        return (
            (state.rotaract)
        )
    });

    // console.log("project reports by user: ", projectReportsByUser);
    
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get("page")) || 1;
    const initialSearch = queryParams.get("searchQuery") || '';
    const [pageIndex, setPageIndex] = useState(initialPage - 1);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [filteredReports, setFilteredReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                await dispatch(fetchProjectReportsByUser({ userId: user._id, page: pageIndex + 1, limit: PAGE_SIZE, searchQuery: searchQuery }));
            } catch (err) {
                console.error("Failed to fetch reports");
            }
        };

        fetchReports();
    }, [dispatch, pageIndex, searchQuery]);

    useEffect(() => {
        if (projectReportsByUser && projectReportsByUser.data) {
            setFilteredReports(projectReportsByUser.data);
        } else {
            setFilteredReports([]);
        }
    }, [projectReportsByUser]);
    

    // console.log("filter report: ", filteredReports);

    const handleSearch = (e) => {
        const query = e.target.value;
        // console.log("query: ", query);
        setSearchQuery(query);
        setPageIndex(0);
        navigate(`/member/rotaract-member/projects?page=1&searchQuery=${query}`);
    };

    const handleView = (report) => {
        // console.log("Viewing report:", report);
        setSelectedReport(report);
        setShowModal(true);
    };

    const handleReload = () => {
        window.location.reload();
    };

    const handlePageChange = (newPageIndex) => {
        if (newPageIndex >= 0 && newPageIndex < projectReportsByUser.totalPages) {
            setPageIndex(newPageIndex);
            navigate(`/member/rotaract-member/projects?page=${newPageIndex + 1}`);
        }
    };

  return (
    <div className='w-full min-h-[calc(100vh-99px)]'>
        <Modal isVisible={showModal}>
            <ProjectView onClose={() => setShowModal(false)} reports={selectedReport}/>
        </Modal>
        <div className='w-full h-40 flex justify-around items-center'>
            <div className='font-semibold text-3xl'>
                Projects
            </div>
            <div className='flex gap-2'>
                <Link to='/member/rotaract-member/projects/project-report'>
                    <button className='px-4 py-2 text-xl flex gap-4 items-center bg-white text-green-500 border-2 border-green-500 rounded-xl hover:bg-green-500 hover:text-white'>
                        <FaPlus className='text-2xl font-bold'/>New Project Report
                    </button>
                </Link>
                <Link to='/member/rotaract-member/projects/drafts'>
                    <button className='px-4 py-2 text-xl flex gap-4 items-center bg-white text-sky-500 border-2 border-sky-500 rounded-xl hover:bg-sky-500 hover:text-white'>
                        <IoBookmarkOutline  className='text-2xl font-bold'/>Draft Project
                    </button>
                </Link>
                <button onClick={handleReload} className='px-2 bg-white text-gray-500 border-2 border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white'>
                    <RxReload className='text-4xl'/>
                </button>
            </div>
        </div>
        <div className='w-[50%] h-28 p-4 flex flex-col justify-center'>
            <input 
                type="text" 
                value={searchQuery}
                onChange={handleSearch}
                placeholder='Search by project id...'
                className='bg-gray-100 p-2 rounded-lg w-[60%] focus:outline-green-500'
            />
            <p className='text-gray-400 p-2 font-semibold'>Total {projectReportsByUser?.totalReports || 0} records</p>
        </div>
        <div className='p-4 m-4 bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-lg overflow-hidden'>
            {isLoading && <p>Loading...</p>}

            <div className='w-full text-md font-semibold flex justify-between items-center bg-gray-100 p-2 my-2 rounded-xl'>
                <div className='w-[10%] uppercase'>Project ID</div>
                <div className='w-[10%] uppercase'>Name</div>
                <div className='w-[15%] uppercase'>Report Status</div>
                <div className='w-[20%] uppercase'>Avenue Main</div>
                <div className='w-[20%] uppercase'>Avenue Optional</div>
                <div className='w-[15%] uppercase'>Faculty Name</div>
                <div className='w-[10%] uppercase'>Actions</div>
            </div>
            
            <div>
                {filteredReports.length > 0 
                    ? (filteredReports.map((report) => (
                        <div key={report.projectId} className='w-full text-md flex justify-between items-center p-2 my-1 rounded-xl'>
                            <div className='w-[10%]'>{report.projectId}</div>
                            <div className='w-[10%]'>{report.projectName}</div>
                            <div className='w-[15%]'>
                                {report.status === 'early' ? (
                                    <div className='h-8 w-fit px-2 py-0 text-lg capitalize flex justify-center items-center gap-2 border-2 rounded-full'>
                                    <span className='text-3xl font-extrabold text-purple-500'>&#183;</span>
                                    {report.status}
                                    </div>
                                ) : report.status === 'on-time' ? (
                                    <div className='h-8 w-fit px-2 py-0 text-lg capitalize flex justify-center items-center gap-2 border-2 rounded-full'>
                                    <span className='text-3xl font-extrabold text-green-500'>&#183;</span>
                                    {report.status}
                                    </div>
                                ) : report.status === 'late' ? (
                                    <div className='h-8 w-fit px-2 py-0 text-lg capitalize flex justify-center items-center gap-2 border-2 rounded-full'>
                                    <span className='text-3xl font-extrabold text-red-500'>&#183;</span>
                                    {report.status}
                                    </div>
                                ) : null}
                            </div>
                            <div className='w-[20%]'>{report.avenue1}</div>
                            <div className='w-[20%]'>{report.avenue2}</div>
                            <div className='w-[15%]'>{report.facultyName}</div>
                            <div className='w-[10%] flex gap-2'>
                                <button onClick={() => handleView(report)} className='text-blue-500'><FaEye /></button>
                            </div>
                        </div>
                    ))) 
                    : (
                        <div className='text-center text-2xl text-gray-500 font-semibold'>
                            You haven't submitted any project yet.
                        </div>
                    )}
            </div>
            
            <div className='flex justify-between p-2'>
                <div className='p-1 border-2 border-green-500 bg-transparent hover:bg-green-500 text-green-500 hover:text-white flex justify-center items-center rounded-lg'>
                    <button onClick={() => handlePageChange(pageIndex - 1)} disabled={pageIndex === 0} className='text-3xl'><IoChevronBack /></button>
                </div>
                <div className='p-1 border-2 border-green-500 bg-transparent hover:bg-green-500 text-green-500 hover:text-white flex justify-center items-center rounded-lg'>
                    <button onClick={() => handlePageChange(pageIndex + 1)} disabled={(pageIndex + 1) >= (projectReportsByUser?.totalPages || 0)} className='text-3xl'><IoChevronForward /></button>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default RotaractProjects