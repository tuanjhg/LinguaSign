import React from "react";
import styles from "./Modal.module.css";

export const LogoutConfirmModal = ({ onClose, onConfirm }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Xác nhận đăng xuất</h3>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?</p>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Hủy
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};
