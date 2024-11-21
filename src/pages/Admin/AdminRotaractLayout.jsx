import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../store/adminSlice';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { LuDelete } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom'

const AdminRotaractLayout = () => {
  const dispatch = useDispatch();
  const { groupedUsers, isLoading, error } = useSelector((state) => state.admin);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // console.log("grouped users: ",groupedUsers)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  
  const users = groupedUsers.Rotaract

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProjectView = (userId) => {
    // console.log("userId of project: ", userId)
    navigate(`/admin/admin-rotaract/${userId}/projects`);
  };

  const handleMeetingView = (userId) => {
    navigate(`/admin/admin-rotaract/${userId}/meetings`);
  };

  const handleMouView = (userId) => {
    // console.log("userId of Mou: ", userId)
    navigate(`/admin/admin-rotaract/${userId}/mou`);
  };

  return (
    <div className='w-full p-4'>
      <p className='text-2xl font-semibold'>Rotaract Members</p>
      <div className='w-[50%] h-28 p-4 flex flex-col justify-center'>
        <input 
            type="text" 
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder='Search by first or last name...'
            className='bg-gray-100 p-2 rounded-lg w-[60%] focus:outline-green-500'
        />
        <p className='text-gray-400 p-2 font-semibold'>Total {users.length || 0} members</p>
    </div>
      <div className='p-4 m-4 bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-lg overflow-hidden'>
        <div className='w-full text-md font-semibold flex justify-between items-center bg-gray-100 p-2 my-2 rounded-xl'>
            <div className='w-[15%] uppercase'>First Name</div>
            <div className='w-[15%] uppercase'>Last Name</div>
            <div className='w-[30%] uppercase'>Email</div>
            <div className='w-[10%] flex justify-center'>MoU</div>
            <div className='w-[10%] uppercase flex justify-center'>Meeting</div>
            <div className='w-[10%] uppercase flex justify-center'>Project</div>
            <div className='w-[10%] uppercase flex justify-center'>Remove</div>
        </div>
        <div>
            {filteredUsers.length > 0 
                ? (filteredUsers.map((user) => (
                    <div key={user._id} className='w-full text-lg flex justify-between items-center p-2 my-1 rounded-xl'>
                        <div className='w-[15%]'>{user.firstName}</div>
                        <div className='w-[15%]'>{user.lastName}</div>
                        <div className='w-[30%]'>{user.email}</div>
                        {/* <div className='w-[10%]'>{user.role}</div> */}
                        <div className='w-[10%] flex justify-center'>
                            <button onClick={() => handleMouView(user._id)} className='text-blue-500'><FaEye /></button>
                        </div>
                        <div className='w-[10%] flex justify-center'>
                            <button onClick={() => handleMeetingView(user._id)} className='text-blue-500'><FaEye /></button>
                        </div>
                        <div className='w-[10%] flex justify-center'>
                            <button onClick={() => handleProjectView(user._id)} className='text-blue-500'><FaEye /></button>
                        </div>
                        <div className='w-[10%] flex justify-center'>
                            <button onClick={() => handleRemove(user._id)} className='text-pink-500'><LuDelete /></button>
                        </div>
                    </div>
                ))) 
                : (
                    <div className='text-center text-2xl text-gray-500 font-semibold'>
                        No user found!!!
                    </div>
                )
            }
        </div>
      </div>
      <div className='w-full p-4 flex justify-start items-center'>
        <Link to='/admin'>
          <button className='px-2 py-1 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white'>
              Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminRotaractLayout;
