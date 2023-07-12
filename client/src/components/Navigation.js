import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = ({ user, logout }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdminOrPrincipalOrTeacher = user && (user.role === 'admin' || user.role === 'principal' || user.role === 'teacher');
  const isAdminOrPrincipal = user && (user.role === 'admin' || user.role === 'principal');

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavLinkClick = () => {
    setIsCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">My School App</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isCollapsed ? 'collapse' : 'show'}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="fw-bold active" exact to="/dashboard" onClick={handleNavLinkClick}>
                    Dashboard
                  </NavLink>
                </li>
                {isAdminOrPrincipalOrTeacher && (
                  <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="fw-bold active" to="/scoreboard" onClick={handleNavLinkClick}>
                      Student List
                    </NavLink>
                  </li>
                )}
                {isAdminOrPrincipalOrTeacher && (
                  <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="fw-bold active" to="/students" onClick={handleNavLinkClick}>
                      Add Student
                    </NavLink>
                  </li>
                )}
                {isAdminOrPrincipal && (
                  <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="fw-bold active" to="/teachers" onClick={handleNavLinkClick}>
                      Teachers
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="fw-bold active" exact to="/" onClick={handleNavLinkClick}>
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="fw-bold active" to="/users" onClick={handleNavLinkClick}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;