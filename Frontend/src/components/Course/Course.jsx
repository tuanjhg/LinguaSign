import React from 'react';
import CourseSlider from '../CourseCard/CourseSlider';
import signTopic2 from '../../assets/sign_topic_2.png';
import { useNavigate } from 'react-router-dom';

// Mock data mẫu (có thể xóa nếu truyền từ ngoài vào)
const mockCourses = [
  { title: 'Bài học: Ẩm thực', imageSrc: signTopic2 },
  { title: 'Bài học: Câu cảm thán', imageSrc: signTopic2 },
  { title: 'Bài học: Các quốc gia', imageSrc: signTopic2 },
  { title: 'Bài học: Động vật', imageSrc: signTopic2 },
];

export default function Course({ courses = mockCourses, title }) {
  const navigate = useNavigate();
  const handleSeeAll = () => {
    navigate('/course/results', { state: { courses, title } });
  };
  return (
    <div>
      <CourseSlider courses={courses} title={title} onSeeAll={handleSeeAll} />
      {/* Sau này có thể thêm TrendingColumn, filter, ... ở đây */}
    </div>
  );
} 