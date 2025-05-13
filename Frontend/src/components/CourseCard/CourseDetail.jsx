import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseDetail.css";
import mockCourse1 from "../../data/course1";
import mockCourse2 from "../../data/course2";
import mockCourse3 from "../../data/course3";

const loadCourseData = (id) => {
  switch (id) {
    case "1":
      return mockCourse1;
    case "2":
      return mockCourse2;
    case "3":
      return mockCourse3;
    default:
      return [];
  }
};


const CourseDetail = () => {
  const { courseId, entryTitle } = useParams(); 
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentEntry, setCurrentEntry] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
  
        const courseData = loadCourseData(courseId);
        setEntries(courseData);
  
        if (entryTitle) {
          const decodedTitle = decodeURIComponent(entryTitle);
          const entry = courseData.find(
            (item) => item.title.toLowerCase() === decodedTitle.toLowerCase()
          );
          setCurrentEntry(entry || null);
        } else {
          setCurrentEntry(null);
        }
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchEntries();
  }, [courseId, entryTitle]);

  const handleEntryClick = (entry) => {
    // Chuyển hướng đến URL mới với title của entry
    navigate(`/course/${courseId}/${encodeURIComponent(entry.title)}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading sign language entries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")} className="home-button">
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="dictionary-container">
      {/* Header */}
      <header className="dictionary-header">
  <button onClick={() => navigate("/course")} className="back-button">
    &larr; Back
  </button>
  <h1>Sign Language Dictionary</h1>
  <button
    onClick={() => navigate(`/course/${courseId}/quiz`)}
    className="quiz-button"
  >
    Bắt đầu làm Quiz
  </button>
</header>

      {/* Main Content */}
      <div className="dictionary-layout">
        {/* Entries List */}
        <section className="entries-list-section">
          <div className="entries-list">
            {entries.map((entry, index) => (
              <div
                key={`${entry.title}-${index}`} // Sử dụng title + index làm key
                className={`entry-card ${
                  currentEntry?.title.toLowerCase() ===
                  entry.title.toLowerCase()
                    ? "active"
                    : ""
                }`}
                onClick={() => handleEntryClick(entry)}
              >
                <div className="entry-thumbnail">
                  <img
                    src={entry.thumbnail}
                    alt={entry.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/sign-placeholder.jpg";
                    }}
                  />
                </div>
                <div className="entry-info">
                  <h3>{entry.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Entry Detail */}
        <section className="entry-detail-section">
          {currentEntry && (
            <>
              <div className="video-container">
                <iframe
                  src={currentEntry.video_link}
                  title={currentEntry.title}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="entry-detail">
                <h2>{currentEntry.title}</h2>
                {currentEntry.description && <p>{currentEntry.description}</p>}
                
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default CourseDetail;