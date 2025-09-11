import PropTypes from 'prop-types';

const ProgressTracker = ({ completedCount, total }) => {
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="w-full bg-silver_lake_blue rounded-full h-4 mb-6 max-w-4xl mx-auto">
      <div
        className="bg-prussian_blue h-4 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
        title={`${completedCount} of ${total} tasks completed`}
      />
    </div>
  );
};

ProgressTracker.propTypes = {
  completedCount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default ProgressTracker;