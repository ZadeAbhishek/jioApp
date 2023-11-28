import React from 'react'
import '../css/navbar.css'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className='navbar'>
        <nav>
        <Link  to="home" className='links'>Home</Link>
        <Link to="personalblog" className='links'>My-Blogs</Link>
        <Link to="publish" className='links details'>Settings</Link>
        </nav>
    </div>
  )
}

export default Navbar