import { createContext, useState, useEffect, useContext } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to access Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing user session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (credentials) => {
    // Retrieves accounts array from localStorage
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    // Finds user matching the entered username and password
    const matchedUser = accounts.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (matchedUser) {
      setUser(matchedUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(matchedUser));
      // Returns true on successful login
      return true;
    }
    // Returns false if no match found
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
