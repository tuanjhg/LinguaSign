import React, { useEffect } from 'react';
import Speech from 'speak-tts';
import './TranslateResultBox.css';
import { FiVolume2 } from 'react-icons/fi';

const LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'en', label: 'English' },
];

const TranslateResultBox = ({ text = 'Text', language = 'vi', onLanguageChange }) => {
  const speech = new Speech();


  useEffect(() => {
    speech.init({
      volume: 0.5,
      lang: language === 'vi' ? 'vi-VN' : 'en-US',
      rate: 1,
      pitch: 1,
    });
  }, [language]);

  const handleSpeak = () => {
    if (text.trim()) {
      speech.speak({ text, queue: false });
    }
  };

  return (
    <div className="translate-result-box">
      <div className="translate-result-header">

        <button className="audio-btn" onClick={handleSpeak} aria-label="Phát âm">
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

      {/* Hiển thị văn bản nhận diện */}
      <div className="translate-result-text">
        <b>{text}</b>
      </div>
    </div>
  );
};

export default TranslateResultBox;
