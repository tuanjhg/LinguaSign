import React from 'react';
import './TranslateResultBox.css';
import { FiVolume2 } from 'react-icons/fi';

const LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'en', label: 'English' },
  // Thêm ngôn ngữ nếu cần
];

const TranslateResultBox = ({ text = 'Text', language = 'vi', onLanguageChange }) => {
  return (
    <div className="translate-result-box">
      <div className="translate-result-header">
        <button className="audio-btn" aria-label="Phát âm">
          <FiVolume2 size={22} />
        </button>
        <select
          className="language-select"
          value={language}
          onChange={e => onLanguageChange && onLanguageChange(e.target.value)}
        >
          {LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.label}</option>
          ))}
        </select>
      </div>
      <div className="translate-result-text">
        <b>{text}</b>
      </div>
    </div>
  );
};

export default TranslateResultBox; 