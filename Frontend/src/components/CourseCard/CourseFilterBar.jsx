import React from 'react';
import './CourseFilterBar.css';
import { FaFilter } from 'react-icons/fa';

const filters = [
  { label: 'Topics' },
  { label: 'Alphabet' },
  { label: 'Sentences' },
  { label: 'Words' },
  { label: 'Songs' },
  { label: 'A - Z' },
];

const CourseFilterBar = ({ onFilterSelect }) => {
  return (
    <div className="course-filter-bar">
      <div className="filter-group">
        <button className="filter-icon"><FaFilter /></button>
        {filters.map((f, idx) => (
          <button className="filter-btn" key={idx} onClick={() => onFilterSelect && onFilterSelect(f.label)}>{f.label}</button>
        ))}
      </div>
    </div>
  );
};

export default CourseFilterBar; 