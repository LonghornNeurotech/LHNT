import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import RichTextWithLinks from "./RichTextWithLinks";
import VideoGallery from "./videos/VideoGallery";
import Quiz from "./quizzes/Quiz";
import FileUploadManager from "./upload/FileUploadManager";
import CompletionIcon from "../common/CompletionIcon";
import quizzesData from "../../data/quizzes";

const TaskCard = ({ task }) => {
  const { taskTitle, taskDescription, videos, documents, links, requiredActions = [], quizId } = task;
  
  // State for different completion types
  const [quizData, setQuizData] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [watchedVideos, setWatchedVideos] = useState(new Set());
  const [readDocuments, setReadDocuments] = useState(new Set());
  const [clickedLinks, setClickedLinks] = useState(new Set());

  useEffect(() => {
    // Initialize quiz data if needed
    if (requiredActions.includes("completeQuiz") && quizId) {
      const raw = quizzesData[quizId];
      const data = raw?.default || raw;
      setQuizData(Array.isArray(data) ? data : []);
    } else {
      setQuizData(null);
    }

    // Reset completion states
    setQuizCompleted(false);
    setUploadCompleted(false);
    setWatchedVideos(new Set());
    setReadDocuments(new Set());
    setClickedLinks(new Set());
  }, [requiredActions, quizId]);

  // Handler functions
  const handleQuizComplete = (completed) => {
    setQuizCompleted(completed);
  };

  const handleUploadComplete = (completed) => {
    setUploadCompleted(completed);
  };

  const handleVideoWatch = (videoTitle, isRequired) => {
    if (isRequired) {
      setWatchedVideos(prev => new Set(prev).add(videoTitle));
    }
  };

  const handleDocumentRead = (docTitle, isRequired) => {
    if (isRequired) {
      setReadDocuments(prev => new Set(prev).add(docTitle));
    }
  };

  // Handler for RichTextWithLinks to call when links are clicked
  const handleRichTextLinkClick = (linkLabel, isRequired) => {
    if (isRequired && links) {
      setClickedLinks(prev => new Set(prev).add(linkLabel));
    }
  };

  // Calculate completion status
  const calculateTaskCompletion = () => {
    const completionStatus = {};

    requiredActions.forEach(action => {
      switch (action) {
        case "completeQuiz":
          completionStatus.completeQuiz = quizCompleted;
          break;

        case "uploadFiles":
          completionStatus.uploadFiles = uploadCompleted;
          break;

        case "watchVideos":
          if (videos && videos.length > 0) {
            const requiredVideos = videos.filter(v => v.required);
            if (requiredVideos.length === 0) {
              completionStatus.watchVideos = true;
            } else {
              completionStatus.watchVideos = requiredVideos.every(video => 
                watchedVideos.has(video.title)
              );
            }
          } else {
            completionStatus.watchVideos = true;
          }
          break;

        case "readDocuments":
          if (documents && documents.length > 0) {
            const requiredDocs = documents.filter(d => d.required);
            if (requiredDocs.length === 0) {
              completionStatus.readDocuments = true;
            } else {
              completionStatus.readDocuments = requiredDocs.every(doc => 
                readDocuments.has(doc.title)
              );
            }
          } else {
            completionStatus.readDocuments = true;
          }
          break;

        case "clickLinks":
          if (links && links.length > 0) {
            const requiredLinks = links.filter(l => l.required);
            if (requiredLinks.length === 0) {
              completionStatus.clickLinks = true;
            } else {
              completionStatus.clickLinks = requiredLinks.every(link => 
                clickedLinks.has(link.label)
              );
            }
          } else {
            completionStatus.clickLinks = true;
          }
          break;

        default:
          completionStatus[action] = false;
      }
    });

    // Task is complete if ALL required actions are completed
    const isTaskComplete = requiredActions.length === 0 || 
      requiredActions.every(action => completionStatus[action] === true);

    return isTaskComplete;
  };

  const isTaskComplete = calculateTaskCompletion();

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 mb-6 border-silver_lake_blue`}>
      {/* Task Header with CompletionIcon */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{taskTitle}</h2>
        <CompletionIcon completed={isTaskComplete} />
      </div>

      {/* Task Description */}
      <div className="mb-6">
        <RichTextWithLinks 
          text={taskDescription || ""} 
          links={links || []}
          onLinkClick={handleRichTextLinkClick}
        />
      </div>

      {/* Success Message for Completed Task */}
      {isTaskComplete && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-700 font-semibold">
            Great work on successfully completing this task! Keep moving forward on completing the other tasks. I believe you got this!
          </p>
        </div>
      )}

      {/* Videos Section */}
      {videos && videos.length > 0 && (
        <div className="mb-6">
          <VideoGallery 
            videos={videos} 
            onVideoWatch={handleVideoWatch}
            watchedVideos={watchedVideos}
          />
        </div>
      )}

      {/* Documents Section */}
      {documents && documents.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Documents</h3>
          <div className="space-y-2">
            {documents.map((doc, index) => {
              const isRead = readDocuments.has(doc.title);
              const isRequired = doc.required;
              
              // Color logic similar to RichTextWithLinks
              let linkClass = "";
              if (isRequired) {
                linkClass = isRead 
                  ? "text-green-800 font-semibold underline" 
                  : "text-orange-600 font-semibold underline";
              } else {
                linkClass = isRead 
                  ? "text-blue-800 underline" 
                  : "text-blue-600 underline";
              }

              return (
                <div key={index} className="flex items-center">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDocumentRead(doc.title, doc.required)}
                    className={`${linkClass} hover:opacity-80`}
                  >
                    {doc.title}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quiz Section */}
      {requiredActions.includes("completeQuiz") && quizData && quizData.length > 0 && (
        <Quiz quizData={quizData} onComplete={handleQuizComplete} />
      )}

      {/* File Upload Section */}
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
    documents: PropTypes.array,
    links: PropTypes.array,
    requiredActions: PropTypes.array,
    quizId: PropTypes.string,
  }).isRequired,
};

export default TaskCard;