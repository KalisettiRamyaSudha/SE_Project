import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Styles from './Navbar.module.css'

const Navbar = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    
    localStorage.removeItem("userId")
    navigate("/")
    window.location.reload()
    
  }

  return (
    <div className={Styles.navbar}>
      <NavLink to="/"  onClick={handleLogout} className={Styles.link}>Logout</NavLink>
    </div>
  )
}

export default Navbar