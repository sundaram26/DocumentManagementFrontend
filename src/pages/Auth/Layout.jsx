import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { logo2, mainLogo } from '../../assets'

const AuthLayout = () => {
  return (
    <div className='h-full w-full'>
        <nav className="flex justify-between items-center px-12 text-black border-b-zinc-200 border-b-[1px]">
            <div>
              <Link to='/' aria-label="Home">
                <img src={mainLogo} alt="Home" className="w-48 h-auto p-0 m-0" /> 
              </Link>
            </div>
            <div className="space-x-4 flex items-center">
              <img src={logo2} alt="" className="w-28 h-auto p-1 m-0" />
            </div>
        </nav>
        <Outlet />
    </div>
  )
}

export default AuthLayout