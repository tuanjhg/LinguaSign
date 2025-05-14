import React, { useState, useEffect } from 'react';
import Speech from 'speak-tts';
import { FiVolume2 } from 'react-icons/fi';
import SettingModal from '../SettingModal/SettingModal';
import './TranslateResultBox.css';

const LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'en', label: 'English' },
];

const TranslateResultBox = ({ text = 'Text', language = 'vi', onLanguageChange }) => {
  const [translatedText, setTranslatedText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const speech = new Speech();

  // Initialize speech settings
  useEffect(() => {
    speech.init({
      volume: 0.5,
      lang: language === 'vi' ? 'vi-VN' : 'en-US',
      rate: 1,
      pitch: 1,
    });
  }, [language]);

  // Translate text when text or language changes
  useEffect(() => {
    if (text && text !== 'Text') {
      translateText();
    } else {
      setTranslatedText('');
    }
  }, [text, language]);

  // Sanitize text to extract only the letter
  const sanitizeText = (input) => {
    // Remove quotes, commas, and unexpected terms like "result"
    return input.replace(/['",]/g, '').replace(/\s*result\s*/gi, '').trim();
  };

  // Translation logic
  const translateText = async () => {
    const cleanText = sanitizeText(text);
    try {
      let result = '';
      if (language === 'vi') {
        const signToVietnamese = {
        'A': 'Xin chào', 'B': 'Tạm biệt', 'C': 'Cảm ơn', 'D': 'Làm ơn', 'E': 'Xin lỗi',
    'F': 'Tôi', 'G': 'Xin chào', 'H': 'Chúng tôi', 'I': 'Có', 'J': 'Không',
    'K': 'Cần giúp đỡ', 'L': 'Tốt', 'M': 'Xấu', 'N': 'OK', 'O': 'Nước',
    'P': 'Thức ăn', 'Q': 'Gia đình', 'R': 'Bạn bè', 'S': 'Trường học', 'T': 'Công việc',
    'U': 'Nhà', 'V': 'Thời gian', 'W': 'Ngày', 'X': 'Đêm', 'Y': 'Tình yêu',
    'Z': 'Cuộc sống', ' ': ' '
        };

        for (let i = 0; i < cleanText.length; i++) {
          const char = cleanText[i].toUpperCase();
          if (signToVietnamese[char]) {
            result += signToVietnamese[char] + ' ';
          } else {
            result += char + ' ';
          }
        }
      } else if (language === 'en') {
        const signToEnglish = {
          'A': 'Hello', 'B': 'Goodbye', 'C': 'Thank you', 'D': 'Please', 'E': 'Sorry',
          'F': 'I', 'G': 'You', 'H': 'We', 'I': 'Yes', 'J': 'No',
          'K': 'Need help', 'L': 'Good', 'M': 'Bad', 'N': 'OK', 'O': 'Water',
          'P': 'Food', 'Q': 'Family', 'R': 'Friends', 'S': 'School', 'T': 'Work',
          'U': 'Home', 'V': 'Time', 'W': 'Day', 'X': 'Night', 'Y': 'Love',
          'Z': 'Life', ' ': ' '
        };

        for (let i = 0; i < cleanText.length; i++) {
          const char = cleanText[i].toUpperCase();
          if (signToEnglish[char]) {
            result += signToEnglish[char] + ' ';
          } else {
            result += char + ' ';
          }
        }
      }

      setTranslatedText(result.trim());
    } catch (err) {
      console.error('Lỗi dịch:', err);
      setTranslatedText('');
    }
  };

  // Handle text-to-speech
  const handleSpeak = () => {
    if (translatedText.trim()) {
      speech.speak({ text: translatedText, queue: false });
    }
  };

  // Toggle settings modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
        <button
          onClick={toggleModal}
          className="settings-button"
          aria-label="Cài đặt"
        >
          ⚙️
        </button>
      </div>
      <div className="translate-result-text">
        <b>{sanitizeText(text)}</b>
      </div>
      {/* <div className="translated-text">
        <b>Translated: {translatedText || 'Kết quả dịch sẽ hiển thị ở đây'}</b>
      </div> */}
      <SettingModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default TranslateResultBox;