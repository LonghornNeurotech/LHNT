import { useState } from 'react';
import PropTypes from 'prop-types';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';

const QuizContainer = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answer) => {
    setAnswers({ ...answers, [quizData[currentQuestionIndex].id]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  if (showResults) {
    return <QuizResults quizData={quizData} answers={answers} onRestart={handleRestart} />;
  }

  return (
    <div>
      <QuizQuestion
        question={quizData[currentQuestionIndex]}
        selectedAnswer={answers[quizData[currentQuestionIndex].id]}
        onAnswerSelect={handleAnswerSelect}
        onNext={handleNext}
        isLastQuestion={currentQuestionIndex === quizData.length - 1}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={quizData.length}
      />
    </div>
  );
};

QuizContainer.propTypes = {
  quizData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default QuizContainer;