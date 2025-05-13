import React, { useState, useEffect } from "react";
import { UserSettingsLayout } from "../components/UserSettings/UserSettingsLayout";
import styles from "../components/UserSettings/UserSettings.module.css";
import { useApp } from "../contexts/AppContext";

export const SettingsPage = () => {
  // Sử dụng context
  const { settings: appSettings, updateSettings, language, changeLanguage, t } = useApp();

  const [settings, setSettings] = useState({
    notifications: appSettings.notifications,
    emailUpdates: appSettings.emailUpdates,
    darkMode: appSettings.darkMode,
    language: language
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Cập nhật settings khi appSettings thay đổi
  useEffect(() => {
    setSettings({
      notifications: appSettings.notifications,
      emailUpdates: appSettings.emailUpdates,
      darkMode: appSettings.darkMode,
      language: language
    });
  }, [appSettings, language]);

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
    setIsProcessing(true);
    console.log("Settings saved:", settings);

    // Giả lập thời gian xử lý
    setTimeout(() => {
      // Cập nhật cài đặt vào context
      updateSettings({
        notifications: settings.notifications,
        emailUpdates: settings.emailUpdates,
        darkMode: settings.darkMode
      });

      // Cập nhật ngôn ngữ
      if (settings.language !== language) {
        changeLanguage(settings.language);
      }

      setIsProcessing(false);
      alert(t.settingsSaved);
    }, 1500);
  };

  return (
    <UserSettingsLayout>
      <h2>{t.settings}</h2>
      <p>{t.manageSettings}</p>

      <div className={styles.settingsSection}>
        <h3>{t.notifications}</h3>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h4>{t.appNotifications}</h4>
            <p>{t.receiveNotifications}</p>
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
            <h4>{t.emailUpdates}</h4>
            <p>{t.receiveEmails}</p>
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
        <h3>{t.interface}</h3>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h4>{t.darkMode}</h4>
            <p>{t.enableDarkMode}</p>
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
        <h3>{t.language}</h3>

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

      <button
        onClick={handleSave}
        className={`${styles.saveButton} ${isProcessing ? styles.processing : ''}`}
        disabled={isProcessing}
      >
        {isProcessing ? t.saving : t.saveSettings}
      </button>
    </UserSettingsLayout>
  );
};
