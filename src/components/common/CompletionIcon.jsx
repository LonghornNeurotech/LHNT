// Completion icon
import PropTypes from 'prop-types';

const CompletionIcon = ({ completed }) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full w-6 h-6 border-2 ${
        completed
          ? 'bg-green-600 border-green-600'
          : 'bg-bone_white border-silver_lake_blue'
      }`}
      aria-label={completed ? 'Completed' : 'Not completed'}
      role="img"
      title={completed ? 'Completed' : 'Not completed'}
    >
      {completed && (
        <svg
          className="text-white w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );
};

CompletionIcon.propTypes = {
  completed: PropTypes.bool.isRequired,
};

export default CompletionIcon;