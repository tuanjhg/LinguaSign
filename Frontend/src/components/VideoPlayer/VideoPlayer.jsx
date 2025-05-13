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

  // Kiểm tra xem videoSrc có phải là liên kết Vimeo iframe hay không
  const isVimeoIframe = videoSrc.includes('vimeo.com');

  // Xử lý autoplay cho video MP4
  useEffect(() => {
    if (!isVimeoIframe && autoPlay && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Autoplay failed:", error);
        setIsPlaying(false);
      });
    }
    // Lưu ý: Autoplay cho Vimeo được xử lý bởi thuộc tính `autoplay` trong iframe
  }, [autoPlay, isVimeoIframe]);

  // Cập nhật thời gian hiện tại và thanh tiến trình (chỉ cho MP4)
  useEffect(() => {
    if (isVimeoIframe) return; // Không áp dụng cho Vimeo

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
  }, [isVimeoIframe, volume]);

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

  // Xử lý play/pause (chỉ cho MP4)
  const togglePlay = () => {
    if (isVimeoIframe) return; // Không điều khiển play/pause cho Vimeo
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Xử lý volume (chỉ cho MP4)
  const handleVolumeChange = (e) => {
    if (isVimeoIframe) return; // Không điều khiển volume cho Vimeo
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

  // Xử lý mute (chỉ cho MP4)
  const toggleMute = () => {
    if (isVimeoIframe) return; // Không điều khiển mute cho Vimeo
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

  // Xử lý seek (chỉ cho MP4)
  const handleSeek = (e) => {
    if (isVimeoIframe) return; // Không điều khiển seek cho Vimeo
    const seekTime = parseFloat(e.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);

    // Cập nhật hiển thị tiến trình
    updateProgressBar(seekTime);
  };

  // Cập nhật hiển thị thanh tiến trình (chỉ cho MP4)
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

  // Xử lý tốc độ phát (chỉ cho MP4)
  const handlePlaybackRateChange = (rate) => {
    if (isVimeoIframe) return; // Không điều khiển playback rate cho Vimeo
    setPlaybackRate(rate);
    videoRef.current.playbackRate = rate;
    setIsSettingsOpen(false);
  };

  // Xử lý tua nhanh/lùi (chỉ cho MP4)
  const handleSkip = (seconds) => {
    if (isVimeoIframe) return; // Không điều khiển skip cho Vimeo
    videoRef.current.currentTime += seconds;
  };

  // Format thời gian (chỉ cho MP4)
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
      {isVimeoIframe ? (
        <iframe
          src={`${videoSrc}${autoPlay ? '?autoplay=1' : ''}`}
          title={title}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className={styles.videoElement}
        />
      ) : (
        <video
          ref={videoRef}
          className={styles.videoElement}
          src={videoSrc}
          onClick={togglePlay}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Overlay khi tạm dừng (chỉ cho MP4) */}
      {!isVimeoIframe && !isPlaying && (
        <div className={styles.pauseOverlay}>
          <button className={styles.playButton} onClick={togglePlay} aria-label="Phát">
            <FaPlay size={40} />
          </button>
        </div>
      )}

      {/* Controls (ẩn một số điều khiển cho Vimeo) */}
      <div className={`${styles.controls} ${showControls ? styles.visible : ''}`}>
        {!isVimeoIframe && (
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
        )}

        <div className={styles.controlsBottom}>
          <div className={styles.leftControls}>
            {!isVimeoIframe && (
              <>
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
              </>
            )}
          </div>

          <div className={styles.rightControls}>
            {!isVimeoIframe && (
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
            )}

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