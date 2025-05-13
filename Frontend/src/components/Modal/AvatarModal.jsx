import React, { useState, useRef } from 'react';
import styles from './Modal.module.css';
import { useApp } from '../../contexts/AppContext';

// Danh sách avatar mặc định
const defaultAvatars = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
  '/avatars/avatar4.png',
  '/avatars/avatar5.png',
  '/avatars/avatar6.png',
  // Thêm các avatar mặc định khác nếu cần
];

export const AvatarModal = ({ onClose, onAvatarChange }) => {
  const { t } = useApp();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [customAvatar, setCustomAvatar] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Xử lý khi chọn avatar mặc định
  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    setCustomAvatar(null);
  };

  // Xử lý khi click vào nút tải lên
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Xử lý khi chọn file từ máy tính
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomAvatar(event.target.result);
        setSelectedAvatar(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý khi lưu avatar
  const handleSave = () => {
    setIsUploading(true);
    
    // Giả lập thời gian xử lý
    setTimeout(() => {
      const avatarUrl = customAvatar || selectedAvatar;
      onAvatarChange(avatarUrl);
      setIsUploading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ width: '500px' }}>
        <div className={styles.modalHeader}>
          <h2>{t.changeAvatar}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.avatarSection}>
            <h3>{t.selectAvatar}</h3>
            <div className={styles.avatarGrid}>
              {defaultAvatars.map((avatar, index) => (
                <div 
                  key={index}
                  className={`${styles.avatarItem} ${selectedAvatar === avatar ? styles.selected : ''}`}
                  onClick={() => handleSelectAvatar(avatar)}
                >
                  <img 
                    src={avatar} 
                    alt={`Avatar ${index + 1}`} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/80?text=Avatar';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.uploadSection}>
            <h3>{t.uploadAvatar}</h3>
            <div className={styles.uploadArea}>
              {customAvatar ? (
                <div className={styles.previewAvatar}>
                  <img src={customAvatar} alt="Custom Avatar" />
                </div>
              ) : (
                <button 
                  className={styles.uploadButton} 
                  onClick={handleUploadClick}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                  </svg>
                  <span>Chọn file</span>
                </button>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button 
            className={styles.cancelButton} 
            onClick={onClose}
          >
            Hủy
          </button>
          <button 
            className={`${styles.saveButton} ${isUploading ? styles.processing : ''}`}
            onClick={handleSave}
            disabled={!selectedAvatar && !customAvatar || isUploading}
          >
            {isUploading ? t.saving : t.saveChanges}
          </button>
        </div>
      </div>
    </div>
  );
};
