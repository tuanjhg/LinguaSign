import React from 'react';
import CourseSlider from '../CourseCard/CourseSlider';
import { useNavigate } from 'react-router-dom';
import { coursesData } from '../../data/courseData';

const mockCourses = Object.entries(coursesData).map(([courseId, courseData]) => ({
  courseId: courseId,
  title: courseData.name,
  imageSrc: courseData.videos[0]?.thumbnail || 'https://via.placeholder.com/300x169', 
}));

export default function Course({ courses = mockCourses, title }) {
  const navigate = useNavigate();
  const handleSeeAll = () => {
    navigate('/course/results', { state: { courses, title } });
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 18px',
        }}
      >
      </div>
      <CourseSlider courses={courses} title={title} onSeeAll={handleSeeAll} isCourseDetail={false} />
    </div>
  );
}