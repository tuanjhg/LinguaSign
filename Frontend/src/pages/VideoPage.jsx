
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VideoPlayer } from "../components/VideoPlayer/VideoPlayer";
import { VideoPreview } from "../components/VideoPlayer/VideoPreview";
import styles from "./VideoPage.module.css";
import { coursesData } from "../../src/data/courseData"; 

export const VideoPage = () => {
  const { courseId, videoId } = useParams();
  const navigate = useNavigate();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const maxVisible = 3;

  useEffect(() => {
    const course = coursesData[courseId];
    if (!course || !course.videos) {
      navigate("/course");
      return;
    }

    const videoIndex = parseInt(videoId) - 1;
    const video = course.videos[videoIndex];

    if (video) {
      setCurrentVideo({
        id: videoId,
        title: video.title,
        description: video.description || "Không có mô tả",
        videoSrc: video.video_link,
        thumbnailSrc: video.thumbnail,
        duration: 60,
        views: Math.floor(Math.random() * 1000) + 500,
        date: "01/01/2023",
      });

      const related = course.videos
        .filter((_, index) => index !== videoIndex)
        .map((v, index) => ({
          id: (index + 1).toString(),
          title: v.title,
          description: v.description || "Không có mô tả",
          videoSrc: v.video_link,
          thumbnailSrc: v.thumbnail,
          duration: 60,
          views: Math.floor(Math.random() * 1000) + 500,
          date: "01/01/2023",
        }));

      setRelatedVideos(related);
      setVisibleVideos(related.slice(0, maxVisible));
    } else {
      navigate(`/course/${courseId}`);
    }
  }, [courseId, videoId, navigate]);

  const handleNext = () => {
    const nextIndex = Math.min(startIndex + maxVisible, relatedVideos.length - maxVisible);
    setStartIndex(nextIndex);
    setVisibleVideos(relatedVideos.slice(nextIndex, nextIndex + maxVisible));
  };

  const handlePrev = () => {
    const prevIndex = Math.max(startIndex - maxVisible, 0);
    setStartIndex(prevIndex);
    setVisibleVideos(relatedVideos.slice(prevIndex, prevIndex + maxVisible));
  };

  if (!currentVideo) {
    return <div className={styles.loading}>Đang tải...</div>;
  }

  return (
    <div className={styles.videoPageContainer}>
      <div className={styles.mainContent}>
        <div className={styles.playerContainer}>
          <VideoPlayer
            videoSrc={currentVideo.videoSrc}
            title={currentVideo.title}
            autoPlay={true}
          />
        </div>
        <div className={styles.videoInfo}>
          <h1 className={styles.videoTitle}>{currentVideo.title}</h1>
          <div className={styles.videoStats}>
            <span>{currentVideo.views} lượt xem</span>
            <span>•</span>
            <span>Ngày đăng: {currentVideo.date}</span>
          </div>
          <p>{currentVideo.description}</p>
        </div>
      </div>
      <div className={styles.sidebar}>
        <h2 className={styles.relatedTitle}>Video liên quan</h2>
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={styles.navButton}
        >
          ▲ Lên
        </button>
        <div className={styles.relatedVideos}>
          {visibleVideos.map((video) => (
            <div
              key={video.id}
              className={styles.relatedVideoItem}
              onClick={() => navigate(`/course/${courseId}/video/${video.id}`)}
            >
              <VideoPreview
                videoSrc={video.videoSrc}
                thumbnailSrc={video.thumbnailSrc}
                title={video.title}
                duration={video.duration}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={startIndex + maxVisible >= relatedVideos.length}
          className={styles.navButton}
        >
          ▼ Xuống
        </button>
      </div>
    </div>
  );
};

export default VideoPage;