import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import CourseFilterBar from "./components/CourseCard/CourseFilterBar";
import { CourseSlider } from "./components/CourseCard/CourseSlider";
import ResultsGrid from "./components/CourseCard/ResultsGrid";
import HomePage from "./components/HomePage/HomePage";

import "./App.css";
import { recentCourses, yourCourses, favoriteCourses } from "./data/mockData";


/* ---------------- LAYOUT ---------------- */
function Layout() {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const location = useLocation();

  const resultsData = [
    ...recentCourses,
    ...yourCourses,
    ...favoriteCourses,
  ];

  return (
    <div className="Page">
      {/* ===== HEADER (cố định) ===== */}
      <Header className="Page__header" UserName="Nguyen Anh Dung" />

      {/* ===== CONTENT ===== */}
      <main className="Page__content">
        {/* Filter bar chỉ hiện ngoài trang chủ */}
        {location.pathname !== "/" && (
          <CourseFilterBar onFilterSelect={setSelectedFilter} />
        )}

        <Routes>
          {/* Trang Home */}
          <Route path="/" element={<HomePage />} />

          {/* Trang Course */}
          <Route
            path="/course"
            element={
              selectedFilter ? (
                <div className="ResultsWrapper">
                  <ResultsGrid
                    courses={resultsData}
                    onBack={() => setSelectedFilter(null)}
                  />
                </div>
              ) : (
                <>
                  <section className="section">
                    <h2>Recent courses &gt;</h2>
                    <CourseSlider courses={recentCourses} />
                  </section>

                  <section className="section">
                    <h2>Your Course &gt;</h2>
                    <CourseSlider courses={yourCourses} />
                  </section>

                  <section className="section">
                    <h2>Favorites &hearts; &gt;</h2>
                    <CourseSlider courses={favoriteCourses} />
                  </section>
                </>
              )
            }
          />
        </Routes>
      </main>

      {/* ===== FOOTER ===== */}
      <Footer className="Page__footer" />
    </div>
  );
}

/* ---------------- APP ROOT ---------------- */
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
