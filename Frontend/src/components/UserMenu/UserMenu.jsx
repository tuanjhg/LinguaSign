import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import styles from './UserMenu.module.css';
import { FaUserEdit } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { LogoutConfirmModal } from '../Modal/LogoutConfirmModal';

export const UserMenu = ({ onClose, onLogout }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleEdit = () => {
    navigate('/profile');
    onClose();
  };

  const handleSetting = () => {
    navigate('/settings');
    onClose();
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    try {
      logout(); 
      setShowLogoutModal(false);
      onClose();
      navigate('/'); 
      onLogout(); 
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <div className={styles.userMenuContainer}>
        <div className={styles.userMenuHeader}>
          <div className={styles.userAvatar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24px"
              height="24px"
            >
              <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
            </svg>
          </div>
        </div>
        <div className={styles.userMenuBody}>
          <button className={styles.menuItem} onClick={handleEdit}>
            <FaUserEdit className={styles.menuIcon} />
            <span>Edit</span>
          </button>
          <button className={styles.menuItem} onClick={handleSetting}>
            <FiSettings className={styles.menuIcon} />
            <span>Setting</span>
          </button>
          <button className={styles.menuItem} onClick={handleLogout}>
            <FiLogOut className={styles.menuIcon} />
            <span>Log out</span>
          </button>
        </div>
      </div>

      {showLogoutModal && (
        <LogoutConfirmModal
          onClose={() => setShowLogoutModal(false)}
          onConfirm={confirmLogout}
        />
      )}
    </>
  );
};