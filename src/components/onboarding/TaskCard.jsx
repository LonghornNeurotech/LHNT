import PropTypes from 'prop-types';
import CompletionIcon from '../common/CompletionIcon';

const TaskCard = ({ task, taskNumber, completed, onComplete }) => {
  return (
    <div className="border rounded p-4 mb-4 bg-bone_white relative">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">
          Task {taskNumber}: {task.title}
        </h3>
        <CompletionIcon completed={completed} />
      </div>
      <p className="mt-2 mb-4 text-prussian_blue">{task.description}</p>

      {/* Embed videos if present */}
      {task.videos && (
        <div className="mb-4">
          {task.videos.map((video) => (
            <div key={video.url} className="mb-2">
              <div className="font-medium mb-1">{video.title}</div>
              {(video.url.includes('youtube.com') || video.url.includes('youtu.be')) ? (
                <iframe
                  width="420"
                  height="236"
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: '8px', border: '0' }}
                />
              ) : (
                <video
                  width="420"
                  height="236"
                  controls
                  src={video.url}
                  style={{ borderRadius: '8px' }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Embed documents if present (PDFs) */}
      {task.documents && (
        <div className="mb-4">
          {task.documents.map((doc) => (
            <div key={doc.url} className="mb-2">
              <div className="font-medium mb-1">{doc.label}</div>
              <iframe
                src={doc.url}
                width="420"
                height="560"
                title={doc.label}
                style={{ borderRadius: '8px', border: '0' }}
              />
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onComplete}
        disabled={completed}
        className={`px-4 py-2 rounded ${
          completed ? 'bg-green-400 cursor-default' : 'bg-prussian_blue text-white hover:bg-[#00509e]'
        }`}
      >
        {completed ? 'Completed' : 'Mark Complete'}
      </button>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string,
    videos: PropTypes.array,
    documents: PropTypes.array,
  }).isRequired,
  taskNumber: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default TaskCard;