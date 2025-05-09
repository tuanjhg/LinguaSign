import React from "react";
import CourseFilterBar from "./CourseFilterBar";
import CourseSlider from "./CourseSlider";
import ResultsGrid from "./ResultsGrid";

const CoursePage = ({
  selectedFilter,
  setSelectedFilter,
  recentCourses,
  yourCourses,
  favoriteCourses,
}) => {
  const resultsData = [
    ...recentCourses,
    ...yourCourses,
    ...favoriteCourses,
  ];

  return (
    <div>
      {/* Thanh filter chỉ hiện khi chưa chọn filter */}
      {!selectedFilter && (
        <CourseFilterBar onFilterSelect={setSelectedFilter} />
      )}

      {selectedFilter ? (
        <div className="ResultsWrapper">
          <ResultsGrid
            courses={resultsData}
            onBack={() => setSelectedFilter(null)}
          />
        </div>
      ) : (
        <>
          <section className="section">
            <h2>Recent Courses &gt;</h2>
            <CourseSlider courses={recentCourses} />
          </section>

          <section className="section">
            <h2>Your Courses &gt;</h2>
            <CourseSlider courses={yourCourses} />
          </section>

          <section className="section">
            <h2>Favorites &hearts; &gt;</h2>
            <CourseSlider courses={favoriteCourses} />
          </section>
        </>
      )}
    </div>
  );
};

export default CoursePage;
