// Completion icon
import PropTypes from 'prop-types';

const CompletionIcon = ({ completed }) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full border-2 bg-bone_white ${
        completed 
          ? `border-green-600`
          : `border-silver_lake_blue`
      }`}
      style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px', maxWidth: '24px', maxHeight: '24px' }}
      aria-label={completed ? 'Completed' : 'Not completed'}
      role="img"
      title={completed ? 'Completed' : 'Not completed'}
    >
      {completed && (
        <svg
          className="text-green-600 w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="30"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );
};

CompletionIcon.propTypes = {
  completed: PropTypes.bool.isRequired,
};

export default CompletionIcon;