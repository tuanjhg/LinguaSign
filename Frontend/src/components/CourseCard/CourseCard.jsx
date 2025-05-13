import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoPreview } from '../VideoPlayer/VideoPreview';
import './CourseCard.css';

export const CourseCard = ({ title, imageSrc, videoId, videoSrc, courseId }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (courseId && videoId) {
      navigate(`/course/${courseId}/video/${videoId}`);
    } else if (courseId) {
      navigate(`/course/${courseId}`);
    }
  };

  if (videoSrc) {
    return (
      <div className="CourseCard modern-card" onClick={handleCardClick}>
        <VideoPreview
          videoSrc={videoSrc}
          thumbnailSrc={imageSrc}
          title={title}
          duration={65}
        />
      </div>
    );
  }

  return (
    <div className="CourseCard modern-card" onClick={handleCardClick}>
      <img className="modern-card-image" alt={title} src={imageSrc} />
      <div className="modern-card-content">
        <div className="modern-card-title">{title}</div>
      </div>
    </div>
  );
};

export default CourseCard;