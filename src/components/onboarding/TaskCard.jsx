/*
  Developer's Notes:
  Once progress tracking is fully implemented and saved for each member,
  then include the CompletionIcon component. For now, omit the CompletionIcon 
  component and any semblance of progress indicators from the user until 
  progress tracking is fully implemented and saved for each member.
*/

import { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import RichTextWithLinks from "./RichTextWithLinks";
import VideoGallery from "./videos/VideoGallery";
import Quiz from "./quizzes/Quiz";
import FileUploadManager from "./upload/FileUploadManager";
import CompletionIcon from "../common/CompletionIcon";
import quizzesData from "../../data/quizzes";
import { useProgress } from "../../context/useProgress";

const TaskCard = ({ task }) => {
  const { taskTitle, taskDescription, videos, documents, links, requiredActions = [], quizId } = task;
  const { onboardingBlock, moduleSubmodule } = useParams();
  const { updateTaskProgress, getTaskProgress, isTaskCompleted } = useProgress();

  const taskProgress = useMemo(() => {
    if (!onboardingBlock || !moduleSubmodule) return {};
    return getTaskProgress(onboardingBlock, moduleSubmodule, taskTitle);
  }, [getTaskProgress, onboardingBlock, moduleSubmodule, taskTitle]);
  
  // State for different completion types
  const [quizData, setQuizData] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [watchedVideos, setWatchedVideos] = useState(new Set());
  const [readDocuments, setReadDocuments] = useState(new Set());
  const [clickedLinks, setClickedLinks] = useState(new Set());

  // Helper handler function for RichTextWithLinks to call when links are clicked
  const handleRichTextLinkClick = (linkLabel, isRequired) => {
    if (isRequired && links && onboardingBlock && moduleSubmodule) {
      setClickedLinks(prev => {
        const next = new Set(prev).add(linkLabel);
        updateTaskProgress(onboardingBlock, moduleSubmodule, taskTitle, "clickedLinks", Array.from(next));
        return next;
      });
    }
  };

  // Function to parse formatted text with markdown-like syntax
  const parseFormattedText = (text, links = []) => {
    if (!text) return null;

    // Support both literal "\n" sequences and actual newlines
    const processed = text.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
    const lines = processed.split('\n');
    
    const elements = [];
    let listType = null; // 'ul' or 'ol'
    let listItems = [];
    let keyCounter = 0;

    // Helper function to close current list block
    const flushList = () => {
      if (!listType || listItems.length === 0) return;
      
      if (listType === "ul") {
        elements.push(
          <ul key={`list-${keyCounter++}`} className="list-disc list-outside ml-10 mb-4">
            {listItems.map((item, idx) => (
              <li key={`ul-item-${idx}`} className="mb-1">
                <RichTextWithLinks 
                  text={item} 
                  links={links} 
                  onLinkClick={handleRichTextLinkClick}
                  clickedLabels={clickedLinks}
                />
              </li>
            ))}
          </ul>
        );
      } else if (listType === "ol") {
        elements.push(
          <ol key={`list-${keyCounter++}`} className="list-decimal list-outside ml-10 mb-4">
            {listItems.map((item, idx) => (
              <li key={`ol-item-${idx}`} className="mb-1">
                <RichTextWithLinks 
                  text={item} 
                  links={links} 
                  onLinkClick={handleRichTextLinkClick}
                  clickedLabels={clickedLinks}
                />
              </li>
            ))}
          </ol>
        );
      }
      
      listType = null;
      listItems = [];
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      // Capture the full content after * including spaces and text
      const unorderedMatch = /^(\s*)\*\s+(.*)$/.exec(line);
      
      // Capture the full content after the number including spaces and text
      const orderedMatch = /^(\s*)(\d+)[.)]\s+(.*)$/.exec(line);

      if (unorderedMatch) {
        // Flush previous list if different type
        if (listType !== "ul") flushList();
        listType = "ul";
        
        // Preserve the full content as captured by regex group 2
        listItems.push(unorderedMatch[2]);
        
      } else if (orderedMatch) {
        // Flush previous list if different type
        if (listType !== "ol") flushList();
        listType = "ol";
        
        // Preserve the full content as captured by regex group 3
        listItems.push(orderedMatch[3]);
        
      } else if (trimmed === "") {
        // Empty line means flush list and add spacing
        flushList();
        elements.push(<div key={`spacer-${keyCounter++}`} className="mb-3"></div>);
        
      } else {
        // Normal paragraph or line, flush list first
        flushList();
        
        // Convert tabs to spaces and preserve formatting
        const processedLine = line.replace(/\t/g, '    ');
        
        elements.push(
          <div key={`text-${keyCounter++}`} className="mb-2" style={{ whiteSpace: "pre-wrap" }}>
            <RichTextWithLinks 
              text={processedLine} 
              links={links} 
              onLinkClick={handleRichTextLinkClick}
              clickedLabels={clickedLinks}
            />
          </div>
        );
      }
    });

    // Flush any remaining list
    flushList();

    return elements.length > 0 ? <div>{elements}</div> : null;
  };

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
    setQuizCompleted(Boolean(taskProgress.quizCompleted));
    setUploadCompleted(Boolean(taskProgress.uploadCompleted));
    setWatchedVideos(new Set(taskProgress.watchedVideos || []));
    setReadDocuments(new Set(taskProgress.readDocuments || []));
    setClickedLinks(new Set(taskProgress.clickedLinks || []));
  }, [requiredActions, quizId, taskProgress]);

  // Handler functions
  const handleQuizComplete = (completed) => {
    setQuizCompleted(completed);
    if (onboardingBlock && moduleSubmodule) {
      updateTaskProgress(onboardingBlock, moduleSubmodule, taskTitle, "quizCompleted", completed);
    }
  };

  const handleUploadComplete = (completed) => {
    setUploadCompleted(completed);
    if (onboardingBlock && moduleSubmodule) {
      updateTaskProgress(onboardingBlock, moduleSubmodule, taskTitle, "uploadCompleted", completed);
    }
  };

  const handleVideoWatch = (videoTitle, isRequired) => {
    if (isRequired) {
      setWatchedVideos(prev => {
        const next = new Set(prev).add(videoTitle);
        if (onboardingBlock && moduleSubmodule) {
          updateTaskProgress(onboardingBlock, moduleSubmodule, taskTitle, "watchedVideos", Array.from(next));
        }
        return next;
      });
    }
  };

  const handleDocumentRead = (docTitle, isRequired) => {
    if (isRequired) {
      setReadDocuments(prev => {
        const next = new Set(prev).add(docTitle);
        if (onboardingBlock && moduleSubmodule) {
          updateTaskProgress(onboardingBlock, moduleSubmodule, taskTitle, "readDocuments", Array.from(next));
        }
        return next;
      });
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

  const isTaskComplete = onboardingBlock && moduleSubmodule
    ? isTaskCompleted(onboardingBlock, moduleSubmodule, task)
    : calculateTaskCompletion();

  // Submodule completion is handled at the ModulePage level (with full task list).

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 mb-6 border-silver_lake_blue`}>
      {/* Task Header with CompletionIcon */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">{taskTitle}</h2>
        <CompletionIcon completed={isTaskComplete} />
      </div>

      {/* Task Description - Now with formatted text parsing */}
      <div className="mb-6">
        {parseFormattedText(taskDescription || "", links || [])}
      </div>

      {/* Success Message for Completed Task */}
      {/* {isTaskComplete && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-700 font-semibold text-[1.1rem] md:text-[1.2rem]">
            Great work on successfully completing this task! Keep moving forward on completing the other tasks. I believe you got this!
          </p>
        </div>
      )} */}

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
          <h3 className="text-xl font-semibold mb-3">Documents</h3>
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