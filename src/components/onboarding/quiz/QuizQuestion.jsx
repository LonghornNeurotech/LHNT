// A multiple choice question in a quiz with answer choices to choose
import PropTypes from 'prop-types';

const QuizQuestion = ({ question, selectedAnswer, onAnswerSelect, onNext, isLastQuestion, questionNumber, totalQuestions }) => {
  return (
    <div className="quiz-question p-4 max-w-lg mx-auto bg-white rounded shadow">
      <div className="mb-2 font-semibold">
        Question {questionNumber} of {totalQuestions}
      </div>
      <div className="mb-4 text-lg font-semibold">{question.question}</div>
      <ul>
        {question.options.map((option, idx) => (
          <li key={idx} className="mb-3">
            <label className="cursor-pointer flex items-center">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={() => onAnswerSelect(option)}
                className="mr-2"
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button
        disabled={!selectedAnswer}
        onClick={onNext}
        className={`mt-4 px-4 py-2 rounded font-semibold text-white ${
          selectedAnswer ? 'bg-prussian_blue hover:bg-[#00509e]' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {isLastQuestion ? 'Submit' : 'Next'}
      </button>
    </div>
  );
};

QuizQuestion.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  selectedAnswer: PropTypes.string,
  onAnswerSelect: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  questionNumber: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

export default QuizQuestion;