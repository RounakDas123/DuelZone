import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { FaBars, FaUser, FaTrophy, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowMenu(false);
    logout();
    toast.success("Logout successful");
    navigate('/');
  };

  const handleViewProfile = () => {
    setShowMenu(false);
    navigate('/profile');
  };

  const handleLeaderboards = () => {
    setShowMenu(false);
    navigate('/leaderboards');
  };

  const handleLogoClick = () => {
    setShowMenu(false);
    navigate('/lobby');
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <FaBars onClick={() => setShowMenu(!showMenu)} className={styles.icon} />
        {showMenu && (
          <div className={styles.menu}>
            <div onClick={handleViewProfile}>
              <FaUser /> View Profile
            </div>
            <div onClick={handleLeaderboards}>
              <FaTrophy /> Leaderboards
            </div>
            <div onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </div>
          </div>
        )}
      </div>
      <div className={styles.center}>
        <img src="/logo.jpg" alt="DuelZone" className={styles.logo} onClick={handleLogoClick} />
      </div>
    </div>
  );
};

export default NavBar;
