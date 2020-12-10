import React, { useState, useEffect, useContext } from 'react'

import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { ThemeContext } from '../Context/GeneralContext'

import './Navbar.css'

const Navbar = () => {

  const {switchTheme, darkTheme} = useContext(ThemeContext)
  const { currentUser } = useContext(AuthContext)

  const [logo, setLogo] = useState(true)

  const switcher = () => {
    switchTheme()
  }

  const checker = () => {
    const windowSize = window.innerWidth

    if(windowSize < 700){
      setLogo(false)
    } else {
      setLogo(true)
    }
  }

  useEffect(() => {
    checker()
  } , [])




  return (
    <nav className={`navbar ${darkTheme ? "" : "light" }`} onResize={checker}>
      <div className="navbar__container">
          <Link className="navbar__container__header" to="/">
            {logo ? "TheDevPlatform" : "TDP"}
          </Link>

        <ul className={`navbar__container__links`}>
          {currentUser ? (
            <>
              <li className="navbar__container__links-item">
                <Link to="/settings">
                  <i className="fas fa-user-cog"/>
                </Link>
              </li>
              <li className="navbar__container__links-item">
                <Link to="/home">
                  <i className="fas fa-home"/>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="navbar__container__links-item">
                <Link className="navbar__container__links-item__sign-up" to="/signup">
                  Sign-Up
                </Link>
                <Link className="navbar__container__links-item__log-in" to="/login">
                  Log-in
                </Link>
              </li>
            </>
          )}
          
        </ul>

        <button className="navbar__container__switcher" onClick={switcher}>
          <div className={`navbar__container__switcher__ball ${darkTheme ? "dark" : "light"}`} />
          <i className="fas fa-moon"/>
          <i className="fas fa-sun"/>
        </button>

      </div>
    </nav>
  )
}

export default Navbar
