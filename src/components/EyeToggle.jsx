// Reusable Eye Toggle component to switch between "hidden" and "unhidden" state of any confidential data!
import PropTypes from 'prop-types';
import { Eye, EyeOff } from 'lucide-react';

const EyeToggle = ({ visible, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={visible ? "Hide password" : "Show password"}
    style={{
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
      padding: 0
    }}
  >
    {visible ? <EyeOff size={22} /> : <Eye size={22} />}
  </button>
);

// PropTypes validation for this component
EyeToggle.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EyeToggle;