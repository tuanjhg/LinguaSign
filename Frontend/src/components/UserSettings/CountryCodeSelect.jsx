import React, { useState, useRef, useEffect } from "react";
import styles from "./UserSettings.module.css";

// Danh sách mã quốc gia phổ biến
const countryCodes = [
  { code: "+84", country: "Vietnam" },
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+81", country: "Japan" },
  { code: "+82", country: "South Korea" },
  { code: "+86", country: "China" },
  { code: "+33", country: "France" },
  { code: "+49", country: "Germany" },
  { code: "+61", country: "Australia" },
  { code: "+65", country: "Singapore" },
  { code: "+66", country: "Thailand" },
  { code: "+60", country: "Malaysia" },
  { code: "+62", country: "Indonesia" },
  { code: "+63", country: "Philippines" },
  { code: "+91", country: "India" },
];

export const CountryCodeSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(value || "+84");
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Đóng dropdown khi click ra ngoài
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (code) => {
    setSelectedCode(code);
    onChange(code);
    setIsOpen(false);
  };

  return (
    <div className={styles.countryCodeSelect} ref={dropdownRef}>
      <div 
        className={styles.countryCodeButton} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedCode}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      
      {isOpen && (
        <div className={styles.countryCodeDropdown}>
          {countryCodes.map((item) => (
            <div
              key={item.code}
              className={`${styles.countryCodeItem} ${
                selectedCode === item.code ? styles.selected : ""
              }`}
              onClick={() => handleSelect(item.code)}
            >
              <span className={styles.countryCode}>{item.code}</span>
              <span className={styles.countryName}>{item.country}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
