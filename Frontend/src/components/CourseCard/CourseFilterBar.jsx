import React from 'react';
import './CourseFilterBar.css';
import { FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const filters = [
  { label: 'Topics' },
  { label: 'Alphabet' },
  { label: 'Sentences' },
  { label: 'Words' },
  { label: 'Songs' },
  { label: 'A - Z' },
];

const CourseFilterBar = ({ topicsData }) => {
  const navigate = useNavigate();
  const handleFilter = (label) => {
    const cards = topicsData[label] || [];
    navigate('/course/results', { state: { courses: cards, title: label } });
  };
  return (
    <div className="course-filter-bar">
      <div className="filter-group">
        <button className="filter-icon"><FaFilter /></button>
        {filters.map((f, idx) => (
          <button className="filter-btn" key={idx} onClick={() => handleFilter(f.label)}>{f.label}</button>
        ))}
      </div>
    </div>
  );
};

export default CourseFilterBar; 