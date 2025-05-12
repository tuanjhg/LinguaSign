import React, { useState, useRef, useEffect } from "react";
import styles from "./VideoPreview.module.css";
import { FaPlay } from "react-icons/fa";

export const VideoPreview = ({ videoSrc, thumbnailSrc, title, duration }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPreviewReady, setIsPreviewReady] = useState(false);
  const videoRef = useRef(null);
  const previewTimeoutRef = useRef(null);
  
  // Xử lý hover
  const handleMouseEnter = () => {
    setIsHovering(true);
    
    // Đặt timeout để bắt đầu preview sau 500ms
    previewTimeoutRef.current = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().then(() => {
          setIsPreviewReady(true);
        }).catch(error => {
          console.error("Preview playback failed:", error);
        });
      }
    }, 500);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsPreviewReady(false);
    
    clearTimeout(previewTimeoutRef.current);
    
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  
  // Cleanup
  useEffect(() => {
    return () => {
      clearTimeout(previewTimeoutRef.current);
    };
  }, []);
  
  // Format thời lượng
  const formatDuration = (seconds) => {
    if (!seconds) return "";
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  return (
    <div 
      className={styles.previewContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.thumbnailContainer}>
        {/* Thumbnail */}
        <img 
          src={thumbnailSrc} 
          alt={title} 
          className={`${styles.thumbnail} ${isPreviewReady ? styles.hidden : ''}`}
        />
        
        {/* Video Preview */}
        <video
          ref={videoRef}
          src={videoSrc}
          className={`${styles.previewVideo} ${isPreviewReady ? styles.visible : ''}`}
          muted
          loop
        />
        
        {/* Play icon */}
        <div className={styles.playIconOverlay}>
          <div className={styles.playIcon}>
            <FaPlay />
          </div>
        </div>
        
        {/* Duration */}
        {duration && (
          <div className={styles.duration}>
            {formatDuration(duration)}
          </div>
        )}
      </div>
      
      {/* Title */}
      <div className={styles.videoInfo}>
        <h3 className={styles.videoTitle}>{title}</h3>
      </div>
    </div>
  );
};
