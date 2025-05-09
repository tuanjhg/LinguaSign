import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseSlider.css';

/**
 * Slider dùng scroll‑snap + progress‑bar
 */
export const CourseSlider = ({ courses = [], title = 'Recent courses', onSeeAll }) => {
   const navigate = useNavigate();
  const wrapperRef  = useRef(null);  // khung ngoài – gán width = footer
  const viewportRef = useRef(null);  // phần cuộn
  const [canPrev, setCanPrev]   = useState(false);
  const [canNext, setCanNext]   = useState(false);
  const [progress, setProgress] = useState(0); // 0 – 1

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

      setCanPrev(Math.round(el.scrollLeft) > 0);
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
    <div
      className="course-slider-remake-wrapper"
      ref={wrapperRef}
      style={{
        padding: '10px 0 30px  0px ',
        margin: '0 auto',
        maxWidth: 1300,
        position: 'relative',
      }}
    >
      <div style={{ padding: '0 40px 9px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ 
          fontSize: '2.3rem',
          fontWeight: 900,
          color: 'rgb(0, 0, 0)',
          margin: 0, 
          letterSpacing: 1, 
          lineHeight: 1,
          textShadow: '0 2px 8px rgba(26,35,126,0.08)',
          fontFamily: title === 'Từ vựng mới'
            ? 'Times New Roman, Times, DejaVu Serif, serif'
            : 'Roboto, Helvetica, Arial, sans-serif'
        }}>{title}</span>
        <button
          onClick={onSeeAll}
          className="see-all-btn"
          style={{
            border: 'none',
            fontWeight: 600,
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            borderRadius: 8,
            transition: 'background 0.2s, color 0.2s',
          }}
          aria-label="Xem toàn bộ"
        >
          Xem toàn bộ
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{display:'inline',verticalAlign:'middle'}} xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      {/* Nút prev (ẩn nếu không prev được) */}
      {canPrev && (
        <button
          className="slider-arrow left"
          onClick={handlePrev}
          style={{
            left: -36,
            background: 'none',
            color: '#222',
            boxShadow: 'none',
            borderRadius: 8,
            width: 44,
            height: 44,
            fontSize: 32,
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            transition: 'transform .18s cubic-bezier(.4,0,.2,1)',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.18)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
          aria-label="Trước"
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 26L10 16L20 6" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <div className="course-slider-remake-viewport" ref={viewportRef} style={{ display: 'flex', gap: 28, overflowX: 'auto', overflowY: 'visible', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth', padding: '24px 40px 32px 40px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {courses.map((course, idx) => (
          <div
            className="course-slider-remake-item"
            key={idx}
            onClick={() => navigate(`/video/${course.videoId || idx + 1}`)}
            style={{
              background: '#fff',
              borderRadius: 18,
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              minWidth: 220,
              maxWidth: 260,
              width: 240,
              margin: '0 0 0 0',
              transition: 'box-shadow .2s, transform .2s',
              cursor: 'pointer',
              overflow: 'hidden',
              scrollSnapAlign: 'start',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.13)';
              e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
            }}
          >
            <img
              src={course.imageSrc}
              alt={course.title}
              style={{
                width: '100%',
                aspectRatio: '16/9',
                objectFit: 'cover',
                borderRadius: '18px 18px 0 0',
                marginBottom: 0,
                display: 'block',
                transition: 'transform .2s',
              }}
            />
            <div style={{ padding: '14px 16px 10px 16px', width: '100%' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#222', marginBottom: 2, lineHeight: 1.2 }}>
                {course.title}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Nút next (ẩn nếu không next được) */}
      {canNext && (
        <button
          className="slider-arrow right"
          onClick={handleNext}
          style={{
            right: -36,
            background: 'none',
            color: '#222',
            boxShadow: 'none',
            borderRadius: 8,
            width: 44,
            height: 44,
            fontSize: 32,
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            transition: 'transform .18s cubic-bezier(.4,0,.2,1)',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.18)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
          aria-label="Tiếp"
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 26L22 16L12 6" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <style>{`
        .course-slider-remake-viewport::-webkit-scrollbar { display: none; }
        .slider-arrow:focus, .slider-arrow:active { outline: none !important; box-shadow: none !important; border: none !important; }
        @media (max-width: 900px) {
          .course-slider-remake-viewport { gap: 16px !important; padding: 0 8px !important; }
          .course-slider-remake-item { min-width: 70vw !important; max-width: 90vw !important; width: 90vw !important; }
        }
        @media (max-width: 600px) {
          .course-slider-remake-viewport { gap: 8px !important; padding: 0 2vw !important; }
          .course-slider-remake-item { min-width: 92vw !important; max-width: 98vw !important; width: 98vw !important; }
        }
      `}</style>
    </div>
  );
};

export default CourseSlider;
