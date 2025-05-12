import React, { useState } from "react";
import { UserSettingsLayout } from "../components/UserSettings/UserSettingsLayout";
import { CountryCodeSelect } from "../components/UserSettings/CountryCodeSelect";
import styles from "../components/UserSettings/UserSettings.module.css";

export const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "Nguyen Anh",
    surname: "Dung",
    email: "nguyenanhd@example.com",
    countryCode: "+84",
    phone: "912345678"
  });

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
    console.log("Form submitted:", formData);
    // Xử lý lưu thông tin người dùng
    alert("Thông tin đã được cập nhật!");
  };

  return (
    <UserSettingsLayout>
      <h2>Thông tin cá nhân</h2>
      <p>Cập nhật thông tin cá nhân của bạn</p>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tên</label>
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
          <label className={styles.formLabel}>Họ</label>
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
          <label className={styles.formLabel}>Email</label>
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
          <label className={styles.formLabel}>Số điện thoại</label>
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

        <button type="submit" className={styles.saveButton}>
          Lưu thay đổi
        </button>
      </form>
    </UserSettingsLayout>
  );
};
