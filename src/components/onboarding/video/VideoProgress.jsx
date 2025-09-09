// The VideoProgress component shows the member how much they watched through the video!
import PropTypes from 'prop-types';

const VideoProgress = ({ completedCount, total }) => {
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="w-full bg-silver_lake_blue rounded-full h-4 mb-4">
      <div
        className="bg-prussian_blue h-4 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
        title={`${completedCount} / ${total} videos watched`}
      />
    </div>
  );
};

VideoProgress.propTypes = {
  completedCount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default VideoProgress;
