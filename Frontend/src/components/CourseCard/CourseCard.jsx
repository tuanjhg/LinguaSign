// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { VideoPreview } from '../VideoPlayer/VideoPreview';
// import './CourseCard.css';

// export const CourseCard = ({ title, imageSrc, videoId = "1", videoSrc }) => {
//   const navigate = useNavigate();

//   // Xử lý khi click vào card
//   const handleCardClick = () => {
//     navigate(`/video/${videoId}`);
//   };

//   // Nếu có videoSrc, sử dụng VideoPreview
//   if (videoSrc) {
//     return (
//       <div className="CourseCard modern-card" onClick={handleCardClick}>
//         <VideoPreview
//           videoSrc={videoSrc}
//           thumbnailSrc={imageSrc}
//           title={title}
//           duration={65} // Giá trị mặc định
//         />
//       </div>
//     );
//   }

//   // Nếu không có videoSrc, sử dụng card thông thường
//   return (
//     <div className="CourseCard modern-card" onClick={handleCardClick}>
//       <img className="modern-card-image" alt={title} src={imageSrc} />
//       <div className="modern-card-content">
//         <div className="modern-card-title">{title}</div>
//       </div>
//     </div>
//   );
// };
// export default CourseCard
import './CourseCard.css'
export const CourseCard = ({ title, imageSrc }) => {
  return (
    <div className="CourseCard">
      <img className="image" alt={title} src={imageSrc} />
      <div className="overlap-group">
        <p className="text-wrapper">{title}</p>
      </div>
    </div>
  );
};

export default CourseCard;