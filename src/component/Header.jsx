import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { TbBellRingingFilled } from "react-icons/tb";

const Header = () => {
  return (
    <nav className='h-20 bg-white shadow-lg flex items-center p-10 justify-between z-10'>
        <h1 className='text-2xl font-medium'>Task Manager</h1>
        {/* <ul className='flex gap-10 text-xm font-medium'>
            <li>
                <a className='cursor-pointer hover:text-blue-500 '>Home</a>
            </li>
            <li>
                <a className='cursor-pointer hover:text-red-500'>Near Death</a>
            </li>
            <li>
                <a className='cursor-pointer hover:text-green-500'>Done</a>
            </li>
        </ul> */}
        <div className='flex items-center gap-10 text-3xl'>
            <TbBellRingingFilled className='cursor-pointer hover:scale-105' />
            <FaCircleUser className='cursor-pointer hover:scale-105' />
        </div>

    </nav>
  )
}

export default Header