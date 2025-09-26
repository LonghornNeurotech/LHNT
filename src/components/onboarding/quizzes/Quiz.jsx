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
    // Reset completion when quiz data changes
    if (onComplete) {
      onComplete(false);
    }
  }, [quizData,]);

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
    
    // Don't mark as complete yet if perfect score - wait for form submission
    const isPerfect = correctCount === quizData.length;
    if (!isPerfect && onComplete) {
      onComplete(false);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setFullName("");
    setEid("");
    setFormSubmitted(false);
    if (onComplete) {
      onComplete(false);
    }
  };

  const handleFormSubmit = () => {
    if (fullName.trim() && eid.trim()) {
      setFormSubmitted(true);
      if (onComplete) {
        onComplete(true);
      }
    }
  };

  const allAnswered = quizData.length === Object.keys(answers).length;
  const isPerfectScore = score === quizData.length;

  return (
    <div className="mt-4">
      <h3 className="text-xl text-prussian_blue font-semibold mb-1">Quiz</h3>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-md text-blue-800 font-medium">
          Complete this quiz with a 100% score to complete this task. You can retry this quiz an unlimited number of times.
        </p>
      </div>

      {!submitted && (
        <div className="space-y-5">
          {quizData.map((q) => (
            <div key={q.id} className="mb-6">
              <h4 className="font-medium text-lg text-prussian_blue mb-3">
                Question {q.id}: {q.question}
              </h4>
              <div className="space-y-3">
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
                    <span className="text-[0.95rem] sm:text-[1rem] lg:text-[1.1rem] leading-5">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-4 py-2 bg-silver_lake_blue text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Quiz
          </button>
        </div>
      )}

      {submitted && (
        <div className="space-y-4">
          {/* Score Display */}
          <div className="mb-4">
            <p className="font-semibold">
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
                            <input
                              type="radio"
                              name={`result-question-${q.id}`}
                              value={option}
                              checked={isUserAnswer}
                              disabled
                              className="h-4 w-4 text-blue-600 border-gray-300"
                            />
                            {isCorrect && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-green-600 text-sm font-bold">✓</span>
                              </div>
                            )}
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

          {/* Perfect Score Messages and Form */}
          {isPerfectScore && !formSubmitted && (
            <>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-700 font-semibold md:text-[1.2rem]">
                  Congratulations! You got a perfect score! Now, fill out your full name and EID below to confirm proof of your successful completion of this quiz to Longhorn Neurotech!
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Confirm Your Successful Completion of this Quiz!</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="border py-2 px-3 rounded w-full"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">EID</label>
                    <input
                      type="text"
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
            </>
          )}

          {/* Final Success Message */}
          {isPerfectScore && formSubmitted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 font-semibold mb-2">
                Quiz completed successfully! You may now proceed.
              </p>
              <div className="text-sm text-green-600">
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