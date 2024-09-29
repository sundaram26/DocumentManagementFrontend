import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'

const AdminLayout = () => {
  return (
    <div className='w-full h-full'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default AdminLayout