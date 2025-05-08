import React, { useState } from "react";

export const Notifications = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Notification 1", isRead: false },
    { id: 2, text: "Notification 2", isRead: false },
    { id: 3, text: "Notification 3", isRead: false },
  ]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  return (
    <>
      <div
        className={`${className} notification-area`}
        onClick={handleOpenModal}
        role="button"
        tabIndex="0"
        style={{ cursor: "pointer" }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: notifications.some((n) => !n.isRead)
              ? "green"
              : "gray",
            borderRadius: "50%",
            display: "inline-block",
            marginRight: "8px",
          }}
        ></div>
        <span>Click here to view notifications</span>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="back-button" onClick={handleCloseModal}>
              &#8592;
            </button>
            <h2>Notifications</h2>
            {notifications.map((notification) => (
              <div className="notification-item" key={notification.id}>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: notification.isRead ? "gray" : "green",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                  }}
                ></div>
                <span>{notification.text}</span>
                {!notification.isRead && (
                  <button
                    className="mark-as-read"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))}
            <button className="close-button" onClick={handleCloseModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};
