import PropTypes from "prop-types";
import RichTextWithLinks from "./RichTextWithLinks";
import VideoGallery from "./videos/VideoGallery";

const TaskCard = ({ task }) => {
  const { taskTitle, taskDescription, videos } = task;

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
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    taskTitle: PropTypes.string.isRequired,
    taskDescription: PropTypes.string.isRequired,
    links: PropTypes.array,
    quizId: PropTypes.string,
    videos: PropTypes.array,
  }).isRequired,
};

export default TaskCard;


// PREVIOUS WORKING VERSION, JUST IGNORE
// import { useState } from 'react';
// import PropTypes from 'prop-types';

// // Import video components
// import VideoGallery from './video/VideoGallery';
// import VideoPlayer from './video/VideoPlayer';

// // Import upload components
// import FilePreview from './upload/FilePreview';
// import FileUpload from './upload/FileUpload';
// import SubmissionForm from './upload/SubmissionForm';

// // Import quiz components
// import QuizContainer from './quiz/QuizContainer';

// // Import DocumentViewer (new)
// import DocumentViewer from './upload/DocumentViewer';

// const styles = {
//   container: {
//     margin: '2rem 0',
//     width: '100%',
//     boxSizing: 'border-box',
//     background: '#fff',
//     wordWrap: 'break-word',
//   },
//   title: {
//     fontWeight: 700,
//     marginBottom: '0.5rem',
//     fontSize: '1.2rem',
//     color: '#183F5E',
//   },
//   info: {
//     marginBottom: '1rem',
//     color: '#23395d',
//     fontSize: '1rem',
//     whiteSpace: 'pre-line',
//   },
//   embeddedContent: {
//     marginTop: '1rem',
//     marginRight: '1rem',
//     maxWidth: '100%',
//     boxSizing: 'border-box',
//     wordWrap: 'break-word',
//   },
// };

// const TaskCard = ({ task }) => {
//   const {
//     title,
//     description,
//     links,
//     quizzes,
//     videos,
//     documents,
//     allowFileUpload,
//   } = task;

//   const [files, setFiles] = useState([]);

//   const handleVideoComplete = () => {};

//   return (
//     <div style={styles.container} className="task-card">
//       {/* Task title and info */}
//       {title && <div style={styles.title}>{title}</div>}
//       {description && <div style={styles.info}>{description}</div>}

//       {/* Links */}
//       {Array.isArray(links) && links.length > 0 && (
//         <div style={styles.embeddedContent} className="task-card-links">
//           <h4>Links</h4>
//           <ul>
//             {links.map((link, i) => (
//               <li key={i}>
//                 <a href={link.url} target="_blank" rel="noreferrer">
//                   {link.title || link.url}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Quizzes */}
//       {Array.isArray(quizzes) && quizzes.length > 0 && (
//         <div style={styles.embeddedContent} className="task-card-quizzes">
//           {quizzes.map((quiz, i) => (
//             <QuizContainer key={i} quizData={quiz.questions || []} />
//           ))}
//         </div>
//       )}

//       {/* Videos */}
//       {Array.isArray(videos) && videos.length > 0 && (
//         <div
//           style={{
//             ...styles.embeddedContent,
//             display: 'flex',
//             gap: '2rem',
//             flexWrap: 'wrap',
//             justifyContent: videos.length === 1 ? 'flex-start' : 'center',
//           }}
//           className="task-card-videos"
//         >
//           {videos.length === 1 ? (
//             <VideoPlayer
//               url={videos[0].url}
//               title={videos[0].title}
//               duration={videos[0].duration}
//               onComplete={handleVideoComplete}
//               style={{ flex: '1 1 400px', maxWidth: 600, minWidth: 320 }}
//             />
//           ) : (
//             <VideoGallery
//               videos={videos}
//               onVideoComplete={handleVideoComplete}
//             />
//           )}
//         </div>
//       )}

//       {/* Documents */}
//       {Array.isArray(documents) && documents.length > 0 && (
//         <div style={styles.embeddedContent} className="task-card-documents">
//           <h4>Documents</h4>
//           {documents.map((doc, i) => (
//             <div key={i} style={{ marginBottom: '2rem' }}>
//               <div style={{ fontWeight: 'bold' }}>{doc.name || doc.title || 'Document'}</div>
//               <DocumentViewer url={doc.url} />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* File upload */}
//       {allowFileUpload && (
//         <div style={styles.embeddedContent} className="task-card-upload">
//           <SubmissionForm />
//           <FilePreview files={files} onRemove={index => setFiles(files.filter((_, i) => i !== index))} />
//           <FileUpload files={files} setFiles={setFiles} />
//         </div>
//       )}
//     </div>
//   );
// };

// TaskCard.propTypes = {
//   task: PropTypes.shape({
//     title: PropTypes.string,
//     description: PropTypes.string,
//     links: PropTypes.arrayOf(
//       PropTypes.shape({
//         url: PropTypes.string.isRequired,
//         title: PropTypes.string,
//       })
//     ),
//     quizzes: PropTypes.arrayOf(
//       PropTypes.shape({
//         questions: PropTypes.array.isRequired,
//       })
//     ),
//     videos: PropTypes.arrayOf(
//       PropTypes.shape({
//         url: PropTypes.string.isRequired,
//         title: PropTypes.string,
//         duration: PropTypes.number,
//       })
//     ),
//     documents: PropTypes.arrayOf(
//       PropTypes.shape({
//         url: PropTypes.string.isRequired,
//         name: PropTypes.string,
//         title: PropTypes.string,
//       })
//     ),
//     allowFileUpload: PropTypes.bool,
//   }).isRequired,
// };

// export default TaskCard;