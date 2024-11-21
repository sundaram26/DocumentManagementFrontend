import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { RxReload } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteRotaractMou, getRotaractMouByUser } from '../../store/rotaractMemberSlice';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import AdminRotaractMouView from './AdminRotaractMouView';
import { toast } from 'react-toastify';

const PAGE_SIZE = 5;

// const user = JSON.parse(localStorage.getItem("user"));

function AdminRotaractMou() {

  const dispatch = useDispatch();
    const { mouReportByUser, isLoading } = useSelector((state) => { 
        return (
            (state.rotaract)
        )
    });

    const { userId } = useParams();
    
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
                await dispatch(getRotaractMouByUser({ userId, page: pageIndex + 1, limit: PAGE_SIZE, searchQuery: searchQuery }));
            } catch (err) {
                console.error("Failed to fetch reports");
            }
        };

        fetchReports();
    }, [dispatch, pageIndex, searchQuery]);

    useEffect(() => {
        if (mouReportByUser && mouReportByUser.data) {
            setFilteredReports(mouReportByUser.data);
        } else {
            setFilteredReports([]);
        }
    }, [mouReportByUser]);
    
    // console.log("userId of Mou: ", userId)
    // console.log("filter report: ", mouReportByUser.data);

    const handleSearch = (e) => {
      const query = e.target.value;
      // console.log("query: ", query);
      setSearchQuery(query);
      setPageIndex(0);
      navigate(`/admin/admin-rotaract/${userId}/mou?page=1&searchQuery=${query}`);
  };

    const handleReload = () => {
        window.location.reload();
    };

    const handleDelete = async (mouId) => {
    //   console.log("Deleting report with ID:", mouId);
      try {
          await dispatch(deleteRotaractMou(mouId));
          // Remove the deleted report from the local state
          if (Array.isArray(filteredReports)) {
              setFilteredReports(filteredReports.filter(report => report.mouId !== mouId));
              toast.success("Project Report has been deleted successfully")
          } else {
              console.error("Filtered reports is not an array:", filteredReports);
          }
          
          handleReload()
      } catch (error) {
          toast.error("Failed to delete the report");
      }
  };


    const handlePageChange = (newPageIndex) => {
      if (newPageIndex >= 0 && newPageIndex < mouReportByUser.totalPages) {
          setPageIndex(newPageIndex);
          navigate(`/admin/admin-rotaract/${userId}/mou?page=${newPageIndex + 1}`);
      }
    };

  return (
    <div className='w-full min-h-[calc(100vh-99px)]'>
      <div className='w-full h-28 flex justify-around items-center'>
          <div className='font-semibold text-3xl'>
              MoUs
          </div>
          <div className='p-2'>
              <button onClick={handleReload} className='bg-white text-gray-500 border-2 border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white'>
                  <RxReload className='text-4xl m-1'/>
              </button>
          </div>
      </div>
      <div className='w-[50%] h-28 p-4 flex flex-col justify-center'>
          <input 
              type="text" 
              value={searchQuery}
              onChange={handleSearch}
              placeholder='Search by sponsor name...'
              className='bg-gray-100 p-2 rounded-lg w-[60%] focus:outline-green-500'
          />
          <p className='text-gray-400 p-2 font-semibold'>Total {mouReportByUser?.totalReports || 0} records</p>
      </div>

      <AdminRotaractMouView reports={filteredReports} handleDelete={handleDelete}/>

      <div className='flex justify-between p-2'>
          <div className='p-1 border-2 border-green-500 bg-transparent hover:bg-green-500 text-green-500 hover:text-white flex justify-center items-center rounded-lg'>
              <button onClick={() => handlePageChange(pageIndex - 1)} disabled={pageIndex === 0} className='text-3xl'><IoChevronBack /></button>
          </div>
          <div className='p-1 border-2 border-green-500 bg-transparent hover:bg-green-500 text-green-500 hover:text-white flex justify-center items-center rounded-lg'>
              <button onClick={() => handlePageChange(pageIndex + 1)} disabled={(pageIndex + 1) >= (mouReportByUser?.totalPages || 0)} className='text-3xl'><IoChevronForward /></button>
          </div>
      </div>

    </div>
  )
}

export default AdminRotaractMou