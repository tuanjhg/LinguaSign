import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Sign from '../../assets/Logo.png';
import { Noti } from "../Noti/Noti";
import { FaSearch } from 'react-icons/fa';

export const Header = ({ UserName }) => {
  const [showNoti, setShowNoti] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Search state
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);

  const handleSearchClick = () => {
    setSearchActive(true);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
  };

  const handleBlur = () => {
    if (!searchValue) setSearchActive(false);
  };

  const notifications = [
    { id: 1, title: "Notification 1", body: "Đây là nội dung chi tiết của Notification 1. Bạn có thể kiểm tra giao diện chi tiết ở đây." },
    { id: 2, title: "Notification 2", body: "Nội dung thông báo số 2." },
    { id: 3, title: "Notification 3", body: "Nội dung thông báo số 3." },
    { id: 4, title: "Noti test thử giao diện", body: "Đây là noti test để bạn kiểm tra popup chi tiết, cuộn nội dung, sssssssssssssssss, sssssssssssss, sssssssss, ssssssss, sssssssssssssnút back và nút đóng." }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={Sign} />
      </div>
      <div className={styles.navigation}>
        {[
          { label: "Home Page", path: "/" },
          { label: "Translate", path: "/translate" },
          { label: "Course", path: "/course" }
        ].map((item, index) => (
          <button
            key={index}
            className={`${styles.navButton} ${location.pathname === item.path ? styles.active : ""}`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.userSection}>
        <div className={styles.searchGroup + (searchActive ? ' ' + styles.active : '')}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search..."
            ref={inputRef}
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onBlur={handleBlur}
          />
          <button className={styles.searchBtn} onClick={handleSearchClick} tabIndex={-1}>
            <FaSearch />
          </button>
        </div>
        <div className={styles.notificationWrapper} style={{ position: "relative" }}>
          <button
            className={styles.notifications}
            onClick={() => setShowNoti((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24px"
              height="24px"
            >
              <path d="M12 2C10.34 2 9 3.34 9 5v1.07C6.16 6.56 4 8.92 4 12v5l-1 1v1h18v-1l-1-1v-5c0-3.08-2.16-5.44-5-5.93V5c0-1.66-1.34-3-3-3zm0 19c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />
            </svg>
          </button>
          {showNoti && (
            <Noti
              notifications={notifications}
              onClose={() => setShowNoti(false)}
            />
          )}
        </div>
        <div className={styles.user}>
          <div className={styles.avatar}>
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
          <span>{UserName}</span>
        </div>
      </div>
    </div>
  );
};
