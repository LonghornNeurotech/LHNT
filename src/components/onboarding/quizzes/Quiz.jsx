import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Quiz = ({ quizData, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showRetry, setShowRetry] = useState(false);
  const [fullName, setFullName] = useState("");
  const [eid, setEid] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowRetry(false);
    setFullName("");
    setEid("");
    setFormSubmitted(false);
  }, [quizData]);

  const handleAnswerChange = (questionId, option) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
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
    setShowRetry(true);
    onComplete && onComplete(correctCount === quizData.length);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowRetry(false);
    setFullName("");
    setEid("");
    setFormSubmitted(false);
    onComplete && onComplete(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const allAnswered = quizData.length === Object.keys(answers).length;

  return (
    <div className="mt-4">
        <div className="flex flex-col gap-1 mb-2">
            <h3 className="text-lg font-semibold mb-1">Quiz</h3>
            <span className="text-sm text-gray-700 mb-3">
                Complete this quiz with a 100% score to complete this task. You can retry this quiz an unlimited number of times.
            </span>
        </div>
        {!submitted ? (
            <form>
            {quizData.map(({ id, question, options }) => (
                <div key={id} className="mb-4">
                <p className="font-medium">
                    Question {id}: {question}
                </p>
                <div className="mt-2 space-y-2">
                    {options.map((option, index) => (
                    <label
                        key={index}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <input
                        type="radio"
                        name={`question${id}`}
                        value={option}
                        checked={answers[id] === option}
                        onChange={() => handleAnswerChange(id, option)}
                        className="cursor-pointer"
                        />
                        <span>{option}</span>
                    </label>
                    ))}
                </div>
                </div>
            ))}
            <button
                className="mt-3 px-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={!allAnswered}
                onClick={handleSubmit}
                type="button"
            >
                Submit Quiz
            </button>
            </form>
        ) : (
            <div>
            <h3 className="text-lg font-semibold mb-3">Results</h3>
            <p className="mb-3">
                Your score: {score} / {quizData.length} (
                {((score / quizData.length) * 100).toFixed(1)}%)
            </p>
            {quizData.map(({ id, question, correctAnswer }) => {
                const userAnswer = answers[id];
                const isCorrect = userAnswer === correctAnswer;
                return (
                <div
                    key={id}
                    className={`mb-4 p-2 rounded border ${
                    isCorrect
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                    }`}
                >
                    <p className="font-medium">
                    Question {id}: {question}
                    </p>
                    <p className="mt-1 mb-1">
                    <span className={isCorrect ? "text-green-700" : "text-red-700"}>
                        Your answer: {userAnswer || "No answer selected"}{" "}
                        {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                    </span>
                    </p>
                    {!isCorrect && (
                    <p className="text-green-700">Correct answer: {correctAnswer}</p>
                    )}
                </div>
                );
            })}
            {showRetry && (
                <button
                className="mt-3 px-2 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                onClick={handleRetry}
                type="button"
                >
                Retry Quiz
                </button>
            )}
            </div>
        )}
        {submitted && score === quizData.length && !formSubmitted && (
            <form className="mt-5" onSubmit={handleFormSubmit}>
            <h4 className="font-semibold mb-2">Complete Your Submission</h4>
            <div className="mb-3">
                <label htmlFor="fullName" className="block font-medium mb-1">
                Full Name
                </label>
                <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border py-2 rounded w-full"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="eid" className="block font-medium mb-1">
                EID
                </label>
                <input
                id="eid"
                type="text"
                required
                value={eid}
                onChange={(e) => setEid(e.target.value)}
                className="border py-2 rounded w-full"
                />
            </div>
            <button
                type="submit"
                className="px-2 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Submit
            </button>
            </form>
        )}
        {formSubmitted && (
            <p className="mt-3 text-green-700 font-semibold">
            Thank you for submitting the quiz completion!
            </p>
        )}
    </div>
  );
};

Quiz.propTypes = {
  quizData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswer: PropTypes.string.isRequired,
    })
  ).isRequired,
  onComplete: PropTypes.func,
};

export default Quiz;

// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";

// const Quiz = ({ quizData, onComplete }) => {
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [showRetry, setShowRetry] = useState(false);
//   const [fullName, setFullName] = useState("");
//   const [eid, setEid] = useState("");
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   useEffect(() => {
//     setAnswers({});
//     setSubmitted(false);
//     setScore(0);
//     setShowRetry(false);
//     setFullName("");
//     setEid("");
//     setFormSubmitted(false);
//   }, [quizData]);

//   const handleAnswerChange = (questionId, option) => {
//     if (submitted) return;
//     setAnswers((prev) => ({ ...prev, [questionId]: option }));
//   };

//   const handleSubmit = () => {
//     let correctCount = 0;
//     quizData.forEach((q) => {
//       if (answers[q.id] === q.correctAnswer) {
//         correctCount++;
//       }
//     });
//     setScore(correctCount);
//     setSubmitted(true);
//     setShowRetry(true);
//     onComplete && onComplete(correctCount === quizData.length);
//   };

//   const handleRetry = () => {
//     setAnswers({});
//     setSubmitted(false);
//     setScore(0);
//     setShowRetry(false);
//     setFullName("");
//     setEid("");
//     setFormSubmitted(false);
//     onComplete && onComplete(false);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     setFormSubmitted(true);
//   };

//   const allAnswered = quizData.length === Object.keys(answers).length;

//   return (
//     <div className="mt-4">
//       <div className="flex flex-col gap-1">
//         <h3 className="text-lg font-semibold mb-1">Quiz</h3>
//         <span className="text-sm text-gray-700 mb-3">
//           Complete this quiz with a 100% score to complete this task. You can retry this quiz an unlimited number of times.
//         </span>
//       </div>
//       <div className="p-4 border rounded bg-white shadow-sm">
//         {!submitted && (
//           <>
//             <form>
//               {quizData.map(({ id, question, options }) => (
//                 <div key={id} className="mb-4">
//                   <p className="font-medium">
//                     Question {id}: {question}
//                   </p>
//                   <div className="mt-2 space-y-2">
//                     {options.map((option, index) => (
//                       <label
//                         key={index}
//                         className="flex items-center space-x-2 cursor-pointer"
//                       >
//                         <input
//                           type="radio"
//                           name={`question_${id}`}
//                           value={option}
//                           checked={answers[id] === option}
//                           onChange={() => handleAnswerChange(id, option)}
//                           className="cursor-pointer"
//                         />
//                         <span>{option}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </form>
//             <button
//               className={`mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50`}
//               disabled={!allAnswered}
//               onClick={handleSubmit}
//             >
//               Submit Quiz
//             </button>
//           </>
//         )}

//         {submitted && (
//           <div>
//             <h3 className="text-lg font-semibold mb-3">Results</h3>
//             <p className="mb-3">
//               Your score: {score} / {quizData.length} (
//               {((score / quizData.length) * 100).toFixed(1)}%)
//             </p>
//             {quizData.map(({ id, question, options, correctAnswer }) => {
//               const userAnswer = answers[id];
//               const isCorrect = userAnswer === correctAnswer;
//               return (
//                 <div
//                   key={id}
//                   className={`mb-4 p-3 rounded border ${
//                     isCorrect
//                       ? "border-green-500 bg-green-50"
//                       : "border-red-500 bg-red-50"
//                   }`}
//                 >
//                   <p className="font-medium">
//                     Question {id}: {question}
//                   </p>
//                   <p
//                     className={`mt-1 ${
//                       isCorrect ? "text-green-700" : "text-red-700"
//                     }`}
//                   >
//                     Your answer: {userAnswer || "No answer selected"}{" "}
//                     {isCorrect ? "✓ Correct" : "✗ Incorrect"}
//                   </p>
//                   {!isCorrect && (
//                     <p className="text-green-700">
//                       Correct answer: {correctAnswer}
//                     </p>
//                   )}
//                 </div>
//               );
//             })}
//             {showRetry && (
//               <button
//                 className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
//                 onClick={handleRetry}
//               >
//                 Retry Quiz
//               </button>
//             )}

//             {score === quizData.length && !formSubmitted && (
//               <form className="mt-5" onSubmit={handleFormSubmit}>
//                 <h4 className="font-semibold mb-2">Complete Your Submission</h4>
//                 <div className="mb-3">
//                   <label
//                     htmlFor="fullName"
//                     className="block font-medium mb-1"
//                   >
//                     Full Name
//                   </label>
//                   <input
//                     id="fullName"
//                     type="text"
//                     required
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                     className="border px-3 py-2 rounded w-full"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="eid" className="block font-medium mb-1">
//                     EID
//                   </label>
//                   <input
//                     id="eid"
//                     type="text"
//                     required
//                     value={eid}
//                     onChange={(e) => setEid(e.target.value)}
//                     className="border px-3 py-2 rounded w-full"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   Submit
//                 </button>
//               </form>
//             )}

//             {formSubmitted && (
//               <p className="mt-3 text-green-700 font-semibold">
//                 Thank you for submitting the quiz completion!
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// Quiz.propTypes = {
//   quizData: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       question: PropTypes.string.isRequired,
//       options: PropTypes.arrayOf(PropTypes.string).isRequired,
//       correctAnswer: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   onComplete: PropTypes.func,
// };

// export default Quiz;

// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";

// const Quiz = ({ quizData, onComplete }) => {
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [showRetry, setShowRetry] = useState(false);
//   const [fullName, setFullName] = useState("");
//   const [eid, setEid] = useState("");
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   useEffect(() => {
//     // Reset quiz if quizData changes
//     setAnswers({});
//     setSubmitted(false);
//     setScore(0);
//     setShowRetry(false);
//     setFullName("");
//     setEid("");
//     setFormSubmitted(false);
//   }, [quizData]);

//   const handleAnswerChange = (questionId, option) => {
//     if (submitted) return; // Don't allow changes after submit
//     setAnswers((prev) => ({ ...prev, [questionId]: option }));
//   };

//   const handleSubmit = () => {
//     let correctCount = 0;
//     quizData.forEach((q) => {
//       if (answers[q.id] === q.correctAnswer) {
//         correctCount++;
//       }
//     });
//     setScore(correctCount);
//     setSubmitted(true);
//     setShowRetry(true);
//     onComplete && onComplete(correctCount === quizData.length);
//   };

//   const handleRetry = () => {
//     setAnswers({});
//     setSubmitted(false);
//     setScore(0);
//     setShowRetry(false);
//     setFullName("");
//     setEid("");
//     setFormSubmitted(false);
//     onComplete && onComplete(false);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Placeholder for form submission logic (email, etc)
//     setFormSubmitted(true);
//   };

//   const allAnswered = quizData.length === Object.keys(answers).length;

//   return (
//     <div className="mt-4 p-4 border rounded bg-white shadow-sm">
//       {!submitted && (
//         <>
//           <h3 className="text-lg font-semibold mb-3">Quiz Questions</h3>
//           <form>
//             {quizData.map(({ id, question, options }) => (
//               <div key={id} className="mb-4">
//                 <p className="font-medium">
//                   Question {id}: {question}
//                 </p>
//                 <div className="mt-2 space-y-2">
//                   {options.map((option, index) => (
//                     <label
//                       key={index}
//                       className="flex items-center space-x-2 cursor-pointer"
//                     >
//                       <input
//                         type="radio"
//                         name={`question_${id}`}
//                         value={option}
//                         checked={answers[id] === option}
//                         onChange={() => handleAnswerChange(id, option)}
//                         className="cursor-pointer"
//                       />
//                       <span>{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </form>
//           <button
//             className={`mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50`}
//             disabled={!allAnswered}
//             onClick={handleSubmit}
//           >
//             Submit Quiz
//           </button>
//         </>
//       )}

//       {submitted && (
//         <div>
//           <h3 className="text-lg font-semibold mb-3">Results</h3>
//           <p className="mb-3">
//             Your score: {score} / {quizData.length} (
//             {((score / quizData.length) * 100).toFixed(1)}%)
//           </p>
//           {quizData.map(({ id, question, options, correctAnswer }) => {
//             const userAnswer = answers[id];
//             const isCorrect = userAnswer === correctAnswer;
//             return (
//               <div
//                 key={id}
//                 className={`mb-4 p-3 rounded border ${
//                   isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
//                 }`}
//               >
//                 <p className="font-medium">
//                   Question {id}: {question}
//                 </p>
//                 <p
//                   className={`mt-1 ${
//                     isCorrect ? "text-green-700" : "text-red-700"
//                   }`}
//                 >
//                   Your answer: {userAnswer || "No answer selected"}{" "}
//                   {isCorrect ? "✓ Correct" : "✗ Incorrect"}
//                 </p>
//                 {!isCorrect && (
//                   <p className="text-green-700">Correct answer: {correctAnswer}</p>
//                 )}
//               </div>
//             );
//           })}
//           {showRetry && (
//             <button
//               className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
//               onClick={handleRetry}
//             >
//               Retry Quiz
//             </button>
//           )}

//           {score === quizData.length && !formSubmitted && (
//             <form className="mt-5" onSubmit={handleFormSubmit}>
//               <h4 className="font-semibold mb-2">Complete Your Submission</h4>
//               <div className="mb-3">
//                 <label htmlFor="fullName" className="block font-medium mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   id="fullName"
//                   type="text"
//                   required
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   className="border px-3 py-2 rounded w-full"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="eid" className="block font-medium mb-1">
//                   EID
//                 </label>
//                 <input
//                   id="eid"
//                   type="text"
//                   required
//                   value={eid}
//                   onChange={(e) => setEid(e.target.value)}
//                   className="border px-3 py-2 rounded w-full"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//               >
//                 Submit
//               </button>
//             </form>
//           )}

//           {formSubmitted && (
//             <p className="mt-3 text-green-700 font-semibold">
//               Thank you for submitting the quiz completion!
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// Quiz.propTypes = {
//   quizData: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       question: PropTypes.string.isRequired,
//       options: PropTypes.arrayOf(PropTypes.string).isRequired,
//       correctAnswer: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   onComplete: PropTypes.func,
// };

// export default Quiz;