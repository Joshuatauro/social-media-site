import React from 'react'
import { Link } from 'react-router-dom'

import './HomeSideBar.css'

const HomeSideBar = () => {
  return (
    <aside className="home-sidebar">
      <div className="home-sidebar__header">
        <h2>Check our various platforms</h2>
      </div>
      <ul className="home-sidebar__links">
        <li className="home-sidebar__links-item">
          <Link to="/platform/all" className="home-sidebar__links-item-link">TDP/All</Link>
        </li>
        <li className="home-sidebar__links-item">
          <Link to="/platform/frontend" className="home-sidebar__links-item-link">TDP/Frontend</Link>
        </li>
        <li className="home-sidebar__links-item">
          <Link to="/platform/backend" className="home-sidebar__links-item-link">TDP/Backend</Link>
        </li>
        <li className="home-sidebar__links-item">
          <Link to="/platform/fullstack" className="home-sidebar__links-item-link">TDP/Fullstack</Link>
        </li>
        <li className="home-sidebar__links-item">
          <Link to="/platform/design" className="home-sidebar__links-item-link">TDP/Design</Link>
        </li>
        <li className="home-sidebar__links-item">
          <Link to="/platform/devops" className="home-sidebar__links-item-link">TDP/Devops</Link>
        </li>
      </ul>
    </aside>
  )
}
export default HomeSideBar
