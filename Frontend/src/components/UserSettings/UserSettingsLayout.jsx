import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./UserSettings.module.css";
import { FaUserEdit } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { LogoutConfirmModal } from "../Modal/LogoutConfirmModal";

export const UserSettingsLayout = ({ children }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };
  
  const confirmLogout = () => {
    console.log("Đăng xuất thành công");
    // Thực hiện đăng xuất ở đây (xóa token, reset state, etc.)
    setShowLogoutModal(false);
    // Chuyển hướng về trang đăng nhập hoặc trang chủ
    navigate('/');
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.userAvatar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="36px"
              height="36px"
            >
              <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
            </svg>
          </div>
          <div className={styles.editIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="16px"
              height="16px"
            >
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </div>
        </div>
        <div className={styles.sidebarMenu}>
          <button 
            className={`${styles.sidebarItem} ${isActive('/profile') ? styles.active : ''}`}
            onClick={() => navigate('/profile')}
          >
            <FaUserEdit className={styles.sidebarIcon} />
            <span>Profile</span>
          </button>
          <button 
            className={`${styles.sidebarItem} ${isActive('/settings') ? styles.active : ''}`}
            onClick={() => navigate('/settings')}
          >
            <FiSettings className={styles.sidebarIcon} />
            <span>Setting</span>
          </button>
        </div>
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <FiLogOut className={styles.sidebarIcon} />
            <span>Log out</span>
          </button>
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
      
      {showLogoutModal && (
        <LogoutConfirmModal 
          onClose={() => setShowLogoutModal(false)} 
          onConfirm={confirmLogout} 
        />
      )}
    </div>
  );
};
