import React, { useState, useEffect } from 'react';
import './VideoBox.css';

const VideoBox = ({ setText }) => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');
  
  useEffect(() => {
    async function initCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          } 
        });
        setStream(mediaStream);
        setError('');
      } catch (err) {
        console.error('Không thể truy cập camera:', err);
        setError('Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập camera của bạn.');
      }
    }
    
    initCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  useEffect(() => {
    if (stream) {
      // Có thể thêm xử lý khác nếu cần
    }
  }, [stream, setText]);
  
  return (
    <div className="video-box">
      <h2>Camera Nhận Dạng Ngôn Ngữ Ký Hiệu</h2>
      <div className="video-container">
        {error ? (
          <div className="video-error">{error}</div>
        ) : (
          <video
            className="video-element"
            autoPlay
            playsInline
            muted
            ref={(videoElement) => {
              if (videoElement && stream) {
                videoElement.srcObject = stream;
              }
            }}
          />
        )}
      </div>
      <div className="video-instructions">
        <p>Đưa tay của bạn vào khung hình để bắt đầu nhận dạng ngôn ngữ ký hiệu.</p>
      </div>
    </div>
  );
};

export default VideoBox;