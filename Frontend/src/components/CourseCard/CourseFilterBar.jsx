import React from 'react';
import './CourseFilterBar.css';
import { FaArrowLeft, FaFilter } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const location = useLocation();

  const isDetailOrVideoPage = location.pathname.includes("/course/") && 
                            (location.pathname.includes("/video/") || 
                             location.pathname.includes("/quiz") || 
                             !location.pathname.includes("/results"));


  const handleFilter = (label) => {
    const cards = topicsData[label] || [];
    navigate('/course/results', { state: { courses: cards, title: label } });
  };

  return (
  <div className="course-filter-bar">
    <div className="filter-group">
      {!isDetailOrVideoPage && (
        <>
          <button className="filter-icon"><FaFilter /></button>
          {filters.map((f, idx) => (
            <button className="filter-btn" key={idx} onClick={() => handleFilter(f.label)}>
              {f.label}
            </button>
          ))}
        </>
      )}
    </div>

    {isDetailOrVideoPage && (
      <div className="back-group">
       
      </div>
    )}
  </div>
);
};

export default CourseFilterBar;
