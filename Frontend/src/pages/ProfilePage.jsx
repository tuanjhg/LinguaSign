import React, { useState, useEffect } from "react";
import { UserSettingsLayout } from "../components/UserSettings/UserSettingsLayout";
import { CountryCodeSelect } from "../components/UserSettings/CountryCodeSelect";
import styles from "../components/UserSettings/UserSettings.module.css";
import { useApp } from "../contexts/AppContext";

export const ProfilePage = () => {
  // Sử dụng context
  const { userData, updateUserData, t } = useApp();

  const [formData, setFormData] = useState({
    name: userData.name,
    surname: userData.surname,
    email: userData.email,
    countryCode: userData.countryCode,
    phone: userData.phone
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Cập nhật formData khi userData thay đổi
  useEffect(() => {
    setFormData({
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      countryCode: userData.countryCode,
      phone: userData.phone
    });
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryCodeChange = (code) => {
    setFormData(prev => ({
      ...prev,
      countryCode: code
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    console.log("Form submitted:", formData);

    // Giả lập thời gian xử lý
    setTimeout(() => {
      // Cập nhật thông tin người dùng vào context
      updateUserData(formData);
      setIsProcessing(false);
      alert(t.infoUpdated);
    }, 1500);
  };

  return (
    <UserSettingsLayout>
      <h2>{t.personalInfo}</h2>
      <p>{t.updatePersonalInfo}</p>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{t.firstName}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="Nhập tên của bạn"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{t.lastName}</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="Nhập họ của bạn"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{t.email}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="you@example.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>{t.phoneNumber}</label>
          <div className={styles.phoneGroup}>
            <CountryCodeSelect
              value={formData.countryCode}
              onChange={handleCountryCodeChange}
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`${styles.formInput} ${styles.phoneInput}`}
              placeholder="912345678"
            />
          </div>
        </div>

        <button
          type="submit"
          className={`${styles.saveButton} ${isProcessing ? styles.processing : ''}`}
          disabled={isProcessing}
        >
          {isProcessing ? t.saving : t.saveChanges}
        </button>
      </form>
    </UserSettingsLayout>
  );
};
