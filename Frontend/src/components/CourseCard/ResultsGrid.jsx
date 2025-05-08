import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import "./ResultsGrid.css";

/* ----- layout constants ----- */
const ROW_GAP          = 20;   // khớp gap trong CSS
const HEADER_HEIGHT    = 80;
const TITLE_ROW_HEIGHT = 48;
const PAGINATION_H     = 60;

const ResultsGrid = ({ courses, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize,     setPageSize]   = useState(1);
  const [colCount,     setColCount]   = useState(1);

  /* ----- tính số cột & số hàng thích hợp ----- */
  const calcLayout = () => {
    /* 1) container rộng bao nhiêu? */
    const container = document.querySelector(".results-grid-container");
    const containerW = container ? container.clientWidth : window.innerWidth;

    /* 2) kích thước Card (lấy mẫu đầu) */
    const sampleCard = document.querySelector(".results-grid .CourseCard");
    const cardW  = sampleCard ? sampleCard.offsetWidth  : 220;   // fallback
    const cardH  = sampleCard ? sampleCard.offsetHeight : 200;

    /* 3) số cột phù hợp */
    const cols = Math.max(1, Math.floor((containerW + ROW_GAP) / (cardW + ROW_GAP)));

    /* 4) tính chiều cao khả dụng cho hàng */
    const filter = document.querySelector(".course-filter-bar");
    const filterH = filter ? filter.getBoundingClientRect().height : 0;

    const availH = window.innerHeight
                 - HEADER_HEIGHT
                 - filterH
                 - TITLE_ROW_HEIGHT
                 - PAGINATION_H
                 - 32;                       // khoảng trống thêm

    const rows = Math.max(1, Math.floor((availH + ROW_GAP) / (cardH + ROW_GAP)));

    /* 5) set state */
    setColCount(cols);
    setPageSize(cols * rows);
  };

  useEffect(() => {
    calcLayout();                         // chạy lần đầu
    window.addEventListener("resize", calcLayout);
    return () => window.removeEventListener("resize", calcLayout);
  }, []);

  /* ----- pagination helpers ----- */
  const totalPages     = Math.ceil(courses.length / pageSize);
  const startIdx       = (currentPage - 1) * pageSize;
  const currentCourses = courses.slice(startIdx, startIdx + pageSize);

  const handlePrev = () => setCurrentPage(p => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage(p => Math.min(p + 1, totalPages));

  return (
    <div className="results-grid-container">
      {/* title & back */}
      <div style={{ display:"flex", alignItems:"center", marginBottom:16 }}>
        {onBack && (
          <button onClick={onBack} className="btn-icon" style={{ marginRight:16 }}>
            <i className="bx bx-chevron-left"></i>
          </button>
        )}
        <h2 className="results-title" style={{ margin:0 }}>Results</h2>
      </div>

      {/* grid */}
      <div
        className="results-grid"
        style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
      >
        {currentCourses.map((c, i) => (
          <CourseCard key={startIdx + i} {...c} />
        ))}

        {/* lấp trống hàng cuối để giữ lưới phẳng */}
        {currentCourses.length % colCount !== 0 &&
          Array(colCount - (currentCourses.length % colCount))
            .fill(null)
            .map((_, i) => (
              <div key={`empty-${i}`} style={{ visibility:"hidden" }}>
                <CourseCard title="" imageSrc="" />
              </div>
            ))}
      </div>

      {/* pagination */}
      <div style={{ display:"flex", justifyContent:"center", marginTop:24, gap:12 }}>
        <button onClick={handlePrev} disabled={currentPage===1} className="btn-icon">
          <i className="bx bx-chevron-left"></i>
        </button>
        <span style={{ alignSelf:"center" }}>
          Page {currentPage} / {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage===totalPages} className="btn-icon">
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ResultsGrid;
