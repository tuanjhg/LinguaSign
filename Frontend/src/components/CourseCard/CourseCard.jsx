import './CourseCard.css'
export const CourseCard = ({ title, imageSrc }) => {
  return (
    <div className="CourseCard modern-card">
      <img className="modern-card-image" alt={title} src={imageSrc} />
      <div className="modern-card-content">
        <div className="modern-card-title">{title}</div>
      </div>
    </div>
  );
};

export default CourseCard;