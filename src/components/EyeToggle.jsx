// Reusable Eye Toggle icon to signal switch between "hidden" and "unhidden" state of any info!
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
      boxShadow: 'none',
      cursor: 'pointer',
      outline: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    {visible 
        ? <EyeOff size={22} color="#213C58"/> 
        : <Eye size={22} color="#213C58"/>}
  </button>
);

// PropTypes validation for this component
EyeToggle.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EyeToggle;