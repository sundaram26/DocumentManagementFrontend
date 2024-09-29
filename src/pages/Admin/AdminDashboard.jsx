import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className='w-full min-h-[calc(100vh-61px)] px-4 flex justify-around items-center'>
        <Link to="/admin/admin-dms" className='h-[60vh] w-[45%]'>
            <div className='h-full w-full font-semibold text-5xl bg-red-300 rounded-lg flex justify-center items-center'>
                DMS Members
            </div>
        </Link>
        <Link to="/admin/admin-rotaract" className='h-[60vh] w-[45%]'>
            <div className='h-full w-full font-semibold text-5xl bg-green-300 rounded-lg flex justify-center items-center'>
                Rotaract Members
            </div>
        </Link>
    </div>
  )
}

export default AdminDashboard