import React, { useState } from 'react';
import './VideoBox.css';
import { FiSettings, FiVideo } from 'react-icons/fi';
import SettingModal from '../SettingModal/SettingModal';

const VideoBox = () => {
  const [openSetting, setOpenSetting] = useState(false);
  return (
    <div className="video-box">
      <button className="video-settings-btn" aria-label="Settings" onClick={() => setOpenSetting(true)}>
        <FiSettings size={24} />
      </button>
      <div className="video-content">
        <FiVideo size={40} className="video-icon" />
      </div>
      <SettingModal open={openSetting} onClose={() => setOpenSetting(false)} />
    </div>
  );
};

export default VideoBox; 