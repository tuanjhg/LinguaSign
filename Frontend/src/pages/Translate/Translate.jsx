import React, { useState, useRef, useEffect } from 'react';
import TranslateResultBox from './TranslateResultBox/TranslateResultBox';
import './Translate.css';
import { Header } from '../../components/Header/Header';

const Translate = () => {
  const [language, setLanguage] = useState('vi');
  const [text, setText] = useState('');
  const [recognizedSign, setRecognizedSign] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureMessage, setCaptureMessage] = useState('');
  const [captureStatus, setCaptureStatus] = useState('idle'); // 'idle', 'success', 'error'
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const streamRef = useRef(null);

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
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          streamRef.current = mediaStream;
        }
      } catch (err) {
        console.error('Không thể truy cập camera:', err);
        setCaptureMessage('Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập camera của bạn.');
        setCaptureStatus('error');
      }
    }
    
    initCamera();
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);


  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return null;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
 
    return canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
  };

  const sendImageToAPI = async (imageBase64) => {
    try {
      setCaptureStatus('processing');
      
      const response = await fetch('http://localhost:5926/predict-img', {
        method: 'POST',
        body: imageBase64,
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Lỗi API: ${response.status}`);
      }
      
      const result = await response.text();
      const recognizedLetter = result.split(':')[1]?.trim();
      
      setCaptureStatus(recognizedLetter && recognizedLetter !== ' ' ? 'success' : 'idle');
      return recognizedLetter;
    } catch (error) {
      console.error('Lỗi khi gửi ảnh đến API:', error);
      setCaptureStatus('error');
      setCaptureMessage(`Lỗi kết nối: ${error.message}`);
      return null;
    }
  };


  const startSignRecognition = () => {
    setIsCapturing(true);
    setCaptureMessage('Đang nhận dạng ngôn ngữ ký hiệu...');
    setCaptureStatus('processing');
    

    intervalRef.current = setInterval(async () => {
      const imageBase64 = captureImage();
      if (imageBase64) {
        const recognizedLetter = await sendImageToAPI(imageBase64);
        if (recognizedLetter && recognizedLetter !== ' ') {
          setRecognizedSign(prev => prev + recognizedLetter);
          setText(prev => prev + recognizedLetter);
          setTimeout(() => {
            if (isCapturing) {
              setCaptureMessage('Đang nhận dạng ngôn ngữ ký hiệu...');
            }
          },1500);
        }
      }
    }, 3000);
  };

  const stopSignRecognition = () => {
    setIsCapturing(false);
    setCaptureMessage('Đã dừng nhận dạng');
    setCaptureStatus('idle');
    setTimeout(() => setCaptureMessage(''), 2000);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const clearResults = () => {
    setRecognizedSign('');
    setText('');
    setCaptureMessage('Đã xóa kết quả');
    setTimeout(() => {
      if (!isCapturing) {
        setCaptureMessage('');
      }
    }, 1500);
  };


  const getCaptureStatusClass = () => {
    switch (captureStatus) {
      case 'success': return 'status-success';
      case 'error': return 'status-error';
      case 'processing': return 'status-processing';
      default: return '';
    }
  };

  return (
    <div className="translate-page">
      <Header UserName="Nguyen Anh Dung" />
      <main className="translate-main">
        <div className="translate-content">
          <div className="video-capture-container">
            <h2>Camera Nhận Dạng Ngôn Ngữ Ký Hiệu</h2>
            
            <div className="video-wrapper">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="video-stream"
                width="640"
                height="480"
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              
              {captureMessage && (
                <div className={`capture-message ${getCaptureStatusClass()}`}>
                  {captureMessage}
                </div>
              )}
              
              {isCapturing && (
                <div className="recording-indicator">●</div>
              )}
            </div>
            
            <div className="controls-container">
              <button 
                className={`control-button ${isCapturing ? 'stop' : 'start'}`}
                onClick={isCapturing ? stopSignRecognition : startSignRecognition}
              >
                {isCapturing ? 'Dừng nhận dạng' : 'Bắt đầu nhận dạng'}
              </button>
              <button 
                className="control-button clear"
                onClick={clearResults}
              >
                Xóa kết quả
              </button>
            </div>
            
            <div className="instructions">
              <h4>Hướng dẫn sử dụng:</h4>
              <ol>
                <li>Đưa tay vào khung hình camera</li>
                <li>Nhấn "Bắt đầu nhận dạng" để bắt đầu quá trình</li>
                <li>Thực hiện các ký hiệu ngôn ngữ để hệ thống nhận dạng</li>
                <li>Kết quả sẽ hiển thị ở phần "Ký hiệu đã nhận dạng"</li>
              </ol>
            </div>
          </div>
          
          <TranslateResultBox
            text={text}
            language={language}
            recognizedSign={recognizedSign}
            onLanguageChange={setLanguage}
          />
        </div>
      </main>
    </div>
  );
};

export default Translate;