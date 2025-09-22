import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Quiz = ({ quizData, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [fullName, setFullName] = useState("");
  const [eid, setEid] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setFullName("");
    setEid("");
    setFormSubmitted(false);
  }, [quizData]);

  const handleAnswerChange = (questionId, option) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quizData.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
    onComplete && onComplete(correctCount === quizData.length);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setFullName("");
    setEid("");
    setFormSubmitted(false);
    onComplete && onComplete(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (fullName.trim() && eid.trim()) {
      setFormSubmitted(true);
      // This is where you would trigger the email functionality
      // Example: onQuizCompleted({ quizData, fullName, eid, score, answers });
    }
  };

  const allAnswered = quizData.length === Object.keys(answers).length;
  const isPerfectScore = score === quizData.length;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-1">Quiz</h3>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-blue-800 font-medium">
          Complete this quiz with a 100% score to complete this task. You can retry this quiz an unlimited number of times.
        </p>
      </div>

      {!submitted && (
        <div className="space-y-4">
          {quizData.map((q) => (
            <div key={q.id} className="mb-6">
              <h4 className="font-medium mb-3">
                Question {q.id}: {q.question}
              </h4>
              <div className="space-y-2">
                {q.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-start cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={() => handleAnswerChange(q.id, option)}
                      className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm leading-5">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Quiz
          </button>
        </div>
      )}

      {submitted && (
        <div className="space-y-4">
          {/* Score Display */}
          <div className="mb-4">
            <p className="font-semibold text-xl">
              Your score: {score} / {quizData.length} (
              {((score / quizData.length) * 100).toFixed(1)}%)
            </p>
          </div>

          {/* Quiz Results */}
          <div className="space-y-4">
            {quizData.map((q) => {
              const userAnswer = answers[q.id];
              return (
                <div key={q.id} className="mb-6">
                  <h4 className="font-medium mb-3">
                    Question {q.id}: {q.question}
                  </h4>
                  <div className="space-y-2">
                    {q.options.map((option) => {
                      const isUserAnswer = userAnswer === option;
                      const isCorrect = option === q.correctAnswer;
                      const isWrongUserAnswer = isUserAnswer && !isCorrect;
                      
                      return (
                        <label key={option} className="flex items-start">
                          <div className="relative mr-3 mt-1">
                            {/* Radio button with overlay icons */}
                            <input
                              type="radio"
                              name={`result-question-${q.id}`}
                              value={option}
                              checked={isUserAnswer}
                              disabled
                              className="h-4 w-4 text-blue-600 border-gray-300"
                            />
                            {/* Correct answer checkmark */}
                            {isCorrect && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-green-600 text-sm font-bold">✓</span>
                              </div>
                            )}
                            {/* Wrong user answer X */}
                            {isWrongUserAnswer && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-red-600 text-sm font-bold">✗</span>
                              </div>
                            )}
                          </div>
                          <span className={`text-sm leading-5 ${
                            isCorrect 
                              ? 'text-green-700 font-medium' 
                              : isWrongUserAnswer 
                                ? 'text-red-700' 
                                : 'text-gray-700'
                          }`}>
                            {option}
                            {isCorrect && !isUserAnswer && (
                              <span className="ml-2 text-green-600 font-medium">(Correct Answer)</span>
                            )}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Success Message for Perfect Score */}
          {isPerfectScore && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-700 font-semibold">
                Congratulations! You passed with a perfect score!
              </p>
            </div>
          )}

          {/* Complete Your Submission - ONLY for Perfect Score */}
          {isPerfectScore && !formSubmitted && (
            <div>
              <h4 className="font-medium mb-2">Complete Your Submission</h4>
              <div className="space-y-3">
                <div>
                  <label htmlFor="quizFullName" className="block font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    id="quizFullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border py-2 px-3 rounded w-full"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="quizEid" className="block font-medium mb-1">
                    EID
                  </label>
                  <input
                    id="quizEid"
                    type="text"
                    required
                    value={eid}
                    onChange={(e) => setEid(e.target.value)}
                    className="border py-2 px-3 rounded w-full"
                    placeholder="Enter your EID"
                  />
                </div>
                <button
                  onClick={handleFormSubmit}
                  disabled={!fullName.trim() || !eid.trim()}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* Form Submitted Success - ONLY for Perfect Score */}
          {isPerfectScore && formSubmitted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 font-semibold mb-2">
                Quiz completed successfully! You may now proceed.
              </p>
              <div className="text-md text-green-600">
                <p>Score: {score} / {quizData.length} (100%)</p>
                <p>Submitted by: {fullName} ({eid})</p>
              </div>
            </div>
          )}

          {/* Retry Button */}
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry Quiz
          </button>
        </div>
      )}
    </div>
  );
};

Quiz.propTypes = {
  quizData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswer: PropTypes.string.isRequired,
    })
  ).isRequired,
  onComplete: PropTypes.func,
};

export default Quiz;