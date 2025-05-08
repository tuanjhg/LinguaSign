import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import CourseCard from './CourseCard';
import './CourseSlider.css';
import { useNavigate } from 'react-router-dom';


/**
 * Slider dùng scroll‑snap + progress‑bar
 */
export const CourseSlider = ({ courses = [] }) => {
  const wrapperRef  = useRef(null);  // khung ngoài – gán width = footer
  const viewportRef = useRef(null);  // phần cuộn
  const [canPrev, setCanPrev]   = useState(false);
  const [canNext, setCanNext]   = useState(false);
  const [progress, setProgress] = useState(0); // 0 – 1
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    // Chuyển đến trang chi tiết course
    navigate(`/course/${courseId}`);
    // Hoặc có thể dùng: navigate(`/course/${encodeURIComponent(course.title)}`);
  };

  /* ---------- 1.  Đồng bộ width wrapper với footer ---------- */
  const syncWidthWithFooter = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const footer = document.querySelector('footer .container') ||
                   document.querySelector('footer');
    const width  = footer ? footer.offsetWidth : window.innerWidth;

    wrapper.style.width = `${width}px`;
  }, []);

  useLayoutEffect(() => {
    syncWidthWithFooter();
    window.addEventListener('resize', syncWidthWithFooter);
    return () => window.removeEventListener('resize', syncWidthWithFooter);
  }, [syncWidthWithFooter]);

  /* ---------- 2.  Cập nhật nút & progress khi cuộn ---------- */
  useEffect(() => {
    const updateUI = () => {
      const el = viewportRef.current;
      if (!el) return;

      setCanPrev(el.scrollLeft > 0);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);

      const ratio =
        el.scrollLeft / (el.scrollWidth - el.clientWidth || 1);
      setProgress(ratio);          // 0 → 1
    };

    const el = viewportRef.current;
    if (el) {
      updateUI();
      el.addEventListener('scroll', updateUI);
      window.addEventListener('resize', updateUI);
    }
    return () => {
      if (el) el.removeEventListener('scroll', updateUI);
      window.removeEventListener('resize', updateUI);
    };
  }, []);

  /* ---------- 3.  Xử lý click arrow ---------- */
  const handlePrev = () => {
    const el = viewportRef.current;
    if (el) el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' });
  };
  const handleNext = () => {
    const el = viewportRef.current;
    if (el) el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
  };

  /* ---------- 4.  Render ---------- */
  return (
    <div className="course-slider-wrapper" ref={wrapperRef}>
      <button className="slider-arrow left" onClick={handlePrev} disabled={!canPrev}>
        ‹
      </button>

      <div className="course-slider-viewport" ref={viewportRef}>
      {courses.map((course, idx) => (
          <div 
            className="course-slider-item" 
            key={idx}
            onClick={() => handleCourseClick(course.id)} 
            style={{ cursor: 'pointer' }} 
          >
            <CourseCard {...course} />
          </div>
        ))}
      </div>

      <button className="slider-arrow right" onClick={handleNext} disabled={!canNext}>
        ›
      </button>

      {/* progress‑line */}
      <div className="slider-progress">
        <div
          className="slider-progress-bar"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
};

export default CourseSlider;
