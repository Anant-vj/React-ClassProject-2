import { NavLink } from 'react-router-dom';
import { FiHome, FiBriefcase, FiBarChart2, FiPlusSquare, FiBookmark } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-icon">SJ</div>
        <h2>SmartJob</h2>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiHome className="nav-icon" /> Dashboard
        </NavLink>
        <NavLink to="/applications" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiBriefcase className="nav-icon" /> Applications
        </NavLink>
        <NavLink to="/applications/new" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiPlusSquare className="nav-icon" /> Add New
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiBarChart2 className="nav-icon" /> Analytics
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">A</div>
          <div className="user-info">
            <span className="user-name">User</span>
            <span className="user-role">Job Seeker</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
