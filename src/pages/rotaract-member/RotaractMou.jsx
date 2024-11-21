import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { RxReload } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getRotaractMouByUser } from '../../store/rotaractMemberSlice';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import RotaractMouView from './RotaractMouView';

const PAGE_SIZE = 5;

const user = JSON.parse(localStorage.getItem("user"));

function RotaractMou() {

  const dispatch = useDispatch();
    const { mouReportByUser, isLoading } = useSelector((state) => { 
        return (
            (state.rotaract)
        )
    });

    
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
                await dispatch(getRotaractMouByUser({ userId: user._id, page: pageIndex + 1, limit: PAGE_SIZE, searchQuery: searchQuery }));
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
    
    
    // console.log("filter report: ", mouReportByUser.data);

    const handleSearch = (e) => {
        const query = e.target.value;
        // console.log("query: ", query);
        setSearchQuery(query);
        setPageIndex(0);
        navigate(`/member/rotaract-member/mou?page=1&searchQuery=${query}`);
    };

    const handleReload = () => {
        window.location.reload();
    };

    const handlePageChange = (newPageIndex) => {
        if (newPageIndex >= 0 && newPageIndex < mouReportByUser.totalPages) {
            setPageIndex(newPageIndex);
            navigate(`/member/rotaract-member/mou?page=${newPageIndex + 1}`);
        }
    };

  return (
    <div className='w-full min-h-[calc(100vh-99px)]'>
      <div className='w-full h-40 flex justify-around items-center'>
          <div className='font-semibold text-3xl'>
              MoU
          </div>
          <div className='flex gap-2'>
              <Link to='/member/rotaract-member/mou/mou-report'>
                  <button className='px-4 py-2 text-xl flex gap-4 items-center bg-white text-green-500 border-2 border-green-500 rounded-xl hover:bg-green-500 hover:text-white'>
                      <FaPlus className='text-2xl font-bold'/>New MoU Report
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
              placeholder='Search by sponsor name...'
              className='bg-gray-100 p-2 rounded-lg w-[60%] focus:outline-green-500'
          />
          <p className='text-gray-400 p-2 font-semibold'>Total {mouReportByUser?.totalReports || 0} records</p>
      </div>

      <RotaractMouView reports={filteredReports} />

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

export default RotaractMou