import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [member, setMember] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedMember = sessionStorage.getItem('member');
    if (storedMember) {
      setMember(JSON.parse(storedMember));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function checks password only
  const login = ({ fullName, eid, password }) => {
    const validPassword = 'LHNTFALL25';
    if (password === validPassword && fullName.trim() && eid.trim()) {
      const memberObj = {
        memberId: eid.trim().toLowerCase(),
        fullName: fullName.trim(),
        eid: eid.trim().toLowerCase(),
        role: 'member',
      };
      setMember(memberObj);
      setIsAuthenticated(true);
      sessionStorage.setItem('member', JSON.stringify(memberObj));
      return true;
    } else {
      setMember(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setMember(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('member');
    localStorage.removeItem('member');
  };

  // Delete account function
  const deleteAccount = async () => {
    if (!member?.eid) {
      logout();
      return;
    }

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "";
      await fetch(`${apiBase}/api/delete-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eid: member.eid }),
      });
    } catch {
      // Ignore errors; still clear local data.
    }

    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        member,
        isAuthenticated,
        login,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};