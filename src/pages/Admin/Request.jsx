import React, { useEffect } from 'react';
import { FaRegCheckSquare } from "react-icons/fa";
import { LuBan } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { approveUser, disApproveUser, fetchUnapprovedUsers } from '../../store/adminSlice';

const Request = () => {
    const dispatch = useDispatch();
    const { users, isLoading, error } = useSelector(state => state.admin);

    useEffect(() => {
        dispatch(fetchUnapprovedUsers());
    }, [dispatch]);

    const handleApprove = async (userId) => {
        try {
            const actionResult = await dispatch(approveUser(userId)).unwrap();
            // console.log('User approved successfully:', actionResult);
            window.location.reload(); 
        } catch (error) {
            console.error('Failed to approve user:', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            const actionResult = await dispatch(disApproveUser(userId)).unwrap();
            // console.log('User deleted successfully:', actionResult);
            // Handle success, e.g., showing a success message or refreshing data
            window.location.reload(); // Refresh the window after approving
        } catch (error) {
            console.error('Failed to delete user:', error);
            // Handle error, e.g., showing an error message
        }
    };



    // if (isLoading) return <p>Loading...</p>;
    const unapprovedUsers = users.filter(user => !user.isApproved);
    // console.log('User: ', unapprovedUsers)

    return (
        <div className='w-full p-4'>
            <p className='text-2xl font-semibold'>Login Requests</p>
            <div className='p-4 m-4 bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.2)] rounded-lg overflow-hidden'>
                <div className='w-full text-md font-semibold flex justify-between items-center bg-gray-100 p-2 my-2 rounded-xl'>
                    <div className='w-[15%] uppercase'>First Name</div>
                    <div className='w-[15%] uppercase'>Last Name</div>
                    <div className='w-[40%] uppercase'>Email</div>
                    <div className='w-[10%] uppercase'>Role</div>
                    <div className='w-[10%] uppercase flex justify-center'>Accept</div>
                    <div className='w-[10%] uppercase flex justify-center'>Reject</div>
                </div>
                <div>
                    {unapprovedUsers.length > 0 
                        ? (unapprovedUsers.map((user) => (
                            <div key={user._id} className='w-full text-lg flex justify-between items-center p-2 my-1 rounded-xl'>
                                <div className='w-[15%]'>{user.firstName}</div>
                                <div className='w-[15%]'>{user.lastName}</div>
                                <div className='w-[40%]'>{user.email}</div>
                                <div className='w-[10%]'>{user.role}</div>
                                <div className='w-[10%] flex justify-center'>
                                    <button onClick={() => handleApprove(user._id)} className='text-blue-500'><FaRegCheckSquare /></button>
                                </div>
                                <div className='w-[10%] flex justify-center'>
                                    <button onClick={() => handleDelete(user._id)} className='text-pink-500'><LuBan /></button>
                                </div>
                            </div>
                        ))) 
                        : (
                            <div className='text-center text-2xl text-gray-500 font-semibold'>
                                You haven't submitted any project yet.
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

export default Request;
