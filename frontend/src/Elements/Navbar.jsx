import React from 'react'
import '../css/navbar.css'
import { Link } from 'react-router-dom'
localStorage.setItem("isloggedIn","False");
function Navbar() {
  return (
    <div className='navbar'>
        <nav>
        <Link  to="home" className='links'>Home</Link>
        <Link to="personalblog" className='links'>My-Blogs</Link>
        <Link to="settings" className='links details'>Settings</Link>
        </nav>
    </div>
  )
}

export default Navbar