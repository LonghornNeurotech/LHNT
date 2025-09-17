import { useState } from 'react';
import PropTypes from 'prop-types';

// Import video components
import VideoGallery from './video/VideoGallery';
import VideoPlayer from './video/VideoPlayer';

// Import upload components
import FilePreview from './upload/FilePreview';
import FileUpload from './upload/FileUpload';
import SubmissionForm from './upload/SubmissionForm';

// Import quiz components
import QuizContainer from './quiz/QuizContainer';

// Import DocumentViewer (new)
import DocumentViewer from './upload/DocumentViewer';

const styles = {
  container: {
    margin: '2rem 0',
    width: '100%',
    boxSizing: 'border-box',
    background: '#fff',
    wordWrap: 'break-word',
  },
  title: {
    fontWeight: 700,
    marginBottom: '0.5rem',
    fontSize: '1.2rem',
    color: '#183F5E',
  },
  info: {
    marginBottom: '1rem',
    color: '#23395d',
    fontSize: '1rem',
    whiteSpace: 'pre-line',
  },
  embeddedContent: {
    marginTop: '1rem',
    marginRight: '1rem',
    maxWidth: '100%',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
  },
};

const TaskCard = ({ task }) => {
  const {
    title,
    description,
    links,
    quizzes,
    videos,
    documents,
    allowFileUpload,
  } = task;

  const [files, setFiles] = useState([]);

  const handleVideoComplete = () => {};

  return (
    <div style={styles.container} className="task-card">
      {/* Task title and info */}
      {title && <div style={styles.title}>{title}</div>}
      {description && <div style={styles.info}>{description}</div>}

      {/* Links */}
      {Array.isArray(links) && links.length > 0 && (
        <div style={styles.embeddedContent} className="task-card-links">
          <h4>Links</h4>
          <ul>
            {links.map((link, i) => (
              <li key={i}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.title || link.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quizzes */}
      {Array.isArray(quizzes) && quizzes.length > 0 && (
        <div style={styles.embeddedContent} className="task-card-quizzes">
          {quizzes.map((quiz, i) => (
            <QuizContainer key={i} quizData={quiz.questions || []} />
          ))}
        </div>
      )}

      {/* Videos */}
      {Array.isArray(videos) && videos.length > 0 && (
        <div
          style={{
            ...styles.embeddedContent,
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: videos.length === 1 ? 'flex-start' : 'center',
          }}
          className="task-card-videos"
        >
          {videos.length === 1 ? (
            <VideoPlayer
              url={videos[0].url}
              title={videos[0].title}
              duration={videos[0].duration}
              onComplete={handleVideoComplete}
              style={{ flex: '1 1 400px', maxWidth: 600, minWidth: 320 }}
            />
          ) : (
            <VideoGallery
              videos={videos}
              onVideoComplete={handleVideoComplete}
            />
          )}
        </div>
      )}

      {/* Documents */}
      {Array.isArray(documents) && documents.length > 0 && (
        <div style={styles.embeddedContent} className="task-card-documents">
          <h4>Documents</h4>
          {documents.map((doc, i) => (
            <div key={i} style={{ marginBottom: '2rem' }}>
              <div style={{ fontWeight: 'bold' }}>{doc.name || doc.title || 'Document'}</div>
              <DocumentViewer url={doc.url} />
            </div>
          ))}
        </div>
      )}

      {/* File upload */}
      {allowFileUpload && (
        <div style={styles.embeddedContent} className="task-card-upload">
          <SubmissionForm />
          <FilePreview files={files} onRemove={index => setFiles(files.filter((_, i) => i !== index))} />
          <FileUpload files={files} setFiles={setFiles} />
        </div>
      )}
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string,
      })
    ),
    quizzes: PropTypes.arrayOf(
      PropTypes.shape({
        questions: PropTypes.array.isRequired,
      })
    ),
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string,
        duration: PropTypes.number,
      })
    ),
    documents: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    allowFileUpload: PropTypes.bool,
  }).isRequired,
};

export default TaskCard;

// import PropTypes from 'prop-types';

// const TaskCard = ({ task, isCompleted, onComplete }) => (
//   <div className="mb-6">
//     <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
//     <p className="text-gray-800 mb-3">{task.description}</p>
//     <div>
//       {isCompleted ? (
//         <span className="text-green-700">✅ Completed</span>
//       ) : (
//         <button
//           className="bg-silver_lake_blue text-white px-4 py-2 rounded transition hover:bg-blue-700"
//           onClick={onComplete}
//         >
//           Mark as Complete
//         </button>
//       )}
//     </div>
//   </div>
// );

// TaskCard.propTypes = {
//   task: PropTypes.object.isRequired,
//   isCompleted: PropTypes.bool.isRequired,
//   onComplete: PropTypes.func.isRequired,
// };

// export default TaskCard;

// import PropTypes from 'prop-types';
// import CompletionIcon from '../common/CompletionIcon';

// const TaskCard = ({ task, taskNumber, completed, onComplete }) => {
//   return (
//     <div className="border rounded p-4 mb-4 bg-bone_white relative">
//       <div className="flex justify-between items-start">
//         <h3 className="text-xl font-semibold">
//           Task {taskNumber}: {task.title}
//         </h3>
//         <CompletionIcon completed={completed} />
//       </div>
//       <p className="mt-2 mb-4 text-prussian_blue">{task.description}</p>

//       {/* Embed videos if present */}
//       {task.videos && (
//         <div className="mb-4">
//           {task.videos.map((video) => (
//             <div key={video.url} className="mb-2">
//               <div className="font-medium mb-1">{video.title}</div>
//               {(video.url.includes('youtube.com') || video.url.includes('youtu.be')) ? (
//                 <iframe
//                   width="420"
//                   height="236"
//                   src={video.url}
//                   title={video.title}
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                   style={{ borderRadius: '8px', border: '0' }}
//                 />
//               ) : (
//                 <video
//                   width="420"
//                   height="236"
//                   controls
//                   src={video.url}
//                   style={{ borderRadius: '8px' }}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Embed documents if present (PDFs) */}
//       {task.documents && (
//         <div className="mb-4">
//           {task.documents.map((doc) => (
//             <div key={doc.url} className="mb-2">
//               <div className="font-medium mb-1">{doc.label}</div>
//               <iframe
//                 src={doc.url}
//                 width="420"
//                 height="560"
//                 title={doc.label}
//                 style={{ borderRadius: '8px', border: '0' }}
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       <button
//         onClick={onComplete}
//         disabled={completed}
//         className={`px-4 py-2 rounded ${
//           completed ? 'bg-green-400 cursor-default' : 'bg-prussian_blue text-white hover:bg-[#00509e]'
//         }`}
//       >
//         {completed ? 'Completed' : 'Mark Complete'}
//       </button>
//     </div>
//   );
// };

// TaskCard.propTypes = {
//   task: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     type: PropTypes.string,
//     videos: PropTypes.array,
//     documents: PropTypes.array,
//   }).isRequired,
//   taskNumber: PropTypes.number.isRequired,
//   completed: PropTypes.bool.isRequired,
//   onComplete: PropTypes.func.isRequired,
// };

// export default TaskCard;