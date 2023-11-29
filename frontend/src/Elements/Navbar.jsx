import React from 'react'
import '../css/navbar.css'
import { Link } from 'react-router-dom'

// Setting the initial login status to 'False' when the Navbar component is loaded
localStorage.setItem("isLoggedIn", "False");

function Navbar() {
  return (
    <div className='navbar'>
      {/* Navigation bar */}
      <nav>
        {/* Links for different pages */}
        <Link to="home" className='links'>Home</Link>
        <Link to="personalblog" className='links'>My-Blogs</Link>
        {/* Link for settings page */}
        <Link to="settings" className='links details'>Settings</Link>
      </nav>
    </div>
  )
}

export default Navbar
