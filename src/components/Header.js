import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header id="header" className="header sticky-top">
      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center me-auto">
            <img   src={`${process.env.PUBLIC_URL}/assets/img/logo.png`}
               style={{ maxHeight: 60, marginRight: 8 }} />
            <h1 className="sitename">PreviCare</h1>
          </Link>
          <nav id="navmenu" className="navmenu">
            <ul>
              <li><NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/services">Services</NavLink></li>
              <li><NavLink to="/volunteer">Volunteer</NavLink></li>
              <li><NavLink to="/healthtrack">HealthTrack</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
          {/* FIX: Link to /login, not /loginregister */}
          <Link to="/login" className="cta-btn d-none d-sm-block"> Login / Register </Link>
        </div>
      </div>
    </header>
  );
}
