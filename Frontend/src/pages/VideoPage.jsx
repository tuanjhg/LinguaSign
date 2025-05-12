import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VideoPlayer } from "../components/VideoPlayer/VideoPlayer";
import { VideoPreview } from "../components/VideoPlayer/VideoPreview";
import styles from "./VideoPage.module.css";

// Dữ liệu mẫu cho video
const sampleVideos = [
  {
    id: "1",
    title: "Bài học: Chào hỏi trong ngôn ngữ ký hiệu",
    description: "Học cách chào hỏi và giới thiệu bản thân bằng ngôn ngữ ký hiệu. Bài học này sẽ giúp bạn làm quen với các cử chỉ cơ bản.",
    videoSrc: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    thumbnailSrc: "https://i.ytimg.com/vi/EngW7tLk6R8/maxresdefault.jpg",
    duration: 65,
    views: 1245,
    date: "15/05/2023"
  },
  {
    id: "2",
    title: "Từ vựng cơ bản: Gia đình",
    description: "Học các từ vựng liên quan đến gia đình trong ngôn ngữ ký hiệu. Bạn sẽ biết cách diễn tả bố, mẹ, anh chị em và các mối quan hệ gia đình khác.",
    videoSrc: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    thumbnailSrc: "https://i.ytimg.com/vi/EngW7tLk6R8/maxresdefault.jpg",
    duration: 120,
    views: 982,
    date: "20/05/2023"
  },
  {
    id: "3",
    title: "Từ vựng: Màu sắc và hình dạng",
    description: "Học cách biểu thị các màu sắc và hình dạng cơ bản trong ngôn ngữ ký hiệu. Bài học này giúp bạn mở rộng vốn từ vựng.",
    videoSrc: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
    thumbnailSrc: "https://i.ytimg.com/vi/EngW7tLk6R8/maxresdefault.jpg",
    duration: 95,
    views: 756,
    date: "25/05/2023"
  },
  {
    id: "4",
    title: "Hội thoại đơn giản: Gặp gỡ và làm quen",
    description: "Thực hành hội thoại đơn giản khi gặp gỡ và làm quen với người khác bằng ngôn ngữ ký hiệu.",
    videoSrc: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
    thumbnailSrc: "https://i.ytimg.com/vi/EngW7tLk6R8/maxresdefault.jpg",
    duration: 180,
    views: 1102,
    date: "01/06/2023"
  },
  {
    id: "5",
    title: "Từ vựng: Thức ăn và đồ uống",
    description: "Học các từ vựng liên quan đến thức ăn và đồ uống trong ngôn ngữ ký hiệu.",
    videoSrc: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
    thumbnailSrc: "https://i.ytimg.com/vi/EngW7tLk6R8/maxresdefault.jpg",
    duration: 150,
    views: 845,
    date: "10/06/2023"
  }
];

export const VideoPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  
  useEffect(() => {
    // Tìm video hiện tại từ ID
    const video = sampleVideos.find(v => v.id === videoId);
    
    if (video) {
      setCurrentVideo(video);
      
      // Lọc các video liên quan (không bao gồm video hiện tại)
      const related = sampleVideos.filter(v => v.id !== videoId);
      setRelatedVideos(related);
    } else {
      // Nếu không tìm thấy video, chuyển hướng về trang course
      navigate('/course');
    }
  }, [videoId, navigate]);
  
  // Format số lượt xem
  const formatViews = (views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
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
            <span>{formatViews(currentVideo.views)} lượt xem</span>
            <span>•</span>
            <span>Ngày đăng: {currentVideo.date}</span>
          </div>
          
          <div className={styles.videoDescription}>
            <p>{currentVideo.description}</p>
          </div>
        </div>
      </div>
      
      <div className={styles.sidebar}>
        <h2 className={styles.relatedTitle}>Video liên quan</h2>
        
        <div className={styles.relatedVideos}>
          {relatedVideos.map(video => (
            <div 
              key={video.id} 
              className={styles.relatedVideoItem}
              onClick={() => navigate(`/video/${video.id}`)}
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
      </div>
    </div>
  );
};
