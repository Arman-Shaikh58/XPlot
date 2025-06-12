import React from 'react'
import {Link} from "react-router-dom"
export default function Navbar() {
  return (
    <div className="h-16 w-screen bg-light flex justify-between px-4 items-center border-b-1 shadow-xl">
        <h1 className='text-3xl font-bold text-dark text-shadow-sm'>XPlot</h1>
        <ul className='flex gap-4 '>
            <li className="text-xl font-bold transition-transform duration-200 hover:-translate-y-1 ease-in-out"><Link to="/about"  >About</Link></li>
            <li className="text-xl font-bold transition-transform duration-200 hover:-translate-y-1 ease-in-out"><Link to="/arman-58">Arman-58</Link></li>
        </ul>
    </div>
  );
}
