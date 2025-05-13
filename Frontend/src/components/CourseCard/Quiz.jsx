import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockCourse1 from "../../data/course1";
import mockCourse2 from "../../data/course2";
import mockCourse3 from "../../data/course3";
import "./Quiz.css";

const loadCourseData = (courseId) => {
  switch (courseId) {
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

const getRandomQuestion = (entries) => {
  if (entries.length < 4) return null;

  const correctIndex = Math.floor(Math.random() * entries.length);
  const correctEntry = entries[correctIndex];

  const otherOptions = entries
    .filter((_, i) => i !== correctIndex)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((entry) => entry.title);


  const allOptions = [...otherOptions, correctEntry.title].sort(() => 0.5 - Math.random());

  return {
    video_link: correctEntry.video_link,
    correctAnswer: correctEntry.title,
    options: allOptions,
  };
};



const Quiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const courseData = loadCourseData(courseId);
    setEntries(courseData);
    setQuestion(getRandomQuestion(courseData));
  }, [courseId]);

  const handleAnswer = (option) => {
    setSelected(option);
    setShowAnswer(true);
  };

  const handleBack = () => {
    navigate(`/course/${courseId}`);  // Điều hướng về trang khóa học
  };

  const handleNext = () => {
    setSelected(null);
    setShowAnswer(false);
    setQuestion(getRandomQuestion(entries));
  };

  if (!question) return <p>Không đủ dữ liệu để tạo quiz.</p>;

  return (
    <div className="quiz-container">
      <h2>Quiz: Đoán ngôn ngữ ký hiệu</h2>
      <div className="video-container">
        <iframe
          src={question.video_link}
          title="Quiz Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
      <p>Câu hỏi: Đây là ký hiệu của từ nào?</p>
      <div className="options">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(option)}
            disabled={showAnswer}
            className={`option-button ${
              showAnswer
                ? option === question.correctAnswer
                  ? "correct"
                  : option === selected
                  ? "wrong"
                  : ""
                : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {showAnswer && (
        <div className="quiz-footer">
          <p>
            {selected === question.correctAnswer ? "🎉 Chính xác!" : "❌ Không chính xác!"}
          </p>
          <button onClick={handleNext} className="next-button">
            Câu tiếp
          </button>
        </div>
      )}
      <button onClick={handleBack} className="back-button">Quay lại khóa học</button>
    </div>
  );
};

export default Quiz;