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