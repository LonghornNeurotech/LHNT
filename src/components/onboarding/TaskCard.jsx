import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import RichTextWithLinks from "./RichTextWithLinks";
import VideoGallery from "./videos/VideoGallery";
import Quiz from "./quizzes/Quiz";
import FileUploadManager from "./upload/FileUploadManager";
import quizzesData from "../../data/quizzes";

const TaskCard = ({ task }) => {
  const { taskTitle, taskDescription, videos, requiredActions = [], quizId } = task;

  const [quizData, setQuizData] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);

  useEffect(() => {
    if (requiredActions.includes("completeQuiz") && quizId) {
      const raw = quizzesData[quizId];
      const data = raw?.default || raw;
      setQuizData(Array.isArray(data) ? data : []);
    } else {
      setQuizData(null);
    }
    setQuizCompleted(false);
    setUploadCompleted(false);
  }, [requiredActions, quizId]);

  const handleQuizComplete = (passed) => {
    if (passed) {
      setQuizCompleted(true);
    }
  };

  const handleUploadComplete = (completed) => {
    if (completed) {
      setUploadCompleted(true);
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

      {uploadCompleted && (
        <div className="mb-3 p-2 bg-green-100 text-green-700 rounded text-sm">
          Files uploaded successfully! You may now proceed.
        </div>
      )}

      {requiredActions.includes("uploadFiles") && (
        <FileUploadManager onComplete={handleUploadComplete} />
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