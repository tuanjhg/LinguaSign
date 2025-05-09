import React, { useState, useRef, useEffect } from "react";
import styles from "./VideoPlayer.module.css";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaCog,
  FaForward,
  FaBackward
} from "react-icons/fa";

// Kích thước icon
const ICON_SIZE = 22;

export const VideoPlayer = ({ videoSrc, title, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Xử lý autoplay
  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Autoplay failed:", error);
        setIsPlaying(false);
      });
    }
  }, [autoPlay]);

  // Cập nhật thời gian hiện tại và thanh tiến trình
  useEffect(() => {
    const updateTime = () => {
      if (videoRef.current) {
        const currentVideoTime = videoRef.current.currentTime;
        const videoDuration = videoRef.current.duration;

        setCurrentTime(currentVideoTime);
        setDuration(videoDuration);

        // Cập nhật thanh tiến trình
        updateProgressBar(currentVideoTime);
      }
    };

    // Cập nhật biến CSS cho thanh volume khi component mount
    const volumeSlider = document.querySelector(`.${styles.volumeSlider}`);
    if (volumeSlider) {
      volumeSlider.style.setProperty('--volume-percent', `${volume * 100}%`);
    }

    const video = videoRef.current;
    video?.addEventListener('timeupdate', updateTime);
    video?.addEventListener('loadedmetadata', updateTime);

    return () => {
      video?.removeEventListener('timeupdate', updateTime);
      video?.removeEventListener('loadedmetadata', updateTime);
    };
  }, []);

  // Xử lý hiển thị/ẩn controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);

      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const playerElement = playerRef.current;
    playerElement?.addEventListener('mousemove', handleMouseMove);

    return () => {
      playerElement?.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  // Xử lý play/pause
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Xử lý volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;

    // Cập nhật biến CSS cho thanh volume
    if (e.target) {
      e.target.style.setProperty('--volume-percent', `${newVolume * 100}%`);
    }

    if (newVolume === 0) {
      setIsMuted(true);
      videoRef.current.muted = true;
    } else {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };

  // Xử lý mute
  const toggleMute = () => {
    const newMutedState = !isMuted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);

    // Cập nhật biến CSS cho thanh volume khi mute/unmute
    const volumeSlider = document.querySelector(`.${styles.volumeSlider}`);
    if (volumeSlider) {
      if (newMutedState) {
        volumeSlider.style.setProperty('--volume-percent', '0%');
      } else {
        volumeSlider.style.setProperty('--volume-percent', `${volume * 100}%`);
      }
    }
  };

  // Xử lý seek
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);

    // Cập nhật hiển thị tiến trình
    updateProgressBar(seekTime);
  };

  // Cập nhật hiển thị thanh tiến trình
  const updateProgressBar = (currentTime) => {
    const progressPercent = (currentTime / duration) * 100;
    const progressBar = document.querySelector(`.${styles.progressBar}`);

    if (progressBar) {
      progressBar.style.background = `linear-gradient(to right, #FFFFFF ${progressPercent}%, rgba(255, 255, 255, 0.3) ${progressPercent}%)`;
    }
  };

  // Xử lý fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Theo dõi trạng thái fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Xử lý tốc độ phát
  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    videoRef.current.playbackRate = rate;
    setIsSettingsOpen(false);
  };

  // Xử lý tua nhanh/lùi
  const handleSkip = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  // Format thời gian
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div
      className={styles.videoPlayerContainer}
      ref={playerRef}
      onDoubleClick={toggleFullscreen}
    >
      <video
        ref={videoRef}
        className={styles.videoElement}
        src={videoSrc}
        onClick={togglePlay}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Overlay khi tạm dừng */}
      {!isPlaying && (
        <div className={styles.pauseOverlay}>
          <button className={styles.playButton} onClick={togglePlay} aria-label="Phát">
            <FaPlay size={40} />
          </button>
        </div>
      )}

      {/* Controls */}
      <div className={`${styles.controls} ${showControls ? styles.visible : ''}`}>
        <div className={styles.progressContainer}>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className={styles.progressBar}
            aria-label="Tiến trình video"
          />
        </div>

        <div className={styles.controlsBottom}>
          <div className={styles.leftControls}>
            <button
              className={styles.controlButton}
              onClick={togglePlay}
              aria-label={isPlaying ? "Tạm dừng" : "Phát"}
            >
              {isPlaying ? <FaPause size={ICON_SIZE} /> : <FaPlay size={ICON_SIZE} />}
            </button>

            <button
              className={styles.controlButton}
              onClick={() => handleSkip(-10)}
              aria-label="Lùi 10 giây"
            >
              <FaBackward size={ICON_SIZE} />
            </button>

            <button
              className={styles.controlButton}
              onClick={() => handleSkip(10)}
              aria-label="Tiến 10 giây"
            >
              <FaForward size={ICON_SIZE} />
            </button>

            <div className={styles.volumeControl}>
              <button
                className={styles.controlButton}
                onClick={toggleMute}
                aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
              >
                {isMuted ? <FaVolumeMute size={ICON_SIZE} /> : <FaVolumeUp size={ICON_SIZE} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
                aria-label="Âm lượng"
              />
            </div>

            <div className={styles.timeDisplay}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className={styles.rightControls}>
            <div className={styles.settingsContainer}>
              <button
                className={styles.controlButton}
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                aria-label="Cài đặt"
                aria-expanded={isSettingsOpen}
              >
                <FaCog size={ICON_SIZE} />
              </button>

              {isSettingsOpen && (
                <div className={styles.settingsMenu} role="menu">
                  <div className={styles.settingsTitle}>Tốc độ phát</div>
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                    <button
                      key={rate}
                      className={`${styles.settingsItem} ${playbackRate === rate ? styles.active : ''}`}
                      onClick={() => handlePlaybackRateChange(rate)}
                      aria-label={`Tốc độ phát ${rate === 1 ? 'bình thường' : rate + 'x'}`}
                      role="menuitem"
                      aria-current={playbackRate === rate}
                    >
                      {rate === 1 ? 'Bình thường' : `${rate}x`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className={styles.controlButton}
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
            >
              {isFullscreen ? <FaCompress size={ICON_SIZE} /> : <FaExpand size={ICON_SIZE} />}
            </button>
          </div>
        </div>
      </div>

      {/* Tiêu đề video */}
      {title && (
        <div className={`${styles.videoTitle} ${showControls ? styles.visible : ''}`}>
          {title}
        </div>
      )}
    </div>
  );
};
