import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import CourseFilterBar from "./components/CourseCard/CourseFilterBar";
import ResultsGrid from "./components/CourseCard/ResultsGrid";
import HomePage from "./components/HomePage/HomePage";
import Course from "./components/Course/Course";
import ScrollToTopButton from './components/ScrollToTopButton';
import Translate from './pages/Translate/Translate';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { VideoPage } from './pages/VideoPage';
import { Login } from './components/Auth/Login';
import { Signup } from './components/Auth/Signup';
import { AuthProvider, useAuth } from './components/Auth/AuthContext';
import { PrivateRoute } from './components/Auth/PrivateRoute';
import Quiz  from './components/CourseCard/Quiz'
import CourseDetail from './components/CourseCard/CourseDetail';
import { courseTopics } from './data/courseTopics';

import "./App.css";
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
  { id: 1, title: "Bài học: Ẩm thực", courseId: "course1", imageSrc: imageCourse1},
  { id: 2, title: "Bài học: Các quốc gia", courseId: "course2", imageSrc: imageCourse1 },
  { id: 3, title: "Bài học: Con vật", courseId: "course3", imageSrc: imageCourse1 },
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

/* ---------------- COURSE DASHBOARD ---------------- */
function CourseDashboard({ selectedFilter, setSelectedFilter }) {
  const resultsData = [
    ...recentCourses,
    ...yourCourses,
    ...favoriteCourses,
  ];

  return selectedFilter ? (
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
  );
}

/* ---------------- LAYOUT ---------------- */
function Layout() {
  const [selectedFilter, setSelectedFilter] = React.useState(null);
  const location = useLocation();
 
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  

  const showFilterBar = !isAuthPage && 
                       location.pathname !== "/" && 
                       location.pathname !== "/translate";

  return (
    <div className="Page">
      {!isAuthPage && (
        <Header className="Page__header" />
      )}

      <main className="Page__content">
        {showFilterBar && <CourseFilterBar topicsData={courseTopics} />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/translate" element={
              <Translate />
          } />
          
          <Route path="/course" element={
            <PrivateRoute>
              <CourseDashboard 
                selectedFilter={selectedFilter} 
                setSelectedFilter={setSelectedFilter} 
              />
            </PrivateRoute>
          } />
          
          <Route path="/course/results" element={
            <PrivateRoute>
              <CourseResultsPage />
            </PrivateRoute>
          } />
          
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
          
          <Route path="/settings" element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          } />
          
          <Route path="/video/:videoId" element={
            <PrivateRoute>
              <VideoPage />
            </PrivateRoute>
          } />
          {/* <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/course/:courseId/:entryTitle?" element={<CourseDetail />} /> */}
          <Route path="/quiz" element={<Quiz />}/>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer className="Page__footer" />}
    </div>
  );
}

/* ---------------- COURSE RESULTS PAGE ---------------- */
function CourseResultsPage() {
  const location = useLocation();
  const courses = location.state?.courses || [];
  const title = location.state?.title || 'Results';
  
  return (
    <div className="ResultsWrapper">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <button 
          onClick={() => window.history.back()} 
          className="btn-icon" 
          style={{ 
            marginBottom: -5, 
            marginRight: -2, 
            fontSize: 32, 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            padding: '4px 10px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }} 
          aria-label="Quay lại"
        >
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none" 
            style={{display:'block'}} 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M20 26L10 16L20 6" 
              stroke="#222" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 className="results-title" style={{ margin: 0 }}>{title}</h2>
      </div>
      <ResultsGrid courses={courses} />
    </div>
  );
}

/* ---------------- APP ROOT ---------------- */
export default function App() {
  return (
    <Router>
      <AuthProvider>
         <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Layout />} />
        </Routes>
        <ScrollToTopButton />
      </AuthProvider>
    </Router>
  );
}