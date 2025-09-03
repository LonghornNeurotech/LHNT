import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create Auth Context
const AuthContext = createContext();

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function checks password only
  const login = (password) => {
    const correctPassword = 'LHNTFALL25';
    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Export AuthContext for useAuth custom hook in separate file (see below)
export default AuthContext;