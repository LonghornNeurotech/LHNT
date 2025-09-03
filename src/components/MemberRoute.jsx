import PropTypes from 'prop-types';
import { useAuth } from '../context/useAuth';
import { Navigate } from 'react-router-dom';

const MemberRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

MemberRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MemberRoute;