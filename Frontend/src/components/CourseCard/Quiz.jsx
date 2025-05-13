import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesData } from '../../data/courseData';
import './Quiz.css';

const loadCourseData = (courseId) => {
  const course = coursesData[courseId];
  return course && course.videos ? course.videos : [];
};

const getRandomQuestion = (entries) => {
  if (!entries || entries.length < 2) return null;

  const correctIndex = Math.floor(Math.random() * entries.length);
  const correctEntry = entries[correctIndex];

  const otherOptions = entries
    .filter((_, index) => index !== correctIndex)
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(3, entries.length - 1))
    .map((entry) => entry.title);

  const allOptions = [...otherOptions, correctEntry.title].sort(() => Math.random() - 0.5);

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
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [isQuizFinished, setIsQuizFinished]  = useState(false);
  const maxQuestions = 5;

  useEffect(() => {
    const courseData = loadCourseData(courseId);
    if (courseData.length > 0) {
      setEntries(courseData);
      setQuestion(getRandomQuestion(courseData));
      setScore(0);
      setQuestionCount(0);
    }
  }, [courseId]);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    setShowAnswer(true);
    setQuestionCount((prev) => prev + 1);

    if (option === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (questionCount >= maxQuestions) {
      setIsQuizFinished(true);
      return;
    }
    setSelectedAnswer(null);
    setShowAnswer(false);
    setQuestion(getRandomQuestion(entries));
  };

  const handleBack = () => {
    navigate(`/course/${courseId}`);
  };

  const handleRestart = () => {
    setIsQuizFinished(false);
    setEntries(loadCourseData(courseId));
    setQuestion(getRandomQuestion(entries));
    setScore(0);
    setQuestionCount(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  if (!question || entries.length < 2) {
    return (
      <div className="quiz-container">
        <h2>Quiz: Đoán ngôn ngữ ký hiệu</h2>
        <p>Cần ít nhất 2 video để tạo quiz cho khóa học này.</p>
        <button onClick={handleBack} className="back-button">
          Quay lại khóa học
        </button>
      </div>
    );
  }

  if (isQuizFinished) {
    return (
      <div className="quiz-complete-container">
        <div className="quiz-complete-card">
          <h2>Chúc mừng bạn đã hoàn thành Quiz!</h2>
          <p className="score-text">Điểm của bạn: {score}/{maxQuestions}</p>
          <p className="score-message">
            {score === maxQuestions
              ? '🎉 Xuất sắc! Bạn đã đạt điểm tối đa!'
              : score >= maxQuestions * 0.7
              ? '👍 Tốt lắm! Bạn đã làm rất tốt!'
              : '😊 Cố gắng hơn ở lần sau nhé!'}
          </p>
          <div className="complete-buttons">
            <button onClick={handleRestart} className="restart-button">
              Làm lại Quiz
            </button>
            <button onClick={handleBack} className="back-button">
              Quay lại khóa học
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Quiz: Khóa học {courseId}</h2>
      <div className="quiz-info">
        <p>
          Câu {questionCount + 1}/{maxQuestions} - Điểm: {score}
        </p>
      </div>
      <div className="video-container">
        <iframe
          src={question.video_link}
          title="Quiz Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
      <p className="question-text">Câu hỏi: Đây là ký hiệu của từ nào?</p>
      <div className="options-grid">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={showAnswer}
            className={`option-button ${
              showAnswer
                ? option === question.correctAnswer
                  ? 'correct'
                  : option === selectedAnswer
                  ? 'wrong'
                  : ''
                : ''
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {showAnswer && (
        <div className="quiz-footer">
          <p>
            {selectedAnswer === question.correctAnswer
              ? '🎉 Chính xác!'
              : `❌ Sai! Đáp án đúng: ${question.correctAnswer}`}
          </p>
          <button onClick={handleNext} className="next-button">
            {questionCount >= maxQuestions ? 'Hoàn thành' : 'Câu tiếp theo'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;