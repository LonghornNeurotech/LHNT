import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [member, setMember] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedMember = localStorage.getItem('member');
    if (storedMember) {
      setMember(JSON.parse(storedMember));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function checks password only
  const login = ({ fullName, password }) => {
    const validPassword = 'LHNTFALL25';
    if (password === validPassword && fullName.trim()) {
      const memberObj = {
        memberId: Date.now().toString(),
        fullName: fullName.trim(),
        role: 'member',
      };
      setMember(memberObj);
      setIsAuthenticated(true);
      localStorage.setItem('member', JSON.stringify(memberObj));
      return true;
    } else {
      setMember(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('member');
  };

  return (
    <AuthContext.Provider value={{ member, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};