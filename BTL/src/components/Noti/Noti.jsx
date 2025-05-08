import React, { useState } from "react";
import styles from "./Noti.module.css";

export const Noti = ({ notifications: initialNotifications, onClose }) => {
  const [selectedNoti, setSelectedNoti] = useState(null);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Khi xem chi tiết, đánh dấu là đã đọc
  const handleSelectNoti = (noti) => {
    setSelectedNoti(noti);
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === noti.id ? { ...n, isRead: true } : n
      )
    );
  };

  // Xóa noti khi bấm X ở ngoài danh sách
  const handleDeleteNoti = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (selectedNoti && selectedNoti.id === id) setSelectedNoti(null);
  };

  return (
    <div className={styles.notiContainer}>
      {selectedNoti ? (
        <div className={styles.notiDetailCard}>
          <div className={styles.notiDetailHeader}>
            <button className={styles.notiBackBtn} onClick={() => setSelectedNoti(null)}>&lt;</button>
            <button className={styles.notiCloseBtn} onClick={onClose}>&times;</button>
          </div>
          <div className={styles.notiDetailContent}>
            <div className={styles.notiDetailTitle}>{selectedNoti.title}</div>
            <div className={styles.notiDetailBody}>{selectedNoti.body || 'Body text'}</div>
          </div>
        </div>
      ) : (
        <>
      <div className={styles.header}>
        <span>Notifications</span>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      </div>
      <div className={styles.body}>
        {notifications.map((noti) => (
              <div key={noti.id} className={styles.notiCard} style={{ cursor: 'pointer' }}>
                <div className={styles.notiCardHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => handleSelectNoti(noti)}>
                    {!noti.isRead && <span className={styles.unreadDot} />}
                    <span className={styles.icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20px"
                height="20px"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v4z" />
              </svg>
                    </span>
                    <span className={styles.notiTitle}>{noti.title}</span>
            </div>
                  <button className={styles.notiCloseBtn} onClick={e => { e.stopPropagation(); handleDeleteNoti(noti.id); }}>&times;</button>
            </div>
                <div className={styles.notiBody} onClick={() => handleSelectNoti(noti)}>{noti.body || 'Body text.'}</div>
                <button className={styles.markAsRead} onClick={e => e.stopPropagation()}>Mark as read</button>
          </div>
        ))}
      </div>
        </>
      )}
    </div>
  );
};
