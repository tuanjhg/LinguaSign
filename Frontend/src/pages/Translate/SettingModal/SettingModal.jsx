import React, { useState } from 'react';
import './SettingModal.css';

const TABS = [
  { key: 'audio', label: 'Âm thanh' },
  { key: 'video', label: 'Video' },
  { key: 'general', label: 'Cài đặt chung' },
  { key: 'subtitle', label: 'Phụ đề' },
  { key: 'reaction', label: 'Phản ứng' },
];

const SettingModal = ({ open, onClose }) => {
  const [tab, setTab] = useState('audio');
  if (!open) return null;

  return (
    <div className="setting-modal-overlay">
      <div className="setting-modal">
        <button className="setting-modal-close" onClick={onClose} aria-label="Đóng">×</button>
        <div className="setting-modal-content">
          <aside className="setting-modal-sidebar">
            {TABS.map(t => (
              <button
                key={t.key}
                className={`setting-modal-tab${tab === t.key ? ' active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </aside>
          <section className="setting-modal-main">
            {tab === 'audio' && (
              <div>
                <h3>Âm thanh</h3>
                <div className="setting-group">
                  <label>Micrô</label>
                  <select><option>Microphone Array (Intel® Smart Sound)</option></select>
                  <span className="setting-status">Micrô đang tắt</span>
                </div>
                <div className="setting-group">
                  <label>Nhấn để trò chuyện</label>
                  <div className="setting-switch-row">
                    <span>Nhấn và giữ phím cách để bật micrô của bạn</span>
                    <input type="checkbox" className="setting-switch" />
                  </div>
                </div>
                <div className="setting-group">
                  <label>Loa</label>
                  <select><option>Speakers (Realtek(R) Audio)</option></select>
                  <button className="setting-check-btn">Kiểm tra</button>
                </div>
                <a href="#" className="setting-link">Kiểm soát cuộc gọi</a>
              </div>
            )}
            {tab === 'video' && (
              <div>
                <div className="setting-info-banner">
                  Tính năng cải tiến video đã được chuyển đi
                  <button className="setting-link-btn">Nền và hiệu ứng</button>
                </div>
                <div className="setting-group">
                  <label>Máy ảnh</label>
                  <div className="setting-row">
                    <select>
                      <option>📷 Acer FHD User Facing</option>
                    </select>
                    <span className="setting-status">Máy ảnh đang tắt</span>
                  </div>
                </div>
                <div className="setting-group">
                  <label>Độ phân giải khi gửi (tối đa)</label>
                  <select>
                    <option>Tự động</option>
                    <option>360p</option>
                    <option>720p</option>
                    <option>1080p</option>
                  </select>
                </div>
                <div className="setting-group">
                  <label>Độ phân giải khi nhận (tối đa)</label>
                  <select>
                    <option>Tự động</option>
                    <option>360p</option>
                    <option>720p</option>
                    <option>1080p</option>
                  </select>
                </div>
              </div>
            )}
            {tab === 'general' && <div><h3>Cài đặt chung</h3><p>Tuỳ chọn chung ở đây...</p></div>}
            {tab === 'subtitle' && <div><h3>Phụ đề</h3><p>Tuỳ chọn phụ đề ở đây...</p></div>}
            {tab === 'reaction' && <div><h3>Phản ứng</h3><p>Tuỳ chọn phản ứng ở đây...</p></div>}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingModal; 