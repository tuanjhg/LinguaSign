import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import CourseFilterBar from "./components/CourseCard/CourseFilterBar";
import { CourseSlider } from "./components/CourseCard/CourseSlider";
import ResultsGrid from "./components/CourseCard/ResultsGrid";
import HomePage from "./components/HomePage/HomePage";
import Course from "./components/Course/Course";
import ScrollToTopButton from './components/ScrollToTopButton';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { VideoPage } from './pages/VideoPage';
import Translate from './pages/Translate/Translate';

// Import CSS ghi đè cho các button
import './components/common/ButtonOverrides.css';

import "./App.css";
import imageCourse from "./assets/sign_topic_2.png";
import imageCourse1 from "./assets/course1.jpg";
import imageCourse2 from "./assets/course2.jpg";
import imageCourse3 from "./assets/course3.jpg";
import imageCourse4 from "./assets/course4.jpg";
import imageCourse5 from "./assets/course5.jpg";
import imageCourse6 from "./assets/course6.jpg";
import imageCourse7 from "./assets/course7.jpg";
import imageCourse8 from "./assets/course8.jpg";
import imageCourse9 from "./assets/course9.jpg";

/* ---------------- MOCK DATA ---------------- */
const recentCourses = [
  {
    title: "Chủ đề: Ẩm thực",
    imageSrc: imageCourse1,
    videoSrc: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    videoId: "1"
  },
  {
    title: "Chủ đề: Câu cảm thán",
    imageSrc: imageCourse7,
    videoSrc: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    videoId: "2"
  },
  {
    title: "Bài học: Các quốc gia",
    imageSrc: imageCourse6,
    videoSrc: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
    videoId: "3"
  },
  {
    title: "Bài học: Ẩm Thực",
    imageSrc: imageCourse3,
    videoSrc: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
    videoId: "4"
  },
  {
    title: "Bài học: Động vật",
    imageSrc: imageCourse6,
    videoSrc: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
    videoId: "5"
  },
  {
    title: "Bài học: Thể thao",
    imageSrc: imageCourse2,
    videoSrc: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    videoId: "6"
  },
  {
    title: "Bài học: Động vật",
    imageSrc: imageCourse8,
    videoSrc: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    videoId: "7"
  },
];
const yourCourses = [
  { title: "Bài học: Ẩm Thực", imageSrc: imageCourse4 },
  { title: "Bài học: Ẩm Thực", imageSrc: imageCourse5 },
  { title: "Bài học: Động vật", imageSrc: imageCourse6 },
  { title: "Bài học: Thể thao", imageSrc: imageCourse7 },
  { title: "Bài học: Động vật", imageSrc: imageCourse8 },
  { title: "Bài học: Động vật", imageSrc: imageCourse9 },
];
const favoriteCourses = [
  { title: "Bài học: Động vật", imageSrc: imageCourse1 },
  { title: "Bài học: Động vật", imageSrc: imageCourse2},
  { title: "Bài học: Động vật", imageSrc: imageCourse2 },
  { title: "Bài học: Động vật", imageSrc: imageCourse5 },
  { title: "Bài học: Động vật", imageSrc: imageCourse3 },
  { title: "Favorite 1", imageSrc: imageCourse3 },
  { title: "Favorite 2", imageSrc: imageCourse2 },
  { title: "Favorite 3", imageSrc: imageCourse6 },
  { title: "Favorite 4", imageSrc: imageCourse7 },
  { title: "Favorite 5", imageSrc: imageCourse8 },
  { title: "Favorite 6", imageSrc: imageCourse9 },
];

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
      <Header className="Page__header" />

      {/* ===== CONTENT ===== */}
      <main className="Page__content">
        {/* Filter bar chỉ hiện ở trang course */}
        {location.pathname === "/course" && (
          <CourseFilterBar onFilterSelect={setSelectedFilter} />
        )}

        <Routes>
          {/* Trang Home */}
          <Route path="/" element={<HomePage />} />

          {/* Trang Translate */}
          <Route path="/translate" element={<Translate />} />

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
                    <Course courses={recentCourses} title="Recent courses" />
                  </section>
                  <section className="section">
                    <Course courses={recentCourses} title="Từ vựng mới" />
                  </section>
                  <section className="section">
                    <Course courses={yourCourses} title="Your courses" />
                  </section>
                  <section className="section">
                    <Course courses={favoriteCourses} title="Favorites" />
                  </section>
                </>
              )
            }
          />
          {/* Trang kết quả khi bấm Xem toàn bộ */}
          <Route path="/course/results" element={<CourseResultsPage />} />

          {/* Trang Profile và Settings */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Trang Video */}
          <Route path="/video/:videoId" element={<VideoPage />} />
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
      <AppProvider>
        <Layout />
        <ScrollToTopButton />
      </AppProvider>
    </Router>
  );
}

// Component trang kết quả cho 'Xem toàn bộ'
function CourseResultsPage() {
  const location = useLocation();
  const navigate = window.history;
  const courses = location.state?.courses || [];
  const title = location.state?.title || 'Results';
  return (
    <div className="ResultsWrapper">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <button onClick={() => window.history.back()} className="btn-icon" style={{ marginBottom: -5, marginRight: -2, fontSize: 32, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Quay lại">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{display:'block'}} xmlns="http://www.w3.org/2000/svg">
            <path d="M20 26L10 16L20 6" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="results-title" style={{ margin: 0}}>{title}</h2>
      </div>
      <ResultsGrid courses={courses} />
    </div>
  );
}