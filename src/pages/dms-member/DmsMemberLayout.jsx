import React from 'react'
import Navbar from '../../components/common/Navbar'
import { Outlet } from 'react-router-dom'

const DmsMemberLayout = () => {
  return (
    <div className='h-full w-full'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default DmsMemberLayout