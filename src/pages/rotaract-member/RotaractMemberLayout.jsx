import React from 'react'
import Navbar from '../../components/common/Navbar'
import { Outlet } from 'react-router-dom'

const RotaractMemberLayout = () => {
  return (
    <div className='w-full h-full'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default RotaractMemberLayout