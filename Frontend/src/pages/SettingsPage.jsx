import React, { useState } from "react";
import { UserSettingsLayout } from "../components/UserSettings/UserSettingsLayout";
import styles from "../components/UserSettings/UserSettings.module.css";

export const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    language: "vi"
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleLanguageChange = (e) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value
    }));
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
    // Xử lý lưu cài đặt
    alert("Cài đặt đã được lưu!");
  };

  return (
    <UserSettingsLayout>
      <h2>Cài đặt</h2>
      <p>Quản lý cài đặt tài khoản của bạn</p>
      
      <div className={styles.settingsSection}>
        <h3>Thông báo</h3>
        
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h4>Thông báo ứng dụng</h4>
            <p>Nhận thông báo về các hoạt động trong ứng dụng</p>
          </div>
          <label className={styles.switch}>
            <input 
              type="checkbox" 
              checked={settings.notifications}
              onChange={() => handleToggle('notifications')}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h4>Cập nhật qua email</h4>
            <p>Nhận email về các cập nhật và tính năng mới</p>
          </div>
          <label className={styles.switch}>
            <input 
              type="checkbox" 
              checked={settings.emailUpdates}
              onChange={() => handleToggle('emailUpdates')}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
      
      <div className={styles.settingsSection}>
        <h3>Giao diện</h3>
        
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h4>Chế độ tối</h4>
            <p>Bật chế độ tối cho ứng dụng</p>
          </div>
          <label className={styles.switch}>
            <input 
              type="checkbox" 
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
      
      <div className={styles.settingsSection}>
        <h3>Ngôn ngữ</h3>
        
        <div className={styles.formGroup}>
          <select 
            className={styles.formInput}
            value={settings.language}
            onChange={handleLanguageChange}
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
      
      <button onClick={handleSave} className={styles.saveButton}>
        Lưu cài đặt
      </button>
    </UserSettingsLayout>
  );
};
