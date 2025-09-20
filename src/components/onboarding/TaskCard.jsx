import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import RichTextWithLinks from "./RichTextWithLinks";
import VideoGallery from "./videos/VideoGallery";
import Quiz from "./quizzes/Quiz";
import quizzesData from "../../data/quizzes";

const TaskCard = ({ task }) => {
  const { taskTitle, taskDescription, videos, requiredActions = [], quizId } = task;

  const [quizData, setQuizData] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (requiredActions.includes("completeQuiz") && quizId) {
      const raw = quizzesData[quizId];
      const data = raw?.default || raw;
      setQuizData(Array.isArray(data) ? data : []);
    } else {
      setQuizData(null);
    }
    setQuizCompleted(false);
  }, [requiredActions, quizId]);

  const handleQuizComplete = (passed) => {
    if (passed) {
      setQuizCompleted(true);
    }
  };

  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: "1.2rem", color: "#183F5E" }}>
        {taskTitle}
      </div>
      <div style={{ fontSize: "1.08rem", color: "#23395D" }}>
        <RichTextWithLinks text={taskDescription} links={task.links || []} />
      </div>

      {videos && videos.length > 0 && (
        <VideoGallery videos={videos} />
      )}

      {quizCompleted && (
        <p className="mt-3 text-green-700 font-semibold">
          Quiz completed successfully! You may now proceed.
        </p>
      )}
      {requiredActions.includes("completeQuiz") && quizData && quizData.length > 0 && (
        <Quiz quizData={quizData} onComplete={handleQuizComplete} />
      )}
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    taskTitle: PropTypes.string.isRequired,
    taskDescription: PropTypes.string.isRequired,
    videos: PropTypes.array,
    requiredActions: PropTypes.arrayOf(PropTypes.string),
    quizId: PropTypes.string,
    links: PropTypes.array,
  }).isRequired,
};

export default TaskCard;