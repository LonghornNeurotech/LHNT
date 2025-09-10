import PropTypes from 'prop-types';

const QuizResults = ({ quizData, answers, onRestart }) => {
  const score = quizData.reduce(
    (total, question) => (answers[question.id] === question.correctAnswer ? total + 1 : total),
    0
  );

  return (
    <div className="quiz-results p-4 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
      <p className="text-xl mb-6">
        Your score: <strong>{score}</strong> / <strong>{quizData.length}</strong>
      </p>

      <div className="space-y-4 mb-6">
        {quizData.map((question) => (
          <div key={question.id} className="p-3 border rounded">
            <p className="font-semibold">{question.question}</p>
            <p>
              Your answer:{' '}
              <span className={answers[question.id] === question.correctAnswer ? 'text-green-600' : 'text-red-600'}>
                {answers[question.id] || 'No answer'}
              </span>
            </p>
            <p>Correct answer: <strong>{question.correctAnswer}</strong></p>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="px-6 py-2 bg-prussian_blue rounded text-white font-semibold hover:bg-[#00509e]"
      >
        Restart Quiz
      </button>
    </div>
  );
};

QuizResults.propTypes = {
  quizData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      correctAnswer: PropTypes.string.isRequired,
    })
  ).isRequired,
  answers: PropTypes.objectOf(PropTypes.string).isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default QuizResults;