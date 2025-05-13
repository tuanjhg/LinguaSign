// src/components/CourseCard/CourseDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesData } from '../../data/courseData';
import CourseSlider from './CourseSlider';
import './CourseDetail.css';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = coursesData[courseId]; 
  const courseData = course && course.videos ? course.videos : []; 

  const courses = courseData.map((video, index) => ({
    courseId: courseId,
    title: video.title,
    imageSrc: video.thumbnail,
    videoSrc: video.video_link,
    videoId: (index + 1).toString(),
  }));

  if (!course || !course.videos || courseData.length === 0) {
    return <div>Khóa học không tồn tại.</div>;
  }

  return (
    <div className="course-detail-container">
      <h1>Khóa học: {courseId}</h1>
      <button
        onClick={() => navigate(`/course/${courseId}/quiz`)}
        style={{
          padding: '10px 20px',
          borderRadius: 8,
          border: 'none',
          background: '#007bff',
          color: '#fff',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Làm Quiz
      </button>
      <CourseSlider courses={courses} title={`Video trong ${courseId}`} isCourseDetail={true} />
    </div>
  );
};

export default CourseDetail;