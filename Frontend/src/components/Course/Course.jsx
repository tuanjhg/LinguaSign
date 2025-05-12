import React from 'react';
import CourseSlider from '../CourseCard/CourseSlider';
import signTopic2 from '../../assets/sign_topic_2.png';
import { useNavigate } from 'react-router-dom';

const mockCourses = [
  {
    title: 'Bài học: Ẩm thực',
    imageSrc: signTopic2,
    videoSrc: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    videoId: '1'
  },
  {
    title: 'Bài học: Câu cảm thán',
    imageSrc: signTopic2,
    videoSrc: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
    videoId: '2'
  },
  {
    title: 'Bài học: Các quốc gia',
    imageSrc: signTopic2,
    videoSrc: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4',
    videoId: '3'
  },
  {
    title: 'Bài học: Động vật',
    imageSrc: signTopic2,
    videoSrc: 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4',
    videoId: '4'
  },
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